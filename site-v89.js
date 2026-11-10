(()=>{
'use strict';
const root=document.querySelector('#detail');
const originalName=u=>decodeURIComponent(new URL(u,location.href).pathname.split('/').pop());
function enhanceLinks(scope){scope.querySelectorAll('a[href]').forEach(a=>{const u=new URL(a.getAttribute('href'),location.href);if(u.origin===location.origin&&u.pathname.endsWith('/project.html')&&u.searchParams.get('id')){const id=u.searchParams.get('id');if(['emergence','market','gullbergsvass','viikki','kapitulska','matadorka','dordrecht','school','strazna','footbridges'].includes(id))a.href=id+'.html'+u.hash}})}
function enhanceImages(scope){
 enhanceLinks(scope);
 scope.querySelectorAll('img').forEach(im=>{
  if(im.closest('dialog')||im.matches('.housing-over,.housing-under,.housing-site-underlay,.school-plan-base,.school-plan-upper')||im.closest('.gull-route-map'))return;
  const key=originalName(im.getAttribute('src')||''),entry=window.previewAssets89?.[key];
  if(!entry||im.dataset.preview89===key)return;
  im.dataset.preview89=key;im.srcset=`${entry.src} ${entry.width}w, ${key} ${entry.originalWidth}w`;
  im.sizes='(max-width:650px) calc(100vw - 40px), (max-width:1264px) calc(100vw - 64px), 1200px';
 });
}
const dialog=document.createElement('dialog');dialog.className='media-viewer-v89';dialog.setAttribute('aria-label','Drawing viewer');
dialog.innerHTML='<header><p id="media-title-v89"></p><div><button type="button" data-zoom89 aria-pressed="false">Zoom in</button><a data-original89 target="_blank" rel="noopener">Open original ↗</a><button type="button" data-close89>Close ×</button></div></header><div class="media-stage-v89"></div>';
document.body.append(dialog);let opener;
dialog.querySelector('[data-close89]').onclick=()=>dialog.close();
dialog.addEventListener('close',()=>{dialog.querySelector('.media-stage-v89').replaceChildren();opener?.focus({preventScroll:true})});
dialog.querySelector('[data-zoom89]').onclick=e=>{const on=dialog.querySelector('.media-stage-v89').classList.toggle('zoom');e.target.textContent=on?'Fit drawing':'Zoom in';e.target.setAttribute('aria-pressed',String(on))};
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.addEventListener('click',e=>{
 const a=e.target.closest('a');if(!a||!root?.contains(a)||e.ctrlKey||e.metaKey||e.shiftKey||a.hasAttribute('download'))return;
 const url=new URL(a.href,location.href);if(url.origin!==location.origin||! /\.(webp|png|jpe?g|pdf)$/i.test(url.pathname))return;
 e.preventDefault();e.stopImmediatePropagation();opener=a;
 const pdf=/\.pdf$/i.test(url.pathname),stage=dialog.querySelector('.media-stage-v89');stage.classList.remove('zoom');
 const title=a.querySelector('img')?.alt||a.getAttribute('aria-label')?.replace(/^Enlarge\s*/,'')||'Project drawing';dialog.querySelector('#media-title-v89').textContent=title;
 const media=document.createElement(pdf?'iframe':'img');if(pdf){media.title=title;media.src=url.href;dialog.querySelector('[data-zoom89]').hidden=true}else{media.src=url.href;media.alt=title;dialog.querySelector('[data-zoom89]').hidden=false}
 stage.replaceChildren(media);dialog.querySelector('[data-original89]').href=url.href;dialog.querySelector('[data-zoom89]').textContent='Zoom in';dialog.querySelector('[data-zoom89]').setAttribute('aria-pressed','false');dialog.showModal();
},true);
function setup(){
 if((root?.dataset.static89&&!window.projectReady89)||!root||root.dataset.enhanced89||!root.querySelector('.project-metadata'))return;
 root.dataset.enhanced89='true';
 const meta=root.querySelector('.project-metadata');const lines=[...meta.children];
 const priority=p=>/^(Supervised|Examiner|Team|Collaboration)/.test(p.textContent)?1:/^Awards:/.test(p.textContent)?3:/\d{4}/.test(p.textContent)?2:0;
 // Gullbergsvass has two separate course credit groups: retain their associations.
 if(root.dataset.project!=='gullbergsvass')lines.map((el,i)=>({el,i,p:priority(el)})).sort((a,b)=>a.p-b.p||a.i-b.i).forEach(x=>meta.append(x.el));
 // Use the same opening rhythm while keeping the thesis quotation and Market layout.
 const id=root.dataset.project;
 if(!['emergence','market'].includes(id)){
  const intro=root.querySelector('.intro,.housing-intro,.bridge-intro,.practice-intro');
  if(intro&&!intro.querySelector('img'))meta.after(intro);
 }
 const sections=[...root.querySelectorAll('section[id]')].filter(s=>s.querySelector('h2,h3')&&!s.closest('dialog')).map(s=>({id:s.id,title:s.querySelector('h2,h3').textContent}));
 if(sections.length>=2){
  const nav=document.createElement('nav');nav.id='project-contents-v89';nav.className='project-contents-v89';nav.setAttribute('aria-label','Project sections');
  sections.forEach(s=>{const a=document.createElement('a');a.href='#'+s.id;a.textContent=s.title;nav.append(a)});
  if(!root.querySelector('.housing-jumps,.viikki-chapter-links,.bridge-contents,.thesis-process')){const intro=root.querySelector('.intro,.housing-intro,.practice-intro');(intro||meta).after(nav)}else nav.hidden=true;
  const back=document.createElement('a');back.className='return-v89';back.href='#'+(nav.hidden?'detail':nav.id);back.textContent=nav.hidden?'↑ Project start':'↑ Contents';back.hidden=true;root.append(back);
  const update=()=>back.hidden=scrollY<900;document.addEventListener('scroll',update,{passive:true});update();
 }
 root.querySelectorAll('.school-plan-scroll').forEach(view=>{
  const wrap=document.createElement('div');wrap.className='drawing-guide-v89';const zoom=document.createElement('button');zoom.type='button';zoom.textContent='Zoom in';zoom.setAttribute('aria-pressed','false');
  zoom.onclick=()=>{const on=view.classList.toggle('detail-zoom');zoom.textContent=on?'Fit drawing':'Zoom in';zoom.setAttribute('aria-pressed',String(on));view.scrollLeft=0};wrap.append(zoom,' · Zoom in, then swipe to pan.');view.before(wrap);
 });
 enhanceImages(root);
}
enhanceLinks(document);document.addEventListener("project-ready",setup);setup();new MutationObserver(records=>{setup();for(const r of records){if(r.type==='attributes'&&r.target.tagName==='IMG')enhanceImages(r.target.parentElement);else for(const n of r.addedNodes)if(n.nodeType===1)enhanceImages(n)}}).observe(root||document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
document.querySelectorAll('a[href="Niki-Jasko-Portfolio-Web.pdf"]').forEach(a=>a.textContent='Portfolio PDF · 13 MB ↗');
})();
