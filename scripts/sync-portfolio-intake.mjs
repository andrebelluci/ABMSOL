/**
 * Preenche a seção Anti-clone em docs/INTAKE.md listando projetos irmãos em www/.
 *
 * Uso (na raiz de um projeto cliente):
 *   npm run intake:portfolio
 *   node scripts/sync-portfolio-intake.mjs
 *   node scripts/sync-portfolio-intake.mjs --same-niche
 *   node scripts/sync-portfolio-intake.mjs --dest ../MeuCliente
 *
 * Chamado automaticamente por scripts/new-client.mjs após criar o projeto.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORTFOLIO_SKIP_DIRS = new Set([
  '_ClienteBase',
  '_AgencyOS',
  'node_modules',
  '.git',
  'cardflow',
  'dharmalabs',
  'participantesici',
])

/** Assinaturas conhecidas quando o projeto não tem DIFFERENTIATION/BRIEF. */
const KNOWN_SIGNATURES = {
  VittaDermatologia: 'cursor dourado, hero vídeo clínica',
  Pelle: 'manifesto copper, timeline vertical',
  DocePele: 'pinned services, formas orgânicas',
  BarbaraBelluci: 'cinema mesa, drawers laterais',
  BeatrizeTiago2026: 'casamento — revisar site',
  GaneshaPServicos: 'serviços — revisar site',
}

const PORTFOLIO_START = '<!-- PORTFOLIO:START -->'
const PORTFOLIO_END = '<!-- PORTFOLIO:END -->'
const PORTFOLIO_SLOTS_START = '<!-- PORTFOLIO:SLOTS:START -->'
const PORTFOLIO_SLOTS_END = '<!-- PORTFOLIO:SLOTS:END -->'

function parseArgs(argv) {
  let destRoot = process.cwd()
  let sameNiche = false
  let parentDir = null

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--same-niche') {
      sameNiche = true
      continue
    }
    if (arg === '--dest') {
      destRoot = path.resolve(argv[++i] ?? '')
      continue
    }
    if (arg === '--parent') {
      parentDir = path.resolve(argv[++i] ?? '')
      continue
    }
    if (arg.startsWith('--')) {
      console.error(`Opção desconhecida: ${arg}`)
      process.exit(1)
    }
  }

  return { destRoot, sameNiche, parentDir }
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch {
    return ''
  }
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch {
    return null
  }
}

function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1]?.trim()) return match[1].trim().replace(/\s+/g, ' ')
  }
  return ''
}

