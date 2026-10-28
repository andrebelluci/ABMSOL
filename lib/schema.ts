import { BRAND } from '@/lib/brand'
import { services } from '@/lib/content/services'
import { SITE_URL } from '@/lib/site'

const businessId = `${SITE_URL}/#business`
const ogImage = `${SITE_URL}/images/og-image.webp`

const areaServed = [
  {
    '@type': 'City',
    name: 'Rio Preto',
    containedInPlace: { '@type': 'AdministrativeArea', name: 'SP' },
  },
  { '@type': 'Country', name: 'Brasil' },
]

export function siteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': businessId,
        name: BRAND.name,
        description: BRAND.description,
        url: SITE_URL,
        image: ogImage,
        telephone: BRAND.phone.e164,
        address: {
          '@type': 'PostalAddress',
          addressLocality: BRAND.address.city,
          addressRegion: BRAND.address.state,
          addressCountry: 'BR',
        },
        areaServed,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: BRAND.name,
        url: SITE_URL,
        publisher: { '@id': businessId },
        inLanguage: 'pt-BR',
      },
      ...services.map((service) => ({
        '@type': 'Service',
        '@id': `${SITE_URL}/#servico-${service.id}`,
        name: service.title,
        description: service.body,
        url: `${SITE_URL}/servicos/`,
        provider: { '@id': businessId },
        areaServed,
      })),
    ],
  }
}
