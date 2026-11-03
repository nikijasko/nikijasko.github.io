function caseMapCards(data,analysis,variant){
 return data.cases.map(study=>{
  const map=study.maps[variant.id];
  return `<article class="case-column"><div class="case-heading"><h3>${study.name}</h3><p>${study.place}</p><button type="button" class="case-context" data-case-context="${study.id}" aria-label="View ${study.name} study area">Study area</button></div><button type="button" class="case-map" data-case-map="${study.id}" aria-label="Enlarge ${study.name} ${analysis.label.toLowerCase()} map"><img src="${map.src}" width="${map.width}" height="${map.height}" alt="${study.name}: ${variant.label}" loading="lazy" decoding="async"></button></article>`;
 }).join('');
}
function renderCaseComparison(data){
 const analysis=data.analyses[0],variant=analysis.variants[0];
 return `<section class="thesis-chapter case-analysis" id="analysis" aria-labelledby="heading-analysis">
  <div class="thesis-chapter-heading"><h2 id="heading-analysis">Case-study analyses</h2></div>
  <p class="case-intro">Vauban, Tsukishima and Bijlmermeer are compared side by side. Gothenburg is included as the application-site reference.</p>
  <div class="case-controls"><div class="case-tabs" role="tablist" aria-label="Analysis category">${data.analyses.map((item,i)=>`<button type="button" role="tab" id="case-tab-${item.id}" data-case-analysis="${item.id}" aria-controls="case-comparison-panel" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}">${item.label}</button>`).join('')}</div><label class="case-layer" id="case-layer-control" hidden>Map <select aria-label="Analysis map layer" id="case-map-layer"></select></label></div>
  <p class="case-description" id="case-analysis-description">${analysis.description}</p>
  <div id="case-comparison-panel" role="tabpanel" aria-labelledby="case-tab-${analysis.id}"><div class="case-scroll" role="region" aria-label="Side-by-side analysis maps" tabindex="0"><div class="case-grid">${caseMapCards(data,analysis,variant)}</div></div></div>
  <div class="case-map-notes"><p>Select a map to enlarge it.<span class="case-scroll-hint"> Scroll sideways to compare the sites.</span></p><button type="button" class="case-context" data-case-overview>Context overview</button></div>
  <p class="case-sr-only" id="case-view-status" role="status" aria-live="polite"></p>
  <dialog class="case-dialog" id="case-map-dialog" aria-labelledby="case-map-title"><div class="case-dialog-content"><div class="case-dialog-bar"><h3 id="case-map-title"></h3><button type="button" id="case-close-map" aria-label="Close enlarged map">Close</button></div><img id="case-enlarged-map" alt=""><a id="case-open-map" href="#" target="_blank" rel="noopener">Open full-size map ↗</a></div></dialog>
 </section>`;
}
function initCaseComparison(root,data){
 const section=root.querySelector('.case-analysis');if(!section)return;
 const tabs=[...section.querySelectorAll('[data-case-analysis]')],layerControl=section.querySelector('#case-layer-control'),select=section.querySelector('#case-map-layer'),grid=section.querySelector('.case-grid'),panel=section.querySelector('#case-comparison-panel'),dialog=section.querySelector('#case-map-dialog');
 const variants=new Map(data.analyses.map(item=>[item.id,item.variants[0].id]));let current=data.analyses[0];
 function updateMaps(){
  const variant=current.variants.find(item=>item.id===variants.get(current.id));
  grid.innerHTML=caseMapCards(data,current,variant);panel.setAttribute('aria-labelledby','case-tab-'+current.id);
  section.querySelector('#case-analysis-description').textContent=current.description;
  section.querySelector('#case-view-status').textContent=current.label+(current.variants.length>1?' — '+variant.label:'');
 }
 function chooseCategory(id){
  const next=data.analyses.find(item=>item.id===id);if(!next)return;current=next;
  tabs.forEach(tab=>{const active=tab.dataset.caseAnalysis===id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});
  layerControl.hidden=current.variants.length<2;
  select.innerHTML=current.variants.map(item=>`<option value="${item.id}">${item.label}</option>`).join('');select.value=variants.get(id);updateMaps();
 }
 function enlarge(map,title,opener){
  const image=dialog.querySelector('#case-enlarged-map');image.src=map.src;image.alt=title;image.width=map.width;image.height=map.height;
  dialog.querySelector('#case-map-title').textContent=title;dialog.querySelector('#case-open-map').href=map.src;
  dialog.showModal();dialog.addEventListener('close',()=>opener?.focus(),{once:true});
 }
 section.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.caseAnalysis){chooseCategory(button.dataset.caseAnalysis);return}
  if(button.hasAttribute('data-case-overview')){enlarge(data.overview,'Study-area context',button);return}
  if(button.dataset.caseMap||button.dataset.caseContext){
   const study=data.cases.find(item=>item.id===(button.dataset.caseMap||button.dataset.caseContext));if(!study)return;
   const variant=current.variants.find(item=>item.id===variants.get(current.id)),context=Boolean(button.dataset.caseContext);
   enlarge(study.maps[context?'context':variant.id],study.name+' — '+(context?'study area':current.label+(current.variants.length>1?' / '+variant.label:'')),button);
  }
 });
 section.querySelector('.case-tabs').addEventListener('keydown',event=>{
  const index=tabs.indexOf(event.target);if(index<0)return;let next;
  if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;
  event.preventDefault();tabs[next].focus();chooseCategory(tabs[next].dataset.caseAnalysis);
 });
 select.addEventListener('change',()=>{variants.set(current.id,select.value);updateMaps()});
 dialog.querySelector('#case-close-map').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
 chooseCategory(current.id);
}
