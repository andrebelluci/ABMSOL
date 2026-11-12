/** Textos da página Sobre. Nome, foto, manifesto e trajetória ficam vazios até o André enviar. */

export const behindPage = {
  title: 'Por trás da tecnologia.',
  line: 'Tecnologia não é apenas sobre o que construímos. É sobre os problemas que somos capazes de resolver.',
  manifestoTitle: 'Mais do que desenvolver soluções, acredito em construir tecnologia que faça sentido.',
  close: 'Vamos construir algo que faça sentido?',
} as const

export const behindName: string | null = null
export const behindRole: string | null = null
export const behindManifesto: string | null = null

export const behindTimeline: readonly { period: string; title: string; body: string }[] = []

export const behindPrinciples = [
  {
    title: 'Qualidade técnica',
    body: 'O que entra no ar é o que foi combinado, conferido antes da entrega.',
  },
  {
    title: 'Transparência',
    body: 'O caminho fica por escrito. A proposta segue na conversa.',
  },
  {
    title: 'Solução sob medida',
    body: 'Site, sistema ou suporte, no tamanho do problema.',
  },
  {
    title: 'Relação longa',
    body: 'O plano mensal continua depois da entrega.',
  },
] as const
