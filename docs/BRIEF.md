# BRIEFING — ABMSOL | Soluções Digitais

> Gerado pelo brief-architect (Fase 0, 20/10/2026) a partir de `docs/INTAKE.md`, `docs/brief-original.md` e `docs/PLAN.md`.
> Fonte da verdade para os agentes de implementação. O plano detalhado (números de orçamento, camadas do sol, riscos) vive em `docs/PLAN.md`; em conflito, vale este BRIEF e, onde ele silencia, o PLAN.
> Status: **aguardando aprovação humana** (ver `LOOP_STATE.md`).

---

## Identidade do Projeto

```
# PROJECT: ABMSOL — Soluções Digitais
# Type: estúdio de sites premium, sistemas sob medida e suporte de TI
# Niche: servicos (B2B/B2C locais + online)
# Stack: Next.js 16 (Active LTS) App Router + TypeScript + static export (output: 'export', trailingSlash)
# Ambição visual: awwwards (mira Site of the Day; piso Menção Honrosa; dentro do teto técnico: SVG + GSAP + canvas 2D)
# Idioma: PT-BR apenas
# Canal de conversão: WhatsApp (5517991446829), único canal
```

Prioridades: (1) gerar contatos qualificados no WhatsApp, (2) posicionar como estúdio premium confiável, (3) nível Awwwards, (4) vender o plano mensal.

---

## Conceito Visual

```
## Visual Concept
"Tecnologia com acabamento" — um sol de circuitos sobre marinho profundo.
O dourado é a trilha (em andamento, marca), o menta é o nó validado (testado, sucesso),
o marinho é a noite de onde a luz sai. O sol é o logo, o índice de navegação e a prova de
qualidade: raios levam às seções, nós acendem em menta quando uma etapa é verificada.
```

Nada de efeito gratuito. Uma ideia autoral, executada com perfeição: o **Sol-Índice**.

---

## Visual Style Stack

| Papel | Estilo | Onde |
|-------|--------|------|
| **Dominante** | Editorial / asymmetric, em tipografia display (Syne) sobre marinho | Hero, títulos de seção, `/sobre`, `/servicos` |
| **Suporte 1** | Linhas técnicas / "circuit" em SVG (traço fino, nós, rótulos mono) | Sol-Índice, `Trail`, processo, divisores |
| **Suporte 2** | Minimalismo funcional de interface (UI sólida, sem blur) | Header, botões, FAQ, formulários de compositor de mensagem |
| **Disciplina** | Minimalism entre blocos | Espaçamento ≥ `8vw`, ≤ 200 palavras/seção, ≤ 3 blocos/seção |

### Decisão do architect
O nicho "serviços" pede editorial ou minimal tipográfico. O diferencial da ABMSOL é técnico e verificável, então o suporte visual são linhas de circuito (herdadas da logo) e não fotografia. O dourado/menta funciona como código semântico (em andamento/validado), o que dá função ao acento e evita decoração.

### Descartados (NEVER)
- **Liquid glass / liquid morphism:** vetado para B2B sóbrio; competiria com o sol e com a leitura.
- **Glassmorphism (inclusive no header):** o plano exige barra sólida fina; blur custa GPU em celular intermediário.
- **Skeuomorphism (produto e UI):** não há produto físico; UI fake é datada.
- **Neo-brutalism e clay morphism:** tom errado para "rigor de engenharia" e confiança.
- **Cinematic / pin scroll (Alternativa B):** risco de INP/jank no celular; fica como ideia de versão 2 desktop-only.
- **Placa viva (Alternativa C, canvas em loop):** custo de bateria e baixa ligação com a navegação.
- **WebGL/Three.js:** vetado pelo plano e removido das dependências.

**Sobre o ui-ux-pro-max:** o `--design-system` retornou "FAQ/Documentation Landing", "Vibrant & Block-based" e Satoshi + General Sans. **Override explícito:** só a paleta (marinho + dourado de autoridade) é compatível; o padrão de página e o estilo são descartados, e a tipografia segue D1 (Syne + Instrument Sans + JetBrains Mono, licença livre via `next/font`; Satoshi/General Sans não vêm do Google Fonts) e o wordmark ABMSOL como SVG em curvas (a Rajdhani da logo **não** é carregada como fonte; ver § Tipografia e § Logo).

---

## Referências analisadas

| Referência | Roubar | Não copiar | Traduzido |
|------------|--------|------------|-----------|
| Linear (`linear.app`) | h1 alinhado à esquerda como LCP, sem barreira de loading | paleta neutra, mockup de produto como visual | h1 visível antes do sol; sol entra pós-paint sem CLS |
| Resend (`resend.com`) | disciplina de espaço e poucas palavras | hero centralizada, cubo 3D, faixa de depoimentos | referência negativa: assimetria + objeto que navega |
| Vercel (`vercel.com`) | um único emblema geométrico como assinatura; subtítulo mono; dois botões de pesos diferentes | halo/glow branco, composição centrada, preto absoluto | sol interativo assimétrico, rótulos JetBrains Mono, marinho |

