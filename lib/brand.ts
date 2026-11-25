import { contact } from '@/lib/contact'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  site,
} from '@/lib/site'

/**
 * Dados de marca derivados de `site.config.json` e `lib/contact.ts`.
 * Campos vazios são PENDENTES (ver docs/INTAKE.md) — nunca preencher com dado inventado.
 */
export const BRAND = {
  name: SITE_NAME,
  legalName: SITE_NAME,
  tagline: SITE_TAGLINE,
  description: SITE_DESCRIPTION,
  address: {
    street: '',
    district: '',
    city: site.city ?? '',
    state: site.state ?? '',
    postalCode: '',
    country: 'BR',
    formatted: `${site.city ?? ''} - ${site.state ?? ''}`,
  },
  phone: {
    display: '(17) 99144-6829',
    e164: `+${contact.whatsappNumber}`,
    whatsapp: contact.whatsappNumber,
  },
  /** PENDENTE: e-mail de contato (INTAKE, bloqueios). */
  email: '',
  hours: {
    label: '',
  },
  social: {
    instagram: '',
    facebook: '',
  },
  seo: {
    areaServed: 'São José do Rio Preto (SP) e Brasil (online)',
  },
  url: SITE_URL,
} as const

export type Brand = typeof BRAND
