import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { labels, site } from '../data/site'
import { Container } from './Container'
import { useSectionNavigation } from '../hooks/useSectionNavigation'

export function Header({ projectPage = false }: { projectPage?: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { active, scrolled } = useSectionNavigation(ref, !projectPage)
  const homeHref = (hash: string) => projectPage ? `/${hash}` : hash

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        ref.current?.querySelector<HTMLButtonElement>('.menu')?.focus()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])

  return <Container as="header" ref={ref} data-site-navbar className={`header${scrolled ? ' is-scrolled' : ''}`}>
    <div className="navbar-motion">
      <nav className="pill-nav" aria-label="主导航">
        <a className="wordmark" href={homeHref('#home')} onClick={() => setOpen(false)}>
          <span className="brand-avatar" aria-hidden="true"><img src={site.avatar} alt="" width="44" height="44" /></span>
          <span className="brand-copy"><strong className="brand-name">{site.name}</strong><span className="brand-role" lang="en">UI/UX Designer</span></span>
        </a>
        <div id="nav-links" className={open ? 'nav-links is-open' : 'nav-links'}>
          {labels.navigation.filter(([, , href]) => href !== '#contact').map(([label, , href]) => <a href={homeHref(href)} key={href} aria-current={active === href ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-contact nav-contact-mobile" href={homeHref('#contact')} aria-current={active === '#contact' ? 'location' : undefined} onClick={() => setOpen(false)}>来聊聊 <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <a className="nav-contact nav-contact-desktop" href={homeHref('#contact')} aria-current={active === '#contact' ? 'location' : undefined} onClick={() => setOpen(false)}>来聊聊 <ArrowUpRight size={16} aria-hidden="true" /></a>
        <button className="menu" onClick={() => setOpen(value => !value)} aria-label={open ? '关闭导航' : '打开导航'} aria-controls="nav-links" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </nav>
    </div>
  </Container>
}
