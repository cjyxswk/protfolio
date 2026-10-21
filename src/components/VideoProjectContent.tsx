import type { ReactNode } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { ImageToVideoDemo } from './ImageToVideoDemo'
import { BusinessGoalIcon } from './BusinessGoalIcon'
import { VideoVisualSpecs } from './VideoVisualSpecs'
import { VideoContribution } from './VideoContribution'
import { VideoProductAnalysis } from './VideoProductAnalysis'
import { VideoSectionRail } from './VideoSectionRail'
import { VideoResponsiveShowcase } from './VideoResponsiveShowcase'
import { VideoProjectResults } from './VideoProjectResults'
import '../video-project.css'
import '../video-typography.css'

const chapters = ['业务目标', '设计目标', '产品分析', '架构与流程', '生成流程', '视觉体系', '多端适配', '交付与验证', '项目结果与复盘']

function CaseSection({ number, title, english, children }: { number: number; title?: string; english: string; children: ReactNode }) {
  return <section id={`video-case-${number}`} className="video-project-section" aria-labelledby={`video-case-title-${number}`}>
    <header className="video-chapter-heading">
      <h2 id={`video-case-title-${number}`}><span className="video-chapter-chinese">{chapters[number - 1]}</span><span className="video-chapter-script" lang="en" aria-hidden="true">{english}</span></h2>
    </header>
    {title && <p className="video-chapter-intent">{title}</p>}
    {children}
  </section>
}

export function VideoProjectContent() {
  return <article className="video-project">
    <VideoSectionRail />
    <header id="video-project-overview" className="video-project-hero">
      <div className="video-project-introduction">
        <h1>AI Image To Video</h1>
        <p className="video-project-summary">面向图片与视频创作场景的 AI 生成平台体验设计。</p>
        <dl className="video-project-overview">
          <div><dt>角色</dt><dd>UI/UX 设计师</dd></div>
          <div><dt>类型</dt><dd>AI 创作平台 / Web</dd></div>
          <div><dt>负责内容</dt><dd>产品分析、交互流程、高保真界面设计</dd></div>
          <div><dt>辅助功能交付</dt><dd>邀请好友、联盟等功能采用 AI Coding</dd></div>
        </dl>
      </div>
      <div className="video-cover">
        <div className="video-cover-topline"><span>AI IMAGE TO VIDEO</span><span className="video-cover-edition">WEB EXPERIENCE <i aria-hidden="true" /></span></div>
        <div className="video-cover-heading"><p>AI VIDEO CREATION · UI/UX DESIGN</p><h2>让静态灵感，<br /><em>生动呈现。</em></h2><p className="video-cover-description">从一张图片出发，连接输入、生成与再创作。</p><div className="video-cover-cta"><a className="video-project-link" href="https://aiimagetovideo.pro/" target="_blank" rel="noopener noreferrer">查看线上产品 <ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
        <div className="video-cover-devices" aria-label="Reference to Video 桌面端与移动端工作台设计展示">
          <div className="video-cover-desktop"><div className="video-cover-browser" aria-hidden="true"><span>● ● ●</span><span>aiimagetovideo.pro</span></div><img src="/assets/cases/ai-image-to-video/real/reference-to-video.png" alt="AI Image To Video 桌面端创作工作台设计稿" decoding="async" /></div>
          <div className="video-cover-phone">
            <span className="video-cover-phone-speaker" aria-hidden="true" />
            <div className="video-phone-screen">
              <div className="video-phone-scroll" tabIndex={0} role="region" aria-label="移动端工作台设计预览，可上下滚动">
                <div className="video-phone-page"><img src="/assets/cases/ai-image-to-video/reference-to-video-mobile.png" alt="Reference to Video 移动端创作工作台设计稿" decoding="async" /></div>
              </div>
              <div className="video-phone-action" aria-hidden="true"><div><span>Credits required: ⓘ</span><span>10 Credits</span></div><span className="video-phone-generate">Generate <b>✦ 10</b></span><i /></div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <CaseSection number={1} title="从首次尝试，到持续创作与价值转化" english="Business Goals">
      <div className="video-goals-intro">
        <p>面向海外内容创作者，将图片转视频能力转化为易理解、可持续使用的创作服务。围绕首次生成、重复创作与能力扩展，明确产品体验需要承接的三个业务方向。</p>
      </div>
      <div className="video-goals-stage">
        <div className="video-business-sculpture" aria-hidden="true" />
        <ul className="video-goal-cards" aria-label="三个业务目标">
          {[
            { title: '构建 AI 视频平台', description: '围绕图片转视频核心场景，打造低门槛、高效率的 AI 创作工具，推动产品从概念到上线落地。', icon: 'platform' },
            { title: '打造一站式创作体验', description: '整合多种 AI 视频模型与创作工具，构建完整的内容生成流程，满足用户多样化的创作需求。', icon: 'experience' },
            { title: '建立商业化增长体系', description: '结合积分与订阅机制，构建从免费体验到付费使用的商业路径，支持产品持续运营与增长。', icon: 'growth' },
          ].map(({ title, description, icon }, index) => <li key={title}>
            <div className="video-goal-icon"><BusinessGoalIcon kind={icon} /></div>
            <h3>{index + 1}. {title}</h3><p>{description}</p>
          </li>)}
        </ul>
      </div>
    </CaseSection>
    <CaseSection number={2} english="Design Goals">
      <div className="video-design-goals">
        <div className="video-design-goal-feature">
          <div className="video-design-goal-copy"><h3>让 AI 视频创作<br />更简单、更自由</h3><p>打造高效、直观、易上手的<br className="video-design-goal-break" /> AI 视频创作体验。</p>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="url(#design-goal-arrow-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <defs><linearGradient id="design-goal-arrow-gradient" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#F4FFD7" stopOpacity=".45" /><stop offset=".45" stopColor="#7DA839" /><stop offset="1" stopColor="#253A0B" /></linearGradient></defs>
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </div>
          <ImageToVideoDemo />
        </div>
        <ul className="video-design-goal-cards" aria-label="三个设计目标">
          {[
            { title: '降低创作门槛', items: ['简化操作路径', '降低理解成本', '强化操作引导'] },
            { title: '构建高效路径', items: ['优化信息架构', '完善生成反馈', '形成创作闭环'] },
            { title: '统一设计体系', items: ['统一品牌视觉', '构建组件体系', '支持多端与扩展'] },
          ].map(({ title, items }, index) => <li key={title}>
            <h3>{index + 1}. {title}</h3>
            <div className="video-design-goal-checklist" role="list" aria-label={title}>{items.map(item => <p key={item} role="listitem"><Check size={19} strokeWidth={2} aria-hidden="true" /><span>{item}</span></p>)}</div>
          </li>)}
        </ul>
      </div>
    </CaseSection>
    <VideoContribution />

    <CaseSection number={3} title="从创作场景出发，洞察用户需求" english="Product Analysis">
      <VideoProductAnalysis />
    </CaseSection>

    <CaseSection number={6} english="Visual System">
      <VideoVisualSpecs />
    </CaseSection>

    <CaseSection number={7} english="Responsive Design">
      <VideoResponsiveShowcase />
    </CaseSection>

    <CaseSection number={9} english="Project Results">
      <VideoProjectResults />
    </CaseSection>
  </article>
}
