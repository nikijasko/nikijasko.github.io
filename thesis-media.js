function initThesisAnimations(root){
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 root.querySelectorAll('[data-thesis-animation]').forEach(image=>{
  let visible=!('IntersectionObserver'in window);
  function show(){
   const src=visible&&!reduced.matches?image.dataset.animation:image.dataset.still;
   if(image.getAttribute('src')!==src)image.src=src;
  }
  reduced.addEventListener('change',show);
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;show()},{threshold:.1}).observe(image);
  show();
 });
}
