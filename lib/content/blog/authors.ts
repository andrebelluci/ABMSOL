/**
 * Autores do blog. No frontmatter do artigo use `author: andre-belluci`.
 */
export const blogAuthors = {
  'andre-belluci': {
    id: 'andre-belluci',
    name: 'André Belluci',
    role: 'Fundador da ABMSOL · qualidade, suporte e desenvolvimento',
    photo: '/images/team/andre-belluci.jpg',
    photoAlt: 'Retrato de André Belluci, fundador da ABMSOL',
    bio: 'Constrói sites, sistemas e suporte em São José do Rio Preto (SP), com atendimento online no Brasil.',
  },
} as const

export type BlogAuthorId = keyof typeof blogAuthors

export function getBlogAuthor(id: string) {
  return blogAuthors[id as BlogAuthorId]
}
