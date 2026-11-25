# Fase 03a — Hero e Sol-Índice (camadas 0 e 1) — LANÇAMENTO

> Executar com `/phase-executor`. Ler `docs/BRIEF.md` (Hero Composition, Animações), `docs/DIFFERENTIATION.md`, este arquivo e `AGENTS.md`.
> Pré-requisito: fases 00, 01 e 02.
> **Divisão (justificativa):** a antiga Fase 03 juntava intro, camadas, trilha, colapso e interação por ponteiro. A interação desktop (camada 2) e o cursor-nó v2 foram para a **03b** (pós-lançamento), para o lançamento não depender da peça mais arriscada. A 03a entrega o site completo com camadas **0** (estática) e **1** (celular).

## Escopo

| Arquivo | Ação |
|---------|------|
| `components/sections/Hero.tsx` | **Criar** (Server Component): h1, subtítulo, CTA primário, link secundário; sol como filho |
| `components/sun/SunCircuit.tsx` | **Criar** (client): SVG inline do sol; intro de traço; **sem** energização por ponteiro (vem na 03b); `aria-hidden="true"`, nós sem tab stop |
| `components/sun/Trail.tsx` | **Criar** (client): trilha vertical fina em scrub (substitui barra de progresso) |
| `components/sun/useSunTier.ts` | **Criar**: decide camada **0/1** (reduced-motion, `saveData`, largura); a camada 2 e a sonda de FPS ficam para a 03b (deixar o tipo preparado) |
| `components/sun/sun-geometry.ts` | Consumir a geometria da fase 01 |
| `components/layout/Header.tsx` | Ligar o colapso do sol grande para o `mark-simple` do header (**troca ou cross-fade**, só `transform`/`opacity`) |
| `lib/gsap.ts` | Registro e helpers com `gsap.context()` / `gsap.matchMedia()`; ticker único compartilhado |
| `app/page.tsx` | Renderizar `<Hero />` + âncoras vazias das seções (sem conteúdo inventado) |

**Não tocar:** seções 2 a 9 (fase 04), páginas internas (05), `components/cursor/` (03b).

## Hero Composition (do BRIEF)

```
- Archetype: typographic-statement (slot B) + Sol-Índice
- Layout: assimétrico; h1 em 7/12 colunas; sol sangrando pela direita/baixo; h1 sobrepõe o sol
- Elemento assinatura: sol de circuitos fiel à logo (anel, 4 raios cardeais = 4 itens da nav, 4 ramos diagonais, 20 nós)
- Desktop: 2 protagonistas (headline + sol); CTA WhatsApp + "Como trabalhamos →"
- Mobile: sol menor no canto inferior direito, intro curta, 2–3 nós com pulso CSS
- Explicitly NOT: split 2 col; centralizado + botão; foto/vídeo; carrossel; WebGL; glow branco; só fade-in
```

### Layout (ASCII)

```
┌────────────────────────────── 100dvh ─────────────────────────────────┐
│ [Header: marca · 4 links · WhatsApp]                                   │
│  01 ─ ESTÚDIO DE TECNOLOGIA · São José do Rio Preto (SP)             ╭─·──·       │
│  Tecnologia que funciona.                              ──◉═══●═══●─   │
│  Do suporte do dia a dia ao site premium.   (h1 > sol)   ╰─·──·       │
│  Site, sistema e suporte com um parceiro só.      (sol sangra à dir.) │
│  [ Falar no WhatsApp ]   Como trabalhamos →                            │
└────────────────────────────────────────────────────────────────────────┘
```

### Motion (03a)

| Momento | Comportamento |
|---------|---------------|
| Entrada 0–1,8 s | h1/subtítulo já visíveis (SSR). Pós-paint: trilhas se desenham do núcleo aos nós (`stroke-dashoffset`, ≤ 1,6 s, `power3.out`); nós acendem dourado em sequência; núcleo pulsa uma vez |
| Scroll | o sol faz cross-fade para o `mark-simple` do header; raios viram a `Trail` vertical, um nó por seção |
| Camada 1 (celular) | intro curta, trilha em scrub simples, sem ponteiro, 2–3 nós com pulso CSS (pausa fora da tela) |
| Camada 0 | sol e trilha estáticos, já desenhados (sem JS, reduced-motion, `saveData`) |
| **Fora da 03a** | energização por ponteiro, pulso menta até o nó, rótulos mono, cursor-nó, sonda de FPS → **03b** |

