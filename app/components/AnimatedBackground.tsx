'use client'

import { memo } from 'react'

interface AnimatedBackgroundProps {
  dark?: boolean
}

const loops = [
  {
    width: 320, height: 200,
    top: '8%', left: '12%',
    animation: 'loop-drift-1 38s ease-in-out infinite',
    borderColor: (dark: boolean) => dark ? 'rgba(255,255,255,0.06)' : 'rgba(10,14,26,0.04)',
    delay: '0s',
  },
  {
    width: 180, height: 180,
    top: '60%', left: '70%',
    animation: 'loop-drift-2 24s ease-in-out infinite',
    borderColor: (dark: boolean) => dark ? 'rgba(29,79,255,0.12)' : 'rgba(10,14,26,0.04)',
    delay: '-8s',
  },
  {
    width: 440, height: 280,
    top: '40%', left: '-6%',
    animation: 'loop-drift-3 52s ease-in-out infinite',
    borderColor: (dark: boolean) => dark ? 'rgba(255,255,255,0.06)' : 'rgba(10,14,26,0.035)',
    delay: '-18s',
  },
  {
    // Feature loop — largest, very slow
    width: 560, height: 380,
    top: '20%', left: '50%',
    animation: 'loop-drift-6 60s linear infinite',
    borderColor: (dark: boolean) => dark ? 'rgba(29,79,255,0.10)' : 'rgba(10,14,26,0.03)',
    delay: '-4s',
  },
  {
    width: 150, height: 220,
    top: '75%', left: '25%',
    animation: 'loop-drift-4 31s ease-in-out infinite',
    borderColor: (dark: boolean) => dark ? 'rgba(255,255,255,0.05)' : 'rgba(10,14,26,0.04)',
    delay: '-12s',
  },
  {
    width: 260, height: 160,
    top: '5%', left: '65%',
    animation: 'loop-drift-5 44s ease-in-out infinite',
    borderColor: (dark: boolean) => dark ? 'rgba(255,255,255,0.06)' : 'rgba(10,14,26,0.035)',
    delay: '-22s',
  },
]

function AnimatedBackgroundInner({ dark = false }: AnimatedBackgroundProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        transition: 'opacity 0.6s ease',
      }}
      aria-hidden="true"
    >
      {loops.map((loop, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${loop.width}px`,
            height: `${loop.height}px`,
            top: loop.top,
            left: loop.left,
            borderRadius: '50%',
            border: `1px solid ${loop.borderColor(dark)}`,
            animation: loop.animation,
            animationDelay: loop.delay,
            willChange: 'transform',
            transform: 'translateZ(0)',
            transition: 'border-color 0.6s ease',
          }}
        />
      ))}
    </div>
  )
}

export const AnimatedBackground = memo(AnimatedBackgroundInner)
