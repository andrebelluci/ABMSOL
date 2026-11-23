import { readFileSync } from 'node:fs'
import sharp from 'sharp'

await sharp(
  'd:/andre/Projetos/www/BeatrizeTiago2026/public/assets/img/galeria/foto-01.jpeg',
)
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile('public/images/projects/beatriz-tiago/gallery-01.webp')

await sharp(
  'd:/andre/Projetos/www/BeatrizeTiago2026/public/assets/img/galeria/foto-05.jpeg',
)
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile('public/images/projects/beatriz-tiago/gallery-02.webp')

const svg = readFileSync(
  'd:/andre/Projetos/www/cardflow/public/assets/images/logo-icon.svg',
)
const logo = await sharp(svg).resize({ width: 220 }).png().toBuffer()

const coverSvg = Buffer.from(`<svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1024"/>
      <stop offset="100%" stop-color="#1a1450"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#g)"/>
  <circle cx="1280" cy="180" r="260" fill="#4666ff" fill-opacity="0.18"/>
  <circle cx="300" cy="820" r="220" fill="#9f42ff" fill-opacity="0.16"/>
  <text x="160" y="480" fill="#f5f7ff" font-family="Arial, sans-serif" font-size="92" font-weight="700">CardFlow</text>
  <text x="160" y="560" fill="#b8c0ff" font-family="Arial, sans-serif" font-size="36">Sua bio que vende.</text>
</svg>`)

const cover = sharp(coverSvg).composite([{ input: logo, top: 160, left: 160 }])
await cover.clone().webp({ quality: 85 }).toFile('public/images/projects/cardflow/cover.webp')
await cover.clone().webp({ quality: 85 }).toFile('public/images/projects/cardflow/gallery-01.webp')

// Agency OS second still = same cover until widget page exists as public surface
await sharp('public/images/projects/agency-os/cover.webp')
  .webp({ quality: 82 })
  .toFile('public/images/projects/agency-os/gallery-01.webp')

console.log('stills ready')
