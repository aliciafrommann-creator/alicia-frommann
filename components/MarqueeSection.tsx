'use client'

const ITEMS = [
  'Systems Thinking', '·', 'Causal Loop Diagrams', '·', 'Organizational Change', '·',
  'Digital Transformation', '·', 'Trail Running', '·', 'Podcast Host', '·',
  'Three Languages', '·', 'ThinkTogether', '·', 'Innsbruck → World', '·',
  'Inner Work', '·', 'Feedback Loops', '·',
  'Systems Thinking', '·', 'Causal Loop Diagrams', '·', 'Organizational Change', '·',
  'Digital Transformation', '·', 'Trail Running', '·', 'Podcast Host', '·',
  'Three Languages', '·', 'ThinkTogether', '·', 'Innsbruck → World', '·',
  'Inner Work', '·', 'Feedback Loops', '·',
]

export default function MarqueeSection() {
  return (
    <div className="border-t border-b border-[#1C1C1A] py-5 overflow-hidden">
      <div
        className="flex gap-14 whitespace-nowrap"
        style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="font-cormorant text-[18px] italic flex-shrink-0"
            style={{ color: item === '·' ? '#6B9E5E' : '#3A3935', fontStyle: item === '·' ? 'normal' : 'italic' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
