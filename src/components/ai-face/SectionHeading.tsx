import type { ReactNode } from 'react'

const chapterTitles: Record<string, [string, string]> = {
  '05': ['用户 · 旅程', 'User journey'],
  '06': ['颜色 · 选取', 'Color selection'],
  '07': ['风格 · 探索', 'Style discovery'],
  '08': ['创作 · 设置', 'Creation settings'],
  '09A': ['生成 · 反馈', 'Generation feedback'],
  '09B': ['结果 · 分享', 'Result & sharing'],
  '10': ['应用 · 市场图', 'App store visuals'],
  '11': ['交付 · 复盘', 'Delivery & reflection'],
}

export function SectionHeading({ number, english, children, description }: { number: string; english: string; children: ReactNode; description?: string }) {
  const [title, subtitle] = chapterTitles[number] ?? [children, english]
  return <><header className="af-poster-heading"><div><h2>{title}</h2><p>{subtitle}</p></div></header>{description && <p className="af-lead">{description}</p>}</>
}
