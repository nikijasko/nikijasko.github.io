function renderSchoolPage(p,next){
 const image=(key,alt,width,height,eager=false)=>`<a href="school-${key}-v35.webp" target="_blank" rel="noopener"><img src="school-${key}-v35.webp" alt="${alt}" width="${width}" height="${height}" loading="${eager?'eager':'lazy'}"></a>`;
 const controls=(suffix)=>`<div class="school-plan-toolbar"><div role="tablist" aria-label="Floor plans${suffix==='large'?' enlarged':''}">${['First','Second','Third'].map((name,i)=>`<button type="button" role="tab" id="school-floor-${suffix}-${i}" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}" aria-controls="school-plan-${suffix}" data-floor="${i}">${name} floor</button>`).join('')}</div>${suffix==='main'?'<button type="button" class="school-enlarge" id="school-plan-enlarge">Enlarge ↗</button>':'<button type="button" class="school-enlarge" id="school-plan-close" aria-label="Close enlarged plan">Close ×</button>'}</div>`;
 const layers=(suffix)=>`<div class="school-plan-scroll"><div class="school-plan-stage" id="school-plan-${suffix}" role="tabpanel" aria-labelledby="school-floor-${suffix}-0" tabindex="0"><img class="school-plan-base" src="school-plan-first-v35.webp" alt="First-floor plan with the school site and surroundings" width="3000" height="1510" loading="lazy">${['second','third'].map((key,i)=>`<img class="school-plan-upper" data-plan-floor="${i+1}" src="school-plan-${key}-v38.webp" alt="${i===0?'Second':'Third'}-floor plan aligned with the site" width="3000" height="1510" loading="lazy" hidden>`).join('')}</div></div>`;
 return `<a class="back" href="index.html?v=44">← Projects</a><div class="project-heading"><h1>${p.title}</h1><span>${p.type} · ${p.year}</span></div><div class="intro"><p>${p.text}</p><p class="credits">${p.credit}</p></div>
 <section class="school-renderings" aria-label="Project renderings"><figure class="school-hero">${image('exterior','The main school entrance and muted-red facade',2600,1463,true)}</figure><div class="school-render-grid"><figure>${image('entrance','Entrance hall looking toward the courtyard',1600,900)}</figure><figure>${image('commons','Shared seating and library spaces',1600,900)}</figure><figure>${image('stairs','Timber structure and the main staircase',1600,900)}</figure><figure>${image('seating','Tiered seating beside the courtyard',1600,900)}</figure></div></section>
 <section class="school-section" id="floor-plans" aria-labelledby="school-floor-heading"><h2 id="school-floor-heading">Floor plans</h2>${controls('main')}${layers('main')}<p class="school-plan-note">The site fades beneath the second and third floors.</p></section>
 <figure class="school-context">${image('context','Axonometric view of the school and its neighbourhood',2200,1065)}<figcaption>The school in its surroundings</figcaption></figure>
 <section class="school-section" id="construction" aria-labelledby="school-construction-heading"><h2 id="school-construction-heading">Construction</h2><div class="school-construction-copy">${p.construction.map(text=>`<p>${text}</p>`).join('')}</div><iframe class="school-model" title="Interactive school structural model" src="construction-viewer-v18.html" loading="lazy"></iframe><div class="school-detail-grid"><figure>${image('module','Construction module showing the floor and roof build-ups',1800,1476)}<figcaption>Construction module</figcaption></figure><figure>${image('joint','Detail of the prefabricated structural joint',1800,1333)}<figcaption>Structural joint</figcaption></figure></div></section>
 <dialog class="school-plan-dialog" id="school-plan-dialog" aria-label="Enlarged floor plans">${controls('large')}${layers('large')}</dialog><div class="next"><a href="index.html?v=44">← Projects</a><a href="project.html?v=44&id=${next.id}">Next project →</a></div>`;
}
function initSchoolPage(root){
 const tabs=[...root.querySelectorAll('[data-floor]')];
 let selected=0;
 function selectFloor(index){
  selected=index;
  tabs.forEach(tab=>{const on=Number(tab.dataset.floor)===index;tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1;});
  root.querySelectorAll('.school-plan-stage').forEach(stage=>{
   stage.classList.toggle('has-upper-floor',index>0);
   stage.setAttribute('aria-labelledby',`school-floor-${stage.id.endsWith('large')?'large':'main'}-${index}`);
   stage.querySelector('.school-plan-base').alt=index===0?'First-floor plan with the school site and surroundings':'Faded first-floor and site reference';
   stage.querySelectorAll('[data-plan-floor]').forEach(img=>img.hidden=Number(img.dataset.planFloor)!==index);
  });
 }
 tabs.forEach(tab=>{
  tab.addEventListener('click',()=>selectFloor(Number(tab.dataset.floor)));
  tab.addEventListener('keydown',event=>{
   const delta=event.key==='ArrowRight'?1:event.key==='ArrowLeft'?-1:0;
   if(!delta&&event.key!=='Home'&&event.key!=='End')return;
   event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?2:(selected+delta+3)%3;
   selectFloor(next);tab.parentElement.querySelector(`[data-floor="${next}"]`).focus();
  });
 });
 const dialog=root.querySelector('#school-plan-dialog');
 root.querySelector('#school-plan-enlarge').addEventListener('click',()=>{dialog.showModal();dialog.querySelector(`[data-floor="${selected}"]`).focus();});
 root.querySelector('#school-plan-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
}
