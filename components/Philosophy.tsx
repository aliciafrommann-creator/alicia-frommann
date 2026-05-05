'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Changing', 'systems', 'is', 'an', 'act', 'of', 'love.']

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef   = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1.2,
        },
      })

      wordsRef.current.forEach((el, i) => {
        if (!el) return
        tl.fromTo(
          el,
          { opacity: 0.07, scale: 0.93, filter: 'blur(6px)' },
          { opacity: 1,    scale: 1,    filter: 'blur(0px)', duration: 1 },
          i * 0.65,
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="border-t border-[#1C1C1A] flex flex-col items-center justify-center min-h-screen px-16 py-40 text-center"
      style={{ background: '#08080A' }}
    >
      <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#6B9E5E] mb-7 flex items-center gap-3.5">
        <span className="w-7 h-px bg-[#6B9E5E] block" />
        Philosophy
        <span className="w-7 h-px bg-[#6B9E5E] block" />
      </div>

      <blockquote className="font-cormorant font-light leading-[1.05] max-w-[900px]" style={{ fontSize: 'clamp(42px,7vw,96px)' }}>
        {WORDS.map((word, i) => (
          <span
            key={i}
            ref={el => { wordsRef.current[i] = el }}
            className="inline-block mr-[0.22em]"
            style={{
              opacity: 0.07,
              color: word === 'love.' ? '#C8834A' : undefined,
              fontStyle: word === 'love.' ? 'italic' : undefined,
            }}
          >
            {word}
          </span>
        ))}
      </blockquote>

      <p className="mt-11 text-[14px] text-[#857E74] tracking-[0.04em] max-w-[480px] leading-[1.85]">
        Systems thinking isn&apos;t a method. It&apos;s a way of seeing — and seeing differently
        is the first step to changing anything that matters.
      </p>
    </section>
  )
}
