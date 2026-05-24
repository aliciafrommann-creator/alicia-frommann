'use client'
import Link from 'next/link'

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
      <ul className="flex list-none gap-7">
        <li><a href="#thinktogether" style={{position:'relative',color:'var(--ink-2)',transition:'color .3s',padding:'4px 0'}}>ThinkTogether</a></li>
        <li><a href="#peakplant" style={{position:'relative',color:'var(--ink-2)',transition:'color .3s',padding:'4px 0'}}>PeakPlant</a></li>
        <li><a href="#how" style={{position:'relative',color:'var(--ink-2)',transition:'color .3s',padding:'4px 0'}}>How I work</a></li>
        <li><a href="#values" style={{position:'relative',color:'var(--ink-2)',transition:'color .3s',padding:'4px 0'}}>Values</a></li>
        <li><a href="#journey" style={{position:'relative',color:'var(--ink-2)',transition:'color .3s',padding:'4px 0'}}>Journey</a></li>
        <li>
          <a href="#application" style={{
            padding:'7px 16px',
            background:'var(--blue)',
            color:'var(--paper)',
            borderRadius:'999px',
            fontSize:'13px',
            fontWeight:500,
            display:'inline-flex',
            alignItems:'center',
            gap:'6px',
            transition:'background .3s',
            textDecoration:'none'
          }}>
            <i style={{width:'6px',height:'6px',borderRadius:'50%',background:'rgba(255,255,255,0.6)',display:'inline-block'}}></i>
            Application
          </a>
        </li>
      </ul>
    </nav>
  )
}
