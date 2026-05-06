'use client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' is-scrolled' : ''}`} id="nav">
      <a href="#top" className="nav-mark">
        <svg className="mark-glyph" viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
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
      <ul className="nav-links">
        <li><a href="#projects">Projects</a></li>
        <li><a href="#thinktogether">Work</a></li>
        <li><a href="#how">How I work</a></li>
        <li><a href="#values">Values</a></li>
        <li><a href="#journey">Journey</a></li>
      </ul>
      <div className="nav-utility">
        <a href="#contact" className="nav-cta">Get in touch <span className="arrow">→</span></a>
      </div>
    </nav>
  )
}
