import { MousePointer2 } from 'lucide-react'
import '../video-visual-system.css'

const colors = [
  { name: 'Primary\nColor', hex: '#B8F807', usage: '主要操作 / 选中状态', className: 'primary' },
  { name: 'Text\nColor', hex: '#FFFFFF', usage: '标题与主要文字', className: 'text' },
  { name: 'Canvas', hex: '#000000', usage: '内容背景', className: 'canvas' },
  { name: 'Surface', hex: '#252525', usage: '上传与输入容器', className: 'surface' },
  { name: 'Secondary', hex: '#CCCCCC', usage: '辅助文字', className: 'secondary' },
]

export function VideoVisualSpecs() {
  return <div className="video-visual-board">
    <div className="visual-font-hero" aria-label="Montserrat 字体，Regular 400、Medium 500、Semibold 600、Bold 700">
      <div className="visual-font-word" data-text="Montserrat">Montserrat</div>
      <span className="visual-weight-tag regular">Regular <MousePointer2 size={20} fill="currentColor" /></span>
      <span className="visual-weight-tag medium">Medium</span>
      <span className="visual-weight-tag bold">Bold <MousePointer2 size={20} fill="currentColor" /></span>
    </div>
    <div className="visual-weight-scale" aria-label="字体字重规范">
      {[[400, 'Regular'], [500, 'Medium'], [600, 'Semibold'], [700, 'Bold']].map(([weight, label]) => <div key={weight} style={{ fontWeight: weight }}><span>Aa</span><small>{label} / {weight}</small></div>)}
    </div>
    <div className="visual-heading-scale" aria-label="建议标题字号层级">
      {[32, 28, 24, 20, 16].map((size, index) => <div key={size}><strong style={{ fontSize: size }}>{size}<small>PX</small></strong><span>H{index + 1}</span></div>)}
    </div>
    <p className="visual-scale-note">标题扩展层级 · 32 / 28 / 24 / 20 / 16 px，适用于页面与内容分组。</p>
    <div className="visual-color-grid" aria-label="产品色彩规范">
      {colors.map(color => <div className={`visual-color-card ${color.className}`} key={color.hex} style={{ background: color.hex }}>
        <span className="visual-color-usage">{color.usage}</span><div><strong>{color.name}</strong><span>{color.hex}</span></div>
      </div>)}
    </div>
  </div>
}
