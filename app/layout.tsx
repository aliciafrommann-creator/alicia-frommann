import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alicia Frommann \u2014 Systems thinking, in motion.',
  description:
    'Founder of ThinkTogether. MSc Digital Business & Sustainable Innovation. Building tools that help teams see the systems they are inside of.',
  openGraph: {
    title: 'Alicia Frommann \u2014 Systems thinking, in motion.',
    description: 'Founder of ThinkTogether. MSc candidate at MCI Innsbruck.',
    siteName: 'Alicia Frommann',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
