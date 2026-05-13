'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ThinkTogether() {
  const ref = useRef<HTMLElement>(null)
  const [tab, setTab] = useState<'value'|'loop'>('value')

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
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='var(--ink)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='var(--blue)'}}>
            <span>Visit thinktogetherapp.vercel.app</span><span>↗</span>
          </a>
        </div>

        {/* Right panel */}
        <figure>
          <div style={{ background:'var(--paper)', border:'1px solid var(--line)', borderRadius:12, overflow:'hidden' }}>
            {/* Tab bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom:'1px solid var(--line)', background:'var(--cream-2)', fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>
              <div style={{ display:'flex', gap:4 }}>
                <button onClick={()=>setTab('value')} style={{ padding:'5px 10px', borderRadius:6, border:'1px solid', cursor:'pointer', background:tab==='value'?'var(--paper)':'transparent', borderColor:tab==='value'?'var(--line)':'transparent', color:tab==='value'?'var(--ink)':'var(--ink-3)', fontFamily:'inherit', fontSize:'inherit', letterSpacing:'inherit', transition:'all .2s' }}>value_overview.md</button>
                <button onClick={()=>setTab('loop')} style={{ padding:'5px 10px', borderRadius:6, border:'1px solid', cursor:'pointer', background:tab==='loop'?'var(--paper)':'transparent', borderColor:tab==='loop'?'var(--line)':'transparent', color:tab==='loop'?'var(--ink)':'var(--ink-3)', fontFamily:'inherit', fontSize:'inherit', letterSpacing:'inherit', transition:'all .2s' }}>reinforcing_loop.cld</button>
              </div>
              <span style={{ display:'inline-flex', alignItems:'center', gap:6, color:'var(--blue)', textTransform:'uppercase', letterSpacing:'.08em' }}>
                <i style={{ width:6, height:6, borderRadius:'50%', background:'var(--blue)', animation:'pulse 2s var(--ease-out) infinite', display:'inline-block' }} />
                live · v0.4
              </span>
            </div>

            {/* Value tab */}
            {tab === 'value' && (
              <div style={{ padding:'clamp(24px,3vw,36px)', display:'flex', flexDirection:'column', gap:20 }}>
                {[
                  { pain:'Teams align on the wrong thing — fast.', resolution:'ThinkTogether maps cause and effect before the first decision. Everyone sees the same system, not their own version of it.', tag:'Alignment', icon:'◎' },
                  { pain:'Change stalls — people resist what they didn\'t help build.', resolution:'Sessions are collaborative by design. Mental models shift in the room, not in a slide deck sent afterwards.', tag:'Enablement', icon:'↻' },
                  { pain:'Processes stay bloated because no one sees the whole.', resolution:'The shared map makes bottlenecks and redundancies visible. Leaner decisions, fewer meetings, faster adaptation.', tag:'Process Flow', icon:'→' },
                  { pain:'AI tools land without context — people use them wrong or not at all.', resolution:'Working with ThinkTogether trains the exact thinking AI needs from humans: systems awareness, mental flexibility, structured reflection.', tag:'AI Enablement', icon:'⬡' },
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
            )}

            {/* Loop tab */}
            {tab === 'loop' && (
              <svg viewBox="0 0 600 530" style={{ width:'100%', height:'auto', display:'block' }}>
                <defs>
                  <marker id="arrowRR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1D4FFF" /></marker>
                  <radialGradient id="glowCtr" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1D4FFF" stopOpacity=".18" /><stop offset="100%" stopColor="#1D4FFF" stopOpacity="0" /></radialGradient>
                </defs>
                <text x="300" y="22" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:9, fill:'var(--ink-4)', letterSpacing:'.12em', textTransform:'uppercase' } as React.CSSProperties}>R+ · reinforcing · TT is a lever at every node</text>
                <path id="re0" d="M323.4,91.3 Q362.9,134.4 421.2,138.4" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" fill="none" markerEnd="url(#arrowRR)" />
                <path id="re1" d="M450.4,175.0 Q441.3,232.8 474.6,280.9" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" fill="none" markerEnd="url(#arrowRR)" />
                <path id="re2" d="M464.2,326.5 Q413.4,355.4 396.5,411.4" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" fill="none" markerEnd="url(#arrowRR)" />
                <path id="re3" d="M354.3,431.7 Q300.0,410.0 245.7,431.7" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" fill="none" markerEnd="url(#arrowRR)" />
                <path id="re4" d="M203.5,411.4 Q186.6,355.4 135.8,326.5" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" fill="none" markerEnd="url(#arrowRR)" />
                <path id="re5" d="M125.4,280.9 Q158.7,232.8 149.6,175.0" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" fill="none" markerEnd="url(#arrowRR)" />
                <path id="re6" d="M178.8,138.4 Q237.1,134.4 276.6,91.3" stroke="#1D4FFF" strokeWidth="1.4" strokeDasharray="5 4" fill="none" markerEnd="url(#arrowRR)" />
                <circle r="2.8" fill="#1D4FFF" opacity=".85"><animateMotion dur="6s" repeatCount="indefinite" begin="0s"><mpath href="#re0" /></animateMotion></circle>
                <circle r="2.8" fill="#1D4FFF" opacity=".85"><animateMotion dur="6s" repeatCount="indefinite" begin="0.86s"><mpath href="#re1" /></animateMotion></circle>
                <circle r="2.8" fill="#1D4FFF" opacity=".85"><animateMotion dur="6s" repeatCount="indefinite" begin="1.71s"><mpath href="#re2" /></animateMotion></circle>
                <circle r="2.8" fill="#1D4FFF" opacity=".85"><animateMotion dur="6s" repeatCount="indefinite" begin="2.57s"><mpath href="#re3" /></animateMotion></circle>
                <circle r="2.8" fill="#1D4FFF" opacity=".85"><animateMotion dur="6s" repeatCount="indefinite" begin="3.43s"><mpath href="#re4" /></animateMotion></circle>
                <circle r="2.8" fill="#1D4FFF" opacity=".85"><animateMotion dur="6s" repeatCount="indefinite" begin="4.29s"><mpath href="#re5" /></animateMotion></circle>
                <circle r="2.8" fill="#1D4FFF" opacity=".85"><animateMotion dur="6s" repeatCount="indefinite" begin="5.14s"><mpath href="#re6" /></animateMotion></circle>
                <circle cx="300" cy="265" r="54" fill="url(#glowCtr)" />
                <circle cx="300" cy="265" r="33" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.8" />
                <text x="300" y="260" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:'var(--ink)', letterSpacing:'.06em', textTransform:'uppercase', fontWeight:'bold' } as React.CSSProperties}>Mental</text>
                <text x="300" y="272" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:'var(--ink)', letterSpacing:'.06em', textTransform:'uppercase', fontWeight:'bold' } as React.CSSProperties}>Models</text>
                <circle cx="300" cy="80" r="22" fill="var(--paper)" stroke="#1D4FFF" strokeWidth="1.3" />
                <text x="300" y="52" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:'var(--ink)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em' } as React.CSSProperties}>Mental Models</text>
                <circle cx="444" cy="157" r="22" fill="var(--paper)" stroke="#1D4FFF" strokeWidth="1.3" />
                <text x="490" y="153" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:'var(--ink)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em' } as React.CSSProperties}>Reflection</text>
                <circle cx="480" cy="307" r="22" fill="var(--paper)" stroke="#1D4FFF" strokeWidth="1.3" />
                <text x="530" y="303" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:'var(--ink)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em' } as React.CSSProperties}>Leadership</text>
                <circle cx="375" cy="430" r="22" fill="var(--paper)" stroke="#1D4FFF" strokeWidth="1.3" />
                <text x="375" y="468" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:'var(--ink)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em' } as React.CSSProperties}>Trust</text>
                <circle cx="225" cy="430" r="22" fill="var(--paper)" stroke="#1D4FFF" strokeWidth="1.3" />
                <text x="225" y="468" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:'var(--ink)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em' } as React.CSSProperties}>Psych Safety</text>
                <circle cx="120" cy="307" r="22" fill="var(--paper)" stroke="#1D4FFF" strokeWidth="1.3" />
                <text x="70" y="303" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:'var(--ink)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em' } as React.CSSProperties}>Risk-Taking</text>
                <circle cx="156" cy="157" r="22" fill="var(--paper)" stroke="#1D4FFF" strokeWidth="1.3" />
                <text x="110" y="153" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:'var(--ink)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em' } as React.CSSProperties}>Innovation</text>
              </svg>
            )}
          </div>
          <figcaption style={{ marginTop:14, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>
            {tab === 'value' ? 'Pain points ThinkTogether resolves at every stage of team development.' : 'R+ · Mental Models at the centre. ThinkTogether is a lever at every variable in this loop.'}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
