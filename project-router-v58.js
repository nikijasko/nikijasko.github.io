(() => {
 const url=new URL(location.href), requested=url.searchParams.get('id');
 const p=projects.find(project=>project.id===requested||project.aliases?.includes(requested));
 const detail=document.querySelector('#detail');
 if(!p){
  detail.innerHTML='<h1>Project not found</h1><a href="index.html?v=53">Projects</a>';
  return;
 }
 const housing=['gullbergsvass','strazna'].includes(p.id);
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 const routes={
  emergence:{style:['thesis-theory-v29.css','case-analyses-v29.css','masterplan-v34.css','thesis-media-v34.css','thesis-layout-v58.css','network-v45.css'],scripts:['case-analyses-v42-data.js','case-analyses-v29.js','masterplan-v34-data.js','masterplan-v34.js','thesis-media-v33.js','network-v45.js','thesis-theory-v58.js']},
  school:{style:['school-v39.css'],scripts:['school-v46.js']},
  viikki:{style:['viikki-v57.css'],scripts:['viikki-assets-v57.js','viikki-v57.js']},
  footbridges:{style:['footbridges-v55.css'],scripts:['footbridges-assets-v55.js','footbridges-v55.js']},
  housing:{style:['housing-v56.css'],scripts:['housing-assets-v52.js','housing-v56.js']}
 };
 const route=routes[housing?'housing':p.id]||{style:[],scripts:[]};
 const layout=document.querySelector('link[href="project-layout-v40.css"]');
 function load(url,style=false){
  return new Promise((resolve,reject)=>{
   const tag=document.createElement(style?'link':'script');
   tag.onload=resolve;tag.onerror=()=>reject(Error('Could not load '+url));
   if(style){tag.rel='stylesheet';tag.href=url;}
   else {tag.async=false;tag.src=url;}
   // Keep the existing stylesheet order for the school and thesis pages.
  if(style&&['school-v39.css','thesis-theory-v29.css','case-analyses-v29.css','masterplan-v34.css','thesis-media-v34.css'].includes(url))layout.before(tag);
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
  url.searchParams.set('v',p.id==='footbridges'?'55':housing?'56':'44');
  url.searchParams.set('id',p.id);
  if(requested==='street')url.hash='street-design';
  if(requested==='footbridge')url.hash='bridge-2';
  if(requested==='footbridge3')url.hash='bridge-3';
  history.replaceState(null,'',url);
 }
 function mount(){
  if(p.id==='footbridges'){detail.innerHTML=renderFootbridgesPage(p,next);initFootbridgesPage(detail);}
  else if(housing){detail.innerHTML=renderHousingPage(p,next);initHousingPage(detail);}
  else if(p.id==='emergence'){
   detail.innerHTML=renderThesisPage(p,gallery,next);
   initCaseComparison(detail,caseAnalyses);initNetworkStudy(detail);initInteractiveMasterplan(detail,masterplanData);initThesisAnimations(detail);
  }else if(p.id==='school'){detail.innerHTML=renderSchoolPage(p,next);initSchoolPage(detail);}
  else{
   const contents=p.id==='viikki'?renderViikkiContent():p.sections?p.sections.map((s,i)=>`<section class="project-section" id="${s.id}" aria-labelledby="heading-${s.id}"><h2 id="heading-${s.id}">${s.title}</h2><div class="intro"><p>${s.text}</p><p class="credits">${s.credit}</p></div>${gallery(s.media,i===0)}</section>`).join(''):gallery(p.media,true);
   detail.innerHTML=`<a class="back" href="index.html?v=53">← Projects</a><div class="project-heading"><h1>${p.title}</h1><span>${p.type} · ${p.year}</span></div><div class="intro"><p>${p.text}</p><p class="credits">${p.credit}</p>${p.id==='viikki'?'<a class="viikki-model-jump" href="#construction">Construction model ↓</a>':''}</div>${contents}<div class="next"><a href="index.html?v=53">← Projects</a><a href="project.html?v=52&id=${next.id}">Next project →</a></div>`;
   if(p.id==='viikki')initViikkiPage(detail);
  }
  if(url.hash)document.getElementById(url.hash.slice(1))?.scrollIntoView({behavior:'instant'});
 }
 // Scripts are fetched together and execute in insertion order. The first render
 // waits for this project's CSS so the layout doesn't flash or jump.
 const files=[...route.style.map(f=>load(f,true)),...route.scripts.map(f=>load(f))];
 if(!files.length)mount();
 else Promise.all(files).then(mount).catch(error=>{
  console.error(error);
  detail.innerHTML='<p>Some project files couldn’t load. <a href="">Reload the page</a> or <a href="index.html?v=53">return to projects</a>.</p>';
 });
})();
