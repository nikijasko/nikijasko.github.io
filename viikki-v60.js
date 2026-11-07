const viikkiDVariants = [
 {name:'Variant 1', sheets:[['z-d-1-ground','Ground floor'],['z-d-1-typical','Typical floor']]},
 {name:'Variant 2', sheets:[['z-d-2-ground','Ground floor'],['z-d-2-typical','Typical floor']]},
];

const viikkiZoning = {
 A: {legend: 'New apartments / student housing', description: 'A new curved housing block follows the street. Apartments and student housing sit above shared rooms and street-level uses.', sheets: [['z-a-1np','Ground floor'],['z-a-tp','Typical floor']]},
 B: {legend: 'New apartments', description: 'The zoning-stage proposal for the straight housing block. Its detailed architectural design follows in Part 2.', sheets: [['z-b-1np','Ground floor'],['z-b-tp','Typical floor']]},
 C: {legend: 'New apartments', description: 'A new curved housing block follows the street and opens towards the inner landscape.', sheets: [['z-c-1np','Ground floor'],['z-c-tp','Typical floor']]},
 D: {legend: 'New apartments · two variants', description: 'D1–D11 are smaller housing volumes distributed along the promenade. Compare the two building variants and their ground and typical floors.', sheets: viikkiDVariants[0].sheets},
 E: {legend: 'Office conversion to student housing', description: 'An existing office building is converted to student housing. Shared rooms, a study room and facilities occupy the ground floor.', sheets: [['z-e-1np','Ground floor'],['z-e-2np','First floor'],['z-e-3np','Second floor']]},
 G: {legend: 'New parking building', description: 'A new parking building gathers cars at the edge of the site, beside the connecting road.', sheets: [['z-g-1np','Ground floor'],['z-g-tp','Typical floor']]},
 M: {legend: 'Former museum converted to saunas', description: 'The former museum is converted to saunas, with a reception, café and indoor and outdoor relaxation spaces at the end of the promenade.', sheets: [['z-m-tp','Floor plan']]},
};

// Hit areas follow the labelled footprints on SIT.pdf in the reference render.
const viikkiFootprints = [
 ['A','249,315 315,313 375,306 432,292 487,275 529,258 548,307 503,324 449,340 384,354 315,364 249,368'],
 ['B','574,237 807,143 827,190 592,286'],
 ['C','850,126 900,105 924,145 954,185 990,215 1031,238 1093,260 1071,309 1015,288 962,262 921,231 887,194 865,159'],
 ['D1','814,273 853,289 856,299 838,334 831,337 795,320 791,312 808,278'],
 ['D2','917,351 925,353 953,381 952,389 924,415 916,414 887,387 887,379'],
 ['D3','726,336 769,348 773,355 760,390 753,396 713,383 709,376 719,342'],
 ['D4','815,376 824,377 853,404 850,412 825,441 818,440 788,416 788,408'],
 ['D5','781,465 791,468 817,495 814,505 787,530 777,529 751,502 751,493'],
 ['D6','587,664 595,667 621,694 620,703 594,730 585,728 557,702 557,694'],
 ['D7','708,713 716,715 743,742 741,750 715,780 705,777 676,750 677,743'],
 ['D8','514,738 523,742 550,768 547,776 520,804 513,802 485,774 486,767'],
 ['D9','635,785 643,788 670,816 667,825 642,850 633,849 606,823 605,815'],
 ['D10','441,810 449,813 477,840 475,849 449,877 440,874 412,848 412,840'],
 ['D11','563,860 571,862 597,889 596,897 568,925 560,923 532,896 533,888'],
 ['E','969,531 1022,518 1028,557 1030,601 1026,654 1017,696 998,747 973,793 943,839 902,805 929,766 951,722 969,673 978,626 980,583'],
 ['G','1127,278 1247,328 1194,462 1071,410'],
 ['M','480,920 527,966 369,1119 320,1072'],
];

const viikkiWater = [
 {id:'basin', name:'Planted basin', points:[[664,601],[900,646]], text:'Circular depressions collect runoff within the paved landscape. Trees and planting are part of the basin section.'},
 {id:'covered', name:'Removable cover', points:[[573,366],[672,443]], text:'A removable timber cover allows the basin to become part of the festival space during events organised at Gardenia. It can be lifted away to reopen the basin.'},
 {id:'channel', name:'Main channel', points:[[611,729],[858,480]], text:'The main channel follows the promenade and connects the smaller channels and collection basins.'},
 {id:'small-channel', name:'Smaller channel', points:[[718,392]], text:'A narrower channel winds between the buildings and connects to the main channel.'},
 {id:'culvert', name:'Culvert', points:[[947,458]], text:'A pipe carries water beneath the paved crossing between open parts of the network.'},
];

