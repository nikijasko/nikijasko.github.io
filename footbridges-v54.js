(() => {
 'use strict';
 const file=key=>key+'-v54.webp';
 const image=(key,alt,{hero=false,small=false}={})=>{
  const src=file(key),[w,h]=footbridgeAssets.sizes[src];
  const responsive=small&&footbridgeAssets.sizes[file(key+'-small')]?
   ` srcset="${file(key+'-small')} 1100w, ${src} ${w}w" sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1264px) calc(100vw - 64px), 1200px"`:'';
  return `<img src="${src}"${responsive} width="${w}" height="${h}" alt="${alt}" loading="${hero?'eager':'lazy'}" decoding="async"${hero?' fetchpriority="high"':''}>`;
 };
 const figure=(key,alt,caption='',opts={})=>`<figure><a href="${file(key)}" target="_blank" rel="noopener" aria-label="Enlarge ${alt}">${image(key,alt,opts)}</a>${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
 const link=key=>`<a class="bridge-enlarge" href="${file(key)}" target="_blank" rel="noopener">Enlarge ↗</a>`;
 const sourceURL='https://mib.sk/sutaz/lavky-cez-chorvatske-rameno-v-petrzalke/';
 const paths={
  2:[
   ['bridge-2-walk','Walking','The bridge joins the paths along the channel and continues the routes leading from both banks.'],
   ['bridge-2-cycle','Cycling','The crossing connects to the cycle routes running along the water, with the approaches spread into the surrounding path network.'],
   ['bridge-2-planting','Landscape','The site plan works with the planted banks and creates places to stop beside the water.'],
   ['bridge-2-uses','Public space','The approach becomes a place to stay as well as pass through. The lower level includes public amenities, including toilets.']
  ],
  3:[
   ['bridge-3-walk','Walking','Paths from the housing and the waterfront meet at the crossing. The design brings them together on both banks.'],
   ['bridge-3-cycle','Cycling','The bridge links the cycle routes on the two sides of the channel.'],
   ['bridge-3-planting','Landscape','The approaches meet the existing green corridor, with planting retained around the paths and stepped seating.'],
   ['bridge-3-uses','Public space','The landings widen to make room for people to stop, meet and look over the channel.']
  ]
 };
 const drawings={
  2:[
   ['bridge-2-plan','Upper plan','The upper plan shows the crossing and how it branches into the paths on both sides.'],
   ['bridge-2-lower','Lower plan','The lower level places the amenities alongside the bank and connects them to the paths beneath the crossing.'],
   ['bridge-2-long','Longitudinal section','The section follows the deck, bank levels and spaces beneath the bridge.'],
   ['bridge-2-elevation','Elevation','The elevation shows the slim edge of the deck in the landscape.']
  ],
  3:[
   ['bridge-3-plan','Plan','The crossing follows a direct route across the channel, with steps and ramps meeting the landings.'],
   ['bridge-3-long','Longitudinal section','The section shows the bridge resting between the banks, with stepped access and places to sit beside it.'],
   ['bridge-3-elevation','Elevation','The thin deck and corten railing sit below the trees and surrounding buildings.']
  ]
 };
 const profiles=[
  ['bridge-2-profile','Bridge 2','The cross-section keeps the greatest depth on the centreline and tapers toward both edges.'],
  ['bridge-3-profile','Bridge 3','The same construction idea is adjusted for the second crossing.'],
  ['bridge-2-detail','Detail · Bridge 2','The original detail shows the welded steel deck, corten cladding and railing, drainage and the timber handrail with integrated lighting.'],
  ['bridge-3-detail','Detail · Bridge 3','The marked-up section shows the deck and handrail assembly at the other crossing.']
 ];
 const groups={paths2:paths[2],paths3:paths[3],drawings2:drawings[2],drawings3:drawings[3],profiles};
 function switcher(id,name){
  const rows=groups[id],item=rows[0];
  return `<div class="bridge-switch" data-bridge-gallery="${id}">
   <div class="bridge-toolbar"><div class="bridge-tabs" role="group" aria-label="${name}">${rows.map(([key,title],i)=>`<button type="button" data-drawing="${i}" aria-pressed="${i===0}">${title}</button>`).join('')}</div>${link(item[0])}</div>
   <p class="bridge-note" data-explanation aria-live="polite">${item[2]}</p>
   <div class="bridge-image" data-drawing-display>${image(item[0],item[1])}</div>
  </div>`;
 }
 function locationMap(){
  const map=footbridgeAssets.map;
  return `<section class="bridge-section" id="locations"><h2>Two sites along the same channel</h2>
   <p class="bridge-copy">Both sites lie between Rusovská cesta and Romanova in Petržalka. The proposals connect the routes beside Chorvátske rameno with the surrounding neighbourhood and the tram extension planned in the competition brief.</p>
   <div class="bridge-locations">
    <div class="bridge-map-column">
     <div class="bridge-map" style="aspect-ratio:${map.width}/${map.height}">
      <img src="footbridges-map-v54.svg" alt="Location map of Chorvátske rameno between Rusovská cesta and Romanova in Petržalka" width="${map.width}" height="${map.height}" loading="lazy">
      ${map.locations.map((s,i)=>`<button type="button" class="bridge-pin" data-site="${s.bridge}" style="left:${s.left}%;top:${s.top}%" aria-label="Select footbridge ${s.bridge}" aria-pressed="${i===0}"><span>${s.bridge}</span><b>Bridge ${s.bridge}</b></button>`).join('')}
     </div>
     <div class="bridge-map-credit"><span>Indicative competition sites · 2021 brief</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap contributors</a></div>
    </div>
    <div class="bridge-site-info">
     <div class="bridge-tabs" role="group" aria-label="Select competition site"><button type="button" data-site="2" aria-pressed="true">Footbridge 2</button><button type="button" data-site="3" aria-pressed="false">Footbridge 3</button></div>
     <div data-site-details aria-live="polite">${siteDetails(2)}</div>
    </div>
   </div>
   <a class="bridge-source" href="${sourceURL}" target="_blank" rel="noopener">Competition brief and entries · MIB ↗</a>
  </section>`;
 }
 function siteDetails(n){
  const desc=n===2?'At the bend below Petržalka City, the proposal continues the crossing into a sequence of paths and spaces on the banks.':'Further south, the proposal connects the residential paths between Hálova and Gessayova across the green corridor.';
  return `<h3>Footbridge ${n}</h3><p>${desc}</p>${image('bridge-'+n+'-render-small','Footbridge '+n+' proposal in its setting')}<a class="bridge-view-link" href="#bridge-${n}">View the proposal ↓</a>`;
 }
 function proposal(n){
  const text=n===2?'The bridge reaches beyond the water to connect the spaces on either side. Ramps and stairs bring the different levels together, while a lower route and public amenities give the landing a use of its own.':'The second crossing uses the same material and structural language in a different part of the channel. It brings the paths from the housing and the waterside together, with steps and wider landings making space to pause.';
  return `<section class="bridge-proposal" id="bridge-${n}"><p class="bridge-kicker">The proposals</p><h2>Footbridge ${n}</h2>
   ${n===3?figure('bridge-3-render','Footbridge 3 in the waterside landscape','',{small:true}):''}
   <p class="bridge-copy">${text}</p>
   <div class="bridge-study-pair">${figure('bridge-'+n+'-site','Footbridge '+n+' site plan','Site plan')}<div><h3>Routes and public space</h3>${switcher('paths'+n,'Footbridge '+n+' design principles')}</div></div>
   <div class="bridge-drawings"><h3>Plans and sections</h3>${switcher('drawings'+n,'Footbridge '+n+' drawings')}</div>
  </section>`;
 }
 window.renderFootbridgesPage=(p,next)=>`
  <a class="back" href="index.html?v=54">← Projects</a>
  <div class="project-heading"><h1>${p.title}</h1><span>Competition study · Bratislava · 2021</span></div>
  ${figure('bridge-2-render','Footbridge 2 crossing Chorvátske rameno','',{hero:true,small:true})}
  <p class="bridge-intro">Two proposals for the 2021 footbridge competition in Petržalka, Bratislava. The bridges share a slim structural profile and a common material palette, while their approaches respond to the paths, levels and public spaces at each site.</p>
  <nav class="bridge-contents" aria-label="Competition project contents"><a href="#locations">The two sites</a><a href="#bridge-2">Footbridge 2</a><a href="#bridge-3">Footbridge 3</a><a href="#structure">Shared construction</a></nav>
  ${locationMap()}
  ${proposal(2)}
  ${proposal(3)}
  <section class="bridge-section bridge-structure" id="structure"><h2>A shared structural idea</h2>
   <div class="bridge-structure-copy"><p>The deck is deepest along its centreline and becomes thinner toward the edges. This keeps the sides visually light when the crossing is seen from the paths below.</p><p>Welded steel, corten cladding and railings form the deck assembly. Exposed concrete at the approaches and a timber handrail give both proposals a common material language.</p></div>
   <p class="bridge-role">My contribution focused on the visualisations and the shape of the transverse section.</p>
   ${switcher('profiles','Shared construction sections and details')}
  </section>
  <section class="bridge-credits" aria-label="Project credits"><p>Workshop 1 · June 2021 · Competition study with Atelier V19.</p><p>Collaboration: Zuzana Nádaská, Pavol Pilař, Filip Bránický, Jakub Hanzl, Peter Dúbravka, Marián Kiaba and Dajana Goda.</p><a href="${sourceURL}" target="_blank" rel="noopener">Competition archive and full team credits ↗</a></section>
  <div class="next"><a href="index.html?v=54">← Projects</a><a href="project.html?v=54&id=${next.id}">Next project →</a></div>`;
 window.initFootbridgesPage=root=>{
  for(const gallery of root.querySelectorAll('[data-bridge-gallery]')){
   const rows=groups[gallery.dataset.bridgeGallery], buttons=[...gallery.querySelectorAll('[data-drawing]')];
   function select(i){
    buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
    const [key,title,description]=rows[i];
    gallery.querySelector('[data-drawing-display]').innerHTML=image(key,title);
    gallery.querySelector('[data-drawing-display] img').loading='eager';
    gallery.querySelector('[data-explanation]').textContent=description;
    gallery.querySelector('.bridge-enlarge').href=file(key);
   }
   buttons.forEach((b,i)=>{
    b.addEventListener('click',()=>select(i));
    b.addEventListener('keydown',e=>{
     if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
     e.preventDefault();
     const j=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowLeft'?-1:1)+buttons.length)%buttons.length;
     buttons[j].focus();select(j);
    });
   });
  }
  const mapButtons=[...root.querySelectorAll('[data-site]')];
  mapButtons.forEach(button=>button.addEventListener('click',()=>{
   const n=Number(button.dataset.site);
   mapButtons.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.site)===n)));
   const panel=root.querySelector('[data-site-details]');
   panel.innerHTML=siteDetails(n);panel.querySelector('img').loading='eager';
  }));
 };
})();
