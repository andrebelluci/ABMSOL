import { site } from '@/lib/site'

export type SiteFeatures = {
  blog: boolean
  localSeoStrong: boolean
}

const DEFAULT_FEATURES: SiteFeatures = {
  blog: false,
  localSeoStrong: false,
}

export const SITE_FEATURES: SiteFeatures = {
  ...DEFAULT_FEATURES,
  ...('features' in site && site.features ? site.features : {}),
}
