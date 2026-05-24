export default function ProjectBridge() {
  return (
    <div style={{
      background: '#08080A',
      borderTop: '1px solid #1C1C1A',
      borderBottom: '1px solid #1C1C1A',
      padding: 'clamp(48px,6vw,80px) clamp(24px,6vw,80px)',
      textAlign: 'center' as const,
    }}>
      <div style={{maxWidth:'820px',margin:'0 auto'}}>
        <p style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase' as const,
          color: '#6B9E5E',
          marginBottom: '28px',
          fontFamily: 'var(--font-geist-mono)',
        }}>
          Two projects · One conviction
        </p>
        <blockquote style={{
          fontFamily: 'var(--font-cormorant, Georgia, serif)',
          fontWeight: 300,
          fontSize: 'clamp(22px,3vw,40px)',
          lineHeight: 1.35,
          letterSpacing: '-0.02em',
          color: '#F0EAE0',
          margin: '0 0 20px',
        }}>
          ThinkTogether creates the cognitive foundation.{' '}
          <em style={{color:'#857E74'}}>
            PeakPlant creates the emotional space.
          </em>
        </blockquote>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.75,
          color: '#857E74',
          maxWidth: '580px',
          margin: '0 auto',
        }}>
          Both work on the same mental models — at different depths. The question is the same in both: what does it take for a person to see their own system, and change it?
        </p>
      </div>
    </div>
  )
}