Detalhes e ressalvas em `docs/assets/references/REFERENCE-LOG.md`. Referências do André (P9) substituem ou complementam estas quando chegarem.

## Decisão de impacto

Este hero **não** é split cream genérico: fundo marinho, headline em Syne ocupando ~65% da largura, sem foto, e um sol SVG que **sangra pela borda direita e é sobreposto pelo h1**, com trilhas que se desenham, nós numerados em mono e um pulso menta que reage ao ponteiro. O visitante descreve em uma frase: *"o site em que um sol de circuito se desenha e funciona como menu"*.

**Slot de portfólio:** B — `typographic-statement`. O slot B do pool estética é de Projeto B; ABMSOL é outra família (serviços/tech), mas a regra pede override documentado.

### Override de slot
- Slot solicitado: B (`typographic-statement`), já usado por Projeto B (estética).
- Motivo: o plano aprovado fixa hero tipográfico com o sol como assinatura; é o único arranjo que mantém o LCP em texto.
- Diferenciação garantida (4 eixos):
  1. **Paleta:** marinho `#0B173F` + dourado + menta (Projeto B: paleta clara de clínica).
  2. **Display font:** Syne + Instrument Sans + JetBrains Mono (Projeto B: Instrument Serif).
  3. **Nav mobile:** "Trail Index sheet" (painel ligado por trilha com nós numerados) vs. drawer lateral esquerdo.
  4. **Assinatura + cursor:** sol SVG interativo e cursor-nó (Projeto B: sem sol, sem cursor-nó).

---

## Hero Composition

- **Archetype:** `typographic-statement` (slot B) com o **Sol-Índice** como assinatura.
- **Layout:** tipográfico assimétrico. Headline em 7 de 12 colunas, alinhada à esquerda; sol SVG grande ancorado à direita/baixo, sangrando para fora da viewport (~25% cortado), com o h1 sobrepondo as trilhas (z-index do texto acima do sol).
- **Elemento assinatura:** o sol de circuitos **fiel à logo oficial**: anel central (núcleo), **4 raios cardeais longos** (cima, direita, baixo, esquerda) e 4 ramos diagonais com 4 nós cada, 20 nós ao todo, simetria de 4 eixos. Os 4 raios cardeais = os 4 itens da navegação (cima = Serviços, direita = Projetos, baixo = Como trabalhamos, esquerda = Sobre). Os demais nós marcam as outras seções na `Trail` (ex.: Plano mensal, Quem assina, FAQ).
- **Motion na entrada (0 a 1,8 s):** h1 e subtítulo já visíveis (SSR, sem JS). Após o primeiro paint, as trilhas se desenham do núcleo aos nós (`stroke-dashoffset`, ≤ 1,6 s, `power3.out`), nós acendem em sequência (dourado), o núcleo pulsa uma vez. Nada atrasa a leitura nem o CTA.
- **Motion na interação (camada 2 — fase 03b, pós-lançamento, antes da submissão ao Awwwards; desktop, `pointer: fine`, ≥ 1280 px):** o ponteiro "energiza" o raio mais próximo; um pulso menta viaja pela trilha até o nó; o rótulo mono do nó aparece (`01 SERVIÇOS`); clique leva à âncora. Atualização via CSS custom properties no ticker único do GSAP. **No lançamento (03a) valem só as camadas 0 e 1.**
- **Acessibilidade do sol (G):** a navegação canônica é o header (e o Trail Index sheet no mobile). O sol é **reforço para ponteiro**: `aria-hidden="true"`, nós **sem tab stop**. Aceite: a navegação completa funciona só por teclado, sem o sol.
- **Legibilidade do h1 sobre o sol (C):** contraste do h1 ≥ 4,5:1 na pior posição das trilhas em 375, 768, 1280 e 1920 px. Verificação: (1) cálculo analítico das cores/opacidades; (2) captura no Cursor Browser; (3) `getComputedStyle` da cor do texto. **Amostragem de pixels compositados** (trilha SVG por baixo do glifo) **não** está disponível no MCP — conferência visual do agente + conta-gotas do André. Se falhar: máscara SVG na zona do texto, sem mudar o layout. Ver `docs/qa/VALIDACAO-FERRAMENTAS.md`.
- **Desktop:** 2 protagonistas (headline + sol). CTA primário WhatsApp + link secundário "Como trabalhamos →".
- **Mobile:** sol menor atrás do canto inferior direito, intro curta, 2 a 3 nós com pulso CSS (pausa fora da tela), sem ponteiro. Camada 0 (estático) em reduced-motion, `saveData`, sem JS ou FPS ruim.
- **Explicitly NOT:** split 2 colunas em fundo neutro; headline centralizada com botão abaixo; hero com foto/vídeo; carrossel; WebGL; halo/glow branco; só fade-in.

