'use client'
import { useEffect, useRef } from 'react'

const EPISODES = [
  {
    num: '01',
    title: 'The Future is Us',
    description: 'What does it mean to co-create the future — not predict it? A conversation about collective agency, systems change, and why the future belongs to those who show up.',
    lang: 'EN',
  },
  {
    num: '02',
    title: 'Du bist nicht deine Meinung',
    subtitle: 'und warum das viel verändern kann',
    description: 'Unsere Meinungen fühlen sich an wie wir selbst. Aber was, wenn wir sie loslassen könnten — ohne uns zu verlieren? Über Identität, Wandel und den Mut zur Revision.',
    lang: 'DE',
  },
]

export default function Podcast() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let gsap: typeof import('gsap').gsap
    let ctx: import('gsap').Context

    async function init() {
      const g = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap = g.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Section label + headline reveal
        gsap.from('.pod-label', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.pod-label', start: 'top 88%' },
        })

        gsap.from('.pod-headline span', {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.pod-headline', start: 'top 88%' },
        })

        // Episode cards
        gsap.from('.ep-card', {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ep-card', start: 'top 85%' },
        })

        // Player fade in
        gsap.from('.pod-player', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.pod-player', start: 'top 88%' },
        })
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--cream-2)',
        padding: 'var(--pad-y) var(--pad-x)',
        borderTop: '1px solid var(--line)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'clamp(48px,7vw,96px)' }}>
        <p
          className="pod-label"
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-3)',
            marginBottom: '24px',
          }}
        >
          Podcast — On air
        </p>

        <div
          className="pod-headline"
          style={{ overflow: 'hidden', lineHeight: 1 }}
        >
          {['Thinking', 'out loud.'].map((word, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                overflow: 'hidden',
                lineHeight: 1.05,
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: i === 1 ? 'var(--font-instrument)' : 'var(--font-geist)',
                  fontStyle: i === 1 ? 'italic' : 'normal',
                  fontSize: 'clamp(40px,6vw,96px)',
                  fontWeight: i === 0 ? 600 : 400,
                  color: i === 1 ? 'var(--blue)' : 'var(--ink)',
                  letterSpacing: i === 0 ? '-0.03em' : '-0.02em',
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Layout: episodes left, player right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px,4vw,64px)',
          alignItems: 'start',
        }}
      >
        {/* Episode cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {EPISODES.map((ep) => (
            <a
              key={ep.num}
              href="https://open.spotify.com/show/3OPxkADtMR2v8gJHU7Hb58"
              target="_blank"
              rel="noopener noreferrer"
              className="ep-card"
              style={{
                display: 'block',
                padding: '32px',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--blue)'
                el.style.background = 'var(--blue-soft)'
                el.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--line)'
                el.style.background = 'var(--paper)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: 'var(--blue)',
                    textTransform: 'uppercase',
                  }}
                >
                  Ep {ep.num}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    color: 'var(--ink-4)',
                    textTransform: 'uppercase',
                    background: 'var(--cream-2)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {ep.lang}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontSize: 'clamp(18px,2vw,26px)',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: ep.subtitle ? '4px' : '16px',
                }}
              >
                {ep.title}
              </h3>

              {ep.subtitle && (
                <p
                  style={{
                    fontFamily: 'var(--font-instrument)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(14px,1.3vw,18px)',
                    color: 'var(--ink-3)',
                    marginBottom: '16px',
                    lineHeight: 1.3,
                  }}
                >
                  {ep.subtitle}
                </p>
              )}

              <p
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontSize: '14px',
                  color: 'var(--ink-3)',
                  lineHeight: 1.6,
                }}
              >
                {ep.description}
              </p>

              {/* Play indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '20px',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--blue)' }} />
                  <polygon points="11,9 21,14 11,19" fill="var(--blue)" />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    color: 'var(--blue)',
                    textTransform: 'uppercase',
                  }}
                >
                  Listen on Spotify
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Spotify embed */}
        <div className="pod-player" style={{ position: 'sticky', top: '120px' }}>
          <iframe
            style={{
              borderRadius: '16px',
              width: '100%',
              border: 'none',
              boxShadow: '0 4px 32px rgba(10,14,26,0.08)',
            }}
            src="https://open.spotify.com/embed/show/3OPxkADtMR2v8gJHU7Hb58?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />

          <p
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--ink-4)',
              textTransform: 'uppercase',
              marginTop: '16px',
              textAlign: 'center',
            }}
          >
            Available on Spotify
          </p>
        </div>
      </div>
    </section>
  )
}
