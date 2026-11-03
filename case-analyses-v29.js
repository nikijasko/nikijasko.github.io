function caseMapCards(data,view){
 return data.cases.map(study=>{
  const map=study.maps[view.id];
  return `<article class="case-column"><div class="case-heading"><h3>${study.name}</h3><p>${study.place}</p><button type="button" class="case-context" data-case-context="${study.id}" aria-label="View ${study.name} study area">Study area</button></div><button type="button" class="case-map" data-case-map="${study.id}" aria-label="Enlarge ${study.name} ${view.label.toLowerCase()} map"><img src="${map.src}" width="${map.width}" height="${map.height}" alt="${study.name}: ${view.label}" loading="lazy" decoding="async"></button></article>`;
 }).join('');
}
function renderCaseComparison(data){
 const view=data.views[0];
 return `<section class="thesis-chapter case-analysis" id="analysis" aria-labelledby="heading-analysis">
  <h2 id="heading-analysis">Case-study analyses</h2>
  <div class="case-controls"><div class="case-tabs" role="tablist" aria-label="Analysis maps">${data.views.map((item,i)=>`<button type="button" role="tab" id="case-tab-${item.id}" data-case-view="${item.id}" aria-controls="case-comparison-panel" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}">${item.label}</button>`).join('')}</div></div>
  <div id="case-comparison-panel" class="case-layout" role="tabpanel" aria-labelledby="case-tab-${view.id}">
   <aside class="case-explanation" aria-label="About this analysis"><h3>${view.question}</h3><p>${view.description}</p></aside>
   <div class="case-scroll" role="region" aria-label="Side-by-side analysis maps" tabindex="0"><div class="case-grid">${caseMapCards(data,view)}</div></div>
  </div>
  <p class="case-map-notes">Select a map to enlarge it.<span class="case-scroll-hint"> Scroll sideways to compare the sites.</span></p>
  <p class="case-sr-only" id="case-view-status" role="status" aria-live="polite"></p>
  <dialog class="case-dialog" id="case-map-dialog" aria-labelledby="case-map-title"><div class="case-dialog-content"><div class="case-dialog-bar"><h3 id="case-map-title"></h3><button type="button" id="case-close-map" aria-label="Close enlarged map">Close</button></div><img id="case-enlarged-map" alt=""><a id="case-open-map" href="#" target="_blank" rel="noopener">Open full-size map ↗</a></div></dialog>
 </section>`;
}
function initCaseComparison(root,data){
 const section=root.querySelector('.case-analysis');if(!section)return;
 const tabs=[...section.querySelectorAll('[data-case-view]')],grid=section.querySelector('.case-grid'),panel=section.querySelector('#case-comparison-panel'),dialog=section.querySelector('#case-map-dialog');
 let current=data.views[0];
 function chooseView(id){
  const next=data.views.find(item=>item.id===id);if(!next)return;current=next;
  tabs.forEach(tab=>{const active=tab.dataset.caseView===id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});
  grid.innerHTML=caseMapCards(data,current);panel.setAttribute('aria-labelledby','case-tab-'+id);
  section.querySelector('.case-explanation h3').textContent=current.question;
  section.querySelector('.case-explanation p').textContent=current.description;
  section.querySelector('#case-view-status').textContent=current.label;
 }
 function enlarge(map,title,opener){
  const image=dialog.querySelector('#case-enlarged-map');image.src=map.src;image.alt=title;image.width=map.width;image.height=map.height;
  dialog.querySelector('#case-map-title').textContent=title;dialog.querySelector('#case-open-map').href=map.src;
  dialog.showModal();dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}),{once:true});
 }
 section.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.caseView){chooseView(button.dataset.caseView);return}
  if(button.dataset.caseMap||button.dataset.caseContext){
   const study=data.cases.find(item=>item.id===(button.dataset.caseMap||button.dataset.caseContext));if(!study)return;
   const context=Boolean(button.dataset.caseContext);
   enlarge(study.maps[context?'context':current.id],study.name+' — '+(context?'study area':current.label),button);
  }
 });
 section.querySelector('.case-tabs').addEventListener('keydown',event=>{
  const index=tabs.indexOf(event.target);if(index<0)return;let next;
  if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;
  event.preventDefault();tabs[next].focus();chooseView(tabs[next].dataset.caseView);
 });
 dialog.querySelector('#case-close-map').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
 chooseView(current.id);
}
