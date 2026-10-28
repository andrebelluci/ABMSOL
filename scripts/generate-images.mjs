import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'images')
const mark = readFileSync(join(root, 'public/logo/mark.svg'))
const navy = { r: 0x0b, g: 0x17, b: 0x3f, alpha: 1 }

async function markOnNavy(width, height, markSize) {
  const drawn = await sharp(mark)
    .resize(markSize, markSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()
  const meta = await sharp(drawn).metadata()
  const left = Math.round((width - meta.width) / 2)
  const top = Math.round((height - meta.height) / 2)
  return sharp({
    create: { width, height, channels: 4, background: navy },
  })
    .composite([{ input: drawn, left, top }])
    .png()
    .toBuffer()
}

const og = await markOnNavy(1200, 630, 520)
await sharp(og).webp({ quality: 85 }).toFile(join(outDir, 'og-image.webp'))
await sharp(og).png({ compressionLevel: 9 }).toFile(join(root, 'public', 'og.png'))
const poster = await markOnNavy(1200, 1200, 780)
await sharp(poster).webp({ quality: 85 }).toFile(join(outDir, 'hero-poster.webp'))

console.log('Generated og-image.webp, og.png and hero-poster.webp from the mark on the navy plate')
