/**
 * Gera sitemap.xml após o build.
 * Oito URLs: home, serviços, três conceitos, sobre, contato, privacidade.
 */

const fs = require('fs')
const path = require('path')

const siteConfig = require('../site.config.json')
const BASE_URL = siteConfig.url.replace(/\/$/, '')

const outDir = path.join(__dirname, '..', 'out')

if (!fs.existsSync(outDir)) {
  console.error('Error: /out não encontrado. Rode npm run build primeiro.')
  process.exit(1)
}

const paths = [
  '/',
  '/servicos/',
  '/portfolio/atelier-norte/',
  '/portfolio/casa-vertice/',
  '/portfolio/painel-serra/',
  '/sobre/',
  '/contato/',
  '/privacidade/',
]

const urls = paths.map((route, index) => ({
  loc: `${BASE_URL}${route}`,
  priority: index === 0 ? '1.0' : '0.6',
  changefreq: route === '/' ? 'weekly' : route === '/privacidade/' ? 'yearly' : 'monthly',
}))

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
console.log(`sitemap.xml gerado (${urls.length} URLs)`)
