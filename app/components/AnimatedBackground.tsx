'use client'

import { memo } from 'react'

interface AnimatedBackgroundProps {
  dark?: boolean
}

const rings = [
  { d: 280, trackOpacity: 0.14, speed: '40s', delay: '0s', nodeSize: 5, reverse: false },
  { d: 480, trackOpacity: 0.10, speed: '65s', delay: '-25s', nodeSize: 6, reverse: true },
  { d: 700, trackOpacity: 0.07, speed: '90s', delay: '-12s', nodeSize: 7, reverse: false },
  { d: 960, trackOpacity: 0.05, speed: '130s', delay: '-50s', nodeSize: 8, reverse: true },
]

function AnimatedBackgroundInner({ dark = false }: AnimatedBackgroundProps) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes orbit-cw  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); }  }
        @keyframes orbit-ccw { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
      `}</style>

      {rings.map((ring, i) => {
        const trackColor = dark
          ? `rgba(29,79,255,${ring.trackOpacity})`
          : `rgba(10,14,26,${ring.trackOpacity * 0.45})`
        const nodeColor = dark ? 'rgba(29,79,255,0.65)' : 'rgba(10,14,26,0.22)'
        const nodeGlow = dark ? '0 0 10px rgba(29,79,255,0.5)' : 'none'

        return (
          <div key={i}>
            {/* Orbital track */}
            <div
              style={{
                position: 'absolute',
                width: ring.d,
                height: ring.d,
                top: '45%',
                left: '52%',
                marginLeft: -(ring.d / 2),
                marginTop: -(ring.d / 2),
                borderRadius: '50%',
                border: `1px solid ${trackColor}`,
                transition: 'border-color 0.7s ease',
              }}
            />
            {/* Rotating node container — rotates around center, carrying the dot */}
            <div
              style={{
                position: 'absolute',
                width: ring.d,
                height: ring.d,
                top: '45%',
                left: '52%',
                marginLeft: -(ring.d / 2),
                marginTop: -(ring.d / 2),
                animation: `orbit-${ring.reverse ? 'ccw' : 'cw'} ${ring.speed} linear infinite`,
                animationDelay: ring.delay,
                willChange: 'transform',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%) translateY(-50%)',
                  width: ring.nodeSize,
                  height: ring.nodeSize,
                  borderRadius: '50%',
                  background: nodeColor,
                  boxShadow: nodeGlow,
                  transition: 'background 0.7s ease, box-shadow 0.7s ease',
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const AnimatedBackground = memo(AnimatedBackgroundInner)
