import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const planSection = {
  index: '05',
  label: 'Plano mensal',
  title: 'O site continua no ar.',
  lead: 'Cuidado contínuo, ligado ao suporte. A proposta segue na conversa.',
  items: ['Hospedagem', 'SSL', 'Backup', 'Pequenas alterações'],
  cta: 'Quero saber do plano mensal',
  message: WHATSAPP_MESSAGES.plano,
} as const
