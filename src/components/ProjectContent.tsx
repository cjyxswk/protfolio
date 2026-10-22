import { ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'
import { worksGallery } from '../data/worksGallery'
import { MoreWorksContent, moreWorksSections } from './MoreWorksContent'
import { site } from '../data/site'
import { VideoProjectContent } from './VideoProjectContent'
import { AutomotiveProjectContent, automotiveProjects } from './AutomotiveProjectContent'
import { FaceSwapMatrix, faceSwapProducts } from './FaceSwapMatrix'
import { SectionRail } from './VideoSectionRail'
import { GstoryProjectContent } from './GstoryProjectContent'

type Work = (typeof worksGallery)[number]

/** Existing project assets rendered in the shared, document-scrolling detail page. */
export function ProjectContent({ work }: { work: Work }) {
  const sections = useMemo<[string, string][]>(() => [
    ['project-overview', '项目概览'],
    ...(work.id === 'chejiajia' || work.id === 'yijie'
      ? Array.from({ length: automotiveProjects[work.id].count }, (_, i): [string, string] => [`project-page-${i + 1}`, `作品第 ${i + 1} 页`])
      : work.id === 'swap'
        ? [['face-swap-responsibilities', '我的职责'] as [string, string], ['face-swap-business-goals', '业务目标'] as [string, string], ['face-swap-positioning', '产品定位'] as [string, string], ['face-swap-strategy', '设计策略'] as [string, string], ['face-swap-core-journey', '核心用户路径'] as [string, string], ...faceSwapProducts.map((product, i): [string, string] => [`project-product-${i + 1}`, product.name])]
        : work.id === 'more' ? moreWorksSections
        : [['project-visual', '作品展示']] as [string, string][]),
  ], [work.id])
  const media = work.id === 'painting'
    ? { cover: '/assets/cover-ai-painting-v2.png', alt: 'AI Painting 产品展示：提示词绘画应用与多种风格的 AI 作品' }
    : site.media[work.mediaKey]
  if (work.id === 'gstory') return <GstoryProjectContent />
  const liveAppUrl = work.id === 'yijie'
    ? 'https://apps.apple.com/us/app/%E6%98%93%E6%8D%B7%E5%8A%A0%E6%B2%B9/id806114204'
    : work.id === 'painting' ? 'https://apps.apple.com/us/app/ai-painting-generate-art-girl/id6446395373' : null
  return <article id="project-overview" data-project={work.id} aria-label={`${work.title}项目详情`} className={`project-detail-content project-modal-preview${work.id === 'more' ? ' project-modal-more' : ''}${work.id === 'video' ? ' project-modal-video' : ''}`}>
        {work.id !== 'video' && <SectionRail sections={sections} />}
        {work.id === 'video' ? <VideoProjectContent /> : <>{liveAppUrl ? <div className="project-modal-title-row"><h1>{work.title}</h1><a className={`project-modal-live-link${work.id === 'painting' ? ' project-modal-live-link-painting' : ''}`} href={liveAppUrl} target="_blank" rel="noopener noreferrer">查看线上 App <ArrowUpRight size={18} aria-hidden="true" /></a></div> : work.id !== 'swap' && <h1>{work.title}</h1>}
        {(work.id === 'face' || work.id === 'painting') && <ul className="project-modal-tags" aria-label={`${work.title}项目职责`}>{['UI设计', 'AE动效与Lottie 交付', '国际化适配', '素材与推广制作'].map(tag => <li key={tag}>{tag}</li>)}</ul>}
        {work.id === 'chejiajia' && <ul className="project-modal-tags" aria-label="车佳佳项目职责">{['产品视觉体系重构', '核心交互流程优化', 'UI 规范与组件库'].map(tag => <li key={tag}>{tag}</li>)}</ul>}
        {work.id === 'face' ? <img id="project-visual" className="project-modal-cover" src="/assets/ai-face-modal.png" alt="AI Face 产品展示：照片裁剪、相似度设置与多风格人像生成" /> : work.id === 'swap' ? <FaceSwapMatrix /> : work.id === 'chejiajia' || work.id === 'yijie' ? <AutomotiveProjectContent project={work.id} /> : work.id === 'more' ? <>
          <ul id="project-types" aria-label="更多作品类型">{['运营设计', '3D建模', 'H5活动海报', '小程序', '动效设计', '更多'].map(label => <li key={label}>{label}</li>)}</ul>
          <MoreWorksContent />
        </> : media?.cover && <img id="project-visual" className="project-modal-cover" src={media.cover} alt={media.alt || `${work.title}作品封面`} />}</>}
  </article>
}
