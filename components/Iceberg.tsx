'use client'
import { useState, useEffect, useRef } from 'react'

const LAYERS = [
  {
    num: '01', pct: '10%', label: 'Events',
    title: 'What we see',
    body: 'The visible outputs — headlines, incidents, quarterly results, product launches. Most institutions react here. Events are symptoms, not causes.',
    tierY: 0, tierH: 200, isAccent: false,
  },
  {
    num: '02', pct: '25%', label: 'Patterns',
    title: 'What keeps happening',
    body: 'Zoom out and events reveal rhythms — the same conflict resurfaces every quarter, the same hire doesn\'t stick. Seeing patterns lets us predict and adapt, not just react.',
    tierY: 200, tierH: 115, isAccent: false,
  },
  {
    num: '03', pct: '30%', label: 'Structures',
    title: 'The shape that holds it',
    body: 'Org charts, incentive systems, reporting lines, calendar structures. The architecture of attention. Change the structure and the patterns change with it — everything downstream shifts.',
    tierY: 315, tierH: 138, isAccent: false,
  },
  {
    num: '04', pct: '25%', label: 'Mental models',
    title: 'What we believe is true',
    body: '"Speed beats care." "Engineers don\'t talk to customers." The unexamined defaults that design the structures above them. Invisible until named — then impossible to unsee.',
    tierY: 453, tierH: 112, isAccent: false,
  },
  {
    num: '05', pct: '10%', label: 'Purpose',
    title: 'What the system is for',
    body: 'The source code. Shift the fundamental purpose and the whole structure has to redraw itself. The highest-leverage point — and where I prefer to start.',
    tierY: 565, tierH: 90, isAccent: true,
  },
]

const ICE_PATH =
  'M 240,20 L 188,68 L 207,96 L 156,148 L 177,194 L 96,200 ' +
  'C 40,295 12,408 54,508 C 96,600 172,648 240,655 ' +
  'C 308,648 384,600 426,508 C 468,408 440,295 384,200 ' +
  'L 305,194 L 326,148 L 275,96 L 294,68 Z'

