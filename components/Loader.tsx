'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAME = 'Alicia Frommann'

export default function Loader() {
  const [visible,   setVisible]   = useState(true)
  const [revealing, setRevealing] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setRevealing(true), 150)
    const t2 = setTimeout(() => setVisible(false),  2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#08080A' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
        >
          <div className="overflow-hidden py-2">
            <div className="flex">
              {NAME.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="font-cormorant font-light text-[#F0EAE0]"
                  style={{
                    fontSize: 'clamp(2.4rem,5.5vw,4.8rem)',
                    letterSpacing: '-0.02em',
                    display: 'inline-block',
                    width: ch === ' ' ? '0.3em' : undefined,
                  }}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={revealing ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.65, ease: [0.33, 1, 0.68, 1], delay: i * 0.042 + 0.05 }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
