import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export { SITE_NAME, SITE_URL }

export const DEFAULT_OG = '/images/og-image.webp'

/**
 * `NEXT_PUBLIC_NOINDEX=0` libera a indexação no domínio final (fase 07).
 * Sem a variável, o export fica noindex — o host da Vercel não existe em runtime.
 */
export function isNoindex() {
  return process.env.NEXT_PUBLIC_NOINDEX !== '0'
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
