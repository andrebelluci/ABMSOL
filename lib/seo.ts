import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export { SITE_NAME, SITE_URL }

export const DEFAULT_OG = '/images/og-image.webp'

/**
 * O domínio final indexa. `NEXT_PUBLIC_NOINDEX=1` esconde de novo.
 * O export estático não distingue abmsol.com.br de abmsol.vercel.app;
 * o canônico é sempre a URL de site.config.json.
 */
export function isNoindex() {
  return process.env.NEXT_PUBLIC_NOINDEX === '1'
}

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  ogImage?: string
}

export function createMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
  const noindex = isNoindex()

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
