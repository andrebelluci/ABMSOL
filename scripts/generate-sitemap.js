/**
 * Gera public/sitemap.xml antes do build, para o export copiar o arquivo.
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const siteConfig = require('../site.config.json')
const BASE_URL = siteConfig.url.replace(/\/$/, '')

const publicDir = path.join(__dirname, '..', 'public')
const outDir = path.join(__dirname, '..', 'out')
const blogDir = path.join(__dirname, '..', 'content', 'blog')

const today = new Date().toISOString().slice(0, 10)

const caseSlugs = [
  'agency-os',
  'cardflow',
  'vobelluci',
  'beatriz-tiago',
  'participantes-ici',
]

function asDateString(value) {
  if (!value) return ''
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  const raw = String(value).trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10)
  const parsed = new Date(raw)
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10)
  return ''
}

function routeMeta(route) {
  if (route === '/') {
    return { priority: '1.0', changefreq: 'weekly', lastmod: today }
  }
  if (route === '/privacidade/') {
    return { priority: '0.3', changefreq: 'yearly', lastmod: today }
  }
  if (route === '/servicos/' || route === '/projetos/' || route === '/blog/') {
    return { priority: '0.8', changefreq: 'weekly', lastmod: today }
  }
  if (route.startsWith('/portfolio/')) {
    return { priority: '0.7', changefreq: 'monthly', lastmod: today }
  }
  if (route.startsWith('/blog/') && route.split('/').filter(Boolean).length === 2) {
    // /blog/{slug}/
    return { priority: '0.7', changefreq: 'weekly', lastmod: today }
  }
  if (route.startsWith('/blog/categoria/')) {
    return { priority: '0.55', changefreq: 'weekly', lastmod: today }
  }
  if (route === '/sobre/' || route === '/contato/') {
    return { priority: '0.6', changefreq: 'monthly', lastmod: today }
  }
  return { priority: '0.5', changefreq: 'monthly', lastmod: today }
}

/** @type {{ loc: string, lastmod?: string }[]} */
const entries = [
  { loc: '/' },
  { loc: '/servicos/' },
  { loc: '/projetos/' },
  ...caseSlugs.map((slug) => ({ loc: `/portfolio/${slug}/` })),
  { loc: '/sobre/' },
  { loc: '/contato/' },
  { loc: '/privacidade/' },
]

if (siteConfig.features?.blog) {
  entries.push({ loc: '/blog/' })

  if (fs.existsSync(blogDir)) {
    const files = fs
      .readdirSync(blogDir)
      .filter(
        (name) =>
          name.endsWith('.md') &&
          !name.startsWith('_') &&
          name.toLowerCase() !== 'readme.md',
      )

    /** @type {Map<string, string>} */
    const categoryLastmod = new Map()
    /** @type {Map<string, string>} */
    const subcategoryLastmod = new Map()

    for (const name of files) {
      const filePath = path.join(blogDir, name)
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(raw)
      if (data.status === 'draft') continue
      const slug = String(data.slug ?? name.replace(/\.md$/i, '')).trim()
      if (!slug) continue

      const lastmod =
        asDateString(data.updatedAt) ||
        asDateString(data.publishedAt) ||
        today

      entries.push({ loc: `/blog/${slug}/`, lastmod })

      if (data.category) {
        const category = String(data.category)
        const prev = categoryLastmod.get(category)
        if (!prev || lastmod > prev) categoryLastmod.set(category, lastmod)

        if (data.subcategory) {
          const key = `${category}/${data.subcategory}`
          const prevSub = subcategoryLastmod.get(key)
          if (!prevSub || lastmod > prevSub) {
            subcategoryLastmod.set(key, lastmod)
          }
        }
      }
    }

    for (const [category, lastmod] of categoryLastmod) {
      entries.push({ loc: `/blog/categoria/${category}/`, lastmod })
    }
    for (const [key, lastmod] of subcategoryLastmod) {
      entries.push({ loc: `/blog/categoria/${key}/`, lastmod })
    }

    const blogIndexLast = [...categoryLastmod.values()].sort().at(-1)
    if (blogIndexLast) {
      const blogEntry = entries.find((item) => item.loc === '/blog/')
      if (blogEntry) blogEntry.lastmod = blogIndexLast
    }
  }
}

const urls = entries.map((entry) => {
  const meta = routeMeta(entry.loc)
  return {
    loc: `${BASE_URL}${entry.loc}`,
    lastmod: entry.lastmod || meta.lastmod,
    changefreq: meta.changefreq,
    priority: meta.priority,
  }
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
if (fs.existsSync(outDir)) {
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
}
console.log(`sitemap.xml gerado em public/ (${urls.length} URLs)`)
