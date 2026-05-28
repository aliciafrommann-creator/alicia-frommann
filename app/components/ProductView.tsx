'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { PsychologySection } from './PsychologySection'

const mono = 'var(--font-geist-mono)'

const productSystems = [
  { title: 'Participation Layer', items: ['daily missions', 'weekly missions', 'monthly missions', 'AI-timed missions', 'community missions'] },
  { title: 'Social Layer', items: ['friends', 'following', 'trusted groups', 'communities', 'participation feed', 'saved activities'] },
  { title: 'Ritual & Streak Layer', items: ['personal streaks', 'group streaks', 'rituals', 'continuity', 'identity formation'] },
  { title: 'Reward Layer', items: ['3 / 7 / 14-day gifts', 'local vouchers', 'one-month validity', 'QR redemption', 'verified visits'] },
  { title: 'Map & Discovery Layer', items: ['participation map', 'mission filters', 'public missions', 'district energy', 'no private locations'] },
  { title: 'Dashboard Layer', items: ['my dashboard', 'team dashboard', 'community dashboard', 'city dashboard'] },
  { title: 'AI Coordination Layer', items: ['timing', 'location', 'mood', 'calendar windows', 'weather', 'team momentum', 'anti-scroll mode'] },
  { title: 'Trust & Privacy Layer', items: ['trusted groups first', 'privacy controls', 'no random exposure', 'optional proof-of-human later'] },
]

const dashboardData = {
  My: [
    ['missions completed', '18'],
    ['active streak', '7 days'],
    ['saved activities', '12'],
    ['rewards unlocked', '3'],
  ],
  Team: [
    ['missions completed', '42'],
    ['active streak', '6 days'],
    ['team momentum', 'high'],
    ['next ritual', 'sunset walk'],
  ],
  Community: [
    ['community rituals', '9'],
    ['active members', '284'],
    ['saved activities', '71'],
    ['weekly missions', '16'],
  ],
  City: [
    ['district energy', '+18%'],
    ['district rank', '#2 PBerg'],
    ['missions today', '847'],
    ['local rewards', '38'],
  ],
}

const ecosystem = [
  ['Users', 'less passive isolation, healthier routines, presence', 'A student swaps one dead scroll hour for a canal walk with two friends.'],
  ['Friend groups / flatmates', 'rituals, continuity, shared memories', 'A flat keeps a 7-day dinner streak alive because everyone can feel it.'],
  ['Communities', 'participation, identity, social energy', 'A run club turns Tuesday into a visible neighborhood ritual.'],
  ['Creators / hosts', 'host rituals, grow communities', 'A ceramics host launches a monthly repair-and-tea mission.'],
  ['Local businesses', 'emotionally engaged customers, repeat visits', 'A bookshop becomes the reward after a walking mission.'],
  ['Cafes / restaurants', 'ritual spaces, local visibility', 'A cafe redeems streak gifts during quiet weekday windows.'],
  ['Events / culture', 'discovery, participation, activation', 'A gallery turns openings into group missions, not passive listings.'],
  ['Universities', 'student belonging, community identity', 'First-years join trusted campus groups before isolation becomes normal.'],
  ['Cities', 'stronger local participation, healthier urban culture', 'District energy shows where participation is rising without exposing people.'],
  ['Future trust infrastructure', 'optional World ID / verified human layer, no bots', 'Verification supports human connection, not surveillance.'],
]

const rhythmExamples = [
  ['daily', '20-minute walk before scrolling'],
  ['weekly', 'dinner and a favorite memory'],
  ['biweekly', 'try a sport you never played'],
  ['monthly', 'plan a short trip with friends'],
]

const challengeCategories = [
  'comfort zone',
  'deeper friends',
  'nature',
  'environment',
  'learning',
  'movement',
  'local discovery',
  'create',
  'help someone',
]

const ritualFlow = [
  {
    title: 'Choose your rhythm',
    copy: 'Not everyone needs a daily habit. Some behaviors become rituals weekly, biweekly, or monthly.',
    detail: rhythmExamples,
  },
  {
    title: 'Surprise me or customize',
    copy: 'AI does not replace reality. It notices the opening and makes participation easier.',
    detail: ['Surprise me', 'Customize by time', 'Customize by mood', 'Customize by energy', 'Customize by category'],
  },
  {
    title: 'Complete + optionally post',
    copy: 'Mark complete, add a picture or note, then choose visibility. You always decide what becomes visible.',
    detail: ['private', 'friends', 'team', 'community', 'public'],
  },
  {
    title: 'Build streaks',
    copy: 'Challenges become rituals when people repeat them together.',
    detail: ['3 morning walks', '7-day mission streak', '10 completed challenges', '4 Sunday dinner rituals'],
  },
  {
    title: 'Unlock local rewards',
    copy: '10 streaks unlocked a surprise. Rewards are local reinforcement, not ads.',
    detail: ['coffee shop 15%', 'bakery surprise', 'ceramic voucher', 'bookstore reward'],
  },
  {
    title: 'Save what repeats',
    copy: 'Not an attention feed. A participation feed.',
    detail: ['recipes', 'cafes', 'walks', 'rituals', 'event ideas'],
  },
]

const communityFlow = [
  {
    title: 'Private teams',
    copy: 'Friends, flatmates, couples, university groups, work friends.',
    detail: ['team streaks', 'shared rituals', 'invite friend'],
  },
  {
    title: 'Open communities',
    copy: 'Girls walk, run club, painting in the park, coffee & bike, book club, walk & talk.',
    detail: ['missions', 'rituals', 'meetups'],
  },
  {
    title: 'Free local events',
    copy: 'Communities create openings into reality. Shops participate by hosting or rewarding, not by interrupting.',
    detail: ['no-phone cafe ritual', 'bookstore reading walk', 'bike repair mission'],
  },
  {
    title: 'Map triggers',
    copy: 'The map does not expose people. It reveals opportunities.',
    detail: ['400m girls walk', 'book club in 30 min', 'saved cafe tonight', 'team streak at risk'],
  },
  {
    title: 'Calendar join flow',
    copy: 'When something fits, the action is practical.',
    detail: ['join', 'add to calendar', 'invite friend', 'save', 'maybe later'],
  },
  {
    title: 'Privacy by choice',
    copy: 'You decide what you see and who sees what.',
    detail: ['location off by default', 'active mission only', 'selected friends', 'team only', 'approximate community area'],
  },
]

