'use client'

const ITEMS = [
  'Building in Public', '·',
  'ThinkTogether — Live', '·',
  'PeakPlant — Launching August 2026', '·',
  'Rippl — Coming to Berlin', '·',
  'Two Products. Ten Weeks.', '·',
  'Gründerszene Startup-Sommercamp', '·',
  'Next.js · Supabase · Anthropic API', '·',
  'Systems Thinker', '·',
  'Trail Runner', '·',
  'Innsbruck → Berlin', '·',
  'Building in Public', '·',
  'ThinkTogether — Live', '·',
  'PeakPlant — Launching August 2026', '·',
  'Rippl — Coming to Berlin', '·',
  'Two Products. Ten Weeks.', '·',
  'Gründerszene Startup-Sommercamp', '·',
  'Next.js · Supabase · Anthropic API', '·',
  'Systems Thinker', '·',
  'Trail Runner', '·',
  'Innsbruck → Berlin', '·',
]

export default function MarqueeSection() {
  return (
    <div style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      padding: '20px 0',
      overflow: 'hidden',
    }}>
      <div
        style={{
          display: 'flex',
          gap: '56px',
          whiteSpace: 'nowrap',
          animation: 'marquee 32s linear infinite',
          width: 'max-content',
        }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '13px',
              flexShrink: 0,
              color: item === '·' ? 'var(--blue)' : 'var(--ink-2)',
              letterSpacing: '.04em',
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
