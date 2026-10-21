import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { site, labels } from '../data/site'
import { HeroBackground } from './HeroBackground'
import { Container } from './Container'
import { SpecularButton } from './SpecularButton'

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null)
  const lastExplore = useRef(-Infinity)
  useEffect(() => {
    const hero = ref.current!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const bounds = hero.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -bounds.top / hero.offsetHeight))
      hero.classList.toggle('hero-out-of-view', bounds.bottom <= 0)
      hero.style.setProperty('--content-y', `${reduced.matches ? 0 : -progress * 45}px`)
      hero.style.setProperty('--content-opacity', `${reduced.matches ? 1 : Math.max(0, 1 - progress * 1.55)}`)
      hero.style.setProperty('--video-y', `${reduced.matches ? 0 : progress * 55}px`)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    reduced.addEventListener('change', onScroll)
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); reduced.removeEventListener('change', onScroll) }
  }, [])
  return <section ref={ref} id="hero" className="hero cinematic-hero">
    <HeroBackground />
    <Container className="hero-content">
      <p className="hero-label" lang="en"><span className="hero-status-dot" aria-hidden="true" />{site.heroLabel}</p>
      <h1>{site.headline.map(part => <span key={part}>{part.includes('设计') ? <><em className="hero-title-accent">设计</em>{part.slice(2)}</> : part}</span>)}</h1>
      <h2>{site.subtitle}</h2>
      <p className="hero-description" lang="en">{site.description}</p>
      <SpecularButton className="button-primary hero-cta" href="#about" onClick={event => {
        const now = performance.now()
        if (now - lastExplore.current < 650) event.preventDefault()
        else lastExplore.current = now
      }}><span className="hero-cta-text">{labels.buttons.explore}</span><span className="hero-cta-icon" aria-hidden="true"><ArrowDown /></span></SpecularButton>
    </Container>
    <Container className="hero-footer"><span lang="en">App / Web / AI Products / Design Systems</span><span className="hero-signature" lang="en">2026 WEIPING YAN</span></Container>
  </section>
}
