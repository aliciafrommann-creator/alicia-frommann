'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#thinktogether', label: 'ThinkTogether' },
  { href: '#podcast',       label: 'Podcast' },
  { href: '#journey',       label: 'Journey' },
  { href: '#values',        label: 'Values' },
  { href: '#cta',           label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] flex justify-between items-center px-16 transition-all duration-300"
      style={{
        paddingTop:    scrolled ? 18 : 28,
        paddingBottom: scrolled ? 18 : 28,
        background:    scrolled ? 'rgba(8,8,10,0.92)' : 'transparent',
        borderBottom:  scrolled ? '1px solid #1C1C1A' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <a href="#" className="font-cormorant text-[18px] font-normal tracking-[0.08em] text-[#F0EAE0]">
        Alicia Frommann
      </a>
      <ul className="flex gap-10 list-none">
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#857E74] hover:text-[#F0EAE0] transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
