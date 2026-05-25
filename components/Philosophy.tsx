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
      style={{
        borderTop: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 'var(--pad-y) var(--pad-x)',
        textAlign: 'center',
        background: 'var(--paper)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '11px',
        letterSpacing: '.18em',
        textTransform: 'uppercase' as const,
        color: 'var(--ink-3)',
        marginBottom: '32px',
      }}>
        <span style={{ width: '28px', height: '1px', background: 'var(--line)', display: 'block' }} />
        Philosophy
        <span style={{ width: '28px', height: '1px', background: 'var(--line)', display: 'block' }} />
      </div>

      <blockquote style={{
        fontFamily: 'var(--font-geist)',
        fontWeight: 600,
        lineHeight: 1.05,
        maxWidth: '900px',
        fontSize: 'clamp(42px,7vw,96px)',
        letterSpacing: '-.03em',
        margin: 0,
      }}>
        {WORDS.map((word, i) => (
          <span
            key={i}
            ref={el => { wordsRef.current[i] = el }}
            style={{
              display: 'inline-block',
              marginRight: '0.22em',
              opacity: 0.07,
              color: word === 'love.' ? 'var(--blue)' : 'var(--ink)',
              fontStyle: word === 'love.' ? 'italic' : 'normal',
            }}
          >
            {word}
          </span>
        ))}
      </blockquote>

      <p style={{
        marginTop: '44px',
        fontSize: '14px',
        color: 'var(--ink-3)',
        letterSpacing: '.04em',
        maxWidth: '480px',
        lineHeight: 1.85,
        fontFamily: 'var(--font-geist)',
      }}>
        Systems thinking isn&apos;t a method. It&apos;s a way of seeing — and seeing differently
        is the first step to changing anything that matters.
      </p>
    </section>
  )
}
