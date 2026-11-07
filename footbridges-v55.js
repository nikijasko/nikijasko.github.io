(() => {
 'use strict';
 const file=key=>key+(/^bridge-[23]-render(?:-small)?$/.test(key)?'-v55.webp':'-v54.webp');
 function image(key,alt,{hero=false,small=false}={}){
  const src=file(key),[w,h]=footbridgeAssets.sizes[src];
  const responsive=small&&footbridgeAssets.sizes[file(key+'-small')]?
   ` srcset="${file(key+'-small')} 1100w, ${src} ${w}w" sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1264px) calc(100vw - 64px), 1200px"`:'';
  return `<img src="${src}"${responsive} width="${w}" height="${h}" alt="${alt}" loading="${hero?'eager':'lazy'}" decoding="async"${hero?' fetchpriority="high"':''}>`;
 }
 const enlarge=(key,alt,caption='',opts={})=>`<figure><a class="bridge-zoom-link" href="${file(key.replace(/-render-small$/,'-render'))}" target="_blank" rel="noopener" aria-label="Enlarge ${alt}" data-bridge-enlarge data-caption="${alt}">${image(key,alt,opts)}<span class="bridge-image-expand" aria-hidden="true">↗</span></a>${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
 const sourceURL='https://mib.sk/sutaz/lavky-cez-chorvatske-rameno-v-petrzalke/';
 const principles=[
  {key:'walk',name:'Walking',intro:'Continue the routes across the water.',copy:'Both bridges join the paths along the channel to routes arriving from the neighbourhood. The landings are shaped around those connections.'},
  {key:'cycle',name:'Cycling',intro:'Connect the two banks.',copy:'The crossings link the cycle routes on either side. The approaches make the bridge part of the surrounding network of paths.'},
  {key:'planting',name:'Landscape',intro:'Work with the green corridor.',copy:'The paths and landings fit between the planted banks. Wider spaces beside the crossings give people somewhere to sit and stay.'},
  {key:'uses',name:'Public space',intro:'Give the landings a use of their own.',copy:'The approaches are places to meet and look over the water. Bridge 2 also introduces a lower level with public amenities, including toilets.'}
 ];
 const drawings={
  drawings2:[
   ['bridge-2-plan','Upper plan','The upper level continues the crossing into the routes on both banks.'],
   ['bridge-2-lower','Lower plan','The lower route runs beside the water, with public amenities set into the approach.'],
   ['bridge-2-long','Longitudinal section','The section connects the deck, bank levels and spaces beneath the bridge.'],
   ['bridge-2-elevation','Elevation','The tapering edge keeps the profile light when seen from the waterside paths.']
  ],
  drawings3:[
   ['bridge-3-plan','Plan','The landings bring the residential paths and waterside routes together.'],
   ['bridge-3-long','Longitudinal section','Steps and ramps connect the levels and make places to sit beside the crossing.'],
   ['bridge-3-elevation','Elevation','The thin deck and corten railing sit below the trees and surrounding buildings.']
  ],
  details:[
   ['bridge-2-detail','Bridge 2 detail','The original detail shows the welded steel deck, corten cladding and railing, drainage, and a timber handrail with integrated lighting.'],
   ['bridge-3-detail','Bridge 3 detail','The same material and structural language is adjusted for the other crossing.']
  ]
 };
 const tabs=(labels,group,attr)=>`<div class="bridge-tabs" role="group" aria-label="${group}">${labels.map((x,i)=>`<button type="button" ${attr}="${i}" aria-pressed="${i===0}">${x}</button>`).join('')}</div>`;
 function drawingSet(id,label){
  const rows=drawings[id],r=rows[0];
  return `<div class="bridge-switch" data-bridge-gallery="${id}">
   <div class="bridge-toolbar">${tabs(rows.map(r=>r[1]),label,'data-drawing')}<a class="bridge-enlarge" href="${file(r[0])}" target="_blank" rel="noopener" data-bridge-enlarge data-caption="${r[1]}">Enlarge ↗</a></div>
   <p class="bridge-note" data-explanation aria-live="polite">${r[2]}</p>
   <div class="bridge-image" data-drawing-display>${enlarge(r[0],r[1])}</div>
  </div>`;
 }
 function context(){
  const m=footbridgeAssets.map;
  return `<section class="bridge-section bridge-context" id="locations">
   <div class="bridge-section-head"><div><p class="bridge-eyebrow">The setting</p><h2>Two sites on Chorvátske rameno</h2></div><p>Between Rusovská cesta and Romanova, the green corridor separates two sides of Petržalka. The competition proposed new crossings to link the neighbourhood and the planned tram extension.</p></div>
   <div class="bridge-locations">
    <div class="bridge-map-column"><div class="bridge-map" style="aspect-ratio:${m.width}/${m.height}">
     <img src="footbridges-map-v54.svg" alt="Map of both competition sites on Chorvátske rameno in Petržalka" width="${m.width}" height="${m.height}" loading="lazy">
     ${m.locations.map((s,i)=>`<button type="button" class="bridge-pin" data-site="${s.bridge}" style="left:${s.left}%;top:${s.top}%" aria-label="Select footbridge ${s.bridge}" aria-pressed="${i===0}"><span>${s.bridge}</span><b>Bridge ${s.bridge}</b></button>`).join('')}
    </div><div class="bridge-map-credit"><span>Indicative competition sites · 2021 brief</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap contributors</a></div></div>
    <div class="bridge-site-info">${tabs(['Footbridge 2','Footbridge 3'],'Select competition site','data-map-tab')}<div data-site-details aria-live="polite">${siteDetails(2)}</div></div>
   </div>
  </section>`;
 }
 function siteDetails(n){
  const desc=n===2?'At the bend below Petržalka City. The crossing reaches into a wider sequence of paths and public spaces on the banks.':'Further south, between Hálova and Gessayova. The crossing gathers the residential and waterside paths into one landing.';
  return `<p class="bridge-site-kicker">Competition site ${n}</p><h3>Footbridge ${n}</h3><p>${desc}</p>${enlarge('bridge-'+n+'-render-small','Footbridge '+n+' in its setting')}<a class="bridge-view-link" href="#bridge-${n}">Explore this proposal ↓</a>`;
 }
 function comparison(){
  return `<section class="bridge-section bridge-principles" id="approach">
   <div class="bridge-section-head"><div><p class="bridge-eyebrow">The approach</p><h2>A common idea, two settings</h2></div><p>Both designs begin with the routes and spaces on the banks. Compare the same design principle at the two sites.</p></div>
   ${tabs(principles.map(p=>p.name),'Compare design principles','data-principle')}
   <div class="bridge-principle-copy" aria-live="polite"><h3 data-principle-title>${principles[0].intro}</h3><p data-principle-copy>${principles[0].copy}</p></div>
   <div class="bridge-comparison" data-comparison>
    ${[2,3].map(n=>`<div><h4>Footbridge ${n}</h4><div data-principle-image="${n}">${enlarge('bridge-'+n+'-walk','Footbridge '+n+' · Walking routes')}</div></div>`).join('')}
   </div>
  </section>`;
 }
 function proposal(n){
  const copy=n===2?'Here, the crossing grows into a sequence of public spaces. Ramps and stairs connect the different levels, while a lower route gives access to the water and the amenities beneath the approach.':'The second proposal uses the same thin profile in a different part of the corridor. Steps, ramps and wider landings bring the residential paths and the waterside routes together.';
  const caption=n===2?'Routes continue into the spaces on both banks.':'The landings gather the paths arriving from the neighbourhood.';
  return `<section class="bridge-section bridge-proposal" id="bridge-${n}">
   <div class="bridge-section-head"><div><p class="bridge-eyebrow">${n===2?'At Petržalka City':'Along the residential paths'}</p><h2>Footbridge ${n}</h2></div><p>${copy}</p></div>
   <div class="bridge-plan-study">
    <div class="bridge-site-drawing">${enlarge('bridge-'+n+'-site','Footbridge '+n+' site plan','Site plan · '+caption)}</div>
    <div class="bridge-technical"><h3>Plans and sections</h3>${drawingSet('drawings'+n,'Footbridge '+n+' drawings')}</div>
   </div>
  </section>`;
 }
 function construction(){
  return `<section class="bridge-section bridge-structure" id="structure">
   <div class="bridge-section-head"><div><p class="bridge-eyebrow">Construction</p><h2>The thin edge</h2></div><div><p>The deck is deepest along its centreline and tapers toward the sides. The thin edges make the crossings appear light when seen from the paths below.</p><p>Welded steel and corten form the deck and railings. Exposed concrete at the approaches and a timber handrail complete the shared material palette.</p></div></div>
   <p class="bridge-contribution">My contribution focused on the visualisations and the shape of the transverse section.</p>
   <div class="bridge-profile-pair">${[2,3].map(n=>`<div><h3>Footbridge ${n}</h3>${enlarge('bridge-'+n+'-profile','Footbridge '+n+' transverse section')}</div>`).join('')}</div>
   <div class="bridge-construction-details">${drawingSet('details','Construction details')}</div>
  </section>`;
 }
 const lightbox=()=>`<dialog class="bridge-lightbox" aria-labelledby="bridge-lightbox-title"><div class="bridge-lightbox-bar"><p id="bridge-lightbox-title"></p><div class="bridge-lightbox-tools"><button type="button" data-lightbox-zoom="-1" aria-label="Zoom out">−</button><output data-lightbox-scale>Fit</output><button type="button" data-lightbox-zoom="1" aria-label="Zoom in">+</button><button type="button" data-lightbox-fit>Fit</button><button type="button" data-lightbox-close aria-label="Close enlarged image">Close ×</button></div></div><div class="bridge-lightbox-viewport"><div class="bridge-lightbox-sheet"><img alt=""></div></div><a class="bridge-lightbox-original" target="_blank" rel="noopener">Open full-resolution image ↗</a></dialog>`;
 window.renderFootbridgesPage=(p,next)=>`
  <a class="back" href="index.html?v=55">← Projects</a>
  <div class="project-heading"><h1>${p.title}</h1><span>Competition study · Bratislava<br>Workshop 1 · June 2021</span></div>
  <div class="bridge-lead">${enlarge('bridge-2-render','Footbridge 2 crossing Chorvátske rameno','',{hero:true,small:true})}<p>Footbridge 2</p></div>
  <div class="bridge-overview"><div><p class="bridge-intro">Two crossings for the 2021 competition in Petržalka, Bratislava. A shared structural idea connects two different settings along Chorvátske rameno.</p><p class="bridge-overview-copy">The proposals extend beyond the span of each bridge. Paths, landings and spaces beside the water make the crossings part of the surrounding neighbourhood.</p><nav class="bridge-contents" aria-label="Competition project contents"><a href="#locations">The sites</a><a href="#approach">The approach</a><a href="#bridge-2">Footbridge 2</a><a href="#bridge-3">Footbridge 3</a><a href="#structure">Construction</a></nav></div>${enlarge('bridge-3-render','Footbridge 3 in the waterside landscape','Footbridge 3',{small:true})}</div>
  ${context()}${comparison()}${proposal(2)}${proposal(3)}${construction()}
  <section class="bridge-credits" aria-label="Project credits"><p>Competition study with Atelier V19 · Workshop 1 · June 2021</p><p>Collaboration: Zuzana Nádaská, Pavol Pilař, Filip Bránický, Jakub Hanzl, Peter Dúbravka, Marián Kiaba and Dajana Goda.</p><a href="${sourceURL}" target="_blank" rel="noopener">Competition archive, brief and full team credits ↗</a></section>
  <div class="next"><a href="index.html?v=55">← Projects</a><a href="project.html?v=55&id=${next.id}">Next project →</a></div>${lightbox()}`;
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
  for(const gallery of root.querySelectorAll('[data-bridge-gallery]')){
   const rows=drawings[gallery.dataset.bridgeGallery],buttons=[...gallery.querySelectorAll('[data-drawing]')];
   selector(buttons,i=>{
    const [key,name,copy]=rows[i],display=gallery.querySelector('[data-drawing-display]'),a=gallery.querySelector('.bridge-enlarge');
    display.innerHTML=enlarge(key,name);display.querySelector('img').loading='eager';
    gallery.querySelector('[data-explanation]').textContent=copy;a.href=file(key);a.dataset.caption=name;
   });
  }
  selector([...root.querySelectorAll('[data-principle]')],i=>{
   const p=principles[i];
   root.querySelector('[data-principle-title]').textContent=p.intro;
   root.querySelector('[data-principle-copy]').textContent=p.copy;
   for(const n of [2,3]){
    const e=root.querySelector('[data-principle-image="'+n+'"]');
    e.innerHTML=enlarge('bridge-'+n+'-'+p.key,'Footbridge '+n+' · '+p.name);e.querySelector('img').loading='eager';
   }
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
