import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { SectionRail } from './VideoSectionRail'
import '../gstory-project.css'

const sections: [string, string][] = [
  ['project-overview', '产品展示'], ['gstory-goals', '项目目标'], ['gstory-tools', '工具矩阵'], ['gstory-design-system', '设计系统'],
  ['gstory-core-operation', '默认状态'],
  ['gstory-task-state', '编辑状态'],
  ['gstory-result-state', '结果状态'],
  ['gstory-page-showcase', '完整页面展示'],
  ['gstory-page-overview', '页面概览'],
]
const tools = [
  { name: 'Watermark Remover', label: '去除水印', image: 'watermark-remover.png', copy: '围绕素材处理，明确上传、处理与结果获取。' },
  { name: 'Background Remover', label: '背景移除', image: 'background-remover.png', copy: '让主体提取与背景处理更直观。' },
  { name: 'Enhancer', label: '画质增强', image: 'enhance.png', copy: '通过前后效果展示，建立处理预期。' },
  { name: 'Video Translator', label: '视频翻译', image: 'video-translator.png', copy: '连接视频内容与多语言使用场景。' },
  { name: 'AI Clip Maker', label: '智能切片', image: 'ai-clip-maker.png', copy: '将不同工具收敛到一致的操作框架。' },
  { name: 'Auto Subtitle Generator', label: '自动字幕', image: 'auto-subtitle-generator.png', copy: '统一任务反馈与结果导出体验。' },
]
const guides = [
  { id: 'gstory-colors', file: 'colors.png', label: '颜色规范', english: 'COLOR SYSTEM', width: 1920, height: 2150 },
  { id: 'gstory-type', file: 'typography.png', label: '字体规范', english: 'TYPOGRAPHY', width: 1920, height: 2165 },
  { id: 'gstory-buttons', file: 'buttons.png', label: '按钮规范', english: 'BUTTON SYSTEM', width: 1920, height: 2087 },
  { id: 'gstory-breakpoints', file: 'breakpoints.png', label: '响应式设计', english: 'RESPONSIVE DESIGN', width: 1920, height: 2206 },
]

const overviewPages: { file: string; label: string; height: number; width?: number }[] = [
  { file: 'image-library-v2.jpg', label: '图片素材库', height: 3065 },
  { file: 'video-enhancer.png', label: '视频画质增强', height: 7691 },
  { file: 'video-background.png', label: '视频去除背景', height: 8505 },
  { file: 'sign-up.png', label: '注册', height: 1080 },
  { file: 'history.png', label: '历史记录', height: 1080 },
  { file: 'ai-highlight.png', label: 'AI Highlight', height: 8364 },
  { file: 'auto-subtitle.png', label: 'AI 字幕生成器', height: 8364 },
  { file: 'pricing.png', label: '付费升级', height: 3191 },
]

function Heading({ title, english, subtitle }: { title: string; english: string; subtitle: string }) {
  return <header className="gs-heading"><span>{english}</span><h2>{title}</h2><p>{subtitle}</p></header>
}