## Nível Awwwards (ambição `awwwards`)
- Coreografia do traço cronometrada, colapso do sol para o header sem salto.
- O pacote de interação desktop (03b) acontece depois do lançamento e antes da submissão ao Awwwards. Sem WebGL e sem pin pesado.

## Regras anti-hero-boba
- [ ] Sem `lg:grid-cols-2` split institucional; o sol é elemento assinatura que **cruza** a grade.
- [ ] Sem carrossel, sem dots de paginação, sem hero centralizada.
- [ ] CTA primário não compete com o sol (1 CTA primário por viewport).
- [ ] Motion tem coreografia nomeada (traço → nós → pulso), não só fade.
- [ ] Sem imagem na hero (LCP = h1).

## Critérios de aceite
- [ ] LCP = h1 e ≤ 2,0 s; CLS ≤ 0,02 (medição no Cursor Browser (PerformanceObserver: LCP, CLS, long tasks; viewport 375 px, CPU 4×, `out/` servido localmente) + **Lighthouse/PageSpeed manual do André**; ver docs/qa/VALIDACAO-FERRAMENTAS.md).
- [ ] **Contraste do h1 ≥ 4,5:1 na PIOR posição das trilhas** (inclusive durante a intro e nó aceso) em **375, 768, 1280 e 1920 px**. Método: cálculo analítico + captura no Cursor Browser + `getComputedStyle`. Sem amostragem programática de pixels compositados (ver `docs/qa/VALIDACAO-FERRAMENTAS.md`); o André confirma com o conta-gotas se o caso for duvidoso. Se falhar: máscara SVG na zona do texto.
- [ ] JS do sol ≤ 25 KB gzip, carregado lazy após o primeiro paint (`dynamic import` + `requestIdleCallback`).
- [ ] Sem JS e com `prefers-reduced-motion`: sol estático completo e conteúdo legível.
- [ ] Intro ≤ 1,8 s; nenhum frame > 50 ms no intro (inclusive com CPU 4× e 6× via `Emulation.setCPUThrottlingRate`).
- [ ] Só `transform`, `opacity`, `stroke-dashoffset`, `clip-path`; GSAP dentro de `gsap.matchMedia()` com cleanup.
- [ ] Hero implementa a Hero Composition do BRIEF (não interpretação genérica).
- [ ] **Acessibilidade do sol:** `aria-hidden="true"`; nós **sem** tab stop; **navegação completa só por teclado** (header + Trail Index sheet) funciona sem o sol; verificado por enumeração dos focáveis e ordem no DOM no Cursor Browser (o `Tab` do navegador é sintético e não move o foco) **e pelo André com teclado real**.
- [ ] Troca/cross-fade sol → `mark-simple` sem salto de layout (CLS ≤ 0,02).

## Skills
gsap-react, cinematic-scroll (só trilha em scrub), rontend-design. GSAP core e ScrollTrigger: documentação oficial do GSAP (gsap.com/docs: `gsap.context`, `matchMedia`, ScrollTrigger, `useGSAP`) (as skills gsap-core/gsap-scrolltrigger estão fora de uso).

## QA
`npm run build` · `npm run lint` · medição de LCP/CLS no Cursor Browser + Lighthouse manual (André) · Cursor Browser (MCP `cursor-ide-browser`) (reduced-motion, JS off, CPU 4×/6×, teclado) · `/qa-static-export`

## Referências
- `docs/BRIEF.md` (Hero Composition, Decisão de impacto, Animações)
- `docs/DIFFERENTIATION.md` (Hero Archetype, Custom Cursor)
- `docs/PLAN.md` §2.2 · `docs/phases/03b-cursor-e-sol-interativo.md`