const flywheelSteps = [
  'Personalized challenges create solo value',
  'Streaks create return behavior',
  'Optional posts create social proof',
  'Friends create team rituals',
  'Communities create real-world opportunities',
  'Local shops create rewards',
  'Participation improves AI suggestions',
  'The city feels more alive',
]

const networkEffects = [
  ['Social network effect', 'More useful when friends, flatmates and teams participate together.'],
  ['Community network effect', 'More useful when communities host missions, rituals and free events.'],
  ['Local ecosystem effect', 'More useful when cafes, shops, bookstores, studios and cultural spaces reward or host participation.'],
  ['Data / AI learning effect', 'More useful as it learns from voluntary public/community completions, saved rituals and repeated local spots. Private activity stays private.'],
  ['Identity effect', 'Stickier when repeated missions become rituals and rituals become part of group identity.'],
]

const deRiskingCards = [
  {
    title: '10-week validation plan',
    items: ['20-30 Berlin friend groups', '3-5 seeded communities', '5 local reward partners', 'founder-led missions', 'weekly challenge calendar', 'student groups / run clubs / girls walks / cafes'],
  },
  {
    title: 'Success metrics',
    items: ['% completing first mission', 'missions per user per week', '% teams completing 3 missions', '7-day return rate', 'team streak continuation', 'voluntary feed posts', 'reward unlock and redemption', 'community event joins', 'saved activities'],
  },
  {
    title: 'Cold start strategy',
    items: ['trusted groups first', 'seed Berlin communities', 'run clubs, girls walks, cafes, university groups', 'founder-led rituals first'],
  },
  {
    title: 'Safety and privacy',
    items: ['location off by default', 'private teams first', 'exact location never public by default', 'block, report, mute', 'verified hosts for open communities', 'optional proof-of-human later', 'no bots'],
  },
  {
    title: 'AI trust',
    items: ['no ad-based business model', 'no selling user data', 'AI serves the user, not advertisers', 'calendar/location optional', 'minimal context works', 'user controls connected data', 'rewards are local reinforcement'],
  },
  {
    title: 'Business model boundary',
    items: ['free core loop', 'premium AI coordination', 'premium team rituals', 'advanced dashboards', 'local partner rewards', 'universities / companies later', 'shops do not buy attention'],
  },
]

const competitors = [
  ['Strava', 'sport identity'],
  ['Duolingo', 'learning habit'],
  ['Too Good To Go', 'reward + surplus'],
  ['Pokemon Go', 'real-world movement'],
  ['Participation OS', 'AI-native coordination layer for real-world rituals across categories'],
]

const onboardingCards = [
  ['What do you want more of?', ['presence', 'movement', 'friends', 'nature', 'local discovery', 'courage', 'sustainability', 'learning', 'creativity', 'helping others']],
  ['How often?', ['daily', 'weekly', 'every two weeks', 'monthly']],
  ['With whom?', ['solo', 'friends', 'flatmates', 'team', 'community']],
  ['How public?', ['private', 'friends', 'team', 'community', 'public']],
]

const trustCards = [
  {
    title: 'Built around real life, not ideal life.',
    copy: 'Calendar and location are optional inputs — never requirements. The app still works with a simple chosen rhythm.',
    items: ['45 minutes before dinner', 'Sunday morning open', 'three friends free tonight'],
  },
  {
    title: 'Intentional Mode',
    copy: 'Catch me before I disappear into the feed. Not another app fighting for attention — a tool helping you return to reality.',
    items: ['evening anti-scroll', 'after-work reset', 'weekend presence', 'team streak protection', 'change intensity'],
  },
  {
    title: 'Community hosting logic',
    copy: 'Communities create openings into reality. Shops participate by hosting or rewarding, not by interrupting.',
    items: ['no-phone cafe ritual', 'bookstore reading walk', 'painting in the park', 'bike repair mission', 'no paid feed interruption'],
  },
  {
    title: 'AI that serves the user',
    copy: 'Current internet systems learned to predict what keeps us inside. Participation OS uses AI to notice when reality is available again.',
    items: ['no ads', 'no selling user data', 'no paid interruption', 'minimal context works', 'user controls connections'],
  },
]

const privacyRows = [
  ['Visibility', ['private', 'friends', 'team', 'community', 'public']],
  ['Location', ['off by default', 'active mission only', 'selected friends', 'team only', 'approximate community area', 'no exact public location']],
  ['Safety', ['block', 'report', 'mute', 'verified hosts', 'no random stranger DMs', 'trusted groups first']],
  ['Future trust', ['optional verified human layer', 'public community anti-bot trust', 'connection not surveillance']],
]

const founderCards = [
  ['Why me?', 'I think in systems, behavioral loops and social change. I am not building a sustainability app. I am building the emotional infrastructure that makes better behavior feel human, social and repeatable.'],
  ['Why the Sommercamp?', 'I want to use the 10 weeks to turn a strong thesis into a tested behavioral loop. This idea needs density: people, feedback, communities, partners and real-world tests.'],
]

const soloProgression = [
  'Individual challenge',
  'Completion',
  'Streak',
  'Reward',
  'Optional feed post',
  'Friends join',
  'Team streak',
  'Community mission',
  'Map discovery',
  'City momentum',
]

const weeklyChallenges = [
  ['Plastic-free grocery week', 'complete it and unlock 10% at an unpacked store'],
  ['Cook vegetarian three times', 'save the best recipe for later'],
  ['Try a sport you never played', 'invite one friend or join a community'],
  ['Repair instead of rebuy', 'earn local reward progress'],
]

