import { useEffect, useState, type RefObject } from 'react'

const ids = ['home', 'about', 'works', 'skills', 'contact'] as const
type SectionId = typeof ids[number]
const normalize = (hash: string): SectionId | undefined => {
  const id = hash.replace(/^#/, '')
  return id === 'capabilities' ? 'skills' : ids.find(value => value === id)
}

/** One scroll owner for navigation, hero/footer anchors, deep links and history.
 * Heading wrappers never transform. CSS scroll offsets are explicitly disabled.
 */
export function useSectionNavigation(navRef: RefObject<HTMLElement | null>, enabled = true) {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(() => window.scrollY >= 60)
  useEffect(() => {
    if (!enabled) {
      const updateScroll = () => setScrolled(window.scrollY >= 60)
      updateScroll()
      window.addEventListener('scroll', updateScroll, { passive: true })
      return () => window.removeEventListener('scroll', updateScroll)
    }
    let frame = 0, settleFrame = 0, initialFrame = 0, historyFrame = 0
    let navigating: SectionId | undefined
    let disposed = false
    const previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    const gap = () => innerWidth <= 767 ? 20 : 28
    // This ref is the unanimated fixed wrapper, not the reveal/blur child.
    const baseline = () => (navRef.current?.getBoundingClientRect().bottom ?? 0) + gap()
    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - innerHeight)
    const actualSection = (): SectionId => {
      if (scrollY <= 1) return 'home'
      if (scrollY >= maxScroll() - 2 && document.getElementById('contact')!.getBoundingClientRect().top < innerHeight) return 'contact'
      let current: SectionId = 'home'
      const limit = baseline() + 2
      for (const id of ids.slice(1)) {
        if (document.getElementById(id)!.getBoundingClientRect().top <= limit) current = id
      }
      return current
    }
    const writeHash = (id: SectionId, mode: 'push' | 'replace') => {
      const hash = `#${id}`
      if (location.hash === hash) return
      const url = `${location.pathname}${location.search}${hash}`
      if (mode === 'push') history.pushState(history.state, '', url)
      else history.replaceState(history.state, '', url)
    }
    const update = () => {
      frame = 0
      setScrolled(scrollY >= 60)
      const id = navigating ?? actualSection()
      setActive(id === 'home' ? '' : `#${id}`)
      if (!navigating) writeHash(id, 'replace')
    }
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update) }
    const finish = () => {
      if (!navigating) return
      cancelAnimationFrame(settleFrame); settleFrame = 0
      navigating = undefined
      update()
    }
    const navigate = (id: SectionId, smooth: boolean, push: boolean) => {
      const target = document.getElementById(id)
      if (!target) return
      cancelAnimationFrame(settleFrame)
      navigating = id
      writeHash(id, push ? 'push' : 'replace')
      setActive(id === 'home' ? '' : `#${id}`)
      const top = id === 'home' ? 0 : Math.min(maxScroll(), Math.max(0, target.getBoundingClientRect().top + scrollY - baseline()))
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top, behavior: smooth && !reduced ? 'smooth' : 'instant' })
      setScrolled(scrollY >= 60)
      // Native scrollend is primary. A bounded, event-scoped RAF fallback also
      // covers browsers without scrollend and same-position anchor clicks.
      const started = performance.now()
      let previousY = scrollY, stable = 0
      const settle = (now: number) => {
        if (!navigating || disposed) return
        stable = Math.abs(scrollY - previousY) < .25 ? stable + 1 : 0
        previousY = scrollY
        if ((now - started > 100 && stable >= 4) || now - started > 3000) { finish(); return }
        settleFrame = requestAnimationFrame(settle)
      }
      settleFrame = requestAnimationFrame(settle)
    }
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return
      const url = new URL(anchor.href, location.href)
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return
      const id = normalize(url.hash)
      if (!id) return
      event.preventDefault() // No native hash scroll in addition to the controller.
      navigate(id, true, true)
    }
    // History can emit popstate and hashchange for one traversal; coalesce them.
    const onHistory = () => {
      const id = normalize(location.hash) ?? 'home'
      navigating = id // Protect the history target from any pending scroll update.
      cancelAnimationFrame(historyFrame)
      historyFrame = requestAnimationFrame(() => navigate(id, false, false))
    }
    const onUserInput = () => {
      if (!navigating) return
      cancelAnimationFrame(settleFrame); settleFrame = 0
      navigating = undefined
      requestUpdate()
    }
    const onKey = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) onUserInput()
    }
    const onResize = () => requestUpdate()
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) onHistory() }
    document.addEventListener('click', onClick)
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('scrollend', finish)
    window.addEventListener('popstate', onHistory)
    window.addEventListener('hashchange', onHistory)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('resize', onResize)
    window.addEventListener('wheel', onUserInput, { passive: true })
    window.addEventListener('touchstart', onUserInput, { passive: true })
    window.addEventListener('keydown', onKey)
    // Fonts may change heading flow; wait once before initial deep-link placement,
    // rather than repeatedly correcting scroll with arbitrary timers.
    void document.fonts.ready.then(() => {
      if (!disposed) initialFrame = requestAnimationFrame(() => navigate(normalize(location.hash) ?? 'home', false, false))
    })
    return () => {
      disposed = true
      cancelAnimationFrame(frame); cancelAnimationFrame(settleFrame); cancelAnimationFrame(initialFrame); cancelAnimationFrame(historyFrame)
      history.scrollRestoration = previousRestoration
      document.removeEventListener('click', onClick)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('scrollend', finish)
      window.removeEventListener('popstate', onHistory)
      window.removeEventListener('hashchange', onHistory)
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('wheel', onUserInput)
      window.removeEventListener('touchstart', onUserInput)
      window.removeEventListener('keydown', onKey)
    }
  }, [navRef, enabled])
  return { active, scrolled }
}
