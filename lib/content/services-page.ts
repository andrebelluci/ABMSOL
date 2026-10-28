import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const servicesPage = {
  title: 'Três grupos, sem preço no site.',
  lead: 'O detalhe de cada proposta sai na conversa. Aqui está o que cada grupo cobre.',
  localTitle: 'Rio Preto e o restante do Brasil',
  localBody:
    'O suporte do dia a dia em Rio Preto (SP) fica com a gente. Fora da cidade, o atendimento é online, em todo o Brasil.',
} as const

export const serviceDetails = [
  {
    id: 'sites',
    index: '01',
    title: 'Sites e sistemas',
    body: 'Site ou sistema sob medida, do primeiro alinhamento até a entrega, com o mesmo parceiro.',
    message: WHATSAPP_MESSAGES.sites,
    cta: 'Pedir uma proposta de sites e sistemas',
  },
  {
    id: 'suporte',
    index: '02',
    title: 'Suporte de TI',
    body: 'O suporte do dia a dia, para quem está em Rio Preto e para quem chama de outro lugar.',
    message: WHATSAPP_MESSAGES.suporte,
    cta: 'Pedir uma proposta de suporte',
  },
  {
    id: 'plano',
    index: '03',
    title: 'Plano mensal',
    body: 'Hospedagem, SSL, backup e pequenas alterações, ligados ao suporte. O valor não entra nesta página.',
    message: WHATSAPP_MESSAGES.plano,
    cta: 'Quero saber do plano mensal',
  },
] as const
