/* Street-study sequence and wording follow Portfolio.pdf pp52–56. */
(() => {
'use strict';
const types=[
 {id:'all',name:'All streets',colour:'#777b75',copy:'The street hierarchy combines the 5 km and 2 km analyses. Select a coloured route or a street type to see its proposed character.'},
 {id:'shopping',name:'Busy shopping',colour:'#e69600',wide:'High',near:'Medium-high',copy:'Significant at both scales. Suitable for public transport and commerce with a high demand for movement.',reference:'busy',front:'busy'},
 {id:'transit',name:'Busy transit',colour:'#fa6400',wide:'High',near:'Medium',copy:'Significant at city scale, but less so locally. Suitable for public transport and commerce of city-wide significance with a lower demand for passing movement.',reference:'busy',front:'busy'},
 {id:'medium',name:'Medium',colour:'#0000ff',wide:'Medium',near:'Medium-low',copy:'Suitable for commerce of neighbourhood significance with a higher demand for movement.',reference:'medium',front:'medium'},
 {id:'calm',name:'Calm',colour:'#960096',wide:'Low',near:'Low',copy:'Suitable for shared residential spaces and local commercial uses with a lower demand for movement.',reference:'calm',front:'calm'},
 {id:'inner',name:'Inner network',colour:'#1ffd1f',wide:'Very low',near:'Very low',copy:'Inner courtyards and streets have little significance for through-movement. Their position can change, with space for shared residential uses and private gardens.',reference:'inner',front:'inner'},
 {id:'boats',name:'Boat community',colour:'#888888',wide:'—',near:'—',copy:'The boat community is kept separate from the movement hierarchy to preserve its particular social context.'}
];
const network=[['gull-network-proposal','Proposed network'],['gull-network-existing','Existing network'],['gull-network-context','City concept overlay'],['gull-network-ortho','Orthophoto overlay']];
const frontage=[['busy','Busy'],['medium','Medium'],['calm','Calm'],['inner','Inner network']];
const sectionRows=[['gull-street-a','Section A','Medium street · inner network · busy transit'],['gull-street-b','Section B','Calm street · inner network · busy shopping']];
const tab=(value,name,attr,selected)=>`<button type="button" ${attr}="${value}" aria-pressed="${String(value)===String(selected)}">${name}</button>`;
const keyLine=(colour,label,cls='')=>`<span class="gull-key-item"><i class="${cls}" style="--line:${colour}" aria-hidden="true"></i>${label}</span>`;
const networkKey=i=>i>1?keyLine('#ff1515','Proposed street network'):keyLine('#252525','Existing streets')+(i===0?keyLine('#ff1515','New streets')+keyLine('#d5d5d5','Removed streets'):'')+keyLine('#27813c','Unlinks / grade-separated crossings','is-ring');
function typeCopy(t,{image}){
 return `<h4>${t.name}</h4>${t.wide?`<dl class="gull-type-radii"><div><dt>5 km</dt><dd>${t.wide}</dd></div><div><dt>2 km</dt><dd>${t.near}</dd></div></dl>`:''}<p>${t.copy}</p>${t.reference?`<figure class="gull-street-reference">${image('gull-reference-'+t.reference,t.name+' street-type reference')}<figcaption>Reference: ${t.reference==='inner'?'Courtyard Apartment Scheme, Behance.':'Designguide för Smarta gator (2022), KTH, Chalmers, VTI, Spacescape, Sweco & White Arkitekter.'}</figcaption></figure>`:t.id==='all'?`<table class="gull-type-table"><thead><tr><th>Street type</th><th>5 km</th><th>2 km</th></tr></thead><tbody>${types.slice(1).map(r=>`<tr><td>${r.name}</td><td>${r.wide}</td><td>${r.near}</td></tr>`).join('')}</tbody></table>`:''}`;
}
window.renderGullStreetStudy=api=>{
 const {image,fig,openLink}=api;
 const mode=matchMedia('(max-width:700px)').matches?'5':'both';
 return `<div class="gull-street-study" data-gull-street-study>
 <nav class="gull-street-nav" aria-label="Street-design contents"><a href="#network">Network</a><a href="#street-analysis">Movement</a><a href="#street-types">Street types</a><a href="#street-frontages">Frontages and form</a><a href="#street-sections">Block proposal</a></nav>
 <section class="housing-section" id="network"><h3>Street network</h3><p class="housing-text">A proposed non-motorised network for Gullbergsvass. The drawings compare the new connections with existing streets, the city’s green-and-blue concept and the orthophoto.</p>
 <div class="housing-controls"><div class="housing-tabs" role="group" aria-label="Street-network drawings">${network.map(([k,n],i)=>tab(i,n,'data-gull-network',0)).join('')}</div><span data-network-open>${openLink(network[0][0])}</span></div>
 <div class="gull-network-frame" data-network-image>${image(network[0][0],network[0][1])}</div>
 <div class="gull-network-key" data-network-key>${networkKey(0)}</div></section>
 <section class="housing-section" id="street-analysis"><h3>Movement at two scales</h3><p class="housing-text">Angular betweenness measures how often a street lies on routes through the network. The 5 km city-scale analysis and the 2 km neighbourhood analysis are read together to define the street categories.</p>
 <div class="housing-controls"><div class="housing-tabs" role="group" aria-label="Compare analysis scales">${[['both','Compare'],['5','5 km'],['2','2 km']].map(([v,n])=>tab(v,n,'data-analysis-mode',mode)).join('')}</div></div>
 <div class="gull-analysis-pair" data-analysis-pair data-mode="${mode}"><div data-radius="5">${fig('gull-scale-5','5 km angular betweenness analysis','5 km · City scale')}</div><div data-radius="2">${fig('gull-scale-2','2 km angular betweenness analysis','2 km · Neighbourhood scale')}</div></div></section>
 <section class="housing-section" id="street-types"><h3>Street hierarchy</h3>
 <div class="housing-controls"><div class="housing-tabs gull-type-tabs" role="group" aria-label="Street categories">${types.map((t,i)=>tab(t.id,`<i style="--line:${t.colour}" aria-hidden="true"></i>${t.name}`,'data-gull-type',types[0].id)).join('')}</div>${openLink('gull-street-types')}</div>
 <div class="gull-types-layout"><div><div class="gull-route-map" data-route-map>${image('gull-street-types','Original coloured street hierarchy',false,'gull-route-base')}<div class="gull-route-highlight" data-route-highlight></div></div><p class="gull-street-hint">Select a coloured route or use the street-type buttons.</p></div><aside class="gull-type-panel" data-type-panel aria-live="polite">${typeCopy(types[0],api)}</aside></div></section>
 <section class="housing-section" id="street-frontages"><h3>Frontages and building form</h3><div class="gull-principle-pair"><div><h4>Street frontages</h4><div class="housing-controls"><div class="housing-tabs" role="group" aria-label="Ground-floor frontage">${frontage.map(([v,n])=>tab(v,n,'data-gull-frontage','busy')).join('')}</div><span data-frontage-open>${openLink('gull-frontage-busy')}</span></div><div class="gull-frontage-image" data-frontage-image>${image('gull-frontage-busy','Busy street frontage')}</div></div><div><h4>Building height and typology</h4>${fig('gull-height-principle','Building-height principle from busy/medium streets to calm/inner streets')}<p class="gull-street-hint">Busy / medium → calm / inner</p></div></div></section>
 <section class="housing-section" id="street-sections"><h3>Block proposal</h3><p class="housing-text">The street hierarchy is applied to a block: commercial frontages face the busier streets, with housing and shared spaces towards the inner network.</p>
 <div class="gull-block-layout"><div><div class="gull-block-plan">${image('gull-street-block','Block proposal: transit above, shopping to the right, medium below, calm to the left and inner network within')}${[
 ['transit','Select busy transit edge','left:0;top:4.1%;width:100%;height:14.7%'],['shopping','Select busy shopping edge','left:77.1%;top:0;width:15.5%;height:94.7%'],['medium','Select medium street edge','left:0;top:76%;width:100%;height:13.1%'],['calm','Select calm street edge','left:13.5%;top:0;width:12%;height:94.7%'],['inner','Select inner network','left:25.5%;top:28.8%;width:41%;height:37.2%']
 ].map(([id,label,style])=>`<button type="button" class="gull-block-hit" data-block-type="${id}" style="${style}" aria-label="${label}"></button>`).join('')}</div><p class="gull-street-hint">Select a street edge to follow its role in the block.</p><p class="gull-block-selection" data-block-selection aria-live="polite"></p></div>
 <div class="gull-block-sections"><div class="housing-controls"><div class="housing-tabs" role="group" aria-label="Block sections">${sectionRows.map((r,i)=>tab(i,r[1],'data-block-section',0)).join('')}</div><span data-section-open>${openLink(sectionRows[0][0])}</span></div><div data-block-section-image>${image(sectionRows[0][0],sectionRows[0][1])}</div><p class="gull-street-hint" data-block-section-caption>${sectionRows[0][2]}</p><div class="gull-block-frontage" data-block-frontage>${image('gull-frontage-busy','Ground-floor frontage principle')}</div></div></div></section></div>`;
};
window.initGullStreetStudy=(root,api)=>{
 const study=root.querySelector('[data-gull-street-study]');if(!study)return;
 const {image,openLink}=api;
 const replace=(selector,html)=>{const node=study.querySelector(selector);node.innerHTML=html;node.querySelectorAll('img').forEach(im=>im.loading='eager');};
 function setSection(i){
  study.querySelectorAll('[data-block-section]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.blockSection)===i)));
  replace('[data-block-section-image]',image(sectionRows[i][0],sectionRows[i][1]));replace('[data-section-open]',openLink(sectionRows[i][0]));study.querySelector('[data-block-section-caption]').textContent=sectionRows[i][2];
 }
 function setFrontage(id){
  study.querySelectorAll('[data-gull-frontage]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gullFrontage===id)));
  replace('[data-frontage-image]',image('gull-frontage-'+id,frontage.find(r=>r[0]===id)[1]+' street frontage'));replace('[data-frontage-open]',openLink('gull-frontage-'+id));
 }
 function setType(id,fromBlock=false){
  const t=types.find(t=>t.id===id);if(!t)return;
  study.querySelectorAll('[data-gull-type]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gullType===id)));
  study.querySelector('[data-route-map]').classList.toggle('has-selection',Boolean(t.front));
  replace('[data-route-highlight]',t.front?image('gull-type-'+id,'Highlighted '+t.name.toLowerCase()+' streets'):'');replace('[data-type-panel]',typeCopy(t,api));
  study.querySelectorAll('[data-block-type]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.blockType===id)));
  study.querySelector('[data-block-selection]').textContent=t.front?t.name+' — '+t.copy:'';
  if(t.front){setFrontage(t.front);replace('[data-block-frontage]',image('gull-frontage-'+t.front,t.name+' frontage principle'));}
  if(fromBlock)setSection(['calm','shopping'].includes(id)?1:0);
 }
 study.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.hasAttribute('data-gull-network')){const i=Number(b.dataset.gullNetwork);study.querySelectorAll('[data-gull-network]').forEach(n=>n.setAttribute('aria-pressed',String(n===b)));replace('[data-network-image]',image(network[i][0],network[i][1]));replace('[data-network-open]',openLink(network[i][0]));replace('[data-network-key]',networkKey(i));}
  else if(b.hasAttribute('data-analysis-mode')){const mode=b.dataset.analysisMode;study.querySelector('[data-analysis-pair]').dataset.mode=mode;study.querySelectorAll('[data-analysis-mode]').forEach(n=>n.setAttribute('aria-pressed',String(n===b)));}
  else if(b.hasAttribute('data-gull-type'))setType(b.dataset.gullType);
  else if(b.hasAttribute('data-gull-frontage'))setFrontage(b.dataset.gullFrontage);
  else if(b.hasAttribute('data-block-type'))setType(b.dataset.blockType,true);
  else if(b.hasAttribute('data-block-section'))setSection(Number(b.dataset.blockSection));
 });
 study.addEventListener('keydown',e=>{
  const b=e.target.closest('[data-gull-network],[data-analysis-mode],[data-gull-type],[data-gull-frontage],[data-block-section]');
  if(!b||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  e.preventDefault();const buttons=[...b.closest('[role="group"]').querySelectorAll('button')],i=buttons.indexOf(b),j=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowLeft'?-1:1)+buttons.length)%buttons.length;
  buttons[j].click();buttons[j].focus({preventScroll:true});
 });
 // Pick the nearest coloured source route; no street geometry is invented.
 const map=study.querySelector('[data-route-map]'),base=map.querySelector('.gull-route-base');let context;
 const hue=(r,g,b)=>{r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;if(!d||d/max<.55)return -1;let h=max===r?(g-b)/d+(g<b?6:0):max===g?(b-r)/d+2:(r-g)/d+4;return h*60;};
 map.addEventListener('click',e=>{
  if(!base.complete||!base.naturalWidth)return;
  if(!context){const canvas=document.createElement('canvas');canvas.width=base.naturalWidth;canvas.height=base.naturalHeight;context=canvas.getContext('2d',{willReadFrequently:true});context.drawImage(base,0,0);}
  const box=base.getBoundingClientRect(),x=(e.clientX-box.left)*base.naturalWidth/box.width,y=(e.clientY-box.top)*base.naturalHeight/box.height;
  const px=x/base.naturalWidth,py=y/base.naturalHeight;
  // The proposal occupies this source-registered area; background routes are red.
  if(px<.24||px>.86||py<.08||py>.88)return;
  const radius=Math.min(30,Math.ceil(7*base.naturalWidth/box.width)),left=Math.max(0,Math.floor(x-radius)),top=Math.max(0,Math.floor(y-radius)),w=Math.min(base.naturalWidth-left,radius*2+1),h=Math.min(base.naturalHeight-top,radius*2+1),data=context.getImageData(left,top,w,h).data;
  let best,dist=Infinity;
  for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){const n=(yy*w+xx)*4,v=hue(data[n],data[n+1],data[n+2]);const id=v>=32&&v<60?'shopping':v>=10&&v<32?'transit':v>200&&v<270?'medium':v>=275&&v<335?'calm':v>=80&&v<165?'inner':null;if(!id)continue;const d=(xx+left-x)**2+(yy+top-y)**2;if(d<dist){dist=d;best=id;}}
  if(best)setType(best);
 });
};
})();
