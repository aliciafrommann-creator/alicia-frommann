'use client'
import Link from 'next/link'
import MagneticButton from './MagneticButton'

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Alicia Frommann home">
          <rect width="32" height="32" rx="6" fill="currentColor" fillOpacity=".08"/>
          <path d="M8 24 L16 8 L24 24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M10.5 19h11" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        <span>Alicia Frommann</span>
      </Link>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#how-i-work">How I work</a>
        <a href="#values">Values</a>
        <a href="#journey">Journey</a>
      </div>
      <MagneticButton>
        <a href="#contact" className="btn btn-dark">Get in touch →</a>
      </MagneticButton>
    </nav>
  )
}