function isDifferentiationTemplate(text) {
  if (!text) return true
  if (text.includes('_Status: aguardando geração_')) return true
  if (/## Custom Cursor[\s\S]*?- Metaphor:\s*$/m.test(text)) return true
  if (/## Custom Cursor[\s\S]*?- Metaphor:\s*\n-\s*NOT like:/m.test(text)) return true
  return false
}

function extractNicho(projectRoot) {
  const loop = readText(path.join(projectRoot, 'LOOP_STATE.md'))
  const fromLoop = firstMatch(loop, [
    /-\s*\*\*Nicho:\*\*\s*(.+)/i,
    /Nicho:\s*(.+)/i,
  ])
  if (fromLoop && fromLoop !== '—') return fromLoop.toLowerCase()

  const intake = readText(path.join(projectRoot, 'docs', 'INTAKE.md'))
  const fromIntake = firstMatch(intake, [
    /-\s*\*\*Nicho:\*\*\s*_?\(?([^_\n)]+)/i,
    /-\s*\*\*Nicho:\*\*\s*([^\n]+)/i,
  ])
  if (fromIntake) {
    return fromIntake.replace(/[_(].*$/, '').trim().toLowerCase()
  }

  return ''
}

function isPlaceholderSummary(text) {
  if (!text) return true
  const lower = text.toLowerCase()
  return (
    lower.includes('preencher') ||
    lower.includes('aguardando geração') ||
    lower.includes('_(ex:')
  )
}

function shorten(text, max = 100) {
  if (!text || text.length <= max) return text
  return `${text.slice(0, max - 1).trim()}…`
}

function summarizeFromDifferentiation(text) {
  const identity = firstMatch(text, [
    /\*\*Metáfora:\*\*\s*(.+)/i,
    /\*\*Conceito:\*\*\s*"?([^"\n]+)"?/i,
    /## Identidade chrome[^\n]*\n+([^\n#]+)/i,
    /## Identidade visual resumida[\s\S]*?\|\s*Conceito\s*\|\s*([^|]+)\|/i,
  ])

  const cursor = firstMatch(text, [
    /\*\*Metáfora\*\*\s*\n+\*\*([^*]+)\*\*/i,
    /### Metaphor\s*\n+\*\*([^*]+)\*\*/i,
    /### Metaphor\s*\n+(.+)/i,
    /\*\*Metáfora:\*\*\s*(.+)/i,
  ])

  const nav = firstMatch(text, [
    /\|\s*\*\*Pattern\*\*\s*\|\s*([^|]+)\|/i,
    /-\s*\*\*Pattern:\*\*\s*(.+)/i,
    /Pattern:\s*\*\*([^*]+)\*\*/i,
  ])

  const hero = firstMatch(text, [
    /-\s*\*\*Archetype:\*\*\s*`?([^`\n]+)`?/i,
    /Archetype:\s*`([^`]+)`/i,
  ])

  const chips = []
  const add = (value) => {
    if (!value || isPlaceholderSummary(value)) return
    const normalized = value.replace(/\s+/g, ' ').trim()
    if (chips.some((c) => c.includes(normalized) || normalized.includes(c))) return
    chips.push(normalized)
  }

  if (cursor && cursor !== identity) add(`cursor: ${cursor}`)
  else if (identity) add(identity)
  if (nav) add(`nav: ${nav.replace(/`/g, '')}`)
  if (hero) add(`hero: ${hero}`)

  return shorten(chips.join(' · '), 110)
}

function summarizeFromBrief(text) {
  if (!text || text.includes('_Status: aguardando geração_')) return ''

  const concept = firstMatch(text, [
    /"([^"]{12,120})"\s*—/,
    /## Visual Concept\s*\n+```[\s\S]*?\n"([^"]+)"/,
    /## Visual Concept\s*\n+```[\s\S]*?\n([^\n`]{12,120})/,
  ])

  const archetype = firstMatch(text, [
    /-\s*\*\*Archetype:\*\*\s*`([^`]+)`/i,
    /\*\*Archetype:\*\*\s*`([^`]+)`/i,
  ])

  const dominant = firstMatch(text, [
    /\|\s*\*\*Dominante\*\*\s*\|\s*([^|]+)\|/i,
  ])

  const parts = []
  if (concept && !isPlaceholderSummary(concept)) parts.push(concept)
  if (dominant && !isPlaceholderSummary(dominant)) parts.push(dominant)
  if (archetype && !isPlaceholderSummary(archetype)) parts.push(`hero ${archetype}`)

  return shorten(parts.join(' · '), 110) || ''
}

function summarizeFromLoop(text) {
  const value = firstMatch(text, [
    /## Anti-clone declarado\s*\n+-\s*Não parecer com:\s*(.+)/i,
    /-\s*Fase 03:\s*(.+)/i,
  ])
  if (isPlaceholderSummary(value)) return ''
  return value
}

function summarizeProject(projectRoot, folderName) {
  const config = readJson(path.join(projectRoot, 'site.config.json'))
  const displayName = config?.name || folderName

  const diffPath = path.join(projectRoot, 'docs', 'DIFFERENTIATION.md')
  const diffText = readText(diffPath)
  if (diffText && !isDifferentiationTemplate(diffText)) {
    const summary = summarizeFromDifferentiation(diffText)
    if (summary) return { displayName, folderName, summary, source: 'DIFFERENTIATION' }
  }

  const briefPath = path.join(projectRoot, 'docs', 'BRIEF.md')
  const briefText = readText(briefPath)
  const fromBrief = summarizeFromBrief(briefText)
  if (fromBrief) {
    return { displayName, folderName, summary: fromBrief, source: 'BRIEF' }
  }

  const loopText = readText(path.join(projectRoot, 'LOOP_STATE.md'))
  const fromLoop = summarizeFromLoop(loopText)
  if (fromLoop) {
    return { displayName, folderName, summary: fromLoop, source: 'LOOP_STATE' }
  }

  if (KNOWN_SIGNATURES[folderName]) {
    return {
      displayName,
      folderName,
      summary: KNOWN_SIGNATURES[folderName],
      source: 'portfólio',
    }
  }

  return {
    displayName,
    folderName,
    summary: 'sem spec em docs — revisar site ou preencher manualmente',
    source: 'pendente',
  }
}

function listPortfolioProjects(parentDir, currentFolder) {
  const entries = fs.readdirSync(parentDir, { withFileTypes: true })
  const projects = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (PORTFOLIO_SKIP_DIRS.has(entry.name)) continue
    if (entry.name.startsWith('_')) continue
    if (entry.name === currentFolder) continue

    const projectRoot = path.join(parentDir, entry.name)
    const configPath = path.join(projectRoot, 'site.config.json')
    if (!fs.existsSync(configPath)) continue

    projects.push(summarizeProject(projectRoot, entry.name))
  }

  return projects.sort((a, b) => a.folderName.localeCompare(b.folderName))
}

