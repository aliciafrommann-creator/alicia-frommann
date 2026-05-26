'use client'

import { useState } from 'react'
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
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>From challenge to ritual</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '12px' }}>
        The app starts with one small action.
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '650px', marginBottom: '24px' }}>
        It becomes a rhythm when people repeat it together.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: '12px' }}>
        {ritualFlow.map((card, i) => (
          <FlowCard key={card.title} index={i} title={card.title} copy={card.copy} detail={card.detail} />
        ))}
      </div>
      <MissionGeneratorMock />
      <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '8px' }}>
        {[
          ['Complete', 'mark done, picture optional, short note optional'],
          ['Visibility', 'private, friends, team, community, public'],
          ['Reward', 'wallet, one month, QR at shop, disappears after redemption'],
        ].map(([title, copy]) => (
          <div key={title} style={{ padding: '14px', background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.14)', borderRadius: '12px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>{title}</p>
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
  const filters = ['movement', 'culture', 'cafes', 'local', 'mindfulness', 'social courage', 'sustainability', 'community']
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Map & discovery</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '14px' }}>
        The city is alive. Private locations are not exposed.
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        {filters.map((f, i) => (
          <span key={f} style={{ padding: '6px 12px', borderRadius: '999px', border: `1px solid ${i < 3 ? 'rgba(29,79,255,0.25)' : 'var(--line)'}`, background: i < 3 ? 'rgba(29,79,255,0.08)' : 'var(--paper)', color: i < 3 ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '10px' }}>{f}</span>
        ))}
      </div>
      <div style={{ position: 'relative', minHeight: '360px', background: 'linear-gradient(135deg, #EEF2FF, var(--paper))', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden' }}>
        {['18%', '32%', '24%', '41%'].map((v, i) => (
          <div key={v} style={{ position: 'absolute', inset: `${16 + i * 14}% ${12 + i * 10}% auto ${10 + i * 12}%`, height: '1px', background: 'rgba(29,79,255,0.12)', transform: `rotate(${i % 2 ? -18 : 12}deg)` }} />
        ))}
        {[
          ['Prenzlauer Berg', 'sunset walk active', '72%', '20%', 'high'],
          ['Neukolln', 'run club ritual', '30%', '58%', 'rising'],
          ['Kreuzberg', 'cafe reward live', '58%', '48%', 'warm'],
          ['Mitte', 'culture mission', '48%', '28%', 'steady'],
        ].map(([name, mission, left, top, energy]) => (
          <div key={name} style={{ position: 'absolute', left, top, transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 0 12px rgba(29,79,255,0.12), 0 0 0 24px rgba(29,79,255,0.05)' }} />
            <div style={{ marginTop: '8px', background: 'rgba(250,248,243,0.92)', border: '1px solid var(--line)', borderRadius: '10px', padding: '9px 11px', width: '150px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '3px' }}>{name}</p>
              <p style={{ fontFamily: mono, fontSize: '9px', color: 'var(--blue)', marginBottom: '5px' }}>{energy} district energy</p>
              <p style={{ fontSize: '11px', color: 'var(--ink-3)' }}>{mission}</p>
            </div>
          </div>
        ))}
      </div>
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
          <div key={label} style={{ background: 'var(--paper)', padding: '24px' }}>
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
          <div key={title} style={{ background: i === 2 ? 'rgba(10,14,26,0.035)' : 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '20px', opacity: i === 2 ? 0.62 : 1 }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: state === 'Unlocked' ? 'var(--blue)' : 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>{state}</p>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '6px' }}>{title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', marginBottom: '14px' }}>{place}</p>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--ink-3)', marginBottom: '16px' }}>{valid}</p>
            <button style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', background: state === 'Unlocked' ? 'var(--blue)' : 'transparent', color: state === 'Unlocked' ? 'var(--paper)' : 'var(--ink-3)', border: `1px solid ${state === 'Unlocked' ? 'var(--blue)' : 'var(--line)'}`, fontFamily: mono, fontSize: '11px', textTransform: 'uppercase' }}>{action}</button>
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
            An AI-native platform where people complete real-world missions with trusted groups, build streaks, post participation moments, discover communities on a map, unlock local rewards, and see personal, team, community and city dashboards.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['missions', 'trusted groups', 'streaks', 'feed posts', 'map discovery', 'local rewards', 'dashboards', 'privacy controls'].map(item => (
              <span key={item} style={{ padding: '7px 12px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', border: '1px solid rgba(29,79,255,0.18)', fontFamily: mono, fontSize: '11px' }}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <SectionLabel>Optimization contrast</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '26px' }}>
            AI optimized attention first. <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Participation OS explores optimizing presence instead.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
            {[
              ['Current internet', ['maximize screen time', 'maximize ads', 'maximize consumption', 'maximize extraction', 'maximize passive attention']],
              ['Participation OS', ['maximize presence', 'maximize participation', 'maximize local connection', 'maximize meaningful coordination', 'maximize real-world rituals']],
            ].map(([title, items]) => (
              <div key={title as string} style={{ background: 'var(--paper)', padding: 'clamp(22px,3vw,32px)' }}>
                <p style={{ fontSize: '18px', fontWeight: 700, color: title === 'Participation OS' ? 'var(--blue)' : 'var(--ink)', marginBottom: '14px' }}>{title as string}</p>
                {(items as string[]).map(item => (
                  <p key={item} style={{ fontSize: '13px', color: 'var(--ink-2)', padding: '9px 0', borderTop: '1px solid var(--line)' }}>+ {item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <ProductMoment />
        <ChallengeToRitualSection />
        <TeamsCommunitiesSection />

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <SectionLabel>Product systems</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
            {productSystems.map((system, i) => (
              <div key={system.title} style={{ background: 'var(--paper)', padding: '22px' }}>
                <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '10px' }}>{String(i + 1).padStart(2, '0')} /</p>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '12px' }}>{system.title}</h3>
                {system.items.map(item => (
                  <p key={item} style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.55 }}>- {item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <MapMockup />
        <DashboardMockup />
        <RewardWallet />

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <SectionLabel>Desired ecosystem</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '28px' }}>
            If participation scales, everyone around it changes too.
          </h2>
          <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(24px,4vw,40px)', marginBottom: '14px' }}>
            <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.04em', marginBottom: '8px' }}>Participation OS</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>Missions, trusted groups, rituals, streaks, feed, map, rewards, dashboards, AI coordination, privacy controls.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
            {ecosystem.map(([name, change, example]) => (
              <div key={name} style={{ background: 'var(--paper)', padding: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', marginBottom: '7px' }}>{name}</h3>
                <p style={{ fontSize: '12px', color: 'var(--blue)', lineHeight: 1.45, marginBottom: '10px' }}>{change}</p>
                <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.55 }}>{example}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
          <SectionLabel>Societal change</SectionLabel>
          {[
            ['passive consumption', 'coordinated participation'],
            ['ads and extraction', 'user-serving AI'],
            ['huge e-commerce control', 'local discovery'],
            ['synthetic internet', 'verified human presence'],
            ['scrolling alone', 'shared rituals'],
            ['moral sustainability', 'identity-driven behavior change'],
          ].map(([from, to]) => (
            <div key={from} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '14px', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
              <p style={{ fontSize: 'clamp(14px,1.6vw,18px)', color: 'var(--ink-4)', textDecoration: 'line-through' }}>{from}</p>
              <p style={{ fontFamily: mono, fontSize: '11px', color: 'var(--blue)' }}>to</p>
              <p style={{ fontSize: 'clamp(14px,1.6vw,18px)', color: 'var(--ink)', fontWeight: 700 }}>{to}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(28px,4vw,48px)', marginBottom: '64px' }}>
          <SectionLabel>10 weeks. Berlin. One loop.</SectionLabel>
          <h2 style={{ fontSize: 'clamp(28px,5vw,64px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: '18px' }}>
            Will people repeatedly complete real-world missions together?
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
            {['Berlin only', 'trusted groups only', 'AI-timed missions', 'daily / weekly missions', 'participation feed', 'streaks', 'simple rewards', 'lightweight map', 'basic dashboard'].map(item => (
              <span key={item} style={{ padding: '7px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.72)', fontFamily: mono, fontSize: '11px' }}>{item}</span>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--blue)', fontWeight: 700, lineHeight: 1.6 }}>Big vision, focused MVP: prove the loop before building the whole city.</p>
        </div>

        <PsychologySection />

        <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
          <button onClick={() => onNav('pitch')} style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', background: 'transparent', cursor: 'pointer' }}>
            See the pitch
          </button>
        </div>
      </div>
    </div>
  )
}
