export const heroFlowUi = {
  openLabel: 'Quero aparecer →',
  stepProfile: { index: 'Passo 1 de 2', title: 'Quem é você?' },
  stepNeed: { index: 'Passo 2 de 2', title: 'Por onde começar?' },
  resultEyebrow: '03 · Seu caminho',
  resultNote:
    'Comece por um diagnóstico gratuito. Depois entram suporte, plano mensal e, se fizer sentido, uma ajuda básica no Instagram: perfil, bio, links e destaques, sem criação de conteúdo.',
  backLabel: '← Voltar',
  closeLabel: 'Voltar ao site',
  redoLabel: 'Refazer',
  whatsappResultLabel: 'Continuar no WhatsApp',
} as const

export const profiles = [
  {
    id: 'comecando',
    scene: 'seed',
    label: 'Estou começando',
    body: 'Ainda não tenho site.',
    wa: 'estou começando e ainda não tenho site',
    headline: 'Você começa do zero, e isso é vantagem: nada para desfazer.',
  },
  {
    id: 'site-fraco',
    scene: 'window',
    label: 'Tenho site, mas não rende',
    body: 'Existe, mas quase ninguém te acha no Google ou na IA.',
    wa: 'tenho um site, mas quase ninguém me acha no Google ou nas IAs',
    headline:
      'Dá para aproveitar o que existe e fazer o site e a presença trabalharem de novo.',
  },
  {
    id: 'negocio-solido',
    scene: 'shop',
    label: 'Meu negócio é sólido',
    body: 'Mas na busca e nas IAs o negócio quase não aparece.',
    wa: 'meu negócio já é consolidado, mas quase não apareço no Google nem nas IAs',
    headline:
      'Seu negócio já provou valor. Falta aparecer onde o cliente pergunta.',
  },
] as const

/**
 * Grade 2x2: prioriza Site e Presença; sistema em seguida; “ainda não sei” fecha.
 * Suporte e Instagram ficam no resultNote (fora do topo da oferta).
 */
export const needs = [
  {
    id: 'site',
    label: 'Um site',
    body: 'Novo ou reformado, feito para ser encontrado.',
    wa: 'um site (novo ou reformado)',
    next: 'Próximo passo: alinhar o site (estrutura, conteúdo e dados) para o Google e as IAs conseguirem te ler, sem promessa de ranking.',
  },
  {
    id: 'presenca',
    label: 'Aparecer no Google e nas IAs',
    body: 'SEO, Google Meu Negócio e sinais de presença.',
    wa: 'presença no Google (SEO e Meu Negócio) e nas respostas de IA',
    next: 'Próximo passo: um diagnóstico de presença. Site, busca local e sinais que as IAs olham.',
  },
  {
    id: 'sistema',
    label: 'Um sistema para minha rotina',
    body: 'Organizar processos e largar as planilhas.',
    wa: 'um sistema sob medida para organizar minha rotina',
    next: 'Próximo passo: entender sua rotina e desenhar o sistema em cima dela.',
  },
  {
    id: 'nao-sei',
    label: 'Ainda não sei',
    body: 'Tudo bem, a gente descobre junto.',
    wa: 'ainda não sei, quero ajuda para descobrir por onde começar',
    next: 'Próximo passo: um diagnóstico gratuito para achar o ponto certo. Em geral começamos por site e presença.',
  },
] as const

export type ProfileId = (typeof profiles)[number]['id']
export type NeedId = (typeof needs)[number]['id']

export function buildFlowMessage(profileId: ProfileId, needId: NeedId): string {
  const p = profiles.find((x) => x.id === profileId)!
  const n = needs.find((x) => x.id === needId)!
  return `Olá, vim pelo site da ABMSOL. Sobre mim: ${p.wa}. O que busco: ${n.wa}. Quero começar pelo diagnóstico gratuito.`
}

export function getProfile(profileId: ProfileId) {
  return profiles.find((item) => item.id === profileId)!
}

export function getNeed(needId: NeedId) {
  return needs.find((item) => item.id === needId)!
}
