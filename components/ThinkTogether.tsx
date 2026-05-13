'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ThinkTogether() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-line > span').forEach(el => {
        gsap.fromTo(el, { y: '110%' }, {
          y: 0, duration: 1.0, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="thinktogether" style={{ padding:'var(--pad-y) var(--pad-x)', maxWidth:1480, margin:'0 auto' }}>
      {/* Head */}
      <div style={{ marginBottom:'clamp(56px,8vw,112px)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:32, marginBottom:'clamp(28px,3vw,40px)', flexWrap:'wrap' }}>
          <span className="tag">§ 02 — The work</span>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--blue)', letterSpacing:'.02em' }}>
            <i style={{ width:6, height:6, borderRadius:'50%', background:'var(--blue)', animation:'pulse 2s var(--ease-out) infinite', display:'inline-block' }} />
            Live · v0.4 · thinktogetherapp.vercel.app
          </span>
        </div>
        <h2 className="display-2">
          <span className="reveal-line"><span>ThinkTogether.</span></span>
          <span className="reveal-line"><span className="italic">See the system.</span></span>
          <span className="reveal-line"><span className="italic">Move together.</span></span>
        </h2>
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.05fr', gap:'clamp(40px,6vw,96px)', alignItems:'start' }}>
        {/* Copy */}
        <div>
          <p className="lede" style={{ marginBottom:48, maxWidth:520 }}>
            A SaaS platform that helps teams cut through complexity — turning fragmented perspectives into a shared picture of cause and effect, so decisions stick and change actually moves.
          </p>
          <ol style={{ listStyle:'none', borderTop:'1px solid var(--line)', marginBottom:36 }}>
            {[
              ['01','Surface','Collect input from across the team — text, voice, notes. AI maps the variables and connections that are actually driving the problem.'],
              ['02','Align','The shared picture builds in real time. Everyone sees the same system — reinforcing loops, bottlenecks, leverage points.'],
              ['03','Act','Run interventions on the model before you run them on the organisation. Prioritise. Assign. Move.'],
            ].map(([num, title, desc]) => (
              <li key={num} style={{ padding:'26px 0', display:'grid', gridTemplateColumns:'56px 1fr', gap:'6px 16px', alignItems:'baseline', borderBottom:'1px solid var(--line)' }}>
                <span style={{ gridRow:'1/3', fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--blue)', letterSpacing:'.04em', paddingTop:4 }}>{num}</span>
                <h3 style={{ fontWeight:600, fontSize:22, letterSpacing:'-.015em', color:'var(--ink)' }}>{title}</h3>
                <p style={{ fontSize:14, lineHeight:1.55, color:'var(--ink-2)', maxWidth:460 }}>{desc}</p>
              </li>
            ))}
          </ol>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:32 }}>
            {['Next.js 14','Supabase','Anthropic API','Tailwind','D3'].map(c => (
              <span key={c} style={{ padding:'6px 12px', background:'var(--paper)', border:'1px solid var(--line)', borderRadius:999, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-2)', letterSpacing:'.02em' }}>{c}</span>
            ))}
          </div>
          <a href="https://thinktogetherapp.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            fontFamily:'var(--font-geist-mono)', fontSize:13, letterSpacing:'.02em',
            padding:'12px 18px', background:'var(--blue)', color:'var(--paper)', borderRadius:999,
            transition:'gap .3s var(--ease-soft),background .3s',
          }}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background='var(--blue-deep)'}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background='var(--blue)'}}>
            <span>Visit thinktogetherapp.vercel.app</span><span>↗</span>
          </a>
        </div>

        {/* Value panel — right side */}
        <figure>
          <div style={{ background:'var(--paper)', border:'1px solid var(--line)', borderRadius:12, overflow:'hidden' }}>
            {/* header bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom:'1px solid var(--line)', background:'var(--cream-2)', fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>
              <div style={{ display:'flex', gap:6 }}>
                <span style={{ padding:'5px 10px', borderRadius:6, border:'1px solid var(--line)', background:'var(--paper)', color:'var(--ink)' }}>value_overview.md</span>
                <span style={{ padding:'5px 10px', borderRadius:6, border:'1px solid transparent', color:'var(--ink-3)' }}>roadmap.md</span>
              </div>
              <span style={{ display:'inline-flex', alignItems:'center', gap:6, color:'var(--blue)', textTransform:'uppercase', letterSpacing:'.08em' }}>
                <i style={{ width:6, height:6, borderRadius:'50%', background:'var(--blue)', animation:'pulse 2s var(--ease-out) infinite', display:'inline-block' }} />
                live · v0.4
              </span>
            </div>
            {/* Value cards */}
            <div style={{ padding:'clamp(24px,3vw,36px)', display:'flex', flexDirection:'column', gap:20 }}>
              {/* Pain → Resolution rows */}
              {[
                {
                  pain:'Teams align on the wrong thing — fast.',
                  resolution:'ThinkTogether maps cause and effect before the first decision. Everyone sees the same system, not their own version of it.',
                  tag:'Alignment',
                  icon:'◎',
                },
                {
                  pain:'Change stalls — people resist what they didn't help build.',
                  resolution:'Sessions are collaborative by design. Mental models shift in the room, not in a slide deck sent afterwards.',
                  tag:'Enablement',
                  icon:'↻',
                },
                {
                  pain:'Processes stay bloated because no one sees the whole.',
                  resolution:'The shared map makes bottlenecks and redundancies visible. Leaner decisions, fewer meetings, faster adaptation.',
                  tag:'Process Flow',
                  icon:'→',
                },
                {
                  pain:'AI tools land without context — people use them wrong or not at all.',
                  resolution:'Working with ThinkTogether trains the exact thinking AI needs from humans: systems awareness, mental flexibility, structured reflection.',
                  tag:'AI Enablement',
                  icon:'⬡',
                },
              ].map((row, i) => (
                <div key={i} style={{ display:'grid', gridTemplateColumns:'28px 1fr', gap:'10px 14px', padding:'18px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                  <span style={{ fontSize:16, color:'var(--blue)', paddingTop:2, lineHeight:1 }}>{row.icon}</span>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                      <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:9, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--blue)', padding:'3px 7px', border:'1px solid var(--blue)', borderRadius:99, opacity:.7 }}>{row.tag}</span>
                    </div>
                    <p style={{ fontSize:12, fontWeight:600, color:'var(--ink)', lineHeight:1.45, marginBottom:5 }}>{row.pain}</p>
                    <p style={{ fontSize:12, lineHeight:1.6, color:'var(--ink-2)' }}>{row.resolution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <figcaption style={{ marginTop:14, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>ThinkTogether works at every stage — from first alignment to ongoing optimisation.</figcaption>
        </figure>
      </div>
    </section>
  )
}
