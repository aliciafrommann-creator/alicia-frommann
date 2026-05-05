'use client'

import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'

interface Props {
  href?: string
  variant?: 'primary' | 'secondary'
  children: ReactNode
  target?: string
  rel?: string
}

export default function MagneticButton({ href, variant = 'primary', children, target, rel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r  = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width  / 2)
    const dy = e.clientY - (r.top  + r.height / 2)
    el.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  const base = 'inline-flex items-center gap-2 px-8 py-3.5 text-[12px] font-bold tracking-[0.08em] no-underline'
  const cls  = variant === 'primary'
    ? `${base} bg-[#6B9E5E] text-[#08080A] hover:bg-[#7BBE6E]`
    : `${base} bg-transparent text-[#F0EAE0] border border-[#3A3935] hover:border-[#857E74]`

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={cls}
      style={{ transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), background 0.2s, border-color 0.2s' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  )
}
