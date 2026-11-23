export type ProjectKind = 'Site' | 'Sistema' | 'Produto'

export type ProjectTestimonial = {
  quote: string
  attribution: string
}

export type Project = {
  slug: string
  index: string
  kind: ProjectKind
  name: string
  summary: string
  challenge: string
  solution: string
  year?: number
  tech?: readonly string[]
  cover?: string
  gallery?: readonly string[]
  liveUrl?: string
  testimonial?: ProjectTestimonial
  status: 'published' | 'draft'
  featured: boolean
  seoTitle: string
  seoDescription: string
}

/**
 * Catálogo de cases reais.
 * AllSucos fica draft até nome + logo novos.
 * Depoimentos só entram quando o texto for colado aqui.
 */
export const projects: readonly Project[] = [
  {
    slug: 'agency-os',
    index: '01',
    kind: 'Produto',
    name: 'Agency OS',
    summary: 'Funcionário Digital para sites: widget de conversa com painel e identidade próprios.',
    challenge:
      'Dar a cada negócio um assistente no site, com identidade, chave pública e painel, sem montar chatbot do zero.',
    solution:
      'Produto com um ambiente por negócio, embed no site (chat.abmsol.com.br), configuração por chave pública e tema alinhado ao site hospedeiro.',
    year: 2026,
    tech: ['Next.js', 'Supabase', 'Vercel'],
    cover: '/images/projects/agency-os/cover.webp',
    gallery: [
      '/images/projects/agency-os/cover.webp',
      '/images/projects/agency-os/gallery-01.webp',
    ],
    liveUrl: 'https://chat.abmsol.com.br',
    status: 'published',
    featured: true,
    seoTitle: 'Agency OS: Funcionário Digital no site | ABMSOL',
    seoDescription:
      'Produto próprio da ABMSOL: widget de conversa para sites, com painel e embed público.',
  },
  {
    slug: 'cardflow',
    index: '02',
    kind: 'Produto',
    name: 'CardFlow',
    summary: 'Bio page brasileira focada em conversão. Alternativa ao Linktree.',
    challenge:
      'Criadores e negócios pequenos precisam de uma página de links que venda pelo WhatsApp, sem depender de ferramenta gringa genérica.',
    solution:
      'SaaS freemium com editor visual, analytics de cliques e foco em PIX, WhatsApp e LGPD.',
    tech: ['PHP', 'Tailwind CSS', 'Supabase'],
    cover: '/images/projects/cardflow/cover.webp',
    gallery: [
      '/images/projects/cardflow/cover.webp',
      '/images/projects/cardflow/gallery-01.webp',
    ],
    // Deploy público ainda sem domínio estável (cardflow.vercel.app não é este produto).
    status: 'published',
    featured: true,
    seoTitle: 'CardFlow: bio page que vende | ABMSOL',
    seoDescription:
      'Produto próprio: plataforma de bio pages com editor visual e foco em conversão via WhatsApp.',
  },
  {
    slug: 'vobelluci',
    index: '03',
    kind: 'Site',
    name: 'Vó Belluci',
    summary: 'Site premium de confeitaria artesanal: carta, atmosfera e pedido pelo WhatsApp.',
    challenge:
      'Mostrar a confeitaria com acabamento de marca premium, sem parecer cardápio genérico.',
    solution:
      'Site editorial com hero forte, carta publicada e caminho direto para o WhatsApp.',
    year: 2026,
    tech: ['Next.js', 'GSAP'],
    cover: '/images/projects/vobelluci/cover.webp',
    gallery: [
      '/images/projects/vobelluci/cover.webp',
      '/images/projects/vobelluci/gallery-01.webp',
      '/images/projects/vobelluci/gallery-02.webp',
    ],
    // Domínio público instável no momento da captura; stills vêm do próprio projeto.
    status: 'published',
    featured: true,
    seoTitle: 'Vó Belluci: site premium de confeitaria | ABMSOL',
    seoDescription:
      'Site premium para confeitaria artesanal: apresentação editorial, carta e conversa no WhatsApp.',
  },
  {
    slug: 'beatriz-tiago',
    index: '04',
    kind: 'Site',
    name: 'Beatriz & Tiago',
    summary: 'Site de casamento entregue: convite, confirmação e memória do dia.',
    challenge:
      'O casal precisava de um convite digital completo, com presença visual e caminho claro para os convidados.',
    solution:
      'Landing de casamento com hero em vídeo/loop, galeria, mapa e confirmação de presença.',
    year: 2026,
    tech: ['Next.js'],
    cover: '/images/projects/beatriz-tiago/cover.webp',
    gallery: [
      '/images/projects/beatriz-tiago/cover.webp',
      '/images/projects/beatriz-tiago/gallery-01.webp',
      '/images/projects/beatriz-tiago/gallery-02.webp',
    ],
    liveUrl: 'https://beatrizetiago.vercel.app',
    status: 'published',
    featured: true,
    seoTitle: 'Beatriz & Tiago: site de casamento | ABMSOL',
    seoDescription:
      'Site de casamento entregue: convite digital, galeria e confirmação de presença.',
  },
  {
    slug: 'participantes-ici',
    index: '05',
    kind: 'Sistema',
    name: 'Participantes ICI',
    summary: 'Sistema de gestão de participantes e rituais do Instituto Céu Interior.',
    challenge:
      'Organizar cadastros, rituais e presença num fluxo do dia a dia, com acesso controlado.',
    solution:
      'Aplicação web com cadastro de participantes, gestão de rituais, inscrições e recuperação de senha.',
    tech: ['PHP', 'Tailwind CSS'],
    cover: '/images/projects/participantes-ici/cover.webp',
    gallery: [
      '/images/projects/participantes-ici/cover.webp',
      '/images/projects/participantes-ici/gallery-01.webp',
      '/images/projects/participantes-ici/gallery-02.webp',
    ],
    // Sistema com login — sem link público de browse.
    status: 'published',
    featured: false,
    seoTitle: 'Participantes ICI: sistema de gestão | ABMSOL',
    seoDescription:
      'Sistema entregue para gestão de participantes e rituais do Instituto Céu Interior.',
  },
  {
    slug: 'allsucos-conceito',
    index: '06',
    kind: 'Site',
    name: 'Projeto sucos (rascunho)',
    summary: 'Site de marca de sucos. Aguarda novo nome e logo antes de publicar.',
    challenge:
      'Peça de vitrine para e-commerce de sucos; a marca original não seguiu. Rebrand pendente.',
    solution:
      'Base de site Next.js com catálogo e atmosfera de marca. Entra na vitrine só após nome e logo novos.',
    cover: '/images/projects/allsucos-conceito/cover.webp',
    status: 'draft',
    featured: false,
    seoTitle: 'Projeto sucos (rascunho) | ABMSOL',
    seoDescription: 'Case em rascunho até o rebrand de nome e logo.',
  },
] as const

export function publishedProjects() {
  return projects.filter((item) => item.status === 'published')
}

export function featuredProjects() {
  return publishedProjects().filter((item) => item.featured)
}

export function getProject(slug: string) {
  return projects.find((item) => item.slug === slug)
}

export function getPublishedProject(slug: string) {
  const project = getProject(slug)
  if (!project || project.status !== 'published') return undefined
  return project
}

export function adjacentProjects(slug: string) {
  const list = publishedProjects()
  const index = list.findIndex((item) => item.slug === slug)
  if (index < 0) return { prev: undefined, next: undefined }
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  }
}

export const projectsSection = {
  index: '04',
  label: 'Projetos',
  title: 'Trabalho entregue, produto no ar.',
  lead: 'Sites, sistemas e produtos próprios. Cada peça abaixo é case real, sem número inventado.',
} as const

export const projectCaseLabel = 'Case'