const viikkiStages = [
 ['Removing roads and parking spaces','The first move clears the existing roads and parking that cut across the site.'],
 ['New connecting road','A road at the edge reconnects the surrounding streets and keeps through traffic out of the interior.'],
 ['Alignment with the street','The new housing blocks align with the street, defining its edge while leaving the inner landscape open.'],
 ['Main footpaths','Two walking routes cross the site and connect it to the surrounding neighbourhood.'],
 ['Conserving existing greenery','Existing vegetation is kept along the pedestrian routes and the southern edge.'],
 ['The circle as a design principle','Curved blocks and landscape elements carry the circular geometry from the street into the site.'],
];

const viikkiAxos = [{name:'Axonometrics', sheets:[['axo-2','South'],['axo-3','Northeast'],['axo-1','Northwest']]}];
const viikkiBuildingDrawings = [
 {name:'Floor plans', sheets:[['b-ground','Ground floor'],['b-typical','Typical floor'],['b-roof','Roof level']]},
 {name:'Elevations', sheets:[['b-north','North'],['b-south','South'],['b-east','East'],['b-west','West']]},
 {name:'Sections', sheets:[['b-section-b','Longitudinal B–B'],['b-section-a','Stair A–A'],['b-section-c','Transverse C–C']]},
];

function viikkiImage(key, alt, eager = false) {
 const {src, width, height} = viikkiAssets[key];
 const load = eager ? 'fetchpriority="high"' : 'loading="lazy"';
 return `<img src="${src}" width="${width}" height="${height}" alt="${alt}" ${load} decoding="async">`;
}

function viikkiFigure(key, caption, eager = false) {
 return `<figure class="viikki-figure"><a href="${viikkiAssets[key].src}" target="_blank" rel="noopener">${viikkiImage(key, caption, eager)}</a><figcaption>${caption}</figcaption></figure>`;
}

function viikkiButtons(items, attribute, selected, label) {
 return `<div class="viikki-options" role="group" aria-label="${label}">${items.map(([value, name]) => `<button type="button" ${attribute}="${value}" aria-pressed="${value === selected}">${name}</button>`).join('')}</div>`;
}

function viikkiSheet(sheets, index = 0, planLinks = false) {
 const [key, label] = sheets[index];
 const {src, pdf} = viikkiAssets[key];
 const controls = sheets.length > 1 ? viikkiButtons(sheets.map(([,name], i) => [i,name]), 'data-viikki-sheet', index, 'Select drawing') : '';
 const picture = planLinks ? viikkiPlan(key, label) : `<a href="${pdf || src}" target="_blank" rel="noopener">${viikkiImage(key, label)}</a>`;
 return `${controls}<figure class="viikki-sheet">${picture}<figcaption><span>${label}</span><a href="${pdf || src}" target="_blank" rel="noopener">${pdf ? 'Open drawing PDF' : 'Open drawing'} ↗</a></figcaption></figure>`;
}

function viikkiPlan(key, label) {
 // Coordinates follow the A–A, B–B and C–C marks on source plans 01–03.
 const sections = [
  ['b-section-b','B–B','M122 351V324H614V354H1759V380'],
  ['b-section-a','A–A','M818 106H845V549H818'],
  ['b-section-c','C–C','M1042 108H1070V549H1042'],
 ];
 const elevations = [
  ['b-north','North','N',950,22,'M0 -6v15m-6 -6 6 6 6-6',0,-14],
  ['b-south','South','S',950,629,'M0 6v-15m-6 6 6-6 6 6',0,21],
  ['b-west','West','W',2,240,'M-6 0h18m-6 -6 6 6-6 6',-20,5],
  ['b-east','East','E',1808,240,'M6 0h-18m6 -6-6 6 6 6',20,5],
 ];
 return `<p class="viikki-plan-guide">Select a section line or an elevation arrow on the plan.</p>
  <div class="viikki-plan-scroll"><svg class="viikki-plan" viewBox="-48 -16 1895 685" role="group" aria-label="${label} with links to sections and elevations">
  <image href="${viikkiAssets[key].src}" x="26" y="0" width="1774" height="657" preserveAspectRatio="none"></image>
  ${sections.map(([id,name,path]) => `<g class="viikki-hit viikki-section-link" role="button" tabindex="0" aria-label="Open section ${name}" data-viikki-sheet-jump="${id}"><title>Section ${name}</title><path class="viikki-section-area" d="${path}"></path><path class="viikki-section-hover" d="${path}"></path></g>`).join('')}
  ${elevations.map(([id,name,letter,x,y,path,tx,ty]) => `<g class="viikki-hit viikki-elevation-link" role="button" tabindex="0" aria-label="Open ${name.toLowerCase()} elevation" data-viikki-sheet-jump="${id}" transform="translate(${x} ${y})"><title>${name} elevation</title><rect x="-30" y="-25" width="60" height="50" rx="6"></rect><path d="${path}"></path><text x="${tx}" y="${ty}">${letter}</text></g>`).join('')}
  </svg></div>`;
}

