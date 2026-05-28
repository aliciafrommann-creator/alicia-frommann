'use client'

import { motion } from 'framer-motion'

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
}

export function AboutView({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>About</p>

        <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: '32px' }}>
          Alicia<br /><span style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Frommann.</span>
        </h1>

        <p style={{ fontSize: 'clamp(16px,1.6vw,20px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '56px' }}>
          Founder. Systems thinker. MSc candidate. I build things that help people see the structures shaping their lives — and participate more intentionally in them.
        </p>

        {/* Stats grid — scroll reveal */}
        <motion.div {...revealProps} style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginBottom: '56px' }}>
          {[
            ['2', 'products built', 'ThinkTogether · PeakPlant, built beside university and work'],
            ['240k+', 'organic reel views', 'DKMS university campaign across Germany'],
            ['1.3', 'GPA', 'MSc Digital Business & Sustainable Innovation · MCI Innsbruck'],
            ["July '26", 'full-time building', 'job quit, free to build, learn, fail and iterate'],
          ].map(([n, label, sub], i) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '100px minmax(0, 0.9fr) minmax(0, 1.4fr)', gap: '16px 24px', alignItems: 'baseline', padding: '16px 0', borderBottom: i < 3 ? '1px solid var(--line)' : '0' }}>
              <p style={{ fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1 }}>{n}</p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{label}</p>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.55 }}>{sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Founder proof */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '28px' }}>When I care, I make it work</p>
          <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '14px' }}>
            I want to build things that feel alive.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '680px', marginBottom: '20px' }}>
            Positive impact, presence, belonging and fun are not side notes for me. They are what I live for. When I know something is good, I find a way: from a DKMS university campaign with more than 240,000 Instagram reel views to building ThinkTogether and PeakPlant in parallel with work and university.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['DKMS Hochschulaktion', '@aliciyeah', 'podcast work', 'ThinkTogether', 'PeakPlant', 'free from July to build'].map(item => (
              <span key={item} style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', background: 'rgba(29,79,255,0.035)', color: item === '@aliciyeah' ? 'var(--blue)' : 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{item}</span>
            ))}
          </div>
        </div>

        {/* How I think — scroll reveal */}
        <motion.div {...revealProps} style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>How I think</p>
          {[
            { t: 'Systems before solutions.', b: 'Before I build, I map. What are the feedback loops? Where is the real leverage? This is not a methodology — it is how I see the world.' },
            { t: 'Ship, then learn.', b: 'ThinkTogether was built in evenings and weekends. PeakPlant was designed between lectures. I do not wait for perfect conditions — I learn by putting things into the world.' },
            { t: 'AI-native from day one.', b: 'I build with modern AI tools, Supabase and Vercel as a practical stack. Not AI as decoration — AI as product architecture.' },
          ].map(({ t, b }, i) => (
            <div key={t} style={{ paddingBottom: '28px', marginBottom: '28px', borderBottom: '1px solid var(--line)' }}>
              <h3 style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '8px', fontStyle: 'italic' }}>{t}</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '520px' }}>{b}</p>
            </div>
          ))}
        </motion.div>

        {/* Why participation became personal — scroll reveal */}
        <motion.div {...revealProps} style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>Why participation became personal</p>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '20px' }}>
              I know what it means when systems become personal.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.75, marginBottom: '16px' }}>
              When my family urgently needed help, I organized donor-search initiatives through DKMS and my university network. An awareness video I created reached more than 240,000 views on Instagram.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.75, marginBottom: '16px' }}>
              That experience taught me something important: watching and doing are two very different things. People care deeply — but participation still needs to be made visible, easy, and emotionally possible.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--blue)', lineHeight: 1.75, fontWeight: 500 }}>
              That question became personal for me: how do we design systems that make people more likely to show up — for each other, for their city, and for the future they say they care about?
            </p>
          </div>
        </motion.div>

        {/* Why Berlin — scroll reveal */}
        <motion.div {...revealProps} style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>Why Berlin · the right testbed</p>
          <p style={{ fontSize: 'clamp(15px,1.6vw,18px)', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '24px' }}>
            I am currently studying in Innsbruck — but Berlin is where Participation OS needs to be tested. Urban density, student communities, local shop culture, run clubs, walkability, and a city with real participation energy already.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1px', background: 'var(--line)' }}>
            {[
              { icon: '⬡', t: 'Density', d: 'Enough potential users in walking distance to test the cold-start loop' },
              { icon: '⬡', t: 'Community culture', d: 'Run clubs. Girls walks. Repair cafés. The rituals already exist.' },
              { icon: '⬡', t: 'Local shops', d: 'Enough independent businesses to test the reward mechanic' },
              { icon: '⬡', t: 'Students', d: 'ESB and MCI contacts. People in transition — open to new rituals.' },
            ].map(({ icon, t, d }) => (
              <div key={t} style={{ padding: 'clamp(16px,2vw,24px)', background: 'var(--paper)' }}>
                <p style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--blue)' }}>{icon}</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>{t}</p>
                <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Journey — scroll reveal */}
        <motion.div {...revealProps} style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>Journey</p>
          {[
            { y: '2018–2022', r: 'Bachelor of Business Administration', o: 'ESB Business School Reutlingen', d: 'International business, strategy, finance' },
            { y: '2022–2023', r: 'Consultant', o: 'Muecke Roth & Company', d: 'Energy sector strategy and transformation' },
            { y: '2023–2024', r: 'Corporate Transformation & Portfolio Management', o: 'Robert Bosch GmbH', d: 'Systems thinking workshops for executives · Bosch Executive Forum (500 top managers) · ThinkTogether pilot' },
            { y: '2024–now', r: 'MSc Digital Business & Sustainable Innovation', o: 'MCI Innsbruck', d: 'GPA 1.3 · Building ThinkTogether, PeakPlant and podcast work in parallel' },
            { y: 'July 2026', r: 'Next chapter', o: 'Free to build · Berlin', d: 'Job quit. Full creative focus. Ready to build, learn, fail, iterate and make Participation OS real.' },
          ].map(({ y, r, o, d }, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px 24px', padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.02em', paddingTop: '3px' }}>{y}</p>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '2px' }}>{r}</p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', marginBottom: '5px', letterSpacing: '0.02em' }}>{o}</p>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.55 }}>{d}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="mailto:alicia.frommann@gmail.com" style={{ padding: '10px 22px', background: 'var(--blue)', color: 'var(--paper)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
            Write to me
          </a>
          <a href="https://www.linkedin.com/in/alicia-frommann" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', textDecoration: 'none' }}>
            LinkedIn
          </a>
          <a href="https://www.instagram.com/aliciyeah/" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', textDecoration: 'none' }}>
            Instagram
          </a>
          <button onClick={() => onNav('pitch')} style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', background: 'transparent', cursor: 'pointer' }}>
            See application
          </button>
        </div>
      </div>
    </div>
  )
}
