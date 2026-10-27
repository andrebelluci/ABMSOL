import { contact } from '@/lib/contact'

export const WHATSAPP_MESSAGES = {
  site: 'Olá, vim pelo site da ABMSOL e quero conversar.',
  institucional: 'Olá, vim pelo site e quero uma proposta de Institucional.',
  plano: 'Quero saber do plano mensal.',
  diagnostico: 'Quero um diagnóstico gratuito do meu site / da minha TI.',
} as const

export function whatsappHref(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** Stub até a fase 06. O listener de analytics entra depois. */
export function trackWhatsAppClick(source: string, service?: string) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent('whatsapp_click', {
      detail: { source, service: service ?? null },
    }),
  )
}