function viikkiMap(kind) {
 const isSite = kind === 'site';
 const label = isSite ? 'Select a building on the architectural site plan' : 'Select a water feature on the water management plan';
 const choices = isSite ? Object.keys(viikkiZoning).map(id => [id, id === 'D' ? 'D1–D11' : id]) : viikkiWater.map(item => [item.id, item.name]);
 const north = isSite ? `<g class="viikki-north" transform="translate(1288 1152)" role="img" aria-label="North points upwards"><title>North</title><circle r="31" fill="white" fill-opacity=".94"></circle><circle r="22" fill="none" stroke="#262626" stroke-width="1.2"></circle><path d="M0 16V-19L-5 1H0" fill="#262626" stroke="#262626" stroke-width="1.4"></path><text y="-36" text-anchor="middle">N</text></g>` : '';
 const targets = isSite ? viikkiFootprints.map(([id,points]) => `<polygon points="${points}" class="viikki-hit viikki-footprint" role="button" tabindex="0" aria-label="Building ${id}" aria-pressed="false" data-viikki-target="${id.startsWith('D') ? 'D' : id}"><title>Building ${id}</title></polygon>`).join('') : viikkiWater.map(item => item.points.map(([x,y]) => `<g class="viikki-hit viikki-marker" role="button" tabindex="0" aria-label="${item.name}" aria-pressed="false" data-viikki-target="${item.id}" transform="translate(${x} ${y})"><title>${item.name}</title><circle class="viikki-marker-area" r="30"></circle><circle class="viikki-marker-dot" r="12"></circle></g>`).join('')).join('');
 return `<div class="viikki-map-workspace" data-viikki-map="${kind}"><div class="viikki-map-left"><svg class="viikki-map" viewBox="128 43 1222 1187" role="group" aria-label="${label}"><image x="128" y="43" width="1222" height="1187" preserveAspectRatio="none" href="${viikkiAssets[kind].src}"></image>${targets}${north}</svg>${viikkiButtons(choices, 'data-viikki-target', '', isSite ? 'Buildings' : 'Water features')}</div><div class="viikki-map-panel" data-viikki-map-panel></div></div>`;
}

function viikkiDrawingSet(id, series) {
 const groups = series.length > 1 ? viikkiButtons(series.map(({name}, index) => [index,name]), 'data-viikki-series', 0, 'Drawing type') : '';
 return `<div class="viikki-drawing-set" data-viikki-drawings="${id}">${groups}<div data-viikki-drawing-panel>${viikkiSheet(series[0].sheets, 0, id === 'building')}</div></div>`;
}

function viikkiStageFigure(index) {
 const [title, description] = viikkiStages[index];
 return `<figure class="viikki-stage-figure">${viikkiImage(`stage-${index + 1}`, title)}
  <figcaption><strong>${title}</strong><span>${description}</span></figcaption></figure>`;
}

function viikkiDesignProcess() {
 return `<div class="viikki-design-process viikki-study">
  <section aria-labelledby="viikki-location-heading"><h3 id="viikki-location-heading">Location</h3>${viikkiFigure('location','The site in Viikki, Helsinki')}</section>
  <section data-viikki-stages aria-labelledby="viikki-principles-heading">
   <div class="viikki-stage-heading"><h3 id="viikki-principles-heading">Design principles</h3>
    <div class="viikki-options" role="group" aria-label="Design stages">${viikkiStages.map(([title], i) => `<button type="button" data-viikki-stage="${i}" aria-pressed="${i === 0}" aria-label="Stage ${i + 1}, ${title}">0${i + 1}</button>`).join('')}</div>
   </div>
   <div data-viikki-stage-panel aria-live="polite">${viikkiStageFigure(0)}</div>
   <div class="viikki-stage-nav viikki-options" role="group" aria-label="Step through the design">
    <button type="button" data-viikki-stage-step="-1" disabled>← Previous</button>
    <button type="button" data-viikki-stage-step="1">Next →</button>
   </div>
  </section>
 </div>`;
}

