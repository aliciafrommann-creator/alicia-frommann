'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    } as ConstructorParameters<typeof Lenis>[0])

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Reveal lines on scroll
    document.querySelectorAll<HTMLElement>('.reveal-line > span').forEach(el => {
      gsap.fromTo(el, { y: '110%' }, {
        y: 0, duration: 1.0, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])

  return <>{children}</>
}
