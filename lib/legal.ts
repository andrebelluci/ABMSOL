export const LEGAL_PAGES = [
  {
    slug: 'politica-de-privacidade',
    path: '/privacidade/',
    title: 'Privacidade',
  },
] as const

export type LegalSlug = (typeof LEGAL_PAGES)[number]['slug']
