import { Container } from './Container'
import '../project-footer.css'

export function ProjectFooter({ topId = 'project-top' }: { topId?: string }) {
  return <Container as="footer" className="site-footer project-footer">
    <span lang="en">© 2026 WEIPING YAN</span>
    <a href={`#${topId}`} onClick={event => {
      event.preventDefault()
      const scroller = event.currentTarget.closest<HTMLElement>('.af-case-scroll')
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      if (scroller) scroller.scrollTo({ top: 0, behavior })
      else window.scrollTo({ top: 0, behavior })
    }}>返回顶部 ↑</a>
  </Container>
}
