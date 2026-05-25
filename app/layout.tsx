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
  title: 'Alicia Frommann — Gründerszene Startup-Sommercamp 2025',
  description: 'I ship things. Two products live. Building Rippl in Berlin — a multiplayer game for real-world sustainable habits.',
  metadataBase: new URL('https://alicia-frommann.vercel.app'),
  openGraph: {
    title: 'Alicia Frommann — Gründerszene Startup-Sommercamp 2025',
    description: 'I ship things. Two products live. Building Rippl in Berlin — a multiplayer game for real-world sustainable habits.',
    url: 'https://alicia-frommann.vercel.app',
    siteName: 'Alicia Frommann',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alicia Frommann — Gründerszene Startup-Sommercamp 2025',
    description: 'I ship things. Two products live. Building Rippl in Berlin.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body>{children}</body>
    </html>
  )
}
