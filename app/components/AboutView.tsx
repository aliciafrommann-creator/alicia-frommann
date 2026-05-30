'use client'

import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const staggerItemX = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

const journey = [
  { y: '09/21 – 02/25', r: 'BSc International Business', o: 'ESB Business School Reutlingen', d: 'GPA 1.9 · International business, strategy, finance' },
  { y: '02/23 – 08/23', r: 'Corporate Transformation Intern', o: 'Robert Bosch GmbH', d: 'Designed the "Peer-to-Peer Change Lab" · contributed to Executive Forum for 500 top managers' },
  { y: '08/23 – 02/24', r: 'Exchange Semester', o: 'LAB University of Applied Sciences, Finland', d: 'GPA 1.0 · new perspectives, same systems thinking' },
  { y: '04/24 – 12/24', r: 'Working Student · Portfolio Management', o: 'Robert Bosch GmbH', d: 'Global transformation initiative · Product Management Excellence across Mobility business units' },
  { y: '09/24 – now', r: 'MSc Digital Transformation & Sustainable Innovation', o: 'MCI Innsbruck', d: 'GPA 1.3 · building ThinkTogether, PeakPlant and Participation OS in parallel' },
  { y: '02/25 – now', r: 'Consulting & Interim Management', o: 'Mücke Roth & Company, Munich', d: 'Energy sector · end-to-end service & sales transformation' },
  { y: 'July 2026', r: 'Next chapter', o: 'Free to build · Berlin', d: 'Job quit. Full creative focus. Ready to build, fail and make Participation OS real.' },
]

