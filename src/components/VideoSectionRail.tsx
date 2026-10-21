import { useEffect, useState, type CSSProperties } from 'react'

const sections = [
  ['video-project-overview', '项目概览'],
  ['video-case-1', '业务目标'], ['video-case-2', '设计目标'], ['video-contribution', '我做了什么'],
  ['video-case-3', '产品分析'],
  ['video-case-6', '视觉体系'], ['video-case-7', '多端适配'],
  ['video-case-9', '项目结果与复盘'],
] as const

export function SectionRail({ sections }: { sections: readonly (readonly [string, string])[] }) {
  const [active, setActive] = useState(sections[0][0])
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const threshold = Math.max(150, innerHeight * .3)
      let current = sections[0][0]
      for (const [id] of sections) {
        const node = document.getElementById(id)
        if (node && node.getBoundingClientRect().top <= threshold) current = id
      }
      if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1][0]
      setActive(current)
    }
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    update()
    const observer = new ResizeObserver(requestUpdate)
    observer.observe(document.documentElement)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', requestUpdate); window.removeEventListener('resize', requestUpdate) }
  }, [sections])
  return <nav className="video-section-rail" style={{ '--rail-count': sections.length } as CSSProperties} aria-label="项目章节快速导航">
    {sections.map(([id, label]) => <button type="button" key={id} aria-label={`跳转到${label}`} aria-current={active === id ? 'location' : undefined} onClick={() => {
      document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
    }}><span className="video-section-rail-label">{label}</span><span className="video-section-rail-dot" aria-hidden="true" /></button>)}
  </nav>
}

export function VideoSectionRail() { return <SectionRail sections={sections} /> }
