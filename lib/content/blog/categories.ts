/**
 * Taxonomia do blog. No artigo, use os `slug` abaixo em category / subcategory.
 * Novas categorias entram aqui; o restante (listas, breadcrumbs, filtros) segue sozinho.
 */
export const blogCategories = [
  {
    slug: 'presenca',
    label: 'Presença digital',
    description:
      'Aparecer no Google, nas IAs e nos sinais locais que o cliente já consulta.',
    subcategories: [
      {
        slug: 'google-ia',
        label: 'Google e IAs',
        description: 'Busca, AI Overview, ChatGPT e visibilidade sem o nome da marca.',
      },
      {
        slug: 'seo-local',
        label: 'SEO local',
        description: 'Google Meu Negócio, São José do Rio Preto e sinais de presença na cidade.',
      },
    ],
  },
  {
    slug: 'sites',
    label: 'Sites',
    description: 'Estrutura, conteúdo e performance para o site ser legível de verdade.',
    subcategories: [
      {
        slug: 'conteudo',
        label: 'Conteúdo',
        description: 'Texto útil, claro e citável, sem genérico.',
      },
      {
        slug: 'performance',
        label: 'Performance',
        description: 'Velocidade, export estático e o básico que a busca também mede.',
      },
    ],
  },
  {
    slug: 'sistemas',
    label: 'Sistemas',
    description: 'Rotina, processo e o que tira o negócio da planilha.',
    subcategories: [
      {
        slug: 'operacao',
        label: 'Operação',
        description: 'Fluxos do dia a dia e sistemas sob medida.',
      },
    ],
  },
] as const

export type BlogCategorySlug = (typeof blogCategories)[number]['slug']

export function getBlogCategory(slug: string) {
  return blogCategories.find((item) => item.slug === slug)
}

export function getBlogSubcategory(categorySlug: string, subcategorySlug: string) {
  const category = getBlogCategory(categorySlug)
  return category?.subcategories.find((item) => item.slug === subcategorySlug)
}
