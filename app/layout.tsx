import type { Metadata } from 'next'
import { Instrument_Serif } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alicia Frommann — Application, Gründerszene Startup-Sommercamp 2025',
  description: 'Systems thinker. Two products live. Building a gamified sustainability platform in Berlin — 10 weeks, full focus.',
  metadataBase: new URL('https://alicia-frommann.vercel.app'),
  openGraph: {
    title: 'Alicia Frommann — Gründerszene Startup-Sommercamp 2025',
    description: 'Systems thinker. Two products live. Building a gamified sustainability platform in Berlin — 10 weeks, full focus.',
    url: 'https://alicia-frommann.vercel.app',
    siteName: 'Alicia Frommann',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alicia Frommann — Gründerszene Startup-Sommercamp 2025',
    description: 'Systems thinker. Two products live. Building a gamified sustainability platform in Berlin.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body>{children}</body>
    </html>
  )
}
