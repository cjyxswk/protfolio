import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { worksGallery } from '../data/worksGallery'
import { MoreWorksFolder } from './MoreWorksFolder'
import { site } from '../data/site'
import { VideoProjectContent } from './VideoProjectContent'
import { AutomotiveProjectContent } from './AutomotiveProjectContent'
import { FaceSwapMatrix } from './FaceSwapMatrix'

type Work = (typeof worksGallery)[number]

/** Standalone cover preview; no legacy case pages are loaded. */
export function ProjectModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current!.showModal()
    closeButton.current?.focus({ preventScroll: true })
    return () => {
      dialog.current?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  const media = site.media[work.mediaKey]
  const liveAppUrl = work.id === 'yijie'
    ? 'https://apps.apple.com/us/app/%E6%98%93%E6%8D%B7%E5%8A%A0%E6%B2%B9/id806114204'
    : work.id === 'painting' ? 'https://apps.apple.com/us/app/ai-painting-generate-art-girl/id6446395373'
    : work.id === 'gstory' ? 'https://www.gstory.ai/' : null
  return createPortal(<dialog ref={dialog} className="project-modal" data-project={work.id} aria-label={`${work.title}项目详情`}
    onCancel={event => { event.preventDefault(); onClose() }}>
    <div className="project-modal-toolbar">
      <button ref={closeButton} className="project-modal-close" type="button" aria-label="关闭项目详情" onClick={onClose}><X size={28} strokeWidth={2} aria-hidden="true" /></button>
    </div>
    <div className="project-modal-surface">
      <div className={`project-modal-preview${work.id === 'more' ? ' project-modal-more' : ''}${work.id === 'video' ? ' project-modal-video' : ''}`}>
        {work.id === 'video' ? <VideoProjectContent /> : <>{liveAppUrl ? <div className="project-modal-title-row"><h1>{work.title}</h1><a className={`project-modal-live-link${work.id === 'painting' ? ' project-modal-live-link-painting' : ''}${work.id === 'gstory' ? ' project-modal-live-link-gstory' : ''}`} href={liveAppUrl} target="_blank" rel="noopener noreferrer">{work.id === 'gstory' ? '查看线上产品' : '查看线上 App'} <ArrowUpRight size={18} aria-hidden="true" /></a></div> : <h1>{work.title}</h1>}
        {work.id === 'swap' && <ul className="project-modal-tags" aria-label="Face Swap 项目职责">{['多产品 0–1 设计', '交互流程与视觉体系', '通用组件与规范沉淀', 'AI 辅助前端交付'].map(tag => <li key={tag}>{tag}</li>)}</ul>}
        {work.id === 'gstory' && <ul className="project-modal-tags" aria-label="Gstory 项目职责">{['多工具平台架构', '产品调研与方案设计', '工作流与交互设计', '功能素材与视觉设计'].map(tag => <li key={tag}>{tag}</li>)}</ul>}
        {(work.id === 'face' || work.id === 'painting') && <ul className="project-modal-tags" aria-label={`${work.title}项目职责`}>{['UI设计', 'AE动效与Lottie 交付', '国际化适配', '素材与推广制作'].map(tag => <li key={tag}>{tag}</li>)}</ul>}
        {work.id === 'chejiajia' && <ul className="project-modal-tags" aria-label="车佳佳项目职责">{['产品视觉体系重构', '核心交互流程优化', 'UI 规范与组件库'].map(tag => <li key={tag}>{tag}</li>)}</ul>}
        {work.id === 'swap' ? <FaceSwapMatrix /> : work.id === 'chejiajia' || work.id === 'yijie' ? <AutomotiveProjectContent project={work.id} /> : work.id === 'more' ? <>
          <div className="project-modal-folder"><MoreWorksFolder /></div>
          <ul aria-label="更多作品类型">{['小程序', 'H5海报活动', '宣传视频', '线下物料', '动效设计', '更多'].map(label => <li key={label}>{label}</li>)}</ul>
        </> : media?.cover && <img className="project-modal-cover" src={media.cover} alt={media.alt || `${work.title}作品封面`} />}</>}
      </div>
    </div>
  </dialog>, document.body)
}
