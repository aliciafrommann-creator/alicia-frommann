'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROLES = [
  { year:'2025 — Now',    title:'Founder',                       italic:true,  org:'ThinkTogether · Solo',                    line:'Building software for groups to think together about systems they're inside of.',   tag:'Active' },
  { year:'2025 — Now',    title:'Consultant',                    italic:false, org:'Mücke Roth & Company · Munich',            line:'End-to-end service & sales transformation in the energy sector.' },
  { year:'2024 — Now',    title:'M.Sc. Digital Business',        italic:false, org:'MCI Innsbruck · GPA 1.3',                  line:'Sustainable innovation, data, and the messy interior of digital transformation.' },
  { year:'04/24 – 12/24', title:'Working Student, CPM',          italic:false, org:'Robert Bosch GmbH · Stuttgart',            line:'Redesigned global Product Management structures across Mobility BUs.' },
  { year:'02/23 – 08/23', title:'Intern, Transformation',        italic:false, org:'Robert Bosch GmbH',                       line:'Designed the Peer-to-Peer Change Lab — a workshop format for 63 cross-functional teams.' },
  { year:'08/23 – 02/24', title:'Exchange Semester',             italic:false, org:'LAB University, Finland · GPA 1.0',        line:'Forests, saunas, and the Nordic version of leadership theory.' },
  { year:'2021 – 2025',   title:'B.Sc. International Business',  italic:false, org:'ESB Business School · Reutlingen',         line:'Strategic focus, sustainability seat on student initiative IB Vision.' },
]

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return
      const getDist = () => track.scrollWidth - window.innerWidth + 80
      gsap.to(track, {
        x: () => -getDist(), ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', end: () => `+=${getDist()}`,
          scrub: .8, pin: true, invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // Animate cards in as they scroll into view horizontally — using simple opacity
      gsap.utils.toArray<HTMLElement>('.role-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: .7, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: () => `top top-=${i * 160}px`, toggleActions: 'play none none none' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="journey" style={{ overflow:'hidden', borderTop:'1px solid var(--line)' }}>
      <div ref={trackRef} style={{ display:'flex', alignItems:'stretch', width:'max-content', height:'100vh' }}>

        {/* Header */}
        <div style={{ width:'100vw', flexShrink:0, padding:'var(--pad-y) var(--pad-x)', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <span className="tag" style={{ marginBottom:32, display:'block' }}>§ 05 — Curriculum vitae</span>
            <h2 className="display-2">
              <span className="reveal-line"><span>The path,</span></span>
              <span className="reveal-line"><span style={{ fontStyle:'italic', color:'var(--blue)' }}>so far.</span></span>
            </h2>
          </div>
          <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, letterSpacing:'.08em', color:'var(--ink-3)', textTransform:'uppercase' }}>Drag / Scroll →</span>
        </div>

        {/* Cards */}
        {ROLES.map((r, i) => (
          <article key={i} className="role-card" style={{
            flexShrink:0, width:380,
            borderLeft:'1px solid var(--line)',
            padding:'var(--pad-y) 48px',
            display:'flex', flexDirection:'column', gap:14,
            transition:'background .3s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-4)', letterSpacing:'.04em' }}>{r.year}</span>
            <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:'-.02em', color:'var(--ink)', lineHeight:1.2, fontStyle:r.italic?'italic':'normal' }}>{r.title}</h3>
            <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--blue)', letterSpacing:'.02em' }}>{r.org}</span>
            <p style={{ fontSize:14, lineHeight:1.65, color:'var(--ink-2)' }}>{r.line}</p>
            {r.tag && <span style={{ alignSelf:'flex-start', padding:'4px 10px', background:'var(--blue-soft)', color:'var(--blue)', borderRadius:999, fontFamily:'var(--font-geist-mono)', fontSize:10, letterSpacing:'.06em', textTransform:'uppercase', marginTop:8 }}>{r.tag}</span>}
          </article>
        ))}

        {/* End */}
        <div style={{ flexShrink:0, width:380, borderLeft:'1px solid var(--line)', padding:'var(--pad-y) 48px', display:'flex', flexDirection:'column', justifyContent:'center', gap:20 }}>
          <span style={{ fontSize:32, color:'var(--blue)' }}>✺</span>
          <p style={{ fontSize:16, lineHeight:1.7, color:'var(--ink-2)', maxWidth:280 }}>Origin: <em>Plochingen</em>.<br/>Heading: anywhere the systems are still soft enough to move.</p>
        </div>
      </div>
    </section>
  )
}
