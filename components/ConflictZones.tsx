'use client'
import { useEffect, useRef, useState } from 'react'

const ZONES = [
  {
    id: 'hp',
    quadrant: 'top-left',
    title: 'High-Performance Zone',
    axis: 'High task conflict · Low relationship conflict',
    color: '#22c55e',
    colorFaint: 'rgba(34,197,94,.08)',
    icon: '↗',
    frontTag: 'Where you want to be',
    back: {
      headline: 'Keep the edge sharp.',
      body: 'Your team debates ideas, not people. ThinkTogether keeps it that way — by making the system visible, so friction stays productive and decisions hold.',
      tags: ['Causal loop mapping', 'Shared mental models', 'Decision logs'],
    },
  },
  {
    id: 'ow',
    quadrant: 'top-right',
    title: 'Overwhelmed Zone',
    axis: 'High task conflict · High relationship conflict',
    color: '#a78bfa',
    colorFaint: 'rgba(167,139,250,.08)',
    icon: '⚡',
    frontTag: 'Too much, too fast',
    back: {
      headline: 'Separate signal from noise.',
      body: 'Too many problems, too little clarity on what\'s actually driving what. ThinkTogether surfaces the leverage points — so the team stops firefighting and starts deciding.',
      tags: ['Complexity reduction', 'Leverage point analysis', 'Priority alignment'],
    },
  },
  {
    id: 'cf',
    quadrant: 'bottom-left',
    title: 'Comfort Zone',
    axis: 'Low task conflict · Low relationship conflict',
    color: '#f59e0b',
    colorFaint: 'rgba(245,158,11,.08)',
    icon: '○',
    frontTag: 'Dangerously calm',
    back: {
      headline: 'Wake up the system.',
      body: 'Harmony isn\'t performance. Teams here avoid hard questions. ThinkTogether introduces structured tension — surfacing assumptions and blind spots before they become crises.',
      tags: ['Assumption mapping', 'Premortems', 'Challenge loops'],
    },
  },
  {
    id: 'tx',
    quadrant: 'bottom-right',
    title: 'Toxic Zone',
    axis: 'Low task conflict · High relationship conflict',
    color: '#f87171',
    colorFaint: 'rgba(248,113,113,.08)',
    icon: '✕',
    frontTag: 'People vs. people',
    back: {
      headline: 'Redirect the energy.',
      body: 'Conflict is personal, not productive. ThinkTogether shifts attention to the shared system — taking pressure off people and putting it back on structure, where it can be solved.',
      tags: ['Depersonalisation', 'System-level reframe', 'Trust rebuilding'],
    },
  },
]

