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
    'Alicia Frommann — founder of ThinkTogether, systems thinking consultant, and builder of tools that help teams align on complex problems and turn insight into action.',
  openGraph: {
    title: 'Alicia Frommann \u2014 Systems thinking, in motion.',
    description: 'Alicia Frommann — founder of ThinkTogether, systems thinking consultant, and builder of tools that help teams align on complex problems and turn insight into action.',
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
