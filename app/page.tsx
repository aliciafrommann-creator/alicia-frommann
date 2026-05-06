import dynamic from 'next/dynamic'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MarqueeSection from '@/components/MarqueeSection'
import Philosophy from '@/components/Philosophy'
import ThinkTogether from '@/components/ThinkTogether'

const Loader = dynamic(() => import('@/components/Loader'), { ssr: false })

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Loader />
      <Nav />
      <main id="top">
        <Hero />
        <MarqueeSection />
        <Philosophy />
        <ThinkTogether />
      </main>
    </SmoothScrollProvider>
  )
}
