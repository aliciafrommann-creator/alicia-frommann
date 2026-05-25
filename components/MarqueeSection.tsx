'use client'

const ITEMS = [
  'Systems Thinking', '·', 'Causal Loop Diagrams', '·', 'Organizational Change', '·',
  'Digital Transformation', '·', 'Trail Running', '·', 'Three Languages', '·',
  'Inner Work', '·', 'Feedback Loops', '·', 'Berlin 2026', '·',
  'Systems Thinking', '·', 'Causal Loop Diagrams', '·', 'Organizational Change', '·',
  'Digital Transformation', '·', 'Trail Running', '·', 'Three Languages', '·',
  'Inner Work', '·', 'Feedback Loops', '·', 'Berlin 2026', '·',
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
          animation: 'marquee 28s linear infinite',
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
    </div>
  )
}
