(() => {
 const url=new URL(location.href), requested=url.searchParams.get('id')||document.body.dataset.project;
 const p=projects.find(project=>project.id===requested||project.aliases?.includes(requested));
 const detail=document.querySelector('#detail');
 detail.classList.add('project-page');
 if(p)detail.dataset.project=p.id;
 if(!p){
  detail.innerHTML='<h1>Project not found</h1><a href="index.html?v=53">Projects</a>';
  return;
 }
 const housing=['gullbergsvass','strazna'].includes(p.id);
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 const routes={
  emergence:{style:['thesis-theory-v29.css','case-analyses-v29.css','masterplan-v64.css','thesis-media-v34.css','thesis-layout-v64.css','network-v45.css'],scripts:['case-analyses-v42-data.js','case-analyses-v29.js','masterplan-v34-data.js','masterplan-v64.js','thesis-media-v33.js','network-v45.js','thesis-theory-v64.js']},
  market:{style:['market-v92.css'],scripts:['market-data-v91.js','market-v92.js']},
  school:{style:['school-v39.css'],scripts:['school-v72.js']},
  viikki:{style:['viikki-v61.css'],scripts:['viikki-assets-v62.js','viikki-v90.js']},
  footbridges:{style:['footbridges-v70.css'],scripts:['footbridges-assets-v65.js','footbridges-v90.js']},
  practice:{style:['practice-v87.css'],scripts:['practice-assets-v90.js','practice-v90.js']},
  housing:{style:['housing-v88.css',...(p.id==='gullbergsvass'?['gull-street-v95.css']:[])],scripts:['housing-assets-v88.js',...(p.id==='gullbergsvass'?['gull-street-v95.js']:[]),'housing-v88.js']}
 };
 const practice=['kapitulska','matadorka','dordrecht'].includes(p.id);
 const route=routes[practice?'practice':housing?'housing':p.id]||{style:[],scripts:[]};
 const layout=document.querySelector('link[href="project-layout-v59.css"]');
 const system=document.querySelector('link[href="project-system-v69.css"]');
 function load(url,style=false){
  return new Promise((resolve,reject)=>{
   const tag=document.createElement(style?'link':'script');
   tag.onload=resolve;tag.onerror=()=>reject(Error('Could not load '+url));
   if(style){tag.rel='stylesheet';tag.href=url;}
   else {tag.async=false;tag.src=url;}
   // Keep the existing stylesheet order for the school and thesis pages.
  if(style&&['school-v39.css','thesis-theory-v29.css','case-analyses-v29.css','masterplan-v64.css','thesis-media-v34.css'].includes(url))layout.before(tag);
  else if(style)system.before(tag);
  else document.head.append(tag);
  });
 }
 const gallery=(media,eager=false)=>renderProjectGallery(p,media,eager);
 document.title=p.title+' — Niki Jaško';
 if(housing)detail.classList.add('housing-page');
 if(p.id==='emergence')detail.classList.add('thesis-page');
 if(p.id==='school')detail.classList.add('school-page');
 if(p.id==='footbridges')detail.classList.add('footbridges-page');
 if(requested!==p.id){
  url.searchParams.set('v','97');
  url.searchParams.set('id',p.id);
  if(requested==='street')url.hash='street-design';
  if(requested==='footbridge')url.hash='bridge-2';
  if(requested==='footbridge3')url.hash='bridge-3';
  history.replaceState(null,'',url);
 }
 function placeProjectInformation(){
  const heading=detail.querySelector('.project-heading');
  if(!heading)return;
  heading.querySelector('h1').classList.add('project-title');
  heading.querySelector('span')?.remove();
  // Keep one compact line per credit group in portfolio order.
  for(const source of detail.querySelectorAll('.credits,.housing-credit,.thesis-credits-line,.bridge-credits')){
   if(source.matches('.bridge-credits')){
    source.querySelectorAll('p').forEach(paragraph=>paragraph.remove());
    source.setAttribute('aria-label','Competition sources');
   }else source.remove();
  }
  const information=document.createElement('div');
  information.className='project-metadata';
  information.setAttribute('aria-label','Project credits');
  const awardURLs={
   school:'https://www.stavbysvunidreva.cz/drevene-stavby-velke-2023/gymnazium-bernolakovska',
   strazna:'https://www.archinfo.sk/diskusia/blog/skola/ceny-a-za-najlepsiu-atelierovu-tvorbu-na-katedre-architektury-stavebnej-fakulty-stu.html'
  };
  for(const lines of projectCredits[p.id]){
   const paragraph=document.createElement('p');
   paragraph.textContent=lines[0].endsWith(':')
    ?lines[0]+' '+lines.slice(1).join(', ')
    :lines.join(' · ');
   if(lines[0]==='Awards:'&&awardURLs[p.id]){
    paragraph.textContent='Awards: ';
    const link=document.createElement('a');
    link.href=awardURLs[p.id];link.target='_blank';link.rel='noopener noreferrer';
    link.textContent=lines.slice(1).join(', ');
    link.style.textDecoration='underline';link.style.textUnderlineOffset='3px';
    paragraph.append(link);
   }
   information.append(paragraph);
  }
  heading.after(information);
  detail.querySelectorAll('.intro').forEach(intro=>{
   if(intro.children.length===1)intro.classList.add('intro-without-credits');
  });
  detail.querySelectorAll('.viikki-model-note a').forEach(link=>{
   const source=new URL(link.getAttribute('href').replace('viikki-viewer-v4.html','viikki-viewer-v97.html'),location.href);source.searchParams.set('v','97');link.href=source.href;
  });
  detail.querySelectorAll('iframe.school-model,iframe.viikki-model').forEach(frame=>{
   const source=new URL(frame.getAttribute('src').replace('construction-viewer-v18.html','construction-viewer-v97.html').replace('viikki-viewer-v4.html','viikki-viewer-v97.html'),location.href);source.searchParams.set('v','97');frame.src=source.href;
  });
 }
 function useCurrentNavigation(){
  detail.querySelectorAll('a[href^="index.html?"],a[href^="project.html?"]').forEach(link=>{
   const target=new URL(link.getAttribute('href'),location.href);target.searchParams.set('v','97');link.href=target.href;
  });
 }
 function mount(){
  delete detail.dataset.enhanced89;
  if(practice){detail.innerHTML=previewMarkup89(renderPracticePage(p,next));initPracticePage(detail);}
  else if(p.id==='market'){detail.innerHTML=previewMarkup89(renderMarketPage92(p,next));initMarketPage92(detail);}
  else if(p.id==='footbridges'){detail.innerHTML=previewMarkup89(renderFootbridgesPage(p,next));initFootbridgesPage(detail);}
  else if(housing){detail.innerHTML=previewMarkup89(renderHousingPage(p,next));initHousingPage(detail);}
  else if(p.id==='emergence'){
   detail.innerHTML=previewMarkup89(renderThesisPage(p,gallery,next));
   initCaseComparison(detail,caseAnalyses);initNetworkStudy(detail);initInteractiveMasterplan(detail,masterplanData);initThesisAnimations(detail);
  }else if(p.id==='school'){detail.innerHTML=previewMarkup89(renderSchoolPage(p,next));initSchoolPage(detail);}
  else{
   const contents=p.id==='viikki'?renderViikkiContent():p.sections?p.sections.map((s,i)=>`<section class="project-section" id="${s.id}" aria-labelledby="heading-${s.id}"><h2 id="heading-${s.id}">${s.title}</h2><div class="intro"><p>${s.text}</p><p class="credits">${s.credit}</p></div>${gallery(s.media,i===0)}</section>`).join(''):gallery(p.media,true);
   detail.innerHTML=`<a class="back" href="index.html?v=53">← Projects</a><div class="project-heading"><h1>${p.title}</h1><span>${p.type} · ${p.year}</span></div><div class="intro"><p>${p.text}</p><p class="credits">${p.credit}</p></div>${contents}<div class="next"><a href="index.html?v=53">← Projects</a><a href="project.html?v=52&id=${next.id}">Next project →</a></div>`;
   if(p.id==='viikki')initViikkiPage(detail);
  }
  placeProjectInformation();useCurrentNavigation();window.projectReady89=true;document.dispatchEvent(new Event("project-ready"));
  if(url.hash)document.getElementById(url.hash.slice(1))?.scrollIntoView({behavior:'instant'});
 }
 // Scripts are fetched together and execute in insertion order. The first render
 // waits for this project's CSS so the layout doesn't flash or jump.
 const files=[...route.style.map(f=>load(f,true)),...route.scripts.map(f=>load(f))];
 if(!files.length)mount();
 else Promise.all(files).then(mount).catch(error=>{
  console.error(error);
  if(!detail.querySelector('h1'))detail.innerHTML='<h1>'+p.title+'</h1><p>Some project files could not load. Reload the page to try again.</p>';window.projectReady89=true;document.dispatchEvent(new Event('project-ready'));
 });
})();
