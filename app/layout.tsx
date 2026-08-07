import ScrollToTopButton from '@/components/portfolio/ScrollToTopButton'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'birri — Bui Doan Quang Huy',
  description:
    'A beginner software engineer from Vietnam. 15 years old, building things with Java, Kotlin, C++, TypeScript and more.',
  generator: 'v0.app',
  keywords: ['birri', 'Bui Doan Quang Huy', 'software engineer', 'portfolio', 'Vietnam', 'Minecraft plugins', 'developer'],
  authors: [{ name: 'Bui Doan Quang Huy', url: 'https://github.com/callmebirri' }],
  creator: 'Bui Doan Quang Huy',
  openGraph: {
    title: 'birri — Bui Doan Quang Huy',
    description: 'A beginner software engineer from Vietnam :3',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'birri — Bui Doan Quang Huy',
    description: 'A beginner software engineer from Vietnam :3',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF2F6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} bg-background`}
      style={{ colorScheme: 'light' }}
    >
      <body className="antialiased font-sans text-foreground">
        {children}
        <ScrollToTopButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}

