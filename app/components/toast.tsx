'use client'

// Lightweight global toast system. No provider needed — module-level pub/sub.
// Usage: import { toast } from './toast'; toast('Saved ✓')
//        Mount <Toaster /> once at the app root.

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ToastItem = { id: number; message: string; tone: 'default' | 'success' }

let listeners: ((items: ToastItem[]) => void)[] = []
let items: ToastItem[] = []

function emit() {
  listeners.forEach(l => l([...items]))
}

export function toast(message: string, tone: 'default' | 'success' = 'default') {
  const id = Date.now() + Math.random()
  items = [...items, { id, message, tone }]
  emit()
  setTimeout(() => {
    items = items.filter(i => i.id !== id)
    emit()
  }, 2600)
}

export function Toaster() {
  const [list, setList] = useState<ToastItem[]>([])

  useEffect(() => {
    listeners.push(setList)
    return () => { listeners = listeners.filter(l => l !== setList) }
  }, [])

  return (
    <div style={{
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 2000, display: 'flex', flexDirection: 'column', gap: '8px',
      alignItems: 'center', pointerEvents: 'none',
    }}>
      <AnimatePresence>
        {list.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '11px 18px', borderRadius: '999px',
              background: 'var(--ink)', color: 'var(--paper)',
              fontSize: '13px', fontWeight: 500, letterSpacing: '-0.01em',
              boxShadow: '0 8px 28px rgba(10,14,26,0.22)',
              whiteSpace: 'nowrap',
            }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: item.tone === 'success' ? '#22c55e' : 'var(--blue)',
              flexShrink: 0,
            }} />
            {item.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
