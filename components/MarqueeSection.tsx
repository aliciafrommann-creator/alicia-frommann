'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ITEMS = [
  'Systems Thinking','Causal Loop Diagrams','Organizational Change',
  'Digital Transformation','Trail Runner','Podcast Host',
  'Three Languages','ThinkTogether','Innsbruck → World',
]

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = trackRef.current
    if (!t) return
    t.innerHTML += t.innerHTML + t.innerHTML
    gsap.to(t, { xPercent: -33.333, duration: 60, ease: 'none', repeat: -1 })
  }, [])

  return (
    <section aria-hidden="true" style={{ borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', padding:'26px 0', overflow:'hidden', whiteSpace:'nowrap', background:'var(--paper)' }}>
      <div ref={trackRef} style={{
        display: 'inline-block',
        fontFamily: 'var(--font-geist)', fontWeight: 500,
        fontSize: 'clamp(28px,3.6vw,52px)',
        letterSpacing: '-.025em',
        color: 'var(--ink)',
        willChange: 'transform',
        lineHeight: 1.1, paddingBottom: '.1em',
      }}>
        {ITEMS.map((item, i) => (
          <span key={i}>
            <span style={{ fontWeight:500, fontStyle: i % 8 === 4 ? 'italic' : undefined, color: i % 8 === 4 ? 'var(--blue)' : undefined }}>{item}</span>
            <span style={{ display:'inline-block', margin:'0 .4em', color:'var(--blue)', fontSize:'.35em', verticalAlign:'middle', transform:'translateY(-.6em)' }}>●</span>
          </span>
        ))}
      </div>
    </section>
  )
}