export function AboutView({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>

        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>About</p>

        <motion.div {...reveal}>
          <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: '28px' }}>
            Alicia<br /><span style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Frommann.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,1.4vw,18px)', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '520px', marginBottom: '56px' }}>
            Builder. Systems thinker. MSc candidate. I think analytically and feel deeply — and I&apos;ve learned that&apos;s what helps me understand both people and the systems they live in. I build things that help us live more consciously: in business, with each other, with ourselves, and with the earth.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginBottom: '64px' }}
        >
          {[
            ['2', 'products built', 'ThinkTogether · PeakPlant, built beside university and work'],
            ['240k+', 'organic reel views', 'DKMS university campaign across Germany'],
            ['1.3', 'GPA', 'MSc Digital Transformation & Sustainable Innovation · MCI Innsbruck'],
            ["July '26", 'full-time building', 'job quit, free to build, learn, fail and iterate'],
          ].map(([n, label, sub], i) => (
            <motion.div
              key={label}
              variants={staggerItem}
              style={{ display: 'grid', gridTemplateColumns: '100px minmax(0, 0.9fr) minmax(0, 1.4fr)', gap: '16px 24px', alignItems: 'baseline', padding: '18px 0', borderBottom: i < 3 ? '1px solid var(--line)' : '0' }}
            >
              <p style={{ fontSize: 'clamp(22px,2.2vw,32px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1 }}>{n}</p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{label}</p>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.6 }}>{sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Founder proof */}
        <motion.div {...reveal} style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '28px' }}>When I care, I make it work</p>
          <h2 style={{ fontSize: 'clamp(22px,3vw,42px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '16px' }}>
            I want to build things that feel alive.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '640px', marginBottom: '24px' }}>
            Positive impact, presence, belonging and fun are not side notes for me. They are what I live for. When I know something is good, I find a way: from a DKMS university campaign with more than 240,000 Instagram reel views to building ThinkTogether and PeakPlant in parallel with work and university.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['DKMS Hochschulaktion', '@aliciyeah', 'ThinkTogether', 'PeakPlant', 'free from July to build'].map(item => (
              <span key={item} style={{ padding: '7px 12px', borderRadius: '999px', border: '1px solid var(--line)', background: 'rgba(29,79,255,0.035)', color: item === '@aliciyeah' ? 'var(--blue)' : 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{item}</span>
            ))}
          </div>
        </motion.div>

        {/* How I think */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}
        >
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>How I think</p>
          {[
            { t: 'Systems before solutions.', b: 'Before I build, I map. What are the feedback loops? Where is the real leverage? This is not a methodology. It is how I see the world.' },
            { t: 'Ship, then learn.', b: 'ThinkTogether was built in evenings and weekends. PeakPlant was designed between lectures. I don\'t wait for perfect conditions; I learn by putting things into the world.' },
            { t: 'AI-native from day one.', b: 'I build with modern AI tools, Supabase and Vercel as a practical stack. Not AI as decoration, but AI as product architecture.' },
          ].map(({ t, b }) => (
            <motion.div key={t} variants={staggerItem} style={{ paddingBottom: '28px', marginBottom: '28px', borderBottom: '1px solid var(--line)' }}>
              <h3 style={{ fontSize: 'clamp(17px,1.8vw,22px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '8px', fontStyle: 'italic' }}>{t}</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '520px' }}>{b}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why participation became personal */}
        <motion.div {...reveal} style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>Why participation became personal</p>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '20px' }}>
              I know what it means when systems become personal.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.75, marginBottom: '16px' }}>
              When my family urgently needed help, I organized donor-search initiatives through DKMS and my university network. An awareness video I created reached more than 240,000 views on Instagram.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.75, marginBottom: '16px' }}>
              That experience taught me something important: watching and doing are two very different things. People care deeply. But participation still needs to be made visible, easy, and emotionally possible.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--blue)', lineHeight: 1.75, fontWeight: 500 }}>
              That question became personal for me: how do we design systems that make people more likely to show up for each other, for their city, and for the future they say they care about?
            </p>
          </div>
        </motion.div>

        {/* Why Berlin */}
        <motion.div {...reveal} style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>Why Berlin · the right testbed</p>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '28px' }}>
            I am currently studying in Innsbruck, but Berlin is where Participation OS needs to be tested. Urban density, student communities, local shop culture, run clubs, walkability, and a city that already has real participation energy.
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1px', background: 'var(--line)' }}
          >
            {[
              { t: 'Density', d: 'Enough potential users in walking distance to test the cold-start loop' },
              { t: 'Community culture', d: 'Run clubs. Girls walks. Repair cafés. The rituals already exist.' },
              { t: 'Local shops', d: 'Enough independent businesses to test the reward mechanic' },
              { t: 'Students', d: 'ESB and MCI contacts. People in transition, open to new rituals.' },
            ].map(({ t, d }) => (
              <motion.div key={t} variants={staggerItem} style={{ padding: 'clamp(16px,2vw,24px)', background: 'var(--paper)' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--blue)', marginBottom: '6px' }}>{t}</p>
                <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.6 }}>{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Journey */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '48px' }}>
          <motion.p
            {...reveal}
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}
          >
            Journey
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ position: 'relative', paddingLeft: '28px' }}
          >
            {/* Vertical timeline line */}
            <div style={{ position: 'absolute', left: '6px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, var(--blue), rgba(29,79,255,0.15))' }} />
            {journey.map(({ y, r, o, d }, i) => {
              const isNow = y.includes('now') || y === 'July 2026'
              return (
                <motion.div
                  key={i}
                  variants={staggerItemX}
                  style={{ position: 'relative', paddingBottom: i < journey.length - 1 ? '28px' : '0', marginBottom: i < journey.length - 1 ? '0' : '0' }}
                >
                  {/* Timeline dot */}
                  <motion.div
                    animate={isNow ? { boxShadow: ['0 0 0 0px rgba(29,79,255,0.3)', '0 0 0 6px rgba(29,79,255,0)', '0 0 0 0px rgba(29,79,255,0.3)'] } : {}}
                    transition={isNow ? { duration: 2.5, repeat: Infinity, ease: 'easeOut' } : {}}
                    style={{
                      position: 'absolute', left: '-23px', top: '4px',
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: isNow ? 'var(--blue)' : 'var(--paper)',
                      border: `2px solid ${isNow ? 'var(--blue)' : 'var(--line-2)'}`,
                      zIndex: 1,
                    }}
                  />
                  <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: isNow ? 'var(--blue)' : 'var(--ink-4)', letterSpacing: '0.02em', marginBottom: '6px' }}>{y}</p>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '3px', letterSpacing: '-0.01em' }}>{r}</p>
                  <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', marginBottom: '5px', letterSpacing: '0.02em' }}>{o}</p>
                  <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.6 }}>{d}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div {...reveal} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
        </motion.div>

      </div>
    </div>
  )
}