export default function Iceberg() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const current = hovered !== null ? hovered : active

  useEffect(() => {
    let ctx: any
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        gsap.from('.ice-header > *', {
          opacity: 0, y: 28, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ice-header', start: 'top 86%' },
        })
        gsap.from('.ice-stage', {
          opacity: 0, y: 36, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.ice-stage', start: 'top 86%' },
        })
      }, sectionRef)
    })()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="iceberg"
      style={{
        padding: 'var(--pad-y) var(--pad-x)',
        maxWidth: 1480,
        margin: '0 auto',
        borderTop: '1px solid var(--line)',
      }}
    >
      {/* Header */}
      <div
        className="ice-header"
        style={{ marginBottom: 'clamp(56px,8vw,96px)', maxWidth: 980 }}
      >
        <span className="tag" style={{ display: 'block', marginBottom: 24 }}>
          § 03 — Iceberg model
        </span>
        <div style={{ marginBottom: 24 }}>
          {["What you see", "isn't where I work."].map((line, i) => (
            <div
              key={i}
              style={{ overflow: 'hidden', lineHeight: 1.05, paddingBottom: '.08em' }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 600,
                  fontSize: 'clamp(44px,8vw,132px)',
                  letterSpacing: '-.035em',
                  color: i === 1 ? 'var(--blue)' : 'var(--ink)',
                  fontStyle: i === 1 ? 'italic' : 'normal',
                  lineHeight: 1.05,
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
        <p className="lede">
          Most of any system — like most of any iceberg — is below the waterline.
          The visible events are 10%. The other 90% is where the leverage lives.
        </p>
      </div>

      {/* Stage */}
      <div
        className="ice-stage"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px,480px) 1fr',
          gap: 'clamp(48px,6vw,96px)',
          alignItems: 'start',
        }}
      >
        {/* SVG iceberg */}
        <div style={{ position: 'sticky', top: '10vh' }}>
          <svg
            viewBox="0 0 480 680"
            style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}
          >
            <defs>
              <clipPath id="ice-clip">
                <path d={ICE_PATH} />
              </clipPath>
              <linearGradient id="ice-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FAF8F3" />
                <stop offset="55%" stopColor="#EEF2FF" />
                <stop offset="100%" stopColor="#DCE5FF" />
              </linearGradient>
              <linearGradient id="ice-water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(29,79,255,0.13)" />
                <stop offset="100%" stopColor="rgba(29,79,255,0.03)" />
              </linearGradient>
            </defs>

            {/* Water tint */}
            <rect x="0" y="200" width="480" height="480" fill="url(#ice-water)" />

            {/* Iceberg body */}
            <path d={ICE_PATH} fill="url(#ice-fill)" stroke="rgba(10,14,26,0.14)" strokeWidth="1.5" />

            {/* Tier highlights clipped to iceberg */}
            <g clipPath="url(#ice-clip)">
              {LAYERS.map((l, i) => (
                <rect
                  key={i}
                  x="0" y={l.tierY} width="480" height={l.tierH}
                  fill={current === i ? 'rgba(29,79,255,0.20)' : 'transparent'}
                  style={{ transition: 'fill 0.3s ease', cursor: 'pointer' }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
            </g>

            {/* Tier dividers */}
            {[315, 453, 565].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="480" y2={y}
                stroke="rgba(10,14,26,0.07)" strokeWidth="1"
                clipPath="url(#ice-clip)" />
            ))}

            {/* Water line */}
            <line x1="0" y1="200" x2="480" y2="200"
              stroke="var(--blue)" strokeWidth="1"
              strokeDasharray="5 4" strokeOpacity="0.5" />
            <text x="8" y="194" fontFamily="monospace" fontSize="9"
              fill="var(--blue)" fillOpacity="0.6" letterSpacing="1.5">
              WATERLINE
            </text>
            <text x="472" y="194" fontFamily="monospace" fontSize="9"
              fill="var(--blue)" fillOpacity="0.6" textAnchor="end" letterSpacing="1.5">
              10% VISIBLE
            </text>

            {/* Tier labels */}
            {LAYERS.map((l, i) => (
              <text
                key={`lbl-${i}`}
                x="240" y={l.tierY + l.tierH / 2 + 4}
                fontFamily="monospace" fontSize="10"
                textAnchor="middle"
                fill={current === i ? 'rgba(29,79,255,0.9)' : 'rgba(10,14,26,0.25)'}
                letterSpacing="2"
                style={{
                  textTransform: 'uppercase',
                  transition: 'fill 0.3s',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {l.label.toUpperCase()}
              </text>
            ))}

            {/* Floating dots */}
            {[[180, 340], [300, 430], [240, 525], [158, 495], [322, 580]].map(
              ([cx, cy], i) => (
                <circle key={`dot-${i}`} cx={cx} cy={cy} r={2.2}
                  fill="var(--blue)" fillOpacity="0.38">
                  <animate
                    attributeName="cy"
                    values={`${cy};${cy - 16};${cy}`}
                    dur={`${5 + i * 1.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )
            )}

            {/* Active tier arrow */}
            {LAYERS.map((l, i) => {
              if (current !== i) return null
              const midY = l.tierY + l.tierH / 2
              return (
                <polygon
                  key={`arr-${i}`}
                  points={`494,${midY - 7} 507,${midY} 494,${midY + 7}`}
                  fill="var(--blue)" fillOpacity="0.8"
                  style={{ pointerEvents: 'none', transition: 'all 0.3s' }}
                />
              )
            })}
          </svg>
        </div>

        {/* Right: deck + strip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Deck header */}
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingBottom: 16,
              borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 11, letterSpacing: '.04em',
              color: 'var(--ink-3)', textTransform: 'uppercase' as const,
            }}
          >
            <span>Layer {LAYERS[current].num} / 05</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--blue)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--blue)', display: 'inline-block',
                animation: 'pulse 2s ease-out infinite',
              }} />
              Hover · click to explore
            </span>
          </div>

          {/* Cards */}
          <div style={{ position: 'relative', height: 380 }}>
            {LAYERS.map((l, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute', inset: 0,
                  opacity: current === i ? 1 : 0,
                  transform: current === i ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  pointerEvents: current === i ? 'auto' : 'none',
                  display: 'flex', flexDirection: 'column', gap: 18,
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 10,
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: 11, letterSpacing: '.06em',
                  color: 'var(--ink-3)', textTransform: 'uppercase' as const,
                }}>
                  <span>{l.num}</span>
                  <span style={{ opacity: 0.4 }}>/</span>
                  <span>{l.label}</span>
                </div>

                <div style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 600,
                  fontSize: 'clamp(56px,7vw,92px)',
                  letterSpacing: '-.04em',
                  color: 'var(--blue)',
                  lineHeight: 1,
                }}>
                  {l.pct}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 600,
                  fontSize: 'clamp(26px,3vw,40px)',
                  lineHeight: 1.05,
                  letterSpacing: '-.025em',
                  color: 'var(--ink)',
                }}>
                  {l.title}
                </h3>

                <p style={{
                  fontSize: 'clamp(15px,1.1vw,17px)',
                  lineHeight: 1.65,
                  color: 'var(--ink-2)',
                  maxWidth: 480,
                }}>
                  {l.body}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation strip */}
          <div style={{
            paddingTop: 16,
            borderTop: '1px solid var(--line)',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 8,
          }}>
            {LAYERS.map((l, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  textAlign: 'left',
                  padding: '8px 0 8px 12px',
                  borderTop: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  borderLeft: `1px solid ${active === i ? 'var(--blue)' : 'var(--line)'}`,
                  background: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: 10,
                  letterSpacing: '.04em',
                  color: active === i ? 'var(--blue)' : 'var(--ink-3)',
                  textTransform: 'uppercase' as const,
                  transition: 'color 0.3s, border-color 0.3s',
                }}
              >
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 600,
                  fontSize: 18,
                  letterSpacing: '-.02em',
                  color: 'inherit',
                  textTransform: 'none',
                  marginBottom: 2,
                }}>
                  {l.pct}
                </span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
