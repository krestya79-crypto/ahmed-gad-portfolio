import { gsap } from 'gsap';
import './floating-badge.css';

export function createFloatingBadge(stage) {
  const hanger=stage.querySelector('.hanger');
  const motion=document.createElement('div');motion.className='badge-motion';
  // Keep every physical part in one coordinate system, including pointer response.
  motion.append(...hanger.childNodes);hanger.append(motion);
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
    const shine=gsap.quickSetter(motion.querySelector('.card-shine'),'opacity');
    const state={x:0,y:0,rx:0,ry:0,rz:0},velocity={...state};
    let elapsed=0,lastTime=0,inView=true,running=false;
    let pointerX=0,pointerY=0;
    function tick(time) {
      const delta=lastTime?Math.min(time-lastTime,1/30):1/60;lastTime=time;elapsed+=delta;
      const t=elapsed;
      // Different slow frequencies avoid an obvious loop or a reset at an endpoint.
      const target={
        x:1.2*Math.sin(t*.43)+.3*Math.sin(t*.91),
        y:1.5*Math.sin(t*.57)+.35*Math.sin(t*.97),
        rx:.85*Math.sin(t*.47)+.23*Math.sin(t*.83)+pointerY,
        ry:1.35*Math.sin(t*.39)+.38*Math.sin(t*.73)+pointerX,
        rz:1.15*Math.sin(t*.59)+.32*Math.sin(t*.89),
      };
      for(const axis of Object.keys(state)){
        velocity[axis]+=(18*(target[axis]-state[axis])-8.5*velocity[axis])*delta;
        state[axis]+=velocity[axis]*delta;
      }
      motion.style.transform=`translate3d(${state.x.toFixed(3)}px,${state.y.toFixed(3)}px,0) rotateZ(${state.rz.toFixed(3)}deg) rotateY(${state.ry.toFixed(3)}deg) rotateX(${state.rx.toFixed(3)}deg)`;
      motion.style.setProperty('--badge-shadow-x',`${(-state.ry*.8).toFixed(2)}px`);
      motion.style.setProperty('--badge-shadow-opacity',(.35+state.rx*.025).toFixed(3));
      shine(.9+state.ry*.025);
    }
    function updateActivity(){
      const active=inView&&!document.hidden;
      if(active&&!running){lastTime=0;gsap.ticker.add(tick);running=true;}
      if(!active&&running){gsap.ticker.remove(tick);running=false;}
    }
    function move(event){
      if(event.pointerType==='touch')return;
      const rect=stage.getBoundingClientRect();
      pointerX=gsap.utils.clamp(-1,1,(event.clientX-rect.left-rect.width/2)/(rect.width/2))*1.8;
      pointerY=gsap.utils.clamp(-1,1,-(event.clientY-rect.top-rect.height/2)/(rect.height/2))*.9;
    }
    function leave(){pointerX=0;pointerY=0;}
    const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;updateActivity();},{rootMargin:'80px'});
    observer.observe(stage);stage.addEventListener('pointermove',move);stage.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',updateActivity);updateActivity();
    return ()=>{
      gsap.ticker.remove(tick);observer.disconnect();
      stage.removeEventListener('pointermove',move);stage.removeEventListener('pointerleave',leave);
      document.removeEventListener('visibilitychange',updateActivity);
      motion.style.removeProperty('transform');motion.style.removeProperty('--badge-shadow-x');motion.style.removeProperty('--badge-shadow-opacity');
      motion.querySelector('.card-shine').style.removeProperty('opacity');
    };
  });
  return {dispose(){media.revert();}};
}
