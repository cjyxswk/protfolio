import { VideoUserPersonas } from './VideoUserPersonas'
import { ChallengeSculpture } from './ChallengeSculpture'
import '../video-product-analysis.css'

const challenges = [
  { title: <>如何降低 AI 模型的<br />理解门槛？</>, detail: '多模型、模式差异、参数配置。' },
  { title: <>如何让生成过程<br />更加可预期？</>, detail: '生成等待、任务状态、异常恢复。' },
  { title: <>如何支持持续的<br />创作与调整？</>, detail: '结果预览、再次生成、历史记录。' },
]
const strategies = [
  { title: '降低理解成本', detail: '清晰组织模型、素材与生成参数。', flow: ['选择模型', '上传素材', '配置参数'] },
  { title: '增强过程反馈', detail: '建立生成任务的完整状态体系。', flow: ['提交任务', '等待生成', '查看结果'] },
  { title: '建立创作闭环', detail: '连接结果预览、参数调整与再次创作。', flow: ['预览结果', '调整参数', '再次创作'] },
]

export function VideoProductAnalysis() {
  return <section className="product-analysis" aria-label="用户场景、体验挑战与设计策略">
    <section aria-labelledby="analysis-personas-title">
      <h3 className="analysis-region-title" id="analysis-personas-title">用户场景分析</h3>
      <VideoUserPersonas />
    </section>
    <section className="analysis-challenges" aria-labelledby="analysis-challenges-title">
      <h3 className="analysis-region-title" id="analysis-challenges-title">关键体验挑战</h3>
      <ol className="analysis-challenge-list">
        {challenges.map((item, index) => <li key={item.detail}>
          <h4>{item.title}</h4><p>{item.detail}</p>
          <ChallengeSculpture kind={index} />
        </li>)}
      </ol>
    </section>
    <section className="analysis-strategies" aria-labelledby="analysis-strategies-title">
      <h3 className="analysis-region-title" id="analysis-strategies-title">设计策略</h3>
      <ol className="analysis-strategy-list">
        {strategies.map((item, index) => <li key={item.title}>
          <span className="analysis-strategy-number" aria-hidden="true">0{index + 1}</span>
          <div className="analysis-strategy-copy"><h4>{item.title}</h4><p>{item.detail}</p></div>
          <div className="analysis-strategy-flow" aria-label={item.flow.join('，然后')}>
            {item.flow.map((label, i) => <span key={label}>{i > 0 && <i aria-hidden="true">→</i>}<b>{label}</b></span>)}
          </div>
        </li>)}
      </ol>
    </section>
  </section>
}