function renderViikkiContent() {
 return `<div class="viikki-story">
  <div class="viikki-opening">
   ${viikkiFigure('hero','Street frontage in Viikki',true)}
   <div class="viikki-render-grid">${viikkiFigure('courtyard','Housing along the courtyard')}${viikkiFigure('garden','Garden courtyard')}${viikkiFigure('facade','Courtyard façade')}</div>
   <p class="viikki-render-note">Supporting views refined with AI from the original Enscape renders.</p>
  </div>
  <nav class="viikki-chapter-links" aria-label="Viikki project chapters">
   <a href="#urban-design"><span>01</span> Urban design and zoning</a>
   <a href="#building-b"><span>02</span> Building B</a>
  </nav>
  <section class="viikki-chapter" id="urban-design" aria-labelledby="viikki-urban-heading">
   <p class="viikki-part">Part 1</p>
   <h2 id="viikki-urban-heading">Urban design and zoning</h2>
   <p class="viikki-intro">The neighbourhood plan connects a continuous street edge with smaller housing volumes set among the trees. The zoning plans test how housing, shared rooms and ground-floor uses fit into each building.</p>
   ${viikkiDesignProcess()}
   <div class="viikki-study"><h3>Architectural site plan</h3><p>Select a lettered building to see its zoning plans.</p>${viikkiMap('site')}</div>
   <section class="viikki-study viikki-neighbourhood-section"><h3>Neighbourhood section</h3>${viikkiFigure('site-section','Section across the neighbourhood')}</section>
   <div class="viikki-study"><h3>Water management</h3><p>Select a circle to see how the channels and basins carry and collect rainwater.</p>${viikkiMap('water')}</div>
   <div class="viikki-study"><h3>Neighbourhood axonometrics</h3>${viikkiDrawingSet('axo',viikkiAxos)}</div>
  </section>
  <section class="viikki-chapter" id="building-b" aria-labelledby="viikki-building-heading">
   <p class="viikki-part">Part 2</p>
   <h2 id="viikki-building-heading">Building B</h2>
   <p class="viikki-intro">Building B develops the zoning proposal into a detailed architectural design. A repeating timber frame organises the apartments and balconies above street level, with the stair and lift grouped in the middle of the block.</p>
   <div class="viikki-study"><h3>Detailed drawings</h3>${viikkiDrawingSet('building',viikkiBuildingDrawings)}</div>
   <section class="project-section viikki-construction" id="construction" aria-labelledby="viikki-construction-heading">
    <h2 id="viikki-construction-heading">Construction</h2>
    <p>Explore the primary timber frame, CLT slabs and stairs, balconies and lift shaft. The element switches and cutaway show how they fit together.</p>
    <iframe class="viikki-model" title="Interactive construction model of Viikki Building B" src="viikki-viewer-v4.html" loading="lazy"></iframe>
    <p class="viikki-model-note">Based on the Archicad model and thesis drawings. <a href="viikki-viewer-v4.html" target="_blank" rel="noopener">Open the model in a new tab ↗</a></p>
   </section>
  </section>
 </div>`;
}

