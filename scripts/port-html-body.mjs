/**
 * Extrai o conteúdo do <body> do protótipo e gera TSX com media() nos assets.
 * Uso: node scripts/port-html-body.mjs <htmlPath> <outTsxPath> <ComponentName>
 */
import fs from 'node:fs'
import path from 'node:path'

const [htmlPath, outTsxPath, componentName = 'LandingPage'] = process.argv.slice(2)
if (!htmlPath || !outTsxPath) {
  console.error('Uso: node port-html-body.mjs <html> <out.tsx> [ComponentName]')
  process.exit(1)
}

const html = fs.readFileSync(htmlPath, 'utf8')
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
if (!bodyMatch) {
  console.error('Body não encontrado')
  process.exit(1)
}

let body = bodyMatch[1]
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .trim()

body = body
  .replace(/\bclass=/g, 'className=')
  .replace(/\bfor=/g, 'htmlFor=')
  .replace(/\btabindex=/gi, 'tabIndex=')
  .replace(/\breadonly\b/gi, 'readOnly')
  .replace(/\bautocomplete=/gi, 'autoComplete=')
  .replace(/\bmaxlength=/gi, 'maxLength=')
  .replace(/\bstroke-width=/g, 'strokeWidth=')
  .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
  .replace(/\bstroke-linejoin=/g, 'strokeLinejoin=')
  .replace(/\bfill-rule=/g, 'fillRule=')
  .replace(/\bclip-rule=/g, 'clipRule=')
  .replace(/\bfetchpriority=/gi, 'fetchPriority=')
  .replace(/\bviewbox=/gi, 'viewBox=')
  .replace(/\bxmlns:xlink=/g, 'xmlnsXlink=')
  .replace(/\bxml:space=/g, 'xmlSpace=')
  .replace(/\bclip-path=/g, 'clipPath=')
  .replace(/\bstop-color=/g, 'stopColor=')
  .replace(/\bstop-opacity=/g, 'stopOpacity=')
  .replace(/\bfill-opacity=/g, 'fillOpacity=')
  .replace(/\bstroke-opacity=/g, 'strokeOpacity=')
  .replace(/\bstroke-miterlimit=/g, 'strokeMiterlimit=')
  .replace(/\bstroke-dasharray=/g, 'strokeDasharray=')
  .replace(/\bfont-family=/g, 'fontFamily=')
  .replace(/\bfont-size=/g, 'fontSize=')
  .replace(/\bfont-weight=/g, 'fontWeight=')
  .replace(/\btext-anchor=/g, 'textAnchor=')
  .replace(/\bdominant-baseline=/g, 'dominantBaseline=')
  .replace(/\benable-background=/g, 'enableBackground=')

// src/href com assets/
body = body.replace(
  /(src|href|poster)=(["'])assets\/([^"']+)\2/g,
  (_, attr, q, p) => `${attr}={media('/assets/${p}')}`
)

const out = `import { media } from '@/lib/brand'

export function ${componentName}() {
  return (
    <>
${body
  .split('\n')
  .map((line) => '      ' + line)
  .join('\n')}
    </>
  )
}
`

fs.mkdirSync(path.dirname(outTsxPath), { recursive: true })
fs.writeFileSync(outTsxPath, out, 'utf8')
console.log('Gerado:', outTsxPath)
