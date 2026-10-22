import { SITE_NAME } from '@/lib/site'

const WHATSAPP_NUMBER = '5517991446829'

export const contact = {
  name: SITE_NAME,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappLink: `https://wa.me/${WHATSAPP_NUMBER}`,
} as const
