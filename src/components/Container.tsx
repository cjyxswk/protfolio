import { createElement, type HTMLAttributes, type Ref } from 'react'

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'header' | 'footer' | 'main'
  ref?: Ref<HTMLElement>
}

/** Shared outer alignment for every page; nested reading widths stay inside. */
export function Container({ as = 'div', className = '', ...props }: ContainerProps) {
  return createElement(as, { ...props, className: `page-container ${className}`.trim() })
}
