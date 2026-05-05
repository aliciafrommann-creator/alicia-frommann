'use client'

import { useEffect, useRef } from 'react'

const NODES = [
  { id: 'comp',  label: ['Team', 'Complexity'],      x: 200, y: 38,  highlight: false },
  { id: 'comm',  label: ['Communication', 'Gaps'],   x: 342, y: 130, highlight: false },
  { id: 'mod',   label: ['Shared', 'Mental Models'], x: 200, y: 262, highlight: false },
  { id: 'qual',  label: ['Decision', 'Quality'],     x: 58,  y: 130, highlight: false },
  { id: 'trust', label: ['Trust'],                   x: 200, y: 155, highlight: true  },
]

const EDGES = [
  { f: 'comp',  t: 'comm', lbl: '+', col: '#C8834A', mid: [310, 55]  },
  { f: 'comm',  t: 'mod',  lbl: '−', col: '#C8834A', mid: [330, 230] },
  { f: 'mod',   t: 'trust',lbl: '+', col: '#6B9E5E', mid: [248, 215] },
  { f: 'trust', t: 'qual', lbl: '+', col: '#6B9E5E', mid: [100, 180] },
  { f: 'qual',  t: 'comp', lbl: '−', col: '#6B9E5E', mid: [80,  55]  },
  { f: 'trust', t: 'mod',  lbl: '+', col: '#6B9E5E', mid: [155, 215] },
]

export default function CLDDiagram() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll<SVGPathElement>('[data-edge]')
    if (!paths) return
    const t = setTimeout(() => {
      paths.forEach((p, i) => {
        setTimeout(() => { p.style.strokeDashoffset = '0' }, i * 180)
      })
    }, 400)
    return () => clearTimeout(t)
  }, [])

  const nmap = Object.fromEntries(NODES.map(n => [n.id, n]))

  return (
    <div className="bg-[#101010] border border-[#1C1C1A] rounded-sm p-7">
      <div className="text-[10px] tracking-[0.18em] uppercase text-[#3A3935] mb-5">Live Causal Loop Diagram</div>
      <svg ref={svgRef} width="100%" viewBox="0 0 400 300" style={{ display: 'block' }}>
        <defs>
          <marker id="ag" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#6B9E5E" />
          </marker>
          <marker id="aa" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#C8834A" />
          </marker>
        </defs>

        {EDGES.map((e, i) => {
          const f = nmap[e.f], t = nmap[e.t]
          const d  = `M ${f.x} ${f.y} Q ${e.mid[0]} ${e.mid[1]} ${t.x} ${t.y}`
          const lx = (f.x + t.x) / 2 * 0.35 + e.mid[0] * 0.65
          const ly = (f.y + t.y) / 2 * 0.35 + e.mid[1] * 0.65
          return (
            <g key={i}>
              <path
                data-edge
                d={d}
                stroke={e.col} strokeWidth="1.4" fill="none" opacity="0.55"
                markerEnd={`url(#${e.col === '#6B9E5E' ? 'ag' : 'aa'})`}
                strokeDasharray="300" strokeDashoffset="300"
                style={{ transition: `stroke-dashoffset 1.1s ease ${i * 0.18}s` }}
              />
              <text x={lx} y={ly} fontSize="11" fontFamily="sans-serif" fill={e.col} textAnchor="middle" opacity="0.8">
                {e.lbl}
              </text>
            </g>
          )
        })}

        {NODES.map((n, i) => {
          const nw = Math.max(...n.label.map(l => l.length * 6.2)) + 22
          const nh = n.label.length * 15 + 14
          return (
            <g key={n.id} transform={`translate(${n.x},${n.y})`}
               style={{ opacity: 0, transition: `opacity 0.5s ease ${i * 0.12 + 0.2}s` }}
               ref={el => { if (el) setTimeout(() => (el.style.opacity = '1'), 120) }}
            >
              {n.highlight && (
                <rect x={-nw/2} y={-nh/2} width={nw} height={nh} fill="none" stroke="#6B9E5E" strokeWidth="1" rx="2">
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="stroke-width" values="1;3;1" dur="2.4s" repeatCount="indefinite" />
                </rect>
              )}
              <rect x={-nw/2} y={-nh/2} width={nw} height={nh}
                fill="#101010"
                stroke={n.highlight ? '#6B9E5E' : '#2A2A27'}
                strokeWidth={n.highlight ? 1.5 : 1}
                rx="2"
              />
              {n.label.map((line, li) => (
                <text key={li}
                  x="0" y={(li - (n.label.length - 1) / 2) * 15 + 4}
                  fontSize="9.5" fontFamily="sans-serif"
                  fill={n.highlight ? '#6B9E5E' : '#857E74'}
                  textAnchor="middle"
                >
                  {line}
                </text>
              ))}
            </g>
          )
        })}

        <text x="200" y="295" fontSize="9" fontFamily="sans-serif" fill="#3A3935" textAnchor="middle" letterSpacing="2">
          REINFORCING LOOP — ThinkTogether surfaces these automatically
        </text>
      </svg>
    </div>
  )
}
