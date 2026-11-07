(() => {
'use strict';
const file = key => key+'-v52.webp';
function image(key, alt, eager=false, cls='') {
  const src=file(key), [w,h]=housingAssetSizes[src];
  const small=file(key+'-small');
  const responsive=housingAssetSizes[small] ? ` srcset="${small} 920w, ${src} ${w}w" sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1320px) calc(100vw - 64px), 1256px"` : '';
  return `<img class="${cls}" src="${src}"${responsive} alt="${alt}" width="${w}" height="${h}" loading="${eager?'eager':'lazy'}" decoding="async"${eager?' fetchpriority="high"':''}>`;
}
const openLink=(key,text='Enlarge ↗')=>`<a class="housing-enlarge" href="${file(key)}" target="_blank" rel="noopener">${text}</a>`;
const fig=(key,alt,caption='',eager=false)=>`<figure><a href="${file(key)}" target="_blank" rel="noopener" aria-label="Enlarge ${alt}">${image(key,alt,eager)}</a>${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
const pair=(...args)=>`<div class="housing-pair">${args.map(a=>fig(...a)).join('')}</div>`;
const label=(number,text)=>`<span class="housing-index">${number}</span> ${text}`;
const short=(id,title,copy,html)=>`<section class="housing-section" id="${id}"><h3>${title}</h3>${copy?`<p class="housing-text">${copy}</p>`:''}${html}</section>`;
const chapter=(id,num,title,copy)=>`<header class="housing-chapter" id="${id}"><p class="housing-kicker">Part ${num}</p><h2>${title}</h2><p class="housing-text">${copy}</p></header>`;
const tabs=(names,group,links='')=>`<div class="housing-controls"><div class="housing-tabs" role="group" aria-label="${group}">${names.map((n,i)=>`<button type="button" aria-pressed="${i===0}" data-pick="${i}">${n}</button>`).join('')}</div>${links}</div>`;
const concepts=[
 ['gull-concept-0','Walking routes','A continuous public route follows the shore. Paths from the surrounding streets lead through the blocks to the promenade.'],
 ['gull-concept-1','Traffic','Vehicle access is kept to selected streets. The waterfront and routes through the courtyards prioritise walking.'],
 ['gull-concept-2','Openings and views','Gaps between the buildings lead the eye to the water, bring light into the courtyards and keep routes through the blocks open.'],
 ['gull-concept-3','Waterfront','The promenade meets the boat community at the quay. Steps and platforms create more ways to reach or sit by the water.'],
 ['gull-concept-4','Planting','Green spaces link the promenade, the courtyard and planted terraces, with a gradual shift from public to shared and private space.']
];
const axos=[
 ['gull-axo-0','South','The lower buildings open toward the promenade.'],
 ['gull-axo-1','Northwest','The planted spaces continue through the blocks and onto the terraces.'],
 ['gull-axo-2','Northeast','The building heights rise toward the cooling tower.'],
 ['gull-axo-3','Balconies','Balconies step and overlap, with planting along their outer edges.']
];
const detailDrawings=[
 ['gull-drawing-ground','Ground floor','Entrances and shared uses connect the courtyard to the public routes around the block.'],
 ['gull-drawing-second','Second floor','A typical residential level shows the relationship between stair cores, apartment plans and balconies.'],
 ['gull-drawing-one-a','One bedroom A','Compare how the living space and bedroom sit next to the outdoor area.'],
 ['gull-drawing-one-b','One bedroom B','A second arrangement uses the same relationship between living space and balcony in a different plan.'],
 ['gull-drawing-two','Two bedrooms','The two-bedroom plan separates bedrooms from the shared living and dining space.']
];
const gullLevels=['Ground','1','2','3','4','5','6','7'];
const networks=[
 ['gull-network-existing','Existing network','The existing streets run around large development parcels. There are few routes through the site or from the city to the water.'],
 ['gull-network-proposal','Proposed network','New connections in red break up the large blocks and link the waterfront to the surrounding streets. The analysis tests the walking and cycling network.'],
 ['gull-network-city','City framework','The study also refers to Gothenburg’s city-wide green and blue structure to place the new streets in a wider network of landscape and water.']
];
const scales=[
 ['gull-scale-5','5 km · Wider city','At 5 km, the map shows which routes carry potential through-movement across the wider city. The strongest routes are candidates for public transport and uses that draw visitors from beyond the neighbourhood.'],
 ['gull-scale-2','2 km · Neighbourhood','At 2 km, the map shows the distribution of potential movement closer to home. The shorter radius helps distinguish a route that works as a local destination from one that mainly carries through traffic.']
];
const streets=[
 {id:'all',name:'All streets',color:'#a6a7a1',desc:'The proposal separates streets where people are likely to pass through from those where they are likely to stay. Choose a street type to see how its role changes the ground floor.'},
 {id:'shopping',name:'Busy shopping',color:'#c89937',wide:'High',near:'Medium-high',desc:'The route is prominent at both scales. It can support shopfronts and other uses that rely on people passing through and stopping along the street.',front:'busy'},
 {id:'transit',name:'Busy transit',color:'#d97c49',wide:'High',near:'Medium',desc:'A route with city-wide importance and less local through-movement than the shopping street. The proposal makes room for public transport and larger destinations.',front:'busy'},
 {id:'medium',name:'Medium',color:'#625bc5',wide:'Medium',near:'Medium-low',desc:'A neighbourhood connector for everyday trips. Commercial uses cluster at useful corners; housing can share the rest of the frontage.',front:'medium'},
 {id:'calm',name:'Calm',color:'#9b6da7',wide:'Low',near:'Low',desc:'A quieter residential street. Small local services and entrances can be mixed with housing where there is enough activity to support them.',front:'calm'},
 {id:'inner',name:'Inner network',color:'#72a57f',wide:'Very low',near:'Very low',desc:'Courtyard paths and passages are intended mostly for residents. The edges can be shared gardens and front doors rather than continuous commercial frontage.',front:'inner'},
 {id:'no',name:'Boat community',color:'#888983',wide:'—',near:'—',desc:'The original study sets the boat community apart from the through-movement hierarchy to protect its existing social use. The dashes mean no street ranking was assigned here.'}
];
const sections=[
 ['gull-street-a','Section A','This cut shows the transition from a medium street through the interior of a block to the transit corridor, with different ground-floor uses facing each route.'],
 ['gull-street-b','Section B','The other cut compares the shopping edge and the calmer residential street, with the shared interior between them.']
];
const strConcepts=[
 ['strazna-massing','Massing studies','Five stages show how the buildings were placed and then stepped to keep the views open and bring sunlight between them.'],
 ['strazna-site','Site plan','Six smaller buildings frame shared green spaces on the slope. The spaces between them keep the view toward Bratislava open.'],
 ['strazna-axo','Site axonometric','The axonometric shows the stepped buildings, level outdoor areas and planting in relation to the surrounding neighbourhood.']
];
const strPlans=[
 ['strazna-ground','Ground floor','The ground-floor apartment has direct access to a private garden. Its rooms are separated from the shared entry and circulation space.'],
 ['strazna-typical','Typical floor','On the upper floors, apartments are arranged in repeated modules. Their living spaces open to the south-facing balconies.']
];
const strSections=[
 ['strazna-section','Section B–B','The section follows the stair from the basement through the apartments and up to the stepped roof.'],
 ['strazna-south','South','The steel grid carries balconies and movable shading.'],
 ['strazna-north','North','The common circulation is left open on the north side.'],
 ['strazna-east','East','The side elevation shows the depth of the balconies and the roof step.'],
 ['strazna-west','West','The side elevation shows the openings beside the projecting frame.']
];
const groups={concepts,axos,details:detailDrawings,networks,scales,sections,strConcepts,strPlans,strSections,
  'gull-sections':[['gull-drawing-a','Section A','From the public landscape to the shared courtyard.'],['gull-drawing-b','Section B','The stepped volumes meet the courtyard and the surrounding ground levels.'],['gull-drawing-detail','CLT junction','The detail shows the connection of the CLT floor and balcony panel, and where insulation, steel fixings and the timber cladding sit.']]};
function switcher(id,group){
  const rows=groups[id], [key,name,desc]=rows[0];
  return `<div class="housing-switch" data-gallery="${id}">
  ${tabs(rows.map(x=>x[1]),group,openLink(key))}
  <p class="housing-note" aria-live="polite">${desc}</p>
  <div class="housing-drawing" data-display>${image(key,name)}</div></div>`;
}
function floors(){
  return `<div class="housing-switch housing-floor" data-floors>
  ${tabs(gullLevels,'Building 1 floors','<button class="housing-enlarge" type="button" data-floor-zoom aria-pressed="false">Zoom in</button>'+openLink('gull-floor-0'))}
  <p class="housing-note" data-floor-note aria-live="polite">Ground floor · Site plan beneath at 30% opacity</p>
  <div class="housing-stack-frame"><div class="housing-stack">
    ${image('gull-floor-site','Site plan beneath the ground floor',false,'housing-under')}
    ${image('gull-floor-0','Building 1 ground floor',false,'housing-over')}
  </div></div></div>`;
}
function streetHierarchy(){
  return `<div class="housing-switch housing-hierarchy" data-streets>
  ${tabs(streets.map(s=>`<span class="housing-dot" style="--street:${s.color}"></span>${s.name}`),'Street hierarchy',openLink('gull-street-types'))}
  <div class="housing-hierarchy-grid">
    <div class="housing-type-map">${image('gull-street-types','Street hierarchy of the proposed network',false,'housing-type-base')}<div data-highlight></div></div>
    <div class="housing-type-copy" aria-live="polite" data-type-copy><h4>All streets</h4><p>${streets[0].desc}</p></div>
  </div></div>`;
}
function heading(p,key,alt,copy,meta){
  return `<a class="back" href="index.html?v=56">← Projects</a>
  <div class="project-heading"><h1>${p.title}</h1><span>${meta}</span></div>
  ${fig(key,alt,'',true)}
  <p class="housing-intro">${copy}</p>`;
}
function jumps(items){
  return `<nav class="housing-jumps" aria-label="Project contents">${items.map(([id,n,title,sub])=>`<a href="#${id}">${label(n,title)}<small>${sub}</small></a>`).join('')}</nav>`;
}
function gull(p){
  return heading(p,'gull-render-title','Gullbergsvass housing from the waterfront steps','Two linked studio projects in Gullbergsvass, Gothenburg. The first designs housing around courtyards and a public waterfront. The second looks beyond the site to design the streets that would connect it to the rest of the city.','Gothenburg · 2024–2025')
  +jumps([['housing','01','Housing','From waterfront routes to apartments'],['street-design','02','Street design','From network analysis to street sections']])
  +chapter('housing','01','Housing','The waterfront already has a boat community and an industrial landmark in the cooling tower. The proposal keeps the shore public and makes room for everyday routes through the blocks. Building heights step down to the promenade and rise toward the tower.')
  +short('concepts','Connections to the water','Five drawings show how the proposal brings together routes, sightlines and planted spaces.',switcher('concepts','Housing concepts'))
  +short('site','The waterfront and the courtyard','The shore is a public route. Further in, the courtyards are shared by residents, with openings that keep them connected to the surrounding streets.',fig('gull-concept-5','Housing site plan with landscape and waterfront','Site plan')+pair(['gull-concept-6','Landscape section','Landscape section'],['gull-concept-7','Quay and waterfront plan','Waterfront plan']))
  +pair(['gull-render-tower-walk','Pedestrian route toward the cooling tower'],['gull-render-street','Housing and the planted walkway'])
  +short('axos','The planted block','The original axonometrics show how planting extends from the public landscape to courtyards and private balconies.',switcher('axos','Planted axonometrics'))
  +short('floor-plans','Floor plans','Follow Building 1 from the public ground floor to the upper terraces. Each floor stays in place as you move up the building.',floors())
  +pair(['gull-render-courtyard','Courtyard with planting and a play area'],['gull-render-terrace','Timber frame and planting on a terrace'])
  +short('apartment-plans','Building 2 and apartment plans','Switch between the building plans and individual apartments to see how shared circulation, living spaces and balconies fit together.',switcher('details','Detailed floor plans'))
  +short('housing-sections','Sections and junction','The two building sections place the structure in the landscape. The junction drawing shows where the CLT floor meets the balcony and insulated wall.',switcher('gull-sections','Building sections and construction detail'))
  +pair(['gull-render-corner','Housing at the corner of the public route'],['gull-render-water-view','View of the water from a planted balcony'])
  +`<p class="housing-credit">${p.sections[0].credit}</p>`
  +chapter('street-design','02','Street design','This second project zooms out from the housing site. It tests new walking and cycling routes, then uses the results to decide which streets should carry transit or shops and which should lead to quieter residential spaces.')
  +short('network','1. Connect the site','Compare the existing and proposed networks in the same frame. The city framework is a separate drawing of the wider green and blue network.',switcher('networks','Street network stages'))
  +short('street-analysis','2. Compare two scales','Angular betweenness, calculated in Urban Calculator, estimates how often a street segment lies on routes with fewer changes in direction within a given radius. It indicates where through-movement might concentrate.',switcher('scales','Analysis radius'))
  +short('street-types','3. Give each street a role','The two radii are read together. Streets that rank highly at both scales can support a more active edge. Quieter routes make room for housing, gardens and shared entrances.',streetHierarchy())
  +short('street-sections','4. See what changes at the building edge','The block diagram brings the hierarchy into one place. Compare the two cuts to see how the street type changes the uses and building form around it.',
    `<div class="housing-section-pair">${fig('gull-street-block','Block plan showing the positions of both sections','Ground-floor uses around a block')}${switcher('sections','Street sections')}</div>`)
  +`<p class="housing-credit">${p.sections[1].credit}</p>`;
}
function strazna(p){
  return heading(p,'strazna-hero','View toward Bratislava between the proposed apartment buildings','Six apartment buildings step across a hillside in Bratislava. Open spaces between them keep the city in view, while a steel frame on the south side of each block makes room for balconies and movable shades.','Bratislava · 2021–2022')
  +jumps([['site','01','Site and massing','Views, slope and sunlight'],['plans','02','Apartment plans','Ground and typical floors'],['sections','03','Elevations and section','Balconies, circulation and stairs']])
  +short('site','Building on the slope','The neighbourhood is made up of detached houses, small apartment buildings and gardens. The proposal breaks the housing into smaller volumes and steps their upper floors so more of the site can share the view and the sun.',switcher('strConcepts','Site and massing studies'))
  +fig('strazna-court','Shared garden beside the south-facing balconies')
  +short('plans','From the garden to the upper floors','At ground level, the apartment opens onto a private garden. Above it, the plan repeats in modules. Bedrooms are set apart from the living areas, and the common stair and lift run along the north side.',switcher('strPlans','Strážna floor plans'))
  +short('sections','Elevations and section','The south elevation shows the balcony and shade frame. The north elevation shows the open circulation, while section B–B follows the stair through the stepped building.',switcher('strSections','Strážna elevations and section'))
  +`<p class="housing-credit">${p.credit}</p>`;
}
function choose(root,fn){
  const btns=[...root.querySelectorAll('[data-pick]')];
  function select(i){
    btns.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));
    fn(i);
  }
  btns.forEach((b,i)=>{
    b.addEventListener('click',()=>select(i));
    b.addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
      e.preventDefault();
      const j=e.key==='Home'?0:e.key==='End'?btns.length-1:(i+(e.key==='ArrowLeft'?-1:1)+btns.length)%btns.length;
      btns[j].focus();select(j);
    });
  });
}
window.renderHousingPage=(p,next)=>`${p.id==='gullbergsvass'?gull(p):strazna(p)}<div class="next"><a href="index.html?v=56">← Projects</a><a href="project.html?v=56&id=${next.id}">Next project →</a></div>`;
window.initHousingPage=detail=>{
  for(const group of detail.querySelectorAll('[data-gallery]')){
    const display=group.querySelector('[data-display]'), link=group.querySelector('.housing-enlarge'), note=group.querySelector('.housing-note');
    const data=groups[group.dataset.gallery];
    let selection=0;
    choose(group,i=>{
      if(i===selection)return;
      selection=i;
      const [key,name,desc]=data[i];
      display.innerHTML=image(key,name);
      display.querySelector('img').loading='eager';
      link.href=file(key);
      note.textContent=desc;
    });
  }
  const floor=detail.querySelector('[data-floors]');
  if(floor){
    const under=floor.querySelector('.housing-under'), over=floor.querySelector('.housing-over'), link=floor.querySelector('a'), zoom=floor.querySelector('[data-floor-zoom]');
    let selection=0;
    choose(floor,i=>{
      if(i===selection)return;
      selection=i;
      const below=i===0?'Site plan':i===1?'Ground floor':'Floor '+(i-1);
      const above=i===0?'Ground floor':'Floor '+i;
      under.loading=over.loading='eager';
      under.src=file('gull-floor-'+(i?i-1:'site'));
      over.src=file('gull-floor-'+i);
      under.alt=below+' beneath '+above.toLowerCase();
      over.alt='Building 1 · '+above;
      link.href=over.src;
      floor.querySelector('[data-floor-note]').textContent=above+' · '+below+' beneath at 30% opacity';
    });
    zoom.addEventListener('click',()=>{
      const on=floor.classList.toggle('is-zoomed');
      zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?'Fit drawing':'Zoom in';
    });
  }
  const hierarchy=detail.querySelector('[data-streets]');
  if(hierarchy){
    const copy=hierarchy.querySelector('[data-type-copy]'), highlight=hierarchy.querySelector('[data-highlight]');
    choose(hierarchy,i=>{
      const s=streets[i];
      const on=Boolean(s.front);
      hierarchy.classList.toggle('has-focus',on);
      highlight.innerHTML=on?image('gull-type-'+s.id,''):s.id==='no'?'<span class="housing-boat-marker" aria-hidden="true"></span>':'';
      copy.innerHTML=`<h4>${s.name}</h4>${s.wide?`<dl class="housing-ratings"><div><dt>5 km</dt><dd>${s.wide}</dd></div><div><dt>2 km</dt><dd>${s.near}</dd></div></dl>`:''}<p>${s.desc}</p>${on?fig('gull-frontage-'+s.front,'Ground-floor diagram for '+s.name.toLowerCase()):''}`;
    });
  }
};
})();
