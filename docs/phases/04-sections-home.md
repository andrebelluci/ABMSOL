# Fase 04 — Seções da home

> Executar com `/phase-executor`. Ler `docs/BRIEF.md` (Páginas/Home, Copy Tone, NEVER USE), `docs/DIFFERENTIATION.md`, este arquivo e `AGENTS.md`. Regra ativa: `abmsol-content`.
> Pré-requisito: fases 01 a 03. **Uma seção por bloco; não implementar tudo num único prompt.**

## Escopo

| Seção | Arquivo | Conteúdo (`lib/content/`) |
|-------|---------|----------------------------|
| 2 Verificado antes de entregar | `components/sections/Verified.tsx` | `verified.ts` (só checks confirmados, P6) |
| 3 Serviços | `components/sections/Services.tsx` | `services.ts` (P7), `ServiceRow` assimétrico |
| 4 Projetos conceito | `components/sections/Concepts.tsx` | `concepts.ts` (P8), `ConceptCard` com rótulo |
| 5 Como trabalhamos | `components/sections/Process.tsx` | `process.ts`, `ProcessNode` (pendente → validado) |
| 6 Plano mensal | `components/sections/Plan.tsx` | `plan.ts` |
| 7 Quem assina | `components/sections/Founder.tsx` | `founder.ts` (P2/P3) |
| 8 FAQ | `components/sections/Faq.tsx` | `faq.ts` (5 perguntas, P13), `<details name="faq">` |
| 9 CTA final | `components/sections/FinalCta.tsx` | `cta.ts` |
| Composição | `app/page.tsx` | Compor seções abaixo do hero |

**Não tocar:** hero (03), chrome (02), páginas internas (05).

## Itens que dependem do André (não inventar)
- P6 (checks reais), P7 (descrição dos serviços), P8 (conceitos), P2/P3 (foto e texto), P13 (FAQ), P10 (diagnóstico).
- Se um item **não** chegou: a seção é entregue **somente** com o conteúdo já confirmado no BRIEF (estrutura, rótulos, os 3 grupos de serviço e o plano mensal definidos no brief). Seção sem insumo suficiente fica **fora** da home (não renderizar placeholder) e entra na lista de pendências em `LOOP_STATE.md`.

## Motion (do BRIEF)

| Seção | Trigger / comportamento |
|-------|-------------------------|
| Verificado | itens revelados uma vez, 450 ms `power3.out`, `start: 'top 85%'` |
| Serviços | linhas revelam em sequência curta; hover = cor + clip-path (sem scale) |
| Projetos | card revela uma vez; hover troca cor da borda |
| Como trabalhamos | **nós passam de dourado a menta** conforme o scroll (scrub leve); sem pin no mobile |
| FAQ | `<details>` nativo, zero JS |
| CTA final | a `Trail` aterrissa no núcleo; botão WhatsApp |

## Critérios de aceite
- [ ] **Cursor (contrato):** todo elemento interativo e seção tem `data-cursor` / `data-cursor-label` / `data-cursor-theme` (e `data-cursor-avoid` em blocos de texto longo) conforme DIFFERENTIATION F3; nenhum import de código de cursor (`rg 'components/cursor' app components` = 0; o cursor só entra na 03b).
- [ ] Nenhum texto fora de `lib/content` ou dos componentes finais.
- [ ] `rg -i 'lorem|placeholder|cliente x'` = 0 resultados.
- [ ] ≤ 200 palavras por seção, ≤ 3 blocos por seção; nunca duas seções do mesmo tipo seguidas.
- [ ] FAQ = 5 perguntas, 1 aberta; zero JS.
- [ ] **Exatamente 1 CTA primário por viewport** em 375, 768 e 1280 px.
- [ ] Cada `ConceptCard` exibe "Projeto conceito".
- [ ] Nós do processo acendem no scroll; a trilha conecta todas as seções.
- [ ] `prefers-reduced-motion` em cada seção; links internos com trailing slash.
- [ ] Sem carrossel como container principal; sem grid 3×1 de ícones.

## Skills
cinematic-scroll (trilha), rontend-design. ScrollTrigger: documentação oficial do GSAP (gsap.com/docs: `gsap.context`, `matchMedia`, ScrollTrigger, `useGSAP`).

## QA
`npm run build` · `npm run lint` · scroll completo da home em 375/768/1280 · `/qa-static-export`

## Referências
- `docs/BRIEF.md` (Home — blocos, Copy Tone, Diagnóstico gratuito)
- `docs/DIFFERENTIATION.md`
