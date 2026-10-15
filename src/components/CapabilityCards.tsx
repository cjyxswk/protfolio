import { useState } from 'react'

const tags = [
  ['需求梳理与交互方案制定', '高保真视觉与设计系统搭建', '开发协作、上线验收与迭代'],
  ['组件库搭建与交互状态规范', '多端视觉体系与设计标准统一', '设计组件复用与持续迭代维护'],
  ['AI Coding 辅助前端开发', '高保真界面与交互还原', '响应式适配与前端交付'],
  ['订阅会员与付费权益设计', 'Credits 消耗规则与付费体验设计', '付费转化路径与体验优化'],
  ['界面交互动效与状态反馈', 'AE 动效制作与 Lottie 交付', '产品宣传视频与创意剪辑'],
]

export function CapabilityCards({ items }: { items: string[][] }) {
  const [active, setActive] = useState<number | null>(null)
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
          {tags[index].map(tag => <li key={tag}>{tag}</li>)}
        </ul>
        <div className={`strength-sculpture sculpture-${index}`} aria-hidden="true"><i/><i/><i/><i/></div>
      </article>)}
  </div>
}