function initViikkiPage(root) {
 const process = root.querySelector('[data-viikki-stages]');
 const stagePanel = process.querySelector('[data-viikki-stage-panel]');
 const stageButtons = Array.from(process.querySelectorAll('[data-viikki-stage]'));
 const [previous, next] = process.querySelectorAll('[data-viikki-stage-step]');
 let stage = 0;
 process.addEventListener('click', event => {
  const choice = event.target.closest('[data-viikki-stage], [data-viikki-stage-step]');
  if (!choice) return;
  stage = choice.hasAttribute('data-viikki-stage') ? Number(choice.dataset.viikkiStage) : stage + Number(choice.dataset.viikkiStageStep);
  stagePanel.innerHTML = viikkiStageFigure(stage);
  stageButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(stage === index)));
  previous.disabled = stage === 0;
  next.disabled = stage === viikkiStages.length - 1;
  if (choice.disabled) stageButtons[stage].focus({preventScroll:true});
 });

 for (const map of root.querySelectorAll('[data-viikki-map]')) {
  const panel = map.querySelector('[data-viikki-map-panel]');
  const site = map.dataset.viikkiMap === 'site';
  let selection, dVariant=0, dFloor=0;
  const zoningSheets = () => selection === 'D' ? viikkiDVariants[dVariant].sheets : viikkiZoning[selection].sheets;
  const select = id => {
   selection = id;
   for (const target of map.querySelectorAll('[data-viikki-target]')) target.setAttribute('aria-pressed', String(target.dataset.viikkiTarget === id));
   if (site) {
    const {description} = viikkiZoning[id], sheets=zoningSheets();
    const variants = id === 'D' ? viikkiButtons(viikkiDVariants.map((variant,index)=>[index,variant.name]), 'data-viikki-d-variant', dVariant, 'Building D variants') : '';
    panel.innerHTML = `<h4 aria-live="polite">${id === 'D' ? 'Buildings D1–D11' : `Building ${id}`}</h4><p>${description}</p>${variants}<div data-viikki-zoning-sheet>${viikkiSheet(sheets,id === 'D' ? dFloor : 0)}</div>${id === 'B' ? '<a class="viikki-detail-link" href="#building-b">Continue to the detailed design ↓</a>' : ''}`;
   } else {
    const item = viikkiWater.find(feature => feature.id === id);
    panel.innerHTML = `<h4 aria-live="polite">${item.name}</h4><p>${item.text}</p>${viikkiSheet([[id,item.name]])}`;
   }
  };
  map.addEventListener('click', event => {
   const hit = event.target.closest('[data-viikki-target]');
   if (hit) select(hit.dataset.viikkiTarget);
   const variant = event.target.closest('[data-viikki-d-variant]');
   if (site && variant) {
    dVariant = Number(variant.dataset.viikkiDVariant);
    select('D');
    panel.querySelector(`[data-viikki-d-variant="${dVariant}"]`).focus({preventScroll:true});
    return;
   }
   const sheet = event.target.closest('[data-viikki-sheet]');
   if (site && sheet) {
    const index = Number(sheet.dataset.viikkiSheet);
    const slot = panel.querySelector('[data-viikki-zoning-sheet]');
    if (selection === 'D') dFloor = index;
    slot.innerHTML = viikkiSheet(zoningSheets(), index);
    slot.querySelector(`[data-viikki-sheet="${index}"]`).focus({preventScroll:true});
   }
  });
  map.addEventListener('keydown', event => {
   const variant = event.target.closest('[data-viikki-d-variant]');
   if (site && variant && ['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
    event.preventDefault();
    dVariant = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1-dVariant;
    select('D');
    panel.querySelector(`[data-viikki-d-variant="${dVariant}"]`).focus({preventScroll:true});
    return;
   }
   const hit = event.target.closest('.viikki-hit');
   if (hit && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    select(hit.dataset.viikkiTarget);
   }
  });
  select(site ? 'B' : 'basin');
 }

 for (const picker of root.querySelectorAll('[data-viikki-drawings]')) {
  const building = picker.dataset.viikkiDrawings === 'building';
  const series = building ? viikkiBuildingDrawings : viikkiAxos;
  const panel = picker.querySelector('[data-viikki-drawing-panel]');
  const seriesButtons = Array.from(picker.querySelectorAll('[data-viikki-series]'));
  const selected = series.map(() => 0);
  let group = 0;
  const show = (groupIndex, sheetIndex) => {
   group = groupIndex;
   selected[group] = sheetIndex;
   seriesButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(group === index)));
   const returnLink = building && group !== 0 ? '<button type="button" class="viikki-return" data-viikki-return>← Back to plan</button>' : '';
   panel.innerHTML = returnLink + viikkiSheet(series[group].sheets, sheetIndex, building && group === 0);
  };
  const jump = target => {
   const id = target.dataset.viikkiSheetJump;
   const destination = series.findIndex(item => item.sheets.some(([key]) => key === id));
   show(destination, series[destination].sheets.findIndex(([key]) => key === id));
   panel.querySelector('[data-viikki-return]').focus({preventScroll:true});
  };
  picker.addEventListener('click', event => {
   const marker = event.target.closest('[data-viikki-sheet-jump]');
   if (marker) {
    jump(marker);
    return;
   }
   if (event.target.closest('[data-viikki-return]')) {
    show(0, selected[0]);
    seriesButtons[0].focus({preventScroll:true});
    return;
   }
   const seriesButton = event.target.closest('[data-viikki-series]');
   if (seriesButton) {
    const index = Number(seriesButton.dataset.viikkiSeries);
    show(index, selected[index]);
   }
   const sheet = event.target.closest('[data-viikki-sheet]');
   if (sheet) {
    const index = Number(sheet.dataset.viikkiSheet);
    show(group, index);
    panel.querySelector(`[data-viikki-sheet="${index}"]`).focus({preventScroll:true});
   }
  });
  picker.addEventListener('keydown', event => {
   const marker = event.target.closest('[data-viikki-sheet-jump]');
   if (marker && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    jump(marker);
   }
  });
 }
}
