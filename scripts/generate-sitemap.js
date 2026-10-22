/**
 * Gera sitemap.xml após o build.
 * Rotas: home + legais + blog (se features.blog).
 */

const fs = require('fs')
const path = require('path')

const siteConfig = require('../site.config.json')
const BASE_URL = siteConfig.url.replace(/\/$/, '')
const features = siteConfig.features ?? { blog: false, localSeoStrong: false }

const outDir = path.join(__dirname, '..', 'out')

if (!fs.existsSync(outDir)) {
  console.error('Error: /out não encontrado. Rode npm run build primeiro.')
  process.exit(1)
}

const urls = [
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly' },
  {
    loc: `${BASE_URL}/termos-de-uso/`,
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    loc: `${BASE_URL}/politica-de-privacidade/`,
    priority: '0.3',
    changefreq: 'yearly',
  },
]

if (features.blog) {
  urls.push({
    loc: `${BASE_URL}/blog/`,
    priority: '0.7',
    changefreq: 'weekly',
  })

  const blogDir = path.join(__dirname, '..', 'content', 'blog')
  if (fs.existsSync(blogDir)) {
    fs.readdirSync(blogDir)
      .filter((file) => file.endsWith('.md'))
      .forEach((file) => {
        const slug = file.replace(/\.md$/, '')
        urls.push({
          loc: `${BASE_URL}/blog/${slug}/`,
          priority: '0.6',
          changefreq: 'monthly',
        })
      })
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
console.log(`✅ sitemap.xml gerado (${urls.length} URLs)`)
