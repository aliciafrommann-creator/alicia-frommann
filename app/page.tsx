import dynamic from 'next/dynamic'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Anschreiben from '@/components/Anschreiben'
import Application from '@/components/Application'
import { ApplicationPitch } from '@/components/ApplicationPitch'
import HowIWork from '@/components/HowIWork'
import Values from '@/components/Values'
import Journey from '@/components/Journey'
import Iceberg from '@/components/Iceberg'
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
        <Anschreiben />
        <Application />
        <ApplicationPitch />
        <HowIWork />
        <Values />
        <Journey />
        <Iceberg />
        <CTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
