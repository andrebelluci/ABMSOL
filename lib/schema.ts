import { BRAND } from '@/lib/brand'
import { SITE_URL } from '@/lib/site'

const OG_IMAGE = '/images/og-image.webp'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: BRAND.legalName ?? BRAND.name,
        description: BRAND.description,
        url: SITE_URL,
        telephone: BRAND.phone?.e164,
        email: BRAND.email,
        image: `${SITE_URL}${OG_IMAGE}`,
        sameAs: BRAND.social
          ? Object.values(BRAND.social).filter(Boolean)
          : undefined,
      },
    ],
  }
}

export function localBusinessSchema(types: string[] = ['LocalBusiness']) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': types,
        '@id': `${SITE_URL}/#business`,
        name: BRAND.legalName ?? BRAND.name,
        description: BRAND.description,
        url: SITE_URL,
        telephone: BRAND.phone?.e164,
        email: BRAND.email,
        image: `${SITE_URL}${OG_IMAGE}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BRAND.address?.street,
          addressLocality: BRAND.address?.city,
          addressRegion: BRAND.address?.state,
          postalCode: BRAND.address?.postalCode,
          addressCountry: BRAND.address?.country ?? 'BR',
        },
        openingHours: BRAND.hours?.label,
        areaServed: BRAND.seo?.areaServed,
        sameAs: BRAND.social
          ? Object.values(BRAND.social).filter(Boolean)
          : undefined,
      },
    ],
  }
}
