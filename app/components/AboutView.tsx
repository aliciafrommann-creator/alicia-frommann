'use client'

export function AboutView({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>About</p>

        <h1 style={{ fontSize: 'clamp(48px,8vw,112px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 0.92, marginBottom: '40px' }}>
          Alicia<br /><span style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Frommann.</span>
        </h1>

        <p style={{ fontSize: 'clamp(17px,2vw,24px)', color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: '560px', marginBottom: '64px' }}>
          Founder. Systems thinker. MSc candidate. I build things that help people see the structures shaping their lives — and participate more intentionally in them.
        </p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '1px', background: 'var(--line)', marginBottom: '64px' }}>
          {[
            { n: '2', label: 'Products live', sub: 'ThinkTogether · PeakPlant' },
            { n: '1.3', label: 'GPA', sub: 'MSc MCI Innsbruck' },
            { n: '3', label: 'Languages', sub: 'DE · EN · FR' },
            { n: '10', label: 'Weeks in Berlin', sub: 'July — September 2026' },
          ].map(({ n, label, sub }) => (
            <div key={label} style={{ padding: 'clamp(20px,3vw,32px)', background: 'var(--paper)' }}>
              <p style={{ fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '6px' }}>{n}</p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '3px' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.02em' }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* How I think */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>How I think</p>
          {[
            { t: 'Systems before solutions.', b: 'Before I build, I map. What are the feedback loops? Where is the real leverage? This is not a methodology — it is how I see the world.' },
            { t: 'Ship, then learn.', b: 'ThinkTogether was built in evenings and weekends. PeakPlant was designed between lectures. I do not wait for perfect conditions.' },
            { t: 'AI-native from day one.', b: 'I build with modern AI tools, Supabase and Vercel as a practical stack. Not AI as decoration — AI as product architecture.' },
          ].map(({ t, b }, i) => (
            <div key={t} style={{ paddingBottom: '28px', marginBottom: '28px', borderBottom: '1px solid var(--line)' }}>
              <h3 style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '8px', fontStyle: 'italic' }}>{t}</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '520px' }}>{b}</p>
            </div>
          ))}
        </div>

        {/* Journey */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>Journey</p>
          {[
            { y: '2018–2022', r: 'Bachelor of Business Administration', o: 'ESB Business School Reutlingen', d: 'International business, strategy, finance' },
            { y: '2022–2023', r: 'Consultant', o: 'Muecke Roth & Company', d: 'Energy sector strategy and transformation' },
            { y: '2023–2024', r: 'Corporate Transformation & Portfolio Management', o: 'Robert Bosch GmbH', d: 'Systems thinking workshops for executives · Bosch Executive Forum (500 top managers) · ThinkTogether pilot' },
            { y: '2024–now', r: 'MSc Digital Business & Sustainable Innovation', o: 'MCI Innsbruck', d: 'GPA 1.3 · Building ThinkTogether and PeakPlant in parallel' },
            { y: 'July 2026', r: 'Next chapter', o: 'Gruenderszene Startup-Sommercamp · Berlin', d: 'Building Participation OS in public. 10 weeks. Full focus.' },
          ].map(({ y, r, o, d }, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px 24px', padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.02em', paddingTop: '3px' }}>{y}</p>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '2px' }}>{r}</p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', marginBottom: '5px', letterSpacing: '0.02em' }}>{o}</p>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.55 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="mailto:alicia.frommann@gmail.com" style={{ padding: '10px 22px', background: 'var(--blue)', color: 'var(--paper)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
            Write to me
          </a>
          <a href="https://www.linkedin.com/in/alicia-frommann" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', textDecoration: 'none' }}>
            LinkedIn
          </a>
          <button onClick={() => onNav('pitch')} style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', background: 'transparent', cursor: 'pointer' }}>
            See application
          </button>
        </div>
      </div>
    </div>
  )
}
