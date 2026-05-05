'use client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [audioOn, setAudioOn] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 grid items-center transition-all duration-400"
      style={{
        gridTemplateColumns: '1fr auto 1fr',
        padding: '18px var(--pad-x)',
        fontSize: 13, fontWeight: 500,
        borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        background: scrolled ? 'rgba(244,241,234,.78)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      }}
    >
      {/* Logo */}
      <a href="#top" className="inline-flex items-center gap-2.5" style={{ fontWeight: 600, letterSpacing: '-.01em', color: 'var(--ink)' }}>
        <svg viewBox="0 0 32 32" width="22" height="22" style={{ color: 'var(--blue)', transition: 'transform .6s var(--ease-soft)' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(45deg)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'rotate(0deg)')}>
          <circle cx="16" cy="16" r="3" fill="currentColor"/>
          <circle cx="6" cy="10" r="2" fill="currentColor"/>
          <circle cx="26" cy="10" r="2" fill="currentColor"/>
          <circle cx="6" cy="22" r="2" fill="currentColor"/>
          <circle cx="26" cy="22" r="2" fill="currentColor"/>
          <line x1="16" y1="16" x2="6" y2="10" stroke="currentColor" strokeWidth="1"/>
          <line x1="16" y1="16" x2="26" y2="10" stroke="currentColor" strokeWidth="1"/>
          <line x1="16" y1="16" x2="6" y2="22" stroke="currentColor" strokeWidth="1"/>
          <line x1="16" y1="16" x2="26" y2="22" stroke="currentColor" strokeWidth="1"/>
        </svg>
        <span>Alicia Frommann</span>
      </a>

      {/* Centre links */}
      <ul className="flex list-none gap-7">
        {[['#thinktogether','Work'],['#how','How I work'],['#values','Values'],['#journey','Journey']].map(([href,label]) => (
          <li key={href}>
            <a href={href} style={{ position: 'relative', color: 'var(--ink-2)', transition: 'color .3s', padding: '4px 0' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-2)')}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Utility */}
      <div className="flex items-center gap-3" style={{ justifySelf: 'end' }}>
        <button
          onClick={() => setAudioOn(v => !v)}
          className="inline-flex items-center gap-2"
          style={{
            padding: '7px 12px',
            border: '1px solid var(--line-2)',
            borderRadius: 999,
            fontFamily: 'var(--font-geist-mono)', fontSize: 11, letterSpacing: '.04em',
            color: 'var(--ink-2)', transition: 'border-color .3s,color .3s',
          }}
        >
          <span className="inline-flex gap-0.5 items-end" style={{ height: 10 }}>
            {[0,1,2,3].map(i => (
              <i key={i} style={{
                display: 'block', width: 2,
                background: audioOn ? 'var(--blue)' : 'var(--ink-3)',
                height: audioOn ? undefined : 4,
                animation: audioOn ? `ab 1.2s var(--ease-out) infinite ${i*0.15}s` : 'none',
                borderRadius: 1,
              }} />
            ))}
          </span>
          <span>Sound</span>
        </button>
        <a href="#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '9px 16px',
          background: 'var(--ink)', color: 'var(--paper)',
          borderRadius: 999, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
          transition: 'background .3s,gap .3s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--blue)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--ink)' }}
        >
          Get in touch <span>→</span>
        </a>
      </div>
    </nav>
  )
}
