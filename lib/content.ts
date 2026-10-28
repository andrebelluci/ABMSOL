import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { LegalSlug } from '@/lib/legal'

const contentRoot = path.join(process.cwd(), 'content')

export type MarkdownDocument = {
  slug: string
  title: string
  description?: string
  updatedAt?: string
  publishedAt?: string
  author?: string
  tags?: string[]
  body: string
}

function parseMarkdownFile(filePath: string, slug: string): MarkdownDocument {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: String(data.title ?? slug),
    description: data.description ? String(data.description) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    publishedAt: data.publishedAt ? String(data.publishedAt) : undefined,
    author: data.author ? String(data.author) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    body: content.trim(),
  }
}

export function getLegalDocument(slug: LegalSlug): MarkdownDocument {
  const filePath = path.join(contentRoot, 'legal', `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Legal document not found: ${slug}`)
  }
  return parseMarkdownFile(filePath, slug)
}

