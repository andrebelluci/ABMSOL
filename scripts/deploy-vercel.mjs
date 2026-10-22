/**
 * Deploy na Vercel usando o slug de site.config.json como nome do projeto.
 * Uso: npm run deploy:vercel
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const configPath = path.join(root, 'site.config.json')
if (!fs.existsSync(configPath)) {
  console.error('site.config.json não encontrado.')
  process.exit(1)
}

const site = JSON.parse(fs.readFileSync(configPath, 'utf8'))
const slug = site.slug

if (!slug || typeof slug !== 'string') {
  console.error('Defina "slug" em site.config.json antes do deploy.')
  process.exit(1)
}

const vercelDir = path.join(root, '.vercel')
const projectFile = path.join(vercelDir, 'project.json')

console.log(`Deploy Vercel — projeto: ${slug}`)
console.log(`URL esperada: https://${slug}.vercel.app`)
console.log('')

const args = ['vercel@latest', 'deploy', '--prod', '--yes']

if (!fs.existsSync(projectFile)) {
  args.push('--name', slug)
}

execSync(`npx ${args.map((a) => `"${a}"`).join(' ')}`, {
  cwd: root,
  stdio: 'inherit',
  shell: true,
})
