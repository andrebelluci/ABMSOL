import { localBusinessSchema, organizationSchema } from '@/lib/schema'
import { SITE_FEATURES } from '@/lib/site-features'

type JsonLdProps = {
  type?: 'LocalBusiness' | 'Organization'
  includeGeo?: boolean
}

/** Coordenadas aproximadas — substituir se INTAKE tiver lat/lng exatos */
const DEFAULT_GEO = {
  latitude: -20.8115,
  longitude: -49.3758,
}

export function JsonLd({
  type = SITE_FEATURES.localSeoStrong ? 'LocalBusiness' : 'Organization',
  includeGeo = SITE_FEATURES.localSeoStrong,
}: JsonLdProps) {
  const schema =
    type === 'LocalBusiness'
      ? localBusinessSchema(['LocalBusiness'])
      : organizationSchema()

  const payload =
    type === 'LocalBusiness' && includeGeo
      ? {
          ...schema,
          '@graph': schema['@graph'].map((node) => ({
            ...node,
            geo: {
              '@type': 'GeoCoordinates',
              latitude: DEFAULT_GEO.latitude,
              longitude: DEFAULT_GEO.longitude,
            },
          })),
        }
      : schema

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
