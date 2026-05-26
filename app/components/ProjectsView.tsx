'use client'

export function ProjectsView({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>Projects</p>

        <h1 style={{ fontSize: 'clamp(36px,6vw,80px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '8px' }}>
          Two products live.
        </h1>
        <p style={{ fontSize: 'clamp(18px,2.2vw,28px)', color: 'var(--blue)', fontStyle: 'italic', marginBottom: '64px', letterSpacing: '-0.02em' }}>
          Built in the margins.
        </p>

        {/* ThinkTogether */}
        <div style={{ marginBottom: '64px', paddingBottom: '64px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>01 / Live</p>
              <h2 style={{ fontSize: 'clamp(28px,4.5vw,64px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0 }}>ThinkTogether</h2>
            </div>
            <a href="https://thinktogetherapp.com" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              Open app
            </a>
          </div>
          <p style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '580px', marginBottom: '32px' }}>
            AI-assisted SaaS platform for systems thinking and causal loop diagram modeling. Built for teams, consultants, and educators who want to think more clearly about complex problems.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1px', background: 'var(--line)' }}>
            {[
              { l: 'Stack', v: 'Next.js 14 · Supabase · Anthropic API · Vercel' },
              { l: 'Status', v: 'Live · actively used · Bosch + MCI pilots' },
              { l: 'Model', v: 'Freemium SaaS · Free / Solo €7/mo / Team €49/mo' },
              { l: 'Seeking', v: 'Technical co-founder — looking in Berlin this summer' },
            ].map(({ l, v }) => (
              <div key={l} style={{ padding: 'clamp(14px,2vw,24px)', background: 'var(--paper)' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>{l}</p>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.55 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PeakPlant */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>02 / Launching August 2026</p>
              <h2 style={{ fontSize: 'clamp(28px,4.5vw,64px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0 }}>PeakPlant</h2>
            </div>
            <a href="https://peak-plant.com/en" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', textDecoration: 'none' }}>
              Visit site
            </a>
          </div>
          <p style={{ fontSize: 'clamp(16px,1.8vw,22px)', color: 'var(--blue)', fontStyle: 'italic', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            safe. soft. wild.
          </p>
          <p style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '580px', marginBottom: '32px' }}>
            Edition 01. 6 condoms. 6 reflection cards. 1 seed paper card. Made for the moments that stay with you — vegan, fair rubber latex. Launching August 2026.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {[
              "we hadn't talked like that in years. not because we didn't want to — we just didn't know how to start. — beta tester, Stuttgart",
              "moments of real intimacy are just beautiful. i didn't know this could bring us even closer together. — beta tester, Muenchen",
            ].map((q, i) => (
              <p key={i} style={{ fontSize: '14px', color: 'var(--ink-2)', fontStyle: 'italic', lineHeight: 1.65, paddingLeft: '16px', borderLeft: '2px solid var(--blue)' }}>{q}</p>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[['6', 'condoms', 'vegan · fair rubber'], ['6', 'reflection cards', 'one question each'], ['∞', 'editions', 'same box · new world']].map(([n, l, s]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1 }}>{n}</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginTop: '4px' }}>{l}</p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.04em', marginTop: '2px' }}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
          <button onClick={() => onNav('pitch')} style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', background: 'transparent', cursor: 'pointer' }}>
            See the pitch
          </button>
        </div>
      </div>
    </div>
  )
}
