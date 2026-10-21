import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AiFaceCaseStudy } from './AiFaceCaseStudy'

export function CaseStudyModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const y = window.scrollY
    const body = document.body
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow }
    body.style.position = 'fixed'; body.style.top = `-${y}px`; body.style.width = '100%'; body.style.overflow = 'hidden'
    ref.current?.showModal()
    return () => {
      Object.assign(body.style, previous)
      const previousBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, y)
      document.documentElement.style.scrollBehavior = previousBehavior
    }
  }, [])
  return createPortal(<dialog ref={ref} className="af-modal" aria-label="AI Face 完整产品设计案例" onCancel={event => { if (event.target !== event.currentTarget) return; event.preventDefault(); onClose() }}><div className="af-case-scroll"><AiFaceCaseStudy onClose={onClose} /></div></dialog>, document.body)
}
