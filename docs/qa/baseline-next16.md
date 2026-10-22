# Baseline Next.js 16 — Fase 00

> Branch `fase-00-next16`. Medido em 22/10/2026 após `npm run build` (Turbopack, 28 s) e `npm run lint` (ESLint CLI). Tag `baseline-pre-fase00` **não** foi movida.
> **Validação manual do André:** Lighthouse (Perf, A11y, BP, SEO, INP) e amostragem de pixels. Esta fase não depende desses dois; ficam para as fases 03a e 06.

## Versões exatas instaladas

| Pacote | Versão no `package.json` | Como foi escolhida |
|--------|--------------------------|--------------------|
| Node | v22.16.0 | já instalado (≥ 20.9) |
| next | **16.4.2** | última 16 estável no registry (16.5 só existe como canary; não usada) |
| react / react-dom | **19.2.9** | último patch 19.2 (a fase pede React 19.2; 19.3 existe e não foi adotado) |
| eslint | **10.13.0** | `eslint-config-next@16.4.2` pede `eslint >= 9`. A 9.39.5 é a tag `maintenance` e o npm a marca como sem suporte. Instalada a 10.13.0 por versão exata, sem `@latest` |
| eslint-config-next | **16.4.2** | alinhada ao Next |
| @types/react | **19.2.18** | último 19.2 |
| @types/react-dom | **19.2.7** | último 19.2 |
| typescript | 5.9.3 (resolvida; `package.json` continua `^5.4.5`) | não foi alvo do upgrade |
| gsap | 3.15.0 | build ok, sem bump |
| framer-motion | 12.40.0 | peer opcional React 19; build ok |
| lenis | 1.3.23 | build ok |
| tailwindcss | 3.4.19 | PostCSS; build ok. **Não** subiu para a 4 |
| lucide-react | 0.475.0 | peer inclui React 19; build ok |
| react-markdown | 10.1.0 | build ok |
| sharp | 0.34.5 | `require('sharp')` ok; `prebuild` gerou as imagens |

Instalação: `npm install --save-exact --ignore-scripts` (uma tentativa falhou com `ECONNRESET`; a segunda concluiu).

## Codemod

`@next/codemod@16.4.2` (versão fixa, não `@canary` nem `@latest`).

1. `--dry` + `--print` em `app`: 1 arquivo, 0 erros. Diff só em `app/blog/[slug]/page.tsx`: `params` vira `Promise<{ slug: string }>`; `generateMetadata` e a página passam a `async` e fazem `await props.params`.
2. Aplicado com `--force` porque o working tree já tinha o `package.json` do install (o codemod recusa árvore suja). Nenhum outro arquivo mudou.

## `components.json` — registries

O BRIEF deixa "Registries shadcn" vazio e **veta** Cult UI, Skiper, Unlumen e React Bits.

| | Antes | Depois |
|--|-------|--------|
| Registries | `@cult-ui`, `@skiper-ui`, `@unlumen-ui`, `@reactbits-starter`, `@reactbits-pro` | chave `registries` **removida** |
| Bearer | `SKIPER_LICENSE_KEY`, `UNLUMEN_LICENSE_KEY`, `REACTBITS_LICENSE_KEY` | nenhum |
| Mantido | `$schema`, style, rsc, tsx, tailwind, aliases, `iconLibrary: lucide` | igual |

## Outras mudanças de código

