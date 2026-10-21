import { ArrowDownToLine, ImagePlus, Play, Plus, Sparkles } from 'lucide-react'
import '../video-core-experience.css'

const steps = [
  { label: '01 / INPUT EXPERIENCE', title: <>Make creation<br />easy to start.</>, body: '围绕上传构建清晰的输入入口，呈现支持格式、素材数量与预览状态，让用户从第一步就知道如何开始。', file: 'reference-to-video', name: '素材输入' },
  { label: '02 / MODEL & SETTINGS', title: <>Powerful options.<br />Clear decisions.</>, body: '按模型、Prompt、画幅、时长与分辨率组织设置，将复杂能力拆成可理解的选择，减少配置过程中的认知负担。', file: 'reference-to-video', name: '模型与设置' },
  { label: '03 / GENERATION FEEDBACK', title: <>Make waiting<br />understandable.</>, body: '让提交、排队、生成与完成成为连续的状态体验。在等待时保留输入上下文，通过明确的反馈帮助用户理解当前进展。', file: 'generating', name: '生成反馈' },
  { label: '04 / RESULT EXPERIENCE', title: <>From output<br />to next creation.</>, body: '将预览、下载与重新编辑集中在结果附近，保留原始素材和生成参数，让每一次输出都能成为下一轮创作的起点。', file: 'results-management', name: '结果与再创作' },
]

function ExperiencePanel({ index }: { index: number }) {
  if (index === 0) return <div className="core-demo-inner">
    <span className="core-demo-label">SOURCE IMAGE</span>
    <div className="core-upload"><ImagePlus size={32} strokeWidth={1.4} /><strong>Drop your image here</strong><span>PNG · JPG · WEBP</span><small>Click, paste or drag to upload</small></div>
    <div className="core-upload-foot"><span>Reference images</span><span>0 / 14</span></div>
  </div>
  if (index === 1) return <div className="core-demo-inner">
    <span className="core-demo-label">CREATE SETTINGS</span>
    <div className="core-setting-line"><span>Model</span><strong>Kling 3.0 <span>⌄</span></strong></div>
    <div className="core-setting-prompt"><span>Prompt</span><div>A cinematic, gentle camera push-in...</div></div>
    <div className="core-setting-group"><span>Aspect ratio</span><div><b>Auto</b><i>9:16</i><i>16:9</i><i>1:1</i></div></div>
    <div className="core-setting-group"><span>Resolution</span><div><b>480p</b><i>768p</i></div></div>
  </div>
  if (index === 2) return <div className="core-demo-inner">
    <span className="core-demo-label">GENERATING VIDEO</span>
    <div className="core-generating-symbol"><Sparkles size={42} strokeWidth={1.4} /></div>
    <div className="core-progress-track"><span /></div>
    <div className="core-generating-caption"><strong>Creating your video...</strong><span>Processing</span></div>
    <div className="core-skeleton long" /><div className="core-skeleton short" />
    <small className="core-demo-note">状态示意 · 非实时生成进度</small>
  </div>
  return <div className="core-demo-inner">
    <span className="core-demo-label">YOUR VIDEO IS READY</span>
    <div className="core-result-preview"><span className="core-result-ring" /><span className="core-result-play"><Play size={24} fill="currentColor" strokeWidth={0} /></span><small>VIDEO PREVIEW</small></div>
    <div className="core-result-actions"><div>Download result <ArrowDownToLine size={15} /></div><span>Re-edit <Plus size={14} /></span></div>
  </div>
}

export function VideoCoreExperience() {
  return <div className="core-experience-board">
    <div className="core-experience-intro"><h3>Every step,<br />intentionally designed.</h3><p>从素材输入到结果复用，把复杂的 AI 视频能力转化为清晰、连贯的创作体验。</p></div>
    <ol className="core-experience-steps">
      {steps.map((step, index) => <li id={`video-generation-step-${index + 1}`} className="core-experience-step" key={step.label}>
        <div className="core-step-copy"><span>Step{index + 1}</span><h4>{step.title}</h4><p>{step.body}</p></div>
        <div className="core-step-panel" role="img" aria-label={`${step.name}界面设计示意`}><ExperiencePanel index={index} /></div>
      </li>)}
    </ol>
  </div>
}
