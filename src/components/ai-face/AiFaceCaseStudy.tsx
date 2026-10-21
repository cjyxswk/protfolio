import { useEffect, useRef, useState } from 'react'
import { palette } from './data'
import { CaseStudyOpening } from './CaseStudyOpening'
import { PhoneFrame } from './PhoneFrame'
import { SectionHeading } from './SectionHeading'
import { CaseStudyNav, navItems } from './CaseStudyNav'
import { ProcessTimeline } from './ProcessTimeline'
import { ImageGallery } from './ImageGallery'
import '../../ai-face-case.css'
import '../../ai-face-reference.css'

export function AiFaceCaseStudy({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState<string>('af-hero')
  const jump = (id: string) => {
    const target = ref.current?.querySelector<HTMLElement>(`#${id}`)
    if (!target) return
    const root = ref.current?.closest<HTMLElement>('.af-case-scroll')
    const inset = (ref.current?.querySelector('[data-site-navbar]')?.getBoundingClientRect().bottom ?? 108) + 24
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    if (root) root.scrollTo({ top: root.scrollTop + target.getBoundingClientRect().top - root.getBoundingClientRect().top - inset, behavior })
    else window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - inset, behavior })
  }
  useEffect(() => {
    const oldTitle = document.title
    document.title = 'AI FACE — UI/UX Case Study｜闫伟平作品集'
    document.documentElement.classList.remove('cinematic-intro')
    const root = ref.current?.closest<HTMLElement>('.af-case-scroll') || null
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !root && !ref.current?.querySelector('.af-lightbox[open]')) onClose()
    }
    window.addEventListener('keydown', escape)
    const scrollTarget = root ?? window
    let frame = 0
    const updateActive = () => {
      frame = 0
      const boundary = (ref.current?.querySelector('[data-site-navbar]')?.getBoundingClientRect().bottom ?? 108) + 48
      let current: string = navItems[0][0]
      navItems.forEach(([id]) => {
        const node = ref.current?.querySelector(`#${id}`)
        if (node && node.getBoundingClientRect().top <= boundary) current = id
      })
      const atBottom = root
        ? root.scrollTop + root.clientHeight >= root.scrollHeight - 4
        : window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      if (atBottom) current = 'af-end'
      setActive(current)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateActive) }
    scrollTarget.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    updateActive()
    return () => {
      document.title = oldTitle
      cancelAnimationFrame(frame)
      scrollTarget.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('keydown', escape)
    }
  }, [onClose])
  return <article ref={ref} className="af-case af-reference-layout" aria-label="AI Face 产品设计案例">
    <CaseStudyNav active={active} onClose={onClose} onJump={jump} />
    <main>
      <CaseStudyOpening onExplore={() => jump("af-architecture")} />

      <section id="af-process" className="af-section af-process-section"><div className="af-wrap"><SectionHeading number="05" english="USER JOURNEY">从选中一种风格，<br />到完成一张作品。</SectionHeading><ProcessTimeline /></div></section>

      <section id="af-design" className="af-section af-paper"><div className="af-wrap"><SectionHeading number="06" english="VISUAL LANGUAGE">让创作本身，<br />成为视觉主角。</SectionHeading><div className="af-visual-intro"><p>深色界面衬托高饱和作品，明亮的黄色—青绿色渐变形成视觉识别。以大图、风格名称与清晰的主操作，建立易读的信息层级。</p></div><div className="af-brand-swatches">{[["明亮黄", "#FFE528"], ["浅叶绿", "#D3F483"], ["薄荷青", "#92F6DD"]].map(([label, color]) => <div key={color} style={{ background: color }}><strong>{label}</strong><span>{color}</span></div>)}</div><div className="af-gradient-spec"><span>BRAND EXPRESSION</span><strong>Warmth meets possibility.</strong><p>#FFE528 → #D3F483 → #92F6DD</p></div><div className="af-palette">{palette.map(([label, color]) => <div key={label}><i style={{ background: color }} /><span>{label}</span><strong>{color}</strong></div>)}</div></div></section>

      <section className="af-section af-wrap" id="af-discovery"><SectionHeading number="07" english="DISCOVERY">用视觉示例，<br />替代复杂的功能介绍。</SectionHeading><div className="af-editorial-grid af-linked-layout"><div className="af-phone-stage"><PhoneFrame screen="home" /></div><div className="af-linked-details">{[['分类清晰', 'Trending / Realism / Comic 按兴趣组织，让用户快速找到感兴趣的风格。'], ['效果即入口', '以大图展示风格效果，帮助用户直观判断并进入创作。'], ['渐进浏览', '每组 See All 提供进一步探索入口，在简洁浏览与丰富选择之间保持平衡。'], ['主导风格策划与制作', '调研热门视觉趋势，主导风格筛选与逐一生成，交付示例素材与生成配置，沉淀可复用的风格模板。']].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p>{title === '主导风格策划与制作' && <div className="af-template-delivery"><a href="/assets/ai-face/style-template-delivery.png" target="_blank" rel="noreferrer" aria-label="查看完整风格模板交付截图"><div className="af-template-preview"><img src="/assets/ai-face/style-template-delivery.png" alt="设计交付的风格模板与原图效果对照" loading="lazy" /></div></a></div>}{title !== '主导风格策划与制作' && <span className="af-linked-line" aria-hidden="true" />}</article>)}</div></div></section>

      <section className="af-section af-creation" id="af-creation"><div className="af-wrap"><SectionHeading number="08" english="CREATION">把复杂生成参数，<br />收束为一次直观操作。</SectionHeading><div className="af-editorial-grid"><div className="af-phone-stage"><PhoneFrame screen="create" /></div><div><div className="af-creation-details">{[
        { title: '裁剪 · 自由缩放素材', copy: '用户可在裁剪框内自由放大或缩小素材，调整画面呈现范围，确定合适的构图。' },
        { title: '比例 · 清晰的选择', copy: '3:4 / 1:1 / 4:3 集中呈现，方便根据不同创作场景选择画面比例。' },
        { title: '相似度 · 自由调整效果', copy: '通过滑块调整生成效果与原图的相似程度，在保留人物特征与风格表达之间找到平衡。' },
      ].map(({ title, copy }) => <article key={title}><h3>{title}</h3><p>{copy}</p><span className="af-creation-callout-line" aria-hidden="true" /></article>)}</div></div></div></div></section>

      <section className="af-section af-wrap" id="af-feedback"><SectionHeading number="09A" english="FEEDBACK">等待不应意味着<br />失去反馈。</SectionHeading><div className="af-editorial-grid af-linked-layout"><div className="af-phone-stage"><PhoneFrame screen="loading" /></div><div className="af-linked-details">{[['目标画面 · 保留创作预期', '生成过程中保留目标风格预览，让用户持续明确本次创作的方向。'], ['原图参照 · 连接输入与效果', '以缩略图保留上传的原始素材，方便用户对照本次创作的输入内容。'], ['进度与状态 · 让等待有反馈', '通过进度条、Submitting 状态与排队提示呈现当前进展，减少等待过程中的不确定感。']].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p><span className="af-linked-line" aria-hidden="true" /></article>)}</div></div></section>

      <section className="af-section af-result-section" id="af-result"><div className="af-wrap"><SectionHeading number="09B" english="RESULT & SHARING">让结果可比较、<br />可保存、可传播。</SectionHeading><div className="af-result-grid"><figure><img className="af-result-artwork" src="/assets/ai-face/result-original-portrait.png" alt="原始照片：蓝天下的金发女性人像" width={990} height={1320} loading="lazy" /></figure><figure><img className="af-result-artwork" src="/assets/ai-face/result-anime-portrait.png" alt="风格化效果：黑白动漫女性人像" width={990} height={1320} loading="lazy" /></figure><PhoneFrame screen="result-ads" /></div></div></section>

      <section className="af-section af-wrap" id="af-growth"><SectionHeading number="10" english="GROWTH & EXTENSION" description="覆盖 iOS、Android、iPad 三端应用市场视觉设计，完成多语言本地化与区域适配，重点把控文案、素材、排版及文化差异，确保全球市场的品牌一致性与视觉规范。">从一次生成，<br />延伸到更多创作与分享。</SectionHeading><ImageGallery /></section>

      <section id="af-end" className="af-end af-reflection af-wrap" aria-labelledby="af-reflection-title">
        <header className="af-poster-heading"><div><h2 id="af-reflection-title">项目 · 总结</h2><p>Project Reflection</p></div></header>
        <h2 className="af-reflection-hero">BEYOND <span>UI/UX.</span></h2>
        <p className="af-reflection-subtitle">一次从产品设计到 AIGC 内容生产的能力突破。</p>
        <ol className="af-reflection-growth">{[
          { number: '01', english: 'EXPLORE', title: '技术探索', copy: '从零研究 Stable Diffusion，探索 Prompt 编写、Lora 模型应用和生成参数调整，建立 AI 素材创作能力。' },
          { number: '02', english: 'CREATE', title: '素材主导', copy: '牵头负责 AI Face 平台风格化素材的制作，将生成式 AI 技术应用到实际产品内容生产中。' },
          { number: '03', english: 'SYSTEMIZE', title: '方法沉淀', copy: '将模型配置、提示词组合、参数设置和出图经验整理为标准化文档，形成团队可快速复刻的素材生产流程。' },
        ].map(({ number, title, copy }) => <li key={number}><p className="af-reflection-step"><span>{number}</span></p><h3>{title}</h3><p className="af-reflection-copy">{copy}</p></li>)}</ol>
      </section>
    </main>
  </article>
}
