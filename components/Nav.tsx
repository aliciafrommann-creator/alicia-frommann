'use client'
import Link from 'next/link'

const S = {
  text2:   '#857E74',
  green:   '#6B9E5E',
}

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
      <ul style={{
        display: 'flex',
        flexDirection: 'row' as const,
        listStyle: 'none',
        padding: 0,
        margin: 0,
        gap: '28px',
        alignItems: 'center',
      }}>
        <li><a href="#thinktogether" style={{color:S.text2,transition:'color .3s',padding:'4px 0',textDecoration:'none',fontSize:'12px',letterSpacing:'0.04em'}}>ThinkTogether</a></li>
        <li><a href="#peakplant" style={{color:S.text2,transition:'color .3s',padding:'4px 0',textDecoration:'none',fontSize:'12px',letterSpacing:'0.04em'}}>PeakPlant</a></li>
        <li><a href="#how" style={{color:S.text2,transition:'color .3s',padding:'4px 0',textDecoration:'none',fontSize:'12px',letterSpacing:'0.04em'}}>How I work</a></li>
        <li><a href="#values" style={{color:S.text2,transition:'color .3s',padding:'4px 0',textDecoration:'none',fontSize:'12px',letterSpacing:'0.04em'}}>Values</a></li>
        <li><a href="#journey" style={{color:S.text2,transition:'color .3s',padding:'4px 0',textDecoration:'none',fontSize:'12px',letterSpacing:'0.04em'}}>Journey</a></li>
        <li>
          <a href="#application" style={{
            padding: '7px 16px',
            background: S.green,
            color: '#08080A',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background .3s',
            textDecoration: 'none',
          }}>
            <i style={{width:'6px',height:'6px',borderRadius:'50%',background:'rgba(8,8,10,0.4)',display:'inline-block'}} />
            Application
          </a>
        </li>
      </ul>
    </nav>
  )
}
