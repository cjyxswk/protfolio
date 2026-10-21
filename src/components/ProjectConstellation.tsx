import { useEffect, useRef } from 'react'

/** Decorative, bounded canvas: no React renders during pointer movement. */
export function ProjectConstellation({ variant = 'page' }: { variant?: 'page' | 'section' }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const points = Array.from({ length: variant === 'section' ? 38 : 54 }, (_, i) => ({
      x: ((i * 137.508 + 29) % 997) / 997,
      y: ((i * 211.71 + 71) % 991) / 991,
      phase: i * 1.7,
    }))
    let width = 0, height = 0, frame = 0, visible = true, last = 0
    const pointer = { x: -1000, y: -1000 }
    const draw = (time: number) => {
      frame = 0
      if (time - last < 32 && !reduced.matches) { schedule(); return }
      last = time
      ctx.clearRect(0, 0, width, height)
      const rect = canvas.getBoundingClientRect()
      const motion = reduced.matches ? 0 : time * .00012
      const nodes = points.map(p => {
        let x = p.x * width + Math.sin(motion + p.phase) * 12
        let y = p.y * height + Math.cos(motion + p.phase) * 10
        if (!reduced.matches) {
          if (variant === 'page') y -= Math.min(scrollY, height) * .035
          const dx = x - pointer.x, dy = y - (pointer.y - rect.top)
          const distance = Math.hypot(dx, dy)
          if (distance > 0 && distance < 160) {
            const force = (1 - distance / 160) * 18
            x += dx / distance * force; y += dy / distance * force
          }
        }
        return { x, y }
      })
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance > 170) return
          ctx.strokeStyle = `rgba(185,175,164,${(1 - distance / 170) * .15})`
          ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
        })
        ctx.fillStyle = 'rgba(195,185,173,.24)'
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.5, 0, Math.PI * 2); ctx.fill()
      })
      if (!reduced.matches) schedule()
    }
    const schedule = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw) }
    const resize = () => {
      width = canvas.clientWidth; height = canvas.clientHeight
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); schedule()
    }
    const move = (event: PointerEvent) => { if (fine.matches) { pointer.x = event.clientX; pointer.y = event.clientY } }
    const reset = () => { pointer.x = -1000; pointer.y = -1000 }
    const resume = () => { cancelAnimationFrame(frame); frame = 0; schedule() }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume() })
    observer.observe(canvas)
    const size = new ResizeObserver(resize); size.observe(canvas)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', reset)
    document.addEventListener('visibilitychange', resume)
    reduced.addEventListener('change', resume)
    resize()
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); size.disconnect()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', reset)
      document.removeEventListener('visibilitychange', resume)
      reduced.removeEventListener('change', resume)
    }
  }, [variant])
  return <canvas className={`project-constellation${variant === 'section' ? ' project-constellation--section' : ''}`} ref={ref} aria-hidden="true" />
}
