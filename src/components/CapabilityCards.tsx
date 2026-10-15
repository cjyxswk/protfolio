import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const tags = [
  ['需求梳理与交互方案制定', '高保真视觉与设计系统搭建', '开发协作、上线验收与迭代'],
  ['组件库搭建与交互状态规范', '多端视觉体系与设计标准统一', '设计组件复用与持续迭代维护'],
  ['AI Coding 辅助前端开发', '高保真界面与交互还原', '响应式适配与前端交付'],
  ['海外用户体验与本地化适配', 'iOS / Android 平台设计规范', '多语言界面适配与国际化验收'],
  ['App Store / Google Play 上架规范', '平台审核要求与设计合规检查', '版本更新、设计走查与上线验收'],
]

export function CapabilityCards({ items }: { items: string[][] }) {
  const [active, setActive] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()
  return <div className="strengths-grid" onPointerLeave={() => setActive(null)}>
    {items.map(([number, title, english, text], index) =>
      <article key={number} className={`strength-card strength-${index + 1}${active === index ? ' is-highlighted' : ''}`}
        data-reveal tabIndex={0}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(index) }}
        onPointerLeave={event => { if (event.pointerType === 'mouse') setActive(null) }}
        onFocus={() => setActive(index)}
        onBlur={event => { if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node | null)) setActive(null) }}>
        <div className="strength-meta"><span>{number}</span><small lang="en">{english}</small></div>
        <h3>{title}<span aria-hidden="true">.</span></h3>
        <p>{text}</p>
        <ul className="strength-tags" aria-label={`${title}要点`}>
          {tags[index].map((tag, tagIndex) => <motion.li
            key={tag}
            initial={false}
            animate={active === index
              ? { y: 0, rotate: [-5, 4, -3][tagIndex], opacity: 1 }
              : { y: reduceMotion ? 0 : -18 - tagIndex * 30, rotate: reduceMotion ? 0 : [-7, 7, -6][tagIndex], opacity: 0 }}
            transition={reduceMotion
              ? { duration: 0 }
              : active === index
                ? { y: { type: 'spring', stiffness: 160, damping: 12, mass: .8, delay: .06 + tagIndex * .09 }, rotate: { type: 'spring', stiffness: 115, damping: 10, delay: .06 + tagIndex * .09 }, opacity: { duration: .15, delay: .06 + tagIndex * .09 } }
                : { duration: .14 }}
          >{tag}</motion.li>)}
        </ul>
        <div className={`strength-sculpture sculpture-${index}`} aria-hidden="true"><i/><i/><i/><i/></div>
      </article>)}
  </div>
}
