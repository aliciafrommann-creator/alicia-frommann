'use client'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--pad-y) var(--pad-x)',
        maxWidth: '1480px',
        margin: '0 auto',
      }}
    >
      {/* Eyebrow */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '16px',
      }}>
        <span style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '11px',
          letterSpacing: '.1em',
          textTransform: 'uppercase' as const,
          color: 'var(--ink-3)',
        }}>
          Founder · Systems Thinker · MSc Candidate · Innsbruck
        </span>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '11px',
          color: 'var(--blue)',
          letterSpacing: '.04em',
        }}>
          <i style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: 'var(--blue)',
            animation: 'pulse 2s var(--ease-out) infinite',
            display: 'inline-block',
          }} />
          Gründerszene · Berlin · 2026
        </span>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(56px,8vw,112px) 0' }}>
        <h1 style={{
          fontFamily: 'var(--font-geist)',
          fontWeight: 600,
          fontSize: 'clamp(60px,11vw,168px)',
          lineHeight: 0.88,
          letterSpacing: '-.04em',
          color: 'var(--ink)',
          marginBottom: 'clamp(32px,4vw,56px)',
        }}>
          <span style={{ display: 'block' }}>Alicia</span>
          <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--blue)' }}>Frommann.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(18px,1.8vw,26px)',
          lineHeight: 1.55,
          color: 'var(--ink-2)',
          maxWidth: '580px',
          marginBottom: 'clamp(40px,5vw,64px)',
          fontFamily: 'var(--font-geist)',
          letterSpacing: '-.01em',
        }}>
          Building tools and thinking that help people see{' '}
          <em style={{ color: 'var(--ink)', fontStyle: 'italic' }}>the system beneath the surface.</em>
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
          <a
            href="#anschreiben"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 26px',
              background: 'var(--ink)', color: 'var(--paper)',
              borderRadius: '999px',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '12px', letterSpacing: '.06em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none', transition: 'background .3s',
            }}
          >
            Anschreiben lesen →
          </a>
          <a
            href="#application"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 26px',
              border: '1px solid var(--line)', color: 'var(--ink)',
              borderRadius: '999px',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '12px', letterSpacing: '.06em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none', transition: 'border-color .3s, color .3s',
            }}
          >
            Application
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap' as const,
        gap: '16px',
      }}>
        <span style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '10px',
          letterSpacing: '.18em',
          textTransform: 'uppercase' as const,
          color: 'var(--ink-3)',
          animation: 'nudge 2s ease-in-out infinite',
        }}>
          Scroll ↓
        </span>
        <span style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '10px',
          color: 'var(--ink-3)',
          letterSpacing: '.06em',
        }}>
          Innsbruck · Mai 2026
        </span>
      </div>
    </section>
  )
}
