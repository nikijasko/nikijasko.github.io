(() => {
 'use strict';
 const file=key=>key+(footbridgeAssets.sizes[key+'-v65.webp']?'-v65.webp':/^bridge-[23]-render(?:-small)?$/.test(key)?'-v55.webp':'-v54.webp');
 const original=key=>footbridgeAssets.originals?.[key]||file(key.replace(/-render-small$/,'-render'));
 function image(key,alt,{hero=false,small=false}={}){
  const src=file(key),[w,h]=footbridgeAssets.sizes[src];
  const responsive=small&&footbridgeAssets.sizes[file(key+'-small')]?
   ` srcset="${file(key+'-small')} 1100w, ${src} ${w}w" sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1264px) calc(100vw - 64px), 1200px"`:'';
  return `<img src="${src}"${responsive} width="${w}" height="${h}" alt="${alt}" loading="${hero?'eager':'lazy'}" decoding="async"${hero?' fetchpriority="high"':''}>`;
 }
 const enlarge=(key,alt,caption='',opts={})=>`<figure><a class="bridge-zoom-link" href="${original(key)}" target="_blank" rel="noopener" aria-label="Enlarge ${alt}" data-bridge-enlarge data-caption="${alt}">${image(key,alt,opts)}<span class="bridge-image-expand" aria-hidden="true">↗</span></a>${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
 const sourceURL='https://mib.sk/sutaz/lavky-cez-chorvatske-rameno-v-petrzalke/';
 const principles=[
  {key:'walk',name:'Walking',copy:'Pedestrian routes across the canal and along both banks.'},
  {key:'cycle',name:'Cycling',copy:'Connections between existing and proposed cycle routes.'},
  {key:'planting',name:'Landscape',copy:'Existing planting and the proposed landscape around each crossing.'},
  {key:'uses',name:'Public space',copy:'Seating, meeting areas and public amenities at the landings.'}
 ];
 const drawings={
  drawings2:[['bridge-2-plan','Upper level'],['bridge-2-lower','Lower level']],
  drawings3:[['bridge-3-plan','Plan']]
 };
 const tabs=(labels,group,attr)=>`<div class="bridge-tabs" role="group" aria-label="${group}">${labels.map((x,i)=>`<button type="button" ${attr}="${i}" aria-pressed="${i===0}">${x}</button>`).join('')}</div>`;
 function drawingSet(id,label){
  const rows=drawings[id],r=rows[0];
  return `<div class="bridge-switch" data-bridge-gallery="${id}"><div class="bridge-toolbar">${tabs(rows.map(r=>r[1]),label,'data-drawing')}<a class="bridge-enlarge" href="${original(r[0])}" target="_blank" rel="noopener" data-bridge-enlarge data-caption="${r[1]}">Enlarge ↗</a></div><div class="bridge-image" data-drawing-display>${enlarge(r[0],r[1])}</div></div>`;
 }
 function context(){
  const m=footbridgeAssets.map;
  return `<section class="bridge-section bridge-context" id="locations">
   <div class="bridge-section-head"><h2>Locations</h2></div>
   <div class="bridge-locations">
    <div class="bridge-map-column"><div class="bridge-map" style="aspect-ratio:${m.width}/${m.height}">
     <img src="footbridges-map-v54.svg" alt="Map of both competition sites on Chorvátske rameno in Petržalka" width="${m.width}" height="${m.height}" loading="lazy">
     ${m.locations.map((s,i)=>`<button type="button" class="bridge-pin" data-site="${s.bridge}" style="left:${s.left}%;top:${s.top}%" aria-label="Select footbridge ${s.bridge}" aria-pressed="${i===0}"><span>${s.bridge}</span><b>Bridge ${s.bridge}</b></button>`).join('')}
    </div><div class="bridge-map-credit"><span>Competition sites · 2021</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap contributors</a></div></div>
    <div class="bridge-site-info">${tabs(['Footbridge 2','Footbridge 3'],'Select competition site','data-map-tab')}<div data-site-details aria-live="polite">${siteDetails(2)}</div></div>
   </div>
  </section>`;
 }
 function siteDetails(n){
  const description=n===2?'At the bend below Petržalka City.':'Between Hálova and Gessayova.';
  return `<h3>Footbridge ${n}</h3><p>${description}</p>${enlarge('bridge-'+n+'-render-small','Footbridge '+n+' in its setting')}`;
 }
 function columnBlock(n,row,title,content,cls=''){
  return `<section class="bridge-column-block ${cls}" data-bridge-row="${row}" style="--bridge-row:${row}"><h3>${title}</h3>${content}</section>`;
 }
 const detailKey=[["1", "Horizontal railing cap / stiffener"], ["2", "Timber handrail"], ["3", "Weathering-steel handrail bracket"], ["4", "LED lighting"], ["5", "5 mm weathering-steel railing plate"], ["6", "Drainage channel, 150 mm wide"], ["7", "Railing anchor bracket"], ["7a", "Anchor bracket pre-welded to the bridge frame"], ["8", "Longitudinal deck stiffener"], ["9", "Diagonal longitudinal bracing"], ["10", "Structural steel bridge frame"], ["11", "Soffit cladding support grid"], ["11a", "Weathering-steel soffit cladding"]];
 function detailLegend(){return `<dl class="bridge-detail-key">${detailKey.map(([number,label])=>`<div><dt>${number}</dt><dd>${label}</dd></div>`).join('')}</dl>`;}
 function proposal(n){
  return `<article class="bridge-proposal-column" id="bridge-${n}" style="--bridge-column:${n-1}" aria-labelledby="bridge-title-${n}">
   <header class="bridge-column-heading" style="--bridge-row:1"><h2 id="bridge-title-${n}">Footbridge ${n}</h2></header>
   ${columnBlock(n,2,'Analysis',`<div class="bridge-local-tabs">${tabs(principles.map(p=>p.name),'Footbridge '+n+' analyses','data-principle')}</div><div data-principle-image="${n}" class="bridge-analysis-image">${enlarge('bridge-'+n+'-walk','Footbridge '+n+' · Walking')}</div>`,'bridge-column-analysis')}
   ${columnBlock(n,3,'Site plan',enlarge('bridge-'+n+'-site','Footbridge '+n+' site plan'),'bridge-column-site')}
   ${columnBlock(n,4,'Floor plans',drawingSet('drawings'+n,'Footbridge '+n+' floor plans'),'bridge-column-plans')}
   ${columnBlock(n,5,'Longitudinal section',enlarge('bridge-'+n+'-long','Footbridge '+n+' longitudinal section'),'bridge-column-long')}
   ${columnBlock(n,6,'Elevation',enlarge('bridge-'+n+'-elevation','Footbridge '+n+' elevation'),'bridge-column-elevation')}
   ${columnBlock(n,7,'Transverse section',enlarge('bridge-'+n+'-profile','Footbridge '+n+' transverse section'),'bridge-column-profile')}
   ${columnBlock(n,8,'Construction detail',enlarge('bridge-'+n+'-detail','Footbridge '+n+' construction detail — English'),'bridge-column-detail')}
  </article>`;
 }
 function comparison(){
  return `<section class="bridge-section bridge-studies" id="approach">
   <div class="bridge-section-head"><h2>Analyses and proposals</h2></div>
   <div class="bridge-analysis-controls">${tabs(principles.map(p=>p.name),'Compare design analyses','data-principle')}<p data-principle-copy aria-live="polite">${principles[0].copy}</p></div>
   <div class="bridge-columns">${proposal(2)}${proposal(3)}</div>
   <section class="bridge-shared-key" aria-labelledby="bridge-detail-key-title"><h3 id="bridge-detail-key-title">Detail key</h3>${detailLegend()}</section>
  </section>`;
 }
 const lightbox=()=>`<dialog class="bridge-lightbox" aria-labelledby="bridge-lightbox-title"><div class="bridge-lightbox-bar"><p id="bridge-lightbox-title"></p><div class="bridge-lightbox-tools"><button type="button" data-lightbox-zoom="-1" aria-label="Zoom out">−</button><output data-lightbox-scale>Fit</output><button type="button" data-lightbox-zoom="1" aria-label="Zoom in">+</button><button type="button" data-lightbox-fit>Fit</button><button type="button" data-lightbox-close aria-label="Close enlarged image">Close ×</button></div></div><div class="bridge-lightbox-viewport"><div class="bridge-lightbox-sheet"><img alt=""></div></div><a class="bridge-lightbox-original" target="_blank" rel="noopener">Open full-resolution image ↗</a></dialog>`;
 window.renderFootbridgesPage=(p,next)=>`
  <a class="back" href="index.html?v=65">← Projects</a>
  <div class="project-heading"><h1>${p.title}</h1><span>Competition study · Bratislava<br>Workshop 1 · June 2021</span></div>
  <div class="bridge-lead">${enlarge('bridge-2-render','Footbridge 2 crossing Chorvátske rameno','',{hero:true,small:true})}<p>Footbridge 2</p></div>
  <div class="bridge-overview"><div><p class="bridge-intro">Two footbridges proposed for the 2021 Chorvátske rameno competition in Petržalka, Bratislava.</p><nav class="bridge-contents" aria-label="Competition project contents"><a href="#locations">Locations</a><a href="#approach">Analyses</a><a href="#bridge-2">Footbridge 2</a><a href="#bridge-3">Footbridge 3</a><a href="#structure">Construction</a></nav></div>${enlarge('bridge-3-render','Footbridge 3 in the waterside landscape','Footbridge 3',{small:true})}</div>
  ${context()}${comparison()}
  <section class="bridge-credits" aria-label="Project credits"><p>Competition study with Atelier V19 · Workshop 1 · June 2021</p><p>Collaboration: Zuzana Nádaská, Pavol Pilař, Filip Bránický, Jakub Hanzl, Peter Dúbravka, Marián Kiaba and Dajana Goda.</p><a href="${sourceURL}" target="_blank" rel="noopener">Competition archive and team credits ↗</a></section>
  <div class="next"><a href="index.html?v=65">← Projects</a><a href="project.html?v=65&id=${next.id}">Next project →</a></div>${lightbox()}`;
 function selector(buttons,onPick){
  function pick(i){buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));onPick(i);}
  buttons.forEach((b,i)=>{
   b.addEventListener('click',()=>pick(i));
   b.addEventListener('keydown',e=>{
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
    e.preventDefault();
    const j=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowLeft'?-1:1)+buttons.length)%buttons.length;
    buttons[j].focus();pick(j);
   });
  });
 }
 window.initFootbridgesPage=root=>{
  const structure=root.querySelector('#bridge-2 .bridge-column-profile');structure.id='structure';
  for(const gallery of root.querySelectorAll('[data-bridge-gallery]')){
   const rows=drawings[gallery.dataset.bridgeGallery],buttons=[...gallery.querySelectorAll('[data-drawing]')];
   selector(buttons,i=>{
    const [key,name]=rows[i],display=gallery.querySelector('[data-drawing-display]'),a=gallery.querySelector('.bridge-enlarge');
    display.innerHTML=enlarge(key,name);display.querySelector('img').loading='eager';
    a.href=original(key);a.dataset.caption=name;
   });
  }
  function selectPrinciple(i){
   const p=principles[i];
   root.querySelectorAll('[data-principle]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.principle)===i)));
   root.querySelector('[data-principle-copy]').textContent=p.copy;
   for(const n of [2,3]){
    const e=root.querySelector('[data-principle-image="'+n+'"]');
    e.innerHTML=enlarge('bridge-'+n+'-'+p.key,'Footbridge '+n+' · '+p.name);e.querySelector('img').loading='eager';
   }
  }
  root.querySelectorAll('.bridge-tabs').forEach(group=>{
   const buttons=[...group.querySelectorAll('[data-principle]')];
   if(buttons.length)selector(buttons,selectPrinciple);
  });
  const mapTabs=[...root.querySelectorAll('[data-map-tab]')],pins=[...root.querySelectorAll('[data-site]')];
  function selectSite(n){
   pins.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.site)===n)));
   mapTabs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i+2===n)));
   const e=root.querySelector('[data-site-details]');e.innerHTML=siteDetails(n);e.querySelector('img').loading='eager';
  }
  pins.forEach(b=>b.addEventListener('click',()=>selectSite(Number(b.dataset.site))));
  selector(mapTabs,i=>selectSite(i+2));
  const dialog=root.querySelector('.bridge-lightbox'),img=dialog.querySelector('img'),viewport=dialog.querySelector('.bridge-lightbox-viewport'),sheet=dialog.querySelector('.bridge-lightbox-sheet'),scale=dialog.querySelector('[data-lightbox-scale]');
  let trigger=null,zoom=1,previousOverflow='';
  function resize(){
   sheet.style.width=zoom===1?'100%':(zoom*100)+'%';sheet.style.height=zoom===1?'100%':'auto';
   img.classList.toggle('is-zoomed',zoom>1);scale.textContent=zoom===1?'Fit':Math.round(zoom*100)+'%';
   dialog.querySelector('[data-lightbox-zoom="-1"]').disabled=zoom===1;dialog.querySelector('[data-lightbox-zoom="1"]').disabled=zoom>=3;
  }
  root.addEventListener('click',e=>{
   const a=e.target.closest('[data-bridge-enlarge]');
   if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;
   e.preventDefault();trigger=a;zoom=1;resize();
   img.src=a.href;img.alt=a.dataset.caption||'Project drawing';
   dialog.querySelector('#bridge-lightbox-title').textContent=img.alt;dialog.querySelector('.bridge-lightbox-original').href=a.href;
   previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();
   viewport.scrollTop=viewport.scrollLeft=0;dialog.querySelector('[data-lightbox-close]').focus();
  });
  dialog.querySelector('[data-lightbox-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;img.removeAttribute('src');trigger?.focus({preventScroll:true});});
  dialog.querySelectorAll('[data-lightbox-zoom]').forEach(b=>b.addEventListener('click',()=>{zoom=Math.min(3,Math.max(1,zoom+Number(b.dataset.lightboxZoom)*.5));resize();}));
  dialog.querySelector('[data-lightbox-fit]').addEventListener('click',()=>{zoom=1;resize();viewport.scrollTop=viewport.scrollLeft=0;});
 };
})();
