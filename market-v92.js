// The four portfolio extracts belong to adjacent regions of one axonometric.
// These boundaries follow the original extracts, in the 2600px source drawing.
const marketRegions92=[[0,596],[596,411],[1007,668],[1675,925],[0,2600]];
function renderMarketPage92(p,next){
 const rows=marketTimeline91;
 return `<div class="project-heading"><h1>${p.title}</h1></div><div class="intro"><p>${p.text}</p></div><section id="market-timeline" class="market-timeline" aria-label="The market of time timeline"><div class="market-timeline-tabs" role="tablist" aria-label="Transformation timeline">${rows.map((r,i)=>`<button type="button" id="market-tab-${i}" role="tab" aria-controls="market-stage" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-market-stage="${i}"><span>${i<4?'0'+(i+1):'05'}</span>${r.title}</button>`).join('')}</div><div id="market-stage" class="market-timeline-stage" role="tabpanel" aria-labelledby="market-tab-0"><figure class="market-stage-drawing"><a href="market-full-v91.webp" aria-label="Enlarge full drawing"><svg class="market-fixed-drawing" viewBox="0 80 2600 1760" role="img" aria-label="Part 1 of the market transformation, in its position within the full drawing"><defs><clipPath id="market-reveal-92" clipPathUnits="userSpaceOnUse"><rect data-market-reveal x="0" y="80" width="596" height="1760"/></clipPath></defs><image href="market-full-v91.webp" width="2600" height="1840" clip-path="url(#market-reveal-92)"/></svg></a></figure><div class="market-stage-copy"><p data-market-copy>${rows[0].text}</p><div class="market-stage-actions"><button type="button" data-market-prev disabled>← Previous</button><button type="button" data-market-next>Next →</button></div><a class="market-original-link" href="market-full-v91.webp">Enlarge full drawing ↗</a></div></div></section><div class="next"><a href="index.html?v=92">← Projects</a><a href="${next.id}.html">Next project →</a></div>`;
}
function initMarketPage92(root){
 let selected=0;
 const rows=marketTimeline91,tabs=[...root.querySelectorAll('[data-market-stage]')],panel=root.querySelector('#market-stage'),drawing=panel.querySelector('svg'),reveal=drawing.querySelector('[data-market-reveal]');
 const source=drawing.querySelector('image');
 // Both encodings share the same drawing coordinates; mobile downloads only 90 KB.
 if(matchMedia('(max-width:720px)').matches)source.setAttribute('href','market-full-small-v91.webp');
 function show(index,focus=false){
  selected=index;const row=rows[index];
  tabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(i===index));t.tabIndex=i===index?0:-1});
  panel.setAttribute('aria-labelledby','market-tab-'+index);
  const [x,width]=marketRegions92[index];reveal.setAttribute('x',x);reveal.setAttribute('width',width);
  drawing.setAttribute('aria-label',index<4?'Part '+(index+1)+' of the market transformation, in its position within the full drawing':'Complete axonometric showing all four parts');
  panel.querySelector('[data-market-copy]').textContent=row.text;
  panel.querySelector('[data-market-prev]').disabled=index===0;panel.querySelector('[data-market-next]').disabled=index===4;
  if(focus)tabs[index].focus({preventScroll:true});
 }
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>show(i));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();show(e.key==='Home'?0:e.key==='End'?4:(selected+(e.key==='ArrowRight'?1:-1)+5)%5,true)})});
 panel.querySelector('[data-market-prev]').onclick=()=>show(Math.max(0,selected-1));panel.querySelector('[data-market-next]').onclick=()=>show(Math.min(4,selected+1));
}
