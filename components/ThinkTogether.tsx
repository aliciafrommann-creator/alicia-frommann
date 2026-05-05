'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CLDDiagram from './CLDDiagram'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { title: 'AI Socratic Coach',  desc: 'Asks the questions that surface your model’s blind spots' },
  { title: 'Live CLD Canvas',    desc: 'Visual, collaborative causal loop diagramming in real time' },
  { title: 'Loop Discovery',     desc: 'Automatically identifies reinforcing and balancing feedback loops' },
]

export default function ThinkTogether() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tt-item',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.13,
          scrollTrigger: { trigger: ref.current, start: 'top 70%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="thinktogether"
      className="border-t border-[#1C1C1A] px-16 py-[120px] grid grid-cols-2 gap-[88px] items-center"
    >
      <div>
        <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#6B9E5E] mb-7 flex items-center gap-3.5">
          <span className="w-7 h-px bg-[#6B9E5E]" />
          Product
        </div>
        <h2 className="tt-item font-cormorant font-normal leading-[1.08] mb-6" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
          ThinkTogether<br />
          <em className="text-[#857E74]">Applied systems thinking,<br />built for teams.</em>
        </h2>
        <p className="tt-item text-[14px] leading-[1.85] text-[#857E74] mb-9">
          An AI-assisted SaaS platform for causal loop diagram modeling. Not prescribing what to think
          — creating the space in which deeper thinking becomes possible.
        </p>
        <div className="flex flex-col gap-3.5 mb-11">
          {FEATURES.map((f, i) => (
            <div key={i} className="tt-item flex gap-3.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6B9E5E] mt-[7px] flex-shrink-0" />
              <p className="text-[13px] text-[#857E74] leading-[1.65]">
                <strong className="text-[#F0EAE0] font-semibold">{f.title}</strong> — {f.desc}
              </p>
            </div>
          ))}
        </div>
        <MagneticButton href="https://thinktogetherapp.vercel.app" variant="primary" target="_blank" rel="noopener noreferrer">
          Open ThinkTogether ↗
        </MagneticButton>
      </div>

      <div className="tt-item">
        <CLDDiagram />
        <p className="text-[11px] text-[#3A3935] mt-3.5 tracking-[0.08em]">
          Freemium · Solo €7/mo · Team €49/mo
        </p>
      </div>
    </section>
  )
}
