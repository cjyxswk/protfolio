import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/site'
import { portraitSkills } from '../data/portraitSkills'

export function AboutPortrait() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [capable, setCapable] = useState(() => typeof window !== 'undefined' && matchMedia('(min-width:768px) and (hover:hover) and (pointer:fine)').matches)
  const [phase, setPhase] = useState<'idle' | 'open' | 'closed'>('idle')
  const reduced = useReducedMotion()
  useEffect(() => {
    const card = ref.current!
    const media = matchMedia('(min-width:768px) and (hover:hover) and (pointer:fine)')
    const updateMedia = () => { setCapable(media.matches); setPhase('idle') }
    const measure = () => setSize({ width: card.clientWidth, height: card.clientHeight })
    const resize = new ResizeObserver(measure)
    resize.observe(card)
    measure(); updateMedia()
    media.addEventListener('change', updateMedia)
    return () => { resize.disconnect(); media.removeEventListener('change', updateMedia) }
  }, [])
  const expanded = !capable || phase === 'open'
  return <div ref={ref} className={`about-portrait${site.portraitMask ? ' has-portrait-mask' : ''}`}
    style={{ '--portrait-mask': `url("${site.portraitMask}")` } as CSSProperties}
    onPointerEnter={event => { if (capable && event.pointerType === 'mouse') setPhase('open') }}
    onPointerLeave={() => setPhase('closed')}
    onPointerCancel={() => setPhase('closed')}>
    <div className="portrait-black-background" aria-hidden="true" />
    {site.portrait ? <img className="about-portrait-photo" src={site.portrait} alt="闫伟平个人肖像" loading="lazy" draggable={false} /> : <div className="about-portrait-placeholder" role="img" aria-label="个人肖像预留区域" />}
    <ul className="portrait-skills" aria-label="设计与开发软件" aria-hidden={!expanded}>
      {portraitSkills.map((skill, index) => <li key={skill.name} className="portrait-skill" style={{
        left: `${skill.target.x}%`, top: `${skill.target.y}%`,
      }}>
        <motion.span className="portrait-skill-glass" title={skill.name}
          initial={false}
          animate={{
            opacity: expanded ? 1 : 0,
            x: reduced || expanded ? 0 : (skill.origin.x - skill.target.x) * size.width / 100,
            y: reduced || expanded ? 0 : (skill.origin.y - skill.target.y) * size.height / 100,
            scale: reduced || expanded ? 1 : phase === 'idle' ? .6 : .75,
          }}
          transition={{
            duration: reduced || !capable ? 0 : expanded ? .48 : .32,
            delay: reduced || !capable || phase === 'idle' ? 0 : expanded ? index * .06 : (portraitSkills.length - 1 - index) * .025,
            ease: [.16, 1, .3, 1],
          }}>
          <img src={skill.icon} alt={skill.name} width="32" height="32" draggable={false} />
        </motion.span>
      </li>)}
    </ul>
  </div>
}
