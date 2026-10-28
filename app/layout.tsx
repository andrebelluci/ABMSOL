import type { Metadata } from 'next'
import { Instrument_Sans, JetBrains_Mono, Syne } from 'next/font/google'
import Script from 'next/script'
import { AppShell } from '@/components/layout/AppShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { UMAMI_SRC, UMAMI_WEBSITE_ID, umamiEnabled } from '@/lib/analytics'
import { createMetadata } from '@/lib/seo'
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

export const metadata: Metadata = createMetadata({
  title: 'Site profissional e suporte de TI em Rio Preto | ABMSOL',
  description:
    'Sites premium, sistemas sob medida e suporte de TI com um parceiro só. Sediados em Rio Preto (SP), com atendimento online em todo o Brasil. Contato no WhatsApp.',
  path: '/',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${syne.variable} ${instrument.variable} ${mono.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <JsonLd />
        {umamiEnabled() ? (
          <Script src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} strategy="afterInteractive" />
        ) : null}
        <SmoothScroll>
          <AppShell>{children}</AppShell>
        </SmoothScroll>
      </body>
    </html>
  )
}
