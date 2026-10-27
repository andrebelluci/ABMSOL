import fs from 'node:fs'

const css = fs.readFileSync('app/globals.css', 'utf8')
const tokens = Object.fromEntries(
  [...css.matchAll(/--(c-[\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2].toLowerCase()]),
)

function lin(channel) {
  const s = channel / 255
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function ratio(a, b) {
  const hi = Math.max(luminance(a), luminance(b))
  const lo = Math.min(luminance(a), luminance(b))
  return (hi + 0.05) / (lo + 0.05)
}

const required = [
  ['ink sobre navy-900', 'c-ink', 'c-navy-900', 4.5],
  ['ink sobre navy-800', 'c-ink', 'c-navy-800', 4.5],
  ['ink-muted sobre navy-900', 'c-ink-muted', 'c-navy-900', 4.5],
  ['ink-muted sobre navy-800', 'c-ink-muted', 'c-navy-800', 4.5],
  ['navy-900 sobre paper', 'c-navy-900', 'c-paper', 4.5],
  ['navy-muted sobre paper', 'c-navy-muted', 'c-paper', 4.5],
  ['navy-900 sobre gold (rótulo de botão)', 'c-navy-900', 'c-gold', 4.5],
  ['navy-900 sobre mint (rótulo de botão)', 'c-navy-900', 'c-mint', 4.5],
  ['gold sobre navy-900 (UI)', 'c-gold', 'c-navy-900', 3],
  ['mint sobre navy-900 (foco/UI)', 'c-mint', 'c-navy-900', 3],
]

let failed = 0
for (const [name, fg, bg, min] of required) {
  const value = ratio(tokens[fg], tokens[bg])
  const ok = value >= min
  if (!ok) failed += 1
  console.log(`${ok ? 'ok' : 'FALHA'}  ${value.toFixed(2)}:1  (mín ${min})  ${name}`)
}

const goldOnPaper = ratio(tokens['c-gold'], tokens['c-paper'])
console.log(
  `info  ${goldOnPaper.toFixed(2)}:1  gold sobre paper — só decorativo, fora dos pares de texto`,
)
if (goldOnPaper >= 4.5) {
  console.log('FALHA  gold sobre paper passou a servir como texto; revisar o token')
  failed += 1
}

if (failed) {
  console.error(`${failed} par(es) fora do AA`)
  process.exit(1)
}
console.log(`${required.length}/${required.length} pares de texto/UI no AA`)
