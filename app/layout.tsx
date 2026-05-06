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
  title: 'Alicia Frommann — Systems thinking, in motion.',
  description:
    'Founder of ThinkTogether. MSc Digital Business & Sustainable Innovation. Building tools that help teams see the systems they\'re inside of.',
  openGraph: {
    title: 'Alicia Frommann — Systems thinking, in motion.',
    description: 'Founder of ThinkTogether. MSc candidate at MCI Innsbruck.',
    siteName: 'Alicia Frommann',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body>{children}</body>
    </html>
  )
}
