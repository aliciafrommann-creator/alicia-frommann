'use client'
import dynamic from 'next/dynamic'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MarqueeSection from '@/components/MarqueeSection'
import Philosophy from '@/components/Philosophy'
import ThinkTogether from '@/components/ThinkTogether'
import ConflictShift from '@/components/ConflictShift'
import Iceberg from '@/components/Iceberg'
import HowIWork from '@/components/HowIWork'
import Stats from '@/components/Stats'
import Journey from '@/components/Journey'
import Values from '@/components/Values'
import Podcast from '@/components/Podcast'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ScrollBar from '@/components/ScrollBar'

const Loader = dynamic(() => import('@/components/Loader'),  { ssr: false })
const Cursor = dynamic(() => import('@/components/Cursor'),  { ssr: false })

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Loader />
      <Cursor />
      <ScrollBar />
      <Nav />
      <main id="top">
        <Hero />
        <MarqueeSection />
        <Philosophy />
        <ThinkTogether />
        <ConflictShift />
        <Iceberg />
        <HowIWork />
        <Stats />
        <Journey />
        <Values />
        <Podcast />
        <CTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
