import * as THREE from 'three';
// CPU-only rasterisation. Static vertices, colours and frame buffers are reused;
// movement uses a smaller image, followed by a full-quality frame when it settles.
export class CanvasModelRenderer {
 constructor(){this.domElement=document.createElement('canvas');this.context=this.domElement.getContext('2d',{alpha:false,willReadFrequently:true});this.software=true;this.cache=new WeakMap();this.pending=0;this.settle=0;this.width=this.height=1;this.cssWidth=this.cssHeight=1;this.scratch=new Float64Array(16);this.screenScratch=new Float64Array(12);this.background=new Uint32Array(new Uint8Array([246,246,243,255]).buffer)[0]}
 setSize(w,h){this.cssWidth=w;this.cssHeight=h}
 dispose(){cancelAnimationFrame(this.pending);clearTimeout(this.settle)}
 render(scene,camera){
  this.scene=scene;this.camera=camera;this.domElement.dataset.quality='pending';clearTimeout(this.settle);
  if(!this.pending)this.pending=requestAnimationFrame(()=>{this.pending=0;this.draw(this.scene,this.camera,true)});
  this.settle=setTimeout(()=>{cancelAnimationFrame(this.pending);this.pending=0;this.draw(this.scene,this.camera,false)},140);
 }
 prepare(mesh){
  let c=this.cache.get(mesh);if(c)return c;
  const geo=mesh.geometry,a=geo.attributes.position.array,original=geo.index?.array;let vertices,indices;
  if(original){vertices=a;indices=original}
  else {const lookup=new Map(),v=[],ix=new Uint32Array(a.length/3);for(let i=0;i<a.length;i+=3){const key=a[i]+','+a[i+1]+','+a[i+2];let id=lookup.get(key);if(id===undefined){id=v.length/3;lookup.set(key,id);v.push(a[i],a[i+1],a[i+2])}ix[i/3]=id}vertices=new Float32Array(v);indices=ix}
  const rgb=new THREE.Color(mesh.material.color).convertLinearToSRGB(),colours=new Uint8Array(indices.length),faces=[];
  const cut=mesh.userData.cutFaces,cutSet=cut?new Set(cut.indices):null,cutRgb=cut?new THREE.Color(cut.color).convertLinearToSRGB():rgb;
  for(let t=0;t<indices.length;t+=3){const faceRgb=cutSet?.has(t/3)?cutRgb:rgb;const p=indices[t]*3,q=indices[t+1]*3,r=indices[t+2]*3,ax=vertices[q]-vertices[p],ay=vertices[q+1]-vertices[p+1],az=vertices[q+2]-vertices[p+2],bx=vertices[r]-vertices[p],by=vertices[r+1]-vertices[p+1],bz=vertices[r+2]-vertices[p+2];let nx=ay*bz-az*by,ny=az*bx-ax*bz,nz=ax*by-ay*bx;const len=Math.hypot(nx,ny,nz);const light=len? .73+.27*Math.abs((nx*.36+ny*.8+nz*.48)/len):1;colours[t]=Math.round(faceRgb.r*255*light);colours[t+1]=Math.round(faceRgb.g*255*light);colours[t+2]=Math.round(faceRgb.b*255*light);faces.push({cache:null,t,depth:0})}
  c={mesh,vertices,indices,colours,screen:new Float32Array(vertices.length),faces,cullBackfaces:mesh.userData.cullBackfaces===true};for(const f of faces)f.cache=c;this.cache.set(mesh,c);return c;
 }
 draw(scene,camera,draft=false){
  const began=performance.now(),cw=this.cssWidth,ch=this.cssHeight;if(cw<1||ch<1)return;
  const scale=draft?Math.min(.6,800/cw,Math.sqrt(220000/(cw*ch))):Math.min(1.1,1500/cw,Math.sqrt(1000000/(cw*ch))),w=Math.max(1,Math.round(cw*scale)),h=Math.max(1,Math.round(ch*scale));
  if(w!==this.width||h!==this.height){this.width=this.domElement.width=w;this.height=this.domElement.height=h;this.pixels=this.context.createImageData(w,h);this.words=new Uint32Array(this.pixels.data.buffer);this.depth=new Float32Array(w*h)}
  this.words.fill(this.background);this.depth.fill(Infinity);const depth=this.depth,data=this.pixels.data;
  camera.updateMatrixWorld();const e=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).elements,caches=[],transparent=[],discs=[];
  scene.traverseVisible(mesh=>{if(!mesh.isMesh)return;if(mesh.userData.disc){discs.push(mesh);return}const c=this.prepare(mesh),v=c.vertices,p=c.screen;for(let i=0;i<v.length;i+=3){const x=v[i],y=v[i+1],z=v[i+2];p[i]=(e[0]*x+e[4]*y+e[8]*z+e[12])*.5*w+w*.5;p[i+1]=(-e[1]*x-e[5]*y-e[9]*z-e[13])*.5*h+h*.5;p[i+2]=e[2]*x+e[6]*y+e[10]*z+e[14]}caches.push(c)});
  function raster(x0,y0,z0,x1,y1,z1,x2,y2,z2,red,green,blue,opacity){
   const denom=(y1-y2)*(x0-x2)+(x2-x1)*(y0-y2);if(Math.abs(denom)<(draft?.45:.12))return;
   const inv=1/denom,minX=Math.max(0,Math.floor(Math.min(x0,x1,x2))),maxX=Math.min(w-1,Math.ceil(Math.max(x0,x1,x2))),minY=Math.max(0,Math.floor(Math.min(y0,y1,y2))),maxY=Math.min(h-1,Math.ceil(Math.max(y0,y1,y2)));if(minX>maxX||minY>maxY)return;
   const dax=(y1-y2)*inv,dbx=(y2-y0)*inv,day=(x2-x1)*inv,dby=(x0-x2)*inv,za=z0-z2,zb=z1-z2,dz=dax*za+dbx*zb;
   let rowA=((y1-y2)*(minX+.5-x2)+(x2-x1)*(minY+.5-y2))*inv,rowB=((y2-y0)*(minX+.5-x2)+(x0-x2)*(minY+.5-y2))*inv;
   if(opacity===1){
    for(let y=minY;y<=maxY;y++,rowA+=day,rowB+=dby){let a=rowA,b=rowB,z=a*za+b*zb+z2,i=y*w+minX;for(let x=minX;x<=maxX;x++,i++,a+=dax,b+=dbx,z+=dz){if(a<-.00001||b<-.00001||a+b>1.00001||z>=depth[i]+1e-7)continue;depth[i]=z;const k=i*4;data[k]=red;data[k+1]=green;data[k+2]=blue}}
   }else{
    const keep=1-opacity;for(let y=minY;y<=maxY;y++,rowA+=day,rowB+=dby){let a=rowA,b=rowB,z=a*za+b*zb+z2,i=y*w+minX;for(let x=minX;x<=maxX;x++,i++,a+=dax,b+=dbx,z+=dz){if(a<-.00001||b<-.00001||a+b>1.00001||z>=depth[i]+1e-7)continue;const k=i*4;data[k]=data[k]*keep+red*opacity;data[k+1]=data[k+1]*keep+green*opacity;data[k+2]=data[k+2]*keep+blue*opacity}}
   }
  }
  const scratch=this.scratch,out=this.screenScratch;
  function drawFace(c,t,opacity){
   const v=c.vertices,p=c.screen,ix=c.indices,col=c.colours,a=ix[t]*3,b=ix[t+1]*3,d=ix[t+2]*3,limit=c.mesh.material.clippingPlanes?.[0]?.constant??Infinity;
   if(c.cullBackfaces&&((p[b]-p[a])*(p[d+1]-p[a+1])-(p[b+1]-p[a+1])*(p[d]-p[a]))>=0)return;
   const ay=v[a+1],by=v[b+1],dy=v[d+1];if(ay>limit&&by>limit&&dy>limit)return;
   if(ay<=limit&&by<=limit&&dy<=limit){raster(p[a],p[a+1],p[a+2],p[b],p[b+1],p[b+2],p[d],p[d+1],p[d+2],col[t],col[t+1],col[t+2],opacity);return}
   scratch.set([p[a],p[a+1],p[a+2],ay,p[b],p[b+1],p[b+2],by,p[d],p[d+1],p[d+2],dy]);let count=0;
   for(let j=0;j<3;j++){const i=j*4,k=((j+1)%3)*4,inside=scratch[i+3]<=limit,next=scratch[k+3]<=limit;if(inside){out[count*3]=scratch[i];out[count*3+1]=scratch[i+1];out[count*3+2]=scratch[i+2];count++}if(inside!==next){const f=(limit-scratch[i+3])/(scratch[k+3]-scratch[i+3]);for(let axis=0;axis<3;axis++)out[count*3+axis]=scratch[i+axis]+f*(scratch[k+axis]-scratch[i+axis]);count++}}
   for(let j=1;j<count-1;j++)raster(out[0],out[1],out[2],out[j*3],out[j*3+1],out[j*3+2],out[(j+1)*3],out[(j+1)*3+1],out[(j+1)*3+2],col[t],col[t+1],col[t+2],opacity);
  }
  // The presentation base has two true circular caps. Rasterise each visible
  // ellipse directly instead of testing thousands of long cap triangles.
  for(const mesh of discs){
   const disc=mesh.userData.disc;if(disc.normal*camera.matrixWorld.elements[9]<=0)continue;
   const ax=e[0]*.5*w,bx=e[8]*.5*w,ay=-e[1]*.5*h,by=-e[9]*.5*h,det=ax*by-bx*ay;if(Math.abs(det)<1e-10)continue;
   const cx=(e[0]*disc.x+e[4]*disc.y+e[8]*disc.z+e[12])*.5*w+w*.5,cy=(-e[1]*disc.x-e[5]*disc.y-e[9]*disc.z-e[13])*.5*h+h*.5,cz=e[2]*disc.x+e[6]*disc.y+e[10]*disc.z+e[14];
   const rx=disc.radius*Math.hypot(ax,bx),ry=disc.radius*Math.hypot(ay,by),minX=Math.max(0,Math.floor(cx-rx)),maxX=Math.min(w-1,Math.ceil(cx+rx)),minY=Math.max(0,Math.floor(cy-ry)),maxY=Math.min(h-1,Math.ceil(cy+ry)),r2=disc.radius*disc.radius;
   const ux=by/det,uy=-bx/det,vx=-ay/det,vy=ax/det,dz=e[2]*ux+e[10]*vx,rgb=new THREE.Color(mesh.material.color).convertLinearToSRGB(),red=Math.round(rgb.r*255*.946),green=Math.round(rgb.g*255*.946),blue=Math.round(rgb.b*255*.946);
   for(let y=minY;y<=maxY;y++){let u=ux*(minX+.5-cx)+uy*(y+.5-cy),v=vx*(minX+.5-cx)+vy*(y+.5-cy),z=cz+e[2]*u+e[10]*v,i=y*w+minX;for(let x=minX;x<=maxX;x++,i++,u+=ux,v+=vx,z+=dz){if(u*u+v*v>r2||z>=depth[i])continue;depth[i]=z;const k=i*4;data[k]=red;data[k+1]=green;data[k+2]=blue}}
  }
  let triangleCount=0;
  for(const c of caches){const opacity=c.mesh.material.opacity;triangleCount+=c.indices.length/3;if(opacity===1){for(let t=0;t<c.indices.length;t+=3)drawFace(c,t,1)}else{for(const f of c.faces){f.depth=(c.screen[c.indices[f.t]*3+2]+c.screen[c.indices[f.t+1]*3+2]+c.screen[c.indices[f.t+2]*3+2])/3;transparent.push(f)}}}
  transparent.sort((a,b)=>b.depth-a.depth);for(const f of transparent)drawFace(f.cache,f.t,f.cache.mesh.material.opacity);
  this.context.putImageData(this.pixels,0,0);this.domElement.dataset.frameMs=(performance.now()-began).toFixed(1);this.domElement.dataset.quality=draft?'interactive':'full';this.domElement.dataset.triangles=String(triangleCount);
 }
}
