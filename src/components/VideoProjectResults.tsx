import { useEffect, useRef, useState } from 'react'
import '../video-project-results.css'

const results = [
  { title:'日活跃用户', english:'DAILY ACTIVE USERS', value:'10W+', points:['日均活跃创作者突破 10 万','覆盖多样化的 AI 视频创作场景'] },
  { title:'累计视频生成', english:'VIDEOS GENERATED', value:'500W+', points:['平台累计视频生成量突破 500 万','支持图片与文本等多种生成方式'] },
  { title:'付费转化率', english:'PAID CONVERSION RATE', value:'8.6%', points:['免费体验到付费订阅的用户转化','通过权益展示与购买路径优化促进转化'] },
]

function ResultCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setProgress(1)
      return
    }
    let frame = 0
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = Math.min(1, (now - start) / 1400)
        setProgress(1 - Math.pow(1 - elapsed, 3))
        if (elapsed < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    if (ref.current) observer.observe(ref.current)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [])
  const target = parseFloat(value)
  const number = value.includes('.') ? (target * progress).toFixed(1) : Math.floor(target * progress).toString()
  const suffix = value.replace(/[\d.]/g, '')
  return <div ref={ref} className="video-results-value"><strong aria-label={value}><span aria-hidden="true">{number}{suffix}</span></strong></div>
}

export function VideoProjectResults() {
  return <section className="video-results" aria-label="项目结果与复盘">
    <p className="video-results-intro">从用户创作场景出发，将模型选择、素材输入、生成反馈与结果复用串联起来，形成从产品分析到界面表达的完整设计方案。</p>
    <ul className="video-results-metrics" aria-label="项目业务数据">
      {results.map(result=><li key={result.title}>
        <span className="video-results-label" lang="en">{result.english}</span>
        <h3>{result.title}</h3>
        <ResultCounter value={result.value} />
        <ul>{result.points.map(point=><li key={point}>{point}</li>)}</ul>
      </li>)}
    </ul>
    <div className="video-results-reflection"><h3>让复杂能力，回归清晰体验。</h3><p>AI 创作体验的关键，不只是让用户完成一次生成，更是让输入有依据、等待有反馈、结果可继续。通过一致的结构与明确的状态，让不同创作需求都能沿着清晰的路径展开。</p></div>
  </section>
}
