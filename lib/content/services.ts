import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const servicesSection = {
  index: '02',
  label: 'Serviços',
  title: 'Site, sistema ou suporte.',
  lead: 'Três grupos. O plano mensal fecha a lista e tem seção própria.',
} as const

export const services = [
  {
    id: 'sites',
    index: '01',
    title: 'Sites e sistemas',
    body: 'Sites e sistemas sob medida, com um parceiro só do começo à entrega.',
    cta: 'Pedir uma proposta',
    message: WHATSAPP_MESSAGES.sites,
    service: 'sites',
    align: 'start',
  },
  {
    id: 'suporte',
    index: '02',
    title: 'Suporte de TI',
    body: 'Suporte do dia a dia, em Rio Preto e online em todo o Brasil.',
    cta: 'Pedir uma proposta',
    message: WHATSAPP_MESSAGES.suporte,
    service: 'suporte',
    align: 'end',
  },
  {
    id: 'plano',
    index: '03',
    title: 'Plano mensal',
    body: 'Hospedagem, SSL, backup e pequenas alterações, ligados ao suporte.',
    cta: 'Ver o plano mensal',
    href: '#plano',
    align: 'start',
  },
] as const