const ecosystemStakeholders = [
  ['Users', 'personalized challenges, streaks, rewards'],
  ['Friend groups', 'shared rituals and memories'],
  ['Communities', 'missions, rituals, free events'],
  ['Local shops', 'host or reward participation'],
  ['Universities', 'belonging and student identity'],
  ['Cities', 'district energy without surveillance'],
]

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: mono, fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '18px' }}>
      {children}
    </p>
  )
}

function MiniPills({ items, active = 0 }: { items: string[], active?: number }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {items.map((item, i) => (
        <span key={item} style={{
          padding: '5px 10px',
          borderRadius: '999px',
          border: `1px solid ${i === active ? 'rgba(29,79,255,0.28)' : 'var(--line)'}`,
          background: i === active ? 'rgba(29,79,255,0.08)' : 'transparent',
          color: i === active ? 'var(--blue)' : 'var(--ink-3)',
          fontFamily: mono,
          fontSize: '10px',
          lineHeight: 1.3,
        }}>
          {item}
        </span>
      ))}
    </div>
  )
}

function FlowCard({ title, copy, detail, index }: { title: string, copy: string, detail: string[] | string[][], index: number }) {
  const isPairs = Array.isArray(detail[0])

  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '20px', minHeight: '210px' }}>
      <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '12px' }}>{String(index + 1).padStart(2, '0')} /</p>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.58, marginBottom: '14px' }}>{copy}</p>
      {isPairs ? (
        <div style={{ display: 'grid', gap: '6px' }}>
          {(detail as string[][]).map(([label, example], i) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: '8px', alignItems: 'center', padding: '6px 0', borderTop: i === 0 ? '0' : '1px solid var(--line)' }}>
              <span style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)' }}>{label}</span>
              <span style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.4 }}>{example}</span>
            </div>
          ))}
        </div>
      ) : (
        <MiniPills items={detail as string[]} active={index % Math.max(detail.length, 1)} />
      )}
    </div>
  )
}

