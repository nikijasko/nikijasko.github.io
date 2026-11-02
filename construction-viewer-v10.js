import * as THREE from 'three';
import {OrbitControls} from './OrbitControls.js';
import {STLLoader} from './STLLoader.js';
const stage=document.querySelector('#stage'),status=document.querySelector('#status');
let renderer,controls,camera,scene,plane,height=1,ready=false,contextLost=false;
const memberGroups=new Map(); let xrayEnabled=false;
const viewButtons=[...document.querySelectorAll('[data-view]')];
function render(){if(ready&&!contextLost)renderer.render(scene,camera)}
function repaint(){if(ready)requestAnimationFrame(()=>{resize();render()})}
window.addEventListener('pageshow',repaint);window.addEventListener('focus',repaint);document.addEventListener('visibilitychange',()=>{if(!document.hidden)repaint()});
document.querySelector('#retry').addEventListener('click',()=>{const u=new URL(location.href);u.searchParams.set('reload',Date.now());location.replace(u.href)});
async function request(url,type='json'){
 let failure;for(let attempt=0;attempt<2;attempt++){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);try{const response=await fetch(url,{cache:attempt?'reload':'default',signal:controller.signal});if(!response.ok)throw Error('Could not load '+url);return type==='json'?await response.json():await response.arrayBuffer()}catch(error){failure=error;if(!attempt)await new Promise(resolve=>setTimeout(resolve,350))}finally{clearTimeout(timeout)}}throw failure;
}
function view(name){
 if(!ready)return;
 camera.up.set(0,1,0);
 const positions={iso:[13,9,13],top:[0,20,.001],front:[0,0,20]};
 camera.position.set(...positions[name]);controls.target.set(0,0,0);camera.zoom=1;camera.updateProjectionMatrix();controls.update();
 viewButtons.forEach(b=>{b.classList.toggle('active',b.dataset.view===name);b.setAttribute('aria-pressed',String(b.dataset.view===name))});render();
}
function resize(){
 if(!renderer)return;
 const w=stage.clientWidth,h=stage.clientHeight;if(w<1||h<1)return;renderer.setSize(w,h);const aspect=w/h,span=4;
 camera.left=-span*aspect;camera.right=span*aspect;camera.top=span;camera.bottom=-span;
 if(aspect<1){camera.left=-6;camera.right=6;camera.top=6/aspect;camera.bottom=-6/aspect}
 camera.updateProjectionMatrix();render();
}
function slice(){
 if(!ready)return;
 const value=Number(document.querySelector('#slice').value);plane.constant=-height/2+height*value/100+.005;
 document.querySelector('#level').textContent=value===100?'Full model':value+'%';render();
}
function xray(on){
 xrayEnabled=on;
 for(const group of memberGroups.values())group.traverse(obj=>{
  if(!obj.isMesh)return;
  const mat=obj.material,base=obj.userData.opacity;
  mat.opacity=on?Math.min(base,.18):base;mat.transparent=mat.opacity<1;mat.depthWrite=mat.opacity===1;mat.needsUpdate=true;
 });
 document.querySelector('#xray').classList.toggle('active',on);document.querySelector('#xray').setAttribute('aria-pressed',String(on));render();
}
function setVisibility(structureOnly=false){
 for(const [id,group] of memberGroups)group.visible=!structureOnly||!['envelope','internal'].includes(id);
 document.querySelectorAll('.category input').forEach(input=>input.checked=memberGroups.get(input.dataset.category).visible);render();
}
try{
 status.textContent='Loading model…';
 const meta=await request('./structure-categories-v10.json');
 const [building,structures]=await Promise.all([request('./'+meta.buildingSource),Promise.all(meta.categories.filter(c=>c.src).map(async category=>({category,geo:new STLLoader().parse(await request('./'+category.src,'arrayBuffer'))}))) ]);
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0xf6f6f3);renderer.localClippingEnabled=true;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
 stage.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','3D school building. Use the categories to hide walls or structure, or drag to rotate.');renderer.domElement.setAttribute('tabindex','0');
 scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-10,10,7,-7,.01,200);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=false;controls.minZoom=.4;controls.maxZoom=12;controls.addEventListener('change',render);
 scene.add(new THREE.HemisphereLight(0xffffff,0xd5d7d5,1.8));const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(7,15,10);scene.add(light);const fill=new THREE.DirectionalLight(0xffffff,.8);fill.position.set(-8,5,-6);scene.add(fill);
 const scale=10/Math.max(...meta.size);height=meta.size[2]*scale;plane=new THREE.Plane(new THREE.Vector3(0,-1,0),height/2+.005);
 for(const category of meta.categories){const group=new THREE.Group();group.name=category.label;scene.add(group);memberGroups.set(category.id,group)}
 function addMesh(geo,category,settings){
  geo.translate(-meta.center[0],-meta.center[1],-meta.center[2]);geo.rotateX(-Math.PI/2);geo.scale(scale,scale,scale);
  if(geo.index)geo=geo.toNonIndexed();geo.computeVertexNormals();
  const opacity=settings.opacity??1;
  if(settings.texture==='sedum'){
   const v=geo.getAttribute('position'),uv=[];for(let i=0;i<v.count;i++)uv.push(v.getX(i)*18,v.getZ(i)*18);geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  }
  const mat=new THREE.MeshStandardMaterial({color:settings.color,roughness:opacity<1?.18:.88,metalness:category==='steel'?.12:0,side:THREE.DoubleSide,transparent:opacity<1,opacity,depthWrite:opacity===1,clippingPlanes:[plane]});
  if(settings.texture==='sedum'){
   const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const ctx=canvas.getContext('2d');const pixels=ctx.createImageData(128,128);let seed=418;
   for(let i=0;i<pixels.data.length;i+=4){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const v=(seed>>>24)/255;pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=210+v*40;pixels.data[i+3]=255;}
   ctx.putImageData(pixels,0,0);const texture=new THREE.CanvasTexture(canvas);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.colorSpace=THREE.SRGBColorSpace;mat.map=texture;
  }
  const mesh=new THREE.Mesh(geo,mat);mesh.name=settings.name??category;mesh.userData.opacity=opacity;memberGroups.get(category).add(mesh);
  if(settings.edges!==false)memberGroups.get(category).add(new THREE.LineSegments(new THREE.EdgesGeometry(geo,25),new THREE.LineBasicMaterial({color:category==='envelope'?0x514b46:0x69695e,transparent:true,opacity:category==='envelope'?.22:.28,clippingPlanes:[plane]})));
 }
 for(const {category,geo} of structures)addMesh(geo,category.id,category);
 for(const part of building.parts){
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(part.positions.map(v=>v*building.coordinateScale),3));geo.setIndex(part.indices);addMesh(geo,part.category,part);
 }
 const categoryControls=document.querySelector('#category-controls');
 for(const category of meta.categories){
  const label=document.createElement('label');label.className='category';const input=document.createElement('input');input.type='checkbox';input.checked=true;input.dataset.category=category.id;input.setAttribute('aria-label','Show '+category.label);
  const swatch=document.createElement('span');swatch.className='swatch';swatch.style.background=category.color;swatch.setAttribute('aria-hidden','true');label.append(input,swatch,document.createTextNode(category.label));
  input.addEventListener('change',()=>{memberGroups.get(category.id).visible=input.checked;render()});categoryControls.append(label);
 }
 document.querySelector('#show-all').addEventListener('click',()=>setVisibility());document.querySelector('#structure-only').addEventListener('click',()=>setVisibility(true));
 renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();contextLost=true;status.textContent='Restoring model…'});
 renderer.domElement.addEventListener('webglcontextrestored',()=>{contextLost=false;status.textContent='';repaint()});
 const grid=new THREE.GridHelper(14,28,0xd6d6cd,0xe6e6df);grid.position.y=-height/2-.025;scene.add(grid);ready=true;status.textContent='';resize();view('iso');new ResizeObserver(resize).observe(stage);repaint();
 viewButtons.forEach(b=>b.addEventListener('click',()=>view(b.dataset.view)));document.querySelector('#slice').addEventListener('input',slice);document.querySelector('#xray').addEventListener('click',()=>xray(!xrayEnabled));
 document.querySelector('#reset').addEventListener('click',()=>{document.querySelector('#slice').value=100;slice();xray(false);setVisibility();view('iso')});
 renderer.domElement.addEventListener('keydown',e=>{
  const step=.12;
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){const offset=camera.position.clone().sub(controls.target);offset.applyAxisAngle(new THREE.Vector3(0,1,0),e.key==='ArrowLeft'?step:-step);camera.position.copy(controls.target).add(offset)}
  else if(e.key==='+'||e.key==='=')camera.zoom=Math.min(12,camera.zoom*1.15);else if(e.key==='-')camera.zoom=Math.max(.4,camera.zoom/1.15);else return;
  e.preventDefault();camera.updateProjectionMatrix();controls.update();render();
 });
}catch(error){console.error('Building viewer:',error);status.textContent='';document.querySelector('#error').style.display='block';document.querySelector('.bottom').hidden=true;document.querySelectorAll('button:not(#retry)').forEach(b=>b.disabled=true)}
