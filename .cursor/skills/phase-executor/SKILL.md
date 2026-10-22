---
name: phase-executor
description: >-
  Implementa UMA fase de docs/phases/*.md por sessão. Lê BRIEF e
  DIFFERENTIATION, não o INTAKE. Use após brief aprovado pelo humano.
---

# Phase Executor

Implementador disciplinado. Executa **uma única fase** por invocação.

## Pré-requisitos

- `docs/BRIEF.md` aprovado pelo humano (`LOOP_STATE.md` indica aprovação)
- Usuário indicou qual fase (ex: `docs/phases/02-chrome.md`)

## Entradas (nesta ordem)

1. Fase solicitada em `docs/phases/XX-*.md`
2. `docs/BRIEF.md`
3. `docs/DIFFERENTIATION.md`
4. `AGENTS.md`
5. Seção **AI Tools** do `docs/BRIEF.md` (se existir) — só usar MCP/registries listados
6. `design-system/MASTER.md` se existir

**Não leia** `docs/INTAKE.md` — evita deriva de escopo.

## Skills complementares

| Fase | Invocar também |
|------|----------------|
| 01 | `ui-ux-pro-max` se MASTER.md ausente; regras anti-slop do BRIEF (tokens, layout) |
| 02–04 | `gsap-next-motion`, `gsap-react`, `gsap-scrolltrigger`; `cinematic-scroll` se pin/narrativa no brief |
| 02–04 | Apenas ferramentas listadas como **Aprovadas** na seção **AI Tools** do BRIEF (nenhum MCP/registry de terceiros neste projeto) |
| 03–05 | Seção `Copy Tone` e NEVER USE do BRIEF — textos em componentes e `lib/*.ts` (anti-IA) |
| 06 | `qa-static-export`, `vercel-react-best-practices` |

## Regras de implementação

### Fase 02 — Chrome (crítica)

Os componentes em `components/layout/` são **scaffold**. Você deve:

- Reescrever `CustomCursor.tsx` conforme `DIFFERENTIATION.md`
- Estilizar scrollbar em `globals.css` (webkit + `scrollbar-color`)
- Reescrever `Header.tsx` / menu mobile conforme brief
- Reescrever `Footer.tsx`
- Adaptar `LoadingScreen.tsx`

Não entregue o cursor dourado/copper padrão de outros projetos sem spec no DIFFERENTIATION.

### Fase 03 — Hero

- Implementar **Hero Composition** do BRIEF — não reinterpretar archetype como carrossel genérico
- Se a fase cita referência visual (screenshot/URL), validar impacto no browser antes de sugerir fase 04
- Anti-padrões: ver `docs/prompts/hero-archetypes.md`

### Geral

- Match conventions existentes: `@/`, `cn()`, `lib/gsap.ts`, `site.config.json`
- `'use client'` só onde necessário
- `prefers-reduced-motion` em toda animação
- Cores via CSS variables — sem hardcode
- Uma fase = um PR mental; não antecipe fases futuras

### Copy em componentes (fases 03–05)

Siga a seção `Copy Tone` e NEVER USE do BRIEF:

- Sem clichês de IA nos textos renderizados
- CTAs e headlines conforme BRIEF, não placeholders genéricos
- Contadores mock: números orgânicos salvo se o intake pedir redondos de marca

## Ao terminar

1. Rodar `npm run build` e `npm run lint`
2. Corrigir erros antes de encerrar
3. Sugerir ao usuário: `/qa-static-export`
4. Atualizar `LOOP_STATE.md` — marcar fase concluída

## Se build falhar

Corrija dentro do escopo da fase. Não expanda escopo.

## O que NÃO fazer

- Implementar múltiplas fases numa sessão
- Ignorar DIFFERENTIATION
- Adicionar dependências sem necessidade
- Copiar seções inteiras de Vitta/Pelle/DocePele
