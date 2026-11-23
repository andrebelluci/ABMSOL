/**
 * Gera public/sitemap.xml antes do build, para o export copiar o arquivo.
 * Home, serviços, projetos, cases publicados, sobre, contato, privacidade.
 */

const fs = require('fs')
const path = require('path')

const siteConfig = require('../site.config.json')
const BASE_URL = siteConfig.url.replace(/\/$/, '')

const publicDir = path.join(__dirname, '..', 'public')
const outDir = path.join(__dirname, '..', 'out')

const caseSlugs = [
  'agency-os',
  'cardflow',
  'vobelluci',
  'beatriz-tiago',
  'participantes-ici',
]

const paths = [
  '/',
  '/servicos/',
  '/projetos/',
  ...caseSlugs.map((slug) => `/portfolio/${slug}/`),
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

fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
if (fs.existsSync(outDir)) {
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
}
console.log(`sitemap.xml gerado em public/ (${urls.length} URLs)`)
