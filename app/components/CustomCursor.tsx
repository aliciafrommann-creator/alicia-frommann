'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const ringX = useSpring(cursorX, { stiffness: 350, damping: 26 })
  const ringY = useSpring(cursorY, { stiffness: 350, damping: 26 })

  const ringSize = hovering ? 52 : 36
  const dotSize = hovering ? 4 : 5

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(isCoarse)
    if (isCoarse) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', () => setVisible(false))
    document.addEventListener('mouseenter', () => setVisible(true))
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.style.cursor = ''
    }
  }, [cursorX, cursorY, visible])

  useEffect(() => {
    if (isTouch) return
    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, [data-cursor="hover"]')) setHovering(true)
    }
    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, [data-cursor="hover"]')) setHovering(false)
    }
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Ring — mix-blend-mode:exclusion inverts whatever's beneath, no dark prop needed */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: '50%',
          border: '1.5px solid #ffffff',
          background: hovering ? 'rgba(255,255,255,0.08)' : 'transparent',
          mixBlendMode: 'exclusion',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.18s ease, height 0.18s ease, margin 0.18s ease',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      {/* Dot — exact position, also exclusion */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          borderRadius: '50%',
          background: '#ffffff',
          mixBlendMode: 'exclusion',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.18s ease, height 0.18s ease, margin 0.18s ease',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
