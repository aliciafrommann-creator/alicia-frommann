'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const start = performance.now()
    const duration = 1400
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setPct(Math.round(ease * 100))
      if (t < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    const t = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
    }, 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{ background: 'var(--cream)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.6, 0.05, 0.05, 1] }}
        >
          {/* grid overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%,#000 0%,transparent 70%)',
            maskImage: 'radial-gradient(circle at 50% 50%,#000 0%,transparent 70%)',
          }} />
          {/* pulse dot */}
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            background: 'var(--blue)',
            boxShadow: '0 0 0 8px rgba(29,79,255,.12),0 0 0 24px rgba(29,79,255,.06)',
            animation: 'lpulse 1.6s var(--ease-soft) infinite',
          }} />
          {/* bottom bar */}
          <div className="absolute left-[var(--pad-x)] right-[var(--pad-x)] bottom-8 flex flex-col gap-3">
            <div className="flex justify-between" style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 11, letterSpacing: '.04em',
              color: 'var(--ink-3)', textTransform: 'uppercase',
            }}>
              <span>Alicia Frommann</span>
              <span>{pct}%</span>
            </div>
            <div className="h-px relative" style={{ background: 'var(--line)' }}>
              <div className="absolute inset-y-0 left-0" style={{
                width: `${pct}%`, background: 'var(--ink)',
                transition: 'width .1s linear',
              }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
