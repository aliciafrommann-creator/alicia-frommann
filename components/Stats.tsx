'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { to:3,  dec:0, suffix:'',  label:'Languages spoken',       sub:'Deutsch · English · Français' },
  { to:1.3,dec:1, suffix:'',  label:'GPA, MSc',               sub:'MCI Innsbruck' },
  { to:5,  dec:0, suffix:'+', label:'Years in transformation', sub:'Bosch · Mücke Roth · ThinkTogether' },
  { to:42, dec:0, suffix:'',  label:'Workshops facilitated',  sub:'Across 3 countries' },
]

function CountUp({ to, dec, started }: { to:number; dec:number; started:boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!started) return
    const start = performance.now(), dur = 1600
    const raf = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setV(parseFloat((ease * to).toFixed(dec)))
      if (t < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [started, to, dec])
  return <>{v.toFixed(dec)}</>
}

function StatItem({ to, dec, suffix, label, sub }: typeof STATS[0]) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold:.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ padding:'clamp(36px,5vw,56px) clamp(24px,4vw,48px)', borderRight:'1px solid var(--line)' }}>
      <div style={{ fontFamily:'var(--font-geist)', fontWeight:600, fontSize:'clamp(52px,7vw,88px)', lineHeight:1, letterSpacing:'-.04em', color:'var(--ink)', marginBottom:12 }}>
        <CountUp to={to} dec={dec} started={started} />{suffix}
      </div>
      <div style={{ fontSize:13, fontWeight:600, color:'var(--ink)', marginBottom:4 }}>{label}</div>
      <div style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>{sub}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section style={{ borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
        {STATS.map((s,i) => <StatItem key={i} {...s} />)}
      </div>
    </section>
  )
}
