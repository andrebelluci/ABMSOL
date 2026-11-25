/**
 * Lê content/blog/*.md e grava lib/content/blog/generated-posts.json
 * para o export estático (sem depender de fs no generateStaticParams).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const blogDir = path.join(root, 'content', 'blog')
const outFile = path.join(root, 'lib', 'content', 'blog', 'generated-posts.ts')

const authors = new Set(['andre-belluci'])
const categories = {
  presenca: new Set(['google-ia', 'seo-local']),
  sites: new Set(['conteudo', 'performance']),
  sistemas: new Set(['operacao']),
}

function asDateString(value) {
  if (!value) return ''
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  const raw = String(value).trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10)
  const parsed = new Date(raw)
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10)
  return raw
}

function readingMinutes(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function parseSources(raw) {
  if (!Array.isArray(raw)) return []
  const sources = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const title = String(item.title ?? '').trim()
    const url = String(item.url ?? '').trim()
    if (!title || !url) continue
    sources.push({
      title,
      url,
      ...(item.date ? { date: String(item.date) } : {}),
    })
  }
  return sources
}

const posts = []

if (fs.existsSync(blogDir)) {
  const files = fs
    .readdirSync(blogDir)
    .filter(
      (name) =>
        name.endsWith('.md') &&
        !name.startsWith('_') &&
        name.toLowerCase() !== 'readme.md',
    )

  for (const name of files) {
    const filePath = path.join(blogDir, name)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const slug = String(data.slug ?? name.replace(/\.md$/i, '')).trim()
    const authorId = String(data.author ?? 'andre-belluci')
    const category = String(data.category ?? '').trim()
    const subcategory = data.subcategory
      ? String(data.subcategory).trim()
      : undefined

    if (!authors.has(authorId)) {
      console.warn(`[blog] autor inválido em ${name}: ${authorId}`)
      continue
    }
    if (!categories[category]) {
      console.warn(`[blog] categoria inválida em ${name}: ${category}`)
      continue
    }
    if (subcategory && !categories[category].has(subcategory)) {
      console.warn(`[blog] subcategoria inválida em ${name}: ${subcategory}`)
      continue
    }

    posts.push({
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ''),
      publishedAt: asDateString(data.publishedAt),
      updatedAt: data.updatedAt ? asDateString(data.updatedAt) : undefined,
      status: data.status === 'draft' ? 'draft' : 'published',
      category,
      subcategory,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      authorId,
      cover: String(data.cover ?? '/images/team/andre-belluci.jpg'),
      coverAlt: String(
        data.coverAlt ?? 'Retrato de André Belluci, fundador da ABMSOL',
      ),
      related: Array.isArray(data.related) ? data.related.map(String) : [],
      sources: parseSources(data.sources),
      body: content.trim(),
      readingMinutes: readingMinutes(content),
    })
  }
}

posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

fs.mkdirSync(path.dirname(outFile), { recursive: true })
const banner =
  '/* Gerado por scripts/generate-blog-index.mjs. Não edite à mão. */\n'
const body = `${banner}export const generatedPosts = ${JSON.stringify(posts, null, 2)} as const\n`
fs.writeFileSync(outFile, body, 'utf8')
// Remove JSON legado, se existir.
const legacyJson = path.join(root, 'lib', 'content', 'blog', 'generated-posts.json')
if (fs.existsSync(legacyJson)) fs.unlinkSync(legacyJson)
console.log(
  `blog index: ${posts.length} post(s) → lib/content/blog/generated-posts.ts`,
)
