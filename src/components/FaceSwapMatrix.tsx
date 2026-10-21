import { ArrowUpRight, ScanFace, LayoutGrid, Workflow, PanelsTopLeft, Compass, Upload, Sparkles, Eye, Download } from 'lucide-react'

export const faceSwapProducts = [
  { name: 'Deep Swap AI', url: 'https://deepswapai.io/', image: '/assets/cases/face-swap/deep-swap-ai-cover-v2.png' },
  { name: 'AI Face Swap Video', url: 'https://aifaceswapvideo.online/', image: '/assets/cases/face-swap/ai-face-swap-video-cover-v3.png' },
  { name: 'Face Swap AI', url: 'https://faceswapai.online/', image: '/assets/cases/face-swap/face-swap-ai-cover-v2.png' },
]

const responsibilities = [
  { title: '产品体验规划', items: ['信息架构', '功能组织和核心用户路径'] },
  { title: 'UI/UX 设计', items: ['上传、换脸编辑、生成', '预览、结果管理的完整体验'] },
  { title: '多平台设计', items: ['产品界面差异化', '品牌视觉体系与响应式设计'] },
  { title: '商业化设计', items: ['Credits、订阅、权益展示', '购买流程'] },
  { title: '设计交付', items: ['交互规则、组件规范', '多状态适配及开发验收'] },
]

const positioningRows = [
  ['核心入口', '图片 + 多工具', '图片换脸', '视频换脸'],
  ['功能结构', '多功能标签切换', '轻量上传优先', '视频操作优先'],
  ['重点体验', '工具覆盖', '快速生成', '视频处理流程'],
  ['历史内容', '需进一步核实', 'Recent Results、素材', 'History'],
  ['商业化呈现', '免费试用引导', 'Credits、Pricing', 'Pricing'],
  ['设计侧重点', '功能统一', '低门槛与留存', '复杂状态管理'],
]

const businessGoals = [
  { title: '多站点业务布局', copy: '围绕不同搜索需求和创作场景，建立独立产品入口，扩展用户触达渠道。' },
  { title: '提升生成转化', copy: '降低上传、素材选择及参数操作的理解成本，缩短从进入网站到首次生成的路径。' },
  { title: '商业化承接', copy: '通过免费体验、Credits 和订阅权益设计，建立从体验到付费的产品路径。' },
  { title: '设计资产复用', copy: '沉淀跨平台组件、交互状态和功能流程，在保证品牌差异的前提下提高迭代效率。' },
]