export function GstoryProjectContent() {
  const journey = useRef<HTMLDivElement>(null)
  const [route, setRoute] = useState({ width: 1200, height: 1100, path: '' })
  useEffect(() => {
    const root = journey.current
    if (!root) return
    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const tags = root.querySelectorAll('.gs-step-tag')
        const devices = root.querySelectorAll('.gs-journey-device')
        if (tags.length < 2 || devices.length < 2) return
        const box = root.getBoundingClientRect()
        const first = tags[0].getBoundingClientRect(), last = tags[1].getBoundingClientRect()
        const upper = devices[0].getBoundingClientRect(), lower = devices[1].getBoundingClientRect()
        const sx = first.right - box.left, sy = first.top - box.top + first.height / 2
        const ex = last.right - box.left, ey = last.top - box.top + last.height / 2
        const outer = Math.min(box.width - 20, upper.right - box.left + 36)
        const r = Math.min(26, Math.max(6, (ey - sy) / 4))
        let path = `M ${sx} ${sy} H ${outer-r} Q ${outer} ${sy} ${outer} ${sy+r} V ${ey-r} Q ${outer} ${ey} ${outer-r} ${ey} H ${ex}`
        if (tags.length > 2 && devices.length > 2) {
          const third = tags[2].getBoundingClientRect()
          const left = Math.max(18, lower.left - box.left - 28)
          const endX = third.left - box.left + 1, endY = third.top - box.top + third.height / 2
          const lowerRadius = Math.min(18, Math.max(4, (endX - left) / 2))
          const corridor = lower.right - box.left + 24
          const bridgeY = lower.top - box.top - 32
          path += ` H ${corridor+lowerRadius} Q ${corridor} ${ey} ${corridor} ${ey-lowerRadius} V ${bridgeY+lowerRadius} Q ${corridor} ${bridgeY} ${corridor-lowerRadius} ${bridgeY} H ${left+lowerRadius} Q ${left} ${bridgeY} ${left} ${bridgeY+lowerRadius} V ${endY-lowerRadius} Q ${left} ${endY} ${left+lowerRadius} ${endY} H ${endX}`
        }
        setRoute({ width: box.width, height: box.height, path })
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    root.querySelectorAll('.gs-step-tag,.gs-journey-device').forEach(node => observer.observe(node))
    window.addEventListener('resize', measure)
    measure()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  const [zoom, setZoom] = useState<{ src: string; label: string } | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!zoom) return
    const node = dialog.current
    node?.showModal()
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { node?.close(); document.body.style.overflow = before }
  }, [zoom])
  const showImage = (src: string, label: string) => setZoom({ src, label })
  return <article id="project-overview" data-project="gstory" className="gstory-case" aria-label="Gstory 产品设计作品展示">
    <SectionRail sections={sections} />
    <section className="gs-hero" aria-labelledby="gs-title">
      <div className="gs-hero-copy"><p className="gs-eyebrow">Web产品设计·0-1</p><h1 id="gs-title">Gstory</h1><p>围绕工具选择、素材处理与结果获取，<br className="gs-mobile-break" />构建清晰、一致的多工具使用体验。</p><a href="https://www.gstory.ai/" target="_blank" rel="noreferrer">查看线上产品 <ArrowUpRight size={18} /></a></div>
      <img id="project-visual" className="gs-hero-image" src="/assets/gstory-hero-laptop-blue-v2.png" width={1448} height={1086} alt="黑色笔记本上的 GStory 首页展示，浅蓝色摄影棚与混凝土台座" fetchPriority="high" />
    </section>

    <section id="gstory-goals" className="gs-section gs-goals">
      <header className="gs-goals-heading"><p>BUSINESS & USER INSIGHTS</p><h2>业务目标与用户需求洞察</h2><div>围绕工具发现、素材处理与结果获取，构建清晰、一致的多工具使用体验。</div></header>
      <div className="gs-goals-map">
      <aside className="gs-goals-side"><h3>用户诉求</h3><ul><li>快速找到合适工具</li><li>降低操作学习成本</li><li>清晰获取处理结果</li></ul></aside>
      <div className="gs-goal-circles">{[
        ['业务目标', '连接创作需求', ['承接多种素材处理需求', '帮助用户发现适合的工具', '衔接工具使用与结果获取']],
        ['设计目标', '建立一致体验', ['统一工具入口与操作框架', '明确上传要求与任务反馈', '降低跨工具使用的学习成本']],
        ['衡量指标', '关注关键路径', ['工具入口点击与使用', '上传及处理任务完成', '处理结果预览与导出']],
      ].map(([label, title, copy], index) => <div key={String(label)} className="gs-goal-circle"><span>0{index + 1} / {label}</span><h3>{title}</h3><p>{(copy as string[]).map(line => <span key={line}>{line}</span>)}</p></div>)}</div>
      <aside className="gs-goals-side"><h3>优化策略</h3><ul><li>按任务组织工具入口</li><li>统一上传与处理流程</li><li>强化状态与结果反馈</li></ul></aside>
      </div>
    </section>

    <section id="gstory-tools" className="gs-section">
      <Heading title="核心功能一览" english="CORE FEATURES" subtitle="涵盖图片与视频去水印、去背景、画质增强，以及视频翻译、长视频切片和自动字幕生成。" />
      <div className="gs-tool-grid">{tools.map(({ name, label, image }) => <article key={name}><img className="gs-tool-image" src={`/assets/gstory/${image.replace('.png', name === 'Video Translator' ? '-v3.png' : '-v2.png')}`} width={580} height={290} alt={`${label}功能效果展示`} loading="lazy" /><div className="gs-tool-copy"><h3>{name}</h3></div></article>)}</div>
    </section>

    <section id="gstory-design-system" className="gs-section gs-design-system">
      <Heading english="DESIGN SYSTEM" title="设计系统" subtitle="统一颜色、字体、按钮与响应式规则，为多工具体验建立一致的设计基础。" />
      <div className="gs-design-grid">{guides.map(({ id, file, label, width, height }) => <button key={id} onClick={() => showImage(`/assets/gstory/${file}`, label)} aria-label={`放大查看${label}`}><img src={`/assets/gstory/${file}`} alt={`GStory ${label}原始设计文档`} width={width} height={height} loading="lazy" /></button>)}</div>
    </section>

    <div className="gs-operation-journey" ref={journey}>
      <Heading english="WORKSPACE FLOW" title="操作区流程" subtitle="以视频翻译为例，展示素材上传、效果预览与参数设置的关键步骤" />
      <span className="gs-journey-ghost" aria-hidden="true">Start<br />with<br />ease.</span>
      <svg className="gs-journey-path" viewBox={`0 0 ${route.width} ${route.height}`} aria-hidden="true"><path d={route.path} /><circle cx={route.path ? Number(route.path.split(' ')[1]) : 0} cy={route.path ? Number(route.path.split(' ')[2]) : 0} r="3" /></svg>
      <section id="gstory-core-operation" className="gs-journey-step gs-journey-step-first">
        <div className="gs-journey-copy"><span className="gs-step-tag">Step 1</span><h2>默认状态</h2><ul><li>上传入口：支持拖放、粘贴或 URL，明确文件限制。</li><li>效果预览：展示当前工具的多语言翻译效果。</li><li>示例素材：无需准备文件，即可开始体验。</li></ul></div>
        <button className="gs-journey-device" onClick={() => showImage('/assets/gstory/video-translator-default-v4.png', '视频翻译 — 默认状态')} aria-label="放大查看视频翻译默认状态"><img src="/assets/gstory/video-translator-default-v4.png" width={1920} height={1080} alt="黑色平板模型中的 GStory 视频翻译默认页面：视频上传入口、多语言翻译效果预览与示例素材" loading="lazy" /></button>
      </section>
      <section id="gstory-task-state" className="gs-journey-step gs-journey-step-second">
        <div className="gs-journey-second-layout"><button className="gs-journey-device" onClick={() => showImage('/assets/gstory/video-translator-task-state-v2.png', '视频翻译 — 任务处理状态')} aria-label="放大查看视频翻译任务处理状态"><img src="/assets/gstory/video-translator-task-state-v2.png" width={1920} height={1080} alt="GStory 视频翻译工作区：素材管理、内容预览与参数设置" loading="lazy" /></button>
        <div className="gs-journey-copy"><span className="gs-step-tag">Step 2</span><h2>编辑状态</h2><ul><li>素材管理：切换、追加与删除已上传文件。</li><li>内容预览：按图片或视频类型适配查看方式。</li><li>参数设置：配置语言、说话人数、唇形同步与字幕等。</li></ul></div></div>
      </section>
      <section id="gstory-result-state" className="gs-journey-step gs-journey-step-third">
        <div className="gs-journey-third-layout"><div className="gs-journey-copy"><span className="gs-step-tag">Step 3</span><h2>结果状态</h2><ul><li>结果预览：切换并播放已完成的翻译视频。</li><li>字幕管理：控制字幕显示，支持单独下载字幕。</li><li>结果导出：下载视频，或继续添加其他翻译语言。</li></ul></div><button className="gs-journey-device" onClick={() => showImage('/assets/gstory/video-translator-result.png', '视频翻译 — 结果预览与导出')} aria-label="放大查看视频翻译结果页"><img src="/assets/gstory/video-translator-result.png" width={1920} height={1080} alt="GStory 视频翻译结果页：视频预览、字幕下载、添加语言与下载操作" loading="lazy" /></button></div>
      </section>
    </div>

    <section id="gstory-page-showcase" className="gs-page-showcase">
      <span className="gs-showcase-word gs-showcase-word-left" aria-hidden="true">WEB</span><span className="gs-showcase-word gs-showcase-word-right" aria-hidden="true">DESIGN</span>
      <button className="gs-showcase-screen" onClick={() => showImage('/assets/gstory/homepage-translation-showcase-v3.png', 'GStory 首页翻译入口完整设计')} aria-label="放大查看 GStory 首页完整设计"><img src="/assets/gstory/homepage-translation-showcase-v3.png" width={1920} height={4988} alt="GStory 首页翻译入口完整设计：首屏、视频翻译演示、应用场景、工具集合与页脚" loading="lazy" /></button>
    </section>
    <section id="gstory-page-overview" className="gs-section gs-page-overview">
      <Heading english="PAGE OVERVIEW" title="页面概览" subtitle="从历史内容管理、付费升级到工具衔接，呈现 GStory 更完整的产品体验。" />
      <div className="gs-overview-gallery">{[[0, 1], [2, 3], [4, 5], [6, 7]].map((indices, column) => <div className="gs-overview-column" key={column}>{indices.map(index => overviewPages[index]).map(({ file, label, height, width = 1920 }) => <figure key={file} className="gs-overview-page"><img src={`/assets/gstory/page-overview/${file}`} alt={`GStory ${label}页面预览`} width={width} height={height} loading="lazy" /></figure>)}</div>)}</div>
    </section>
    {zoom && <dialog ref={dialog} className="gs-lightbox" aria-label={zoom.label} onCancel={() => setZoom(null)} onClick={event => { if (event.target === event.currentTarget) setZoom(null) }}><button className="gs-lightbox-close" aria-label="关闭原图" onClick={() => setZoom(null)}><X size={24} /></button><img src={zoom.src} alt={zoom.label} /></dialog>}
  </article>
}
