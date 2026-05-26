'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ScrollInterrupt() {
  const [visible, setVisible] = useState(false)
  const [done, setDone] = useState(false)
  const fired = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (!fired.current) { fired.current = true; setVisible(true) }
    }, 30000)
    return () => clearTimeout(t)
  }, [])

  if (done) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
            background: 'var(--paper)', border: '1px solid var(--line)',
            borderRadius: '14px', padding: '18px 22px', width: '290px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)' }} />
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
              Participation OS · demo
            </p>
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>
            You've been reading for 30 seconds.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: '14px' }}>
            Sunset in 90 minutes. Your group is nearby. Quick walk mission?
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => { setVisible(false); setDone(true) }} style={{
              flex: 1, padding: '8px', background: 'var(--blue)', color: 'var(--paper)',
              border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
            }}>Accept mission</button>
            <button onClick={() => { setVisible(false); setDone(true) }} style={{
              flex: 1, padding: '8px', background: 'transparent', border: '1px solid var(--line)',
              borderRadius: '8px', fontSize: '12px', color: 'var(--ink-3)', cursor: 'pointer',
            }}>Keep reading</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
