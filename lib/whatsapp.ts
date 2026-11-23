import { reportWhatsAppClick } from '@/lib/analytics'
import { contact } from '@/lib/contact'

export const WHATSAPP_MESSAGES = {
  site: 'Olá, vim pelo site da ABMSOL e quero conversar.',
  sites: 'Olá, vim pelo site e quero uma proposta de site.',
  sistemas: 'Olá, vim pelo site e quero uma proposta de sistema.',
  suporte: 'Olá, vim pelo site e quero uma proposta de suporte de TI.',
  institucional: 'Olá, vim pelo site e quero uma proposta de Institucional.',
  plano: 'Quero saber do plano mensal.',
  diagnostico: 'Quero um diagnóstico gratuito do meu site / da minha TI.',
  presenca:
    'Olá, vim pelo site da ABMSOL. Quero presença no Google (SEO e Google Meu Negócio) e nas respostas de IA. Podemos começar por um diagnóstico?',
  instagram:
    'Olá, vim pelo site da ABMSOL. Quero ajuda básica no Instagram: perfil, bio, links e destaques (sem criação de conteúdo).',
} as const

export function whatsappHref(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function trackWhatsAppClick(source: string, service?: string) {
  reportWhatsAppClick(source, service)
}
