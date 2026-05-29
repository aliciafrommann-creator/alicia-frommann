'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PitchSlides } from './components/PitchSlides'
import { AboutView } from './components/AboutView'
import { ProductView } from './components/ProductView'
import { ProjectsView } from './components/ProjectsView'
import { ShopConsciously } from './components/ShopConsciously'
import { FeedView } from './components/FeedView'
import { ScrollInterrupt } from './components/ScrollInterrupt'
import { AnimatedBackground } from './components/AnimatedBackground'
import { CustomCursor } from './components/CustomCursor'

type View = 'pitch' | 'about' | 'product' | 'projects' | 'shop' | 'feed'

const views: { id: View; label: string; dot?: boolean }[] = [
  { id: 'pitch', label: 'Application' },
  { id: 'about', label: 'About' },
  { id: 'product', label: 'Product' },
  { id: 'projects', label: 'Projects' },
  { id: 'shop', label: 'Try AI', dot: true },
  { id: 'feed', label: 'Feed' },
]

export default function Home() {
  const [active, setActive] = useState<View>('pitch')
  const [scrolled, setScrolled] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const handleNav = (id: View) => {
    setActive(id)
    setTransitioning(true)
    setTimeout(() => setTransitioning(false), 300)
  }

  const isDark = active === 'pitch'

  return (
    <>
      <ScrollInterrupt />
      <CustomCursor />
      <AnimatedBackground dark={isDark} />

      {/* Transition flash overlay */}
      <motion.div
        animate={{ opacity: transitioning ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed', inset: 0,
          background: 'var(--paper)',
          pointerEvents: 'none',
          zIndex: 99,
        }}
      />

      <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>

        <nav className="site-nav" style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(20px,4vw,64px)',
          background: scrolled ? 'rgba(250,248,243,0.88)' : 'rgba(250,248,243,0.6)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
          transition: 'all 0.4s ease',
        }}>
          <motion.button
            onClick={() => handleNav('pitch')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            style={{
              fontFamily: 'var(--font-geist-mono)', fontSize: '13px', fontWeight: 600,
              color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.02em',
            }}>
            Alicia Frommann
          </motion.button>

          <div className="site-nav-tabs" style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {views.map(v => (
              <motion.button
                key={v.id}
                onClick={() => handleNav(v.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                style={{
                  position: 'relative',
                  padding: '5px 14px', borderRadius: '999px', fontSize: '13px',
                  fontWeight: active === v.id ? 600 : 400,
                  background: v.id === 'shop'
                    ? (active === v.id ? 'var(--blue)' : 'rgba(29,79,255,0.08)')
                    : (active === v.id ? 'var(--ink)' : 'transparent'),
                  color: v.id === 'shop'
                    ? (active === v.id ? 'var(--paper)' : 'var(--blue)')
                    : (active === v.id ? 'var(--paper)' : 'var(--ink-2)'),
                  border: v.id === 'shop' ? '1px solid rgba(29,79,255,0.2)' : 'none',
                  cursor: 'pointer', transition: 'all 0.25s ease',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}>
                {v.dot && (
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: '5px', height: '5px', borderRadius: '50%', background: active === v.id ? 'rgba(255,255,255,0.6)' : 'var(--blue)', display: 'inline-block' }}
                  />
                )}
                {v.label}
                {active === v.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    style={{
                      position: 'absolute', bottom: 0, left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px', height: '2px',
                      background: v.id === 'shop' ? 'rgba(255,255,255,0.6)' : 'var(--blue)',
                      borderRadius: '2px',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </nav>

        <div style={{ paddingTop: '56px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              {active === 'pitch' && <PitchSlides />}
              {active === 'about' && <AboutView onNav={(v) => setActive(v as View)} />}
              {active === 'product' && <ProductView onNav={(v) => setActive(v as View)} />}
              {active === 'projects' && <ProjectsView onNav={(v) => setActive(v as View)} />}
              {active === 'shop' && <ShopConsciously />}
              {active === 'feed' && <FeedView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
