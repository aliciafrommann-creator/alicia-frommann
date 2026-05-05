import dynamic from 'next/dynamic'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import GrainOverlay from '@/components/GrainOverlay'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MarqueeSection from '@/components/MarqueeSection'
import Philosophy from '@/components/Philosophy'
import ThinkTogether from '@/components/ThinkTogether'
import Podcast from '@/components/Podcast'
import Stats from '@/components/Stats'
import Journey from '@/components/Journey'
import Values from '@/components/Values'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false })
const Loader  = dynamic(() => import('@/components/Loader'),  { ssr: false })

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Loader />
      <Cursor />
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <MarqueeSection />
        <Philosophy />
        <ThinkTogether />
        <Podcast />
        <Stats />
        <Journey />
        <Values />
        <CTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
