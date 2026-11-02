import * as THREE from 'three';
// An on-demand CPU renderer keeps the model usable if a device loses WebGL.
export class CanvasModelRenderer {
 constructor(){this.domElement=document.createElement('canvas');this.context=this.domElement.getContext('2d',{alpha:false,willReadFrequently:true});this.width=1;this.height=1;this.cache=new WeakMap();this.software=true;this.pending=0}
 setSize(w,h){if(w===this.cssWidth&&h===this.cssHeight)return;this.cssWidth=w;this.cssHeight=h;const scale=Math.min(1.25,1600/w,Math.sqrt(1500000/(w*h)));this.width=this.domElement.width=Math.max(1,Math.round(w*scale));this.height=this.domElement.height=Math.max(1,Math.round(h*scale))}
 dispose(){cancelAnimationFrame(this.pending)}
 render(scene,camera){
  cancelAnimationFrame(this.pending);this.pending=requestAnimationFrame(()=>this.draw(scene,camera));
 }
 draw(scene,camera){
  const ctx=this.context,w=this.width,h=this.height;ctx.fillStyle='#f6f6f3';ctx.fillRect(0,0,w,h);camera.updateMatrixWorld();const matrix=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse),e=matrix.elements;
  const project=(x,y,z)=>[(e[0]*x+e[4]*y+e[8]*z+e[12])*.5*w+w*.5,(-e[1]*x-e[5]*y-e[9]*z-e[13])*.5*h+h*.5,e[2]*x+e[6]*y+e[10]*z+e[14]];
  const faces=[];
  scene.traverseVisible(mesh=>{
   if(!mesh.isMesh)return;const geo=mesh.geometry,mat=mesh.material,a=geo.attributes.position.array;let cached=this.cache.get(mesh);
   if(!cached){
    const rgb=new THREE.Color(mat.color).convertLinearToSRGB();cached=[];
    for(let i=0;i<a.length;i+=9){
     const ax=a[i+3]-a[i],ay=a[i+4]-a[i+1],az=a[i+5]-a[i+2],bx=a[i+6]-a[i],by=a[i+7]-a[i+1],bz=a[i+8]-a[i+2];let nx=ay*bz-az*by,ny=az*bx-ax*bz,nz=ax*by-ay*bx;const len=Math.hypot(nx,ny,nz);if(len<1e-12){cached.push(null);continue}nx/=len;ny/=len;nz/=len;
     const light=.73+.27*Math.abs(nx*.36+ny*.8+nz*.48);cached.push([Math.round(rgb.r*255*light),Math.round(rgb.g*255*light),Math.round(rgb.b*255*light)]);
    }this.cache.set(mesh,cached);
   }
   const limit=mat.clippingPlanes?.[0]?.constant??Infinity;
   for(let i=0;i<a.length;i+=9){
    if(!cached[i/9])continue;let v=[[a[i],a[i+1],a[i+2]],[a[i+3],a[i+4],a[i+5]],[a[i+6],a[i+7],a[i+8]]];
    if(v.some(p=>p[1]>limit)){
     const clipped=[];for(let j=0;j<v.length;j++){const p=v[j],q=v[(j+1)%v.length],ip=p[1]<=limit,iq=q[1]<=limit;if(ip)clipped.push(p);if(ip!==iq){const t=(limit-p[1])/(q[1]-p[1]);clipped.push([p[0]+t*(q[0]-p[0]),limit,p[2]+t*(q[2]-p[2])])}}v=clipped;if(v.length<3)continue;
    }
    const p=v.map(v=>project(...v));const area=Math.abs((p[1][0]-p[0][0])*(p[2][1]-p[0][1])-(p[1][1]-p[0][1])*(p[2][0]-p[0][0]));if(area<.12)continue;
    faces.push({p,depth:p.reduce((s,p)=>s+p[2],0)/p.length,color:cached[i/9],opacity:mat.opacity});
   }
  });
  // Per-pixel depth testing avoids painter-order artifacts at crossing roof planes.
  const pixels=ctx.createImageData(w,h),data=pixels.data,depth=new Float32Array(w*h);depth.fill(Infinity);
  for(let i=0;i<data.length;i+=4){data[i]=data[i+1]=246;data[i+2]=243;data[i+3]=255}
  function raster(p0,p1,p2,color,opacity){
   const x0=p0[0],y0=p0[1],x1=p1[0],y1=p1[1],x2=p2[0],y2=p2[1];
   const denom=(y1-y2)*(x0-x2)+(x2-x1)*(y0-y2);if(Math.abs(denom)<.01)return;
   const inv=1/denom,minX=Math.max(0,Math.floor(Math.min(x0,x1,x2))),maxX=Math.min(w-1,Math.ceil(Math.max(x0,x1,x2))),minY=Math.max(0,Math.floor(Math.min(y0,y1,y2))),maxY=Math.min(h-1,Math.ceil(Math.max(y0,y1,y2)));
   const da=(y1-y2)*inv,db=(y2-y0)*inv;
   for(let y=minY;y<=maxY;y++){
    let a=((y1-y2)*(minX+.5-x2)+(x2-x1)*(y+.5-y2))*inv,b=((y2-y0)*(minX+.5-x2)+(x0-x2)*(y+.5-y2))*inv;
    for(let x=minX;x<=maxX;x++,a+=da,b+=db){const c=1-a-b;if(a<-.00001||b<-.00001||c<-.00001)continue;const z=a*p0[2]+b*p1[2]+c*p2[2],i=y*w+x;if(z>=depth[i]+1e-7)continue;const k=i*4;
     if(opacity===1){depth[i]=z;data[k]=color[0];data[k+1]=color[1];data[k+2]=color[2]}
     else {data[k]=data[k]*(1-opacity)+color[0]*opacity;data[k+1]=data[k+1]*(1-opacity)+color[1]*opacity;data[k+2]=data[k+2]*(1-opacity)+color[2]*opacity}
    }
   }
  }
  for(const f of faces)if(f.opacity===1)for(let j=1;j<f.p.length-1;j++)raster(f.p[0],f.p[j],f.p[j+1],f.color,1);
  const transparent=faces.filter(f=>f.opacity<1).sort((a,b)=>b.depth-a.depth);for(const f of transparent)for(let j=1;j<f.p.length-1;j++)raster(f.p[0],f.p[j],f.p[j+1],f.color,f.opacity);
  ctx.putImageData(pixels,0,0);
 }
}
