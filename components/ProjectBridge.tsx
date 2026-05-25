export default function ProjectBridge() {
  return (
    <div style={{borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)',padding:'clamp(48px,6vw,80px) var(--pad-x)',textAlign:'center' as const}}>
      <div style={{maxWidth:'820px',margin:'0 auto'}}>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.18em',textTransform:'uppercase' as const,marginBottom:'28px'}}>
          Two projects · One conviction
        </p>
        <p style={{fontSize:'clamp(22px,3vw,40px)',lineHeight:1.35,letterSpacing:'-.02em',color:'var(--ink)',marginBottom:'20px',fontWeight:500}}>
          ThinkTogether creates the cognitive foundation.{' '}
          <em style={{color:'var(--ink-2)',fontStyle:'italic'}}>PeakPlant creates the emotional space.</em>
        </p>
        <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.75,color:'var(--ink-2)',maxWidth:'580px',margin:'0 auto'}}>
          Both work on the same mental models — at different depths. The question is the same: what does it take for a person to see their own system, and change it?
        </p>
      </div>
    </div>
  )
}
