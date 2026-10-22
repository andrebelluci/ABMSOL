/**
 * Gera LandingPage com dangerouslySetInnerHTML (SVG/style-heavy).
 */
import fs from 'node:fs'
import path from 'node:path'

const [htmlPath, outDir, componentName = 'LandingPage'] = process.argv.slice(2)
if (!htmlPath || !outDir) {
  console.error('Uso: node port-html-embed.mjs <html> <outDir> [ComponentName]')
  process.exit(1)
}

const html = fs.readFileSync(htmlPath, 'utf8')
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
if (!bodyMatch) process.exit(1)

const body = bodyMatch[1]
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .trim()
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${')

const htmlFile = path.join(outDir, 'landing-html.ts')
const tsxFile = path.join(outDir, `${componentName}.tsx`)

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(htmlFile, `export const LANDING_HTML = \`${body}\`\n`, 'utf8')
fs.writeFileSync(
  tsxFile,
  `'use client'

import { useMemo } from 'react'
import { asset } from '@/lib/paths'
import { LANDING_HTML } from './landing-html'

export function ${componentName}() {
  const html = useMemo(
    () => LANDING_HTML.replace(/assets\\//g, \`\${asset('/assets')}/\`),
    []
  )
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
`,
  'utf8'
)
console.log('Gerado:', tsxFile)
