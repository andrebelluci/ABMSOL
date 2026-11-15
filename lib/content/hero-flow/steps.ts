export const heroFlowUi = {
  openLabel: 'Descobrir meu caminho →',
  stepProfile: { index: '01', title: 'Quem é você?' },
  stepNeed: { index: '02', title: 'O que você mais precisa agora?' },
  resultEyebrow: '03 — Seu caminho',
  resultNote: 'Comece por um diagnóstico gratuito.',
  backLabel: 'Voltar',
  closeLabel: 'Fechar',
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
    body: 'Está antigo, lento ou difícil de usar.',
    wa: 'tenho um site, mas ele não está rendendo (antigo, lento ou difícil de usar)',
    headline: 'Dá para aproveitar o que existe e consertar o que trava.',
  },
  {
    id: 'negocio-solido',
    scene: 'shop',
    label: 'Meu negócio é sólido',
    body: 'Mas o site ficou parado.',
    wa: 'meu negócio já é consolidado, mas o site ficou parado',
    headline: 'Seu negócio já provou valor. Falta o site acompanhar.',
  },
] as const

export const needs = [
  {
    id: 'site',
    label: 'Um site que passe confiança',
    body: 'Para o cliente me levar a sério.',
    wa: 'um site que passe confiança',
    next: 'Próximo passo: um site que mostre o que você faz com o acabamento que merece.',
  },
  {
    id: 'sistema',
    label: 'Um sistema para minha rotina',
    body: 'Organizar processos e largar as planilhas.',
    wa: 'um sistema sob medida para organizar minha rotina',
    next: 'Próximo passo: entender sua rotina e desenhar o sistema em cima dela.',
  },
  {
    id: 'suporte',
    label: 'Suporte de TI',
    body: 'Sem dor de cabeça no dia a dia.',
    wa: 'suporte de TI',
    next: 'Próximo passo: ver o que trava hoje e montar um suporte que funcione.',
  },
  {
    id: 'nao-sei',
    label: 'Ainda não sei',
    body: 'Tudo bem, a gente descobre junto.',
    wa: 'ainda não sei, quero ajuda para descobrir',
    next: 'Próximo passo: um diagnóstico gratuito para achar o ponto certo de começar.',
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
