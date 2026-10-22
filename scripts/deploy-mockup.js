/**
 * Build com basePath do mockup e copia out/ para dharmalabs.
 * Lê slug e caminho de destino em site.config.json
 * Uso: npm run deploy:mockup
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const site = require('../site.config.json')
const MOCKUP_SLUG = site.slug
const LEADS_PREFIX = (site.mockupLeadsPrefix || '/mockups/leads').replace(/\/$/, '')
const BASE_PATH = (site.mockupBasePath || `${LEADS_PREFIX}/${MOCKUP_SLUG}`).replace(
  /\/$/,
  ''
)
const MOCKUP_ROOT_DIR = path.resolve(
  __dirname,
  '..',
  site.dharmalabsLeadsPath || '../dharmalabs/public/mockups/leads',
  MOCKUP_SLUG
)
const TARGET_DIR = path.join(MOCKUP_ROOT_DIR, 'public')
const OUT_DIR = path.join(__dirname, '..', 'out')

const HTACCESS = `# ${MOCKUP_SLUG} mockup — export estático Next.js em public/
DirectoryIndex public/index.html

RewriteEngine On
RewriteRule ^(config|includes|src|views|node_modules)/ - [F,L]

# Raiz → public/index.html
RewriteRule ^$ public/index.html [L]

# Páginas e assets do export (_next, images, blog, projetos, etc.)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)$ public/$1 [L]
`

function writeMockupHtaccess() {
  fs.mkdirSync(MOCKUP_ROOT_DIR, { recursive: true })
  fs.writeFileSync(path.join(MOCKUP_ROOT_DIR, '.htaccess'), HTACCESS, 'utf8')
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src)

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    for (const entry of fs.readdirSync(src)) {
      if (entry === '.htaccess') continue
      copyRecursive(path.join(src, entry), path.join(dest, entry))
    }
    return
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
}

console.log(`Building with basePath: ${BASE_PATH}`)
execSync('npm run build', {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
})

if (!fs.existsSync(OUT_DIR)) {
  throw new Error(`Pasta de build não encontrada: ${OUT_DIR}`)
}

console.log(`Copiando para ${TARGET_DIR}`)
if (fs.existsSync(TARGET_DIR)) {
  fs.rmSync(TARGET_DIR, { recursive: true, force: true })
}

copyRecursive(OUT_DIR, TARGET_DIR)
writeMockupHtaccess()
console.log(`Gerado ${path.join(MOCKUP_ROOT_DIR, '.htaccess')}`)
console.log('Deploy do mockup concluído.')
