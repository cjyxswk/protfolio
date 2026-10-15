import { ArrowUpRight } from 'lucide-react'
import { VideoDesignShot, VideoEvolutionScreens, VideoWorkflowScreens } from './VideoDesignScreens'
import '../video-project.css'

const challenges = [
  ['降低操作门槛', '让用户快速完成素材上传和生成配置。'],
  ['提升过程透明度', '明确参数、生成成本及任务执行状态。'],
  ['支持持续扩展', '在新增模型和功能时保持统一的交互体验。'],
]
const users = [
  ['内容创作者', '快速制作社交媒体视频，关注创作效率和操作便利性。'],
  ['视觉设计师', '探索不同 AI 模型和视觉效果，关注参数控制及结果质量。'],
  ['营销人员', '将商品图片转化为宣传视频，关注制作成本与交付效率。'],
]
const experiences = [
  ['简化创作流程', '将模型选择、素材上传、Prompt 输入、视频参数及生成操作整合为连续工作流，帮助用户快速完成从图片到视频的创作。'],
  ['灵活的模型与参数配置', '针对不同 AI 模型动态展示可用参数，通过信息分组、默认值及选项限制减少不必要的操作，使复杂功能保持清晰。'],
  ['完整的生成状态反馈', '围绕生成中、生成成功、生成失败等状态设计统一反馈，支持 Retry、Download、Prompt Copy 等操作，让用户清楚理解任务进度并快速进行下一步。'],
  ['Credits 与结果管理', '将生成成本与操作按钮关联展示，并在结果中保留模型、Prompt、原始素材及生成参数，便于查看、复用与再次生成。'],
]

export function VideoProjectContent() {
  return <article className="video-project">
    <header className="video-project-hero">
      <div className="video-project-title-row"><div className="video-project-brand"><h1>AI Image To Video</h1></div><a className="video-project-link" href="https://aiimagetovideo.pro/" target="_blank" rel="noopener noreferrer">查看线上产品 <ArrowUpRight size={18} aria-hidden="true" /></a></div>
      <ul className="project-modal-tags" aria-label="AI Image To Video 项目职责">{['高保真原型', '产品调研', '交互设计', 'AI Coding 前端交付'].map(tag => <li key={tag}>{tag}</li>)}</ul>
    </header>
    <VideoDesignShot file="generation-result" title="图生视频工作台 · 素材输入、参数配置与生成结果" eager />
    <section className="video-project-section"><h2><span>01 / Project Overview</span>项目概览</h2><div><p>AI Image To Video 是一款面向全球用户的 AI 视频生成平台，用户通过上传图片、输入 Prompt、选择 AI 模型及配置视频参数，即可将静态图片转化为动态视频。</p><h3>项目职责</h3><p>承担核心生成流程的 UI/UX 设计，涵盖信息架构、交互设计、视觉规范、任务状态及响应式适配，并持续参与新模型与功能的设计迭代。</p></div></section>
    <section className="video-project-section"><h2><span>02 / Design Challenge</span>设计思考</h2><div><h3>如何让复杂的 AI 视频生成过程，变得简单且可控？</h3><p>随着 AI 模型不断增加，不同模型对应的参数、生成能力及 Credits 消耗也各不相同。</p><p>设计需要解决三个核心问题：</p><ul className="video-project-list">{challenges.map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ul></div></section>
    <section className="video-project-section"><h2><span>03 / Users &amp; Scenarios</span>用户与场景</h2><div><ul className="video-project-list">{users.map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ul><p>设计以快速创作为主线，同时满足不同用户对灵活配置和结果控制的需求。</p><p className="video-project-note">以上为基于产品使用场景整理的用户类型，并非经过访谈验证的定量用户画像。</p></div></section>
    <section className="video-project-section"><h2><span>04 / Core Experience</span>核心体验</h2><div className="video-project-experiences">{experiences.map(([title, body], index) => <div key={title}><span className="video-project-step">0{index + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div><VideoWorkflowScreens /></section>
    <section className="video-project-section"><h2><span>05 / Visual Design</span>视觉设计</h2><div><h3>让创作内容成为视觉焦点。</h3><p>围绕 AI 视频生成场景，建立简洁统一的界面语言，通过清晰的字体层级、操作状态、组件样式及间距规范，突出视频预览和核心生成操作。</p><p>设计系统覆盖按钮、输入框、模型选择、素材上传、参数配置、结果卡片及任务反馈等组件，保证不同功能之间的体验一致性。</p><ul className="video-project-components" aria-label="设计系统覆盖范围">{['按钮', '输入框', '模型选择', '素材上传', '参数配置', '结果卡片', '任务反馈'].map(item => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="video-project-section"><h2><span>06 / Responsive &amp; Evolution</span>响应式与功能扩展</h2><div><h3>Desktop &amp; Mobile</h3><p>桌面端充分利用横向空间，合理区分配置区、预览区与结果区；移动端根据屏幕尺寸重新组织内容，通过参数折叠及底部固定操作区域，保证完整的生成体验。</p><h3>持续迭代</h3><p>参与 AI Video Extend、模型推荐等新增能力的竞品研究与交互方案设计，复用已有生成流程及组件体系，支持平台持续扩展。</p></div><VideoEvolutionScreens /></section>
    <section className="video-project-section"><h2><span>07 / Outcome</span>项目总结</h2><div><p>通过 AI Image To Video 项目，完成从素材输入、模型配置、任务反馈到生成结果的核心体验设计，并建立适用于多模型、多状态及跨端场景的交互结构。</p><p>项目不仅关注单个页面的视觉表现，更关注复杂 AI 能力如何转化为清晰、高效、可持续迭代的产品体验。</p><p className="video-project-closing" lang="en">Design for Clarity.<br />Create with Freedom.</p></div></section>
  </article>
}
