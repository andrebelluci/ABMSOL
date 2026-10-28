import { reportWhatsAppClick } from '@/lib/analytics'
import { contact } from '@/lib/contact'

export const WHATSAPP_MESSAGES = {
  site: 'Olá, vim pelo site da ABMSOL e quero conversar.',
  sites: 'Olá, vim pelo site e quero uma proposta de sites e sistemas.',
  suporte: 'Olá, vim pelo site e quero uma proposta de suporte de TI.',
  institucional: 'Olá, vim pelo site e quero uma proposta de Institucional.',
  plano: 'Quero saber do plano mensal.',
  diagnostico: 'Quero um diagnóstico gratuito do meu site / da minha TI.',
} as const

export function whatsappHref(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function trackWhatsAppClick(source: string, service?: string) {
  reportWhatsAppClick(source, service)
}
