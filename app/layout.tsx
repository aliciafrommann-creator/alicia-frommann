import type { Metadata } from 'next'
import { Instrument_Serif } from 'next/font/google'
import 'leaflet/dist/leaflet.css'
import './globals.css'
import { SmoothScroll } from './components/SmoothScroll'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alicia Frommann — Gründerszene Startup-Sommercamp 2025',
  description: 'Founder. Builder. MSc Candidate. Applying to build Participation OS in Berlin — AI-native infrastructure for real-world human coordination.',
  metadataBase: new URL('https://alicia-frommann.vercel.app'),
  openGraph: {
    title: 'Alicia Frommann — Gründerszene Startup-Sommercamp 2025',
    description: 'Founder. Builder. Applying to build Participation OS in Berlin.',
    url: 'https://alicia-frommann.vercel.app',
    siteName: 'Alicia Frommann',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alicia Frommann — Gründerszene Startup-Sommercamp 2025',
    description: 'Founder. Builder. Applying to build Participation OS in Berlin.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
