import type { Metadata } from 'next'
import { Cormorant, Syne } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alicia Frommann — Systems Thinker & Founder',
  description:
    'Founder of ThinkTogether. Systems thinker, MSc candidate at MCI Innsbruck. Building tools that help people see the system beneath the surface.',
  openGraph: {
    title: 'Alicia Frommann — Systems Thinker & Founder',
    description: 'Building tools and thinking that help people see the system beneath the surface.',
    url: 'https://alicia-frommann.vercel.app',
    siteName: 'Alicia Frommann',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  )
}
