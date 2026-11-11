/* Text and drawing labels are taken from Portfolio.pdf pp18–30 and original project files. */
(() => {
 const asset=key=>key+(practiceAssets[key+'-v90.webp']?'-v90.webp':practiceAssets[key+'-v87.webp']?'-v87.webp':practiceAssets[key+'-v86.webp']?'-v86.webp':practiceAssets[key+'-v85.webp']?'-v85.webp':practiceAssets[key+'-v84.webp']?'-v84.webp':practiceAssets[key+'-v83.webp']?'-v83.webp':practiceAssets[key+'-v82.webp']?'-v82.webp':practiceAssets[key+'-v81.webp']?'-v81.webp':'-v79.webp');
 const preview=src=>src.replace(/-v(79|81|82|83|84|85|86|87|90)\.webp$/,'-1280-v$1.webp');
 const img=(key,alt,eager=false)=>{const f=asset(key),s=practiceAssets[f],small=preview(f),responsive=practiceAssets[small]?` srcset="${small} ${practiceAssets[small].width}w, ${f} ${s.width}w" sizes="(max-width:650px) calc(100vw - 40px), 1200px"`:``;return `<img src="${practiceAssets[small]?small:f}"${responsive} width="${s.width}" height="${s.height}" alt="${alt}" loading="${eager?'eager':'lazy'}" decoding="async"${eager?' fetchpriority="high"':''}>`;};
 const figure=(key,alt,eager=false,caption='')=>`<figure class="practice-figure"><a href="${asset(key)}" class="practice-media" data-drawing aria-label="Enlarge ${alt}">${img(key,alt,eager)}</a>${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
 const pair=(a,b)=>`<div class="practice-pair">${a}${b}</div>`.replaceAll('sizes="(max-width:650px) calc(100vw - 40px), 1200px"','sizes="(max-width:650px) calc(100vw - 40px), (max-width:1264px) calc((100vw - 96px)/2), 584px"');
 const section=(id,title,body)=>`<section class="practice-section" id="${id}">${title?`<h2>${title}</h2>`:''}${body}</section>`;
 const matSwatches={parking:['#d4d0c4','Parking'],offices:['#b6ccd3','Offices'],schoolSport:['#e0d024','Sports centre / school use'],care:['#bfb59c','Care home'],sport:['#80dbb8','Sports centre'],retail:['#e788cf','Retail'],circulation:['#b4c5c2','Circulation'],storage:['#a1afaa','Storage'],services:['#808080','Building services'],unit2:['#d2a293','Non-residential unit · 2 rooms*'],unit3:['#c3836f','Non-residential unit · 3 rooms*'],apartment2:['#faf675','1-bedroom apartment'],apartment3:['#dedb3b','2-bedroom apartment']};
 function matLegend(key){
  const keys=key.endsWith('basement')?['parking','circulation','storage','services']:key==='mat-g-ground'?['offices','care','schoolSport','sport','retail','circulation','storage','services']:key==='mat-h-ground'?['offices','retail','circulation','storage']:key==='mat-g-typical'?['offices','care','unit2','unit3','apartment2','apartment3','circulation','storage']:key==='mat-h-typical'?['offices','unit2','unit3','apartment2','apartment3','circulation']:[];
  return keys.length?`<ul aria-label="Drawing legend">${keys.map(k=>`<li><span style="background:${matSwatches[k][0]}" aria-hidden="true"></span>${matSwatches[k][1]}</li>`).join('')}</ul>${key.endsWith('typical')?'<p class="practice-mat-legend-note">* Units without compliant daylight; counted as residential use in the zoning assessment.</p>':''}`:'';
 }
 const switcher=(id,label,items,ratio='16/10')=>`<div class="practice-switch" data-switch="${id}"><div class="practice-toolbar"><div class="practice-tabs" role="group" aria-label="${label}">${items.map(([key,title],i)=>`<button type="button" data-choice="${i}" aria-pressed="${!i}">${title}</button>`).join('')}</div><a class="practice-enlarge" data-drawing href="${asset(items[0][0])}">Enlarge ↗</a></div><div class="practice-frame" style="--drawing-ratio:${ratio}"><a class="practice-media" data-drawing href="${asset(items[0][0])}" aria-label="Enlarge ${items[0][1]}">${img(items[0][0],items[0][1])}</a></div>${id==='matDrawings'?`<div class="practice-mat-legend">${matLegend(items[0][0])}</div>`:''}</div>`;
 const sourceLink=(href,label)=>`<a href="${href}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
 const kapGroups={court2:{label:'Courtyard 2',views:[2]},court3:{label:'Courtyard 3',views:[4,7,9]},court4:{label:'Courtyard 4',views:[10,11]}};
 function kapGalleryStage(group,index=0){
  const {label,views}=kapGroups[group],id=views[index],key='kap-view-'+id;
  return `<div class="practice-kap-frame"><a class="practice-media" data-drawing href="${asset(key)}" aria-label="Enlarge ${label}">${img(key,label)}</a></div><div class="practice-kap-tools"><button type="button" data-kap-step="-1" aria-label="Previous view"${index===0?' disabled':''}>←</button><div class="practice-kap-thumbs" role="group" aria-label="${label} views">${views.map((n,i)=>`<button type="button" data-kap-view="${i}" aria-label="View ${i+1}" aria-pressed="${i===index}"><img src="${asset('kap-view-'+n+'-thumb')}" width="240" height="135" loading="lazy" decoding="async" alt=""></button>`).join('')}</div><button type="button" data-kap-step="1" aria-label="Next view"${index===views.length-1?' disabled':''}>→</button><a class="practice-enlarge" data-drawing href="${asset(key)}">Enlarge ↗</a></div>`;
 }
 function kapGallery(){return `<div class="practice-toolbar"><div class="practice-tabs" role="group" aria-label="Courtyards">${Object.entries(kapGroups).map(([key,g],i)=>`<button type="button" data-kap-group="${key}" aria-pressed="${!i}">${g.label}</button>`).join('')}</div></div><div class="practice-kap-gallery" data-kap-active="court2" data-kap-index="0">${kapGalleryStage('court2')}</div>`}
 function kapConcept(){
  const numbers=[[1,748,622],[2,625,615],[3,575,603],[4,496,580],[5,402,600]];
  return `<figure class="practice-figure kap-concept"><div class="kap-diagram">${img('kap-concept','Campus courtyards numbered 1 to 5; design scope covers 2 to 4')}<svg viewBox="0 0 1332 1036" aria-hidden="true">${numbers.map(([n,y,x])=>`<path d="M510 ${y}H${x}" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="3 5"/><rect x="465" y="${y-24}" width="38" height="44" fill="#fff" fill-opacity=".9"/><text x="484" y="${y+12}" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="38" font-weight="${n>1&&n<5?600:400}" fill="#252525">${n}</text>`).join('')}</svg></div><figcaption>1 · Main building courtyard<br>2–4 · Courtyards addressed in the design<br>5 · Existing charity garden</figcaption></figure>`;
 }
 const data={
  kapViews:[['kap-view-14','Plan'],['kap-view-15','Axonometry 1'],['kap-view-16','Axonometry 2']],
  matG:[['mat-g-basement','Basement'],['mat-g-ground','Ground floor'],['mat-g-typical','Typical floor'],['mat-g-elevations','Elevations'],['mat-g-sections','Sections']],
  matH:[['mat-h-basement','Basement'],['mat-h-ground','Ground floor'],['mat-h-typical','Typical floor'],['mat-h-elevations','Elevations'],['mat-h-sections','Sections']],
  dordAnalysis:[['dord-stakeholders','Stakeholder analysis'],['dord-swot','SWOT analysis']],
  dordScenarios:[['dord-mood-3','Creating waterfront · Community / playground'],['dord-mood-1','Beach plaza · Office / commercial space'],['dord-mood-2','Connection hub · Connection with communities']]
 };
 window.renderPracticePage=(p,next)=>{
  const start=`<a class="back" href="index.html?v=87">← Projects</a><div class="project-heading"><h1>${p.title}</h1></div>`;
  const end=`<div class="next"><a href="index.html?v=87">← Projects</a><a href="project.html?v=87&id=${next.id}">Next project →</a></div>`;
  let body='';
  if(p.id==='kapitulska'){
   body=figure('kap-view-2','Kapitulská landscape',true)+`<div class="practice-intro"><p>A sequence of connected courtyards within a national heritage campus in Bratislava’s historic core.</p><p>Concept and design of courtyards two through four, including space for community gardening, relaxation, studying and an outdoor auditorium.</p></div>`
    +section('campus','Campus courtyards',`<p class="kap-campus-description">Planting becomes progressively greener and more untamed from courtyard 1 to courtyard 5.</p>`+pair(figure('kap-drone','Drone photo'),kapConcept()).replace('practice-pair','practice-pair kap-campus-layout'))
    +section('courtyards','Courtyards',kapGallery())
    +section('axonometry','Axonometry',switcher('kapViews','Axonometric views',data.kapViews,'16/9'))
    +`<div class="practice-source">${sourceLink('https://www.compass.sk/','Compass architekti')}</div>`;
  }else if(p.id==='matadorka'){
   body=`<p class="practice-top-source">${sourceLink('https://www.compass.sk/project/matadorka-masterplan','Matadorka — Compass architekti')}</p>`+figure('mat-brownfield','Former industrial site in Bratislava',true)+`<div class="practice-intro"><p>The redevelopment strategy for these former rubber, enamelling and calendering plants had already been established. The work further developed selected buildings and tested alternative configurations within the zoning plan.</p><p>The design of two buildings was developed from early studies through to submitted zoning permit documentation, alongside work on layouts and coordination.</p></div>`
    +section('site','Site plan',`<div class="practice-site">${figure('mat-site','Nová Matadorka site plan — sectors G4 and H')}<a class="practice-site-dot" style="left:58.2%;top:63.5%" href="#buildings" data-building-jump="g" aria-label="Open Object G4"><span>G4</span></a><a class="practice-site-dot" style="left:56.6%;top:74.2%" href="#buildings" data-building-jump="h" aria-label="Open Object H1" data-label-side="left"><span>H1</span></a><a class="practice-site-dot" style="left:60.8%;top:75.5%" href="#buildings" data-building-jump="h" aria-label="Open Object H2"><span>H2</span></a></div>`)
    +section('buildings','',`<div class="practice-tabs practice-building-tabs" role="group" aria-label="Buildings"><button type="button" data-building="g" aria-pressed="true">Object G4 — offices</button><button type="button" data-building="h" aria-pressed="false">H1 — residential · H2 — offices</button></div>${switcher('matDrawings','Building drawings',data.matG,'16/11')}`)
    +`<div class="practice-project-note"><p>The drawings shown include only the parts Niki Jaško worked on that were retained in the final proposal.</p><p>Working within strict regulatory, spatial and technical constraints required balancing density, functionality, circulation and future constructability. One of the most challenging aspects was resolving the fire escape strategy, particularly where multiple evacuation routes converged at ground level.</p></div>`;
  }else{
   body=figure('dord-promenade','Promenade cross section, including water management proposals',true)+`<div class="practice-intro"><p>A masterplan concept addressing residential density, water management, evacuation, mobility and social infrastructure in Dordrecht.</p><p>The area is important as an evacuation point in times of emergency. The proposal uses most of the area for residential purposes and addresses effective water management, social capital, restricted car use and adaptive spaces.</p></div>`
    +section('analyses','Analyses',switcher('dordAnalysis','Analysis drawings',data.dordAnalysis))
    +section('development','Development timeline',`<div class="practice-stages"><div class="practice-toolbar"><div class="practice-tabs" role="group" aria-label="Development stages">${['Attract people','Prepare evacuation','Urban development','Sustainable urbanisation'].map((t,i)=>`<button type="button" data-stage="${i}" aria-pressed="${!i}">${t}</button>`).join('')}</div><button class="practice-play" type="button" aria-pressed="false">Play sequence</button></div><div class="practice-stage-layout"><div class="practice-stage-map"><a class="practice-media" data-drawing href="${asset('dord-stage-1')}" aria-label="Enlarge development stage">${img('dord-stage-1','Attract people')}</a></div><div class="practice-stage-description" aria-live="polite"><p class="practice-years">2023–2040</p><h3>Attract people</h3><ul><li>Border commercial spaces</li><li>Waterfront intervention</li><li>Road adaptation</li><li>Revitalisation of infrastructure</li></ul></div></div></div>${figure('dord-timeline','Visualised timeline')}`)
    +section('scenarios','Development scenarios',switcher('dordScenarios','Development scenarios',data.dordScenarios,'16/9'))
    +section('courtyards','Courtyard usage variations',pair(figure('dord-courtyards','Courtyard usage variations'),figure('dord-framework','Development framework')))
    ;
  }
  return start+body+end+`<dialog class="practice-dialog" aria-label="Drawing viewer"><div class="practice-dialog-bar"><p></p><div><button type="button" data-dialog-zoom aria-pressed="false">Zoom in</button><a target="_blank" rel="noopener" class="practice-original">Open image ↗</a><button type="button" data-dialog-close>Close</button></div></div><div class="practice-dialog-body"><img alt=""></div></dialog>`;
 };
 window.initPracticePage=root=>{
  root.classList.add('practice-page');let building='g';
  function setDrawing(wrap,items,index){
   const [key,title]=items[index],src=asset(key),image=wrap.querySelector('.practice-frame img'),s=practiceAssets[src];
   image.src=src;const preview=src.replace(/-v(79|81|82|83|84|85|86|87|90)\.webp$/,'-1280-v$1.webp');image.srcset=practiceAssets[preview]?`${preview} ${practiceAssets[preview].width}w, ${src} ${s.width}w`:'';image.alt=title;image.width=s.width;image.height=s.height;const legend=wrap.querySelector('.practice-mat-legend');if(legend)legend.innerHTML=matLegend(key);
   wrap.querySelectorAll('a').forEach(a=>{a.href=src;if(a.classList.contains('practice-media'))a.setAttribute('aria-label','Enlarge '+title)});
   wrap.querySelectorAll('[data-choice]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
  }
  root.querySelectorAll('[data-switch]').forEach(w=>w.addEventListener('click',e=>{const b=e.target.closest('[data-choice]');if(b)setDrawing(w,w.dataset.switch==='matDrawings'?data[building==='g'?'matG':'matH']:data[w.dataset.switch],Number(b.dataset.choice))}));
  function selectBuilding(key){building=key;root.querySelectorAll('[data-building]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.building===key)));setDrawing(root.querySelector('[data-switch="matDrawings"]'),data[key==='g'?'matG':'matH'],0)}
  root.querySelectorAll('[data-building],[data-building-jump]').forEach(b=>b.addEventListener('click',()=>selectBuilding(b.dataset.building||b.dataset.buildingJump)));
  const kap=root.querySelector('.practice-kap-gallery');
  if(kap){root.addEventListener('click',e=>{
   const groupButton=e.target.closest('[data-kap-group]'),viewButton=e.target.closest('[data-kap-view]'),stepButton=e.target.closest('[data-kap-step]');
   if(!groupButton&&!viewButton&&!stepButton)return;
   let group=kap.dataset.kapActive,index=Number(kap.dataset.kapIndex);
   if(groupButton){group=groupButton.dataset.kapGroup;index=0;root.querySelectorAll('[data-kap-group]').forEach(b=>b.setAttribute('aria-pressed',String(b===groupButton)))}
   else if(viewButton)index=Number(viewButton.dataset.kapView);
   else index=Math.max(0,Math.min(kapGroups[group].views.length-1,index+Number(stepButton.dataset.kapStep)));
   kap.dataset.kapActive=group;kap.dataset.kapIndex=String(index);
   if(groupButton)kap.innerHTML=kapGalleryStage(group,index);
   else{
    const key='kap-view-'+kapGroups[group].views[index],src=asset(key),small=preview(src),image=kap.querySelector('.practice-kap-frame img'),size=practiceAssets[src];
    image.src=src;image.srcset=practiceAssets[small]?`${small} ${practiceAssets[small].width}w, ${src} ${size.width}w`:'';image.width=size.width;image.height=size.height;
    kap.querySelectorAll('a[data-drawing]').forEach(a=>a.href=src);
    kap.querySelectorAll('[data-kap-view]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    kap.querySelector('[data-kap-step="-1"]').disabled=index===0;
    kap.querySelector('[data-kap-step="1"]').disabled=index===kapGroups[group].views.length-1;
   }
  })}
  const stages=[['2023–2040','Attract people',['Border commercial spaces','Waterfront intervention','Road adaptation','Revitalisation of infrastructure']],['2030','Prepare evacuation',['Creating the centre plaza','Activating bridge construction','Connecting the surrounding area','Building infrastructure around the plaza']],['2040–2060','Urban development',['Residential construction','Pedestrian passage','Maintenance']],['2050 onwards','Sustainable urbanisation',['Social engagement','Space transformation','Adding new functions']]];
  const seq=root.querySelector('.practice-stages');let stage=0,timer=null;
  function stop(){clearTimeout(timer);timer=null;if(seq){const b=seq.querySelector('.practice-play');b.textContent='Play sequence';b.setAttribute('aria-pressed','false')}}
  function showStage(n){stage=n;const [years,title,items]=stages[n],src=asset('dord-stage-'+(n+1)),im=seq.querySelector('img');im.src=src;const preview=src.replace(/-v(79|81|82|83|84|85|86|87|90)\.webp$/,'-1280-v$1.webp');im.srcset=practiceAssets[preview]?`${preview} ${practiceAssets[preview].width}w, ${src} ${practiceAssets[src].width}w`:'';im.alt=title;seq.querySelector('.practice-media').href=src;seq.querySelector('.practice-stage-description').innerHTML=`<p class="practice-years">${years}</p><h3>${title}</h3><ul>${items.map(t=>`<li>${t}</li>`).join('')}</ul>`;seq.querySelectorAll('[data-stage]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===n)));if(!matchMedia('(prefers-reduced-motion: reduce)').matches)im.animate([{opacity:.5},{opacity:1}],{duration:220});}
  function advance(){timer=setTimeout(()=>{if(stage===3){stop();return}showStage(stage+1);advance()},1800)}
  if(seq){seq.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>{stop();showStage(Number(b.dataset.stage))}));seq.querySelector('.practice-play').addEventListener('click',()=>{if(timer){stop();return}if(stage===3)showStage(0);seq.querySelector('.practice-play').textContent='Pause';seq.querySelector('.practice-play').setAttribute('aria-pressed','true');advance()});new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop()}).observe(seq);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()})}
  const dialog=root.querySelector('.practice-dialog'),viewer=dialog.querySelector('img');
  root.addEventListener('click',e=>{const a=e.target.closest('a[data-drawing]');if(!a)return;e.preventDefault();viewer.src=a.href;viewer.alt=a.querySelector('img')?.alt||a.getAttribute('aria-label')||'Project drawing';dialog.querySelector('p').textContent=viewer.alt;dialog.querySelector('.practice-original').href=a.href;dialog.querySelector('.practice-dialog-body').classList.remove('is-zoomed');dialog.querySelector('[data-dialog-zoom]').textContent='Zoom in';dialog.querySelector('[data-dialog-zoom]').setAttribute('aria-pressed','false');dialog.showModal();stop()});
  dialog.querySelector('[data-dialog-close]').addEventListener('click',()=>dialog.close());dialog.querySelector('[data-dialog-zoom]').addEventListener('click',e=>{const zoom=dialog.querySelector('.practice-dialog-body').classList.toggle('is-zoomed');e.target.textContent=zoom?'Fit drawing':'Zoom in';e.target.setAttribute('aria-pressed',String(zoom))});dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 };
})();
