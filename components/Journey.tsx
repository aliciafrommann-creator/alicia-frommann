'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROLES = [
  { year:'2025 — Now', title:'Founder', co:'ThinkTogether', org:'Solo · Innsbruck', line:'Building software for groups to think together about systems they’re inside of.', tag:'Active' },
  { year:'2025 — Now', title:'Consultant', co:'', org:'Mücke Roth & Company · Munich', line:'End-to-end service & sales transformation in the energy sector.' },
  { year:'2024 — Now', title:'M.Sc. Digital Business', co:'', org:'MCI Innsbruck · GPA 1.3', line:'Sustainable innovation, data, and the messy interior of digital transformation.' },
  { year:'04/24 — 12/24', title:'Working Student, CPM', co:'', org:'Robert Bosch GmbH · Stuttgart', line:'Redesigned global Product Management structures across Mobility BUs and regions.' },
  { year:'02/23 — 08/23', title:'Intern, Transformation & Leadership', co:'', org:'Robert Bosch GmbH', line:'Designed the Peer-to-Peer Change Lab — a workshop format for managers translating strategy into practice.' },
  { year:'08/23 — 02/24', title:'Exchange Semester', co:'', org:'LAB University, Finland · GPA 1.0', line:'Forests, saunas, and the Nordic version of leadership theory.' },
  { year:'2021 — 2025', title:'B.Sc. International Business', co:'', org:'ESB Business School · Reutlingen', line:'Strategic focus, sustainability seat on student initiative IB Vision.' },
]

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return
      const getDist = () => track.scrollWidth - window.innerWidth + 64
      gsap.to(track, {
        x: () => -getDist(), ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDist()}`,
          scrub: .6,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="journey" style={{ overflow:'hidden', borderTop:'1px solid var(--line)' }}>
      <div ref={trackRef} style={{ display:'flex', alignItems:'stretch', width:'max-content' }}>
        {/* Header card */}
        <div style={{ width:'100vw', flexShrink:0, padding:'var(--pad-y) var(--pad-x)', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <span className="tag" style={{ marginBottom:32, display:'block' }}>§ 05 — Curriculum vitae</span>
            <h2 className="display-2">
              <span className="reveal-line"><span>The path,</span></span>
              <span className="reveal-line"><span className="italic">so far.</span></span>
            </h2>
          </div>
          <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, letterSpacing:'.08em', color:'var(--ink-3)', textTransform:'uppercase' }}>Scroll →</span>
        </div>

        {/* Role cards */}
        {ROLES.map((r, i) => (
          <article key={i} style={{
            flexShrink:0, width:400,
            borderLeft:'1px solid var(--line)',
            padding:'var(--pad-y) 48px',
            display:'flex', flexDirection:'column', gap:12,
          }}>
            <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.04em' }}>{r.year}</span>
            <h3 style={{ fontSize:22, fontWeight:600, letterSpacing:'-.02em', color:'var(--ink)', lineHeight:1.15 }}>
              <span style={{ fontStyle: r.title === 'Founder' ? 'italic' : undefined }}>{r.title}</span>
              {r.co && <span style={{ fontStyle:'normal' }}>{r.title === 'Founder' ? ', ' : ''}{r.co}</span>}
            </h3>
            <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--blue)', letterSpacing:'.02em' }}>{r.org}</span>
            <p style={{ fontSize:14, lineHeight:1.65, color:'var(--ink-2)', maxWidth:320 }}>{r.line}</p>
            {r.tag && <span style={{ display:'inline-block', alignSelf:'flex-start', padding:'4px 10px', background:'var(--blue-soft)', color:'var(--blue)', borderRadius:999, fontFamily:'var(--font-geist-mono)', fontSize:10, letterSpacing:'.06em', textTransform:'uppercase', marginTop:8 }}>{r.tag}</span>}
          </article>
        ))}

        {/* End card */}
        <div style={{ flexShrink:0, width:400, borderLeft:'1px solid var(--line)', padding:'var(--pad-y) 48px', display:'flex', flexDirection:'column', justifyContent:'center', gap:16 }}>
          <span style={{ fontSize:28, color:'var(--blue)' }}>&#10042;</span>
          <p style={{ fontSize:16, lineHeight:1.7, color:'var(--ink-2)', maxWidth:280 }}>
            Origin: <em>Plochingen</em>.<br />
            Heading: anywhere the systems are still soft enough to move.
          </p>
        </div>
      </div>
    </section>
  )
}
