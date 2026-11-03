import * as THREE from './three.module.js';
const area=points=>points.reduce((sum,p,i)=>{const q=points[(i+1)%points.length];return sum+p.x*q.y-q.x*p.y},0)/2;
function contains(ring,p){let inside=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)inside=!inside}return inside}
function cleanRing(points,epsilon){
 let ring=points;for(let pass=0;pass<3;pass++){const next=[];for(let i=0;i<ring.length;i++){const a=ring[(i+ring.length-1)%ring.length],b=ring[i],c=ring[(i+1)%ring.length],ab=Math.hypot(b.x-a.x,b.y-a.y),bc=Math.hypot(c.x-b.x,c.y-b.y);if(ab<epsilon||bc<epsilon)continue;if(Math.abs((b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x))<epsilon*(ab+bc))continue;next.push(b)}if(next.length===ring.length||next.length<3)break;ring=next}return ring;
}
export function prepareSectionGeometry(geometry,epsilon=1e-6,solidSize=0){
 const positions=geometry.attributes.position.array,index=geometry.index?.array,count=(index?.length??positions.length/3)/3,lookup=new Map(),vertexIds=new Uint32Array(positions.length/3),vertices=[];
 for(let i=0;i<positions.length;i+=3){const key=Math.round(positions[i]/epsilon)+','+Math.round(positions[i+1]/epsilon)+','+Math.round(positions[i+2]/epsilon);let id=lookup.get(key);if(id===undefined){id=vertices.length/3;lookup.set(key,id);vertices.push(positions[i],positions[i+1],positions[i+2])}vertexIds[i/3]=id}
 const triangles=new Uint32Array(count*3),parents=new Uint32Array(count),edgeOwners=new Map(),low=new Float32Array(count),high=new Float32Array(count);for(let i=0;i<count;i++)parents[i]=i;
 const root=i=>{while(parents[i]!==i){parents[i]=parents[parents[i]];i=parents[i]}return i};
 for(let t=0;t<count;t++){
  for(let j=0;j<3;j++)triangles[t*3+j]=vertexIds[index?index[t*3+j]:t*3+j];
  low[t]=Math.min(...[0,1,2].map(j=>vertices[triangles[t*3+j]*3+1]));high[t]=Math.max(...[0,1,2].map(j=>vertices[triangles[t*3+j]*3+1]));
  for(let j=0;j<3;j++){const a=triangles[t*3+j],b=triangles[t*3+(j+1)%3],key=a<b?a+':'+b:b+':'+a;if(!edgeOwners.has(key))edgeOwners.set(key,[]);edgeOwners.get(key).push(t)}
 }
 for(const owners of edgeOwners.values())for(let i=1;i<owners.length;i++)parents[root(owners[i])]=root(owners[0]);
 const groups=new Map();for(let t=0;t<count;t++){const id=solidSize?Math.floor(t/solidSize):root(t);if(!groups.has(id))groups.set(id,[]);groups.get(id).push(t)}
 return {vertices:new Float32Array(vertices),triangles,low,high,groups:[...groups.values()]};
}
export function sectionTriangles(data,height,epsilon=1e-5){
 const vertices=data.vertices,output=[],stats={components:0,contours:0,holes:0,openChains:0,ignoredSpurs:0,triangles:0};
 for(const component of data.groups){
  const points=[],pointIds=new Map(),segments=new Map();
  const pointId=(x,z)=>{
   const gx=Math.floor(x/epsilon),gz=Math.floor(z/epsilon);
   // Adjacent buckets avoid splitting identical intersections at a rounding boundary.
   for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)for(const id of pointIds.get((gx+dx)+','+(gz+dz))??[])if(Math.hypot(points[id].x-x,points[id].y-z)<=epsilon)return id;
   const id=points.length,key=gx+','+gz;points.push(new THREE.Vector2(x,z));if(!pointIds.has(key))pointIds.set(key,[]);pointIds.get(key).push(id);return id;
  };
  for(const t of component){
   if(data.low[t]>=height||data.high[t]<=height)continue;
   const ids=[data.triangles[t*3]*3,data.triangles[t*3+1]*3,data.triangles[t*3+2]*3],cut=[];
   for(let j=0;j<3;j++){const a=ids[j],b=ids[(j+1)%3],da=vertices[a+1]-height,db=vertices[b+1]-height;if((da>0)===(db>0))continue;const ratio=da/(da-db),id=pointId(vertices[a]+ratio*(vertices[b]-vertices[a]),vertices[a+2]+ratio*(vertices[b+2]-vertices[a+2]));if(!cut.includes(id))cut.push(id)}
   if(cut.length!==2||cut[0]===cut[1])continue;
   const a=ids[0],b=ids[1],c=ids[2],ux=vertices[b]-vertices[a],uy=vertices[b+1]-vertices[a+1],uz=vertices[b+2]-vertices[a+2],vx=vertices[c]-vertices[a],vy=vertices[c+1]-vertices[a+1],vz=vertices[c+2]-vertices[a+2],nx=uy*vz-uz*vy,nz=ux*vy-uy*vx;
   let first=cut[0],last=cut[1];if((points[last].x-points[first].x)*(-nz)+(points[last].y-points[first].y)*nx<0)[first,last]=[last,first];
   const key=first<last?first+':'+last:last+':'+first,sign=first<last?1:-1,previous=segments.get(key);if(previous)previous.balance+=sign;else segments.set(key,{a:Math.min(first,last),b:Math.max(first,last),balance:sign});
  }
  const edges=[...segments.values()].filter(e=>e.balance!==0);if(!edges.length)continue;stats.components++;
  const neighbours=Array.from({length:points.length},()=>[]);edges.forEach((e,i)=>{neighbours[e.a].push(i);neighbours[e.b].push(i)});const used=new Uint8Array(edges.length),rings=[];
  // A few original CAD faces leave a dangling segment inside a member. They
  // enclose no material, so remove these spurs before following closed contours.
  const degree=neighbours.map(n=>n.length),leaves=degree.flatMap((n,i)=>n===1?[i]:[]);
  while(leaves.length){const point=leaves.pop();for(const i of neighbours[point]){if(used[i])continue;used[i]=1;stats.ignoredSpurs++;const other=edges[i].a===point?edges[i].b:edges[i].a;if(--degree[other]===1)leaves.push(other)}}
  for(let initial=0;initial<edges.length;initial++){
   if(used[initial])continue;const edge=edges[initial],start=edge.a;let previous=edge.a,current=edge.b;used[initial]=1;const ids=[start];let closed=false;
   for(let step=0;step<=edges.length;step++){
    if(current===start){closed=true;break}ids.push(current);const choices=neighbours[current].filter(i=>!used[i]);if(!choices.length)break;
    let selected=choices[0];if(choices.length>1){const incoming=points[current].clone().sub(points[previous]).normalize();let best=-Infinity;for(const candidate of choices){const e=edges[candidate],next=e.a===current?e.b:e.a,direction=points[next].clone().sub(points[current]).normalize(),score=incoming.dot(direction);if(score>best){best=score;selected=candidate}}}
    used[selected]=1;const next=edges[selected].a===current?edges[selected].b:edges[selected].a;previous=current;current=next;
   }
   if(!closed){stats.openChains++;continue}const ring=cleanRing(ids.map(i=>points[i]),epsilon);if(ring.length>=3&&Math.abs(area(ring))>epsilon*epsilon*10)rings.push({points:ring,area:Math.abs(area(ring)),parent:-1,depth:0});
  }
  rings.sort((a,b)=>b.area-a.area);
  for(let i=0;i<rings.length;i++){let parent=-1;for(let j=0;j<i;j++)if(rings[i].points.every(p=>contains(rings[j].points,p))&&(parent<0||rings[j].area<rings[parent].area))parent=j;rings[i].parent=parent;rings[i].depth=parent<0?0:rings[parent].depth+1}
  stats.contours+=rings.length;stats.holes+=rings.filter(r=>r.depth%2).length;
  for(let i=0;i<rings.length;i++){
   if(rings[i].depth%2)continue;
   const contour=[...rings[i].points],holes=rings.filter(r=>r.parent===i&&r.depth%2).map(r=>[...r.points]);if(area(contour)>0)contour.reverse();for(const hole of holes)if(area(hole)<0)hole.reverse();
   const all=[...contour,...holes.flat()],faces=THREE.ShapeUtils.triangulateShape(contour,holes);
   for(const face of faces){const [a,b,c]=face.map(i=>all[i]);if((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x)>0)output.push(a.x,height,a.y,c.x,height,c.y,b.x,height,b.y);else output.push(a.x,height,a.y,b.x,height,b.y,c.x,height,c.y)}
  }
 }
 stats.triangles=output.length/9;return {positions:new Float32Array(output),stats};
}
export class SectionCaps {
 constructor({color='#484a47',epsilon=1e-5}={}){this.entries=[];this.epsilon=epsilon;this.material=new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide});this.lastHeight=null;this.stats=[]}
 register(source,group,solidSize=0){this.entries.push({source,group,solidSize,data:null,cap:null})}
 update(height,enabled=true){
  if(!enabled){for(const entry of this.entries)if(entry.cap)entry.cap.visible=false;this.lastHeight=null;return}
  const level=height-this.epsilon;if(this.lastHeight===level)return;this.lastHeight=level;this.stats=[];
  for(const entry of this.entries){
   entry.data??=prepareSectionGeometry(entry.source.geometry,1e-6,entry.solidSize);const section=sectionTriangles(entry.data,level,this.epsilon);this.stats.push({...section.stats,category:entry.group.name});
   const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(section.positions,3));
   if(!entry.cap){entry.cap=new THREE.Mesh(geometry,this.material);entry.cap.name='Dark-grey cut face';entry.cap.userData.sectionCap=true;entry.cap.userData.flatColor=true;entry.cap.userData.opacity=1;entry.group.add(entry.cap)}else{entry.cap.geometry.dispose();entry.cap.geometry=geometry}
   entry.cap.visible=section.positions.length>0;
  }
 }
}
