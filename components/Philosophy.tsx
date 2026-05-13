'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Changing','systems','is','an','act','of','love.']

export default function Philosophy() {
  const sectionRef  = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLElement>(null)
  const quoteRef    = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const words = quoteRef.current?.querySelectorAll<HTMLSpanElement>('.pw')
    if (!words?.length) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: .8,
        onUpdate: s => {
          if (progressRef.current) progressRef.current.style.width = (s.progress * 100).toFixed(1) + '%'
          const idx = Math.floor(s.progress * (words.length + 1) * 1.05)
          words.forEach((w, i) => {
            const active = i <= idx
            w.style.opacity = active ? '1' : '.1'
            w.style.filter  = active ? 'blur(0px)' : 'blur(3px)'
          })
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" style={{ position:'relative', height:'300vh', background:'var(--cream)' }}>
      <div style={{
        position:'sticky', top:0, height:'100vh',
        display:'grid', gridTemplateRows:'auto 1fr auto',
        padding:'clamp(80px,10vw,140px) var(--pad-x) clamp(48px,6vw,80px)',
        maxWidth:1480, margin:'0 auto',
        gap:'clamp(32px,5vw,60px)',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:32 }}>
          <span className="tag">§ 01 — Thesis</span>
          <div style={{ flex:'0 0 240px', height:1, background:'var(--line)', position:'relative' }}>
            <i ref={progressRef} style={{ position:'absolute', left:0, top:0, height:1, width:'0%', background:'var(--blue)', transition:'width .05s linear' }} />
          </div>
        </div>

        <p ref={quoteRef} style={{
          alignSelf:'center',
          fontWeight:600, fontSize:'clamp(44px,8.5vw,148px)',
          lineHeight:1.02, letterSpacing:'-.045em', color:'var(--ink)',
        }}>
          {WORDS.map((w, i) => (
            <span key={i} className="pw" style={{
              display:'inline-block', marginRight:'.18em',
              opacity:.1, transition:'opacity .4s ease, filter .4s ease',
              color:  w === 'love.' ? 'var(--blue)'  : 'var(--ink)',
              fontStyle:  w === 'love.' ? 'italic'  : undefined,
              fontWeight: w === 'love.' ? 500 : undefined,
            }}>{w}</span>
          ))}
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'end', paddingTop:22, borderTop:'1px solid var(--line)', fontSize:14, color:'var(--ink-2)', maxWidth:760, justifySelf:'end', lineHeight:1.65 }}>
          <p>The work is not to optimize. It is to widen the circle of who gets to be inside the decision — and then redraw the loops that hold the room together. High-performing teams keep conflict about the work, not the people. That shift is structural. That&apos;s what I build. That is, as far as I can tell, the whole job.</p>
          <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:12, color:'var(--ink-3)', whiteSpace:'nowrap', letterSpacing:'.04em' }}>— A.F.</span>
        </div>
      </div>
    </section>
  )
}
