import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { architectureBranches } from './architectureData'
import '../../ai-face-architecture.css'

type Connector = { id: string; branch: string; stage?: string; d: string }
type Highlight = { branch: string; stage?: string } | null

export function FunctionArchitecture() {
  const section = useRef<HTMLElement>(null)
  const chart = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Record<string, boolean>>({ styles: true, brush: true, settings: true })
  const [active, setActive] = useState<Highlight>(null)
  const [entered, setEntered] = useState(false)
  const [geometry, setGeometry] = useState<{ width: number; height: number; paths: Connector[] }>({ width: 1, height: 1, paths: [] })

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setEntered(true); observer.disconnect() }
    }, { root: section.current?.closest('.af-case-scroll') || null, threshold: .08 })
    if (section.current) observer.observe(section.current)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const canvas = chart.current
    if (!canvas) return
    let frame = 0
    const measure = () => {
      const base = canvas.getBoundingClientRect()
      const root = canvas.querySelector<HTMLElement>('[data-fa-root]')
      if (!root || !base.width) return
      const rect = (el: HTMLElement) => {
        const r = el.getBoundingClientRect()
        return { x: r.left - base.left, y: r.top - base.top, width: r.width, height: r.height }
      }
      const mobile = window.matchMedia('(max-width: 767px)').matches
      const middleModule = canvas.querySelector<HTMLElement>('[data-fa-branch="brush"] [data-fa-module]')
      if (!mobile && middleModule) {
        const middle = rect(middleModule)
        root.style.setProperty('--fa-root-y', `${middle.y + middle.height / 2 - root.offsetHeight / 2}px`)
      } else root.style.removeProperty('--fa-root-y')
      const start = rect(root)
      const paths: Connector[] = []
      canvas.querySelectorAll<HTMLElement>('[data-fa-branch]').forEach(group => {
        const branch = group.dataset.faBranch!
        const module = group.querySelector<HTMLElement>('[data-fa-module]')!
        const node = rect(module)
        const trunkX = mobile ? 12 : start.x + start.width + 24
        paths.push({ id: `${branch}-root`, branch, d: mobile
          ? `M ${start.x + 12} ${start.y + start.height} V ${node.y + node.height / 2} H ${node.x}`
          : `M ${start.x + start.width} ${start.y + start.height / 2} H ${trunkX} V ${node.y + node.height / 2} H ${node.x}` })
        if (!open[branch]) return
        const stageNodes = Array.from(group.querySelectorAll<HTMLElement>('[data-fa-stage]'))
        stageNodes.forEach(el => {
          const child = rect(el)
          const stage = el.dataset.faStage!
          const busY = child.y - 24
          paths.push({ id: `${branch}-${stage}`, branch, stage, d: mobile
            ? `M ${node.x + 12} ${node.y + node.height} V ${child.y + child.height / 2} H ${child.x}`
            : `M ${node.x + node.width} ${node.y + node.height / 2} H ${node.x + node.width + 16} V ${busY} H ${child.x + child.width / 2} V ${child.y}` })
        })
      })
      const next = { width: base.width, height: base.height, paths }
      setGeometry(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next)
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure) }
    const observer = new ResizeObserver(schedule)
    observer.observe(canvas)
    canvas.querySelectorAll<HTMLElement>('[data-fa-module], [data-fa-stage], .af-fa-inner').forEach(el => observer.observe(el))
    window.addEventListener('resize', schedule)
    canvas.addEventListener('animationend', schedule)
    measure()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize', schedule); canvas.removeEventListener('animationend', schedule) }
  }, [open])

  const highlighted = (path: Connector) => active?.branch === '*' || (active?.branch === path.branch && (!path.stage || !active.stage || active.stage === path.stage))
  return <section id="af-architecture" ref={section} className={`af-fa-section${entered ? ' is-entered' : ''}`} aria-labelledby="af-fa-title">
    <div className="af-wrap">
      <header className="af-poster-heading"><div><h2 id="af-fa-title">Function Architecture</h2><p>Product structure</p></div></header>
      <div className="af-fa-chart" ref={chart} aria-label="AI Face modules and feature hierarchy">
        <svg className="af-fa-lines" width={geometry.width} height={geometry.height} viewBox={`0 0 ${geometry.width} ${geometry.height}`} fill="none" aria-hidden="true"><g className="af-fa-lines-base">{geometry.paths.map(path => <path key={path.id} d={path.d} />)}</g><g className="af-fa-lines-active">{geometry.paths.filter(highlighted).map(path => <path key={path.id} d={path.d} />)}</g></svg>
        <div className="af-fa-root" data-fa-root tabIndex={0} aria-label="AI Face" onMouseEnter={() => setActive({ branch: '*' })} onMouseLeave={() => setActive(null)} onFocus={() => setActive({ branch: '*' })} onBlur={() => setActive(null)}><img src="/assets/ai-face/face-logo.png" alt="AI Face Logo" width={1024} height={1024} /></div>
        <div className="af-fa-branches">{architectureBranches.map((branch, index) => <div key={branch.id} data-fa-branch={branch.id} className={`af-fa-branch af-fa-${branch.id}`} style={{ '--fa-index': index } as React.CSSProperties}>
          <button className={`af-fa-module${active?.branch === branch.id ? ' is-active' : ''}`} data-fa-module aria-expanded={open[branch.id]} aria-controls={`af-fa-${branch.id}`} onClick={() => setOpen(previous => ({ ...previous, [branch.id]: !previous[branch.id] }))} onMouseEnter={() => setActive({ branch: branch.id })} onMouseLeave={() => setActive(null)} onFocus={() => setActive({ branch: branch.id })} onBlur={() => setActive(null)}><span>{branch.title}</span><small>{branch.subtitle}</small><ChevronDown size={13} aria-hidden="true" /></button>
          <div id={`af-fa-${branch.id}`} className={`af-fa-collapse${open[branch.id] ? ' is-open' : ''}`} inert={!open[branch.id]}><div className="af-fa-inner"><ul className="af-fa-stages" style={{ '--fa-count': branch.stages.length } as React.CSSProperties}>{branch.stages.map(stage => <li key={stage.id} className="af-fa-stage" onMouseEnter={() => setActive({ branch: branch.id, stage: stage.id })} onMouseLeave={() => setActive(null)} onFocus={() => setActive({ branch: branch.id, stage: stage.id })} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActive(null) }}>
            <h3 className="af-fa-node" data-fa-stage={stage.id} tabIndex={0}>{stage.title}</h3>
            {stage.subtitle && <p className="af-fa-stage-subtitle">{stage.subtitle}</p>}
            <ul className="af-fa-features">{stage.features.map(feature => <li key={feature}><span tabIndex={0}>{feature}</span></li>)}</ul>
          </li>)}</ul></div></div>
        </div>)}</div>
      </div>
    </div>
  </section>
}
