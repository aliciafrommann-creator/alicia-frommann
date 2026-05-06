import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Instrument_Serif } from 'next/font/google'
import './globals.css'

const geist = localFont({
  src: '../node_modules/geist/dist/fonts/geist-sans/GeistVariableVF.woff2',
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = localFont({
  src: '../node_modules/geist/dist/fonts/geist-mono/GeistMonoVariableVF.woff2',
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
  title: 'Alicia Frommann — Systems thinking, in motion.',
  description:
    'Founder of ThinkTogether. MSc Digital Business & Sustainable Innovation. Building tools that help teams see the systems they're inside of.',
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
