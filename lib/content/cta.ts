import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const finalCta = {
  index: '06',
  label: 'Conversa',
  title: 'Conte o que você precisa.',
  body: 'Se quiser, comece por um diagnóstico gratuito do seu site ou da sua TI.',
  cta: 'Pedir diagnóstico',
  message: WHATSAPP_MESSAGES.diagnostico,
} as const
