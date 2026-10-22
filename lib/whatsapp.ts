import { contact } from '@/lib/contact'

/** Mensagem padrão; CTAs contextuais (por serviço/seção) entram na fase 04. */
export function buildWhatsAppMessage(topic?: string): string {
  const trimmed = topic?.trim()
  if (trimmed) {
    return `Olá, vim pelo site e quero uma proposta de ${trimmed}.`
  }
  return 'Olá, vim pelo site e gostaria de mais informações.'
}

export function buildWhatsAppUrl(topic?: string): string {
  return `${contact.whatsappLink}?text=${encodeURIComponent(buildWhatsAppMessage(topic))}`
}
