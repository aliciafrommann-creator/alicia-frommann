import dynamic from 'next/dynamic'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MarqueeSection from '@/components/MarqueeSection'
import Philosophy from '@/components/Philosophy'
import ThinkTogether from '@/components/ThinkTogether'
import Projects from '@/components/Projects'
import Iceberg from '@/components/Iceberg'
import HowIWork from '@/components/HowIWork'
import Stats from '@/components/Stats'
import Journey from '@/components/Journey'
import Values from '@/components/Values'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ScrollBar from '@/components/ScrollBar'

const Loader = dynamic(() => import('@/components/Loader'), { ssr: false })

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Loader />
      <ScrollBar />
      <Nav />
      <main id="top">
        <Hero />
        <MarqueeSection />
        <Philosophy />
        <ThinkTogether />
        <Projects />
        <Iceberg />
        <HowIWork />
        <Stats />
        <Journey />
        <Values />
        <CTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
