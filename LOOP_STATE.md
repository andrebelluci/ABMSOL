# Loop State

Atualize este arquivo ao fim de cada sessão de agente.

## Projeto

- **Nome:** ABMSOL — Soluções Digitais (nome em verificação INPI/domínio)
- **Slug:** abmsol
- **Nicho:** serviços (estúdio + suporte de TI)
- **Brief aprovado em:** 2026-10-22 (BRIEF + rodada 2)

## Status atual

| Etapa | Status | Data |
|-------|--------|------|
| Plano aprovado (`docs/PLAN.md`) | ✅ | 2026-10-20 |
| Fase 0 scaffold + INTAKE | ✅ | 2026-10-20 |
| BRIEF gerado | ✅ | 2026-10-20 |
| BRIEF revisado | ✅ aprovado com ressalvas menores (`docs/BRIEF-REVIEW.md`) | 2026-10-20 |
| BRIEF aprovado (humano) | ✅ BRIEF e rodada 2 aprovados (P15) | 2026-10-22 |
| Limpeza de integridade (`docs/qa/LIMPEZA-INTEGRIDADE.md`) | ✅ aplicada | 2026-10-22 |
| Pré-Fase 00 (`docs/qa/PRE-FASE00.md`) | ✅ gate liberado | 2026-10-22 |
| BRIEF revisado (rodada 2, itens A–K — `docs/CHANGELOG-REVISAO.md`) | ✅ aplicado, **aguardando aprovação do André** | 2026-10-20 |
| Fase 00 upgrade Next 16 | ✅ Next 16.4.2 + React 19.2.9; `docs/qa/baseline-next16.md` | 2026-10-22 |
| Fase 01 design-system | ✅ tokens, tipo D1, primitivos, `/_design`; wordmark A/B aguarda o André | 2026-10-22 |
| Fase 02 chrome | ✅ header, Trail Index, rodapé, Lenis condicional, fade de entrada | 2026-10-26 |
| Fase 03a hero + Sol-Índice (camadas 0/1, lançamento) | ⬜ | |
| Fase 04 sections-home | ⬜ | |
| Fase 05 inner-pages | ⬜ | |
| Fase 06 seo-perf-qa-deploy (fecha o lançamento) | ⬜ | |
| Fase 03b cursor-nó v2 + sol camada 2 (pós-lançamento) | ⬜ | |
| Fase 07 pós-lançamento | ⬜ | |

## Fase 0 — o que foi feito

- `npm install`; removidas `three`, `@types/three`, `axios`, `react-hook-form`, `zod`, `vanilla-tilt` (D9). `@playwright/test` não instalado (D10).
- Removidos: `lib/three.ts`, `types/vanilla-tilt.d.ts`, `lib/events.ts`, `lib/structure.ts`, `components/layout/LoadingScreen.tsx`, `WhatsAppChat.tsx`, `components/legal/CookieConsent.tsx`; limpos `AppShell`, `lib/legal.ts`.
- Nome da marca só em `site.config.json` (`lib/site.ts` → `lib/brand.ts`, `lib/contact.ts`); WhatsApp `5517991446829`; `noindex` no layout até o domínio final (D7).
- Criado `.eslintrc.json` (`next/core-web-vitals`) para o lint rodar sem prompt.
- Regras: `abmsol-design.mdc`, `abmsol-motion-perf.mdc`, `abmsol-content.mdc`.
- `docs/INTAKE.md`, `docs/BRIEF.md`, `docs/DIFFERENTIATION.md`, `docs/phases/01..06`, `docs/assets/references/REFERENCE-LOG.md`, `docs/BRIEF-REVIEW.md`.
- `npm run build` e `npm run lint` verdes.

## Bloqueios (precisa humano)

Lista completa em `docs/INTAKE.md` § Pendências (P1 a P14). Bloqueantes agora:

