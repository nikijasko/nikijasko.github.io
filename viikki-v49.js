const viikkiZoning = {
 A: {description: 'The curved street block combines housing with shared rooms and street-level uses.', sheets: [['z-a-1np','Ground floor'],['z-a-tp','Typical floor']]},
 B: {description: 'The zoning-stage proposal for the straight street block. The later detailed design is in Part 2.', sheets: [['z-b-1np','Ground floor'],['z-b-tp','Typical floor']]},
 C: {description: 'A curved housing block follows the street and opens towards the inner landscape.', sheets: [['z-c-1np','Ground floor'],['z-c-tp','Typical floor']]},
 D: {description: 'D1–D11 are smaller housing volumes distributed along the promenade. This sheet shows their plan types.', sheets: [['z-d-celkovy','Plan types']]},
 E: {description: 'The curved block frames a landscaped space and combines dwellings with shared facilities.', sheets: [['z-e-1np','Ground floor'],['z-e-2np','First floor'],['z-e-3np','Second floor']]},
 G: {description: 'Parking is gathered at the edge of the site by the connecting road.', sheets: [['z-g-1np','Ground floor'],['z-g-tp','Typical floor']]},
 M: {description: 'The building at the southern end of the promenade brings together a reception, café and sauna spaces.', sheets: [['z-m-tp','Floor plan']]},
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
 {id:'covered', name:'Removable cover', points:[[573,366],[672,443]], text:'A removable timber deck can cover a collection basin where it meets the paved public space.'},
 {id:'channel', name:'Main channel', points:[[718,392]], text:'An open planted channel links the collection areas. The larger profile provides a wider depression for water and planting.'},
 {id:'small-channel', name:'Smaller channel', points:[[402,716]], text:'A narrower, meandering channel carries surface water through the green space.'},
 {id:'culvert', name:'Culvert', points:[[947,458]], text:'A pipe carries water beneath the paved crossing between open parts of the network.'},
 {id:'water-cycle', name:'Roof collection', points:[[690,219]], text:'The section connects roof planting, downpipes, an underground tank and the open landscape channel.'},
];

