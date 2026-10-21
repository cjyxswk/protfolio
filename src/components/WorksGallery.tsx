import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { worksGallery } from '../data/worksGallery'
import { site } from '../data/site'
import { MoreWorksFolder } from './MoreWorksFolder'
import { createGalleryWheelGesture, galleryDragTarget } from '../utils/galleryGesture'
import { CaseStudyModal } from './ai-face/CaseStudyModal'

const clamp = (value:number, min=0, max=1) => Math.min(max, Math.max(min,value))
const last = worksGallery.length - 1
const count = worksGallery.length
const wrap = (value:number) => ((value%count)+count)%count
const relative = (value:number) => wrap(value+count/2)-count/2
// Native touch scrolling uses buffered copies; only the middle set is exposed
// to assistive technology. Desktop renders the seven originals on a wrapped arc.
const railItems = Array.from({length:3},(_,copy)=>worksGallery.map((work,i)=>({work,i,copy}))).flat()

/** Independent looping cylindrical wall, not React Bits Pro source.
 * Vertical scrolling belongs to the page. Each gesture advances one item;
 * autoplay resumes after manual interaction. RAF runs only during transitions.
 */
export function WorksGallery() {
  const track = useRef<HTMLDivElement>(null)
  const sticky = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLElement|null)[]>([])
  const railCards = useRef<(HTMLElement|null)[]>([])
  const indexRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [faceOpen, setFaceOpen] = useState(false)
  const openFace = useCallback(() => {
    // Give the modal its real project URL so a reload opens the same case study.
    if (window.location.pathname !== '/projects/ai-face') {
      window.history.pushState({ ...window.history.state, aiFaceModal: true }, '', '/projects/ai-face')
    }
    setFaceOpen(true)
  }, [])
  const closeFace = useCallback(() => {
    if (window.history.state?.aiFaceModal) window.history.back()
    else {
      window.history.replaceState(window.history.state, '', '/#works')
      setFaceOpen(false)
    }
  }, [])
  useEffect(() => {
    const syncProject = () => setFaceOpen(window.location.pathname === '/projects/ai-face')
    window.addEventListener('popstate', syncProject)
    return () => window.removeEventListener('popstate', syncProject)
  }, [])
  const selectRef = useRef<(next:number,increment?:boolean)=>void>(()=>{})
  const suppressClick = useRef(0)

  useLayoutEffect(() => {
    const copies = cards.current.flatMap(card => {
      const copy = card?.querySelector<HTMLElement>('.concave-item-copy')
      return copy ? [copy] : []
    })
    // Reserve the tallest natural caption at this viewport for every project.
    // Observe the children, not the reserved box, so it can shrink on resize.
    const measureCopy = () => {
      const height = Math.max(0, ...copies.map(copy => {
        const title = copy.querySelector<HTMLElement>('h3')!
        const description = copy.querySelector<HTMLElement>('p')!
        const style = getComputedStyle(description)
        return title.offsetHeight + description.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom)
      }))
      track.current?.style.setProperty('--gallery-copy-height', `${Math.ceil(height)}px`)
    }
    const observer = new ResizeObserver(measureCopy)
    copies.forEach(copy => [...copy.children].forEach(child => observer.observe(child)))
    measureCopy()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = track.current!
    const reduced = matchMedia('(prefers-reduced-motion:reduce)')
    let wasVisible = false
    let hovered = matchMedia('(hover:hover)').matches && node.matches(':hover')
    let pausedUntil = 0
    let nextAt = performance.now() + 1000
    // A single clock cannot be postponed by repeated intersection/focus events.
    // Measure the actual stage, not the full-width wrapper's area ratio.
    const tick = () => {
      const stageNode = stage.current
      if (!stageNode) return
      const rect = stageNode.getBoundingClientRect()
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      const visible = !document.hidden && !document.querySelector('.af-modal[open]') && visibleHeight >= Math.min(80, rect.height * .2)
      const now = performance.now()
      if (visible && !wasVisible) nextAt = Math.max(now + 1000, pausedUntil)
      wasVisible = visible
      node.dataset.autoplay = hovered || now < pausedUntil ? 'paused' : visible && !reduced.matches ? 'running' : 'idle'
      if (!visible || hovered || now < pausedUntil || reduced.matches || stageNode.dataset.dragging || now < nextAt) return
      selectRef.current(1, true)
      nextAt = now + 2500
    }
    const stop = () => {
      pausedUntil = performance.now() + 5000
      nextAt = pausedUntil
    }
    const enter = (event:PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      hovered = true
      tick()
    }
    const leave = (event:PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      hovered = false
      nextAt = Math.max(performance.now() + 1000, pausedUntil)
      tick()
    }
    const click = (event:Event) => {
      if (performance.now() < suppressClick.current) return
      stop()
      tick()
    }
    const wheel = (event:WheelEvent) => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) stop() }
    const key = (event:KeyboardEvent) => { if (['ArrowLeft','ArrowRight','Home','End','Enter',' '].includes(event.key)) stop() }
    const timer = setInterval(tick, 100)
    tick()
    node.addEventListener('pointerenter',enter)
    node.addEventListener('pointerleave',leave)
    node.addEventListener('pointerdown',stop,{capture:true})
    node.addEventListener('click',click,{capture:true})
    node.addEventListener('wheel',wheel,{passive:true})
    node.addEventListener('keydown',key)
    return () => {
      clearInterval(timer)
      delete node.dataset.autoplay
      node.removeEventListener('pointerenter',enter)
      node.removeEventListener('pointerleave',leave)
      node.removeEventListener('pointerdown',stop,true)
      node.removeEventListener('click',click,true)
      node.removeEventListener('wheel',wheel)
      node.removeEventListener('keydown',key)
    }
  }, [])

  useEffect(() => {
    const trackNode=track.current!, stickyNode=sticky.current!, stageNode=stage.current!
    const desktop=matchMedia('(min-width:1024px)')
    const reduced=matchMedia('(prefers-reduced-motion:reduce)')
    let frame=0, railFrame=0, disposed=false, paintedPosition=NaN
    let offset=0, position=0, railReady=false
    let motion:{target:number;velocity:number;lastTime:number;started:number;kind:'wheel'|'selection'|'release'}|null=null
    const wheelGesture = createGalleryWheelGesture()
    let drag:{id:number;originX:number;originY:number;originPosition:number;lastX:number;lastTime:number;velocity:number;moved:boolean}|null=null
    let geometry={ cardWidth:0 }
    const full=()=>!reduced.matches
    let previousMode=full()
    const railLeft=(card:HTMLElement)=>card.offsetLeft-(stageNode.clientWidth-card.offsetWidth)/2
    const publish=(next:number)=>{
      if(indexRef.current===next)return
      indexRef.current=next
      setIndex(next) // Only when nearest central item changes (seven discrete states).
    }
    const measure=()=>{
      paintedPosition=NaN
      const header=document.querySelector<HTMLElement>('[data-site-navbar]')
      const top=Math.ceil((header?.getBoundingClientRect().bottom??108)+16)
      trackNode.style.setProperty('--gallery-top',`${top}px`)
      // Use layout viewport width (excluding a classic scrollbar), not the
      // section container width or raw 100vw, so full bleed cannot overflow.
      trackNode.style.setProperty('--gallery-width',`${document.documentElement.clientWidth}px`)
      geometry={
        cardWidth:cards.current[0]?.offsetWidth??440,
      }
    }
    const render=()=>{
      frame=0
      if(disposed)return
      if(!full()){
        cards.current.forEach(card=>{
          if(!card)return
          card.style.removeProperty('transform');card.style.removeProperty('opacity')
          card.style.removeProperty('visibility');card.style.removeProperty('pointer-events')
          card.style.removeProperty('--copy-opacity')
          const trigger=card.querySelector<HTMLElement>('.concave-cover')
          if(trigger)trigger.tabIndex=0
        })
        if(!railReady){
          const card=cards.current[indexRef.current]
          if(card)stageNode.scrollTo({left:railLeft(card),behavior:'instant'})
          railReady=true
        }
        return
      }
      if(motion){
        const now=performance.now()
        const dt=clamp((now-motion.lastTime)/1000,.001,1/30)
        motion.lastTime=now
        motion.target=offset
        // Near-critical damping: fast launch, gentle braking, no big bounce.
        motion.velocity+=((motion.target-position)*170-motion.velocity*26)*dt
        position+=motion.velocity*dt
        if((Math.abs(motion.target-position)<.0008&&Math.abs(motion.velocity)<.008)||now-motion.started>2200){
          position=motion.target;motion=null
        }
      }else position=offset
      if(Math.abs(position-paintedPosition)<.0001){
        if(motion)frame=requestAnimationFrame(render)
        return
      }
      paintedPosition=position
      const next=wrap(Math.round(position))
      publish(next)
      trackNode.dataset.position=position.toFixed(3)
      // Arc spacing is set by panel width + 16px, not by a flex row.
      const step=.52, radius=(geometry.cardWidth+16)/step
      cards.current.forEach((card,i)=>{
        if(!card)return
        const panelOffset=relative(i-position)
        const theta=panelOffset*step
        const distance=Math.abs(theta)
        // Narrow screens only need the immediate neighbours. Cull farther
        // panels before their positive Z can cross the closer mobile camera.
        const visible=Math.abs(panelOffset)<(desktop.matches?2.65:1.65)
        const x=radius*Math.sin(theta)
        const z=radius*(1-Math.cos(theta))
        card.style.transform=`translate(-50%,-50%) translate3d(${x.toFixed(2)}px,0,${z.toFixed(2)}px) rotateY(${-theta}rad)`
        card.style.opacity=visible?`${1-.18*Math.min(distance/.96,1)}`:'0'
        card.style.visibility=visible?'visible':'hidden'
        card.style.pointerEvents=visible?'auto':'none'
        card.style.setProperty('--copy-opacity',`${clamp(1-Math.abs(panelOffset))}`)
        const trigger=card.querySelector<HTMLElement>('.concave-cover')
        if(trigger)trigger.tabIndex=i===next?0:-1
      })
      if(motion)frame=requestAnimationFrame(render)
    }
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(render)}
    const onHorizontalWheel=(event:WheelEvent)=>{
      // Never capture ordinary vertical scrolling or browser pinch-to-zoom.
      if(!full()||drag||event.ctrlKey||Math.abs(event.deltaX)<=Math.abs(event.deltaY)||!event.deltaX)return
      event.preventDefault()
      const unit=event.deltaMode===1?16:event.deltaMode===2?stageNode.clientWidth:1
      const step = wheelGesture(event.deltaX * unit, performance.now())
      if (!step) return
      const now=performance.now()
      offset=Math.round(offset)+step
      motion={target:offset,velocity:0,lastTime:now,started:now,kind:'wheel'}
      schedule()
    }
    const resize=()=>{
      const changed=previousMode!==full()
      if(changed){
        motion=null;drag=null;railReady=false
        delete stageNode.dataset.dragging
        previousMode=full()
      }
      measure()
      // Resizing a native rail changes every card's offset. Keep the current
      // project centred even when staying within the same responsive mode.
      if(!full())railReady=false
      if(changed&&full())offset=indexRef.current
      schedule()
    }
    selectRef.current=(next,increment=false)=>{
      if(full()){
        const destination=increment?Math.round(motion?.target??position)+next:Math.round(position)+relative(wrap(next)-wrap(Math.round(position)))
        const now=performance.now()
        offset=destination
        motion={target:destination,velocity:motion?.velocity??0,lastTime:now,started:now,kind:'selection'}
        schedule()
      }else{
        const delta=increment?next:relative(wrap(next)-indexRef.current)
        const card=railCards.current[count+indexRef.current+delta]
        if(card)stageNode.scrollTo({left:card.offsetLeft-(stageNode.clientWidth-card.offsetWidth)/2,behavior:reduced.matches?'instant':'smooth'})
      }
    }
    const onPointerDown=(event:PointerEvent)=>{
      if(!full()||event.button!==0||(event.target as Element).closest('.concave-item-copy a'))return
      offset=position;motion=null
      drag={id:event.pointerId,originX:event.clientX,originY:event.clientY,originPosition:position,lastX:event.clientX,lastTime:performance.now(),velocity:0,moved:false}
    }
    const onPointerMove=(event:PointerEvent)=>{
      if(!drag||drag.id!==event.pointerId)return
      const dx=event.clientX-drag.originX,dy=event.clientY-drag.originY
      if(!drag.moved){
        if(Math.abs(dx)<6||Math.abs(dx)<Math.abs(dy)*1.15)return
        drag.moved=true
        stageNode.setPointerCapture(event.pointerId)
        stageNode.dataset.dragging='true'
      }
      event.preventDefault()
      const now=performance.now(),dt=Math.max((now-drag.lastTime)/1000,.008),pitch=geometry.cardWidth+16
      const velocity=-(event.clientX-drag.lastX)/pitch/dt
      drag.velocity=drag.velocity*.65+velocity*.35
      drag.lastX=event.clientX;drag.lastTime=now
      position=drag.originPosition+clamp(-dx/pitch,-1,1)
      offset=position
      schedule()
    }
    const endDrag=(event:PointerEvent)=>{
      if(!drag||drag.id!==event.pointerId)return
      const completed=drag
      drag=null
      delete stageNode.dataset.dragging
      if(stageNode.hasPointerCapture(event.pointerId))stageNode.releasePointerCapture(event.pointerId)
      if(!completed.moved)return
      suppressClick.current=performance.now()+450
      const velocity=event.type==='pointercancel'||performance.now()-completed.lastTime>100?0:clamp(completed.velocity,-8,8)
      const target=galleryDragTarget(completed.originPosition,position,velocity,event.type==='pointercancel')
      offset=target
      const now=performance.now()
      motion={target,velocity:clamp(velocity,-2,2),lastTime:now,started:now,kind:'release'}
      schedule()
    }
    const preventNativeDrag=(event:DragEvent)=>event.preventDefault()
    const preventDraggedClick=(event:Event)=>{
      if(performance.now()<suppressClick.current){event.preventDefault();event.stopImmediatePropagation()}
    }
    const updateRail=()=>{
      railFrame=0
      if(full()||!railReady)return
      const center=stageNode.getBoundingClientRect().left+stageNode.clientWidth/2
      let nearest=0,delta=Infinity
      railCards.current.forEach((card,i)=>{
        if(!card)return
        const rect=card.getBoundingClientRect(),d=Math.abs(rect.left+rect.width/2-center)
        if(d<delta){nearest=i;delta=d}
      })
      publish(wrap(nearest))
      // Rebase only after a copy has settled at the centre, without animation.
      // The buffer on both sides makes the before/after pixels identical.
      if(delta<2&&(nearest<count||nearest>=count*2)){
        const original=cards.current[wrap(nearest)]
        if(original)stageNode.scrollTo({left:railLeft(original),behavior:'instant'})
      }
    }
    const onRailScroll=()=>{if(!full()&&!railFrame)railFrame=requestAnimationFrame(updateRail)}
    const observer=new ResizeObserver(resize)
    observer.observe(stageNode);observer.observe(stickyNode)
    const header=document.querySelector<HTMLElement>('[data-site-navbar]')
    if(header)observer.observe(header)
    // Cover the whole gallery, including captions, controls and edge space.
    // Capture before descendants so horizontal gestures cannot chain to history.
    trackNode.addEventListener('wheel',onHorizontalWheel,{passive:false,capture:true})
    window.addEventListener('resize',resize)
    stageNode.addEventListener('scroll',onRailScroll,{passive:true})
    stageNode.addEventListener('pointerdown',onPointerDown)
    window.addEventListener('pointermove',onPointerMove,{passive:false})
    window.addEventListener('pointerup',endDrag)
    window.addEventListener('pointercancel',endDrag)
    stageNode.addEventListener('dragstart',preventNativeDrag)
    stageNode.addEventListener('click',preventDraggedClick,true)
    desktop.addEventListener('change',resize);reduced.addEventListener('change',resize)
    measure();render()
    return()=>{
      disposed=true;cancelAnimationFrame(frame);cancelAnimationFrame(railFrame);observer.disconnect()
      window.removeEventListener('resize',resize)
      trackNode.removeEventListener('wheel',onHorizontalWheel,true)
      stageNode.removeEventListener('scroll',onRailScroll)
      if(drag&&stageNode.hasPointerCapture(drag.id))stageNode.releasePointerCapture(drag.id)
      stageNode.removeEventListener('pointerdown',onPointerDown)
      window.removeEventListener('pointermove',onPointerMove)
      window.removeEventListener('pointerup',endDrag);window.removeEventListener('pointercancel',endDrag)
      stageNode.removeEventListener('dragstart',preventNativeDrag)
      stageNode.removeEventListener('click',preventDraggedClick,true)
      desktop.removeEventListener('change',resize);reduced.removeEventListener('change',resize)
      selectRef.current=()=>{}
    }
  },[])

  const active=worksGallery[index]
  return <><div ref={track} className="concave-track">
    <div ref={sticky} className="concave-sticky">
      <div ref={stage} className="concave-stage" role="region" aria-roledescription="作品画廊" aria-label="作品展示：左右滑动或使用左右方向键循环切换，上下滚动浏览页面" tabIndex={0}
        onKeyDown={event=>{
          if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
            event.preventDefault();selectRef.current(event.key==='ArrowRight'?1:-1,true)
          }else if(event.key==='Home'||event.key==='End'){
            event.preventDefault();selectRef.current(event.key==='Home'?0:last)
          }
        }}>
        {railItems.map(({work,i,copy},railIndex)=>{
          const cover=site.media[work.mediaKey]?.cover
          const clone=copy!==1
          const className=`concave-panel${i===index?' is-central':''}${clone?' is-clone':''}${site.media[work.mediaKey]?.inset?' has-inset-cover':''}${work.id==='more'?' has-folder-cover':''}`
          const style={'--project-accent':work.accent} as CSSProperties
          const content=<>
            {work.id==='more'?<MoreWorksFolder />:cover?<img src={cover} alt={site.media[work.mediaKey]?.alt||`${work.title} 设计界面`} width={840} height={600} loading={i===0?'eager':'lazy'} draggable={false}/>:<div className={`concave-placeholder motif-${work.motif}`} aria-hidden="true"><div className="preview-frame"><div className="preview-toolbar"><i/><i/><i/></div><div className="preview-canvas"><span/><span/><span/></div></div></div>}
            {work.id!=='more'&&<span className="concave-card-cta" aria-hidden="true">View project <ArrowUpRight size={16}/></span>}
          </>
          const ref=(node:HTMLElement|null)=>{railCards.current[railIndex]=node;if(!clone)cards.current[i]=node}
          return <div key={`${copy}-${work.id}`} ref={ref} className={className} style={style} aria-hidden={clone||undefined} role="group" aria-label={work.title}>
            <a className="concave-cover" href={`/projects/${work.slug}`} onClick={event => { if (work.id === 'face' && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); openFace() } }} tabIndex={clone?-1:undefined} aria-label={`查看 ${work.title}`}>{content}</a>
            <div className="concave-item-copy" aria-hidden={i!==index||undefined}>
              <h3>{work.title}</h3>
              <p className="concave-description">{work.description}</p>
            </div>
          </div>
        })}
      </div>
      <div className="concave-caption">
        <span className="concave-status" role="status" aria-live="polite">{active.title}</span>
        <div className="concave-controls" role="group" aria-label="作品切换">
          <button type="button" aria-label="上一个作品" onClick={()=>selectRef.current(-1,true)}><ChevronLeft size={22} aria-hidden="true"/></button>
          <p className="concave-counter" aria-label={`第 ${index+1} 个作品，共 ${worksGallery.length} 个`}><span>{String(index+1).padStart(2,'0')}</span><span className="concave-counter-total"> / {String(worksGallery.length).padStart(2,'0')}</span></p>
          <button type="button" aria-label="下一个作品" onClick={()=>selectRef.current(1,true)}><ChevronRight size={22} aria-hidden="true"/></button>
        </div>
      </div>
    </div>
  </div>{faceOpen && <CaseStudyModal onClose={closeFace} />}</>
}
