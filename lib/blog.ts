import {
  getBlogAuthor,
  type BlogAuthorId,
  blogAuthors,
} from '@/lib/content/blog/authors'
import { generatedPosts } from '@/lib/content/blog/generated-posts'
import {
  blogCategories,
  getBlogCategory,
  getBlogSubcategory,
} from '@/lib/content/blog/categories'
import { site } from '@/lib/site'

export type BlogSource = {
  title: string
  url: string
  date?: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  status: 'published' | 'draft'
  category: string
  subcategory?: string
  tags: string[]
  authorId: BlogAuthorId
  cover: string
  coverAlt: string
  related: string[]
  sources: BlogSource[]
  body: string
  readingMinutes: number
}

function isFeatureEnabled() {
  return Boolean(site.features?.blog)
}

type GeneratedPost = {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  status: string
  category: string
  subcategory?: string
  tags?: string[]
  authorId: string
  cover: string
  coverAlt: string
  related?: string[]
  sources?: BlogSource[]
  body: string
  readingMinutes: number
}

function asPost(row: GeneratedPost): BlogPost | null {
  const authorId = row.authorId as BlogAuthorId
  if (!blogAuthors[authorId]) return null
  if (!getBlogCategory(row.category)) return null
  if (
    row.subcategory &&
    !getBlogSubcategory(row.category, row.subcategory)
  ) {
    return null
  }

  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    publishedAt: row.publishedAt,
    updatedAt: row.updatedAt,
    status: row.status === 'draft' ? 'draft' : 'published',
    category: row.category,
    subcategory: row.subcategory,
    tags: row.tags ?? [],
    authorId,
    cover: row.cover,
    coverAlt: row.coverAlt,
    related: row.related ?? [],
    sources: row.sources ?? [],
    body: row.body,
    readingMinutes: row.readingMinutes,
  }
}

export function blogEnabled() {
  return isFeatureEnabled()
}

export function getAllBlogPosts(): BlogPost[] {
  if (!isFeatureEnabled()) return []
  const rows = generatedPosts as unknown as GeneratedPost[]
  return rows
    .map((row) => asPost(row))
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getPublishedBlogPosts() {
  return getAllBlogPosts().filter((post) => post.status === 'published' && post.publishedAt)
}

export function getBlogPost(slug: string) {
  return getPublishedBlogPosts().find((post) => post.slug === slug)
}

export function getBlogPostsByCategory(category: string) {
  return getPublishedBlogPosts().filter((post) => post.category === category)
}

export function getBlogPostsBySubcategory(category: string, subcategory: string) {
  return getPublishedBlogPosts().filter(
    (post) => post.category === category && post.subcategory === subcategory,
  )
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  const pool = getPublishedBlogPosts().filter((item) => item.slug !== post.slug)
  const scored = pool.map((item) => {
    let score = 0
    if (post.related.includes(item.slug)) score += 100
    if (post.subcategory && item.subcategory === post.subcategory) score += 40
    if (item.category === post.category) score += 20
    const sharedTags = item.tags.filter((tag) => post.tags.includes(tag)).length
    score += sharedTags * 8
    return { item, score }
  })

  return scored
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || b.item.publishedAt.localeCompare(a.item.publishedAt))
    .slice(0, limit)
    .map((row) => row.item)
}

export function getBlogCategoryLinks() {
  return blogCategories
    .map((category) => ({
      ...category,
      count: getBlogPostsByCategory(category.slug).length,
      subcategories: category.subcategories.map((sub) => ({
        ...sub,
        count: getBlogPostsBySubcategory(category.slug, sub.slug).length,
      })),
    }))
    .filter((category) => category.count > 0)
}

export function formatBlogDate(value: string) {
  if (!value) return ''
  return new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function blogPostPath(slug: string) {
  return `/blog/${slug}/`
}

export function blogCategoryPath(category: string) {
  return `/blog/categoria/${category}/`
}

export function blogSubcategoryPath(category: string, subcategory: string) {
  return `/blog/categoria/${category}/${subcategory}/`
}

export function resolveBlogAuthor(post: BlogPost) {
  return getBlogAuthor(post.authorId)
}

export function blogBreadcrumbs(items: { name: string; path: string }[]) {
  return [
    { name: 'Início', path: '/' },
    { name: 'Blog', path: '/blog/' },
    ...items,
  ]
}