export default function ConflictZones() {
  const ref = useRef<HTMLElement>(null)
  const [flipped, setFlipped] = useState<string | null>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const cards = document.querySelectorAll('.cz-card')
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.07,
            scrollTrigger: { trigger: card, start: 'top 88%' } }
        )
      })
      // headline
      gsap.from('.cz-word', {
        opacity: 0, y: 20, stagger: 0.07, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.cz-headline', start: 'top 85%' },
      })
      cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill())
    })()
    return () => cleanup?.()
  }, [])

  return (
    <section
      ref={ref}
      id="conflict-zones"
      style={{ padding: 'var(--pad-y) var(--pad-x)', maxWidth: 1480, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <span className="tag">§ 02.5 — The four zones</span>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.04em' }}>
            hover or tap a card to flip →
          </span>
        </div>
        <h2 className="cz-headline display-2">
          <span className="cz-word" style={{ display: 'block' }}>High-performing</span>
          <span className="cz-word" style={{ display: 'block' }}>teams don&apos;t avoid</span>
          <span className="cz-word italic" style={{ display: 'block', color: 'var(--blue)' }}>conflict.</span>
        </h2>
        <p style={{ marginTop: 24, fontSize: 'clamp(14px,1.1vw,17px)', lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: 560 }}>
          They keep it about the <em>work</em>, not the people. Every team sits somewhere in this matrix.
          ThinkTogether is the lever that moves them — and keeps them moving.
        </p>
      </div>

      {/* Axis labels + Grid */}
      <div style={{ position: 'relative' }}>
        {/* Y axis label */}
        <div style={{
          position: 'absolute', left: -8, top: '50%',
          transform: 'translateX(-100%) translateY(-50%) rotate(-90deg)',
          fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--ink-4)',
          letterSpacing: '.1em', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>
          Task Conflict
        </div>
        {/* X axis label */}
        <div style={{
          textAlign: 'center', marginTop: 12,
          fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--ink-4)',
          letterSpacing: '.1em', textTransform: 'uppercase',
        }}>
        </div>

        {/* 2×2 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}>
          {ZONES.map((zone) => {
            const isFlipped = flipped === zone.id
            return (
              <div
                key={zone.id}
                className="cz-card"
                onMouseEnter={() => setFlipped(zone.id)}
                onMouseLeave={() => setFlipped(null)}
                onClick={() => setFlipped(isFlipped ? null : zone.id)}
                style={{
                  height: 'clamp(200px, 22vw, 280px)',
                  perspective: 900,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{
                  position: 'relative', width: '100%', height: '100%',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.52s cubic-bezier(0.16,1,0.3,1)',
                  borderRadius: 12,
                  boxShadow: isFlipped
                    ? `0 12px 36px ${zone.color}22, 0 2px 8px rgba(0,0,0,.06)`
                    : '0 2px 8px rgba(0,0,0,.05)',
                }}>
                  {/* FRONT */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    background: zone.colorFaint,
                    border: `1px solid ${zone.color}44`,
                    borderRadius: 12, padding: 'clamp(20px,2.5vw,32px)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'var(--font-geist-mono)', fontSize: 9, letterSpacing: '.1em',
                        textTransform: 'uppercase', color: zone.color,
                        padding: '4px 8px', border: `1px solid ${zone.color}55`, borderRadius: 99,
                      }}>{zone.frontTag}</span>
                      <span style={{ fontSize: 18, color: zone.color, opacity: .7 }}>{zone.icon}</span>
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: 'clamp(16px,1.4vw,22px)', fontWeight: 700, letterSpacing: '-.02em',
                        color: 'var(--ink)', marginBottom: 6,
                      }}>{zone.title}</h3>
                      <p style={{
                        fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--ink-4)',
                        letterSpacing: '.04em', textTransform: 'uppercase',
                      }}>{zone.axis}</p>
                    </div>
                  </div>

                  {/* BACK */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: zone.color,
                    borderRadius: 12, padding: 'clamp(20px,2.5vw,32px)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}>
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-geist-mono)', fontSize: 9, letterSpacing: '.1em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 10,
                      }}>ThinkTogether here →</p>
                      <h4 style={{
                        fontSize: 'clamp(15px,1.3vw,19px)', fontWeight: 700, color: '#fff',
                        letterSpacing: '-.01em', marginBottom: 8, lineHeight: 1.3,
                      }}>{zone.back.headline}</h4>
                      <p style={{
                        fontSize: 'clamp(12px,0.9vw,13.5px)', color: 'rgba(255,255,255,.85)',
                        lineHeight: 1.6, maxWidth: 340,
                      }}>{zone.back.body}</p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                      {zone.back.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: 'var(--font-geist-mono)', fontSize: 9, letterSpacing: '.06em',
                          textTransform: 'uppercase', padding: '4px 8px',
                          background: 'rgba(255,255,255,.18)', borderRadius: 99,
                          color: '#fff',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* X axis label below */}
        <div style={{
          textAlign: 'center', marginTop: 10,
          fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--ink-4)',
          letterSpacing: '.1em', textTransform: 'uppercase',
        }}>
          Relationship Conflict →
        </div>
      </div>

      {/* Bottom note: ThinkTogether as lever */}
      <div style={{
        marginTop: 'clamp(48px,5vw,72px)',
        borderTop: '1px solid var(--line)',
        paddingTop: 'clamp(32px,4vw,48px)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)',
        alignItems: 'start',
      }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 12 }}>The meta-insight</p>
          <p style={{ fontSize: 'clamp(15px,1.1vw,17px)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
            ThinkTogether is not just a tool for the Comfort and Toxic zones.
            It&apos;s a lever at <em>every</em> variable in the reinforcing loop — it trains mental models,
            integrates AI and digital practice, builds psychological safety, and accelerates the
            kind of learning that high-performance cultures run on.
          </p>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 12 }}>Already in the zone?</p>
          <p style={{ fontSize: 'clamp(15px,1.1vw,17px)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
            High-performance teams use ThinkTogether to make their processes leaner — fewer meetings,
            clearer decisions, faster adaptation to change. The loop keeps reinforcing.
          </p>
        </div>
      </div>
    </section>
  )
}
