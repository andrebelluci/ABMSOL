import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { AppShell } from '@/components/layout/AppShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { createMetadata } from '@/lib/seo'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/site'
import './globals.css'

// Fontes provisórias do scaffold — substituídas na fase 01 (Syne + Instrument Sans + JetBrains Mono).
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
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
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <JsonLd />
        <SmoothScroll>
          <AppShell>{children}</AppShell>
        </SmoothScroll>
      </body>
    </html>
  )
}
