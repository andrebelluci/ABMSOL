import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import { AgencyOsWidget } from '@/components/AgencyOsWidget'
import { AppShell } from '@/components/layout/AppShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { UMAMI_SRC, UMAMI_WEBSITE_ID, umamiEnabled } from '@/lib/analytics'
import { createMetadata } from '@/lib/seo'
import './globals.css'

// Syne local (OFL): Google Fonts remove ss04; woff2 guarda o g fechado.
const syne = localFont({
  src: './fonts/Syne-latin.woff2',
  weight: '600 700',
  variable: '--font-syne',
  display: 'swap',
  adjustFontFallback: 'Arial',
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

export const metadata: Metadata = createMetadata({
  title: 'Apareça no Google e nas IAs | ABMSOL São José do Rio Preto',
  description:
    'Site, conteúdo e presença para sua empresa ser encontrada no Google Brasil e nas respostas de IA. Estúdio em São José do Rio Preto (SP), atendimento online no Brasil. Contato no WhatsApp.',
  path: '/',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${syne.variable} ${instrument.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Classe `js` no <html> antes da hidratação (CSS progressivo). suppressHydrationWarning acima cobre o mismatch. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <JsonLd />
        {umamiEnabled() ? (
          <Script src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} strategy="afterInteractive" />
        ) : null}
        <AgencyOsWidget />
        <SmoothScroll>
          <AppShell>{children}</AppShell>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
