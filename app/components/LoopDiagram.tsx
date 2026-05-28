'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const NODES = [
  { id: 0, label: 'AI detects', sub: 'timing · location · mood', angle: 270 },
  { id: 1, label: 'Mission appears', sub: 'low friction', angle: 342 },
  { id: 2, label: 'Friends join', sub: 'trusted group', angle: 54 },
  { id: 3, label: 'Streak grows', sub: 'team momentum', angle: 126 },
  { id: 4, label: 'Participation', sub: 'identity forms', angle: 198 },
]

const R = 130
const CX = 200
const CY = 200

function pos(angle: number) {
  return {
    x: CX + R * Math.cos((angle * Math.PI) / 180),
    y: CY + R * Math.sin((angle * Math.PI) / 180),
  }
}

export function LoopDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!inView) { setActive(-1); return }
    let i = 0
    const t = setInterval(() => {
      setActive(i % NODES.length)
      i++
    }, 900)
    return () => clearInterval(t)
  }, [inView])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
      <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: '380px', height: 'auto', overflow: 'visible' }}>
        <defs>
          <marker id="arr-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#1D4FFF" />
          </marker>
          <marker id="arr-idle" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="rgba(255,255,255,0.15)" />
          </marker>
          {/* Glow filter for active nodes */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbit track */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Center */}
        <circle cx={CX} cy={CY} r={42} fill="rgba(29,79,255,0.08)" stroke="rgba(29,79,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <text x={CX} y={CY - 6} textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)"
          fill="rgba(255,255,255,0.4)" letterSpacing="1.5">PARTICIPATION</text>
        <text x={CX} y={CY + 9} textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)"
          fill="#1D4FFF" letterSpacing="1.5">OS</text>

        {/* Arcs between nodes */}
        {NODES.map((node, i) => {
          const next = NODES[(i + 1) % NODES.length]
          const from = pos(node.angle)
          const to = pos(next.angle)
          const isActive = active === i
          return (
            <motion.path
              key={i}
              d={`M ${from.x} ${from.y} A ${R} ${R} 0 0 1 ${to.x} ${to.y}`}
              fill="none"
              markerEnd={isActive ? 'url(#arr-active)' : 'url(#arr-idle)'}
              animate={{
                stroke: isActive ? '#1D4FFF' : 'rgba(255,255,255,0.1)',
                strokeWidth: isActive ? 2.5 : 1,
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const { x, y } = pos(node.angle)
          const isActive = active === i
          const label = node.label.split(' ')
          return (
            <g key={node.id} transform={`translate(${x}, ${y})`} filter={isActive ? 'url(#glow)' : undefined}>
              <motion.circle
                r={30}
                animate={{
                  fill: isActive ? 'rgba(29,79,255,0.9)' : 'rgba(10,14,26,0.8)',
                  stroke: isActive ? '#1D4FFF' : 'rgba(255,255,255,0.15)',
                  strokeWidth: isActive ? 2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              {label.map((word, wi) => (
                <motion.text
                  key={wi}
                  textAnchor="middle"
                  y={wi === 0 ? (label.length === 1 ? 4 : -3) : 10}
                  fontSize="8"
                  fontWeight="700"
                  fontFamily="var(--font-geist-mono)"
                  letterSpacing="0.3"
                  animate={{ fill: isActive ? 'white' : 'rgba(255,255,255,0.45)' }}
                  transition={{ duration: 0.3 }}
                >
                  {word.toUpperCase()}
                </motion.text>
              ))}
            </g>
          )
        })}
      </svg>

      {/* Active label below */}
      <div style={{ height: '52px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{ textAlign: 'center' }}
        >
          {active >= 0 && (
            <>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '3px', letterSpacing: '-0.01em' }}>
                {NODES[active]?.label}
              </p>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em' }}>
                {NODES[active]?.sub}
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
