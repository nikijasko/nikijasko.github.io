function renderInteractiveMasterplan(data) {
 const polygon=points=>points.map(p=>p.join(',')).join(' ');
 const ruleLabel=z=>`${z.use.replace('BC','BC ')}: ${z.floors.join('–')} storeys, maximum ${z.coverage}% plot coverage`;
 return `<section class="masterplan" id="masterplan" aria-labelledby="masterplan-title">
  <h3 id="masterplan-title">Masterplan</h3>
  <p class="masterplan-intro">Select an area to see its building rules.</p>
  <div class="masterplan-layout">
   <div class="masterplan-map-column" id="masterplan-map">
    <div class="masterplan-toolbar"><svg class="masterplan-north" viewBox="-22 -34 44 58" role="img" aria-label="North points towards the top of the plan"><title>North</title><text x="0" y="-23" text-anchor="middle">N</text><circle cx="0" cy="0" r="17"></circle><path d="M0 0V-17"></path></svg><button type="button" id="masterplan-zoom" aria-pressed="false">Zoom in</button></div>
    <svg class="masterplan-canvas" preserveAspectRatio="xMinYMin meet" viewBox="${data.viewBox.join(' ')}" role="group" aria-label="Interactive masterplan: select an area to view building rules">
     <defs><clipPath id="masterplan-map-clip"><rect x="${data.viewBox[0]}" y="${data.viewBox[1]}" width="${data.viewBox[2]}" height="${data.viewBox[3]}"></rect></clipPath></defs>
     <g clip-path="url(#masterplan-map-clip)">
     <image href="${data.image}" width="${data.width}" height="${data.height}" aria-hidden="true"/>
     <polygon class="masterplan-unbuilt" data-zone="unbuilt" points="${polygon(data.site)}" role="button" tabindex="0" aria-label="Streets and unbuilt areas" aria-pressed="false"><title>Streets and unbuilt areas</title></polygon>
     ${data.zones.map(z=>`<polygon class="masterplan-zone" data-zone="${z.id}" points="${polygon(z.points)}" role="button" tabindex="0" aria-label="${ruleLabel(z)}" aria-pressed="false"></polygon>`).join('')}
     </g>
    </svg>
    <p class="masterplan-map-note">Highlighted boundary: current selection. <a href="${data.image}" target="_blank" rel="noopener">Original plan ↗</a></p>
   </div>
   <aside class="masterplan-details" aria-label="Building rules" id="masterplan-rules" tabindex="-1"><div id="masterplan-rule-content"></div><button type="button" class="masterplan-back">Back to plan ↑</button></aside>
  </div>
  <p class="masterplan-source">Rules from the thesis proposal. <a href="${data.legend}" target="_blank" rel="noopener">View the original rule sheet ↗</a></p>
  <p class="masterplan-sr-only" role="status" aria-live="polite" id="masterplan-status"></p>
 </section>`;
}

function initInteractiveMasterplan(root,data) {
 const section=root.querySelector('.masterplan');if(!section)return;
 const svg=section.querySelector('.masterplan-canvas'),content=section.querySelector('#masterplan-rule-content'),details=section.querySelector('.masterplan-details'),zoomButton=section.querySelector('#masterplan-zoom');
 let selected='west-central',zoomed=false;
 const uses={
  B:{title:'Residential',text:'Residential use on at least 80% of plots in the block. The rule sheet does not specify the remaining uses.'},
  BC1:{title:'Residential & centre uses',text:'Residential use on at least 80% of plots, with at least 3 active ground-floor uses per block.'},
  BC2:{title:'Residential & centre uses',text:'Residential use on at least 80% of plots, with no more than 2 active ground-floor uses per block.'}
 };
 function camera(){
  const z=data.zones.find(z=>z.id===selected);
  if(!zoomed||!z){svg.setAttribute('viewBox',data.viewBox.join(' '));zoomed=false}
  else{
   const xs=z.points.map(p=>p[0]),ys=z.points.map(p=>p[1]);
   const cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2;
   const height=Math.max(230,Math.max(...ys)-Math.min(...ys)+70),width=height*data.viewBox[2]/data.viewBox[3];
   const adjustedWidth=Math.max(width,Math.max(...xs)-Math.min(...xs)+45),adjustedHeight=adjustedWidth*data.viewBox[3]/data.viewBox[2];
   svg.setAttribute('viewBox',[cx-adjustedWidth/2,cy-adjustedHeight/2,adjustedWidth,adjustedHeight].join(' '));
  }
  zoomButton.textContent=zoomed?'Show full plan':'Zoom in';zoomButton.setAttribute('aria-pressed',String(zoomed));zoomButton.disabled=selected==='unbuilt';
 }
 function choose(id,fromMap=false){
  const z=data.zones.find(item=>item.id===id);if(!z&&id!=='unbuilt')return;
  selected=id;
  section.querySelectorAll('[data-zone]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.zone===id)));
  if(z){
   const use=uses[z.use];
   const entrance=z.entrance==='p1'?'All entrances must face side streets.':z.entrance==='p2'?'Active ground-floor uses must have at least one entrance facing the main street.':'No additional entrance rule is marked for this zone.';
   const frontage=z.frontage==='f1'?'Building frontage must not sit behind the designated setback line drawn on the plan.':'Building frontage must be no more than 2 m from the main-street boundary.';
   content.innerHTML=`<p class="masterplan-zone-code">${z.use.replace('BC','BC ')} · ${z.codes.map(code=>code[0]+'<sub>'+code.slice(1)+'</sub>').join(', ')}</p><h5>What you can build</h5><p>${use.title} in buildings of <strong>${z.floors.join('–')} storeys</strong>.</p><h5>Limits and requirements</h5><ul><li>Buildings may cover up to <strong>${z.coverage}% of each plot</strong>.</li><li>${entrance}</li><li>${frontage}</li></ul><h5>Across the block</h5><p>${use.text}</p><p class="masterplan-block-note">Block-wide requirements apply to the plots together.</p>`;
   section.querySelector('#masterplan-status').textContent=`${z.floors.join(' to ')} storeys, maximum ${z.coverage}% plot coverage. Rules updated.`;
  }else{
   content.innerHTML='<p class="masterplan-zone-code">Unbuilt areas</p><h5>What stays unbuilt</h5><p>The main street and the areas outside the regulation zones remain unbuilt in this proposal.</p><p>Building permissions shown for the neighbouring zones do not extend into these spaces.</p><p class="masterplan-block-note">The dotted areas on the original plan mark unbuilt land.</p>';
   section.querySelector('#masterplan-status').textContent='Streets and unbuilt areas selected. Building permissions do not extend into these spaces.';
  }
  camera();
  if(fromMap&&window.matchMedia('(max-width: 760px)').matches){details.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});details.focus({preventScroll:true})}
 }
 svg.addEventListener('click',event=>{const zone=event.target.closest('[data-zone]');if(zone)choose(zone.dataset.zone,true)});
 svg.addEventListener('keydown',event=>{const zone=event.target.closest('[data-zone]');if(zone&&(event.key==='Enter'||event.key===' ')){event.preventDefault();choose(zone.dataset.zone,true)}});
 zoomButton.addEventListener('click',()=>{zoomed=!zoomed;camera()});
 section.querySelector('.masterplan-back').addEventListener('click',()=>{section.querySelector('#masterplan-map').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});(svg.querySelector(`[data-zone="${selected}"]`)||zoomButton).focus({preventScroll:true})});
 choose(selected);
}