const viikkiAxos = [{name:'Axonometrics', sheets:[['axo-1','View 1'],['axo-2','View 2'],['axo-3','View 3']]}];
const viikkiBuildingDrawings = [
 {name:'Floor plans', sheets:[['b-ground','Ground floor'],['b-typical','Typical floor'],['b-roof','Roof level']]},
 {name:'Elevations', sheets:[['b-south','South'],['b-ends','East & west'],['b-north','North']]},
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

function viikkiSheet(sheets, index = 0) {
 const [key, label] = sheets[index];
 const controls = sheets.length > 1 ? viikkiButtons(sheets.map(([,name], i) => [i,name]), 'data-viikki-sheet', index, 'Select drawing') : '';
 return `${controls}<figure class="viikki-sheet"><a href="${viikkiAssets[key].src}" target="_blank" rel="noopener">${viikkiImage(key, label)}</a><figcaption><span>${label}</span><a href="${viikkiAssets[key].src}" target="_blank" rel="noopener">Open drawing ↗</a></figcaption></figure>`;
}

function viikkiMap(kind) {
 const isSite = kind === 'site';
 const label = isSite ? 'Select a building on the architectural site plan' : 'Select a water feature on the water management plan';
 const choices = isSite ? Object.keys(viikkiZoning).map(id => [id, id === 'D' ? 'D1–D11' : id]) : viikkiWater.map((item, i) => [item.id, `${i + 1} ${item.name}`]);
 const targets = isSite ? viikkiFootprints.map(([id,points]) => `<polygon points="${points}" class="viikki-hit viikki-footprint" role="button" tabindex="0" aria-label="Building ${id}" aria-pressed="false" data-viikki-target="${id.startsWith('D') ? 'D' : id}"><title>Building ${id}</title></polygon>`).join('') : viikkiWater.map((item, i) => item.points.map(([x,y]) => `<g class="viikki-hit viikki-marker" role="button" tabindex="0" aria-label="${item.name}" aria-pressed="false" data-viikki-target="${item.id}" transform="translate(${x} ${y})"><title>${item.name}</title><circle r="19"></circle><text y="1">${i+1}</text></g>`).join('')).join('');
 return `<div class="viikki-map-workspace" data-viikki-map="${kind}"><div class="viikki-map-left"><svg class="viikki-map" viewBox="128 43 1222 1187" role="group" aria-label="${label}"><image x="128" y="43" width="1222" height="1187" preserveAspectRatio="none" href="${viikkiAssets[kind].src}"></image>${targets}</svg>${viikkiButtons(choices, 'data-viikki-target', '', isSite ? 'Buildings' : 'Water features')}</div><div class="viikki-map-panel" data-viikki-map-panel></div></div>`;
}

function viikkiDrawingSet(id, series) {
 const groups = series.length > 1 ? viikkiButtons(series.map(({name}, index) => [index,name]), 'data-viikki-series', 0, 'Drawing type') : '';
 return `<div class="viikki-drawing-set" data-viikki-drawings="${id}">${groups}<div data-viikki-drawing-panel>${viikkiSheet(series[0].sheets)}</div></div>`;
}

function renderViikkiContent() {
 return `<div class="viikki-story">
  <div class="viikki-opening">
   ${viikkiFigure('hero','Street frontage in Viikki',true)}
   <div class="viikki-render-pair">${viikkiFigure('promenade','The planted promenade')}${viikkiFigure('courtyard','Housing along the courtyard')}</div>
  </div>
  <nav class="viikki-chapter-links" aria-label="Viikki project chapters">
   <a href="#urban-design"><span>01</span> Urban design and zoning</a>
   <a href="#building-b"><span>02</span> Building B</a>
  </nav>
  <section class="viikki-chapter" id="urban-design" aria-labelledby="viikki-urban-heading">
   <p class="viikki-part">Part 1</p>
   <h2 id="viikki-urban-heading">Urban design and zoning</h2>
   <p class="viikki-intro">I first developed the neighbourhood plan, from the street edge to the smaller housing volumes set among the trees. The zoning plans test how housing, shared rooms and ground floor uses fit into each building.</p>
   <details class="viikki-context"><summary>Location and design principles</summary><div><figure><img loading="lazy" src="figure-31.jpg" width="873" height="1410" alt="Site location in Viikki and early promenade study"></figure><figure><img loading="lazy" src="figure-32.jpg" width="1987" height="1262" alt="Six diagrams showing the urban design principles"></figure></div></details>
   <div class="viikki-study"><h3>Architectural site plan</h3><p>Select a lettered building to see its zoning plans.</p>${viikkiMap('site')}</div>
   <details class="viikki-context"><summary>Neighbourhood section</summary>${viikkiFigure('site-section','Section across the neighbourhood')}</details>
   <div class="viikki-study"><h3>Water management</h3><p>The plan links roof runoff, planted channels and collection basins. Select a marker to see the corresponding detail.</p>${viikkiMap('water')}</div>
   <div class="viikki-study"><h3>Neighbourhood axonometrics</h3>${viikkiDrawingSet('axo',viikkiAxos)}</div>
  </section>
  <section class="viikki-chapter" id="building-b" aria-labelledby="viikki-building-heading">
   <p class="viikki-part">Part 2</p>
   <h2 id="viikki-building-heading">Building B</h2>
   <p class="viikki-intro">I then took Building B from the zoning proposal into detailed architectural design. A repeating timber frame organises the apartments and balconies above the street level, with the stair and lift grouped in the middle of the block.</p>
   <div class="viikki-study"><h3>Detailed drawings</h3>${viikkiDrawingSet('building',viikkiBuildingDrawings)}</div>
   <section class="project-section viikki-construction" id="construction" aria-labelledby="viikki-construction-heading">
    <h2 id="viikki-construction-heading">Construction</h2>
    <p>Explore the primary timber frame, CLT slabs and stairs, balconies and lift shaft. The element switches and cutaway show how they fit together.</p>
    <iframe class="viikki-model" title="Interactive construction model of Viikki Building B" src="viikki-viewer-v4.html" loading="lazy"></iframe>
    <p class="viikki-model-note">Based on the Archicad model and thesis drawings. <a href="viikki-viewer-v4.html" target="_blank" rel="noopener">Open the model in a new tab ↗</a></p>
   </section>
   <div class="viikki-study"><h3>Additional perspectives</h3><div class="viikki-render-grid">${viikkiFigure('garden','Garden courtyard')}${viikkiFigure('facade','Courtyard façade')}${viikkiFigure('street-study','Earlier street study')}</div><p class="viikki-render-note">Supporting renders refined with AI from the original Enscape views.</p></div>
  </section>
 </div>`;
}

function initViikkiPage(root) {
 for (const map of root.querySelectorAll('[data-viikki-map]')) {
  const panel = map.querySelector('[data-viikki-map-panel]');
  const site = map.dataset.viikkiMap === 'site';
  let selection;
  const select = id => {
   selection = id;
   for (const target of map.querySelectorAll('[data-viikki-target]')) target.setAttribute('aria-pressed', String(target.dataset.viikkiTarget === id));
   if (site) {
    const {description, sheets} = viikkiZoning[id];
    panel.innerHTML = `<h4 aria-live="polite">${id === 'D' ? 'Buildings D1–D11' : `Building ${id}`}</h4><p>${description}</p><div data-viikki-zoning-sheet>${viikkiSheet(sheets)}</div>${id === 'B' ? '<a class="viikki-detail-link" href="#building-b">Continue to the detailed design ↓</a>' : ''}`;
   } else {
    const item = viikkiWater.find(feature => feature.id === id);
    panel.innerHTML = `<h4 aria-live="polite">${item.name}</h4><p>${item.text}</p>${viikkiSheet([[id,item.name]])}`;
   }
  };
  map.addEventListener('click', event => {
   const hit = event.target.closest('[data-viikki-target]');
   if (hit) select(hit.dataset.viikkiTarget);
   const sheet = event.target.closest('[data-viikki-sheet]');
   if (site && sheet) {
    const index = Number(sheet.dataset.viikkiSheet);
    const slot = panel.querySelector('[data-viikki-zoning-sheet]');
    slot.innerHTML = viikkiSheet(viikkiZoning[selection].sheets, index);
    slot.querySelector(`[data-viikki-sheet="${index}"]`).focus();
   }
  });
  map.addEventListener('keydown', event => {
   const hit = event.target.closest('.viikki-hit');
   if (hit && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    select(hit.dataset.viikkiTarget);
   }
  });
  select(site ? 'B' : 'basin');
 }

 for (const picker of root.querySelectorAll('[data-viikki-drawings]')) {
  const series = picker.dataset.viikkiDrawings === 'axo' ? viikkiAxos : viikkiBuildingDrawings;
  const panel = picker.querySelector('[data-viikki-drawing-panel]');
  let group = 0;
  picker.addEventListener('click', event => {
   const seriesButton = event.target.closest('[data-viikki-series]');
   if (seriesButton) {
    group = Number(seriesButton.dataset.viikkiSeries);
    for (const button of picker.querySelectorAll('[data-viikki-series]')) button.setAttribute('aria-pressed', String(button === seriesButton));
    panel.innerHTML = viikkiSheet(series[group].sheets);
   }
   const sheet = event.target.closest('[data-viikki-sheet]');
   if (sheet) {
    const index = Number(sheet.dataset.viikkiSheet);
    panel.innerHTML = viikkiSheet(series[group].sheets, index);
    panel.querySelector(`[data-viikki-sheet="${index}"]`).focus();
   }
  });
 }
}
