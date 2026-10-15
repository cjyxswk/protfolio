import { useEffect, useRef } from 'react'

/** Decorative dot field; pointer trails are painted without affecting layout. */
export function ContactBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0, height = 0, frame = 0, visible = false
    let trail: { x: number; y: number; time: number }[] = []
    const paint = (now: number) => {
      frame = 0
      trail = trail.filter(point => now - point.time < 1400)
      ctx.clearRect(0, 0, width, height)
      const step = width < 768 ? 16 : 14
      for (let y = 7; y < height - 2; y += step) {
        // Ease in from the black section above; avoid a visible dot-field seam.
        const topProgress = Math.min(1, Math.max(0, (y - 24) / 260))
        const fade = topProgress * topProgress * (3 - 2 * topProgress)
        for (let x = 7; x < width; x += step) {
          let glow = 0
          for (const point of trail) {
            const age = (now - point.time) / 1400
            const distance = Math.hypot(x - point.x, y - point.y)
            glow = Math.max(glow, Math.exp(-distance * distance / 11000) * (1 - age) ** 2)
          }
          const wave = .7 + .3 * Math.sin(x * .013 + y * .009)
          ctx.fillStyle = `rgba(${glow > .04 ? '255,137,70' : '242,233,224'},${fade * (.24 * wave + glow * .65)})`
          ctx.beginPath()
          ctx.arc(x, y, 1.05 + glow * .65, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (visible && trail.length && !document.hidden) frame = requestAnimationFrame(paint)
    }
    const resize = () => {
      width = host.clientWidth; height = host.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!frame) paint(performance.now())
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || reduced.matches || !visible) return
      const rect = host.getBoundingClientRect()
      trail.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, time: performance.now() })
      trail = trail.slice(-12)
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const stop = () => {
      cancelAnimationFrame(frame); frame = 0; trail = []
      paint(performance.now())
    }
    const visibility = () => { if (document.hidden) stop() }
    const observer = new ResizeObserver(resize)
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) stop()
    })
    observer.observe(host); intersection.observe(host)
    host.addEventListener('pointermove', move)
    document.addEventListener('visibilitychange', visibility)
    reduced.addEventListener('change', stop)
    resize()
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect()
      host.removeEventListener('pointermove', move)
      document.removeEventListener('visibilitychange', visibility)
      reduced.removeEventListener('change', stop)
    }
  }, [])
  return <canvas ref={ref} className="contact-dot-backdrop" aria-hidden="true" />
}
