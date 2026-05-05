'use client'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('de-AT', { hour:'2-digit', minute:'2-digit', second:'2-digit', timeZone:'Europe/Vienna' }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer style={{ borderTop:'1px solid var(--line)', padding:'clamp(24px,3vw,40px) var(--pad-x)', background:'var(--cream)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:16 }}>
        <span style={{ fontFamily:'var(--font-geist)', fontWeight:700, fontSize:20, letterSpacing:'-.02em', color:'var(--ink)' }}>A · F</span>
        <span style={{ fontFamily:'var(--font-geist)', fontStyle:'italic', fontSize:14, color:'var(--ink-3)' }}>Changing systems is an act of love.</span>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, fontFamily:'var(--font-geist-mono)', fontSize:11, letterSpacing:'.04em', color:'var(--ink-3)', textTransform:'uppercase' }}>
        <span>© 2026 Alicia Frommann</span>
        <span>Innsbruck · Austria</span>
        <span>Built with care.</span>
        <span>{time}</span>
      </div>
    </footer>
  )
}
