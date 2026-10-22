export const LEGAL_ROUTES = {
  terms: '/termos-de-uso',
  privacy: '/politica-de-privacidade',
} as const

export const BLOG_ROUTE = '/blog'

export const LEGAL_PAGES = [
  {
    slug: 'termos-de-uso',
    path: LEGAL_ROUTES.terms,
    title: 'Termos de Uso',
  },
  {
    slug: 'politica-de-privacidade',
    path: LEGAL_ROUTES.privacy,
    title: 'Política de Privacidade',
  },
] as const

export type LegalSlug = (typeof LEGAL_PAGES)[number]['slug']
