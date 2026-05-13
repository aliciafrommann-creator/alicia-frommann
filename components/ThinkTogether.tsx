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
          <span className="reveal-line"><span className="italic">From messy problem</span></span>
          <span className="reveal-line"><span className="italic">to clear decision.</span></span>
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

        {/* CLD frame */}
        <figure>
          <div style={{ background:'var(--paper)', border:'1px solid var(--line)', borderRadius:12, overflow:'hidden' }}>
            {/* browser bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom:'1px solid var(--line)', background:'var(--cream-2)', fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>
              <div style={{ display:'flex', gap:6 }}>
                <span style={{ padding:'5px 10px', borderRadius:6, border:'1px solid var(--line)', background:'var(--paper)', color:'var(--ink)' }}>team_complexity.cld</span>
                <span style={{ padding:'5px 10px', borderRadius:6, border:'1px solid transparent', color:'var(--ink-3)' }}>trust_loop.cld</span>
              </div>
              <span style={{ display:'inline-flex', alignItems:'center', gap:6, color:'var(--blue)', textTransform:'uppercase', letterSpacing:'.08em' }}>
                <i style={{ width:6, height:6, borderRadius:'50%', background:'var(--blue)', animation:'pulse 2s var(--ease-out) infinite', display:'inline-block' }} />
                simulating
              </span>
            </div>
            {/* SVG */}
            <svg viewBox="0 0 600 480" style={{
              width:'100%', height:'auto', display:'block',
              background:'radial-gradient(circle at 50% 50%,rgba(29,79,255,.06),transparent 70%),var(--paper)',
            }}>
              <defs>
                <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1D4FFF" /></marker>
                <marker id="arrowC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0A2EE6" /></marker>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1D4FFF" stopOpacity=".25" />
                  <stop offset="100%" stopColor="#1D4FFF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g fill="none" strokeLinecap="round">
                <path id="e1" d="M 180 110 Q 280 70 380 110" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" style={{ animation:'dash 30s linear infinite' }} markerEnd="url(#arrowB)" />
                <path id="e2" d="M 430 150 Q 470 240 430 330" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" style={{ animation:'dash 30s linear infinite' }} markerEnd="url(#arrowB)" />
                <path id="e3" d="M 380 370 Q 280 410 180 370" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" style={{ animation:'dash 30s linear infinite' }} markerEnd="url(#arrowB)" />
                <path id="e4" d="M 130 330 Q 90 240 130 150" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" style={{ animation:'dash 30s linear infinite' }} markerEnd="url(#arrowB)" />
                <path id="e5" d="M 200 240 Q 280 200 360 240" stroke="#0A2EE6" strokeWidth="1.4" strokeDasharray="5 4" opacity=".5" style={{ animation:'dash 30s linear infinite' }} markerEnd="url(#arrowC)" />
                <path id="e6" d="M 360 240 Q 280 280 200 240" stroke="#0A2EE6" strokeWidth="1.4" strokeDasharray="5 4" opacity=".5" style={{ animation:'dash 30s linear infinite' }} markerEnd="url(#arrowC)" />
              </g>
              <g>
                <circle r="3" fill="#1D4FFF"><animateMotion dur="4s" repeatCount="indefinite"><mpath href="#e1" /></animateMotion></circle>
                <circle r="3" fill="#1D4FFF"><animateMotion dur="4s" repeatCount="indefinite" begin="0.6s"><mpath href="#e2" /></animateMotion></circle>
                <circle r="3" fill="#1D4FFF"><animateMotion dur="4s" repeatCount="indefinite" begin="1.2s"><mpath href="#e3" /></animateMotion></circle>
                <circle r="3" fill="#1D4FFF"><animateMotion dur="4s" repeatCount="indefinite" begin="1.8s"><mpath href="#e4" /></animateMotion></circle>
                <circle r="2.5" fill="#0A2EE6"><animateMotion dur="3.2s" repeatCount="indefinite"><mpath href="#e5" /></animateMotion></circle>
                <circle r="2.5" fill="#0A2EE6"><animateMotion dur="3.2s" repeatCount="indefinite" begin="1.6s"><mpath href="#e6" /></animateMotion></circle>
              </g>
              <g style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, fill:'var(--ink-3)', letterSpacing:'0.12em', textTransform:'uppercase' } as React.CSSProperties}>
                <text x="280" y="58" textAnchor="middle">R · reinforcing</text>
                <text x="280" y="450" textAnchor="middle">B · balancing</text>
              </g>
              {[{cx:130,cy:110,label:'Team complexity',below:false},{cx:430,cy:110,label:'Communication gaps',below:false},{cx:430,cy:370,label:'Decision quality',below:true},{cx:130,cy:370,label:'Trust',below:true},{cx:280,cy:240,label:'Shared mental models',center:true,below:false}].map((n,i)=>(
                <g key={i} transform={`translate(${n.cx} ${n.cy})`}>
                  <circle r={(n as any).center ? 58 : 44} fill="url(#nodeGlow)" />
                  <circle r={(n as any).center ? 30 : 22} fill="var(--paper)" stroke={(n as any).center ? 'var(--ink)' : 'var(--blue)'} strokeWidth={(n as any).center ? 1.8 : 1.4} />
                  <text y={n.below ? 56 : -32} textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:9.5, fill:'var(--ink-2)', letterSpacing:'.04em', textTransform:'uppercase' } as React.CSSProperties}>{n.label}</text>
                </g>
              ))}
            </svg>
          </div>
          <figcaption style={{ marginTop:14, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>Fig. 01 — A simplified loop from a team workshop. Bosch Mobility BU, March 2024.</figcaption>
        </figure>
      </div>
    </section>
  )
}
