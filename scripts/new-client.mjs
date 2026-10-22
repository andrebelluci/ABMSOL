/**
 * Cria um novo projeto a partir do boilerplate _ClienteBase.
 *
 * Uso (na pasta _ClienteBase):
 *   npm run new:client -- MeuCliente
 *   npm run new:client -- DocePele --slug docepele
 *   npm run new:client -- MeuCliente --no-install
 *
 * Destino padrão: ../<NomeDoProjeto> (irmão de _ClienteBase em www/)
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { syncPortfolioIntake } from './sync-portfolio-intake.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_ROOT = path.resolve(__dirname, '..')
const DEFAULT_PARENT = path.resolve(SOURCE_ROOT, '..')

const EXCLUDE_DIRS = new Set([
  'node_modules',
  '.next',
  'out',
  'dist',
  '.git',
  '.playwright-mcp',
  'coverage',
  '.vercel',
  '.turbo',
  '__pycache__',
])

const EXCLUDE_FILES = new Set([
  '.eslintcache',
  'npm-debug.log',
  'yarn-debug.log',
  'yarn-error.log',
  'pnpm-debug.log',
])

function parseArgs(argv) {
  const positional = []
  let slug = ''
  let install = true
  let gitInit = true
  let destParent = DEFAULT_PARENT

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--slug') {
      slug = argv[++i] ?? ''
      continue
    }
    if (arg === '--no-install') {
      install = false
      continue
    }
    if (arg === '--no-git') {
      gitInit = false
      continue
    }
    if (arg === '--dest') {
      destParent = path.resolve(argv[++i] ?? '')
      continue
    }
    if (arg.startsWith('--')) {
      console.error(`Opção desconhecida: ${arg}`)
      process.exit(1)
    }
    positional.push(arg)
  }

  return { positional, slug, install, gitInit, destParent }
}

function slugify(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function humanizeName(folderName) {
  return folderName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim()
}

function shouldExclude(relPath, isDir) {
  const parts = relPath.split(path.sep).filter(Boolean)
  if (parts.some((part) => EXCLUDE_DIRS.has(part))) return true

  const base = path.basename(relPath)
  if (!isDir && EXCLUDE_FILES.has(base)) return true
  if (!isDir && base.endsWith('.tsbuildinfo')) return true
  if (!isDir && base.endsWith('.log')) return true

  if (
    parts[0] === 'docs' &&
    parts[1] === 'screenshots' &&
    !isDir &&
    base.endsWith('.png')
  ) {
    return true
  }

  if (!isDir && /^prompt.*\.png$/i.test(base)) return true

  return false
}

function copyTree(src, dest) {
  const stat = fs.statSync(src)
  const rel = path.relative(SOURCE_ROOT, src)

  if (shouldExclude(rel, stat.isDirectory())) return

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    for (const entry of fs.readdirSync(src)) {
      copyTree(path.join(src, entry), path.join(dest, entry))
    }
    return
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
}

function resetLoopState(destRoot, projectName) {
  const file = path.join(destRoot, 'LOOP_STATE.md')
  const content = `# Loop State

Atualize este arquivo ao fim de cada sessão de agente.

## Projeto

- **Nome:** ${humanizeName(projectName)}
- **Slug:** ${slugify(projectName)}
- **Nicho:** —
- **Brief aprovado em:** —

## Orçamento de sessões (sugestão)

- Brief architect: 1
- Brief reviewer: 1
- Fases de implementação: máx. 1 por dia
- QA: após cada fase

## Status atual

| Etapa | Status | Data |
|-------|--------|------|
| INTAKE preenchido | ⬜ | |
| BRIEF gerado | ⬜ | |
| BRIEF revisado | ⬜ | |
| BRIEF aprovado (humano) | ⬜ | |
| Fase 01 design-system | ⬜ | |
| Fase 02 chrome | ⬜ | |
| Fase 03 hero | ⬜ | |
| Fase 04 sections-home | ⬜ | |
| Fase 05 inner-pages | ⬜ | |
| Fase 06 polish-qa | ⬜ | |

## Fila

1. Preencher \`docs/INTAKE.md\`

## Em progresso

- Nada

## Feito (últimos 7 dias)

- —

## Bloqueios (precisa humano)

- —

## Anti-clone declarado

- Ver checklist em `docs/INTAKE.md` (rodar `npm run intake:portfolio`)

## Próximo passo

1. Preencher \`docs/INTAKE.md\`
2. Invocar \`/brief-architect\`
`
  fs.writeFileSync(file, content, 'utf8')
}

function resetBriefFiles(destRoot) {
  fs.writeFileSync(
    path.join(destRoot, 'docs', 'BRIEF.md'),
    `# BRIEF — [Gerado pelo brief-architect]

> Este arquivo é **gerado automaticamente**. Não edite manualmente antes da aprovação — ajuste o \`INTAKE.md\` e rode \`/brief-architect\` de novo.

_Status: aguardando geração_
`,
    'utf8'
  )

  fs.writeFileSync(
    path.join(destRoot, 'docs', 'DIFFERENTIATION.md'),
    `# DIFFERENTIATION — Chrome único do projeto

> Gerado pelo **brief-architect**. Define o que torna este site diferente do boilerplate e dos outros clientes.

_Status: aguardando geração_

## Custom Cursor

- Metaphor:
- NOT like:
- States:

## Scrollbar

- Track:
- Thumb:

## Mobile nav

- Pattern:
- Transition:

## Header

- Behavior on scroll:
- Logo treatment:

## Footer

- Layout:
- Signature element:

## Hero (resumo — detalhe na fase 03)

- Archetype:
- NOT like:
`,
    'utf8'
  )
}

function cleanGeneratedPhases(destRoot) {
  const phasesDir = path.join(destRoot, 'docs', 'phases')
  if (!fs.existsSync(phasesDir)) return

  for (const entry of fs.readdirSync(phasesDir)) {
    if (entry === 'README.md') continue
    if (entry.endsWith('-TEMPLATE.md')) continue
    fs.rmSync(path.join(phasesDir, entry), { recursive: true, force: true })
  }
}

function cleanDesignSystem(destRoot) {
  const ds = path.join(destRoot, 'design-system')
  if (!fs.existsSync(ds)) return
  for (const entry of fs.readdirSync(ds)) {
    if (entry === '.gitkeep') continue
    fs.rmSync(path.join(ds, entry), { recursive: true, force: true })
  }
}

function writeSiteConfig(destRoot, projectName, slug) {
  const configPath = path.join(destRoot, 'site.config.json')
  const config = {
    name: humanizeName(projectName),
    slug,
    url: 'https://exemplo.com.br',
    author: 'André Belluci',
    dharmalabsLeadsPath: '../dharmalabs/public/mockups/leads',
    features: {
      blog: false,
      localSeoStrong: false,
    },
  }
  fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8')
}

function main() {
  const { positional, slug: slugArg, install, gitInit, destParent } = parseArgs(
    process.argv.slice(2)
  )

  const projectName = positional[0]
  if (!projectName) {
    console.error('Uso: npm run new:client -- <NomeDoProjeto> [--slug meu-slug] [--no-install] [--no-git]')
    process.exit(1)
  }

  if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(projectName)) {
    console.error('Nome do projeto inválido. Use letras, números, _ ou - (ex.: DocePele, Meu_Cliente).')
    process.exit(1)
  }

  const destRoot = path.resolve(destParent, projectName)
  const slug = slugArg || slugify(projectName)

  if (fs.existsSync(destRoot)) {
    console.error(`Destino já existe: ${destRoot}`)
    process.exit(1)
  }

  console.log(`Origem:  ${SOURCE_ROOT}`)
  console.log(`Destino: ${destRoot}`)
  console.log(`Slug:    ${slug}`)
  console.log('Copiando arquivos (sem node_modules, .git, builds)...')

  copyTree(SOURCE_ROOT, destRoot)

  resetLoopState(destRoot, projectName)
  resetBriefFiles(destRoot)
  cleanGeneratedPhases(destRoot)
  cleanDesignSystem(destRoot)
  writeSiteConfig(destRoot, projectName, slug)

  try {
    const portfolio = syncPortfolioIntake(destRoot, {
      parentDir: destParent,
      currentFolder: projectName,
    })
    console.log(
      `Anti-clone: ${portfolio.projectCount} projeto(s) listado(s) em docs/INTAKE.md`
    )
  } catch (error) {
    console.warn(`Aviso: não foi possível preencher anti-clone — ${error.message}`)
  }

  if (gitInit) {
    console.log('Inicializando git...')
    execSync('git init -b main', { cwd: destRoot, stdio: 'inherit' })
  }

  if (install) {
    console.log('Instalando dependências (npm install)...')
    execSync('npm install', { cwd: destRoot, stdio: 'inherit' })
  }

  console.log('')
  console.log('Projeto criado com sucesso.')
  console.log('')
  console.log('Próximos passos:')
  console.log(`  cd ${destRoot}`)
  console.log('  Editar site.config.json (url, features)')
  console.log('  Preencher docs/INTAKE.md')
  console.log('  npm run dev')
  console.log('  Após QA: npm run deploy:vercel')
  console.log('')
  console.log('Ver docs/USAGE.md para o loop completo.')
}

main()
