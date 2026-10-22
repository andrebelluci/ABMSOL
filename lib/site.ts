import siteConfig from '@/site.config.json'

/** Nome, URL e slug vêm só de `site.config.json` — nunca gravar o nome em outro arquivo. */
export const site = siteConfig

export const SITE_NAME = site.name
export const SITE_TAGLINE = site.tagline ?? ''
export const SITE_DESCRIPTION = site.description ?? ''
export const SITE_URL = site.url
export const SITE_SLUG = site.slug
