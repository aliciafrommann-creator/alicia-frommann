'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface CustomCursorProps {
  dark?: boolean
}

export function CustomCursor({ dark = false }: CustomCursorProps) {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { stiffness: 400, damping: 28 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  const ringSize = hovering ? 48 : 32
  const dotSize = 8

  const dotColor = dark ? 'rgba(255,255,255,0.9)' : 'rgba(10,14,26,0.9)'
  const ringColor = dark
    ? hovering ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.25)'
    : hovering ? 'rgba(10,14,26,0.28)' : 'rgba(10,14,26,0.2)'

  useEffect(() => {
    // Detect touch device — hide cursor on coarse pointer
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(isCoarse)
    if (isCoarse) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.body.style.cursor = ''
    }
  }, [cursorX, cursorY, visible])

  useEffect(() => {
    if (isTouch) return

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setHovering(true)
      }
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setHovering(false)
      }
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Ring — spring-lagged */}
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
          border: `1.5px solid ${ringColor}`,
          background: hovering ? (dark ? 'rgba(255,255,255,0.06)' : 'rgba(10,14,26,0.05)') : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, border-color 0.3s ease, background 0.3s ease',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
      {/* Dot — exact position */}
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
          background: dotColor,
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'background 0.3s ease',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
    </>
  )
}