- ~~P1 logo em vetor~~ recebido (20/10); resta aprovar a versão simplificada na Fase 01 · **P2** fotos do André · **P3** texto de "Quem assina" e diferenciais públicos · **P9** referências do André · **P10** definição do diagnóstico gratuito.
- Antes da fase 04/05: P6 (checks reais), P7 (serviços), P8 (3 conceitos), P13 (FAQ), P14 (autorização de Bárbara).
- Antes da fase 06/07: P4 (e-mail e dados legais), P5 (revisão jurídica), P11 (Umami), P12 (nome/domínio).
- ~~Pendência técnica `scene2d.dll`~~ → em quarentena (`D:\andre\quarentena\`). `design-taste-frontend` **não será reinstalada**; `gpt-taste` **vetada** (quarentena); `gsap-core`, `gsap-scrolltrigger` e `vercel-react-best-practices` estão **fora de uso**. **Reinstalar qualquer skill é pendência futura, só com aprovação do André após verificar fonte e hash.**
- **P22:** AllSucos/LimaCitrus **não** servem de fonte para os projetos conceito (P8) sem auditoria.

## Decisões do André (20/10/2026)

- Ambição visual elevada para **awwwards** (teto técnico mantido: SVG + GSAP + canvas 2D).
- Nav mobile "Trail Index sheet" mantida, com execução de nível Awwwards.
- Tipografia (incluindo Rajdhani): decisão sobre o wordmark **pendente do André** (A: Rajdhani em texto vivo · B: SVG em curvas, padrão), com amostras e KB reais na Fase 01.

## Rodada de revisão 2 (itens A–K) — resumo

- **Ordem de execução:** 00 → 01 → 02 → 03a → 04 → 05 → 06 (lançamento) → 03b → 07.
- Next 14 → **16** (fase 00; se bloquear, parar e avisar, nunca voltar para a 14). Cursor-nó v2 (F1–F9) e sol camada 2 saem do lançamento (03b); atributos `data-cursor-*` desde 02/04/05.
- Wordmark em SVG inline; Rajdhani fora do `next/font` e do orçamento por padrão; header usa `mark-simple` ≥ 28–32 px.
- Sol `aria-hidden`/sem tab stop; fade de entrada por `template.tsx`; Trail Index sheet com "Menu"/`inert`/oculta `WhatsAppBar`; "LGPD" → "boas práticas de privacidade" (nunca prometer conformidade legal).
- Nomes reais de outros clientes trocados por codinomes nos docs do repositório (mapa entregue no chat, fora do repo).

### Status das pendências P15 a P21 (decisões de 22/10/2026)

| ID | Status |
|----|--------|
| P15 | ✅ BRIEF e rodada 2 aprovados. **Gate condicional (22/10):** Fase 00 só depois dos passos 1–6 e da revisão de `docs/qa/PRE-FASE00.md` |
| P16 | ⏳ Amostras em `/_design`: **A** Rajdhani latin 8,8 KB · **B** SVG em curvas 3,2 KB (padrão). A escolha final é do André |
| P17 | ✅ Confirmado: cursor v2 e camada 2 do sol na 03b (pós-lançamento) |
| P18 | 👤 Ação do André (Google Meu Negócio); sem ação do agente |
| P19 | 👤 Ação do André (Instagram); só entra no rodapé quando existir e tiver conteúdo |
| P20 | ✅ Repositório **privado**; sem limpeza dos docs herdados agora. **Não publicar sem uma cópia saneada** |
| P21 | ✅ `scene2d.dll` em quarentena; `design-taste-frontend` NÃO será reinstalada; `gpt-taste` vetada e em quarentena; skills GSAP corrompidas fora de uso; reinstalar qualquer skill só com aprovação do André após verificar fonte e hash |
| P22 | ⏳ **Não usar AllSucos/LimaCitrus como fonte dos projetos conceito (P8)** sem auditoria (dano disseminado: 48 arquivos, BRIEF/INTAKE corrompidos, pastas estranhas em `docs/phases/`) |

## Ferramenta de validação

- 22/10/2026: André autorizou o **Cursor Browser (MCP `cursor-ide-browser`)** para toda validação visual, de teclado, de contraste e de desempenho (CDP: `Emulation.setCPUThrottlingRate`, `Runtime.evaluate`, capturas). Nenhum `@playwright/test`; nada instalado.

## Próximo passo

1. Fase 02 concluída na branch `fase-00-next16`. Chrome em todas as rotas; `/servicos/` e `/sobre/` caem no 404 da marca até a fase 05. Prova da fase 01 segue em `/_design` (noindex).
2. **P16 ainda é do André:** A (Rajdhani, 8,8 KB latin) ou B (curvas, 3,2 KB, padrão já no header). A marca simplificada em 32 px deixa os nós com cerca de 2 px — aprovação visual pendente.
3. Quando liberar: `/phase-executor` em `docs/phases/03a-hero.md`. Depois 04, 05, 06 e, pós-lançamento, 03b. Não antecipar o cursor-nó.
