import * as THREE from 'three';
import {OrbitControls} from './OrbitControls.js';
import {CanvasModelRenderer} from './CanvasModelRenderer-v18.js';
import {SectionCaps} from './SectionCaps-v18.js';
const stage=document.querySelector('#stage'),status=document.querySelector('#status');
let renderer,controls,camera,scene,plane,sectionCaps,height=1,modelScale=1,modelMin=0,ready=false;
const memberGroups=new Map();let framingPoints=[],xrayEnabled=false,layoutWidth=0,layoutHeight=0;
function fitView(){
 camera.updateMatrixWorld();const matrix=camera.matrixWorldInverse,e=matrix.elements;let x0=Infinity,x1=-Infinity,y0=Infinity,y1=-Infinity;
 for(const p of framingPoints){const x=e[0]*p.x+e[4]*p.y+e[8]*p.z+e[12],y=e[1]*p.x+e[5]*p.y+e[9]*p.z+e[13];x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}
 if(!Number.isFinite(x0))return;const shift=new THREE.Vector3((x0+x1)/2,(y0+y1)/2,0).applyQuaternion(camera.quaternion);camera.position.add(shift);controls.target.add(shift);camera.zoom=.9*Math.min((camera.right-camera.left)/(x1-x0),(camera.top-camera.bottom)/(y1-y0));camera.updateProjectionMatrix();controls.update();
}
const viewButtons=[...document.querySelectorAll('[data-view]')];
function render(){if(ready)renderer.render(scene,camera)}
function repaint(){if(ready)requestAnimationFrame(()=>{resize();render()})}
window.addEventListener('pageshow',repaint);window.addEventListener('focus',repaint);document.addEventListener('visibilitychange',()=>{if(!document.hidden)repaint()});
document.querySelector('#retry').addEventListener('click',()=>{const u=new URL(location.href);u.searchParams.set('reload',Date.now());location.replace(u.href)});
async function request(url,type='json'){
 let failure;for(let attempt=0;attempt<2;attempt++){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);try{const response=await fetch(url,{cache:attempt?'reload':'default',signal:controller.signal});if(!response.ok)throw Error('Could not load '+url);return type==='json'?await response.json():await response.arrayBuffer()}catch(error){failure=error;if(!attempt)await new Promise(resolve=>setTimeout(resolve,350))}finally{clearTimeout(timeout)}}throw failure;
}
function view(name){
 if(!ready)return;
 camera.up.set(0,1,0);
 const positions={iso:[8,6,16],top:[0,20,.001],front:[0,0,20]};
 camera.position.set(...positions[name]);controls.target.set(0,0,0);camera.zoom=1;
 camera.updateProjectionMatrix();controls.update();fitView();
 viewButtons.forEach(b=>{b.classList.toggle('active',b.dataset.view===name);b.setAttribute('aria-pressed',String(b.dataset.view===name))});render();
}
function resize(){
 if(!renderer)return;
 const w=stage.clientWidth,h=stage.clientHeight;if(w<1||h<1)return;const changed=w!==layoutWidth||h!==layoutHeight;layoutWidth=w;layoutHeight=h;renderer.setSize(w,h);const aspect=w/h,span=4;
 camera.left=-span*aspect;camera.right=span*aspect;camera.top=span;camera.bottom=-span;
 if(aspect<1){camera.left=-6;camera.right=6;camera.top=6/aspect;camera.bottom=-6/aspect}
 camera.updateProjectionMatrix();if(changed&&ready)fitView();render();
}
function slice(){
 if(!ready)return;
 const value=Number(document.querySelector('#slice').value);plane.constant=-height/2+height*value/100+.005;
 const metres=modelMin+height*value/(100*modelScale),label=value===100?'Full model':`${metres>=0?'+':''}${metres.toFixed(1)} m`;
 document.querySelector('#level').textContent=label;document.querySelector('#slice').setAttribute('aria-valuetext',label);sectionCaps.update(plane.constant,value<100);render();
}
function xray(on){
 xrayEnabled=on;
 for(const group of memberGroups.values())group.traverse(obj=>{
  if(!obj.isMesh||obj.userData.sectionCap)return;
  const mat=obj.material,base=obj.userData.opacity;
  mat.opacity=on?Math.min(base,.18):base;mat.transparent=mat.opacity<1;mat.depthWrite=mat.opacity===1;mat.needsUpdate=true;
 });
 document.querySelector('#xray').classList.toggle('active',on);document.querySelector('#xray').setAttribute('aria-pressed',String(on));render();
}
function setVisibility(){
 for(const group of memberGroups.values())group.visible=true;
 document.querySelectorAll('.category input').forEach(input=>input.checked=memberGroups.get(input.dataset.category).visible);render();
}
try{
 status.textContent='Loading model…';
 const meta=await request('./viikki-structure-v3.json');
 const source=await request('./'+meta.geometry,'arrayBuffer');
 const count=meta.categories.reduce((sum,category)=>sum+category.triangles,0);
 if(source.byteLength!==count*36)throw Error('Unexpected mesh size');
 let offset=0;
 const structures=meta.categories.map(category=>{const length=category.triangles*9,geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(source,offset,length),3));offset+=length*4;return {category,geo}});
 renderer=new CanvasModelRenderer();
 stage.appendChild(renderer.domElement);function labelCanvas(){renderer.domElement.setAttribute('aria-label','Viikki Building B construction model. Toggle elements, or drag to rotate.');renderer.domElement.setAttribute('tabindex','0')}labelCanvas();document.querySelector('#viewer').dataset.renderer=renderer.software?'canvas':'webgl';
 scene=new THREE.Scene();sectionCaps=new SectionCaps();camera=new THREE.OrthographicCamera(-10,10,7,-7,.01,200);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=false;controls.minZoom=.4;controls.maxZoom=12;controls.addEventListener('change',render);
 const scale=10/Math.max(...meta.size);modelScale=scale;modelMin=meta.bounds[0][1];height=meta.size[1]*scale;plane=new THREE.Plane(new THREE.Vector3(0,-1,0),height/2+.005);
 for(const category of meta.categories){const group=new THREE.Group();group.name=category.label;scene.add(group);memberGroups.set(category.id,group)}
 function addMesh(geo,category,settings){
  geo.translate(-meta.center[0],-meta.center[1],-meta.center[2]);geo.scale(scale,scale,scale);
  const opacity=settings.opacity??1;
  const mat=new THREE.MeshBasicMaterial({color:settings.color,transparent:opacity<1,opacity,clippingPlanes:[plane]});
  const mesh=new THREE.Mesh(geo,mat);mesh.name=settings.name??category;mesh.userData.opacity=opacity;mesh.userData.cutFaces=settings.cutFaces;memberGroups.get(category).add(mesh);
  sectionCaps.register(mesh,memberGroups.get(category));
  const edges=new THREE.LineSegments(new THREE.EdgesGeometry(geo,25),new THREE.LineBasicMaterial({color:0x756d5e,transparent:true,opacity:.28,clippingPlanes:[plane]}));memberGroups.get(category).add(edges);

 }
 for(const {category,geo} of structures)addMesh(geo,category.id,category);
 // A low display plinth follows the proportions of the long building.
 const base=meta.base,baseGeo=new THREE.BoxGeometry(base.width*scale,base.thickness*scale,base.depth*scale);
 baseGeo.translate(0,(base.top-meta.center[1]-base.thickness/2)*scale,0);
 const plinth=new THREE.Mesh(baseGeo,new THREE.MeshBasicMaterial({color:base.color}));plinth.name='Display plinth';scene.add(plinth);
 const bbox=new THREE.Box3().setFromObject(scene);
 for(const x of [bbox.min.x,bbox.max.x])for(const y of [bbox.min.y,bbox.max.y])for(const z of [bbox.min.z,bbox.max.z])framingPoints.push(new THREE.Vector3(x,y,z));
 const categoryControls=document.querySelector('#category-controls');
 for(const category of meta.categories){
  const label=document.createElement('label');label.className='category';const input=document.createElement('input');input.type='checkbox';input.checked=true;input.dataset.category=category.id;input.setAttribute('aria-label','Show '+category.label);
  const swatch=document.createElement('span');swatch.className='swatch';swatch.style.background=category.color;swatch.setAttribute('aria-hidden','true');label.append(input,swatch,document.createTextNode(category.label));
  input.addEventListener('change',()=>{memberGroups.get(category.id).visible=input.checked;render()});categoryControls.append(label);
 }
 document.querySelector('#show-all').addEventListener('click',()=>setVisibility());
 ready=true;status.textContent='';resize();view('iso');slice();new ResizeObserver(resize).observe(stage);repaint();
 viewButtons.forEach(b=>b.addEventListener('click',()=>view(b.dataset.view)));document.querySelector('#slice').addEventListener('input',slice);document.querySelector('#xray').addEventListener('click',()=>xray(!xrayEnabled));
 document.querySelector('#reset').addEventListener('click',()=>{document.querySelector('#slice').value=100;slice();xray(false);setVisibility();view('iso')});
 function bindKeyboard(){renderer.domElement.addEventListener('keydown',e=>{
  const step=.12;
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){const offset=camera.position.clone().sub(controls.target);offset.applyAxisAngle(new THREE.Vector3(0,1,0),e.key==='ArrowLeft'?step:-step);camera.position.copy(controls.target).add(offset)}
  else if(e.key==='+'||e.key==='=')camera.zoom=Math.min(12,camera.zoom*1.15);else if(e.key==='-')camera.zoom=Math.max(.4,camera.zoom/1.15);else return;
  e.preventDefault();camera.updateProjectionMatrix();controls.update();render();
 })}bindKeyboard();
}catch(error){console.error('Viikki construction viewer:',error);status.textContent='';document.querySelector('#error').style.display='block';document.querySelector('.bottom').hidden=true;document.querySelectorAll('button:not(#retry)').forEach(b=>b.disabled=true)}
