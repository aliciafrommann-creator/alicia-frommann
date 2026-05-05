'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Changing','systems','is','an','act','of','love.']

export default function Philosophy() {
  const wordsRef = useRef<HTMLParagraphElement>(null)
  const progressRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const words = wordsRef.current?.querySelectorAll<HTMLSpanElement>('.pw')
    if (!words) return
    const prog = progressRef.current
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.philosophy-section',
        start: 'top top', end: 'bottom bottom',
        scrub: .6,
        onUpdate: s => {
          if (prog) prog.style.width = (s.progress * 100).toFixed(1) + '%'
          const idx = Math.floor(s.progress * words.length * 1.1)
          words.forEach((w, i) => w.classList.toggle('pw-active', i <= idx))
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="philosophy-section" style={{ position:'relative', height:'280vh', background:'var(--cream)' }}>
      <div style={{
        position:'sticky', top:0, height:'100vh',
        display:'grid', gridTemplateRows:'auto 1fr auto',
        padding:'clamp(80px,10vw,140px) var(--pad-x) clamp(48px,6vw,80px)',
        maxWidth:1480, margin:'0 auto',
        gap:'clamp(32px,5vw,60px)',
      }}>
        {/* Meta row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:32 }}>
          <span className="tag">§ 01 — Thesis</span>
          <div style={{ flex:'0 0 240px', height:1, background:'var(--line)', position:'relative' }}>
            <i ref={progressRef} style={{ position:'absolute', left:0, top:0, height:1, width:'0%', background:'var(--blue)' }} />
          </div>
        </div>

        {/* Big quote */}
        <p ref={wordsRef} style={{
          alignSelf:'center',
          fontFamily:'var(--font-geist)', fontWeight:600,
          fontSize:'clamp(48px,9vw,160px)', lineHeight:1.05, letterSpacing:'-.045em',
          color:'var(--ink)',
        }}>
          {WORDS.map((w, i) => (
            <span key={i} className="pw" style={{
              display:'inline-block', marginRight:'.15em',
              opacity:.12, transition:'opacity .35s,color .4s',
              color: w === 'love.' ? 'var(--blue)' : undefined,
              fontStyle: w === 'love.' ? 'italic' : undefined,
              fontWeight: w === 'love.' ? 500 : undefined,
            }}>{w}</span>
          ))}
        </p>

        {/* Footer */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'end',
          paddingTop:22, borderTop:'1px solid var(--line)',
          fontSize:14, color:'var(--ink-2)', maxWidth:720, justifySelf:'end', lineHeight:1.6,
        }}>
          <p>The work is not to optimize. It is to widen the circle of who gets to be inside the decision — and then redraw the loops that hold the room together. That&apos;s craft. That&apos;s care. That is, as far as I can tell, the whole job.</p>
          <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:12, color:'var(--ink-3)', whiteSpace:'nowrap', letterSpacing:'.04em' }}>— A.F.</span>
        </div>
      </div>

      <style>{`.pw-active { opacity: 1 !important; }`}</style>
    </section>
  )
}
