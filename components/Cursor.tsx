'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0
    let rx = 0, ry = 0
    let bx = 0, by = 0
    let raf: number
    let hovering = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px,${my}px)`
      }
    }

    const loop = () => {
      const lerpR = hovering ? 0.18 : 0.13
      const lerpB = 0.05
      rx += (mx - rx) * lerpR; ry += (my - ry) * lerpR
      bx += (mx - bx) * lerpB; by += (my - by) * lerpB

      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${hovering ? 1.6 : 1})`
      if (blobRef.current)
        blobRef.current.style.transform = `translate(${bx}px,${by}px) translate(-50%,-50%)`

      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    const enter = () => { hovering = true }
    const leave = () => { hovering = false }

    const addListeners = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }
    addListeners()
    const mo = new MutationObserver(addListeners)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      {/* Ambient blob */}
      <div ref={blobRef} style={{
        position:'fixed', top:0, left:0, zIndex:9990,
        width:320, height:320, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(29,79,255,0.06) 0%,transparent 70%)',
        pointerEvents:'none', willChange:'transform',
      }}/>
      {/* Ring */}
      <div ref={ringRef} style={{
        position:'fixed', top:0, left:0, zIndex:9995,
        width:36, height:36, borderRadius:'50%',
        border:'1.5px solid rgba(29,79,255,0.5)',
        pointerEvents:'none', willChange:'transform',
        transition:'border-color 0.3s',
      }}/>
      {/* Dot */}
      <div ref={dotRef} style={{
        position:'fixed', top:0, left:0, zIndex:9999,
        width:6, height:6, borderRadius:'50%',
        background:'var(--blue)',
        pointerEvents:'none', willChange:'transform',
        marginLeft:-3, marginTop:-3,
      }}/>
    </>
  )
}
