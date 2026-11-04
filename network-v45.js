/* The four layers are extracted from the author's changes.pdf; no routes are redrawn. */
function renderNetworkStudy(){
 return `<section class="network-study" aria-labelledby="network-heading">
  <h3 id="network-heading">Proposed network changes</h3>
  <div class="network-tabs" role="tablist" aria-label="Network changes">
   ${['Existing network','Removals','New connections','Proposed network'].map((name,i)=>`<button type="button" role="tab" id="network-tab-${i}" aria-controls="network-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-network-stage="${i}">${name}</button>`).join('')}
  </div>
  <div class="network-layout" id="network-panel" role="tabpanel" aria-labelledby="network-tab-0">
   <div class="network-map-column">
    <div class="network-map" aria-busy="true"><p class="network-loading" role="status">Loading drawing…</p></div>
    <div class="network-map-footer"><a href="mt-original-10.jpg" target="_blank" rel="noopener">Original drawing ↗</a></div>
    <p class="network-source">Base imagery © Bing Maps · Drawing by Niki Jaško</p>
   </div>
   <div class="network-copy" aria-live="polite" aria-atomic="true"><h4></h4><p class="network-description"></p><ul class="network-legend" aria-label="Map legend"></ul><a class="network-to-plan" href="#masterplan">Explore the building rules ↓</a></div>
  </div>
 </section>`;
}
function initNetworkStudy(root){
 const section=root.querySelector('.network-study');if(!section)return;
 const stages=[
  {title:'Start with the existing network',description:'The study begins with the existing street network around Litteraturgatan. The dashed boundaries locate the study area and the site within the surrounding neighbourhoods.',removed:true,added:false,legend:[['retained','Existing network'],['boundary','Study and site boundaries']]},
  {title:'Remove selected segments',description:'Orange highlights the segments removed in the proposal. These include a poorly connected street east of Litteraturgatan and selected links adjusted as part of the wider network.',removed:true,added:false,legend:[['retained','Unchanged network'],['removed','Removed segments'],['boundary','Study and site boundaries']]},
  {title:'Connect locally and across the city',description:'Green marks new local links and connections towards Ringön and Gullbergsvass. These additions link the site to the surrounding network, improving continuity and reducing breaks in pedestrian routes.',removed:false,added:true,legend:[['retained','Unchanged network'],['added','Added segments'],['boundary','Study and site boundaries']]},
  {title:'A shared structure for development',description:'The adjusted network provides the starting point for the masterplan. Streets and plots give future development a shared structure; the building rules below guide what can be built within it.',removed:false,added:true,legend:[['retained','Unchanged network'],['added','Added segments'],['boundary','Study and site boundaries']]}
 ];
 const tabs=[...section.querySelectorAll('[data-network-stage]')],panel=section.querySelector('#network-panel'),map=section.querySelector('.network-map');
 let stage=0,svg;
 function camera(){if(!svg)return;const box=[180,195,185,420];const ratio=map.clientWidth/map.clientHeight,width=Math.max(box[2],box[3]*ratio),height=Math.max(box[3],box[2]/ratio);svg.setAttribute('viewBox',[Math.max(0,Math.min(595-width,box[0]+box[2]/2-width/2)),box[1]+box[3]/2-height/2,width,height].join(' '))}
 function choose(index){
  stage=index;const data=stages[stage];
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===stage));tab.tabIndex=i===stage?0:-1});
  panel.setAttribute('aria-labelledby',tabs[stage].id);
  section.querySelector('.network-copy h4').textContent=data.title;
  section.querySelector('.network-description').textContent=data.description;
  section.querySelector('.network-legend').innerHTML=data.legend.map(([key,label])=>`<li><span class="network-key network-key--${key}" aria-hidden="true"></span>${label}</li>`).join('');
  map.dataset.stage=String(stage);
  if(svg){svg.querySelector('[data-network-layer="removed"]').style.display=data.removed?'':'none';svg.querySelector('[data-network-layer="added"]').style.display=data.added?'':'none'}
  camera();
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>choose(i));
  tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%tabs.length;else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();choose(next);tabs[next].focus()});
 });
 choose(0);
 async function load(){
  map.setAttribute('aria-busy','true');
  try{
   const response=await fetch('network-drawing-v44.svg');if(!response.ok)throw new Error('Drawing unavailable');
   const documentSvg=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
   const drawing=documentSvg.documentElement;if(drawing.localName!=='svg'||documentSvg.querySelector('parsererror'))throw new Error('Invalid drawing');
   svg=document.importNode(drawing,true);svg.setAttribute('role','img');svg.setAttribute('aria-label','Street network proposal around Litteraturgatan, showing the original retained, removed and added segments');svg.setAttribute('preserveAspectRatio','xMidYMid meet');
   map.replaceChildren(svg);map.setAttribute('aria-busy','false');choose(stage);
  }catch(error){map.setAttribute('aria-busy','false');map.innerHTML='<p class="network-loading">The drawing could not load. <button type="button" class="network-retry">Try again</button> or <a href="mt-original-10.jpg" target="_blank" rel="noopener">open the original drawing ↗</a>.</p>';map.querySelector('.network-retry').addEventListener('click',load)}
 }
 if('ResizeObserver' in window)new ResizeObserver(camera).observe(map);
 load();
}
