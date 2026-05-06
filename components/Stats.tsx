'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { to: 3,   decimals: 0, label: 'Languages spoken',    sub: 'Deutsch · English · Français' },
  { to: 1.3, decimals: 1, label: 'GPA, MSc',             sub: 'MCI Innsbruck' },
  { to: 5,   decimals: 0, label: 'Years in transformation', sub: 'Bosch · Mücke Roth · ThinkTogether', plus: true },
  { to: 42,  decimals: 0, label: 'Workshops facilitated', sub: 'Across 3 countries' },
]

function Counter({ to, decimals, started }: { to: number; decimals: number; started: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    const dur = 1600, steps = 60, inc = to / steps
    let cur = 0
    const t = setInterval(() => {
      cur = Math.min(cur + inc, to)
      setVal(cur)
      if (cur >= to) clearInterval(t)
    }, dur / steps)
    return () => clearInterval(t)
  }, [started, to])
  return <>{val.toFixed(decimals)}</>
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <section className="stats" ref={ref} data-screen-label="06 Stats">
      <div className="stats-grid">
        {STATS.map(s => (
          <div className="stat" key={s.label}>
            <div className="stat-num">
              <Counter to={s.to} decimals={s.decimals} started={started}/>
              {s.plus && <span className="plus">+</span>}
            </div>
            <div className="stat-label">{s.label}<em>{s.sub}</em></div>
          </div>
        ))}
      </div>
    </section>
  )
}
