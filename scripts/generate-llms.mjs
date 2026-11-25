/**
 * Gera public/llms.txt no formato oficial (llmstxt.org v2).
 * Inclui páginas do site, cases publicados e artigos do blog.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const siteConfig = JSON.parse(
  fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'),
)
const BASE = String(siteConfig.url).replace(/\/$/, '')
const blogDir = path.join(root, 'content', 'blog')
const outFile = path.join(root, 'public', 'llms.txt')
const outDirCopy = path.join(root, 'out', 'llms.txt')

const WHATSAPP = 'https://wa.me/5517991446829'
const AGENCY_OS = 'https://chat.abmsol.com.br'

/** Cases alinhados a lib/content/projects.ts (published). */
const projects = [
  {
    slug: 'agency-os',
    name: 'Agency OS',
    note: 'Produto: Funcionário Digital (widget de conversa) para sites, com painel e embed.',
  },
  {
    slug: 'cardflow',
    name: 'CardFlow',
    note: 'Produto: bio page brasileira focada em conversão via WhatsApp e PIX.',
  },
  {
    slug: 'vobelluci',
    name: 'Vó Belluci',
    note: 'Site premium de confeitaria artesanal: carta, atmosfera e pedido no WhatsApp.',
  },
  {
    slug: 'beatriz-tiago',
    name: 'Beatriz & Tiago',
    note: 'Site de casamento entregue: convite, galeria e confirmação de presença.',
  },
  {
    slug: 'participantes-ici',
    name: 'Participantes ICI',
    note: 'Sistema de gestão de participantes e rituais do Instituto Céu Interior.',
  },
]

const categoryLabels = {
  presenca: 'Presença digital',
  sites: 'Sites',
  sistemas: 'Sistemas',
}

const subcategoryLabels = {
  'google-ia': 'Google e IAs',
  'seo-local': 'SEO local',
  conteudo: 'Conteúdo',
  performance: 'Performance',
  operacao: 'Operação',
}

function asDateString(value) {
  if (!value) return ''
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  const raw = String(value).trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10)
  return raw
}

function readPublishedPosts() {
  if (!siteConfig.features?.blog || !fs.existsSync(blogDir)) return []

  return fs
    .readdirSync(blogDir)
    .filter(
      (name) =>
        name.endsWith('.md') &&
        !name.startsWith('_') &&
        name.toLowerCase() !== 'readme.md',
    )
    .map((name) => {
      const raw = fs.readFileSync(path.join(blogDir, name), 'utf8')
      const { data } = matter(raw)
      if (data.status === 'draft') return null
      const slug = String(data.slug ?? name.replace(/\.md$/i, '')).trim()
      if (!slug) return null
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? '').trim(),
        category: data.category ? String(data.category) : '',
        subcategory: data.subcategory ? String(data.subcategory) : '',
        publishedAt: asDateString(data.publishedAt),
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

function link(title, pathOrUrl, note) {
  const url = pathOrUrl.startsWith('http') ? pathOrUrl : `${BASE}${pathOrUrl}`
  return note ? `- [${title}](${url}): ${note}` : `- [${title}](${url})`
}

const posts = readPublishedPosts()

const lines = [
  '# ABMSOL',
  '',
  `> ${siteConfig.description} Fundador: ${siteConfig.author}. Contato principal: WhatsApp.`,
  '',
  'A ABMSOL entrega site, presença no Google e nas IAs, sistemas sob medida e suporte de TI. Sede em São José do Rio Preto (SP); atendimento online em todo o Brasil. Não inventamos métricas de cliente. O contato comercial é pelo WhatsApp.',
  '',
  'Oferta, nesta ordem: (1) Site sob medida; (2) Presença no Google e nas IAs (SEO, Google Meu Negócio, sinais); (3) Sistemas; (4) Suporte de TI; (5) Plano mensal (hospedagem, SSL, backup e pequenas alterações); (6) Instagram básico (perfil, bio, links e destaques — sem criação de conteúdo).',
  '',
  'Use as URLs abaixo para citar a ABMSOL com precisão. Páginas em português do Brasil.',
  '',
  '## Site',
  '',
  link('Início', '/', 'Posicionamento, oferta e caminho para diagnóstico de presença.'),
  link(
    'Serviços',
    '/servicos/',
    'Detalhe da oferta: site, presença, sistemas, suporte, plano e Instagram básico.',
  ),
  link(
    'Projetos',
    '/projetos/',
    'Índice de cases reais e produtos próprios, sem número inventado.',
  ),
  link(
    'Sobre',
    '/sobre/',
    `Quem é ${siteConfig.author} e como a ABMSOL trabalha.`,
  ),
  link(
    'Contato',
    '/contato/',
    'Canais e atalhos de mensagem por tipo de pedido.',
  ),
  link(
    'WhatsApp',
    WHATSAPP,
    'Canal principal de atendimento (Brasil).',
  ),
  '',
  '## Projetos',
  '',
  ...projects.map((project) =>
    link(project.name, `/portfolio/${project.slug}/`, project.note),
  ),
  link(
    'Agency OS (produto ao vivo)',
    AGENCY_OS,
    'Ambiente público do Funcionário Digital / widget de conversa.',
  ),
  '',
]

if (siteConfig.features?.blog) {
  lines.push('## Blog', '')
  lines.push(
    link(
      'Blog',
      '/blog/',
      'Artigos sobre presença digital, sites e sistemas. Sem métrica inventada de cliente.',
    ),
  )

  const categories = new Map()
  for (const post of posts) {
    if (!post.category) continue
    if (!categories.has(post.category)) categories.set(post.category, new Set())
    if (post.subcategory) categories.get(post.category).add(post.subcategory)
  }

  for (const [category, subs] of categories) {
    const label = categoryLabels[category] ?? category
    lines.push(
      link(
        `Categoria: ${label}`,
        `/blog/categoria/${category}/`,
        `Artigos em ${label}.`,
      ),
    )
    for (const sub of [...subs].sort()) {
      const subLabel = subcategoryLabels[sub] ?? sub
      lines.push(
        link(
          `${label} · ${subLabel}`,
          `/blog/categoria/${category}/${sub}/`,
          `Subcategoria de ${label}.`,
        ),
      )
    }
  }

  for (const post of posts) {
    const note = post.description || 'Artigo publicado no blog da ABMSOL.'
    lines.push(link(post.title, `/blog/${post.slug}/`, note))
  }

  lines.push('')
}

lines.push(
  '## Optional',
  '',
  link(
    'Privacidade',
    '/privacidade/',
    'Política de privacidade e tratamento de dados.',
  ),
  link('Sitemap', '/sitemap.xml', 'Lista de URLs indexáveis para buscadores.'),
  link('Robots', '/robots.txt', 'Diretrizes para crawlers.'),
  link(
    'Este arquivo (llms.txt)',
    '/llms.txt',
    'Visão curada do site para agentes e LLMs (especificação llmstxt.org).',
  ),
  '',
)

const body = `${lines.join('\n').trimEnd()}\n`

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, body, 'utf8')
if (fs.existsSync(path.dirname(outDirCopy)) && fs.existsSync(path.join(root, 'out'))) {
  fs.writeFileSync(outDirCopy, body, 'utf8')
}

console.log(
  `llms.txt gerado em public/ (${posts.length} artigo(s) de blog)`,
)