### Layout (ASCII — 1280 × 800)

```
┌────────────────────────────── 100dvh ─────────────────────────────────┐
│ ◉ ABMSOL      Serviços  Projetos  Como trabalhamos  Sobre  [WhatsApp] │
│                                                                       │
│  01 ─ ESTÚDIO DE TECNOLOGIA · RIO PRETO (SP)            ╭──·───·      │
│                                                       ╱╱  ╲╲  ╲       │
│  Tecnologia que funciona.                           ──◉═══●═══●──     │
│  Do suporte do dia a dia                              ╲╲  ╱╱  ╱  (sol │
│  ao site premium.            ← h1 sobrepõe o sol       ╰──·───·   sangra
│                                                                  pela │
│  Site, sistema e suporte com um parceiro só.                    borda)│
│  [ Falar no WhatsApp ]   Como trabalhamos →                           │
│                                                                       │
│  ── trilha vertical fina continua pela página ──                      │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Legal e compliance (override do boilerplate)

O boilerplate exige termos, privacidade e banner de cookies. Para a ABMSOL, o **plano aprovado prevalece**:

| Item | Entrega |
|------|---------|
| Privacidade | `/privacidade/` (política curta: analytics sem cookies, sem formulário, WhatsApp como canal). Renomear a rota `politica-de-privacidade` do scaffold. Revisão jurídica antes do domínio final (P5). |
| Termos de Uso | **Não entra na v1** (o plano lista 8 URLs). Remover `/termos-de-uso/` do scaffold na fase 05. Reavaliar se surgirem contratos online. |
| Cookies | **Sem banner e sem formulário.** `CookieConsent` removido. Umami sem cookies. Se cookie for introduzido no futuro, voltar ao brief. |
| Blog | Não (`features.blog = false`); remover rotas `/blog` do scaffold na fase 05. |
| SEO básico | metadata por página, canonical, OG/Twitter, robots, sitemap, `llms.txt` |

## Features (`site.config.json`)

```json
"features": { "blog": false, "localSeoStrong": false }
```

- `localSeoStrong: false` (foco local sem prejudicar o alcance nacional). O JSON-LD `ProfessionalService` com `areaServed` (Rio Preto/SP + Brasil online) é entregue na fase 06 de qualquer forma.
- Nome da marca **só** em `site.config.json` (INPI em verificação). URL temporária `abmsol.vercel.app` com `noindex`.

---

## Chrome Identity (resumo — detalhe em `docs/DIFFERENTIATION.md`)

### Custom Cursor — cursor-nó v2 (**entra na fase 03b, pós-lançamento**; spec completa e tabela de estados em `docs/DIFFERENTIATION.md`)
- **Princípios:** (1) o ponteiro real é SEMPRE o centro; núcleo e anel seguem o mouse 1:1, sem lerp; só satélite e linha-trilha são suavizados. (2) Expandir = deslocar: o anel nunca cresce sobre texto (máx. 28 px sobre elementos com texto); rótulos e ícones vivem em um **satélite** deslocado. (3) Contraste por construção: traço duplo no anel e pílula sólida no rótulo; proibido `mix-blend-mode`, transparência e blur para texto do cursor. (4) Conceito: cursor-nó; perto dos nós do sol uma trilha o conecta a eles.
- **NOT like:** lente (Projeto D), halo dourado (Projeto F), gota/blob (Projeto G), `CustomCursor` do boilerplate.
- **Estados:** default · texto · link/menu/CTA · imagem/cartão · nó do sol · WhatsApp · press · oculto.
- **Contrato por atributos** (`data-cursor`, `data-cursor-label`, `data-cursor-theme`, `data-cursor-avoid`): **desde as fases 02, 04 e 05 todos os componentes interativos e seções recebem esses atributos** (custo ~0). O código do cursor fica isolado em `components/cursor/` (provider + hook) para poder ser promovido ao lançamento sem refatorar.
- **Ativação:** só `(pointer: fine) and (hover: hover) and (min-width: 1280px)`, sem reduced-motion, sem `forced-colors`, sem `saveData`. Nativo restaurado se o JS falhar, o ponteiro sair da janela ou o FPS cair.

### Scrollbar
- Track marinho escuro, thumb dourado, largura 8 px, raio 4 px. Mobile: overlay nativo fino (não estilizar).

### Mobile Navigation
- Pattern: **Trail Index sheet** — painel que sobe do rodapé (clip-path), marinho, 4 itens grandes numerados 01 a 04 em mono ligados por uma trilha dourada vertical; nó acende menta no item em foco/ativo; botão WhatsApp fixo no rodapé do painel. Focus trap, `Esc`, alvos ≥ 48 px.
- **Gatilho (I):** botão com rótulo visível **"Menu"** e `aria-expanded`. Ao abrir: **esconder a `WhatsAppBar` global** (sem barras sobrepostas), aplicar `inert` ao fundo e `aria-modal`. Testar o `clip-path` com CPU 4× e 6× no Cursor Browser (MCP `cursor-ide-browser`); **fallback para opacidade** se o FPS cair.
- NOT: fullscreen stagger centralizado (Projeto A), drawer lateral (Projetos B, C, D, E).

### Header
- Barra fina sólida (sem glass), 56 px mobile / 64 px desktop, 4 links + botão WhatsApp. Sem blur.
- **Marca no header (E):** usa `mark-simple.svg` (anel + 4 raios cardeais + 4 nós) com **no mínimo 28 a 32 px de altura**. O colapso do sol do hero termina em **troca ou cross-fade** para o `mark-simple` (o sol completo não encolhe até o tamanho do header). Favicon, avatar e ícone OG também usam o `mark-simple`.
- **Wordmark (D):** "ABMSOL" como **SVG inline** em curvas (`role="img"`, `aria-label="ABMSOL"`, `<title>`), no header, footer, 404 e OG.

### Footer
- A trilha vertical termina no núcleo do sol (ponto de aterrissagem do CTA final). WhatsApp primário, e-mail alternativo (quando confirmado), "Rio Preto (SP) · atendimento online em todo o Brasil", link de privacidade.

### Hero Archetype
- `typographic-statement` + Sol-Índice. Explicitly NOT: ver Hero Composition.

### Loading Screen
- **Nenhuma.** Prejudica LCP. `LoadingScreen` removido.

### Page Transitions
- **Fade de ENTRADA ≤ 250 ms** via `template.tsx` (ou nenhuma transição). **Não usar `AnimatePresence` com `exit` no App Router.** Reduced-motion: sem transição. O header e a marca persistem entre rotas.

---

## Tipografia

```
Display: Syne — next/font/google (pesos altos para h1/h2; testar 375 px)
Body: Instrument Sans — next/font/google
Mono: JetBrains Mono 400 — só rótulos técnicos ("01 SERVIÇOS", "04/05 verificado")
Rules: clamp() em todo título; caixa-alta + letter-spacing 0,15 a 0,25em só em rótulos;
       entrelinha 1,1–1,2 display / 1,6–1,7 corpo; subset latin; fontes ≤ 90 KB woff2 no total
       (3 famílias: Syne, Instrument Sans, JetBrains Mono). Se estourar, reduzir pesos/estilos.