function nicheMatches(a, b) {
  if (!a || !b) return false
  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()

  const na = normalize(a)
  const nb = normalize(b)
  if (na === nb) return true
  if (na.includes(nb) || nb.includes(na)) return true

  const estetica = ['estetica', 'clinica', 'medico', 'dermatologia']
  if (estetica.some((k) => na.includes(k)) && estetica.some((k) => nb.includes(k))) {
    return true
  }

  return false
}

function extractHeroArchetype(projectRoot) {
  const briefText = readText(path.join(projectRoot, 'docs', 'BRIEF.md'))
  const diffText = readText(path.join(projectRoot, 'docs', 'DIFFERENTIATION.md'))

  const fromBrief = firstMatch(briefText, [
    /-\s*\*\*Archetype:\*\*\s*`([^`]+)`/i,
    /\*\*Archetype:\*\*\s*`([^`]+)`/i,
    /Hero archetype[:\s]+`?([a-z0-9-]+)`?/i,
  ])

  if (fromBrief && !isPlaceholderSummary(fromBrief)) return fromBrief

  const fromDiff = firstMatch(diffText, [
    /-\s*\*\*Archetype:\*\*\s*`?([^`\n]+)`?/i,
    /Archetype:\s*`([^`]+)`/i,
  ])

  if (fromDiff && !isPlaceholderSummary(fromDiff)) return fromDiff.replace(/`/g, '').trim()

  return ''
}

function mapArchetypeToSlot(archetype) {
  const a = archetype.toLowerCase()
  if (a.includes('ambient-video')) return 'A'
  if (a.includes('typographic')) return 'B'
  if (a.includes('immersive-full-bleed')) return 'C'
  if (a.includes('editorial-asymmetric')) return 'D'
  if (a.includes('scroll-chapter') || a.includes('cinematic-chapter')) return 'E'
  if (a.includes('product-duo')) return 'G1'
  return '—'
}

function buildSlotsBlock(projects, currentNicho, parentDir, generatedAt) {
  const lines = [
    PORTFOLIO_SLOTS_START,
    '',
    `> Gerado em ${generatedAt}. Slots A–E para estética/clínica/médico — ver \`docs/prompts/portfolio-hero-slots.md\`.`,
    '',
    '| Projeto | Nicho | Archetype | Slot |',
    '|---------|-------|-----------|------|',
  ]

  let sameNicheCount = 0

  for (const project of projects) {
    const siblingRoot = path.join(parentDir, project.folderName)
    const siblingNicho = extractNicho(siblingRoot)
    if (!currentNicho || !nicheMatches(currentNicho, siblingNicho)) continue

    sameNicheCount++
    const archetype = extractHeroArchetype(siblingRoot) || '(não definido)'
    const slot = archetype !== '(não definido)' ? mapArchetypeToSlot(archetype) : '—'
    const label =
      project.folderName === project.displayName
        ? project.folderName
        : `${project.folderName}`
    lines.push(`| ${label} | ${siblingNicho || '—'} | \`${archetype}\` | ${slot} |`)
  }

  if (sameNicheCount === 0) {
    lines.push('| _(nenhum irmão do mesmo nicho)_ | — | — | — |')
  }

  lines.push(
    '',
    '**Slots livres sugeridos:** escolher A–E ainda não usados acima (ou override no BRIEF).',
    '',
    PORTFOLIO_SLOTS_END,
  )

  return lines.join('\n')
}