export function FaceSwapMatrix() {
  return <>
    <section className="face-swap-pages-showcase" aria-labelledby="face-swap-experiences-title">
      <header className="face-swap-showcase-heading"><h1 id="face-swap-experiences-title">One Technology, Multiple Experiences</h1><p>基于统一 AI 换脸能力，打造面向不同用户场景的多平台产品体验。</p><ul className="project-modal-tags" aria-label="Face Swap 项目职责">{['多产品 0–1 设计', '交互流程与视觉体系', '通用组件与规范沉淀', 'AI 辅助前端交付'].map(tag => <li key={tag}>{tag}</li>)}</ul></header>
      <div className="face-swap-showcase-visual"><img src="/assets/cases/face-swap/product-pages-showcase-v1.png" width={1920} height={2388} alt="Face Swap 产品矩阵页面展示：Deep Swap AI、Face Swap AI 与 AI Face Swap Video 网站设计" loading="lazy" /></div>
    </section>
    <section id="face-swap-responsibilities" className="face-swap-responsibilities" aria-labelledby="face-swap-role-title">
      <header className="face-swap-role-heading"><span>MY ROLE</span><h2 id="face-swap-role-title">我的职责</h2></header>
      <div className="face-swap-role-map">
        <svg className="face-swap-role-lines" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1"><path d="M270 80 Q435 0 600 80 Q765 0 930 80 M270 80 Q450 100 435 330 M600 80 Q435 140 435 330 M600 80 Q765 140 765 330 M930 80 Q750 100 765 330 M435 330 Q600 390 765 330" /><path d="M600 80 V165 M435 330 Q490 270 550 250 M765 330 Q710 270 650 250 M600 280 V480" strokeDasharray="2 3" /></g>
          {[[270,80],[600,80],[930,80],[435,330],[765,330],[600,480]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill="#F5EFFF" stroke="#8B3DFF" strokeWidth="2" />)}
        </svg>
        <div className="face-swap-role-center" aria-hidden="true">设计<br />职责</div>
        {responsibilities.map(({title,items}, index) => <article className={`face-swap-role-item face-swap-role-item-${index + 1}`} key={title}><h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}
      </div>
    </section>
    <section id="face-swap-business-goals" className="face-swap-business-goals" aria-labelledby="face-swap-goals-title">
      <header className="face-swap-role-heading"><span>BUSINESS GOALS · 业务目标</span><h2 id="face-swap-goals-title">From Single Capability to Product Matrix</h2><p>从单一 AI 技术能力，向可扩展的多产品业务体系发展。</p></header>
      <div className="face-swap-goals-grid">{businessGoals.map(({title,copy}, index) => <article key={title}><span className="face-swap-goal-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section id="face-swap-positioning" className="face-swap-positioning" aria-labelledby="face-swap-positioning-title">
      <header className="face-swap-role-heading"><span>PRODUCT MATRIX</span><h2 id="face-swap-positioning-title">三个平台的真实定位</h2></header>
      <div className="face-swap-comparison-scroll" role="region" aria-label="三个平台的产品定位对比，可横向滚动" tabIndex={0}>
        <table className="face-swap-comparison"><thead><tr><th scope="col">对比维度</th>{[{name:'DeepSwap AI',logo:'deepswap-logo.png'},{name:'FaceSwap AI',logo:'faceswap-ai-logo.png'},{name:'Face Swap Video',logo:'face-swap-video-logo.png'}].map(({name,logo}) => <th scope="col" key={name}><img className="face-swap-platform-logo" src={`/assets/cases/face-swap/${logo}`} width={48} height={48} alt="" /><span className="face-swap-platform-name">{name}</span></th>)}</tr></thead><tbody>{positioningRows.map(([dimension, ...values]) => <tr key={dimension}><th scope="row">{dimension}</th>{values.map((value, index) => <td key={index}>{value === '需进一步核实' ? <span className="face-swap-unverified">{value}</span> : value}</td>)}</tr>)}</tbody></table>
      </div>
    </section>
    <section id="face-swap-strategy" className="face-swap-strategy" aria-labelledby="face-swap-strategy-title">
      <header className="face-swap-role-heading"><span>DESIGN STRATEGY</span><h2 id="face-swap-strategy-title">设计策略</h2></header>
      <div className="face-swap-strategy-tree">
        <div className="face-swap-strategy-root"><ScanFace size={36} strokeWidth={1.5} aria-hidden="true" /><h3>Unified AI Face Swap Capability</h3><p>统一的换脸能力与关键操作规则</p></div>
        <div className="face-swap-strategy-branches">
          {[{title:'功能模块化',copy:'Photo / Video / Multi-face',Icon:LayoutGrid},{title:'交互标准化',copy:'Upload / Generate / Result',Icon:Workflow},{title:'界面差异化',copy:'Brand / Layout / Entry',Icon:PanelsTopLeft}].map(({title,copy,Icon}) => <article key={title}><Icon size={28} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
    <section id="face-swap-core-journey" className="face-swap-core-journey" aria-labelledby="face-swap-journey-title">
      <header className="face-swap-role-heading"><span>CORE USER JOURNEY</span><h2 id="face-swap-journey-title">核心用户路径</h2></header>
      <div className="face-swap-journey-panel"><p className="face-swap-journey-label">END-TO-END EXPERIENCE</p>
        <ol className="face-swap-journey-grid">{[{title:'Explore',copy:'进入平台 / 选择功能',Icon:Compass},{title:'Upload',copy:'上传图片或视频',Icon:Upload},{title:'Configure',copy:'选择替换人脸',Icon:ScanFace},{title:'Generate',copy:'执行生成任务',Icon:Sparkles},{title:'Preview',copy:'预览生成结果',Icon:Eye},{title:'Download',copy:'下载 / 保存 / 再次创作',Icon:Download}].map(({title,copy,Icon},index) => <li key={title}><div className="face-swap-journey-step-top"><span>0{index + 1}</span><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></div><h3>{title}</h3><p>{copy}</p></li>)}</ol>
      </div>
    </section>
    <div className="face-swap-matrix" aria-label="Face Swap 三个线上产品">
    {faceSwapProducts.map((product, index) => <article id={`project-product-${index + 1}`} className="face-swap-product" key={product.name}>
      <a className="face-swap-product-image" href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`打开 ${product.name} 线上产品预览（新标签页）`}>
        {product.image && <img src={product.image} alt={`${product.name}品牌封面`} loading="lazy" />}
      </a>
      <div className="face-swap-product-footer"><a href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`查看 ${product.name} 线上产品（新标签页）`}>查看线上产品 <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </article>)}
  </div>
  </>
}
