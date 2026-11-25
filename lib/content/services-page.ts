import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const servicesPage = {
  label: 'Serviços',
  title: 'Site e presença primeiro.',
  lead: 'A conversa começa na busca e nas IAs. A ordem da oferta segue isso: site, presença no Google e nas IAs, depois sistemas, suporte e, por último, uma ajuda básica no Instagram.',
  thesisTitle: 'Por que isso importa',
  thesisLead:
    'No Google Brasil a resposta de IA já corta a frente do link azul. Quem pergunta no ChatGPT quase sempre passa por ali. Abaixo, o que os estudos mostram e como a oferta entra nessa conta.',
  offerTitle: 'O que entregamos',
  offerLead:
    'Seis itens, nesta ordem. O detalhe da proposta sai na conversa, sem preço nesta página.',
  localTitle: 'São José do Rio Preto e o restante do Brasil',
  localBody:
    'O suporte do dia a dia em São José do Rio Preto (SP) fica com a gente. Fora da cidade, o atendimento é online, em todo o Brasil.',
  cta: 'Quero um diagnóstico de presença',
  message: WHATSAPP_MESSAGES.presenca,
} as const

export const serviceDetails = [
  {
    id: 'site',
    index: '01',
    title: 'Site',
    body: 'Site sob medida, do primeiro alinhamento até a entrega. Estrutura, conteúdo e dados pensados para o Google e as IAs conseguirem te ler, sem promessa de ranking.',
    message: WHATSAPP_MESSAGES.sites,
    cta: 'Pedir uma proposta de site',
  },
  {
    id: 'presenca',
    index: '02',
    title: 'Presença no Google e nas IAs',
    body: 'SEO técnico e de conteúdo, Google Meu Negócio e sinais de presença para você aparecer na busca e nas respostas de IA. Diagnóstico primeiro, proposta depois.',
    message: WHATSAPP_MESSAGES.presenca,
    cta: 'Pedir diagnóstico de presença',
  },
  {
    id: 'sistemas',
    index: '03',
    title: 'Sistemas',
    body: 'Sistema sob medida para a rotina: cadastros, fluxos e painéis no lugar das planilhas soltas.',
    message: WHATSAPP_MESSAGES.sistemas,
    cta: 'Pedir uma proposta de sistema',
  },
  {
    id: 'suporte',
    index: '04',
    title: 'Suporte de TI',
    body: 'O suporte do dia a dia, para quem está em São José do Rio Preto e para quem chama de outro lugar. Máquina e operação estáveis.',
    message: WHATSAPP_MESSAGES.suporte,
    cta: 'Pedir uma proposta de suporte',
  },
  {
    id: 'plano',
    index: '05',
    title: 'Plano mensal',
    body: 'Hospedagem, SSL, backup e pequenas alterações, ligados ao suporte. O site envelhece na busca: o plano evita sumir de novo. O valor não entra nesta página.',
    message: WHATSAPP_MESSAGES.plano,
    cta: 'Quero saber do plano mensal',
  },
  {
    id: 'instagram',
    index: '06',
    title: 'Instagram (básico)',
    body: 'Padronização de perfil, bio, links e destaques. Sem criação de conteúdo, sem gestão de posts e sem feed sob demanda.',
    message: WHATSAPP_MESSAGES.instagram,
    cta: 'Pedir ajuda no Instagram',
  },
] as const
