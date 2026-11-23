import { SITE_NAME } from '@/lib/site'

const WHATSAPP_NUMBER = '5517991446829'

export const contact = {
  name: SITE_NAME,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappLink: `https://wa.me/${WHATSAPP_NUMBER}`,
} as const

/** Canais públicos — handles como endereço, não como ícone de marca. */
export const socialChannels = [
  {
    id: 'ig',
    label: 'Instagram',
    handle: 'abmsol.tech',
    href: 'https://instagram.com/abmsol.tech',
  },
  {
    id: 'in',
    label: 'LinkedIn',
    handle: 'abmsol-tech',
    href: 'https://www.linkedin.com/company/abmsol-tech',
  },
  {
    id: 'fb',
    label: 'Facebook',
    handle: 'ABM Soluções',
    href: 'https://www.facebook.com/people/ABM-Solu%C3%A7%C3%B5es-Digitais/61580412104639/',
  },
] as const
