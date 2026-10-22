declare module '@/site.config.json' {
  interface SiteFeatures {
    blog?: boolean
    localSeoStrong?: boolean
  }

  interface SiteConfig {
    /** Única fonte do nome da marca (nome ainda em verificação INPI/domínio). */
    name: string
    tagline?: string
    description?: string
    slug: string
    url: string
    author?: string
    features?: SiteFeatures
    city?: string
    state?: string
    instagram?: string
  }

  const config: SiteConfig
  export default config
}
