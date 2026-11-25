import { site } from '@/lib/site'

const baseNav = [
  { href: '/servicos/', label: 'Serviços', index: '01' },
  { href: '/projetos/', label: 'Projetos', index: '02' },
  { href: '/#como-trabalhamos', label: 'Como trabalhamos', index: '03' },
  { href: '/sobre/', label: 'Sobre', index: '04' },
] as const

export const NAV_ITEMS = site.features?.blog
  ? ([
      ...baseNav,
      { href: '/blog/', label: 'Blog', index: '05' },
    ] as const)
  : baseNav

export const CONTACT_NAV_INDEX = site.features?.blog ? '06' : '05'
