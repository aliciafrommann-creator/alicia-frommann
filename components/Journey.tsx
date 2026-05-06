'use client'
import { useEffect, useRef } from 'react'

const ROLES = [
  {
    year: '2025 — Now',
    title: 'Founder',
    italic: true,
    org: 'ThinkTogether · Solo',
    line: 'Building software for groups to think together about systems they are inside of. Because collective intelligence needs better interfaces.',
    tag: 'Active',
  },
  {
    year: '2025 — Now',
    title: 'Consultant',
    italic: false,
    org: 'Mücke Roth & Company · Munich',
    line: 'End-to-end service & sales transformation in the energy sector. Big org, real stakes, systemic change.',
  },
  {
    year: '2024 — Now',
    title: 'M.Sc. Digital Business',
    italic: false,
    org: 'MCI · GPA 1.3',
    line: 'Sustainable innovation, data, and the messy interior of digital transformation. Thesis: collective intelligence in organisational contexts.',
  },
  {
    year: '04/24 – 12/24',
    title: 'Working Student, CPM',
    italic: false,
    org: 'Robert Bosch GmbH · Stuttgart',
    line: 'Redesigned global Product Management structures across Mobility BUs. Org design at scale inside one of the world\'s most complex companies.',
  },
  {
    year: '02/23 – 08/23',
    title: 'Intern, Transformation',
    italic: false,
    org: 'Robert Bosch GmbH',
    line: 'Designed the Peer-to-Peer Change Lab — a workshop format rolled out to 63 cross-functional teams globally.',
  },
  {
    year: '08/23 – 02/24',
    title: 'Exchange Semester',
    italic: false,
    org: 'LAB University, Finland · GPA 1.0',
    line: 'Forests, saunas, and the Nordic version of leadership. Also: distributed decision-making and trust culture.',
  },
  {
    year: '2021 – 2025',
    title: 'B.Sc. International Business',
    italic: false,
    org: 'ESB Reutlingen',
    line: 'Strategic focus + sustainability seat on student initiative IB Vision. Origin story of thinking in systems.',
  },
]

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: any
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        const track = trackRef.current
        if (!track) return
        const getDist = () => track.scrollWidth - window.innerWidth + 80
        gsap.to(track, {
          x: () => -getDist(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${getDist()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }, sectionRef)
    })()
    return () => ctx?.revert()
  }, [])

  const cardW = 'clamp(300px,26vw,390px)'

  return (
    <section
      ref={sectionRef}
      id="journey"
      style={{ overflow: 'hidden', borderTop: '1px solid var(--line)' }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          height: '100vh',
          position: 'relative',
        }}
      >
        {/* Rail */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 1,
          background: 'var(--line)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Header panel */}
        <div style={{
          width: '100vw',
          flexShrink: 0,
          padding: 'var(--pad-y) var(--pad-x)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative',
          zIndex: 1,
        }}>
          <div>
            <span
              className="tag"
              style={{ display: 'block', marginBottom: 32 }}
            >
              § 05 — Curriculum vitae
            </span>
            <div>
              {['The path,', 'so far.'].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', lineHeight: 1.05, paddingBottom: '.08em' }}>
                  <span style={{
                    display: 'block',
                    fontFamily: 'var(--font-geist)',
                    fontWeight: 600,
                    fontSize: 'clamp(44px,8vw,132px)',
                    letterSpacing: '-.035em',
                    color: i === 1 ? 'var(--blue)' : 'var(--ink)',
                    fontStyle: i === 1 ? 'italic' : 'normal',
                    lineHeight: 1.05,
                  }}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <span style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: 11,
            letterSpacing: '.12em',
            textTransform: 'uppercase' as const,
            color: 'var(--blue)',
            animation: 'nudge 1.6s ease-out infinite',
          }}>
            Scroll →
          </span>
        </div>

        {/* Role cards */}
        {ROLES.map((r, i) => (
          <article
            key={i}
            style={{
              position: 'relative',
              zIndex: 1,
              flexShrink: 0,
              width: cardW,
              height: '56vh',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginLeft: i === 0 ? 0 : 24,
              transform: i % 2 === 0 ? 'translateY(-5vh)' : 'translateY(5vh)',
              transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--ink)'
              e.currentTarget.style.background = 'var(--cream-2)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,14,26,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--line)'
              e.currentTarget.style.background = 'var(--paper)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Dot connector to rail */}
            <div style={{
              position: 'absolute',
              top: i % 2 === 0 ? 'calc(100% + 5vh - 4px)' : '-5vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--blue)',
              flexShrink: 0,
            }} />

            <span style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 11,
              color: 'var(--blue)',
              letterSpacing: '.04em',
            }}>
              {r.year}
            </span>

            <h3 style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '-.02em',
              color: 'var(--ink)',
              lineHeight: 1.15,
              fontStyle: r.italic ? 'italic' : 'normal',
            }}>
              {r.title}
            </h3>

            <span style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 11,
              color: 'var(--ink-3)',
              letterSpacing: '.02em',
            }}>
              {r.org}
            </span>

            <p style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: 'var(--ink-2)',
              marginTop: 'auto',
              borderTop: '1px solid var(--line)',
              paddingTop: 14,
            }}>
              {r.line}
            </p>

            {r.tag && (
              <span style={{
                alignSelf: 'flex-start',
                padding: '4px 10px',
                background: 'var(--blue-soft)',
                color: 'var(--blue)',
                borderRadius: 999,
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 10,
                letterSpacing: '.06em',
                textTransform: 'uppercase' as const,
              }}>
                {r.tag}
              </span>
            )}
          </article>
        ))}

        {/* End card */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
          width: cardW,
          height: '56vh',
          border: '1px dashed var(--line-2)',
          borderRadius: 14,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
          marginLeft: 24,
          marginRight: 'var(--pad-x)',
          transform: ROLES.length % 2 === 0 ? 'translateY(-5vh)' : 'translateY(5vh)',
        }}>
          <span style={{
            fontSize: 48,
            color: 'var(--blue)',
            lineHeight: 1,
            fontWeight: 300,
          }}>
            ✺
          </span>
          <p style={{
            fontFamily: 'var(--font-geist)',
            fontSize: 'clamp(16px,1.3vw,20px)',
            fontWeight: 400,
            lineHeight: 1.45,
            color: 'var(--ink)',
            letterSpacing: '-.01em',
          }}>
            Next chapter:
            <br />
            <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Gründerszene.</em>
          </p>
          <p style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: 11,
            color: 'var(--ink-4)',
            letterSpacing: '.04em',
            lineHeight: 1.6,
          }}>
            Summer 2026 · Internship
          </p>
        </div>
      </div>

      <style>{`
        @keyframes nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }
      `}</style>
    </section>
  )
}