Wordmark "ABMSOL": SVG inline em curvas — NÃO é fonte do site (ver § Logo).
```

**Rajdhani (decisão do André, tratada como recomendação):** a fonte da logo **não** entra no `next/font` nem no orçamento por padrão. Na Fase 01 renderizar em `/_design` amostras lado a lado — **A:** Rajdhani em texto vivo (1 peso, subset latin); **B:** SVG em curvas — com o **peso real em KB** de cada uma. A decisão final é do André. Se A vencer, o orçamento sobe para 4 famílias e o teto de fontes é reavaliado (registrar no BRIEF).

Escala: `display` `clamp(2.5rem, 7vw + 1rem, 6.5rem)` · `h2` `clamp(1.75rem, 3.5vw, 3rem)` · `lead` `clamp(1.125rem, 1.5vw, 1.375rem)` · `body` 1rem · `label` 0,75rem mono.

**Nunca:** Inter, Roboto, Arial como principal.

---

## Sistema de Cores

```
--c-navy-900  #0B173F   fundo base (marca)
--c-navy-800  derivado  superfície elevada
--c-navy-700  derivado  bordas/divisores (sempre com alfa)
--c-gold      #DCA931   trilhas, acentos, hover (nunca parágrafo longo)
--c-mint      #73D9B1   nós validados, sucesso, foco
--c-ink       off-white quente (nunca #FFF)
--c-ink-muted off-white ~70%
--c-paper     off-white claro: 1 ou 2 seções invertidas (texto marinho; dourado só decorativo)
```

Tokens em `app/globals.css` (CSS custom properties), expostos no `tailwind.config.ts`. **Exceção declarada:** o limite antigo de "máx. 5 variáveis" não se aplica; são 3 de marca + neutros. Os derivados exatos e o script de contraste (≥ 4,5:1 texto, ≥ 3:1 texto grande/UI) são entregues na fase 01. Foco: anel menta 2 px com offset.

---

## Logo

```
Status: A — vetor oficial do André em docs/assets/ (P1 resolvida, exceto a versão simplificada).
Fontes: logo_desenho_svg.svg (só o sol, transparente, 29 paths) → base de mark.svg e de
sun-geometry.ts; logo_svg_fundo.svg (sol + fundo marinho) → ícone/avatar/OG; logo_svg.svg e
abmsol_svg.svg (sol + wordmark / só wordmark) → lockup horizontal; logo_ig.png/jpg → só referência.
Fase 01: limpar o SVG (remover metadados do Inkscape, unidades em mm → viewBox simples, cores
por variável/currentColor onde couber, otimizar), gerar mark.svg, mark-lockup.svg e
mark-simple.svg (favicon/avatar, simplificado: anel + 4 raios cardeais + 4 nós), e sun-geometry.ts
(20 nós, 4 raios cardeais) a partir do mesmo vetor. Nomes de arquivo neutros (mark*.svg).
Wordmark (padrão proposto): o SVG original usa texto vivo (Rajdhani Medium, menta, espaçado).
Padrão: "ABMSOL" como SVG INLINE EM CURVAS (role="img", aria-label="ABMSOL", <title>) no header,
footer, 404 e OG; sem Rajdhani no next/font. Alternativa A (texto vivo) só se o André a escolher
após as amostras da Fase 01 (ver § Tipografia).
Marca pequena (E): header, favicon, avatar e ícone OG usam mark-simple.svg (anel + 4 raios
cardeais + 4 nós), altura mínima 28–32 px no header. Aceite na Fase 01: renderizar mark-simple em
32, 48 e 110 px, confirmar legibilidade e anexar as imagens em docs/screenshots/.
Behavior: no hero é o sol grande; ao rolar o sol faz cross-fade para o mark-simple do header.
```

---

## Páginas

```
- Home /: narrativa única em 9 blocos (abaixo)
- /servicos/: detalhe dos 3 grupos + suporte local (Rio Preto)
- /portfolio/<slug>/: 3 projetos conceito (generateStaticParams)
- /sobre/: Quem assina (André) + origem do nome (A·B·M + SOL, com autorização) + método
- /contato/: compositor de mensagem de WhatsApp + e-mail como alternativa (quando confirmado)
- /privacidade/: política curta
- 404: com assinatura visual (sol "desconectado")
```

8 URLs indexáveis, todas com conteúdo real. Navegação (4 itens + CTA): **Serviços · Projetos · Como trabalhamos · Sobre** + botão WhatsApp. "Projetos" e "Como trabalhamos" ancoram na home.

### Home — blocos (1 CTA primário por viewport)

| # | Seção | Objetivo / mensagem | CTA |
|---|-------|---------------------|-----|
| 1 | Hero | Posicionar em 5 s (D2) | WhatsApp + "Como trabalhamos →" |
| 2 | Verificado antes de entregar | Lista curta dos checks **realmente executados** (mobile, velocidade, SEO básico, boas práticas de privacidade) — só itens confirmados (P6); nunca prometer conformidade legal | — |
| 3 | Serviços | 3 grupos em lista assimétrica (sem grid 3×1 de ícones) | WhatsApp contextual por serviço |
| 4 | Projetos conceito | 3 cards com rótulo "Projeto conceito" e uma frase do desafio de design | Link p/ `/portfolio/<slug>/` |
| 5 | Como trabalhamos | Diagnóstico → proposta → construção → testes → entrega → cuidado contínuo; nós passam de dourado para menta no scroll | — |
| 6 | Plano mensal | Hospedagem, SSL, backup, pequenas alterações, ligado ao suporte; sem preço | WhatsApp ("Quero saber do plano mensal") |
| 7 | Quem assina | André em primeira pessoa; foto e texto só após P2/P3 | WhatsApp |
| 8 | FAQ | 5 perguntas, `<details name="faq">`, 1 aberta (validar com P13) | — |
| 9 | CTA final + rodapé | Fechar; a trilha aterrissa no núcleo | WhatsApp |

### WhatsApp
Número `5517991446829` só em `lib/contact.ts`. Mensagens em `lib/whatsapp.ts` com contexto ("Olá, vim pelo site e quero uma proposta de **Institucional**."). Evento `whatsapp_click` (`source` = seção, `service`).

### Diagnóstico gratuito (D6) — **proposta a validar (P10)**
Checklist rápido por WhatsApp, escopo limitado: o André envia poucas perguntas sobre o site/TI do visitante e devolve até 3 pontos de atenção. Sem visita, sem acesso a sistemas, sem orçamento fechado. **Prazo e profundidade só entram no site depois que o André validar.** Até lá o rótulo é apenas a mensagem pré-preenchida "Quero um diagnóstico gratuito do meu site / da minha TI" no `/contato` e no CTA final, sem prometer prazo.

---

## Animações

```
Sol (hero): trilhas se desenham em ≤ 1,6 s após o primeiro paint; h1 já visível.
Camadas: 0 estático (sem JS, reduced-motion, saveData) · 1 celular padrão (ambas na 03a, LANÇAMENTO) ·
         2 desktop ≥ 1280 px + ponteiro (energização + cursor-nó v2 + sonda de FPS ~500 ms que
         rebaixa a camada se frame médio > 24 ms) — fase 03b, pós-lançamento, antes do Awwwards.
Scroll: o sol vira marca do header; os raios continuam como trilha vertical fina com um
        nó por seção (substitui a barra de progresso).
Processo: nós passam de dourado (pendente) para menta (validado) no scroll — prova do pilar
          "qualidade verificável".
Reveals: uma vez, toggleActions 'play none none none', start 'top 85%', 450 ms power3.out.
Hover: cor/clip-path; sem scale genérico, sem bounce/elastic.
```

Só `transform`, `opacity`, `clip-path`, `stroke-dashoffset` (e cor em hover). GSAP sempre dentro de `gsap.matchMedia()`. Lenis só em `pointer: fine` e sem reduced-motion. Framer Motion só com `LazyMotion` + `domAnimation`.

---

## Imagens e Vídeos

- Sem imagem na hero e sem vídeo em nenhum lugar (v1).
- Imagens dos conceitos (P8): AVIF/WebP via `sharp`, `width`/`height`, `loading="lazy"`, ≤ 120 KB mobile / 200 KB desktop, licença registrada em `docs/assets/LICENSES.md`. Sem marca real de terceiros.
- Alt text escrito como se a foto final já existisse.
- Fotos do André (P2): 1 horizontal e 1 vertical, ≥ 1600 px.

---

## NEVER USE

Específico da ABMSOL:
- Qualquer hex em componente; `#000`/`#FFF`; dourado como texto de parágrafo ou sobre `paper`.
- WebGL, `three`, `axios`, `react-hook-form`, `zod`, `vanilla-tilt` (removidos).
- Tela de loading, widget/FAB de chat, banner de cookies, formulário.
- Glassmorphism, gradiente roxo/azul, cards com raio grande + `drop-shadow`, carrossel como conteúdo principal.
- Hero centralizada, hero com imagem, split institucional em fundo neutro.
- Grid 3×1 de ícones para serviços; 6 badges genéricos "qualidade, agilidade, preço".
- Pin/scrub pesado no mobile; animar `width/height/top/left`.
- Depoimento, métrica, cliente, logo ou avaliação inventados; lorem ipsum; "Cliente X".
- Preços no site.
- **Prometer conformidade legal ou certificação** (ex.: "100% LGPD", "certificado", "em conformidade"); usar "boas práticas de privacidade" e listar só checagens executadas (revisão jurídica segue em P5).
- Frases proibidas: "solução completa", "transforme seu negócio", "inovação tecnológica", "próximo nível", "Elevate", "Seamless", "Unleash", "Next-Gen", "soluções inovadoras".
- `AnimatePresence` com `exit` entre rotas; `mix-blend-mode`, transparência ou blur em texto do cursor.
- Reutilizar `CustomCursor`, `Header`, `HeroSection` do boilerplate ou de outro cliente sem reescrever (anti-clone).
- Skill `gpt-taste`.

---

## Mobile-First (mandatory)

- Base para 375 px; `min-width`: 375 · 768 · 1280 · 1920 (mapeados em `tailwind.config.ts`).
- `100dvh` com fallback `100vh`.
- Sem cursor custom no mobile (e, no desktop, só a partir da fase 03b); sem Lenis no mobile; sem pin.
- GSAP extra só em `matchMedia('(min-width: 1280px) and (pointer: fine)')`.
- Alvos de toque ≥ 48×48 px; botão WhatsApp acessível em ≤ 1 toque (barra inferior após o hero, some no CTA final).
- `prefers-reduced-motion` respeitado em tudo; `scroll-behavior` desligado em reduced-motion.
- Sem rolagem horizontal em 375 a 1920.

## Tech Stack (sem exceções)

```
- Next.js 16 (Active LTS) App Router + TypeScript (Node ≥ 20.9, TS ≥ 5.1, React 19.2; Turbopack por padrão; ESLint CLI no lugar de `next lint`) — upgrade na fase 00
- output: 'export' (static), trailingSlash: true, images.unoptimized
- Tailwind CSS 3
- GSAP + ScrollTrigger (lib/gsap.ts)
- Framer Motion (LazyMotion + domAnimation)
- Lenis (SmoothScroll provider, só pointer: fine) + um único `gsap.ticker` compartilhado por Lenis, ScrollTrigger, cursor e sol
- Lucide React (ícones)
- gray-matter + react-markdown (privacidade em markdown, renderizada no servidor)
- sharp (prebuild de imagens)
- Deploy: out/ → Vercel (npm run deploy:vercel)
```

**Removidos:** `three`, `@types/three`, `axios`, `react-hook-form`, `zod`, `vanilla-tilt`. **Não instalar** `@playwright/test` (só Cursor Browser (MCP `cursor-ide-browser`) para validação). **Next:** o scaffold herdado vem na 14 (fora de suporte); a **fase 00** o leva à 16 antes de qualquer fase de design. Se algo bloquear, parar e avisar o André; **não voltar para a 14**.

---

## SEO

- **Keyword:** "site profissional e suporte de TI em Rio Preto" (família: criação de sites, sistemas sob medida, suporte de TI).
- **Cidade:** Rio Preto (SP) + Brasil (online).
- **Schema:** `ProfessionalService` (com `areaServed`), `Service` por serviço, `FAQPage` na home, `WebSite`. **Sem** `Review`/`AggregateRating`.
- **Title pattern:** 50 a 60 caracteres por página; descrição 140 a 160; canonical; OG 1200×630; Twitter card.
- `noindex` em `*.vercel.app` até o domínio final. `sitemap.xml` (8 URLs), `robots.txt`, `llms.txt`.

---

## Copy Tone (anti-slop)

```
## Copy Tone
Voice: profissional, direto e humano; PT-BR; confiante sem exagero; frases curtas, voz ativa.
       "Nós" (estúdio) no corpo; "eu" (André) só em "Quem assina".
Banned phrases: Elevate, Seamless, Unleash, Next-Gen, "soluções inovadoras", "solução completa",
                "transforme seu negócio", "inovação tecnológica", "próximo nível", "Saiba mais".
Example headline: "Tecnologia que funciona. Do suporte do dia a dia ao site premium."
Example CTA: "Pedir uma proposta de site institucional" · "Falar no WhatsApp" ·
             "Quero saber do plano mensal"
Body: concreto, sem jargão; mostra o que é verificado, não adjetivos.
```

## Copy engine
- [x] Anti-slop **sem** a skill `design-taste-frontend`: o `SKILL.md` está corrompido (ver `docs/CHANGELOG-REVISAO.md` item K) e a skill foi **removida da lista aprovada e NÃO será reinstalada** (decisão do André, 22/10/2026). Regras substitutas: Copy Tone e NEVER USE deste BRIEF, `abmsol-content.mdc`, `abmsol-design.mdc` (anti-padrões) e PLAN §2.5; direção estética pela skill `frontend-design` (íntegra).
- [ ] + gpt-taste (**não**; conflita com o tom sóbrio)

---

## AI Tools

### Sugestões (derivadas do INTAKE)

| Ferramenta | Decisão | Motivo | Fase |
|------------|---------|--------|------|
| GSAP + ScrollTrigger | **Aprovar** | Traço do sol, trilha em scrub, processo | 02–04 |
| `gsap-next-motion`, `gsap-react` (skills) | **Aprovar** | Padrões de cleanup, matchMedia e rotas | 02–04 |
| `gsap-core`, `gsap-scrolltrigger` (skills) | **Fora de uso** (corrompidas; em quarentena) | Usar a documentação oficial do GSAP; reinstalar só com aprovação do André, após verificar fonte e hash | — |
| ui-ux-pro-max (Python) | **Aprovar** (já rodado) | Contraste, anti-padrões, checklist | 01 |
| `frontend-design` (skill) | **Aprovar** | Direção estética | 01–04 |
| `design-taste-frontend` (skill) | **Removida** (arquivo corrompido) | Substituída pelas regras do BRIEF; reinstalar só se um arquivo íntegro for obtido | — |
| `cinematic-scroll` (skill) | **Opcional** | Só a parte de trilha em scrub; sem pin | 03–04 |
| `vercel-react-best-practices` (skill) | **Fora de uso** (hash divergente; em quarentena) | Usar o orçamento do BRIEF/PLAN §4.4 e a documentação oficial do Next/React | — |
| Cursor Browser (MCP `cursor-ide-browser`) | **Aprovar (só validação)** | Viewports, reduced-motion, CPU 4×/6×, teclado | 02–06 |
| 21st.dev MCP | **Opcional** | Consulta pontual de padrão de UI; nada instalado sem aprovar | 04 |
| Three.js / GetLayers 3D / React Bits shaders | **Vetar** | WebGL fora do teto técnico | — |
| Cult UI / Skiper / Unlumen / React Bits Pro | **Vetar** | Registries pagos/Pro; o brief os exclui | — |
| MotionSites, Origin Kit, Motion AI Kit | **Vetar** | Desnecessários; GSAP + código próprio | — |
| gpt-taste | **Vetar** | Conflita com o tom sóbrio | — |

### Aprovadas para implementação
- GSAP + ScrollTrigger, Framer Motion (LazyMotion), Lenis, Lucide, Tailwind, `sharp`.
- Skills: `phase-executor`, `qa-static-export`, `gsap-next-motion`, `gsap-react`, `frontend-design`, `ui-ux-pro-max` (GSAP core/ScrollTrigger e boas práticas Next/React: documentação oficial).
- Cursor Browser (MCP `cursor-ide-browser`) para validação.

### Proibidas neste projeto
- WebGL/three/React Three Fiber, registries pagos (Cult UI Pro, Skiper, Unlumen, React Bits Pro), GetLayers, `gpt-taste`, qualquer dependência fora desta lista sem aprovação no BRIEF.

### Registries shadcn
- —

### MotionSites prompt
> n/a

### React Bits Agent Kit
- n/a (ambição awwwards sem registries pagos; exceção justificada pelo teto técnico do plano. O impacto vem de execução própria em GSAP/SVG.)

### Setup necessário
- [ ] Cursor Browser (MCP `cursor-ide-browser`) ativo no Cursor (já usado para validação)
- [ ] Conta Umami e ID do site (P11), na fase 06
- Nenhuma chave de registry, nenhum OAuth.

---

## Critérios de qualidade (resumo do PLAN §4.4 e §6)

| Métrica | Meta | Teto (reprova a fase) |
|---|---|---|
| LCP | ≤ 2,0 s | 2,5 s |
| CLS | ≤ 0,02 | 0,1 |
| INP | ≤ 150 ms | 200 ms |
| TBT | ≤ 150 ms | 300 ms |
| Lighthouse mobile | Perf ≥ 95; A11y/BP/SEO = 100 | Perf ≥ 90 |
| JS inicial da home (gzip) | ≤ 130 KB | 170 KB |
| CSS (gzip) / Fontes (woff2) | ≤ 25 KB / ≤ 90 KB | 35 KB / 110 KB |
| Transferência inicial da home | ≤ 500 KB | 700 KB |

Acessibilidade: HTML semântico, um `h1` por página, skip link, foco visível, navegação completa por teclado, contraste AA por script, `axe` sem problemas sérios/críticos (rodado pelo André; ver `docs/qa/VALIDACAO-FERRAMENTAS.md`).

---

## Fases de execução

Ver `docs/phases/`. **Uma fase por sessão do phase-executor**, `qa-static-export` ao fim de cada uma. Implementação só após aprovação humana deste BRIEF.

| Fase | Arquivo | Entrega |
|------|---------|---------|
| 00 | `00-upgrade-next16.md` | **Antes de tudo:** boilerplate 14 → Next 16, build estático, baseline de bundle |
| 01 | `01-design-system.md` | Tokens, fontes, tailwind, logo, `mark-simple`, `sun-geometry.ts`, wordmark, rota `/_design` |
| 02 | `02-chrome.md` | Header, Trail Index sheet, footer, WhatsAppBar, SmoothScroll; atributos `data-cursor-*` (sem o cursor) |
| 03a | `03a-hero-sol.md` | Hero + Sol-Índice camadas 0 e 1 + `Trail` + colapso para o `mark-simple` (**lançamento**) |
| 04 | `04-sections-home.md` | Seções 2 a 9 da home, conteúdo em `lib/content/*`, atributos `data-cursor-*` |
| 05 | `05-inner-pages.md` | `/servicos`, `/portfolio/<slug>` ×3, `/sobre`, `/contato`, `/privacidade`, 404, atributos `data-cursor-*` |
| 06 | `06-polish-qa.md` | SEO, JSON-LD, analytics Umami, orçamento, `check-budget`, deploy, remover `/_design` (**fecha o lançamento**) |
| 03b | `03b-cursor-e-sol-interativo.md` | **Pós-lançamento, antes da submissão ao Awwwards:** sol camada 2 + sonda de FPS + cursor-nó v2 completo |
| 07 | (pós-lançamento, fora do loop) | Domínio, Search Console, `DESIGN.md`, `GITHUB-SHOWCASE.md`, submissão Awwwards |

**Ordem de execução:** 00 → 01 → 02 → 03a → 04 → 05 → 06 (lançamento) → 03b → 07.

---

## Fora do escopo do site (ações do André)

- Criar/verificar o **perfil no Google Meu Negócio** (área de atendimento: Rio Preto, SP) — ajuda o SEO local sem depender do site.
- Colocar o **link do Instagram no rodapé** somente quando o perfil existir e tiver conteúdo (hoje o campo fica vazio; nada de ícone social sem destino real).
