// Adapted from the user-supplied React Bits ParticleText source, with typed
// particles, visibility suspension and static reduced-motion rendering.
import { useEffect, useRef } from 'react'
import './ParticleText.css'

type Particle = {x:number;y:number;tx:number;ty:number;sx:number;sy:number;seed:number;depth:number;color:string;size:number}
const clamp=(n:number)=>Math.max(0,Math.min(1,n))
export default function ParticleText({text='Thank you',color='#F7F0EB',highlightColor='#FF792E'}:{text?:string;color?:string;highlightColor?:string}) {
  const host=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const node=host.current!,surface=canvas.current!,ctx=surface.getContext('2d')
    if(!ctx)return
    const motion=matchMedia('(prefers-reduced-motion:reduce)')
    let reduced=motion.matches,visible=false,disposed=false,build=0,frame=0,resizeFrame=0
    let width=0,height=0,start=0,gathering=false,started=false,pausedAt=0
    let particles:Particle[]=[]
    const pointer={active:false,x:0,y:0,sx:0,sy:0}
    const ensure=()=>{if(!frame&&visible&&!document.hidden&&!disposed&&particles.length)frame=requestAnimationFrame(render)}
    const gather=()=>{
      if(!particles.length)return
      for(const p of particles){
        const angle=p.seed*Math.PI*2,distance=Math.min(120,width*.25)*(.35+p.depth*.75)
        p.x=p.tx+(reduced?0:Math.cos(angle)*distance)
        p.y=p.ty+(reduced?0:Math.sin(angle)*distance)
        p.sx=p.x;p.sy=p.y
      }
      start=performance.now();gathering=!reduced;started=true;ensure()
    }
    function render(now:number){
      frame=0
      if(disposed||!visible||document.hidden)return
      ctx!.clearRect(0,0,width,height)
      ctx!.shadowBlur=reduced?0:4;ctx!.shadowColor=highlightColor
      pointer.sx+=(pointer.x-pointer.sx)*.18;pointer.sy+=(pointer.y-pointer.sy)*.18
      let complete=true
      for(const p of particles){
        let x=p.tx,y=p.ty,progress=1
        if(gathering){
          progress=clamp((now-start-p.seed*420)/1600)
          const ease=1-Math.pow(1-progress,3)
          x=p.sx+(p.tx-p.sx)*ease;y=p.sy+(p.ty-p.sy)*ease
          if(progress<1)complete=false
        }else if(!reduced){x+=Math.sin(now*.0009+p.seed*10)*.35*p.depth;y+=Math.cos(now*.00075+p.depth*10)*.35*p.depth}
        if(pointer.active&&!reduced){
          const dx=x-pointer.sx,dy=y-pointer.sy,d=Math.hypot(dx,dy)
          if(d>0&&d<110){const force=Math.pow(1-d/110,2)*35;x+=dx/d*force;y+=dy/d*force}
        }
        p.x+=(x-p.x)*(reduced?1:.22);p.y+=(y-p.y)*(reduced?1:.22)
        ctx!.globalAlpha=.35+progress*.65;ctx!.fillStyle=p.color
        ctx!.fillRect(p.x-p.size/2,p.y-p.size/2,p.size,p.size)
      }
      ctx!.globalAlpha=1;ctx!.shadowBlur=0
      if(gathering&&complete)gathering=false
      if(!reduced)ensure()
    }
    const sample=async()=>{
      const id=++build,rect=node.getBoundingClientRect(),w=Math.floor(rect.width),h=Math.floor(rect.height)
      if(!w||!h)return
      const family=getComputedStyle(node).fontFamily
      let size=Math.max(48,Math.min(innerWidth*.12,144)),font=`800 ${size}px ${family}`
      try{await document.fonts.load(font);await document.fonts.ready}catch{/* Use system fallback. */}
      if(disposed||id!==build)return
      const off=document.createElement('canvas'),c=off.getContext('2d',{willReadFrequently:true})
      if(!c)return
      c.font=font
      if(c.measureText(text).width>w*.92){size*=w*.92/c.measureText(text).width;font=`800 ${size}px ${family}`;c.font=font}
      const m=c.measureText(text),pad=12,left=Math.ceil(m.actualBoundingBoxLeft||0)
      const ascent=Math.ceil(m.actualBoundingBoxAscent||size*.78),descent=Math.ceil(m.actualBoundingBoxDescent||size*.22)
      off.width=Math.ceil(left+(m.actualBoundingBoxRight||m.width)+pad*2);off.height=ascent+descent+pad*2
      c.font=font;c.fillStyle='#fff';c.textBaseline='alphabetic';c.fillText(text,pad-left,pad+ascent)
      const data=c.getImageData(0,0,off.width,off.height).data,targets:{x:number;y:number;a:number}[]=[]
      for(let y=0;y<off.height;y+=4)for(let x=0;x<off.width;x+=4){
        const a=data[(y*off.width+x)*4+3]
        if(a>40)targets.push({x:w/2-off.width/2+x,y:h/2-off.height/2+y,a:a/255})
      }
      const parse=(hex:string)=>[0,2,4].map(i=>parseInt(hex.replace('#','').slice(i,i+2),16))
      const base=parse(color),highlight=parse(highlightColor),stride=Math.max(1,Math.ceil(targets.length/4000))
      particles=targets.filter((_,i)=>i%stride===0).map((t,i)=>{
        const seed=((i*9301+49297)%233280)/233280,depth=.45+(((i*233+97)%1000)/1000)*.9
        const blend=clamp(t.x/w+(seed-.5)*.35)
        return {x:t.x,y:t.y,tx:t.x,ty:t.y,sx:t.x,sy:t.y,seed,depth,size:2*(.75+t.a*.45),color:`rgb(${base.map((v,j)=>Math.round(v+(highlight[j]-v)*blend)).join(',')})`}
      })
      width=w;height=h
      const dpr=Math.min(devicePixelRatio||1,2)
      surface.width=Math.round(w*dpr);surface.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)
      pointer.x=pointer.sx=w/2;pointer.y=pointer.sy=h/2
      node.dataset.ready='true';started=false;if(visible)gather()
    }
    const queue=()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{void sample()})}
    const move=(e:PointerEvent)=>{if(e.pointerType!=='mouse')return;const r=node.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true;ensure()}
    const enter=(e:PointerEvent)=>{if(e.pointerType==='mouse'){move(e);gather()}}
    const leave=()=>{pointer.active=false}
    const click=()=>gather()
    const key=(e:KeyboardEvent)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();gather()}}
    const visibility=()=>{
      if(!visible||document.hidden){if(!pausedAt)pausedAt=performance.now();cancelAnimationFrame(frame);frame=0;pointer.active=false}
      else {if(pausedAt){start+=performance.now()-pausedAt;pausedAt=0}if(!started)gather();else ensure()}
    }
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visibility()},{threshold:0})
    const resize=new ResizeObserver(queue),reduce=()=>{reduced=motion.matches;void sample()}
    observer.observe(node);resize.observe(node)
    node.addEventListener('pointerenter',enter);node.addEventListener('pointermove',move);node.addEventListener('pointerleave',leave)
    node.addEventListener('click',click);node.addEventListener('keydown',key)
    document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',reduce)
    void sample()
    return()=>{
      disposed=true;build++;cancelAnimationFrame(frame);cancelAnimationFrame(resizeFrame);observer.disconnect();resize.disconnect()
      node.removeEventListener('pointerenter',enter);node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',leave)
      node.removeEventListener('click',click);node.removeEventListener('keydown',key)
      document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',reduce)
    }
  },[text,color,highlightColor])
  return <div ref={host} className="particle-text" role="button" tabIndex={0} aria-label={`${text}，重新播放粒子文字`}>
    <canvas ref={canvas} className="particle-text__canvas" aria-hidden="true"/>
    <span className="particle-text__fallback" aria-hidden="true">{text}</span>
  </div>
}
