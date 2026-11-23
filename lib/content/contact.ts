import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const contactPage = {
  title: 'Diga o que você precisa.',
  lead: 'Escolha o assunto e, se quiser, escreva o contexto. A mensagem abre no WhatsApp. Não há formulário neste site.',
  contextLabel: 'Contexto',
  contextHint: 'Opcional. Algumas linhas sobre o site, a presença ou o suporte.',
  send: 'Abrir no WhatsApp',
} as const

export const contactOptions = [
  {
    id: 'presenca',
    label: 'Presença no Google e nas IAs',
    message: WHATSAPP_MESSAGES.presenca,
  },
  {
    id: 'site',
    label: 'Site',
    message: WHATSAPP_MESSAGES.sites,
  },
  {
    id: 'sistemas',
    label: 'Sistemas',
    message: WHATSAPP_MESSAGES.sistemas,
  },
  {
    id: 'suporte',
    label: 'Suporte de TI',
    message: WHATSAPP_MESSAGES.suporte,
  },
  {
    id: 'plano',
    label: 'Plano mensal',
    message: WHATSAPP_MESSAGES.plano,
  },
  {
    id: 'instagram',
    label: 'Instagram (básico)',
    message: WHATSAPP_MESSAGES.instagram,
  },
  {
    id: 'diagnostico',
    label: 'Diagnóstico gratuito',
    message: WHATSAPP_MESSAGES.diagnostico,
  },
] as const
