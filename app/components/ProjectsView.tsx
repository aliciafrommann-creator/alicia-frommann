'use client'

export function ProjectsView({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>Projects</p>

        <h1 style={{ fontSize: 'clamp(36px,6vw,80px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '8px' }}>
          Two products built.
        </h1>
        <p style={{ fontSize: 'clamp(18px,2.2vw,28px)', color: 'var(--blue)', fontStyle: 'italic', marginBottom: '64px', letterSpacing: '-0.02em' }}>
          Built in the margins — beside work and university.
        </p>
        <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '20px 0', marginBottom: '56px' }}>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '720px' }}>
            If Berlin happens, I will prioritize accordingly: get close to the founder community, learn from people building around me, test faster, push each other and live what we do for 10 weeks. This is not hustle culture to me. It is building a dream, and that is a privilege.
          </p>
        </div>

        {/* ThinkTogether */}
        <div style={{ marginBottom: '64px', paddingBottom: '64px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>01 / Built · testing</p>
              <h2 style={{ fontSize: 'clamp(28px,4.5vw,64px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0 }}>ThinkTogether</h2>
            </div>
            <span style={{ padding: '10px 20px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>
              Prototype available on request
            </span>
          </div>
          <p style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '680px', marginBottom: '22px' }}>
            ThinkTogether is a working-name AI-assisted platform and workshop format that helps organizations and education teams model complex problems as systems, identify feedback loops and make better decisions from them.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '760px', marginBottom: '28px' }}>
            The starting point is a pattern I have seen in practice and in my studies: decisions are often made through linear cause-effect logic, even when the underlying problems are shaped by feedback loops, delays and hidden assumptions. The AI helps people think structurally and circularly, with foundations from Sterman, Meadows and Senge implemented directly into the product logic.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden', marginBottom: '28px' }}>
            {[
              ['What it does', 'model complex problems', 'identify feedback loops', 'derive better decisions'],
              ['Scientific basis', 'Sterman (2000)', 'Meadows (2008)', 'Senge (1990)'],
              ['Current pilots', 'MCI university course', 'Muecke Roth & Company', 'Bosch alumni conversations'],
              ['Built in reality', 'working prototype', 'first workshops', 'evenings and weekends'],
            ].map(([title, a, b, c]) => (
              <div key={title} style={{ padding: 'clamp(16px,2vw,22px)', background: 'var(--paper)' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>{title}</p>
                {[a, b, c].map(line => (
                  <p key={line} style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.45, padding: '7px 0', borderTop: '1px solid var(--line)' }}>{line}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1px', background: 'var(--line)' }}>
            {[
              { l: 'Stack', v: 'Next.js 14 · Supabase · Anthropic API · Vercel' },
              { l: 'Status', v: 'Working prototype · first workshops and pilot conversations with MCI, Muecke Roth & Company and Bosch alumni' },
              { l: 'Model', v: 'Freemium SaaS · Free / Solo €7/mo / Team €49/mo' },
              { l: 'Seeking', v: 'Technical co-founder — looking in Berlin if the right builder appears' },
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
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>02 / Built · supplier talks</p>
              <h2 style={{ fontSize: 'clamp(28px,4.5vw,64px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0 }}>PeakPlant</h2>
            </div>
            <a href="https://peak-plant.com/en" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', textDecoration: 'none' }}>
              Visit site
            </a>
          </div>
          <p style={{ fontSize: 'clamp(16px,1.8vw,22px)', color: 'var(--blue)', fontStyle: 'italic', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            safe. soft. wild.
          </p>
          <p style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '640px', marginBottom: '24px' }}>
            PeakPlant starts with a premium first edition: 6 condoms, 6 reflection cards and one seed paper card with a QR code into a digital world. But the deeper vision is bigger than a condom box.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '720px', marginBottom: '28px' }}>
            PeakPlant exists because modern intimacy is increasingly shaped by systems that make people feel disconnected, performative, anxious and emotionally unsafe. The product is a physical and digital entry point into a different intimacy culture: safer, softer, wilder and more conscious.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden', marginBottom: '28px' }}>
            {[
              ['Culture shift', 'performance → presence', 'external validation → inner safety', 'shame → openness'],
              ['Edition system', 'clear white outer box', 'distinct colour world inside', 'same format · new emotional world'],
              ['Digital layer', 'playlists, templates, podcast episodes', 'founder insights and community events', 'one free Teams workshop per edition'],
              ['Manufacturing', 'CE / EU MDR compliant', 'ISO 13485 · EN ISO 4074', 'vegan natural rubber latex if possible'],
            ].map(([title, a, b, c]) => (
              <div key={title} style={{ padding: 'clamp(16px,2vw,22px)', background: 'var(--paper)' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>{title}</p>
                {[a, b, c].map(line => (
                  <p key={line} style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.45, padding: '7px 0', borderTop: '1px solid var(--line)' }}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {[
              "we hadn't talked like that in years. not because we didn't want to — we just didn't know how to start. — beta tester, Stuttgart",
              "moments of real intimacy are just beautiful. i didn't know this could bring us even closer together. — beta tester, Muenchen",
            ].map((q, i) => (
              <p key={i} style={{ fontSize: '14px', color: 'var(--ink-2)', fontStyle: 'italic', lineHeight: 1.65, paddingLeft: '16px', borderLeft: '2px solid var(--blue)' }}>{q}</p>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '28px' }}>
            {[['6', 'condoms', 'CE/MDR partner search'], ['6', 'reflection cards', 'questions live on cards first'], ['1', 'seed paper QR', 'opens the digital edition'], ['10–15k', 'first target quantity', 'right partner over large MOQ']].map(([n, l, s]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1 }}>{n}</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginTop: '4px' }}>{l}</p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.04em', marginTop: '2px' }}>{s}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '18px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '720px' }}>
              Current status: supplier conversations for compliant condoms, responsible latex options and bulk delivery without retail boxes while developing premium packaging. Long term, the reflection questions can move from cards onto the foils — so each wrapper becomes part of the ritual.
            </p>
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