function replaceSlotsSection(intakeText, slotsBlock) {
  if (intakeText.includes(PORTFOLIO_SLOTS_START) && intakeText.includes(PORTFOLIO_SLOTS_END)) {
    const start = intakeText.indexOf(PORTFOLIO_SLOTS_START)
    const end = intakeText.indexOf(PORTFOLIO_SLOTS_END) + PORTFOLIO_SLOTS_END.length
    return `${intakeText.slice(0, start)}${slotsBlock}${intakeText.slice(end)}`
  }

  const marker = '## Slots de hero'
  const headerIndex = intakeText.indexOf(marker)
  if (headerIndex === -1) {
    return `${intakeText.trimEnd()}\n\n## Slots de hero (portfólio)\n\n${slotsBlock}\n`
  }

  const afterHeader = intakeText.slice(headerIndex)
  const nextSection = afterHeader.search(/\n## [^\n]+/)
  const sectionEnd =
    nextSection === -1 ? intakeText.length : headerIndex + nextSection

  const before = intakeText.slice(0, headerIndex)
  const after = intakeText.slice(sectionEnd)
  return `${before}${marker} (portfólio — mesmo nicho)\n\n${slotsBlock}\n\n---${after.startsWith('\n') ? '' : '\n'}${after.replace(/^\n---\n?/, '\n')}`
}

function buildPortfolioBlock(projects, currentNicho, parentDir, generatedAt) {
  const lines = [
    PORTFOLIO_START,
    '',
    `> Gerado em ${generatedAt} por \`npm run intake:portfolio\` a partir de projetos em \`www/\`.`,
    `> **Revise:** desmarque irrelevantes; mantenha marcados os do mesmo nicho ou com chrome parecido.`,
    '',
    'Não parecer com estes projetos meus:',
    '',
  ]

  for (const project of projects) {
    const siblingRoot = path.join(parentDir, project.folderName)
    const siblingNicho = extractNicho(siblingRoot)
    const checked =
      currentNicho && nicheMatches(currentNicho, siblingNicho) ? 'x' : ' '
    const label = project.folderName === project.displayName
      ? project.folderName
      : `${project.folderName} (${project.displayName})`
    lines.push(`- [${checked}] *${label}* — ${project.summary}`)
  }

  if (projects.length === 0) {
    lines.push('- [ ] _(nenhum outro projeto com site.config.json em www/)_')
  }

  lines.push(
    '',
    'Componentes específicos a **não** reutilizar _(opcional — o brief-architect deriva da lista acima)_:',
    '',
    '- Cursor:',
    '- Header / nav:',
    '- Hero:',
    '- Footer:',
    '',
    PORTFOLIO_END,
  )

  return lines.join('\n')
}

function replaceAntiCloneSection(intakeText, portfolioBlock) {
  const sectionHeader = '## Anti-clone'

  if (intakeText.includes(PORTFOLIO_START) && intakeText.includes(PORTFOLIO_END)) {
    const start = intakeText.indexOf(PORTFOLIO_START)
    const end = intakeText.indexOf(PORTFOLIO_END) + PORTFOLIO_END.length
    return `${intakeText.slice(0, start)}${portfolioBlock}${intakeText.slice(end)}`
  }

  const headerIndex = intakeText.indexOf(sectionHeader)
  if (headerIndex === -1) {
    throw new Error('Seção ## Anti-clone não encontrada em docs/INTAKE.md')
  }

  const afterHeader = intakeText.slice(headerIndex)
  const nextSection = afterHeader.search(/\n## [^\n]+/)
  const sectionEnd =
    nextSection === -1 ? intakeText.length : headerIndex + nextSection

  const before = intakeText.slice(0, headerIndex)
  const after = intakeText.slice(sectionEnd)

  return `${before}## Anti-clone (obrigatório — portfólio em www/)\n\n${portfolioBlock}\n\n---${after.startsWith('\n') ? '' : '\n'}${after.replace(/^\n---\n?/, '\n')}`
}

export function syncPortfolioIntake(destRoot, options = {}) {
  const projectRoot = path.resolve(destRoot)
  const parentDir = options.parentDir || path.resolve(projectRoot, '..')
  const currentFolder = options.currentFolder || path.basename(projectRoot)
  const sameNiche = options.sameNiche ?? false

  const intakePath = path.join(projectRoot, 'docs', 'INTAKE.md')
  if (!fs.existsSync(intakePath)) {
    throw new Error(`INTAKE não encontrado: ${intakePath}`)
  }

  const currentNicho = extractNicho(projectRoot)
  let projects = listPortfolioProjects(parentDir, currentFolder)

  if (sameNiche && currentNicho) {
    projects = projects.filter((project) => {
      const siblingRoot = path.join(parentDir, project.folderName)
      return nicheMatches(currentNicho, extractNicho(siblingRoot))
    })
  }

  const generatedAt = new Date().toISOString().slice(0, 10)
  const portfolioBlock = buildPortfolioBlock(projects, currentNicho, parentDir, generatedAt)
  const slotsBlock = buildSlotsBlock(projects, currentNicho, parentDir, generatedAt)
  const intakeText = readText(intakePath)
  let updated = replaceAntiCloneSection(intakeText, portfolioBlock)
  updated = replaceSlotsSection(updated, slotsBlock)

  fs.writeFileSync(intakePath, updated, 'utf8')

  return {
    intakePath,
    projectCount: projects.length,
    currentNicho: currentNicho || '(não definido no INTAKE/LOOP)',
  }
}

function main() {
  const { destRoot, sameNiche } = parseArgs(process.argv.slice(2))

  try {
    const result = syncPortfolioIntake(destRoot, { sameNiche })
    console.log(`Anti-clone atualizado: ${result.intakePath}`)
    console.log(`Projetos listados: ${result.projectCount}`)
    console.log(`Nicho atual: ${result.currentNicho}`)
    if (result.projectCount > 0) {
      console.log('Revise os [x] em docs/INTAKE.md antes do brief-architect.')
    }
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
}
