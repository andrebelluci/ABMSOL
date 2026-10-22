# Fase 00 — Upgrade para Next.js 16

> Executar **antes da Fase 01**, com `/phase-executor`. Ler este arquivo, `AGENTS.md` e `docs/BRIEF.md` (Tech Stack). Guia oficial: https://nextjs.org/docs/app/guides/upgrading/version-16
> **Justificativa:** o Next 14 está fora de suporte (EOL 26/10/2025), o 15 sai de suporte em 21/10/2026 e o 16 é o Active LTS. Subir agora evita construir 7 fases sobre uma base sem patches.
> **Regra:** se algo bloquear, **parar e avisar o André. NÃO voltar para a 14.**

## Pré-requisitos (conferidos na documentação oficial do upgrade)

| Requisito | Mínimo | Ambiente atual |
|-----------|--------|----------------|
| Node.js | **20.9.0** (Node 18 deixa de ser suportado) | v22.16.0 (ok) |
| TypeScript | **5.1.0** | `^5.4.5` (ok) |
| React | **19.2** (App Router do Next 16 usa React 19.x) | 18.3.1 → **atualizar** `react`, `react-dom`, `@types/react`, `@types/react-dom` |
| Navegadores | Chrome/Edge 111+, Firefox 111+, Safari 16.4+ | registrar no QA |
| Vercel | definir Node ≥ 20.9 no projeto (Settings → Node.js Version) | conferir no deploy |

## Escopo

| Item | Ação |
|------|------|
| `package.json` | `next`, `react`, `react-dom`, `@types/react`, `@types/react-dom`, `eslint-config-next` para a 16; ajustar scripts: `next lint` foi **removido**, usar ESLint CLI (`eslint .`) |
| ESLint | Migrar `.eslintrc.json` para **flat config** (`eslint.config.mjs`); avaliar a versão do ESLint compatível com `eslint-config-next` 16 |
| `next.config.js` | **Manter** `output: 'export'`, `trailingSlash: true`, `images.unoptimized`; revisar flags removidas/renomeadas; Turbopack é o padrão em `dev` e `build` (se houver incompatibilidade, usar `--webpack` e registrar o motivo) |
| Async Request APIs | `params`/`searchParams` assíncronos: rodar o codemod `next-async-request-api` e ajustar `app/blog/[slug]/page.tsx` e demais rotas dinâmicas |
| Scroll | Next 16 **não sobrescreve mais** `scroll-behavior` na navegação; se o CSS usar `scroll-behavior: smooth`, avaliar `data-scroll-behavior="smooth"` no `<html>` (conviver com Lenis) |
| Imagens | `images.unoptimized` mantém o fluxo atual; sem mudança de `minimumCacheTTL`/`qualities` necessária |
| Compatibilidade (validar, não assumir) | **GSAP + ScrollTrigger**, **Framer Motion 12** (React 19), **Lenis**, **Tailwind 3** (PostCSS), **lucide-react 0.475** (peer React 19), **react-markdown 10**, **sharp**; registrar versão e resultado de cada um |
| Scripts do projeto | `generate-sitemap.js` e `prebuild` continuam funcionando com o novo `build`; `deploy:vercel` intacto |
| Baseline | Registrar em `docs/qa/baseline-next16.md`: tamanho do bundle (JS por rota e compartilhado, gzip), CSS, tempo de build, número de páginas geradas, versões instaladas |

**Não tocar:** design, componentes visuais, conteúdo (fases 01 a 06).

## Critérios de aceite
- [ ] `next --version` = 16.x; `react` = 19.x; `node -v` ≥ 20.9.
- [ ] `npm run build` verde, **export estático** em `out/` (`out/index.html` existe), `trailingSlash` preservado.
- [ ] `npm run lint` verde pelo ESLint CLI (sem `next lint`).
- [ ] GSAP, Framer Motion, Lenis e Tailwind validados (build + dev sem erro de peer/hydration); resultado registrado por pacote.
- [ ] `/qa-static-export` executado e anexado.
- [ ] **Baseline de bundle registrado** em `docs/qa/baseline-next16.md` (referência para os tetos do BRIEF).
- [ ] `docs/BRIEF.md`, `AGENTS.md` e `LOOP_STATE.md` citam Next 16.

## Se algo bloquear
Parar, descrever o erro, o pacote e o motivo, e **avisar o André**. Não reverter para a 14 e não ficar na 15 (sai de suporte em 21/10/2026).

## Skills
`qa-static-export`; guia oficial de upgrade do Next 16.

## QA
`npm run build` · `npm run lint` · `/qa-static-export` · abrir `npm run start` e conferir a home.

## Referências
- `docs/BRIEF.md` (Tech Stack) · `docs/PLAN.md` §4.1
