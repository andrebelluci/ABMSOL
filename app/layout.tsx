import type { Metadata } from 'next'
import { Instrument_Sans, JetBrains_Mono, Syne } from 'next/font/google'
import { AppShell } from '@/components/layout/AppShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { createMetadata } from '@/lib/seo'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/site'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-syne',
  display: 'swap',
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-instrument',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
})

const baseMetadata = createMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: '/',
})

export const metadata: Metadata = {
  ...baseMetadata,
  // noindex em *.vercel.app até o domínio final (D7). Remover na fase 06/07.
  robots: { index: false, follow: false },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${syne.variable} ${instrument.variable} ${mono.variable}`}>
      <body>
        <JsonLd />
        <SmoothScroll>
          <AppShell>{children}</AppShell>
        </SmoothScroll>
      </body>
    </html>
  )
}
