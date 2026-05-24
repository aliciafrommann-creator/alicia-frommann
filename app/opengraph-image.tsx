import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Alicia Frommann — Gründerszene Startup-Sommercamp 2025'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#FAF8F3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#888888',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#1D4FFF',
            }} />
            Application — Gründerszene Startup-Sommercamp 2025
          </div>
          <div style={{
            fontSize: '13px',
            color: '#888888',
            letterSpacing: '0.04em',
          }}>
            alicia-frommann.vercel.app
          </div>
        </div>

        {/* Divider */}
        <div style={{
          position: 'absolute',
          top: '116px',
          left: '64px',
          right: '64px',
          height: '1px',
          background: '#1A1A1A',
        }} />

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '48px' }}>
          <div style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#0A0E1A',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
          }}>
            Alicia Frommann
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 400,
            color: '#1D4FFF',
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
          }}>
            The idea I want to build in Berlin.
          </div>
          <div style={{
            fontSize: '18px',
            color: '#555555',
            lineHeight: 1.5,
            maxWidth: '680px',
          }}>
            A gamified lifestyle platform that shifts how people consume — not by telling them what to do, but by making the better choice feel natural, social, and rewarding.
          </div>
        </div>

        {/* Bottom row — 3 signals */}
        <div style={{
          display: 'flex',
          gap: '1px',
          background: '#E8E4DC',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {[
            { n: '2',  label: 'Products live',      sub: 'ThinkTogether · PeakPlant' },
            { n: '10', label: 'Weeks in Berlin',     sub: 'July — September 2026' },
            { n: '1',  label: 'Platform to build',  sub: 'Sustainability · AI · Network effects' },
          ].map(({ n, label, sub }) => (
            <div
              key={label}
              style={{
                flex: 1,
                padding: '24px 28px',
                background: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ fontSize: '40px', fontWeight: 700, color: '#0A0E1A', letterSpacing: '-0.04em', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A0E1A' }}>{label}</div>
              <div style={{ fontSize: '11px', color: '#888888', letterSpacing: '0.04em' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
