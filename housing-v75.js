(() => {
'use strict';
const file = key => key+(housingAssetSizes[key+'-v75.webp']?'-v75.webp':housingAssetSizes[key+'-v64.webp']?'-v64.webp':housingAssetSizes[key+'-v63.webp']?'-v63.webp':housingAssetSizes[key+'-v59.webp']?'-v59.webp':'-v52.webp');
function image(key, alt, eager=false, cls='') {
  const src=file(key), [w,h]=housingAssetSizes[src];
  const small=file(key+'-small');
  const responsive=housingAssetSizes[small] ? ` srcset="${small} 920w, ${src} ${w}w" sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1320px) calc(100vw - 64px), 1256px"` : '';
  return `<img class="${cls}" src="${src}"${responsive} alt="${alt}" width="${w}" height="${h}" loading="${eager?'eager':'lazy'}" decoding="async"${eager?' fetchpriority="high"':''}>`;
}
const openLink=(key,text='Enlarge ↗')=>`<a class="housing-enlarge" href="${file(key)}" target="_blank" rel="noopener">${text}</a>`;
const fig=(key,alt,caption='',eager=false)=>`<figure><a href="${file(key)}" target="_blank" rel="noopener" aria-label="Enlarge ${alt}">${image(key,alt,eager)}</a>${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
const pair=(...args)=>`<div class="housing-pair">${args.map(a=>fig(...a)).join('')}</div>`;
const renderPair=(...args)=>`<div class="housing-pair gull-render-pair">${args.map(a=>fig(...a)).join('')}</div>`;
const label=(number,text)=>`<span class="housing-index">${number}</span> ${text}`;
const short=(id,title,copy,html)=>`<section class="housing-section" id="${id}">${title?`<h3>${title}</h3>`:''}${copy?`<p class="housing-text">${copy}</p>`:''}${html}</section>`;
const chapter=(id,num,title,copy)=>`<header class="housing-chapter" id="${id}"><p class="housing-kicker">Part ${num}</p><h2>${title}</h2>${copy?`<p class="housing-text">${copy}</p>`:''}</header>`;
const tabs=(names,group,links='')=>`<div class="housing-controls"><div class="housing-tabs" role="group" aria-label="${group}">${names.map((n,i)=>`<button type="button" aria-pressed="${i===0}" data-pick="${i}">${n}</button>`).join('')}</div>${links}</div>`;
const concepts=[
 ['gull-concept-0','Walking routes','A private walking route links the housing blocks through the courtyards.'],
 ['gull-concept-1','Traffic','The traffic scheme distinguishes the waterfront promenade and explorative paths from routes for car traffic and public transport. The grey tones separate existing buildings, the wider masterplan and the site design.'],
 ['gull-concept-2','Openings and views','Gaps between the buildings lead the eye to the water, bring light into the courtyards and keep routes through the blocks open.'],
 ['gull-concept-4','Planting','Connected greenery extends across the entire area, forming one continuous landscape.']
];
const axos=[
 ['gull-axo-0','South','The lower buildings open toward the promenade.'],
 ['gull-axo-1','Northwest','The planted spaces continue through the blocks and onto the terraces.'],
 ['gull-axo-2','Northeast','The building heights rise toward the cooling tower.'],
 ['gull-axo-3','Balconies','Balconies step and overlap, with planting along their outer edges.']
];
const detailDrawings=[
 ['gull-detail-floor-ground','Ground floor','Entrances and shared uses connect the courtyard to the public routes around the block.'],
 ['gull-detail-floor-third','Third floor','A typical residential level shows the relationship between stair cores, apartment plans and balconies.'],
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
 ['strazna-site','Site plan','Six smaller buildings frame shared green spaces on the slope. The spaces between them keep the view toward Bratislava open.'],
 ['strazna-axo','Site axonometric','The axonometric shows the stepped buildings, level outdoor areas and planting in relation to the surrounding neighbourhood.']
];
const strPlans=[
 ['strazna-ground','Ground floor','The ground-floor apartment has direct access to a private garden. Its rooms are separated from the shared entry and circulation space.'],
 ['strazna-typical','Typical floor','On the upper floors, apartments are arranged in repeated modules. Their living spaces open to the south-facing balconies.']
];
const strSections=[
 ['strazna-section','Section B–B','The section follows the stair from the basement through the apartments and up to the stepped roof.'],
 ['strazna-section-a','Section A–A','The transverse section cuts through the apartments, balcony and shared circulation, from the basement to the planted roof.'],
 ['strazna-south','South','The steel grid carries balconies and movable shading.'],
 ['strazna-north','North','The common circulation is left open on the north side.'],
 ['strazna-east','East','The side elevation shows the depth of the balconies and the roof step.'],
 ['strazna-west','West','The side elevation shows the openings beside the projecting frame.']
];
const groups={concepts,axos,details:detailDrawings,networks,scales,sections,strConcepts,strPlans,strSections,
  'gull-sections':[['gull-drawing-a','Section A','From the public landscape to the shared courtyard.'],['gull-drawing-b','Section B','The stepped volumes meet the courtyard and the surrounding ground levels.'],['gull-drawing-detail','CLT junction','The detail shows the connection of the CLT floor and balcony panel, and where insulation, steel fixings and the timber cladding sit.']]};
const conceptLegend=(index=0)=>{
 const overlays=[
  [['line','#71cebe','Private walking route',3]],
  [['line','#71cebe','Promenade',9],['line','#71cebe','Explorative path',3],['line','#3aaa97','Car traffic',5],['line','#277164','Public transport',5]],
  [['arrow','#71cebe','Openings towards water',3]],
  [['swatch','#71cebe','Connected greenery',14]]
 ];
 return `<ul aria-label="Buildings">${[['#999999','Existing buildings'],['#666666','Masterplan design'],['#333333','Site design']].map(([colour,name])=>`<li><span class="concept-swatch" style="--legend-colour:${colour}"></span>${name}</li>`).join('')}</ul><ul aria-label="${concepts[index][1]}">${overlays[index].map(([shape,colour,name,width])=>`<li><span class="concept-${shape}" style="--legend-colour:${colour};--legend-width:${width}px"></span>${name}</li>`).join('')}</ul>`;
};
const floorLegend=()=>`<aside class="gull-plan-legend" aria-label="Floorplan legend"><ul>${[
 ['#cd71cf','Commercial spaces'],['#b2b2b2','Common spaces'],['#84f2df','Studio'],['#6fccbc','1BR apartment'],['#5aa598','2BR apartment'],['#457f75','3BR apartment'],
 ['green-roof','Green roof'],['shared-roof','Shared roof spaces'],['balconies','Private balconies']
].map(([colour,name])=>`<li><span class="gull-plan-swatch ${colour[0]==='#'?'':colour}"${colour[0]==='#'?` style="background:${colour}"`:''}></span>${name}</li>`).join('')}</ul></aside>`;
function detailPicture(key,name,index){
 return index<2?`<div class="gull-detail-stack">${image('gull-floor-site','Site plan',false,'gull-detail-site')}${image(key,name,false,'gull-detail-plan')}</div>`:image(key,name);
}
function switcher(id,group){
 const rows=groups[id], [key,name,desc]=rows[0];
 const hasNote=!['axos','details'].includes(id);
 return `<div class="housing-switch" data-gallery="${id}">
 ${tabs(rows.map(x=>x[1]),group,openLink(key))}
 ${hasNote?`<p class="housing-note" aria-live="polite">${desc}</p>`:''}
 ${id==='concepts'?'<div class="housing-concept-layout has-legend">':''}<div class="housing-drawing" data-display>${id==='details'?detailPicture(key,name,0):image(key,name)}</div>${id==='concepts'?`<aside class="housing-concept-legend" data-concept-legend aria-label="Diagram legend">${conceptLegend()}</aside></div>`:''}</div>`;
}
function floors(){
 return `<div class="housing-switch housing-floor" data-floors>
 ${tabs(gullLevels,'Building 1 floors','<button class="housing-enlarge" type="button" data-floor-zoom aria-pressed="false">Zoom in</button>'+openLink('gull-floor-0'))}
 <div class="gull-floor-layout"><div class="housing-stack-frame"><div class="housing-stack" aria-label="Ground floor">
 ${image('gull-floor-site','Site plan',false,'housing-site-underlay')}
 ${image('gull-floor-0','Previous floor',false,'housing-under')}
 ${image('gull-floor-0','Building 1 ground floor',false,'housing-over')}
 </div></div>${floorLegend()}</div></div>`;
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
  +chapter('housing','01','Housing','')
  +short('concepts','Urban principles','',switcher('concepts','Housing concepts'))
  +short('site','','',fig('gull-concept-5','Housing site plan with landscape and waterfront','Site plan'))
  +short('water-management','Water management','',`<div class="gull-water-study">${fig('gull-concept-6','Section showing how water flows through the landscape','Section showing water flow')}${fig('gull-concept-7','Water management scheme','Water management scheme')}</div>`)
  +renderPair(['gull-render-tower-walk','Pedestrian route toward the cooling tower'],['gull-render-street','Housing and the planted walkway'])
  +short('axos','','',switcher('axos','Planted axonometrics'))
  +short('floor-plans','Floorplans','',floors())
  +renderPair(['gull-render-courtyard','Courtyard with planting and a play area'],['gull-render-terrace','Timber frame and planting on a terrace'])
  +short('apartment-plans','Detailed floorplans','',switcher('details','Detailed floor plans'))
  +short('housing-sections','Sections and construction detail','',switcher('gull-sections','Building sections and construction detail'))
  +renderPair(['gull-render-corner','Housing at the corner of the public route'],['gull-render-water-view','View of the water from a planted balcony'])
  +`<p class="housing-credit">${p.sections[0].credit}</p>`
  +chapter('street-design','02','Street design','This second project zooms out from the housing site. It tests new walking and cycling routes, then uses the results to decide which streets should carry transit or shops and which should lead to quieter residential spaces.')
  +short('network','1. Connect the site','Compare the existing and proposed networks in the same frame. The city framework is a separate drawing of the wider green and blue network.',switcher('networks','Street network stages'))
  +short('street-analysis','2. Compare two scales','Angular betweenness, calculated in Urban Calculator, estimates how often a street segment lies on routes with fewer changes in direction within a given radius. It indicates where through-movement might concentrate.',switcher('scales','Analysis radius'))
  +short('street-types','3. Give each street a role','The two radii are read together. Streets that rank highly at both scales can support a more active edge. Quieter routes make room for housing, gardens and shared entrances.',streetHierarchy())
  +short('street-sections','4. See what changes at the building edge','The block diagram brings the hierarchy into one place. Compare the two cuts to see how the street type changes the uses and building form around it.',
    `<div class="housing-section-pair">${fig('gull-street-block','Block plan showing the positions of both sections','Ground-floor uses around a block')}${switcher('sections','Street sections')}</div>`)
  +`<p class="housing-credit">${p.sections[1].credit}</p>`;
}
const strStages=[
 ['Orientation and views','Orientation'],
 ['Responding to neighbouring buildings','Context'],
 ['Following the slope','Terrain'],
 ['Lowering volumes for sunlight and views','Sunlight'],
 ['Final massing','Final massing']
];
function strMassing(){
 return `<div class="str-massing" data-str-massing>
  <div class="housing-controls"><div class="housing-tabs" role="group" aria-label="Massing progression">${strStages.map(([title,short],i)=>`<button type="button" data-str-stage="${i}" aria-pressed="${i===0}" aria-label="Stage ${i+1}: ${title}">0${i+1} ${short}</button>`).join('')}</div></div>
  <figure class="str-massing-figure" data-str-stage-panel>${image('strazna-massing-1',strStages[0][0])}<figcaption aria-live="polite">${strStages[0][0]}</figcaption></figure>
  <div class="str-stage-nav"><button type="button" data-str-stage-step="-1" disabled>← Previous</button><button type="button" data-str-stage-step="1">Next →</button></div>
 </div>`;
}
const strDrawingGroups=[
 {name:'Floor plans',rows:strPlans},
 {name:'Elevations',rows:strSections.slice(2)},
 {name:'Sections',rows:strSections.slice(0,2)}
];
function strDrawingTabs(rows,attr,selected,label){
 return `<div class="housing-tabs" role="group" aria-label="${label}">${rows.map((name,i)=>`<button type="button" ${attr}="${i}" aria-pressed="${i===selected}">${name}</button>`).join('')}</div>`;
}
function strPlan(key,name){
 const elevations=[
  ['strazna-north','north','N',725,92,'M0 -6v15m-6 -6 6 6 6-6',0,-13],
  ['strazna-south','south','S',725,1166,'M0 6v-15m-6 6 6-6 6 6',0,24],
  ['strazna-west','west','W',42,620,'M-6 0h18m-6 -6 6 6-6 6',-18,5],
  ['strazna-east','east','E',1446,620,'M6 0h-18m6 -6-6 6 6 6',18,5]
 ];
 const cut='M154 412H207M335 412H398V339H831V460H886M1288 460H1340';
 return `<p class="housing-note str-plan-guide">Select an A–A or B–B section marker, or an elevation arrow, to open its drawing.</p>
 <div class="str-plan-scroll"><svg class="str-plan" viewBox="0 40 1480 1172" preserveAspectRatio="xMinYMin meet" role="group" aria-label="${name} with section and elevation links">
  <image href="${file(key)}" x="70" y="128" width="1340" height="1002" preserveAspectRatio="none"></image>
  <g class="str-drawing-hit str-section-hit" role="button" tabindex="0" aria-label="Open B–B section line" data-str-jump="strazna-section"><title>Section B–B</title><path class="str-section-target" d="${cut}"></path><path class="str-section-hover" d="${cut}"></path></g>
  <g class="str-drawing-hit str-section-label" role="button" tabindex="0" aria-label="Open section B–B" data-str-jump="strazna-section"><title>Section B–B</title><rect x="140" y="380" width="80" height="58" rx="3"></rect></g>
  <g class="str-drawing-hit str-section-label" role="button" tabindex="0" aria-label="Open section B–B at right marker" data-str-jump="strazna-section"><title>Section B–B</title><rect x="1270" y="430" width="92" height="50" rx="3"></rect></g>
  <g class="str-drawing-hit str-section-hit" role="button" tabindex="0" aria-label="Open A–A section line" data-str-jump="strazna-section-a"><title>Section A–A</title><path class="str-section-target" d="M801 196V247M801 1008V1059"></path><path class="str-section-hover" d="M801 196V247M801 1008V1059"></path></g>
  <g class="str-drawing-hit str-section-label" role="button" tabindex="0" aria-label="Open section A–A at top marker" data-str-jump="strazna-section-a"><title>Section A–A</title><rect x="780" y="180" width="62" height="52" rx="3"></rect></g>
  <g class="str-drawing-hit str-section-label" role="button" tabindex="0" aria-label="Open section A–A at bottom marker" data-str-jump="strazna-section-a"><title>Section A–A</title><rect x="780" y="1025" width="62" height="52" rx="3"></rect></g>
  ${elevations.map(([id,direction,letter,x,y,path,tx,ty])=>`<g class="str-drawing-hit str-elevation-hit" role="button" tabindex="0" aria-label="Open ${direction} elevation" data-str-jump="${id}" transform="translate(${x} ${y})"><title>${letter} elevation</title><rect x="-30" y="-29" width="60" height="58" rx="3"></rect><path d="${path}"></path><text x="${tx}" y="${ty}">${letter}</text></g>`).join('')}
 </svg></div>`;
}
function strDrawingSheet(group,index){
 const rows=strDrawingGroups[group].rows,[key,name,copy]=rows[index];
 return `${group!==0?'<button class="str-return" type="button" data-str-return>← Back to plan</button>':''}
 <div class="housing-controls">${strDrawingTabs(rows.map(r=>r[1]),'data-str-sheet',index,'Select Strážna drawing')}${openLink(key)}</div>
 <p class="housing-note" aria-live="polite">${copy}</p><div class="str-sheet">${group===0?strPlan(key,name):`<a href="${file(key)}" target="_blank" rel="noopener">${image(key,name)}</a>`}</div>`;
}
function strDrawings(){
 return `<div class="str-drawings" data-str-drawings><span id="sections" aria-hidden="true"></span><div class="housing-controls str-drawing-types">${strDrawingTabs(strDrawingGroups.map(r=>r.name),'data-str-series',0,'Strážna drawing type')}</div><div data-str-drawing-panel>${strDrawingSheet(0,0)}</div></div>`;
}
function strazna(p){
 return heading(p,'strazna-court','Shared garden beside the south-facing balconies','Six apartment buildings step across a hillside in Bratislava. Open spaces between them keep the city in view, while a steel frame on the south side of each block makes room for balconies and movable shades.','Bratislava · 2021–2022')
  +jumps([['massing','01','Massing','From orientation to the final volumes'],['site','02','Site','Buildings and landscape'],['plans','03','Drawings','Plans, sections and elevations']])
  +short('massing','Massing','',strMassing())
  +short('site','Site and landscape','',switcher('strConcepts','Strážna site views'))
  +fig('strazna-hero','View toward Bratislava between the proposed apartment buildings')
  +short('plans','Plans, sections and elevations','At ground level, the apartment opens onto a private garden. Above it, the plan repeats in modules. Bedrooms are set apart from the living areas, and the common stair and lift run along the north side.',strDrawings())
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
  const massing=detail.querySelector('[data-str-massing]');
  if(massing){
    const buttons=[...massing.querySelectorAll('[data-str-stage]')];
    const [previous,next]=massing.querySelectorAll('[data-str-stage-step]');
    let stage=0;
    const show=i=>{
      stage=i;
      buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
      massing.querySelector('[data-str-stage-panel]').innerHTML=image('strazna-massing-'+(i+1),strStages[i][0])+`<figcaption aria-live="polite">${strStages[i][0]}</figcaption>`;
      massing.querySelector('img').loading='eager';
      previous.disabled=i===0;next.disabled=i===strStages.length-1;
    };
    massing.addEventListener('click',e=>{
      const button=e.target.closest('[data-str-stage],[data-str-stage-step]');
      if(!button)return;
      const i=button.hasAttribute('data-str-stage')?Number(button.dataset.strStage):stage+Number(button.dataset.strStageStep);
      show(Math.max(0,Math.min(strStages.length-1,i)));
      if(button.disabled)buttons[stage].focus({preventScroll:true});
    });
    buttons.forEach((b,i)=>b.addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
      e.preventDefault();
      const j=e.key==='Home'?0:e.key==='End'?strStages.length-1:(i+(e.key==='ArrowLeft'?-1:1)+strStages.length)%strStages.length;
      show(j);buttons[j].focus({preventScroll:true});
    }));
  }
  const drawings=detail.querySelector('[data-str-drawings]');
  if(drawings){
    const panel=drawings.querySelector('[data-str-drawing-panel]');
    const seriesButtons=[...drawings.querySelectorAll('[data-str-series]')];
    const selected=[0,0,0];let group=0;
    const show=(g,i)=>{
      group=g;selected[g]=i;
      seriesButtons.forEach((b,j)=>b.setAttribute('aria-pressed',String(g===j)));
      panel.innerHTML=strDrawingSheet(g,i);
      panel.querySelectorAll('img').forEach(im=>im.loading='eager');
    };
    const jump=target=>{
      const key=target.dataset.strJump;
      const g=strDrawingGroups.findIndex(series=>series.rows.some(row=>row[0]===key));
      show(g,strDrawingGroups[g].rows.findIndex(row=>row[0]===key));
      panel.querySelector('[data-str-return]').focus({preventScroll:true});
      drawings.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    };
    drawings.addEventListener('click',e=>{
      const target=e.target.closest('[data-str-jump]');
      if(target){jump(target);return;}
      if(e.target.closest('[data-str-return]')){show(0,selected[0]);seriesButtons[0].focus({preventScroll:true});return;}
      const series=e.target.closest('[data-str-series]');
      if(series){const g=Number(series.dataset.strSeries);show(g,selected[g]);return;}
      const sheet=e.target.closest('[data-str-sheet]');
      if(sheet){const i=Number(sheet.dataset.strSheet);show(group,i);panel.querySelector(`[data-str-sheet="${i}"]`).focus({preventScroll:true});}
    });
    drawings.addEventListener('keydown',e=>{
      const hit=e.target.closest('[data-str-jump]');
      if(hit&&(e.key==='Enter'||e.key===' ')){e.preventDefault();jump(hit);return;}
      const tab=e.target.closest('[data-str-series],[data-str-sheet]');
      if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
      e.preventDefault();
      const series=tab.hasAttribute('data-str-series'),buttons=[...(series?drawings:panel).querySelectorAll(series?'[data-str-series]':'[data-str-sheet]')],i=buttons.indexOf(tab);
      const j=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowLeft'?-1:1)+buttons.length)%buttons.length;
      if(series){show(j,selected[j]);seriesButtons[j].focus({preventScroll:true});}
      else{show(group,j);panel.querySelector(`[data-str-sheet="${j}"]`).focus({preventScroll:true});}
    });
    if(location.hash==='#sections')show(2,0);
  }

  for(const group of detail.querySelectorAll('[data-gallery]')){
    const display=group.querySelector('[data-display]'), link=group.querySelector('.housing-enlarge'), note=group.querySelector('.housing-note');
    const data=groups[group.dataset.gallery];
    let selection=0;
    choose(group,i=>{
      if(i===selection)return;
      selection=i;
      const [key,name,desc]=data[i];
      display.innerHTML=group.dataset.gallery==='details'?detailPicture(key,name,i):image(key,name);
      display.querySelector('img').loading='eager';
      link.href=file(key);
      if(note)note.textContent=desc;
      if(group.dataset.gallery==='concepts'){
        group.querySelector('[data-concept-legend]').innerHTML=conceptLegend(i);
      }
    });
  }
  const floor=detail.querySelector('[data-floors]');
  if(floor){
    const under=floor.querySelector('.housing-under'), over=floor.querySelector('.housing-over'), link=floor.querySelector('a'), zoom=floor.querySelector('[data-floor-zoom]');
    let selection=0;
    under.hidden=true;
    choose(floor,i=>{
      if(i===selection)return;
      selection=i;
      const below=i===0?'Site plan':i===1?'Ground floor':'Floor '+(i-1);
      const above=i===0?'Ground floor':'Floor '+i;
      under.loading=over.loading='eager';
      under.hidden=i===0;
      under.src=file('gull-floor-'+Math.max(0,i-1));
      over.src=file('gull-floor-'+i);
      under.alt=below+' beneath '+above.toLowerCase();
      over.alt='Building 1 · '+above;
      link.href=over.src;
      floor.querySelector('.housing-stack').setAttribute('aria-label',above);
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
