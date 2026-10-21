import { ArrowLeft } from 'lucide-react'
import { Header } from '../Header'

export const navItems = [
  ['af-hero', '产品展示'],
  ['af-overview', '项目介绍'],
  ['af-features', '特色功能'],
  ['af-architecture', '功能架构'],
  ['af-analysis', '用户分析'],
  ['af-competitive', '竞品思考'],
  ['af-process', '用户旅程'],
  ['af-design', '颜色选取'],
  ['af-discovery', '风格探索'],
  ['af-creation', '创作设置'],
  ['af-feedback', '生成反馈'],
  ['af-result', '结果分享'],
  ['af-growth', '应用市场图'],
  ['af-end', '结尾'],
] as const
export function CaseStudyNav({ active, onClose, onJump }: { active: string; onClose: () => void; onJump: (id: string) => void }) {
  return <>
    <div className="af-shared-header" onClick={event => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="/#"]')
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      event.stopPropagation()
      if (location.pathname === '/') {
        onClose()
        requestAnimationFrame(() => { location.hash = link.hash })
      } else location.href = link.href
    }}><Header projectPage /></div>
    <div className="af-case-tools af-wrap"><button onClick={onClose} aria-label="返回作品集"><ArrowLeft size={18} aria-hidden="true" />返回作品</button></div>
    <nav className="af-chapter-rail" aria-label="AI Face 案例章节导航">{navItems.map(([id, label]) => <button key={id} aria-label={`跳转到 ${label}`} aria-current={active === id ? 'location' : undefined} onClick={() => onJump(id)}><span>{label}</span><i aria-hidden="true" /></button>)}</nav>
  </>
}
