import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const visibilitySection = {
  index: '02',
  label: 'Presença',
  title: 'O cliente pergunta. Você some na resposta.',
  lead: 'Em buscas medidas no Google Brasil, a resposta de IA já aparece antes do primeiro site. Cada estudo abaixo mede uma amostra diferente; veja o que eles mostram e o que dá para melhorar.',
  cta: 'Quero aparecer nas buscas',
  message: WHATSAPP_MESSAGES.presenca,
} as const

/**
 * Fatos de mercado com fonte. Não são resultados de clientes ABMSOL.
 * Prioriza estudos e reportagens no Brasil; um fato internacional ancora a tendência global.
 */
export const visibilityFacts = [
  {
    id: 'br-serps',
    value: '4%',
    label:
      'das buscas medidas no Google Brasil abriram com o link azul em primeiro. Nas demais, AI Overview e outros blocos do próprio Google vieram antes.',
    scope:
      '500 buscas em 5 setores (saúde, finanças, varejo, educação e turismo), no desktop. Na coleta de jul. 2026 foram 3%.',
    source: 'SEONextbr (plataforma de SEO/GEO) e Oxigenweb',
    date: 'nov. 2026',
    sourceUrl: 'https://www.seonextbr.com.br/blog/estudo/zero-click-no-google-brasil/',
  },
  {
    id: 'br-aio',
    value: '87%',
    label:
      'dessas mesmas buscas mostraram um AI Overview antes do primeiro resultado orgânico.',
    scope: 'Mesma amostra: 500 buscas em 5 setores, no desktop.',
    source: 'SEONextbr (plataforma de SEO/GEO) e Oxigenweb',
    date: 'jul. 2026',
    sourceUrl: 'https://www.seonextbr.com.br/blog/estudo/zero-click-no-google-brasil/',
  },
  {
    id: 'br-chatgpt',
    value: '99%',
    label:
      'do tráfego de IA generativa no Brasil passava pelo ChatGPT em ago. 2025. É um retrato de mais de um ano atrás, e o mercado muda rápido.',
    scope:
      'Participação no tráfego de sites de IA generativa, medida pela Similarweb em levantamento da Cadastra.',
    source: 'Cadastra / Similarweb, via Mobile Time',
    date: 'ago. 2025',
    sourceUrl: 'https://www.mobiletime.com.br/noticias/13/11/2025/chatgpt-99-market-share-br/',
  },
  {
    id: 'global-niche',
    value: '11%',
    label:
      'foi a visibilidade de marcas pequenas ou de nicho em respostas de IA a perguntas sem o nome da marca, contra 73% das marcas globais mais conhecidas.',
    scope:
      'Estudo de um fornecedor de GEO (Ranqo): mais de 100 marcas monitoradas na própria plataforma, 5 mecanismos de IA, mar. a mai. 2026. Dados observacionais, publicados como preprint.',
    source: 'Ranqo (arXiv)',
    date: 'jun. 2026',
    sourceUrl: 'https://arxiv.org/abs/2606.20065',
  },
] as const

export const visibilityLevers = [
  {
    id: 'site',
    title: 'Site legível',
    body: 'Performance, estrutura e dados que o Google e as IAs conseguem interpretar.',
  },
  {
    id: 'conteudo',
    title: 'Conteúdo útil',
    body: 'Texto autoral e claro. Sem texto genérico que ninguém cita.',
  },
  {
    id: 'presenca',
    title: 'Google Meu Negócio e sinais',
    body: 'Perfil local alinhado e listagens consistentes. As IAs também olham para fora do seu domínio.',
  },
  {
    id: 'cuidado',
    title: 'Cuidado contínuo',
    body: 'O site envelhece na busca. Plano mensal para não sumir de novo.',
  },
] as const
