import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'public', 'images')
const site = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'))

const width = 1200
const height = 630

const gradientSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="50%" stop-color="#2b2b2b"/>
      <stop offset="100%" stop-color="#c9a96e"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <ellipse cx="900" cy="120" rx="280" ry="180" fill="#f7f4ef" opacity="0.1"/>
  <text x="80" y="300" font-family="Georgia, serif" font-size="64" font-weight="600" fill="#f7f4ef">${site.name}</text>
  <text x="80" y="360" font-family="Arial, sans-serif" font-size="24" fill="#e2c99a">Site premium · Next.js export</text>
</svg>
`

const baseBuffer = await sharp(Buffer.from(gradientSvg)).png().toBuffer()

await sharp(baseBuffer).webp({ quality: 85 }).toFile(join(outDir, 'og-image.webp'))
await sharp(baseBuffer).webp({ quality: 85 }).toFile(join(outDir, 'hero-poster.webp'))

console.log('Generated og-image.webp and hero-poster.webp')