- `lint`: `next lint` → `eslint .`
- `.eslintrc.json` removido; criado `eslint.config.mjs` (`eslint-config-next/core-web-vitals`, ignore `.next`, `out`, `node_modules`, `next-env.d.ts`)
- `app/layout.tsx`: `data-scroll-behavior="smooth"` no `<html>`. O CSS tem `scroll-behavior: smooth`; o Next 16 deixou de sobrescrever isso na navegação. O atributo é o mecanismo oficial para o Next continuar tratando a rolagem da rota. Lenis segue com `scroll-behavior: auto` em `html.lenis`.
- `scripts/new-client.mjs`: dois crases dentro de um template literal quebravam o parse do ESLint (e o arquivo). Escapados como nas linhas vizinhas. Sem isso o lint não fecha.
- `tsconfig.json`: o Next reescreveu `jsx` para `react-jsx`, `target` para `ES2017` e incluiu `.next/dev/types/**/*.ts`.
- `next-env.d.ts`: gerado de novo pelo Next 16 (imports de `.next/types`).

## Bundle (gzip, `out/`)

Build Turbopack, **sem** `--webpack`. `out/index.html` existe. `trailingSlash` preservado (`out/blog/index.html`, `out/politica-de-privacidade/index.html`). 7 HTML. Tempo de build: **28 s**.

| Rota | JS gzip | CSS gzip |
|------|---------|----------|
| `/` | 220,2 KB | 3,8 KB |
| `/blog/` | 223,4 KB | 3,8 KB |
| `/blog/__blog_disabled__/` | 223,4 KB | 3,8 KB |
| `/politica-de-privacidade/` | 223,4 KB | 3,8 KB |
| `/termos-de-uso/` | 223,4 KB | 3,8 KB |
| `/404` e `/_not-found` | 220,2 KB | 3,8 KB |

Total no disco de `out/_next/static`: JS 696,6 KB (223,7 KB gzip, 12 arquivos) + CSS 19,0 KB (3,8 KB gzip). Quase tudo é compartilhado (React + Next); ainda não há sol, cursor nem seções.

## `package-lock.json`

- Hosts em `resolved`: **só** `registry.npmjs.org` (559 URLs).
- Pacotes com `hasInstallScript`: `fsevents` (opcional, macOS), `sharp`, `unrs-resolver`.
- `--ignore-scripts` **não** quebrou o build nem o lint: o binário do `sharp` desta máquina já existia; o ESLint rodou. Nenhum pacote exigiu autorização de script **nesta** máquina. Num clone limpo, `sharp` e `unrs-resolver` precisam do script de instalação — pedir autorização antes de rodar sem `--ignore-scripts`.

## `npm audit` (só relatório; nada foi corrigido)

15 vulnerabilidades: 4 moderadas, 11 altas, 0 críticas.

O `npm audit fix` sugerido para `eslint-config-next` aponta **14.2.35**. Isso **voltaria para o Next 14** e não foi aplicado. O fix do Tailwind aponta a **4.3.3** (fora desta fase). `sharp` sugere 0.35.5 (libvips/libheif/librsvg); não atualizado. Demais: `js-yaml`, `braces`/`micromatch`/`chokidar`/`fast-glob` (via Tailwind e ESLint), `browserslist`, `postcss-selector-parser`, `argparse`/`sprintf-js`, `source-map-js`, `baseline-browser-mapping`.

## QA static export

| Check | Resultado |
|-------|-----------|
| `npm run build` | PASS (exit 0, Turbopack, export estático) |
| `npm run lint` | PASS (ESLint 10, 0 problemas) |
| `out/index.html` | existe |
| `trailingSlash` | pastas com `index.html` |
| GSAP, Framer Motion, Lenis, Tailwind, Lucide, react-markdown, sharp | entram no build sem erro de peer fatal |
| Varredura de bytes de controle no ABMSOL | **0 arquivos** |
| Baseline de instruções | **45/45** hashes iguais. SHA-256 do arquivo: `211b60eea0b02b20cf77670350a5dfbe895278040d6090c59da94c419933a91b` |
| Home no browser | conferida no `out/` servido localmente (Cursor Browser) |
| Lighthouse / pixels | **validação manual do André** (não se aplica como bloqueio desta fase) |

## O que não foi feito

- Fase 01 não iniciada.
- Sem remoto, sem push, tag intacta.
- `npm audit fix` não rodou.
