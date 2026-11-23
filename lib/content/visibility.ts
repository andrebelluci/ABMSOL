import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const visibilitySection = {
  index: '02',
  label: 'Presença',
  title: 'O cliente pergunta. Você some na resposta.',
  lead: 'No Google Brasil a resposta de IA já corta a frente do seu site. Fora do país a mesma lógica se espalhou: a pessoa pergunta e muitas vezes não clica em ninguém. Abaixo, o que os estudos mostram e o que dá para melhorar.',
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
    value: '3%',
    label:
      'das páginas de resultado no Google Brasil ainda abrem com o link azul em primeiro. No restante, AI Overview e outros blocos do Google vêm na frente.',
    source: 'SEONextbr / Oxigenweb (jul. 2026)',
    sourceUrl: 'https://www.seonextbr.com.br/blog/estudo/zero-click-no-google-brasil/',
  },
  {
    id: 'br-aio',
    value: '87%',
    label:
      'das buscas analisadas no mesmo estudo tinham AI Overview antes do primeiro resultado orgânico.',
    source: 'SEONextbr / Oxigenweb (jul. 2026)',
    sourceUrl: 'https://www.seonextbr.com.br/blog/estudo/zero-click-no-google-brasil/',
  },
  {
    id: 'br-chatgpt',
    value: '99%',
    label:
      'de participação do ChatGPT entre as IAs generativas no Brasil (ago. 2025). Quem pergunta por IA, no país, quase sempre passa por ali.',
    source: 'Cadastra / Similarweb via Mobile Time',
    sourceUrl:
      'https://www.mobiletime.com.br/noticias/13/11/2025/chatgpt-99-market-share-br/',
  },
  {
    id: 'global-niche',
    value: '11%',
    label:
      'de visibilidade em perguntas sem o nome da marca, para negócios de nicho, contra cerca de 73% das marcas grandes. Fora do Brasil a descoberta por IA já é desigual.',
    source: 'TRAIL Labs / Ranqo (102 marcas, 5 engines)',
    sourceUrl: 'https://www.traillabs.ai/en/blog/geo-at-scale-brand-visibility',
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
