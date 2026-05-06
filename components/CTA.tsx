'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-line > span').forEach(el => {
        gsap.fromTo(el, { y:'110%' }, { y:0, duration:1.0, ease:'expo.out', scrollTrigger:{ trigger:el, start:'top 88%' } })
      })
      gsap.utils.toArray<HTMLElement>('.cta-card').forEach((el, i) => {
        gsap.fromTo(el, { opacity:0, y:32 }, { opacity:1, y:0, duration:.8, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 88%' }, delay: i * .12 })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Magnetic effect
  const onCardMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const r  = el.getBoundingClientRect()
    const x  = (e.clientX - (r.left + r.width/2))  * .18
    const y  = (e.clientY - (r.top  + r.height/2)) * .18
    gsap.to(el, { x, y, duration:.5, ease:'power3.out' })
  }
  const onCardLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x:0, y:0, duration:.8, ease:'elastic.out(1,.4)' })
  }

  return (
    <section ref={ref} id="contact" style={{ padding:'var(--pad-y) var(--pad-x)', maxWidth:1480, margin:'0 auto', borderTop:'1px solid var(--line)' }}>
      <span className="tag" style={{ marginBottom:'clamp(28px,4vw,48px)', display:'block' }}>§ 07 — Coordinates</span>

      <h2 className="display-1" style={{ marginBottom:'clamp(40px,5vw,64px)' }}>
        <span className="reveal-line"><span>Let's build</span></span>
        <span className="reveal-line"><span>something <span style={{ fontStyle:'italic', color:'var(--blue)' }}>that matters.</span></span></span>
      </h2>

      <p className="lede center" style={{ marginBottom:'clamp(48px,6vw,80px)' }}>
        I'm applying to the Gründerszene Summer Internship because I want to be in a room with people who take building seriously. If that room is yours, here's how to find me.
      </p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--line)' }}>
        {[
          { href:'mailto:alicia.frommann@gmail.com',            label:'Email',       value:'alicia.frommann@gmail.com',   arrow:'→', ext:false },
          { href:'https://linkedin.com/in/alicia-f-a4a21a224',  label:'LinkedIn',    value:'/in/alicia-f-a4a21a224',      arrow:'↗', ext:true  },
          { href:'https://thinktogetherapp.vercel.app',          label:'The product', value:'thinktogetherapp.vercel.app', arrow:'↗', ext:true  },
        ].map(c => (
          <a key={c.href} className="cta-card" href={c.href}
            target={c.ext?'_blank':undefined} rel={c.ext?'noopener noreferrer':undefined}
            style={{ background:'var(--paper)', padding:'clamp(28px,4vw,48px)', display:'flex', flexDirection:'column', gap:12, opacity:0, textDecoration:'none', transition:'background .3s' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='var(--cream-2)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='var(--paper)'}}
            onMouseMove={onCardMove}
          >
            <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink-3)' }}>{c.label}</span>
            <span style={{ fontWeight:500, fontSize:'clamp(14px,1.3vw,19px)', color:'var(--ink)', letterSpacing:'-.01em' }}>{c.value}</span>
            <span style={{ marginTop:'auto', fontSize:22, color:'var(--blue)' }}>{c.arrow}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
