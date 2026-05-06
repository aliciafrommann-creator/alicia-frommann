'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VALS = [
  { num:'i.',   word:'Freedom', blue:false, italic:false, text:'Not the cheap kind — the kind that costs you something. The right of every person to author their own life inside the constraints they did not choose. Most of my work is making the constraints visible, so what's left can actually be chosen.' },
  { num:'ii.',  word:'Love',    blue:true,  italic:true,  text:'The technical word for taking another person seriously. In organizations this looks like listening past the agenda. In design it looks like refusing the lazy default. It is the most underrated method in the change management literature.' },
  { num:'iii.', word:'Justice', blue:false, italic:false, text:'Distribution is not an afterthought of the design — it is the design. Whose feedback enters the loop? Whose names appear on the org chart? Who is in the room when the metric gets chosen?' },
]

export default function Values() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.value-word-inner').forEach(el => {
        gsap.fromTo(el, { y: '105%' }, {
          y: 0, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: el.parentElement, start: 'top 82%' },
        })
      })
      gsap.utils.toArray<HTMLElement>('.value-text').forEach(el => {
        gsap.fromTo(el, { opacity:0, y:20 }, {
          opacity:1, y:0, duration: .9, ease:'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="values" style={{ borderTop:'1px solid var(--line)' }}>
      <span className="tag" style={{ display:'block', padding:'clamp(60px,8vw,100px) var(--pad-x) 0' }}>§ 06 — Three points of the compass</span>
      {VALS.map((v, i) => (
        <article key={i} style={{ borderBottom:'1px solid var(--line)', padding:'clamp(56px,7vw,96px) var(--pad-x)', display:'grid', gridTemplateColumns:'80px 1fr', gap:'0 clamp(32px,5vw,72px)', alignItems:'baseline' }}>
          <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:13, color:'var(--ink-3)', letterSpacing:'.04em', paddingTop:8 }}>{v.num}</span>
          <div>
            <div style={{ overflow:'hidden', paddingBottom:'.08em', marginBottom:'clamp(24px,3vw,36px)' }}>
              <span className="value-word-inner" style={{
                display:'inline-block',
                fontWeight:600, fontSize:'clamp(52px,10vw,150px)', lineHeight:.92, letterSpacing:'-.04em',
                color:v.blue ? 'var(--blue)' : 'var(--ink)',
                fontStyle:v.italic ? 'italic' : 'normal',
              }}>{v.word}</span>
            </div>
            <p className="value-text" style={{ fontSize:'clamp(15px,1.2vw,18px)', lineHeight:1.65, color:'var(--ink-2)', maxWidth:680, opacity:0 }}>{v.text}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
