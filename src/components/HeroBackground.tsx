import { useLayoutEffect, useRef } from 'react'
import { site } from '../data/site'

// Reveal copy early in the opening shot while retaining the staggered sequence.
// Thresholds use media time; playback remains at 0.75×.
const titleCue = .35
const cues = [[.15, 'intro-nav'], [titleCue, 'intro-title'], [.55, 'intro-subtitle'], [.65, 'intro-english'], [.8, 'intro-cta'], [1, 'intro-footer']] as const

export function HeroBackground() {
  const ref = useRef<HTMLVideoElement>(null)
  useLayoutEffect(() => {
    const video = ref.current!
    const hero = video.closest('.hero')!
    const root = document.documentElement
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const classes = cues.map(([,name])=>name)
    root.classList.remove(...classes)
    root.classList.add('cinematic-intro')
    hero.classList.remove('intro-static', 'intro-complete', 'video-fallback', 'video-ready')
    video.currentTime = 0
    let fallbackTimer: ReturnType<typeof setTimeout>
    let checkTimer: ReturnType<typeof setTimeout> | undefined
    let emphasisTimer: ReturnType<typeof setTimeout> | undefined
    let emphasisScheduled = false
    let started = false
    let disposed = false
    let failed = false
    let revealFrame = 0
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
    const fallback = () => {
      if (disposed || failed) return
      failed = true
      video.pause(); hero.classList.add('video-fallback'); revealAll()
      clearTimeout(fallbackTimer); clearTimeout(checkTimer)
    }
    const progress = () => {
      if (disposed || failed) return
      for (const [time, name] of cues) if (video.currentTime >= time) root.classList.add(name)
      if (video.currentTime >= titleCue) softenAfterReveal()
    }
    const trackReveal = () => {
      revealFrame = 0
      if (disposed || failed || video.paused || video.ended) return
      progress()
      if (video.currentTime < cues[cues.length - 1][0]) revealFrame = requestAnimationFrame(trackReveal)
    }
    const playing = () => {
      if (disposed || failed) { video.pause(); return }
      clearTimeout(checkTimer)
      if (!started) { started = true; clearTimeout(fallbackTimer) }
      hero.classList.add('video-ready')
      progress()
      cancelAnimationFrame(revealFrame)
      revealFrame = requestAnimationFrame(trackReveal)
    }
    const ended = () => { progress(); root.classList.add(...classes); softenAfterReveal(); video.pause() }
    const attempt = () => {
      if (disposed || failed) return
      if (preference.matches || connection?.saveData) { fallback(); return }
      if (document.hidden) { video.pause(); return }
      if (video.getAttribute('src') !== site.heroVideo) video.src = site.heroVideo
      if (video.ended) return
      video.playbackRate = .75
      void video.play().catch(() => { if (!disposed) fallback() })
    }
    const waiting = () => {
      clearTimeout(checkTimer)
      checkTimer = setTimeout(() => { if (!video.ended && !video.paused) fallback() }, 4000)
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
    fallbackTimer = setTimeout(() => { if (!started) fallback() }, 8000)
    if (!preference.matches && !connection?.saveData) attempt()
    else fallback()
    return () => {
      disposed = true
      cancelAnimationFrame(revealFrame)
      clearTimeout(fallbackTimer); clearTimeout(checkTimer); clearTimeout(emphasisTimer)
      video.pause()
      video.removeEventListener('playing', playing); video.removeEventListener('timeupdate', progress)
      video.removeEventListener('ended', ended); video.removeEventListener('error', fallback); video.removeEventListener('waiting', waiting)
      document.removeEventListener('visibilitychange', attempt); preference.removeEventListener('change', resume)
      // Keep the first-paint gate during StrictMode cleanup and remounts.
      root.classList.remove(...classes)
      hero.classList.remove('intro-complete')
    }
  }, [])
  return <div className="hero-background" aria-hidden="true">
    <img className="hero-poster" src={site.heroPoster} alt="" fetchPriority="high" />
    <video ref={ref} poster={site.heroPoster} muted playsInline preload="auto" tabIndex={-1} />
    <div className="hero-video-shade" />
  </div>
}
