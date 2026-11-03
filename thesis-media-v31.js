function initThesisSequence(root){
 const image=root.querySelector('[data-model-sequence]'),button=root.querySelector('#model-sequence-toggle');if(!image||!button)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let requested=!reduced.matches,visible=false;
 function show(){
  const src=requested&&visible?image.dataset.animation:image.dataset.still;
  if(image.getAttribute('src')!==src)image.src=src;
  button.textContent=requested?'Stop sequence':'Play sequence';
  button.setAttribute('aria-pressed',String(requested));
 }
 button.addEventListener('click',()=>{requested=!requested;show()});
 reduced.addEventListener('change',()=>{if(reduced.matches){requested=false;show()}});
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;show()},{rootMargin:'0px',threshold:.1}).observe(image);
 else visible=true;
 show();
}
