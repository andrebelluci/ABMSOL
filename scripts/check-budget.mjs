/**
 * Falha o build se um teto do PLAN §4.4 for ultrapassado
 * em /, /servicos/, /sobre/ e um conceito.
 * Fontes e JS contam o que o HTML da página pede, não todo subset gerado.
 */

import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

const root = path.join(import.meta.dirname, '..')
const outDir = path.join(root, 'out')

const CEILING = {
  jsGzip: 170 * 1024,
  cssGzip: 35 * 1024,
  fonts: 110 * 1024,
  image: 200 * 1024,
  transfer: 700 * 1024,
}

const TEXT_PAIRS = [
  ['ink on navy', '#f3eee4', '#0b173f'],
  ['muted on navy', '#c9c2b4', '#0b173f'],
  ['mint on navy', '#73d9b1', '#0b173f'],
  ['gold on navy', '#dca931', '#0b173f'],
  ['navy on gold', '#0b173f', '#dca931'],
]

const pages = [
  'index.html',
  'servicos/index.html',
  'sobre/index.html',
  'portfolio/atelier-norte/index.html',
]

function gzipSize(buffer) {
  return zlib.gzipSync(buffer).length
}

function readOut(urlPath) {
  const file = path.join(outDir, urlPath.replace(/^\//, ''))
  return fs.readFileSync(file)
}

function scriptSources(html) {
  const sources = new Set()
  for (const match of html.matchAll(/<script\b[^>]*>/g)) {
    const tag = match[0]
    if (/nomodule/i.test(tag)) continue
    const src = tag.match(/src="(\/[^"]+\.js)"/)
    if (src) sources.add(src[1])
  }
  return sources
}

function lin(channel) {
  const c = channel / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance(hex) {
  const n = Number.parseInt(hex.slice(1), 16)
  return (
    0.2126 * lin((n >> 16) & 255) +
    0.7152 * lin((n >> 8) & 255) +
    0.0722 * lin(n & 255)
  )
}

function contrast(a, b) {
  const hi = Math.max(luminance(a), luminance(b))
  const lo = Math.min(luminance(a), luminance(b))
  return (hi + 0.05) / (lo + 0.05)
}

const failures = []

for (const [name, fg, bg] of TEXT_PAIRS) {
  const ratio = contrast(fg, bg)
  console.log(`contraste ${name}: ${ratio.toFixed(2)}:1`)
  if (ratio < 4.5) failures.push(`${name} ${ratio.toFixed(2)}:1 abaixo de 4.5:1`)
}

for (const page of pages) {
  const htmlPath = path.join(outDir, page)
  if (!fs.existsSync(htmlPath)) {
    failures.push(`página ausente: ${page}`)
    continue
  }
  const html = fs.readFileSync(htmlPath, 'utf8')
  const assets = new Set()
  for (const match of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
    const asset = match[1].split('?')[0]
    if (/\.(css|woff2|svg|webp|png|jpe?g|avif)$/.test(asset)) assets.add(asset)
  }
  for (const asset of scriptSources(html)) assets.add(asset)
  let js = 0
  let css = 0
  let fonts = 0
  let images = 0

  for (const asset of assets) {
    const file = path.join(outDir, asset.replace(/^\//, ''))
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) continue
    const buffer = fs.readFileSync(file)
    if (asset.endsWith('.js')) js += gzipSize(buffer)
    else if (asset.endsWith('.css')) css += gzipSize(buffer)
    else if (asset.endsWith('.woff2')) fonts += buffer.length
    else if (/\.(svg|webp|png|jpe?g|avif)$/.test(asset)) {
      images += buffer.length
      if (buffer.length > CEILING.image) {
        failures.push(`${page} imagem ${asset} ${buffer.length} > ${CEILING.image}`)
      }
    }
  }

  const cssFiles = [...assets].filter((asset) => asset.endsWith('.css'))
  for (const asset of cssFiles) {
    const cssText = fs.readFileSync(path.join(outDir, asset.replace(/^\//, '')), 'utf8')
    for (const match of cssText.matchAll(/url\((['"]?)(\/[^"')]+\.woff2)\1\)/g)) {
      const fontPath = match[2]
      if (assets.has(fontPath)) continue
      assets.add(fontPath)
      const fontFile = path.join(outDir, fontPath.replace(/^\//, ''))
      if (!fs.existsSync(fontFile)) continue
      fonts += fs.statSync(fontFile).size
    }
  }

  const transfer = gzipSize(fs.readFileSync(htmlPath)) + js + css + fonts + images
  const kb = (n) => `${(n / 1024).toFixed(1)} KB`
  console.log(
    `${page} js ${kb(js)} css ${kb(css)} fontes ${kb(fonts)} imagens ${kb(images)} transf ${kb(transfer)}`,
  )
  if (js > CEILING.jsGzip) failures.push(`${page} JS gzip ${js} > ${CEILING.jsGzip}`)
  if (css > CEILING.cssGzip) failures.push(`${page} CSS gzip ${css} > ${CEILING.cssGzip}`)
  if (fonts > CEILING.fonts) failures.push(`${page} fontes ${fonts} > ${CEILING.fonts}`)
  if (transfer > CEILING.transfer) failures.push(`${page} transferência ${transfer} > ${CEILING.transfer}`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('orçamento dentro dos tetos')
