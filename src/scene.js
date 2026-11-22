import * as THREE from 'three';

export function createScene(container, reduced) {
  let renderer;
  try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{return null;}
  container.querySelector('.scene-fallback').hidden=true;
  container.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
  const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(40,1,.1,100);camera.position.z=6.4;
  const group=new THREE.Group();scene.add(group);
  const positions=[];const points=[];
  for(let i=0;i<85;i++){const phi=Math.acos(1-2*(i+.5)/85),theta=Math.PI*(1+Math.sqrt(5))*i;const p=new THREE.Vector3(Math.sin(phi)*Math.cos(theta)*1.65,Math.cos(phi)*1.65,Math.sin(phi)*Math.sin(theta)*1.65);points.push(p);positions.push(p.x,p.y,p.z);}
  const dotsGeometry=new THREE.BufferGeometry();dotsGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  const dots=new THREE.Points(dotsGeometry,new THREE.PointsMaterial({color:0x8ffff0,size:.045,transparent:true,opacity:.95}));group.add(dots);
  const lines=[];points.forEach((p,i)=>points.forEach((q,j)=>{if(j>i&&p.distanceTo(q)<.7)lines.push(p.x,p.y,p.z,q.x,q.y,q.z);}));
  const lineGeometry=new THREE.BufferGeometry();lineGeometry.setAttribute('position',new THREE.Float32BufferAttribute(lines,3));group.add(new THREE.LineSegments(lineGeometry,new THREE.LineBasicMaterial({color:0x41a8ae,transparent:true,opacity:.23})));
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.65,1),new THREE.MeshBasicMaterial({color:0x47d5d5,wireframe:true,transparent:true,opacity:.36}));group.add(core);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2,.005,4,100),new THREE.MeshBasicMaterial({color:0x35838e,transparent:true,opacity:.4}));ring.rotation.x=1.2;group.add(ring);
  let targetX=0,targetY=0,paused=reduced,visible=false,frame=0,last=0,disposed=false;
  const resize=()=>{const w=container.clientWidth,h=container.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.render(scene,camera);};
  const ro=new ResizeObserver(resize);ro.observe(container);
  const move=e=>{const r=container.getBoundingClientRect();targetY=((e.clientX-r.left)/r.width-.5)*.6;targetX=((e.clientY-r.top)/r.height-.5)*.4;if(paused){group.rotation.set(targetX,targetY,0);renderer.render(scene,camera);}};container.addEventListener('pointermove',move);
  function tick(t){if(disposed)return;frame=requestAnimationFrame(tick);if(!visible||document.hidden||paused||t-last<32)return;const delta=Math.min((t-last)/1000,.05);last=t;group.rotation.y+=delta*.12;group.rotation.x+=(targetX-group.rotation.x)*.025;core.rotation.y-=delta*.23;ring.rotation.z+=delta*.05;camera.position.x+=(targetY-camera.position.x)*.04;renderer.render(scene,camera);}
  const io=new IntersectionObserver(e=>{visible=e[0].isIntersecting;});io.observe(container);resize();frame=requestAnimationFrame(tick);
  return {setPaused(v){paused=v||reduced;},dispose(){disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();container.removeEventListener('pointermove',move);scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});renderer.dispose();}};
}
