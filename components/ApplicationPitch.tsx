'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MissionInvitationDemo } from '@/components/MissionInvitationDemo'
import { PsychologySection } from '@/components/PsychologySection'

function CityAlive() {
  const districts = [
    { name: 'Prenzlauer Berg', base: 847, label: 'leading' },
    { name: 'Neukölln',       base: 623, label: '' },
    { name: 'Kreuzberg',      base: 589, label: '' },
    { name: 'Friedrichshain', base: 412, label: '' },
    { name: 'Mitte',          base: 391, label: '' },
    { name: 'Pankow',         base: 334, label: '' },
  ]
  const quotes = [
    '"Sunset walks are active across 4 districts tonight."',
    '"Your flat\'s 6-day streak is on the line."',
    '"12 people near you completed this mission in the last hour."',
    '"3 cafés are joining tonight\'s local mission."',
    '"Prenzlauer Berg is leading for the third week running."',
    '"Your university is competing with 3 others this week."',
  ]
  const [counts, setCounts] = useState(districts.map(d => d.base))
  const [quote, setQuote] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setCounts(cs => cs.map(c => c + Math.floor(Math.random() * 3)))
      setQuote(q => (q + 1) % quotes.length)
    }, 2400)
    return () => clearInterval(iv)
  }, [])

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '32px' }}>
        {districts.map((d, i) => (
          <div key={d.name} style={{ padding: 'clamp(20px,2.5vw,32px)', background: i === 0 ? 'rgba(29,79,255,0.1)' : 'rgba(255,255,255,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: i === 0 ? 'var(--blue)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: 0 }}>{d.name}</p>
              {d.label && <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)', padding: '2px 6px', border: '0.5px solid var(--blue)', borderRadius: '999px' }}>{d.label}</span>}
            </div>
            <motion.p key={counts[i]} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}
              style={{ fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 700, color: i === 0 ? 'var(--paper)' : 'rgba(255,255,255,0.5)', letterSpacing: '-0.04em', lineHeight: 1, margin: 0 }}>
              {counts[i].toLocaleString()}
            </motion.p>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.25)', margin: '4px 0 0', letterSpacing: '0.04em' }}>missions today</p>
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={quote}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 'clamp(13px,1.3vw,16px)', color: 'var(--blue)', letterSpacing: '0.02em', fontStyle: 'italic', margin: 0 }}>
          {quotes[quote]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function FadeUp({
  children, delay = 0, className = '', style,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function StaggerReveal({
  lines, color = 'var(--ink)', size = 'clamp(28px,3vw,48px)',
}: {
  lines: string[]
  color?: string
  size?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ fontSize: size, fontWeight: 600, color, letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  )
}

function ProofCard({ name, behavior, reward, dark = false }: { name: string, behavior: string, reward: string, dark?: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        padding: 'clamp(24px,3vw,40px)',
        background: dark ? 'rgba(255,255,255,0.05)' : 'var(--paper)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'var(--line)'}`,
        borderRadius: '12px',
      }}
    >
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>{name}</p>
      <p style={{ fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.6, color: dark ? 'rgba(255,255,255,0.6)' : 'var(--ink-2)', fontStyle: 'italic', marginBottom: '16px' }}>"{behavior}"</p>
      <p style={{ fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.5, color: 'var(--blue)', fontWeight: 600 }}>{reward}</p>
    </motion.div>
  )
}

function MechanicCard({ n, title, description, dark = false }: { n: string, title: string, description: string, dark?: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ padding: 'clamp(24px,3vw,40px)', borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line)'}` }}
    >
      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>{n} /</span>
      <h3 style={{ fontSize: 'clamp(20px,2vw,28px)', fontWeight: 700, color: dark ? 'var(--paper)' : 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '10px', fontStyle: 'italic' }}>{title}</h3>
      <p style={{ fontSize: '14px', lineHeight: 1.65, color: dark ? 'rgba(255,255,255,0.55)' : 'var(--ink-2)' }}>{description}</p>
    </motion.div>
  )
}

const S: React.CSSProperties = {
  padding: 'clamp(96px,12vw,180px) clamp(24px,6vw,96px)',
  maxWidth: '1480px',
  margin: '0 auto',
}

