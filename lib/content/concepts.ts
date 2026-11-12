export const concepts = [
  {
    slug: 'atelier-norte',
    index: '01',
    kind: 'Site premium',
    name: 'Ateliê Norte',
    challenge: 'Um site em que o acabamento pesa tanto quanto o que está escrito.',
    approach: 'O tipo, o espaço e o caminho até a conversa ficam no mesmo desenho.',
    seoTitle: 'Ateliê Norte: site premium, projeto conceito | ABMSOL',
    seoDescription:
      'Projeto conceito de site premium. O acabamento pesa tanto quanto o texto. Não há cliente, depoimento, número de resultado nem marca de terceiro.',
  },
  {
    slug: 'casa-vertice',
    index: '02',
    kind: 'Site institucional',
    name: 'Casa Vértice',
    challenge: 'Poucas páginas, a informação no lugar e um caminho direto até a conversa.',
    approach: 'Cada página guarda uma função. O visitante chega na conversa sem desvio.',
    seoTitle: 'Casa Vértice: site institucional, projeto conceito | ABMSOL',
    seoDescription:
      'Projeto conceito de site institucional. Poucas páginas e um caminho direto até a conversa. Não há cliente, depoimento nem marca de terceiro.',
  },
  {
    slug: 'painel-serra',
    index: '03',
    kind: 'Sistema',
    name: 'Painel Serra',
    challenge: 'Um painel do dia a dia, com o estado de cada etapa à vista.',
    approach: 'O estado de cada etapa aparece no painel, sem número de resultado inventado.',
    seoTitle: 'Painel Serra: um sistema em projeto conceito | ABMSOL',
    seoDescription:
      'Projeto conceito de sistema. O estado de cada etapa fica à vista. Não há cliente, depoimento, número de resultado nem marca de terceiro nesta peça.',
  },
] as const

export type Concept = (typeof concepts)[number]

export function getConcept(slug: string) {
  return concepts.find((item) => item.slug === slug)
}

export const conceptsSection = {
  index: '03',
  label: 'Projetos',
  title: 'Três conceitos, nenhum cliente.',
  lead: 'Cada peça abaixo é um projeto conceito. Não é caso real e não usa marca de terceiro.',
} as const

export const conceptLabel = 'Projeto conceito'
