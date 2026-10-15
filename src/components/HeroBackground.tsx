import { useEffect, useRef } from 'react'
import { site } from '../data/site'

// Media-time thresholds calibrated to the source: head lift and greeting ~1s,
// sustained wave at 1.3–3s. 0.75 playback rate gives a ~4s opening shot.
const cues = [[.375, 'intro-nav'], [1.05, 'intro-title'], [1.8, 'intro-subtitle'], [1.935, 'intro-english'], [2.4, 'intro-cta'], [2.85, 'intro-footer']] as const

export function HeroBackground() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current!
    const hero = video.closest('.hero')!
    const root = document.documentElement
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const classes = cues.map(([,name])=>name)
    root.classList.add('cinematic-intro')
    let fallbackTimer: ReturnType<typeof setTimeout>
    let checkTimer: ReturnType<typeof setTimeout> | undefined
    let emphasisTimer: ReturnType<typeof setTimeout> | undefined
    let emphasisScheduled = false
    let started = false
    let disposed = false
    const softenAfterReveal = () => {
      if (emphasisScheduled) return
      emphasisScheduled = true
      // Soften as soon as the main heading starts appearing on the media timeline.
      emphasisTimer = setTimeout(() => {
        if (!disposed) hero.classList.add('intro-complete')
      }, 0)
    }
    const revealAll = () => {
      root.classList.add(...classes)
      hero.classList.add('intro-static', 'intro-complete')
    }
    const fallback = () => { video.pause(); hero.classList.add('video-fallback'); revealAll(); clearTimeout(fallbackTimer) }
    const progress = () => {
      for (const [time, name] of cues) if (video.currentTime >= time) root.classList.add(name)
      if (video.currentTime >= 1.05) softenAfterReveal()
    }
    const playing = () => {
      clearTimeout(checkTimer)
      if (!started) { started = true; clearTimeout(fallbackTimer) }
      hero.classList.add('video-ready')
      progress()
    }
    const ended = () => { progress(); root.classList.add(...classes); softenAfterReveal(); video.pause() }
    const attempt = () => {
      if (preference.matches || connection?.saveData) { fallback(); return }
      if (document.hidden) { video.pause(); return }
      if (video.getAttribute('src') !== site.heroVideo) video.src = site.heroVideo
      if (video.ended) return
      video.playbackRate = .75
      void video.play().catch(() => { if (!disposed) fallback() })
    }
    const waiting = () => {
      clearTimeout(checkTimer)
      checkTimer = setTimeout(() => { if (!video.ended && !video.paused) revealAll() }, 1200)
    }
    const resume = () => {
      if (!preference.matches && !connection?.saveData) hero.classList.remove('video-fallback')
      attempt()
    }
    video.addEventListener('playing', playing)
    video.addEventListener('timeupdate', progress)
    video.addEventListener('ended', ended)
    video.addEventListener('error', fallback)
    video.addEventListener('waiting', waiting)
    document.addEventListener('visibilitychange', attempt)
    preference.addEventListener('change', resume)
    fallbackTimer = setTimeout(() => { if (!started) fallback() }, 1800)
    if (!preference.matches && !connection?.saveData) attempt()
    else fallback()
    return () => {
      disposed = true
      clearTimeout(fallbackTimer); clearTimeout(checkTimer); clearTimeout(emphasisTimer)
      video.pause()
      video.removeEventListener('playing', playing); video.removeEventListener('timeupdate', progress)
      video.removeEventListener('ended', ended); video.removeEventListener('error', fallback); video.removeEventListener('waiting', waiting)
      document.removeEventListener('visibilitychange', attempt); preference.removeEventListener('change', resume)
      root.classList.remove('cinematic-intro', ...classes)
      hero.classList.remove('intro-complete')
    }
  }, [])
  return <div className="hero-background" aria-hidden="true">
    <img className="hero-poster" src={site.heroPoster} alt="" fetchPriority="high" />
    <video ref={ref} poster={site.heroPoster} muted playsInline preload="auto" tabIndex={-1} />
    <div className="hero-video-shade" />
  </div>
}