const DS: React.CSSProperties = {
  background: 'var(--ink)',
  padding: 'clamp(96px,12vw,180px) clamp(24px,6vw,96px)',
}

export function ApplicationPitch() {
  return (
    <div style={{ overflow: 'hidden' }}>

      {/* ── CH 1: § 05 — Pitch hero ───────────────────────────────── */}
      <section style={{
        minHeight: '100vh', position: 'relative',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 'clamp(120px,16vw,200px) clamp(24px,6vw,96px)',
        borderTop: '1px solid var(--line)', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
          /videos/berlin-scroll.mp4
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,14,26,0.88) 0%, rgba(10,14,26,0.45) 55%, rgba(10,14,26,0.92) 100%)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(44px,8vw,132px)', lineHeight: 0.94, letterSpacing: '-.035em', color: 'var(--paper)' }}>
            The internet optimized consumption.
          </h2>
          <FadeUp delay={0.4}>
            <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(44px,8vw,132px)', lineHeight: 0.94, letterSpacing: '-.035em', color: 'var(--blue)', fontStyle: 'italic' }}>
              What if it optimized participation instead?
            </h2>
          </FadeUp>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="tag" style={{ color: 'var(--blue)' }}>§ 05 — The pitch</span>
        </div>
      </section>

      {/* ── CH 2: § 06 — Contradiction ─────────────────────────── */}
      <section style={{ ...S, background: 'var(--cream)' }}>
        <FadeUp style={{ marginBottom: 'clamp(32px,4vw,56px)' }}>
          <span className="tag">§ 06 — The contradiction</span>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(48px,6vw,80px)', alignItems: 'center' }}>
          <StaggerReveal
            lines={[
              'We care deeply.',
              'And still we fail.',
              'We want to support ethical brands —',
              'but we buy the cheaper option.',
              'We want to shop locally —',
              'but Amazon arrives tomorrow.',
              'We want deeper connection —',
              'but passive scrolling wins another evening.',
            ]}
            color="var(--ink)"
            size="clamp(20px,2.2vw,32px)"
          />
          <div style={{ height: 480, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream-2)', border: '1px solid var(--line)', fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
            contradiction / ethical vs cheap
          </div>
        </div>
      </section>

      {/* ── CH 3: § 07 — Operating system ──────────────────────── */}
      <section style={DS}>
        <FadeUp style={{ marginBottom: '48px' }}>
          <span className="tag" style={{ color: 'var(--blue)' }}>§ 07 — The operating system</span>
        </FadeUp>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '48px' }}>beneath modern behavior</p>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '24px', marginBottom: '64px' }}>
          {['Every click.', 'Every notification.', 'Every recommendation.', 'Every frictionless reward.'].map((word, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <p style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1, letterSpacing: '-.03em', color: 'var(--paper)', margin: 0 }}>{word}</p>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.8}>
          <p style={{ fontSize: 'clamp(20px,2vw,28px)', color: 'var(--blue)', fontStyle: 'italic', lineHeight: 1.4, maxWidth: '760px', margin: 0 }}>
            This is the real operating system beneath modern behavior.
          </p>
        </FadeUp>
      </section>

      {/* ── CH 4: § 08 — Human behavior ─────────────────────────── */}
      <section style={{ ...S, background: 'var(--cream)' }}>
        <FadeUp style={{ marginBottom: '48px' }}>
          <span className="tag">§ 08 — The apps that actually changed behavior</span>
        </FadeUp>
        <div style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
          <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(36px,5vw,72px)', lineHeight: 1, letterSpacing: '-.03em', color: 'var(--ink)', marginBottom: '16px' }}>
            The apps that actually changed behavior
          </h2>
          <p style={{ fontSize: 'clamp(20px,2vw,28px)', color: 'var(--ink-2)', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
            didn't compete against dopamine. They used it.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--line)' }}>
          <ProofCard name="Strava" behavior="I don't use Strava only to track my runs." reward="→ I love the kudos and the community behind them." />
          <ProofCard name="Too Good To Go" behavior="I don't use TGTG only to reduce food waste." reward="→ It's cheap, surprising, and feels like a win." />
          <ProofCard name="Duolingo" behavior="I don't open Duolingo because every lesson is deeply meaningful." reward="→ I mean — look at my streak." />
        </div>
      </section>

      {/* ── CH NEW: § — The wedge (tiny openings) ─────────────────── */}
      <section style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ padding: 'clamp(96px,12vw,180px) clamp(24px,6vw,96px)', maxWidth: '1480px', margin: '0 auto' }}>
          <FadeUp style={{ marginBottom: 'clamp(32px,4vw,56px)' }}>
            <span className="tag" style={{ color: 'var(--blue)' }}>§ — The wedge</span>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(48px,6vw,96px)', alignItems: 'center' }}>
            <div>
              <StaggerReveal lines={['Tiny openings', 'into reality.']} size="clamp(40px,6vw,88px)" color="var(--paper)" />
              <FadeUp delay={0.5}>
                <p style={{ fontSize: 'clamp(18px,2vw,28px)', fontWeight: 500, color: 'var(--blue)', fontStyle: 'italic', letterSpacing: '-0.02em', marginTop: '24px', lineHeight: 1.3, marginBottom: 0 }}>
                  Not giant self-improvement systems.
                </p>
              </FadeUp>
              <FadeUp delay={0.8}>
                <p style={{ fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', marginTop: '32px', maxWidth: '480px', marginBottom: 0 }}>
                  The first behavior must feel emotionally easy, socially safe, and rewarding within minutes. Not life transformation. A sunset walk. A café ritual. A no-phone dinner. A moment of local courage.
                </p>
              </FadeUp>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
              {[
                { label: 'Not this', items: ['life transformation', 'giant self-improvement', 'stranger networking', 'moral obligation', 'surveillance systems'], cross: true },
                { label: 'This', items: ['evening walk with your flat', 'café ritual with a friend', 'no-phone dinner', 'local discovery mission', 'tiny social courage'], cross: false },
              ].map(({ label, items, cross }) => (
                <div key={label} style={{ padding: 'clamp(24px,3vw,40px)', background: cross ? 'rgba(255,255,255,0.02)' : 'rgba(29,79,255,0.08)' }}>
                  <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: cross ? 'rgba(255,255,255,0.3)' : 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>{label}</p>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                    {items.map((item, i) => (
                      <p key={i} style={{ fontSize: '15px', color: cross ? 'rgba(255,255,255,0.3)' : 'var(--paper)', textDecoration: cross ? 'line-through' : 'none', textDecorationColor: 'rgba(255,255,255,0.2)', fontStyle: cross ? 'normal' : 'italic', letterSpacing: '-0.01em', margin: 0 }}>{item}</p>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ padding: 'clamp(24px,3vw,40px)', background: 'rgba(255,255,255,0.04)' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>With whom</p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>
                  Not strangers. Not AI matchmaking. Not proximity networking.<br /><br />
                  <span style={{ color: 'var(--paper)', fontStyle: 'italic' }}>Trusted social graphs. The people whose streak matters to you. Friends. Flatmates. Your run club. Your university group.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CH 5: § 09 — Failure ────────────────────────────────── */}
      <section style={DS}>
        <FadeUp style={{ marginBottom: '48px' }}>
          <span className="tag" style={{ color: 'rgba(255,255,255,0.4)' }}>§ 09 — Why they failed</span>
        </FadeUp>
        <StaggerReveal
          lines={['Most sustainability apps failed.', 'They built for morality.', 'Modern consumer platforms built for emotional reinforcement.']}
          color="var(--paper)"
          size="clamp(32px,4vw,60px)"
        />
        <FadeUp delay={0.6}>
          <p style={{ fontSize: 'clamp(32px,4vw,60px)', fontWeight: 600, color: 'var(--blue)', letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: '12px', margin: 0 }}>
            Emotional reinforcement scales faster than intention alone.
          </p>
        </FadeUp>
      </section>

      {/* ── CH 6: § 10 — Proof ─────────────────────────────────── */}
      <section style={{ ...S, background: 'var(--cream)' }}>
        <FadeUp style={{ marginBottom: '48px' }}>
          <span className="tag">§ 10 — The behavioral proof</span>
        </FadeUp>
        <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(36px,5vw,72px)', lineHeight: 1, letterSpacing: '-.03em', color: 'var(--ink)', marginBottom: 'clamp(40px,5vw,64px)' }}>
          The behavioral proof already exists.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <ProofCard name="Strava" behavior="Shared progress + streaks + visibility + community momentum" reward="→ People run more. Together." />
          <ProofCard name="Too Good To Go" behavior="Reward psychology + surprise + perceived win" reward="→ Sustainability scales." />
          <ProofCard name="Duolingo" behavior="Tiny actions repeated socially" reward="→ Habit formation without effort." />
          <ProofCard name="Pokémon Go" behavior="Digital systems coordinating real-world movement" reward="→ Millions move. Simultaneously." />
        </div>
      </section>

      {/* ── CH 7: § 11 — Synchronized participation ─────────────────── */}
      <section style={DS}>
        <FadeUp style={{ marginBottom: '48px' }}>
          <span className="tag" style={{ color: 'var(--blue)' }}>§ 11 — The human truth</span>
        </FadeUp>
        <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(44px,8vw,132px)', lineHeight: 0.94, letterSpacing: '-.035em', color: 'var(--paper)', marginBottom: '16px' }}>
          Humans are wired for
        </h2>
        <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(44px,8vw,132px)', lineHeight: 0.94, letterSpacing: '-.035em', color: 'var(--blue)', fontStyle: 'italic', marginBottom: 'clamp(48px,6vw,80px)' }}>
          synchronized participation.
        </h2>
        <StaggerReveal
          lines={['Rituals.', 'Teams.', 'Shared progress.', 'Visible identity.', 'Repeated collective behavior.']}
          color="rgba(255,255,255,0.6)"
          size="clamp(20px,2.5vw,36px)"
        />
        <FadeUp delay={0.8} style={{ marginTop: '48px' }}>
          <p style={{ fontSize: 'clamp(18px,1.8vw,24px)', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', lineHeight: 1.6, maxWidth: '640px', margin: 0 }}>
            That is where belonging forms.<br />
            That is where habits stick.<br />
            That is where culture begins.
          </p>
        </FadeUp>
      </section>

      {/* ── CH 8: § 12 — Product reveal ───────────────────────────── */}
      <section style={{ ...S, minHeight: '100vh', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', textAlign: 'center' as const, alignItems: 'center', background: 'var(--paper)' }}>
        <FadeUp style={{ marginBottom: '64px' }}>
          <span className="tag">§ 12 — The product</span>
        </FadeUp>
        <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(44px,8vw,132px)', lineHeight: 0.94, letterSpacing: '-.035em', color: 'var(--ink)', marginBottom: '40px' }}>
          So no.
        </h2>
        <p style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(28px,4vw,72px)', lineHeight: 1, letterSpacing: '-.03em', color: 'var(--ink-3)', marginBottom: '40px', maxWidth: '900px' }}>
          The product is not a sustainability app.
        </p>
        <FadeUp delay={0.3}>
          <p style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(24px,3.5vw,56px)', lineHeight: 1.1, letterSpacing: '-.025em', color: 'var(--blue)', fontStyle: 'italic', marginBottom: '32px', maxWidth: '900px' }}>
            It is a multiplayer game for real-world participation.
          </p>
        </FadeUp>
        <FadeUp delay={0.6}>
          <p style={{ fontSize: 'clamp(17px,1.5vw,22px)', lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '620px', margin: 0 }}>
            Where sustainability becomes a side effect of identity — not the emotional entry point.
          </p>
        </FadeUp>
      </section>

      {/* ── CH NEW: § — Core loop ────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', borderTop: '1px solid var(--line)' }}>
        <div style={{ padding: 'clamp(96px,12vw,180px) clamp(24px,6vw,96px)', maxWidth: '1480px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 'clamp(32px,4vw,56px)' }}>
              § — The core loop · This is the company. Everything else is secondary.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '640px' }}>
              If this loop works —<br />
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>everything else follows.</span>
            </h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'var(--line)', marginBottom: 'clamp(48px,6vw,80px)' }}>
            {[
              { n: '01', step: 'AI detects', desc: 'contextual participation opportunity — timing, location, social energy, free window', icon: '◎' },
              { n: '02', step: 'Mission appears', desc: 'at the right emotional moment — lightweight, socially safe, easy to initiate', icon: '→' },
              { n: '03', step: 'Trusted friends join', desc: 'not strangers. Your actual group. The people whose streak matters to you', icon: '◉' },
              { n: '04', step: 'Shared streak grows', desc: 'team momentum builds. Breaking it feels personal. Continuing it feels good', icon: '↑' },
              { n: '05', step: 'Emotional reward', desc: 'visible identity forms. The city feels more alive. Participation repeats', icon: '★' },
            ].map(({ n, step, desc, icon }, i) => (
              <FadeUp key={n} delay={i * 0.1}>
                <div style={{ padding: 'clamp(24px,3vw,40px)', background: 'var(--paper)', position: 'relative' as const }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em' }}>{n} /</span>
                    <span style={{ fontSize: '20px', color: 'var(--blue)', opacity: 0.4 }}>{icon}</span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(16px,1.5vw,20px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '10px', fontStyle: 'italic' }}>{step}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.6}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '24px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '12px', textTransform: 'uppercase' as const }}>Win condition</p>
                {['"don\'t break the streak."', '"what\'s today\'s mission?"', '"our flat is doing this tonight."', '"Berlin feels more alive using this."'].map((q, i) => (
                  <p key={i} style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic', borderBottom: i < 3 ? '1px solid var(--line)' : 'none', padding: '10px 0', margin: 0 }}>{q}</p>
                ))}
              </div>
              <div style={{ padding: '24px', background: 'var(--ink)', borderRadius: '12px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '12px', textTransform: 'uppercase' as const }}>If the loop fails</p>
                {['Retention dies.', 'Density never forms.', 'Culture never emerges.', 'AI becomes irrelevant.', 'Nothing else matters.'].map((q, i) => (
                  <p key={i} style={{ fontSize: '14px', lineHeight: 1.7, color: i === 4 ? 'var(--blue)' : 'rgba(255,255,255,0.45)', fontStyle: 'italic', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.08)' : 'none', padding: '10px 0', margin: 0 }}>{q}</p>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Demo: Mission invitation ─────────────────────────────── */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
        <div style={{ padding: 'clamp(96px,12vw,180px) clamp(24px,6vw,96px)', maxWidth: '1480px', margin: '0 auto' }}>
          <FadeUp style={{ marginBottom: 'clamp(32px,4vw,48px)' }}>
            <span className="tag">§ — What it feels like</span>
          </FadeUp>
          <FadeUp delay={0.15} style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '640px' }}>
              One notification.<br />
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>The whole product in 10 seconds.</span>
            </h2>
          </FadeUp>
          <MissionInvitationDemo />
        </div>
      </section>

      {/* ── Demo: Psychology experiments ─────────────────────────── */}
      <PsychologySection />

      {/* ── CH 9: § 13 — Mechanics ───────────────────────────────── */}
      <section style={{ ...S, background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
        <FadeUp style={{ marginBottom: '48px' }}>
          <span className="tag">§ 13 — The five mechanics</span>
        </FadeUp>
        <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(36px,5vw,72px)', lineHeight: 1, letterSpacing: '-.03em', color: 'var(--ink)', marginBottom: 'clamp(48px,6vw,80px)' }}>
          The five mechanics.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--line)' }}>
          <MechanicCard n="01" title="AI-timed missions" description="Not static challenges. Free evening + good weather + nearby friend = 'sunset walk mission?' The right nudge at the right contextual moment. This is the whole product." />
          <MechanicCard n="02" title="Trusted group rituals" description="Not strangers. Flatmates. Friends. Run clubs. Rituals form identity. Challenges don't. 'Our flat does Sunday walks.' That sentence is the product working." />
          <MechanicCard n="03" title="Shared momentum" description="'Your flat has walked 48km together.' Visible progress. Shared identity. Breaking the streak feels personal. Continuing it builds something real." />
          <MechanicCard n="04" title="Anti-scroll interception" description="'Catch me before I disappear into the feed.' AI notices passive scroll windows and offers a 2-minute real-world mission instead. Not guilt. A tiny opening." />
          <MechanicCard n="05" title="City feels alive" description="'Prenzlauer Berg is leading this week. Sunset walks are active across 4 districts tonight.' A new social layer for reality — not another app." />
        </div>
      </section>

      {/* ── CH 10: § 14 — AI layer ───────────────────────────────── */}
      <section style={DS}>
        <FadeUp style={{ marginBottom: '48px' }}>
          <span className="tag" style={{ color: 'var(--blue)' }}>§ 14 — The AI layer</span>
        </FadeUp>
        <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(44px,8vw,132px)', lineHeight: 0.94, letterSpacing: '-.035em', color: 'var(--paper)', marginBottom: '16px' }}>
          AI is not the product.
        </h2>
        <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(44px,8vw,132px)', lineHeight: 0.94, letterSpacing: '-.035em', color: 'var(--blue)', fontStyle: 'italic', marginBottom: 'clamp(48px,6vw,80px)' }}>
          AI is the coordination layer.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '48px' }}>
          {['Timing', 'Location', 'Mood', 'Social context', 'Team momentum', 'Nearby opportunities'].map(cap => (
            <div key={cap} style={{ padding: 'clamp(20px,2.5vw,32px)', background: 'rgba(255,255,255,0.04)' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>AI reads</p>
              <p style={{ fontSize: 'clamp(16px,1.5vw,22px)', fontWeight: 600, color: 'var(--paper)', letterSpacing: '-0.02em', margin: 0 }}>{cap}</p>
            </div>
          ))}
        </div>
        <FadeUp>
          <p style={{ fontSize: 'clamp(18px,1.8vw,24px)', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', lineHeight: 1.6, maxWidth: '640px', margin: 0 }}>
            Not to replace reality.<br />
            But to make participation inside reality easier, more emotional, and more likely to happen.
          </p>
        </FadeUp>
      </section>

      {/* ── City feels alive ─────────────────────────────────────── */}
      <section style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ padding: 'clamp(96px,12vw,180px) clamp(24px,6vw,96px)', maxWidth: '1480px', margin: '0 auto' }}>
          <FadeUp style={{ marginBottom: 'clamp(32px,4vw,56px)' }}>
            <span className="tag" style={{ color: 'var(--blue)' }}>§ — When it works</span>
          </FadeUp>
          <FadeUp delay={0.1} style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
            <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(40px,6vw,96px)', lineHeight: 0.97, letterSpacing: '-0.035em', color: 'var(--paper)', maxWidth: '800px' }}>
              When enough people participate —<br />
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>the city feels different.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.3} style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
            <p style={{ fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: 0 }}>
              This is not a social network. It is a participation layer for reality. Coordinated by AI. Felt in the city.
            </p>
          </FadeUp>
          <CityAlive />
          <FadeUp delay={0.6} style={{ marginTop: 'clamp(48px,6vw,80px)' }}>
            <p style={{ fontSize: 'clamp(18px,2vw,28px)', fontWeight: 500, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', lineHeight: 1.5, maxWidth: '640px', margin: 0 }}>
              That is what success looks like.<br />
              Not downloads. Not metrics.<br />
              <span style={{ color: 'var(--blue)' }}>"Berlin feels more alive."</span>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CH 10b: § 15 — Why now (verified human) ────────────────── */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
        <div style={{ padding: 'clamp(96px,12vw,180px) clamp(24px,6vw,96px)', maxWidth: '1480px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 'clamp(32px,4vw,56px)' }}>§ 15 — Why now</p>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(48px,6vw,96px)', alignItems: 'center' }}>
            <div>
              <FadeUp>
                <h2 style={{ fontSize: 'clamp(28px,4vw,64px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '32px' }}>
                  AI is flooding the internet with synthetic content.
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h2 style={{ fontSize: 'clamp(28px,4vw,64px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1.05, fontStyle: 'italic', marginBottom: '40px' }}>
                  Real human participation just became the scarce resource.
                </h2>
              </FadeUp>
              <FadeUp delay={0.5}>
                <p style={{ fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.7, color: 'var(--ink-2)', maxWidth: '520px', margin: 0 }}>
                  Every platform optimized for attention, consumption, and AI-generated engagement. Participation OS goes the other direction — verified humans, real-world actions, genuine presence. Not because it is morally right. Because it is increasingly rare.
                </p>
              </FadeUp>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
              {[
                { label: 'What scales today', value: 'AI-generated content', color: 'var(--ink-3)', strike: true },
                { label: 'What becomes scarce', value: 'Verified human presence', color: 'var(--blue)', strike: false },
                { label: 'What platforms optimize', value: 'Passive attention', color: 'var(--ink-3)', strike: true },
                { label: 'What we optimize', value: 'Real-world participation', color: 'var(--blue)', strike: false },
                { label: 'What AI replaces', value: 'Content creation', color: 'var(--ink-3)', strike: true },
                { label: 'What AI enables here', value: 'Human coordination', color: 'var(--blue)', strike: false },
              ].map(({ label, value, color, strike }, i) => (
                <FadeUp key={i} delay={i * 0.07}>
                  <div style={{ padding: 'clamp(20px,2.5vw,32px)', background: 'var(--paper)' }}>
                    <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>{label}</p>
                    <p style={{ fontSize: 'clamp(14px,1.3vw,17px)', fontWeight: 600, color, letterSpacing: '-0.01em', textDecoration: strike ? 'line-through' : 'none', textDecorationColor: 'var(--ink-4)', margin: 0 }}>{value}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
          <FadeUp delay={0.8} style={{ marginTop: 'clamp(48px,6vw,80px)', paddingTop: 'clamp(48px,6vw,80px)', borderTop: '1px solid var(--line)' }}>
            <p style={{ fontSize: 'clamp(18px,2vw,28px)', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.5, maxWidth: '720px', fontStyle: 'italic', margin: 0 }}>
              &ldquo;Loneliness is rising. Digital life feels increasingly synthetic. Local communities weakened. AI-generated content floods the internet. This creates a new opportunity — platforms that help verified humans participate meaningfully in reality again.&rdquo;
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CH 11: § 16 — Final ─────────────────────────────────── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', alignItems: 'center', textAlign: 'center' as const, background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(96px,12vw,180px) clamp(24px,6vw,96px)' }}>
        <FadeUp style={{ marginBottom: '48px' }}>
          <span className="tag" style={{ color: 'var(--blue)' }}>§ 16 — The one question</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 600, fontSize: 'clamp(36px,5vw,72px)', lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--paper)', marginBottom: '40px', maxWidth: '860px' }}>
            Will people repeatedly complete<br />real-world missions together?
          </h2>
        </FadeUp>
        <FadeUp delay={0.35}>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: 'clamp(20px,2.2vw,32px)', lineHeight: 1.45, color: 'var(--blue)', fontStyle: 'italic', maxWidth: '700px', marginBottom: '56px' }}>
            If yes — we don&apos;t just have an app.<br />
            We have the beginning of a new behavioral loop.
          </p>
        </FadeUp>
        <FadeUp delay={0.6}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '48px', maxWidth: '560px' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '20px' }}>The real question</p>
            <p style={{ fontSize: 'clamp(18px,2vw,26px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '20px', fontStyle: 'italic' }}>
              AI will change how we live. That is no longer a question.
            </p>
            <p style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: '40px' }}>
              What do we optimize for?
            </p>
            <p style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 700, color: 'var(--blue)', fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '48px' }}>
              I&apos;m building for presence.
            </p>
            <a href="mailto:alicia.frommann@gmail.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 28px', background: 'var(--blue)', color: 'var(--paper)',
              borderRadius: '999px', fontSize: '14px', fontWeight: 600,
              textDecoration: 'none',
            }}>
              <span>Write to me</span><span>→</span>
            </a>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', marginTop: '20px', marginBottom: 0 }}>
              Gründerszene Startup-Sommercamp 2025
            </p>
          </div>
        </FadeUp>
      </section>

    </div>
  )
}