function MissionGeneratorMock() {
  return (
    <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(22px,4vw,34px)', margin: '24px 0 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(18px,4vw,36px)', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Mission generator</p>
          <h3 style={{ fontSize: 'clamp(20px,3vw,34px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '12px' }}>Surprise, or tune the opening.</h3>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>Users can receive a surprise challenge or shape it by time, mood, energy, category and interests.</p>
        </div>
        <div style={{ display: 'grid', gap: '10px' }}>
          {[
            ['Time', ['10 min', '30 min', 'evening']],
            ['Mood', ['low energy', 'social', 'adventurous', 'calm']],
            ['Energy', ['tired', 'restless', 'focused', 'open']],
            ['Category', ['friends', 'nature', 'environment', 'learning', 'movement']],
          ].map(([label, options], i) => (
            <div key={label as string}>
              <p style={{ fontFamily: mono, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>{label as string}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {(options as string[]).map((option, j) => (
                  <span key={option} style={{ padding: '5px 9px', borderRadius: '999px', border: `1px solid ${j === i % (options as string[]).length ? 'var(--blue)' : 'rgba(255,255,255,0.12)'}`, background: j === i % (options as string[]).length ? 'rgba(29,79,255,0.24)' : 'rgba(255,255,255,0.05)', color: j === i % (options as string[]).length ? 'var(--paper)' : 'rgba(255,255,255,0.48)', fontFamily: mono, fontSize: '10px' }}>{option}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <MiniPills items={challengeCategories} active={2} />
      </div>
    </div>
  )
}

function ChallengeToRitualSection() {
  const shortFlow = [
    ['Individual rituals', 'Small personal streaks with weekly mottos like be brave, be present or be sporty.'],
    ['Weekly challenge', 'One focused challenge per person each week.'],
    ['Extra missions', 'Join optional missions whenever the moment fits.'],
    ['Team missions', 'Friends or flatmates keep shared streaks alive.'],
    ['Community missions', 'Clubs and local shops host challenges and events on the map.'],
    ['Complete + share', 'Finish it, save it, or post it to the feed with visibility control.'],
  ]

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>From challenge to ritual</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '12px' }}>
        Small challenges create habit. Larger rituals create meaning.
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '650px', marginBottom: '24px' }}>
        The default is simple: individual rituals and one weekly challenge. Everything else is optional participation you can join when it fits.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
        {shortFlow.map(([title, copy], i) => (
          <div key={title} style={{ background: i < 3 ? 'rgba(29,79,255,0.055)' : 'var(--paper)', padding: '18px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '10px' }}>{String(i + 1).padStart(2, '0')} /</p>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '7px' }}>{title}</h3>
            <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5 }}>{copy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamsCommunitiesSection() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Teams, communities, and the city</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '14px' }}>
        Participation can be private, social, or public.
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '690px', marginBottom: '24px' }}>
        No one has to share their location. No one is exposed by default. The map feels like the city becoming more alive, not like surveillance.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: '12px' }}>
        {communityFlow.map((card, i) => (
          <FlowCard key={card.title} index={i} title={card.title} copy={card.copy} detail={card.detail} />
        ))}
      </div>
      <div style={{ marginTop: '18px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px,1fr))', gap: '14px' }}>
          <div>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Map trigger examples</p>
            {[
              'Hey, up for a little walk? A girls walk starts 400m away.',
              'Your book club community meets in the park in 30 minutes.',
              'A cafe you saved is hosting a no-phone ritual tonight.',
              'Your team is one mission away from keeping the weekly streak.',
            ].map(t => (
              <p key={t} style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.5, padding: '8px 0', borderTop: '1px solid var(--line)' }}>{t}</p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Privacy controls</p>
            <MiniPills items={['private', 'friends', 'team', 'community', 'public']} active={0} />
            <div style={{ height: '12px' }} />
            <MiniPills items={['off by default', 'active mission only', 'selected friends', 'team only', 'approximate area']} active={0} />
          </div>
          <div>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Join actions</p>
            <MiniPills items={['join', 'add to calendar', 'invite friend', 'save', 'maybe later', 'mute community']} active={1} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SoloValueSection() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Useful alone. More powerful together.</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '12px' }}>
        Solo value solves the cold start. Network effects create the upside.
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '720px', marginBottom: '22px' }}>
        The first loop does not require a full city. It requires one person, one challenge, one streak, and one reason to come back.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px,1fr))', gap: '8px', marginBottom: '18px' }}>
        {soloProgression.map((step, i) => (
          <div key={step} className="po-interactive-card" style={{ background: i < 4 ? 'rgba(29,79,255,0.07)' : 'var(--paper)', border: `1px solid ${i < 4 ? 'rgba(29,79,255,0.16)' : 'var(--line)'}`, borderRadius: '12px', padding: '14px', minHeight: '86px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '8px' }}>{String(i + 1).padStart(2, '0')}</p>
            <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 700, lineHeight: 1.35 }}>{step}</p>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '8px' }}>Weekly big challenges create meaning.</h3>
        <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '14px' }}>Small challenges create habit. Larger weekly challenges create meaning.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
          {weeklyChallenges.map(([title, copy]) => (
            <div key={title} style={{ background: 'var(--paper)', padding: '14px' }}>
              <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 700, marginBottom: '5px' }}>{title}</p>
              <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.45 }}>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SystemMapSection() {
  const loops = [
    ['Individual ritual loop', 'Weekly motto → small ritual → personal streak → better next challenge'],
    ['Team loop', 'Team mission → completion → group streak → shared memory → return behavior'],
    ['Community loop', 'Club or shop event → map discovery → join → local reward or ritual'],
    ['Trust loop', 'Privacy choice → safe participation → confidence → repeated use'],
  ]

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Reinforcing loops</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '22px' }}>
        The product is not endless customization. It is a few loops that reinforce each other.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '12px' }}>
        {loops.map(([title, copy], i) => (
          <div key={title} className="po-interactive-card" style={{ background: i === 0 ? 'rgba(29,79,255,0.07)' : 'var(--paper)', border: `1px solid ${i === 0 ? 'rgba(29,79,255,0.16)' : 'var(--line)'}`, borderRadius: '14px', padding: '22px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '10px' }}>{String(i + 1).padStart(2, '0')} /</p>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '10px' }}>{title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.55 }}>{copy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function EcosystemRing() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Desired ecosystem</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, maxWidth: '760px', marginBottom: '22px' }}>
        If participation scales, the platform changes the behavior around it.
      </h2>
      <div className="po-ecosystem-ring">
        <div className="po-ecosystem-center">
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Center</p>
          <h3 style={{ fontSize: 'clamp(22px,3vw,34px)', color: 'var(--paper)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '10px' }}>Participation OS</h3>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.55 }}>AI-timed missions, trusted groups, map discovery, streaks, local rewards and privacy controls.</p>
        </div>
        {ecosystemStakeholders.map(([name, copy], i) => (
          <div key={name} className={`po-ecosystem-node node-${i + 1}`}>
            <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 700, marginBottom: '5px' }}>{name}</p>
            <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.45 }}>{copy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductProofBlock({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', marginBottom: '22px' }}>
        <div>
          <SectionLabel>The product proof</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            Rituals, map events and rewards make the loop visible.
          </h2>
        </div>
        <button onClick={() => onNav('shop')} className="po-primary-action" style={{ padding: '10px 16px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: mono, fontSize: '11px' }}>
          Try the live demo
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '12px' }}>
        {[
          ['Rituals', 'Individual streaks are built around weekly mottos.', ['be brave', 'be present', 'be sporty']],
          ['Map', 'Join club missions, shop events and shared friend activity.', ['clubs', 'shops', 'friends']],
          ['Rewards', 'Unlock local gifts by completing missions, like Strava rewards but across real life.', ['QR ready', 'valid one month', 'not ads']],
        ].map(([title, copy, pills], i) => (
          <div key={title as string} className="po-interactive-card" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '22px', minHeight: '220px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>{String(i + 1).padStart(2, '0')} / {title as string}</p>
            <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '16px' }}>{copy as string}</p>
            <MiniPills items={pills as string[]} active={i} />
            <div style={{ marginTop: '20px', height: '72px', borderRadius: '12px', background: i === 0 ? 'linear-gradient(135deg,#eef2ff,var(--paper))' : i === 1 ? 'rgba(29,79,255,0.08)' : 'var(--ink)', border: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
              {i === 0 && ['18%', '56%', '78%'].map((left, j) => (
                <span key={left} style={{ position: 'absolute', left, top: `${22 + j * 13}%`, width: '12px', height: '12px', borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 0 8px rgba(29,79,255,0.1)' }} />
              ))}
              {i === 1 && <p style={{ position: 'absolute', inset: '20px', fontFamily: mono, fontSize: '11px', color: 'var(--blue)' }}>10 streak points {'->'} surprise reward</p>}
              {i === 2 && <div style={{ position: 'absolute', inset: '16px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px' }}>{['18', '7d', '+18%', '3'].map(v => <span key={v} style={{ color: 'var(--paper)', fontWeight: 700, fontSize: '16px' }}>{v}</span>)}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BuiltAgainstExtraction() {
  const carePrinciples = [
    ['No diagnosis', 'The AI never labels someone. It only routes sensitive signals away from gamified missions.'],
    ['No harmful missions', 'No shame, danger, pressure, illegal actions or emotional exposure as a requirement.'],
    ['Host safety', 'Open events can be muted, reported, blocked and eventually limited to verified hosts.'],
    ['Care over nudges', 'If distress appears, the app pauses participation logic and points toward trusted people or support.'],
  ]

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Built against extraction</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
        {[
          ['Current internet', ['screen time', 'ads', 'passive attention', 'data extraction']],
          ['Participation OS', ['presence', 'participation', 'user-serving AI', 'no ads', 'optional calendar/location', 'privacy by choice']],
        ].map(([title, items]) => (
          <div key={title as string} style={{ background: title === 'Participation OS' ? 'rgba(29,79,255,0.06)' : 'var(--paper)', padding: 'clamp(22px,3vw,32px)' }}>
            <h2 style={{ fontSize: 'clamp(24px,4vw,42px)', fontWeight: 700, color: title === 'Participation OS' ? 'var(--blue)' : 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '16px' }}>{title as string}</h2>
            {(items as string[]).map(item => (
              <p key={item} style={{ fontSize: '13px', color: 'var(--ink-2)', padding: '9px 0', borderTop: '1px solid var(--line)' }}>{item}</p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '8px' }}>
        {[
          'You decide what you see and who sees what.',
          'AI serves the user, not advertisers.',
          'The map reveals opportunities, not people.',
          'Rewards are local reinforcement, not ads.',
          'AI should know when not to nudge.',
        ].map(line => (
          <p key={line} style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px', padding: '14px', fontSize: '13px', color: 'var(--ink)', fontWeight: 700, lineHeight: 1.45 }}>{line}</p>
        ))}
      </div>
      <div style={{ marginTop: '14px', background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(20px,3vw,28px)' }}>
        <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Care & safety layer</p>
        <h3 style={{ fontSize: 'clamp(20px,3vw,34px)', color: 'var(--paper)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '10px' }}>
          Participation OS should never gamify distress.
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.6, maxWidth: '720px', marginBottom: '16px' }}>
          If signals suggest someone may need support, the product should pause normal missions and move toward care, trusted people, or professional help. It is not a therapist, and it should not pretend to be one.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px,1fr))', gap: '8px' }}>
          {carePrinciples.map(([title, copy]) => (
            <div key={title} style={{ borderTop: '1px solid rgba(255,255,255,0.09)', paddingTop: '10px' }}>
              <p style={{ fontSize: '13px', color: 'var(--paper)', fontWeight: 700, marginBottom: '5px' }}>{title}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.52)', lineHeight: 1.5 }}>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MVPBlock() {
  return (
    <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(28px,4vw,48px)', marginBottom: '64px' }}>
      <SectionLabel>10 weeks. Berlin. One loop.</SectionLabel>
      <h2 style={{ fontSize: 'clamp(28px,5vw,64px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: '18px' }}>
        Will people repeatedly complete real-world missions together?
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
        {['personalized AI challenges', 'streaks', 'simple rewards', 'optional feed posts', '20-30 friend groups', '3-5 communities', '5-10 local partners', 'lightweight map', 'basic dashboard'].map(item => (
          <span key={item} style={{ padding: '7px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.72)', fontFamily: mono, fontSize: '11px' }}>{item}</span>
        ))}
      </div>
      <p style={{ fontSize: '14px', color: 'var(--blue)', fontWeight: 700, lineHeight: 1.6 }}>
        The goal is not to prove a platform in 10 weeks. The goal is to prove one repeatable behavioral loop.
      </p>
    </div>
  )
}

function FounderClose() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '12px' }}>
        <div style={{ background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.14)', borderRadius: '16px', padding: '22px' }}>
          <SectionLabel>Why Alicia</SectionLabel>
          <p style={{ fontSize: '20px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '12px' }}>
            I think in systems, behavioral loops and social change.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
            I don't want AI to only make consumption more efficient. I want to use it to make presence easier.
          </p>
        </div>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: '22px' }}>
          <SectionLabel>Why the Sommercamp</SectionLabel>
          <p style={{ fontSize: '20px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '12px' }}>
            I want to use the 10 weeks to turn a strong thesis into a tested behavioral loop.
          </p>
          <MiniPills items={['Berlin density', 'critical feedback', 'founder community', 'product sparring', 'technical sparring', 'test environments']} active={0} />
        </div>
      </div>
    </div>
  )
}

function ParticipationFlywheel() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>The participation flywheel</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: 'clamp(20px,4vw,42px)', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '14px' }}>
            The product compounds through participation, not attention.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: '18px' }}>
            This is not a one-player habit app. It becomes more valuable with every friend group, community, local partner and completed mission.
          </p>
          <div style={{ display: 'grid', gap: '8px' }}>
            {[
              'Every completed mission makes the next one more likely.',
              'The more people participate, the more alive the city feels.',
              'Friends create rituals, communities create opportunities, local partners create rewards, and AI coordinates the timing.',
            ].map(line => (
              <p key={line} style={{ fontSize: '13px', color: 'var(--blue)', lineHeight: 1.55, fontWeight: 700 }}>{line}</p>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '8px' }}>
          {flywheelSteps.map((step, i) => (
            <div key={step} style={{
              minHeight: '88px',
              padding: '14px',
              borderRadius: i === 0 || i === flywheelSteps.length - 1 ? '16px' : '12px',
              border: `1px solid ${i === 0 || i === flywheelSteps.length - 1 ? 'rgba(29,79,255,0.28)' : 'var(--line)'}`,
              background: i === 0 || i === flywheelSteps.length - 1 ? 'rgba(29,79,255,0.08)' : 'var(--paper)',
            }}>
              <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '8px' }}>{String(i + 1).padStart(2, '0')}</p>
              <p style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: 1.45, fontWeight: 700 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
        {networkEffects.map(([title, copy]) => (
          <div key={title} style={{ background: 'var(--paper)', padding: '18px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 700, marginBottom: '8px' }}>{title}</h3>
            <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.55 }}>{copy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function InvestorDeRisking() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Investor de-risking</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '14px' }}>
        The vision is large, but the test is small.
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '24px' }}>
        Will people repeatedly complete real-world missions together?
      </p>
      <div style={{ background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.14)', borderRadius: '14px', padding: '18px', marginBottom: '18px' }}>
        <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 700, lineHeight: 1.55, marginBottom: '6px' }}>Cold start: trusted groups first.</p>
        <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
          Do not start with an empty public network. Start with trusted groups and founder-led rituals. The goal is not to prove a platform in 10 weeks. The goal is to prove one repeatable behavioral loop.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden', marginBottom: '18px' }}>
        {deRiskingCards.map(card => (
          <div key={card.title} style={{ background: 'var(--paper)', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--ink)', fontWeight: 700, marginBottom: '12px' }}>{card.title}</h3>
            {card.items.map(item => (
              <p key={item} style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.45, padding: '6px 0', borderTop: '1px solid var(--line)' }}>{item}</p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '12px' }}>
        <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: '22px' }}>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Competitive differentiation</p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, marginBottom: '10px' }}>
            We are not copying one mechanic. We are combining proven behavioral mechanics into one real-world participation loop.
          </p>
          {competitors.map(([name, focus]) => (
            <div key={name} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '10px', padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: '12px', color: name === 'Participation OS' ? 'var(--blue)' : 'rgba(255,255,255,0.72)', fontWeight: 700 }}>{name}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.52)', lineHeight: 1.45 }}>{focus}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.14)', borderRadius: '16px', padding: '22px' }}>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Why Gründerszene Startup-Sommercamp</p>
          <p style={{ fontSize: '24px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: '14px' }}>Berlin is the right density for a 10-week loop test.</p>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '12px' }}>If teams repeat missions without being pushed, the loop works.</p>
          <MiniPills items={['critical feedback', 'founder network', 'community access', 'product testing', 'co-founder search', '10-week MVP focus']} active={3} />
        </div>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginTop: '14px' }}>
        The business model should reinforce participation, not corrupt it. Strava made sport social. Duolingo made learning sticky. Too Good To Go made sustainable action feel like a win. Pokemon Go made the city feel playable. Participation OS makes presence repeatable.
      </p>
    </div>
  )
}

function ProductMoment() {
  return (
    <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(24px,4vw,44px)', marginBottom: '64px', overflow: 'hidden' }}>
      <SectionLabel>One product moment</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px,0.8fr) 1.2fr', gap: 'clamp(20px,4vw,44px)', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 'clamp(44px,7vw,86px)', color: 'var(--paper)', fontWeight: 700, letterSpacing: '-0.06em', lineHeight: 0.95, marginBottom: '18px' }}>18:42</p>
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>AI notices</p>
            {['free evening', 'good weather', 'group streak at risk'].map(item => (
              <p key={item} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', padding: '7px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>+ {item}</p>
            ))}
          </div>
        </div>
        <div>
          <div style={{ background: 'var(--paper)', borderRadius: '14px', padding: '18px', marginBottom: '16px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Notification</p>
            <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>"Your flat is one mission away from maintaining the streak."</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
            {[
              ['friend joins', 'Mila accepted'],
              ['mission active', 'sunset walk'],
              ['feed post', 'moment shared'],
              ['7-day streak', 'unlocked'],
              ['cafe reward', 'QR ready'],
              ['city dashboard', 'PBerg +1'],
            ].map(([t, d]) => (
              <div key={t} style={{ background: 'rgba(29,79,255,0.14)', border: '1px solid rgba(29,79,255,0.28)', borderRadius: '10px', padding: '12px' }}>
                <p style={{ fontSize: '12px', color: 'var(--paper)', fontWeight: 700, marginBottom: '4px' }}>{t}</p>
                <p style={{ fontFamily: mono, fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MapMockup() {
  const filters = ['movement', 'culture', 'cafes', 'local', 'friends', 'mindfulness', 'social courage', 'sustainability', 'community']
  const seedEvents = [
    { title: 'Girls Walk · Prenzlauer Berg', category: 'movement', district: 'Prenzlauer Berg', time: '18:30', host: 'Girls Walk Berlin', reward: 'cafe ritual progress', lat: 52.538, lng: 13.424, energy: 'high', privacy: 'public event, no private locations' },
    { title: "Mila's shared walk mission", category: 'friends', district: 'Kreuzberg', time: '18:10', host: 'followed friend', reward: 'friend ritual saved', lat: 52.501, lng: 13.41, energy: 'warm', privacy: 'shared mission, no live location' },
    { title: 'Run Club · Neukolln', category: 'movement', district: 'Neukolln', time: '19:00', host: 'Neukolln Run Club', reward: 'team streak +1', lat: 52.481, lng: 13.435, energy: 'rising', privacy: 'meetup point only' },
    { title: 'Painting in the Park · Kreuzberg', category: 'culture', district: 'Kreuzberg', time: 'Sunday 11:00', host: 'Park Studio', reward: 'ceramic voucher progress', lat: 52.498, lng: 13.415, energy: 'warm', privacy: 'community location' },
    { title: 'Coffee & Bike · Friedrichshain', category: 'cafes', district: 'Friedrichshain', time: 'Sat 10:00', host: 'Coffee & Bike', reward: '15% local coffee', lat: 52.515, lng: 13.455, energy: 'steady', privacy: 'hosted by community' },
    { title: 'Book Club Walk · Mitte', category: 'culture', district: 'Mitte', time: '17:30', host: 'Mitte Readers', reward: 'bookstore reward', lat: 52.52, lng: 13.405, energy: 'steady', privacy: 'approximate route' },
    { title: 'No-phone Cafe Ritual', category: 'mindfulness', district: 'Kreuzberg', time: 'Tomorrow 09:00', host: 'Kiez Cafe', reward: 'bakery surprise chance', lat: 52.49, lng: 13.428, energy: 'quiet', privacy: 'shop-hosted ritual' },
    { title: 'Local Repair Mission', category: 'local shops', district: 'Wedding', time: 'Sat 14:00', host: 'Repair Walk-in', reward: 'unpacked store discount', lat: 52.548, lng: 13.365, energy: 'useful', privacy: 'public host location' },
    { title: 'Sunset Walk Mission', category: 'social courage', district: 'Tempelhofer Feld', time: '20:15', host: 'Participation OS', reward: '7-day streak progress', lat: 52.474, lng: 13.403, energy: 'glowing', privacy: 'no user location shown' },
    { title: 'Plastic-free Grocery Mission', category: 'sustainability', district: 'Prenzlauer Berg', time: '16:00', host: 'Local zero-waste shop', reward: 'bio store gift progress', lat: 52.532, lng: 13.413, energy: 'practical', privacy: 'partner location only' },
    { title: 'Ceramic Painting Event', category: 'creativity', district: 'Kreuzberg', time: 'Thu 18:00', host: 'Ceramic studio', reward: 'painting voucher', lat: 52.502, lng: 13.431, energy: 'creative', privacy: 'hosted event' },
  ]
  const interestOptions = ['movement', 'culture', 'nature', 'friends', 'sustainability', 'learning', 'local discovery', 'creativity']
  const [activeFilter, setActiveFilter] = useState('movement')
  const [activeEvent, setActiveEvent] = useState(seedEvents[0])
  const [joined, setJoined] = useState<string[]>([])
  const [saved, setSaved] = useState<string[]>([])
  const [mapNote, setMapNote] = useState('')
  const [interests, setInterests] = useState<string[]>(['movement', 'local discovery'])
  const [mapSearch, setMapSearch] = useState('')
  const [mapReady, setMapReady] = useState(false)
  const mapEl = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<any>(null)
  const markerLayer = useRef<any>(null)
  const filteredEvents = seedEvents.filter(event => {
    if (activeFilter === 'community') return ['movement', 'culture', 'mindfulness', 'social courage'].includes(event.category)
    if (activeFilter === 'local') return event.category === 'local shops'
    if (activeFilter === 'cafes') return event.category === 'cafes'
    if (activeFilter === 'friends') return event.category === 'friends'
    return event.category === activeFilter || (activeFilter === 'movement' && event.category === 'social courage')
  })
  const searchTerms = mapSearch.toLowerCase().split(/\s+/).filter(Boolean)
  const recommendedEvent = seedEvents.find(event => {
    const haystack = `${event.title} ${event.category} ${event.district} ${event.host} ${event.reward}`.toLowerCase()
    return searchTerms.some(term => haystack.includes(term)) || interests.some(interest => event.category.includes(interest) || event.title.toLowerCase().includes(interest))
  }) || seedEvents[0]

  const mapAction = (action: string, title: string) => {
    if (action === 'join') setJoined(prev => prev.includes(title) ? prev : [...prev, title])
    if (action === 'save') setSaved(prev => prev.includes(title) ? prev : [...prev, title])
    setMapNote(`${action}: ${title}`)
  }

  useEffect(() => {
    let mounted = true
    async function setupMap() {
      if (!mapEl.current || mapInstance.current) return
      const L = await import('leaflet')
      if (!mounted || !mapEl.current) return
      const map = L.map(mapEl.current, { zoomControl: false, scrollWheelZoom: false }).setView([52.515, 13.405], 12)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)
      mapInstance.current = map
      markerLayer.current = L.layerGroup().addTo(map)
      setMapReady(true)
    }
    setupMap()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    async function renderMarkers() {
      if (!mapReady || !mapInstance.current || !markerLayer.current) return
      const L = await import('leaflet')
      markerLayer.current.clearLayers()
      filteredEvents.forEach(event => {
        const marker = L.marker([event.lat, event.lng], {
          icon: L.divIcon({
            className: 'po-leaflet-marker',
            html: `<span></span>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        })
        marker.on('click', () => setActiveEvent(event))
        marker.addTo(markerLayer.current)
      })
    }
    renderMarkers()
  }, [activeFilter, mapReady, filteredEvents])

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Map & discovery</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '14px' }}>
        Missions, clubs, shop events and followed friends appear as opportunities.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '8px', marginBottom: '12px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '10px' }}>
        <input
          value={mapSearch}
          onChange={e => setMapSearch(e.target.value)}
          placeholder="AI asks: what are you looking for? e.g. quiet cafe, run club, book walk"
          style={{ minWidth: 0, border: '0', outline: '0', background: 'transparent', color: 'var(--ink)', fontSize: '13px' }}
        />
        <span style={{ alignSelf: 'center', padding: '6px 10px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', fontFamily: mono, fontSize: '10px' }}>personalized</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        {filters.map(f => (
          <button onClick={() => setActiveFilter(f)} className="po-soft-action" key={f} style={{ padding: '6px 12px', borderRadius: '999px', border: `1px solid ${activeFilter === f ? 'rgba(29,79,255,0.25)' : 'var(--line)'}`, background: activeFilter === f ? 'rgba(29,79,255,0.08)' : 'var(--paper)', color: activeFilter === f ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '10px' }}>{f}</button>
        ))}
      </div>
      <div style={{ position: 'relative', minHeight: '390px', background: 'linear-gradient(135deg, #EEF2FF, var(--paper))', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden' }}>
        <div ref={mapEl} style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', left: '14px', bottom: '14px', background: 'rgba(250,248,243,0.92)', border: '1px solid var(--line)', borderRadius: '12px', padding: '12px', maxWidth: '260px' }}>
          <p style={{ fontFamily: mono, fontSize: '9px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>AI-style recommendation · demo matching</p>
          <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
            You like {interests.join(', ')}. <strong>{recommendedEvent.title}</strong> fits best.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
        {interestOptions.map(interest => (
          <button key={interest} onClick={() => setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest])} className="po-soft-action" style={{ padding: '5px 10px', borderRadius: '999px', border: `1px solid ${interests.includes(interest) ? 'rgba(29,79,255,0.25)' : 'var(--line)'}`, background: interests.includes(interest) ? 'rgba(29,79,255,0.08)' : 'var(--paper)', color: interests.includes(interest) ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '10px' }}>
            {interest}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '12px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '14px', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>{activeEvent.category} · {activeEvent.district}</p>
          <h3 style={{ fontSize: '20px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '6px' }}>{activeEvent.title}</h3>
          <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5 }}>{activeEvent.time} · hosted by {activeEvent.host} · {activeEvent.privacy}</p>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginTop: '7px' }}>reward: {activeEvent.reward}</p>
          {mapNote && <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginTop: '8px' }}>{mapNote}</p>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px', maxWidth: '280px' }}>
          {['join', 'add to calendar', 'invite friend', 'save'].map(action => (
            <button key={action} onClick={() => mapAction(action, activeEvent.title)} className={action === 'join' ? 'po-primary-action' : 'po-soft-action'} style={{ padding: '7px 11px', borderRadius: '999px', background: action === 'join' ? 'var(--blue)' : 'transparent', color: action === 'join' ? 'var(--paper)' : 'var(--ink-2)', border: `1px solid ${action === 'join' ? 'var(--blue)' : 'var(--line)'}`, fontFamily: mono, fontSize: '10px' }}>
              {action === 'join' && joined.includes(activeEvent.title) ? 'joined' : action === 'save' && saved.includes(activeEvent.title) ? 'saved' : action}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '8px', marginTop: '12px' }}>
        {[
          ['Search modes', 'Ask in words or filter by category. AI matches places, communities, shops and friend-shared missions.'],
          ['Safety layer', 'No exact public user location. No random stranger exposure. Block, report, mute and verified hosts for open communities.'],
          ['Learning boundary', 'Recommendations improve from voluntary public/community completions, not private rituals or team posts.'],
        ].map(([title, copy]) => (
          <div key={title} style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px', padding: '13px' }}>
            <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 700, marginBottom: '5px' }}>{title}</p>
            <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.5 }}>{copy}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '10px', lineHeight: 1.5 }}>The map does not expose private live locations. It reveals missions, clubs, shop events and shared friend activity.</p>
    </div>
  )
}

function DashboardMockup() {
  const [view, setView] = useState<keyof typeof dashboardData>('My')
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Dashboard layer</SectionLabel>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
        <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>Personal, team, community, city.</h2>
        <div style={{ display: 'flex', gap: '4px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '999px', padding: '4px' }}>
          {(Object.keys(dashboardData) as (keyof typeof dashboardData)[]).map(k => (
            <button key={k} onClick={() => setView(k)} style={{ padding: '6px 13px', borderRadius: '999px', background: view === k ? 'var(--blue)' : 'transparent', color: view === k ? 'var(--paper)' : 'var(--ink-3)', fontFamily: mono, fontSize: '11px' }}>{k}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
        {dashboardData[view].map(([label, value]) => (
          <div className="po-interactive-card" key={label} style={{ background: 'var(--paper)', padding: '24px' }}>
            <p style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '10px' }}>{value}</p>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RewardWallet() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Reward wallet</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px,1fr))', gap: '12px' }}>
        {[
          ['Unlocked', '7-day streak gift', 'Coffee at Kiez Cafe', 'Valid until 26 Jun', 'QR redeem'],
          ['Locked', '14-day ritual gift', 'Bookshop voucher', '5 missions left', 'keep streak'],
          ['Redeemed', '3-day starter gift', 'Bakery surprise', 'disappears after use', 'redeemed'],
        ].map(([state, title, place, valid, action], i) => (
          <div className="po-interactive-card" key={title} style={{ background: i === 2 ? 'rgba(10,14,26,0.035)' : 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '20px', opacity: i === 2 ? 0.62 : 1 }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: state === 'Unlocked' ? 'var(--blue)' : 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>{state}</p>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '6px' }}>{title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', marginBottom: '14px' }}>{place}</p>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--ink-3)', marginBottom: '16px' }}>{valid}</p>
            <button className={state === 'Unlocked' ? 'po-primary-action' : 'po-soft-action'} style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', background: state === 'Unlocked' ? 'var(--blue)' : 'transparent', color: state === 'Unlocked' ? 'var(--paper)' : 'var(--ink-3)', border: `1px solid ${state === 'Unlocked' ? 'var(--blue)' : 'var(--line)'}`, fontFamily: mono, fontSize: '11px', textTransform: 'uppercase' }}>{action}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProductView({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>
        <SectionLabel>The product</SectionLabel>

        <h1 style={{ fontSize: 'clamp(36px,6.5vw,88px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '8px' }}>
          Participation OS
        </h1>
        <p style={{ fontSize: 'clamp(18px,2.2vw,28px)', color: 'var(--blue)', fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: '24px' }}>
          AI-native infrastructure for real-world human coordination.
        </p>
        <p style={{ fontSize: 'clamp(15px,1.5vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '680px', marginBottom: '48px' }}>
          The internet optimized consumption. What if it optimized participation instead? Participation OS is not primarily a sustainability app. It is a platform where sustainability becomes a side effect of identity.
        </p>

        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: 'clamp(24px,4vw,40px)', marginBottom: '64px' }}>
          <SectionLabel>This is the app</SectionLabel>
          <p style={{ fontSize: 'clamp(22px,3.5vw,44px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '24px' }}>
            Participation OS is an AI-native platform where people receive personalized real-world challenges, complete them alone or with trusted groups, build streaks, optionally share moments, discover community missions on a map, and unlock local rewards.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '720px', marginBottom: '18px' }}>
            One person. One challenge. One streak. One reason to come back. Then friends, communities and local places make the loop stronger.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Challenge', 'Complete', 'Streak', 'Reward', 'Optional feed post', 'Better AI suggestion', 'Friends / teams / communities'].map(item => (
              <span key={item} style={{ padding: '7px 12px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', border: '1px solid rgba(29,79,255,0.18)', fontFamily: mono, fontSize: '11px' }}>{item}</span>
            ))}
          </div>
        </div>

        <ProductMoment />
        <SoloValueSection />
        <ChallengeToRitualSection />
        <SystemMapSection />
        <ProductProofBlock onNav={onNav} />
        <MapMockup />
        <BuiltAgainstExtraction />
        <ParticipationFlywheel />
        <EcosystemRing />
        <MVPBlock />
        <FounderClose />

        <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
          <button onClick={() => onNav('pitch')} style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', background: 'transparent', cursor: 'pointer' }}>
            See the pitch
          </button>
        </div>
      </div>
    </div>
  )
}
