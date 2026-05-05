'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const blobRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, bx = 0, by = 0, rx = 0, ry = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`
        dotRef.current.style.top  = `${my}px`
      }
    }

    const loop = () => {
      bx += (mx - bx) * 0.055
      by += (my - by) * 0.055
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      if (blobRef.current) {
        blobRef.current.style.left = `${bx}px`
        blobRef.current.style.top  = `${by}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`
        ringRef.current.style.top  = `${ry}px`
      }
      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    const enter = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.7)'
      if (dotRef.current)  { dotRef.current.style.opacity = '0.3'; dotRef.current.style.width = '5px'; dotRef.current.style.height = '5px' }
    }
    const leave = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      if (dotRef.current)  { dotRef.current.style.opacity = '1';   dotRef.current.style.width = '8px'; dotRef.current.style.height = '8px' }
    }

    const els = document.querySelectorAll('a, button')
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave) })
    }
  }, [])

  return (
    <>
      <div ref={blobRef} className="fixed pointer-events-none z-[9990]" style={{ width: 300, height: 300, borderRadius: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(107,158,94,0.09) 0%, transparent 70%)' }} />
      <div ref={ringRef} className="fixed pointer-events-none z-[9995]" style={{ width: 36, height: 36, border: '1px solid rgba(107,158,94,0.4)', borderRadius: '50%', transform: 'translate(-50%,-50%)', transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)' }} />
      <div ref={dotRef}  className="fixed pointer-events-none z-[9999] bg-[#F0EAE0] rounded-full" style={{ width: 8, height: 8, transform: 'translate(-50%,-50%)', transition: 'width 0.2s, height 0.2s, opacity 0.2s' }} />
    </>
  )
}
