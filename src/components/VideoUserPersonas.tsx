import { useState } from 'react'
import '../video-user-personas.css'

const personas = [
  { id:'creator', title:'内容创作者', english:'Content Creator', scene:'将图片、插画转化为动态短视频，用于社交媒体内容创作。', goal:'快速上手、高效生成，灵活调整画面效果。', needs:'简化创作入口，降低输入与参数配置的理解成本。', alt:'身穿橄榄绿休闲衬衫、手持手机的女性内容创作者示意人像' },
  { id:'designer', title:'视觉设计师', english:'Visual Designer', scene:'将视觉概念、人物及场景素材转化为动态影像。', goal:'灵活选择模型与参数，探索不同视频表现效果。', needs:'清晰呈现模型能力与参数差异，支持反复调整。', alt:'身穿深灰上衣、手持绘图板和触控笔的男性视觉设计师示意人像' },
  { id:'marketer', title:'营销人员', english:'Marketing Specialist', scene:'将商品图片和活动素材制作成营销视频。', goal:'高效产出、成本可控，适配不同传播场景。', needs:'明确生成成本和视频规格，提升素材复用效率。', alt:'身穿米色西装、手持笔记本的女性营销人员示意人像' },
]

export function VideoUserPersonas() {
  const [active, setActive] = useState(0)
  return <section className="video-personas" aria-label="三类用户场景画像">
    <div className="persona-copy" id="video-persona-detail" aria-live="polite" aria-atomic="true">
      {personas.map((persona,index)=><div key={persona.id} className={`persona-copy-panel${index===active?' is-active':''}`} aria-hidden={index!==active}>
      <h3>{persona.title}</h3><span className="persona-role" lang="en">{persona.english}</span>
      <dl className="persona-details">{[['01 使用场景',persona.scene],['02 核心诉求',persona.goal],['03 设计机会',persona.needs]].map(([label,body])=><div key={label}><dt>{label}</dt><dd>{body}</dd></div>)}</dl>
      </div>)}
    </div>
    <div className="persona-portraits" aria-label="选择用户类型">
      {personas.map((item,index)=><button key={item.id} type="button" className={`persona-portrait${index===active?' is-active':''}`} aria-label={`查看${item.title}画像`} aria-pressed={index===active} aria-controls="video-persona-detail" onClick={()=>setActive(index)}>
        <img src={`/assets/cases/ai-image-to-video/persona-${item.id}-v1.png`} alt={item.alt} loading="lazy" decoding="async"/>
        <span>{item.title}</span>
      </button>)}
    </div>
  </section>
}
