'use client'

import { PsychologySection } from './PsychologySection'

export function ProductView({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>The product</p>

        <h1 style={{ fontSize: 'clamp(36px,6.5vw,88px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '8px' }}>
          Participation OS
        </h1>
        <p style={{ fontSize: 'clamp(18px,2.2vw,28px)', color: 'var(--blue)', fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: '24px' }}>
          AI-native infrastructure for real-world human coordination.
        </p>
        <p style={{ fontSize: 'clamp(15px,1.5vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '620px', marginBottom: '64px' }}>
          A multiplayer game for real-world participation — where sustainability becomes a side effect of identity. Not a sustainability app. A platform that makes people feel more alive, more connected, more present.
        </p>

        {/* Core Loop */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>The core loop</p>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: '24px', fontStyle: 'italic' }}>This is the company. Everything else is secondary.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1px', background: 'var(--line)' }}>
            {[
              { n: '01', s: 'AI detects', d: 'timing, location, social energy, free window' },
              { n: '02', s: 'Mission appears', d: 'right emotional moment, low friction' },
              { n: '03', s: 'Friends join', d: 'trusted group — not strangers' },
              { n: '04', s: 'Streak grows', d: 'team momentum builds' },
              { n: '05', s: 'Repeats', d: 'identity forms, city feels alive' },
            ].map(({ n, s, d }) => (
              <div key={n} style={{ padding: 'clamp(18px,2.5vw,28px)', background: 'var(--paper)', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '10px' }}>{n}</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px', fontStyle: 'italic' }}>{s}</p>
                <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.5 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why now */}
        <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(28px,4vw,48px)', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Why now</p>
          <p style={{ fontSize: 'clamp(18px,2.5vw,32px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px' }}>
            AI is flooding the internet with synthetic content.
          </p>
          <p style={{ fontSize: 'clamp(18px,2.5vw,32px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.03em', lineHeight: 1.2, fontStyle: 'italic' }}>
            Real human participation just became the scarce resource.
          </p>
        </div>

        {/* Business Model */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>Business model</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1px', background: 'var(--line)' }}>
            {[
              { stream: 'Free tier', model: 'Core product — missions, groups, streaks. Complete enough to spread.', when: 'Day 1' },
              { stream: 'Premium', model: 'Deeper AI coordination, ritual builder, emotional analytics, anti-scroll systems.', when: 'Month 3+' },
              { stream: 'Local partnerships', model: 'QR rewards at sustainable cafes and shops. Commission on verified visits.', when: 'Week 5–6' },
              { stream: 'Corporate B2B2C', model: 'Same product, corporate access. €5/employee/month. ESG budget.', when: 'Year 2' },
            ].map(({ stream, model, when }) => (
              <div key={stream} style={{ padding: 'clamp(16px,2.5vw,28px)', background: 'var(--paper)' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '8px' }}>{when}</p>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>{stream}</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6 }}>{model}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>Roadmap</p>
          {[
            { phase: 'Phase 1', t: 'Berlin density', when: 'July–Sept 2026', items: ['Missions + trusted groups + streaks', '5–10 QR partner shops', 'First 1,000 users', 'Prove the core loop'] },
            { phase: 'Phase 2', t: 'Ritual expansion', when: 'Q4 2026', items: ['Group ritual builder', 'Creator-led missions', 'District leaderboards', 'Second city'] },
            { phase: 'Phase 3', t: 'Local ecosystem', when: '2027', items: ['Brand partnership marketplace', 'University programs', 'Corporate tier launch'] },
            { phase: 'Phase 4', t: 'Presence OS', when: '2027+', items: ['International expansion', 'City wellbeing programs', 'AI-native infrastructure at scale'] },
          ].map(({ phase, t, when, items }, i) => (
            <div key={phase} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '24px', padding: '24px 0', borderBottom: '1px solid var(--line)' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>{phase}</p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>{when}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', marginBottom: '10px', fontStyle: 'italic' }}>{t}</h3>
                {items.map(item => (
                  <p key={item} style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.55 }}>— {item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Psychology Section — the strongest demo */}
        <PsychologySection />

        <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
          <button onClick={() => onNav('pitch')} style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', background: 'transparent', cursor: 'pointer' }}>
            See the pitch
          </button>
        </div>
      </div>
    </div>
  )
}
