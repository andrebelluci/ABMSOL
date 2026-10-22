# Plano — Novo site ABMSOL | Soluções Digitais

> Status: **plano para aprovação**. Nenhum código foi escrito.
> Insumo para o loop do `_ClienteBase`: este documento alimenta `docs/INTAKE.md` do projeto novo; o `brief-architect` gera `BRIEF.md`, `DIFFERENTIATION.md` e `phases/*.md` a partir dele.
> Fontes: `docs/brief.md`, `.cursor/rules/*`, auditoria do `dharmalabs`, padrão de `_ClienteBase` e `BarbaraBelluci`.

---

## 0. Decisões já tomadas (respostas do André)

| Tema | Decisão |
|---|---|
| Quem assina | **André é o responsável.** A seção "Quem assina" tem foto e texto dele. Bárbara (esposa) e Miguel (filho) podem aparecer no Sobre como origem do nome (A**B**M + SOL), só com autorização (ver Riscos). |
| Preços | **Não publicar valores.** CTA "solicite uma proposta". |
| Público | **Amplo:** PMEs e profissionais liberais; residencial em segundo plano. |
| Projetos conceito | **3:** 1 site premium, 1 institucional, 1 sistema/painel. Marcas fictícias, rótulo "Projeto conceito". |
| Contato e analytics | **WhatsApp como único canal.** Analytics **sem cookies** (Plausible ou Umami). **Sem banner de cookies e sem formulário.** |
| Hospedagem | **Vercel em `*.vercel.app` agora.** Domínio depois. O nome vive em um único lugar (`site.config.json` + `lib/brand.ts`). |
| WhatsApp | **(17) 99144-6829** → `5517991446829`. |
| Teto técnico | **SVG + GSAP + canvas 2D. Sem WebGL.** `three` sai das dependências. |
| Idioma | PT-BR (premissa). Estrutura pronta para EN depois, sem implementar agora. |

---

## 1. Estratégia e arquitetura de informação

### 1.1 Posicionamento

Estúdio que entrega tecnologia com **acabamento de design e rigor de engenharia**: site premium, sistema sob medida e suporte de TI com o mesmo parceiro. Quatro pilares (do brief): qualidade verificável, visual premium, um parceiro só, cuidado contínuo.

Voz: o corpo do texto fala como estúdio ("nós"). A seção "Quem assina" fala em primeira pessoa ("eu"). Quem assina é uma pessoa, e isso é um ativo de confiança. **Decisão pendente de confirmação (D3 em Riscos).**

Conversão: conhecer → entender → confiar → contatar. Todo caminho termina no WhatsApp com mensagem contextual.

### 1.2 Sitemap

```
/                      Home (narrativa única, 9 blocos)
/servicos/             Detalhe dos 3 grupos de serviço (+ seção Rio Preto / suporte local)
/portfolio/<slug>/     3 projetos conceito (generateStaticParams)
/sobre/                Quem assina + origem do nome + método
/contato/              Compositor de mensagem de WhatsApp + e-mail como alternativa
/privacidade/          Política curta (analytics sem cookies; sem formulário)
/404                   Página 404 com assinatura visual (Awwwards avalia)
```

Sem `/blog` no lançamento (`features.blog = false`). Sem página de preços. 8 URLs indexáveis, todas com conteúdo real (nenhuma página fina).

Navegação (máx. 4 itens + CTA): **Serviços · Projetos · Como trabalhamos · Sobre** + botão WhatsApp. "Projetos" e "Como trabalhamos" ancoram na home.

### 1.3 Home — objetivo, mensagem e CTA por seção

| # | Seção | Objetivo | Mensagem | CTA (1 primário por viewport) |
|---|---|---|---|---|
| 1 | **Hero** | Posicionar em 5 s | Headline (rascunho do brief): "Tecnologia que funciona. Do suporte do dia a dia ao site premium." Subtítulo: site, sistema e suporte com um parceiro só. | **WhatsApp** (primário) + link "Como trabalhamos →" |
| 2 | **Verificado antes de entregar** | Provar rigor sem inventar números | Lista curta dos checks que realmente fazemos (mobile, velocidade, SEO básico, formulários quando houver, boas práticas de privacidade). Só itens confirmados por André; nunca prometer conformidade legal. | — (sem CTA) |
| 3 | **Serviços** | Entender a oferta | 3 grupos: Sites e sistemas · Suporte de TI · Plano mensal. Lista assimétrica, sem grid 3×1 de ícones. | WhatsApp contextual por serviço ("Quero uma proposta de Institucional") |
| 4 | **Projetos conceito** | Mostrar nível de craft | 3 projetos, cada um com rótulo "Projeto conceito" e uma frase do desafio de design. | Link para `/portfolio/<slug>/` |
| 5 | **Como trabalhamos** | Reduzir risco percebido | Diagnóstico → proposta → construção → testes → entrega → cuidado contínuo. É o palco do nó que "acende" (ver §2). | — |
| 6 | **Plano mensal** | Vender recorrência | Hospedagem, SSL, backup, pequenas alterações, ligado ao suporte. Sem preço. | WhatsApp ("Quero saber do plano mensal") |
| 7 | **Quem assina** | Confiança pessoal | Foto e texto do André; formação e experiência só se confirmadas. | WhatsApp |
| 8 | **FAQ** | Remover objeções | 5 perguntas, accordion, 1 aberta. | — |
| 9 | **CTA final + rodapé** | Fechar | Headline curta, botão WhatsApp, e-mail como alternativa, Rio Preto, link de privacidade. | **WhatsApp** |

Regras de densidade (herdadas do `site-brand-ux`): ≤ 200 palavras por seção, ≤ 3 blocos por seção, nunca duas seções do mesmo tipo seguidas.

### 1.4 WhatsApp — mensagens

Montadas em `lib/whatsapp.ts` a partir de `contact.ts` (número `5517991446829`). Cada CTA envia `?text=` com contexto e fonte, ex.: "Olá, vim pelo site e quero uma proposta de **Institucional**." O clique dispara um evento de analytics (`whatsapp_click` com `source` = seção). Substitui o `/sistema/r/whatsapp` do dharmalabs.

### 1.5 "Diagnóstico gratuito" (CTA secundário do brief)

Vira rótulo de mensagem pré-preenchida ("Quero um diagnóstico gratuito do meu site / da minha TI"), no `/contato` e no CTA final. **Precisa de definição do que é entregue (D6).** Não prometer sem escopo.

---

## 2. Direção criativa

### 2.1 Conceito central: **"Tecnologia com acabamento"**

O sol de circuitos junta duas coisas que o mercado separa: o calor de um acabamento premium (dourado) e a precisão de uma placa de circuito (trilhas e nós). O site inteiro obedece a um sistema: **trilhas ligam, nós marcam estados.**
- Dourado = trilha, "em andamento", marca.
- Menta = nó validado, "testado", sucesso.
- Marinho = a noite de onde a luz sai.

### 2.2 UMA ideia interativa autoral (recomendada): **"O Sol-Índice"**

Um único objeto SVG (o sol) que muda de papel ao longo da página:

1. **Hero:** as trilhas se desenham sozinhas (`stroke-dashoffset`, ≤ 1,6 s) a partir do círculo central até os nós. O h1 já está visível antes disso (o LCP é texto).
2. **Interação (desktop com ponteiro):** o ponteiro "energiza" o raio mais próximo. Um pulso menta viaja pela trilha até o nó. Cada raio corresponde a uma seção (Serviços, Projetos, Processo, Plano, Sobre). Clicar leva à seção.
3. **Scroll:** ao rolar, o sol encolhe e vira a marca do header. Os raios continuam como **uma trilha vertical fina** acompanhando a página, com um nó por seção. A trilha substitui a barra de progresso de rolagem.
4. **Como trabalhamos:** os nós do processo passam de dourado (pendente) para menta (validado) conforme você rola. É a prova visual do pilar "qualidade verificável".
5. **Centro = contato:** o núcleo do sol pulsa levemente e é o ponto onde o CTA de WhatsApp aterrissa no CTA final (a trilha termina nele).

Por que funciona: nasce da logo, serve à navegação (usabilidade, 30%) e à mensagem (qualidade verificável), não é efeito gratuito. É uma só geometria (`sun-geometry.ts`, gerada da logo vetorial) usada em hero, trilha e favicon simplificado.

**Custo de performance:** SVG de ~16 paths e ~40 nós (≤ 12 KB inline). Animação de traço só no intro e no scrub da trilha (SVG pequeno, isolado com `contain`). Pulso do ponteiro via CSS custom properties atualizadas em `requestAnimationFrame`, só em `pointer: fine`. Carregado depois do primeiro paint (`dynamic import` + `requestIdleCallback`). Estimativa: ≤ 25 KB gzip de JS extra, lazy.

**Fallback por camadas:**

| Camada | Quando | O que roda |
|---|---|---|
| 0 | Sem JS, `prefers-reduced-motion`, `saveData`, ou sonda de FPS ruim | Sol estático, já desenhado, trilha estática. Conteúdo 100% legível. |
| 1 | Celular padrão | Intro de traço curta, trilha em scrub simples, sem ponteiro, 2 a 3 nós com pulso CSS (pausa fora da tela). |
| 2 | Desktop com ponteiro (≥ 1280 px) | Camada 1 + energização por ponteiro + cursor-nó v2. **Fase 03b (pós-lançamento).** Camadas 0 e 1 vão no lançamento (03a). |

Uma **sonda de ~500 ms** mede o tempo de frame no primeiro intro. Média > 24 ms rebaixa a camada automaticamente (importante para celulares intermediários).

### 2.3 Alternativas

**Alternativa B — "Amanhecer por scroll"** (cinematográfica)
- Seção da hero fixada (pin): o scroll "acende" o sol, o fundo vai de marinho profundo a marinho com halo dourado, as trilhas se completam. Capítulos via `cinematic-scroll` + documentação oficial do ScrollTrigger.
- Prós: impacto emocional forte, muito "Awwwards", fácil de entender.
- Contras: pin + scrub em celular é arriscado para INP/jank, atrasa o acesso ao conteúdo, mais difícil de manter a regra "conteúdo nunca bloqueado".
- Custo: médio-alto (pin, `will-change`, recálculo de ScrollTrigger). No mobile cairia para estático.

**Alternativa C — "Placa viva"** (lanterna de circuitos)
- Fundo de trilhas finas de PCB revelado em um raio ao redor do cursor/toque (canvas 2D com máscara). Lembra a malha de pontos do dharmalabs, mas mais autoral.
- Prós: simples de entender, bonito no desktop, reaproveita a lógica de `dot-mesh.js`.
- Contras: depende de ponteiro, no celular vira decoração; canvas em loop contínuo custa bateria; menos ligada à navegação e à mensagem (30% de usabilidade pesa).
- Custo: médio (canvas full-bleed com rAF). Obriga pausar fora da tela.

**Recomendação:** A. É a única que une marca, navegação e prova de qualidade, e é a mais barata em celular. B pode virar o clímax de uma versão 2 desktop-only. C fica como descarte.

### 2.4 Chrome e anti-clone

Cada projeto do portfólio tem chrome próprio (regra do `AGENTS.md`). Para a ABMSOL:
- **Header:** barra fina, marca-sol à esquerda (colapsa do hero), 4 links + botão. Nada de glassmorphism.
- **Nav mobile:** painel de tela cheia marinho com 4 itens grandes e a trilha como separador; botão de WhatsApp fixo no rodapé do painel.
- **Barra de WhatsApp mobile:** barra inferior que surge só depois do hero e some no CTA final (sem widget de chat flutuante; `WhatsAppChat.tsx` do base é removido).
- **Scrollbar:** fina, trilho marinho, thumb dourado.
- **Cursor custom:** cursor-nó v2 (spec F1–F9 em `DIFFERENTIATION.md`), só `pointer: fine`, fase 03b pós-lançamento; desde as fases 02/04/05 os componentes recebem `data-cursor-*`.
- **Sem tela de loading** (a do base é removida: prejudica LCP e a percepção de velocidade).
- **A confirmar no `portfolio-hero-slots.md`:** hero slot **D (editorial + assinatura)** ou **B (tipográfico)** com o sol como assinatura. Evitar repetir o slot de Projetos A/B.

### 2.5 Tom e copy

- Português do Brasil, frases curtas, voz ativa, sem jargão, sem superlativo.
- Proibido: "solução completa", "transforme seu negócio", "inovação tecnológica", "próximo nível" (do `site-brand-ux`) e os anti-padrões de `abmsol-design.mdc` e §2.5 (a skill `design-taste-frontend` foi removida: arquivo corrompido).
- Dados orgânicos só se reais. **Nenhuma métrica inventada.**
- Skill `gpt-taste` **não** entra: conflita com o tom sóbrio.

---

## 3. Sistema de design

### 3.1 Cores (tokens em `globals.css`, expostos no `tailwind.config.ts`)

| Token | Valor | Uso |
|---|---|---|
| `--c-navy-900` | `#0B173F` | Fundo base (marca) |
| `--c-navy-800` | derivado (um passo mais claro) | Superfície elevada |
| `--c-navy-700` | derivado | Bordas, divisores (sempre com alfa, nunca cinza sólido) |
| `--c-gold` | `#DCA931` | Trilhas, acentos, link hover. **Não para parágrafos longos.** |
| `--c-mint` | `#73D9B1` | Nós validados, estados de sucesso, foco |
| `--c-ink` | off-white quente (a definir na fase 01; nunca `#FFFFFF`) | Texto principal sobre marinho |
| `--c-ink-muted` | off-white a ~70% | Texto secundário |
| `--c-paper` | off-white quente claro | **1 ou 2 seções invertidas** (ritmo): texto marinho; dourado só decorativo |

- Contraste calculado (estimativa, confirmar por script na fase 01): dourado sobre marinho ≈ 8:1, menta sobre marinho ≈ 10:1. **Dourado sobre papel claro falha em AA**, então nunca usar como texto ali.
- Nunca `#000` nem `#FFF`. Cores só por variável (nada de hex no componente).
- **Exceção declarada:** a regra antiga do dharmalabs limita a 4 variáveis de cor. Aqui há 3 de marca + neutros, por isso a regra do projeto novo (`abmsol-design.mdc`) substitui a antiga.
- Estados de foco: anel menta 2 px com offset (`:focus-visible`), nunca removido.

### 3.2 Tipografia (2 propostas com licença livre; você escolhe)

Ambas via `next/font/google` (auto-hospedadas no build, sem CSS bloqueante de terceiros).

| | Opção A (recomendada) | Opção B |
|---|---|---|
| Display | **Syne** (OFL): geométrica e autoral, peso alto forte, mantém tom "estúdio" | **Bricolage Grotesque** (OFL): mais quente e expressiva |
| Texto | **Instrument Sans** (OFL) | **DM Sans** (OFL) |
| Micro-rótulos | **JetBrains Mono** 400 (só rótulos técnicos: "04/05 verificado") | idem |
| Risco | Syne em pesos altos é larga: testar headline em 375 px | Bricolage pode parecer menos "rigor" |

Regras: nada de Inter/Roboto/Arial como principal (`AGENTS.md`). `clamp()` em todo título. Caixa-alta com `letter-spacing` 0,15 a 0,25em só em rótulos. Entrelinha 1,1 a 1,2 no display e 1,6 a 1,7 no corpo. Máx. 2 famílias + 1 mono; subset latin; peso total de fontes ≤ 90 KB woff2.

Escala sugerida (fluida): `display` `clamp(2.5rem, 7vw + 1rem, 6.5rem)` · `h2` `clamp(1.75rem, 3.5vw, 3rem)` · `lead` `clamp(1.125rem, 1.5vw, 1.375rem)` · `body` 1rem · `label` 0,75rem mono.

### 3.3 Espaçamento, grid e breakpoints

- Escala base 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128; seções com padding vertical mínimo `8vw`.
- Breakpoints (mobile-first, `min-width`): **375 · 768 · 1280 · 1920**, definidos em `tailwind.config.ts` (`sm/md/xl/2xl` mapeados).
- Grid: 4 colunas no mobile, 8 no tablet, 12 no desktop; container máx. 1280 px (1440 px em `2xl`); gutters 16/24/32 px. Layout **assimétrico**: texto em 5 a 7 colunas, sol/imagens quebram a grade de forma intencional. Nunca hero centralizada no desktop.
- Seções alternam `--navy-900` e `--navy-800`; 1 ou 2 seções `--paper`.

### 3.4 Componentes (todos Server Components, salvo indicação)

`Button` (retangular, raio ≤ 4 px, cor sólida, sem gradiente) · `WhatsAppLink` (client leve: dispara evento) · `Label`/`Badge` (mono) · `Section` + `SectionHeading` · `ServiceRow` (lista assimétrica) · `ConceptCard` (rótulo "Projeto conceito" obrigatório) · `ProcessNode` (estado pendente/validado) · `Faq` (`<details name="faq">`, zero JS, 1 aberto por padrão) · `Trail` (client: trilha de rolagem) · `SunCircuit` (client: sol) · `Header` / `MobileNav` (client) / `Footer` · `WhatsAppBar` (client: barra inferior no mobile) · `JsonLd`.

### 3.5 Princípios de motion

- Só anima `transform`, `opacity`, `clip-path`, `stroke-dashoffset` (e cor em hover). Nunca layout.
- Durações: 150 ms (feedback) · 250 ms (UI) · 450 ms (entrada) · 800 a 1600 ms (apenas o intro do sol).
- Easing: `power3.out` (entrada), `power2.inOut` (transição). Sem bounce/elastic.
- Todo GSAP dentro de `gsap.matchMedia()`: `(prefers-reduced-motion: no-preference)` e, para extras, `(min-width: 1280px) and (pointer: fine)`.
- Conteúdo **nunca** depende de JS para aparecer: estado inicial escondido só com classe adicionada por JS (`html.js`); sem JS, tudo visível.
- Revelar uma vez (`toggleActions: 'play none none none'`), `start: 'top 85%'`, `markers: false`.
- Intro total ≤ 1,8 s e nunca atrasa leitura nem CTA.
- Lenis só em `pointer: fine` e sem reduced-motion; scroll nativo no celular (melhor para INP).
- Framer Motion só com `LazyMotion` + `domAnimation`, para o painel de nav e micro-interações. GSAP cuida do scroll.

---

## 4. Plano técnico

### 4.1 Stack (alinhada ao `_ClienteBase` / `BarbaraBelluci`)

Next.js **16 (Active LTS)** App Router (Node ≥ 20.9, React 19.2, Turbopack, ESLint CLI; upgrade na **fase 00**) + TypeScript, `output: 'export'`, `trailingSlash: true`, `images.unoptimized`. Tailwind 3. GSAP + ScrollTrigger. Framer Motion (LazyMotion). Lenis. Lucide React. Deploy com `npm run deploy:vercel`.

**Ajustes de dependências (aprovação necessária, ver D9):**

| Ação | Pacotes | Motivo |
|---|---|---|
| Remover | `three`, `@types/three` | WebGL descartado |
| Remover | `axios`, `react-hook-form`, `zod`, `vanilla-tilt` | Sem formulário, sem requisições, sem tilt (reduzir) |
| Manter só no build | `gray-matter`, `react-markdown` (política de privacidade em markdown, renderizada no servidor, 0 KB no cliente) | Conteúdo legal |
| Manter | `next`, `react`, `react-dom`, `gsap`, `framer-motion`, `lenis`, `lucide-react`, `clsx`, `tailwind-merge`, `sharp` | Stack |
| Opcional (devDep) | `@playwright/test` | Smoke tests locais; **o Cursor Browser (MCP `cursor-ide-browser`) segue só para validação/debug** |
| **Atualizar** | Next 14 → **16** (fase 00) | 14 está fora de suporte e 15 sai de suporte em 21/10/2026; a paridade com o `_ClienteBase` perde peso frente a patches de segurança. Se bloquear, parar e avisar; **não voltar para a 14** |

### 4.2 Estrutura de pastas

```
ABMSOL/                      (criada por: npm run new:client -- ABMSOL)
├── app/
│   ├── layout.tsx · page.tsx · not-found.tsx · globals.css
│   ├── servicos/page.tsx
│   ├── portfolio/[slug]/page.tsx        generateStaticParams (3 conceitos)
│   ├── sobre/page.tsx · contato/page.tsx · privacidade/page.tsx
├── components/
│   ├── layout/    Header · MobileNav · Footer · WhatsAppBar · SmoothScroll (o `Cursor` mora em `components/cursor/`, fase 03b)
│   ├── sections/  Hero · Verified · Services · Concepts · Process · Plan · Founder · Faq · FinalCta
│   ├── sun/       SunCircuit · Trail · sun-geometry.ts · useSunTier.ts
│   ├── ui/        Button · WhatsAppLink · Label · Section
│   └── seo/       JsonLd
├── lib/           site.ts · brand.ts · contact.ts · whatsapp.ts · seo.ts · schema.ts · gsap.ts · analytics.ts
│   └── content/   services.ts · concepts.ts · process.ts · faq.ts   (conteúdo tipado, zero lorem)
├── content/legal/ privacidade.md
├── public/        images/ (webp/avif gerados) · logo/ (mark.svg, mark-simple.svg) · og.png · favicon · robots.txt · llms.txt
├── scripts/       generate-images.mjs · generate-sitemap.js · check-budget.mjs (novo) · deploy-vercel.mjs
├── docs/          INTAKE.md · BRIEF.md · DIFFERENTIATION.md · phases/ · PLAN.md (cópia deste plano)
├── .cursor/rules/ protecao-arquivos.mdc · abmsol-design.mdc · abmsol-motion-perf.mdc · abmsol-content.mdc (novas)
└── site.config.json (name, slug, url) · vercel.json
```

Nomes de arquivo neutros (`mark.svg`, não `abmsol-logo.svg`): o nome ainda passa por INPI/domínio.

### 4.3 Regras novas do projeto (propostas, a criar na fase 0)

- `abmsol-design.mdc`: tokens, tipografia, anti-padrões.
- `abmsol-motion-perf.mdc`: orçamento, matchMedia, camadas do sol, nada de layout animado.
- `abmsol-content.mdc`: zero placeholder, rótulo "Projeto conceito", proibido inventar depoimento, cliente ou métrica.
- As regras `site-*` e `sistema-*` do dharmalabs **não migram** (HTML/PHP, teal, "sem frameworks"). `dev-media.mdc` migra **sem** o item de Unsplash como placeholder.

### 4.4 Orçamento de performance (mobile primeiro)

Medição: Lighthouse mobile (4G lenta, CPU 4×) sobre o `out/` servido localmente e depois sobre a URL da Vercel, mediana de 5 execuções.

| Métrica | Meta | Teto (reprova a fase) |
|---|---|---|
| LCP (lab) | ≤ 2,0 s | 2,5 s |
| CLS | ≤ 0,02 | 0,1 |
| INP | ≤ 150 ms | 200 ms |
| TBT | ≤ 150 ms | 300 ms |
| FCP | ≤ 1,3 s | 1,8 s |
| Lighthouse mobile | Perf ≥ 95, A11y/BP/SEO = 100 | Perf ≥ 90 |
| JS inicial da home (gzip) | ≤ 130 KB | 170 KB |
| JS crítico antes do LCP | ≤ 100 KB | 120 KB |
| CSS (gzip) | ≤ 25 KB | 35 KB |
| Fontes (woff2) | ≤ 90 KB | 110 KB |
| Imagem individual | ≤ 120 KB (mobile) / 200 KB (desktop) | 200 KB |
| Transferência inicial da home | ≤ 500 KB | 700 KB |

Táticas: o **LCP é o h1** (texto, sem imagem na hero); sol em SVG inline; GSAP/Lenis/sol carregados após o primeiro paint (`dynamic import`, `requestIdleCallback`); RSC por padrão (`'use client'` só em `SunCircuit`, `Trail`, `MobileNav`, `WhatsAppBar`, `Cursor`, `WhatsAppLink`); imagens geradas por `sharp` no `prebuild` em AVIF/WebP com `srcset`, `width`/`height` explícitos, `loading="lazy"` abaixo da dobra; `content-visibility: auto` em seções longas; cache `immutable` e cabeçalhos de segurança em `vercel.json`; sem fonte de terceiros em runtime; analytics `defer`. O novo `check-budget.mjs` falha o build se o teto for ultrapassado.

### 4.5 Acessibilidade

HTML semântico (`header/nav/main/section/footer`, um `h1` por página, sem pular níveis); skip link; foco visível; navegação completa por teclado (nav mobile com *focus trap* e `Esc`); alvos de toque ≥ 48×48 px; contraste AA validado por script; `prefers-reduced-motion` respeitado em tudo (CSS e GSAP); SVG decorativo com `aria-hidden`, logo com `<title>`; FAQ nativo com `<details>`; `lang="pt-BR"`; `scroll-behavior` desligado em reduced-motion; links de WhatsApp com texto descritivo (nada de "clique aqui").

### 4.6 SEO

`createMetadata()` por página (título único de 50 a 60 caracteres, descrição de 140 a 160), canonical, OG 1200×630 e Twitter card; **JSON-LD:** `ProfessionalService` com `areaServed` (Rio Preto/SP + Brasil, online) e `Service` por serviço; `FAQPage` na home; `WebSite`; **sem `Review`/`AggregateRating`** (não há clientes). `sitemap.xml` gerado por `scripts/generate-sitemap.js`, `robots.txt`, `llms.txt`. Foco local (Rio Preto) em `/servicos` e no rodapé, sem keyword stuffing. Nome da marca centralizado em `lib/brand.ts` para troca segura. `noindex` em `*.vercel.app` até o domínio final (evita duplicidade).

### 4.7 Analytics e privacidade

Plausible ou Umami (D4), sem cookies, `defer`, eventos: `whatsapp_click` (prop `source`, `service`), `scroll_depth` opcional. Sem banner (nenhum cookie nem dado pessoal). `CookieConsent.tsx` do base é removido. Política de privacidade curta e honesta (precisa de revisão jurídica, ver Riscos).

---

## 5. Fases de implementação

Seguem o loop do `_ClienteBase`: **uma fase por sessão do `phase-executor`**, `qa-static-export` ao fim de cada uma, `npm run build` + `npm run lint` verdes. Implementação só depois de `BRIEF.md` aprovado e `LOOP_STATE.md` atualizado.

| Fase | Entrega | Critério de aceite (verificável) | Agente / skill / regra |
|---|---|---|---|
| **0 — Scaffold, intake e brief** | `npm run new:client -- ABMSOL`; limpar deps (§4.1) e componentes do base (`LoadingScreen`, `WhatsAppChat`, `CookieConsent`); `site.config.json` com URL temporária; criar 3 regras `abmsol-*`; preencher `INTAKE.md` com este plano; gerar e revisar `BRIEF.md`/`DIFFERENTIATION.md`/`phases/` | `npm run build` verde na base limpa; `package.json` sem `three/axios/rhf/zod/vanilla-tilt`; `INTAKE.md` sem `[PREENCHER]`; relatório do `brief-reviewer` = aprovado; `LOOP_STATE.md` com "BRIEF aprovado (humano)" | `/brief-architect`, `/brief-reviewer`, `frontend-design`, `ui-ux-pro-max`; regra `protecao-arquivos` |
| **00 — Upgrade Next 16** | `next`/`react`/`react-dom` + tipos para 16/19; ESLint CLI (flat config) no lugar de `next lint`; validar `output:'export'`, `trailingSlash`, GSAP, Framer Motion, Lenis, Tailwind 3; baseline de bundle | `next --version` 16.x; Node ≥ 20.9; `build` estático e `lint` verdes; baseline em `docs/qa/baseline-next16.md`; `/qa-static-export` | `/phase-executor`, `qa-static-export`; **bloqueou → parar e avisar, nunca voltar para a 14** |
| **1 — Design system** | Tokens, fontes (3 famílias), `tailwind.config.ts`, `globals.css`, logo (`mark` completo e `mark-simple`), wordmark SVG inline, `sun-geometry.ts` a partir do vetor; amostras A/B da Rajdhani para decisão do André | Script de contraste: 100% dos pares texto/fundo ≥ 4,5:1 (≥ 3:1 em texto grande); fontes ≤ 90 KB; zero hex fora de `globals.css` (`rg '#[0-9a-fA-F]{3,6}' app components` só em tokens); rota interna `/_design` noindex mostra tokens (removida na fase 6) | `/phase-executor`, `ui-ux-pro-max`, `frontend-design`; regra `abmsol-design` |
| **2 — Chrome** | Header, nav mobile (gatilho "Menu", `inert`, esconde `WhatsAppBar`), footer, `WhatsAppBar`, `template.tsx` (fade de entrada), atributos `data-cursor-*` (sem o cursor), `SmoothScroll` (Lenis só `pointer:fine`), skip link, scrollbar | Navegação 100% por teclado (Tab/Esc), alvos ≥ 48 px, CLS do header = 0, Lenis ausente em emulação mobile, chrome diferente do anti-clone listado no INTAKE | `/phase-executor`, `gsap-next-motion`, `gsap-react`; regra `abmsol-motion-perf` |
| **3a — Hero e Sol-Índice (lançamento)** | `SunCircuit` camadas 0 e 1, intro, `Trail`, cross-fade sol → `mark-simple` | LCP = h1 e ≤ 2,0 s; CLS ≤ 0,02; **contraste do h1 ≥ 4,5:1 na pior posição das trilhas (375/768/1280/1920)**; JS do sol ≤ 25 KB gz lazy; sem JS/reduced-motion = sol estático; sol `aria-hidden`, sem tab stop, navegação só por teclado completa; intro ≤ 1,8 s | `/phase-executor`, `gsap-react`, `cinematic-scroll`, `frontend-design`; doc. oficial do GSAP |
| **4 — Seções da home** | Seções 2 a 9 da §1.3, conteúdo em `lib/content/*` | Nenhum texto fora de `lib/content` ou dos componentes finais; `rg -i 'lorem\|placeholder\|cliente x'` = 0; ≤ 200 palavras por seção; FAQ = 5; **exatamente 1 CTA primário por viewport** em 375/768/1280; nós do processo acendem no scroll; trilha conecta todas as seções | `/phase-executor`, `cinematic-scroll`; doc. oficial do ScrollTrigger; regra `abmsol-content` |
| **5 — Páginas internas e conceitos** | `/servicos`, `/portfolio/[slug]` ×3, `/sobre`, `/contato`, `/privacidade`, 404 | `out/` contém as 8 rotas (`ls out/**/index.html`); cada conceito tem o rótulo "Projeto conceito" na página e no card; imagens com licença registrada em `docs/assets/LICENSES.md`; `/contato` gera mensagem de WhatsApp correta (teste no Cursor Browser: URL `wa.me/5517991446829?text=…`) | `/phase-executor`, `frontend-design`; regra `abmsol-content` |
| **6 — SEO, performance, QA e deploy** | Metadados, JSON-LD, sitemap, robots, `llms.txt`, OG, analytics, `vercel.json` (cache/headers), `check-budget.mjs`, remover `/_design`, deploy Vercel | Todos os tetos de §4.4 cumpridos em `/`, `/servicos`, `/sobre`, 1 conceito; `axe` 0 problemas sérios/críticos; Rich Results sem erro; `sitemap.xml` com 8 URLs; `*.vercel.app` com `noindex`; `build` + `lint` verdes; deploy abre e o evento `whatsapp_click` aparece no analytics | `/phase-executor`, `/qa-static-export`; doc. oficial do Next/React; Cursor Browser (MCP `cursor-ide-browser`) (validação); `deploy:vercel` |
| **3b — Cursor-nó v2 e Sol interativo (pós-lançamento)** | `components/cursor/`, camada 2 do sol, sonda de FPS | Todos os critérios F9 de `DIFFERENTIATION.md`; FPS ≥ 55 com CPU 4×; nativo restaurado nos 5 casos de F8; remover `components/cursor/` não quebra o build | `/phase-executor`, `gsap-react`; doc. oficial do GSAP; Cursor Browser (MCP `cursor-ide-browser`) |
| **7 — Pós-lançamento** | Domínio + DNS após checagem do nome; Search Console; `DESIGN.md` e `GITHUB-SHOWCASE.md`; vídeo demo de 30 a 60 s; submissão Awwwards | Domínio final com `index` ativo e canonical correto; Search Console verificado e sitemap enviado; `DESIGN.md` preenchido; checklists da §6.3 e §6.4 assinados | `docs/GITHUB-SHOWCASE.md`, `docs/DESIGN.md` |

Se uma fase sair do trilho: reverter, apertar o `phases/NN.md` correspondente e rodar de novo (processo do brief).

---

## 6. QA e validação

### 6.1 Lighthouse

- Rotina: `npm run build` → `npx serve out` → Lighthouse CLI mobile (`--preset=perf`, throttling padrão) em 4 rotas, mediana de 5 execuções, relatório HTML salvo em `docs/qa/`.
- Repetir sobre a URL publicada e no PageSpeed Insights (inclui dados de campo quando houver tráfego).
- Reprova a fase se algum teto da §4.4 for ultrapassado.

### 6.2 Cursor Browser (MCP `cursor-ide-browser`) (só validação e debug, não construção)

- Viewports: 375×812, 390×844, 768×1024, 1280×800, 1920×1080.
- Emulações: `prefers-reduced-motion: reduce`; JS desligado; CPU 4× e 6× (CDP `Emulation.setCPUThrottlingRate`); rede lenta.
- Fluxos: tab por todo o site; abrir/fechar nav mobile; cliques de WhatsApp em cada seção (conferir URL e texto); FAQ com 1 aberto; navegação entre rotas; 404.
- Capturas em `docs/screenshots/` para revisão visual e *diff* entre fases.
- Checagem de rolagem horizontal = 0 em todos os viewports.

### 6.3 Checklist Awwwards (Design 40 · Usabilidade 30 · Criatividade 20 · Conteúdo 10)

- **Design:** hierarquia tipográfica clara; paleta aplicada com contenção (dourado/menta ≤ 10% da tela); detalhe fino da logo respeitado; imagens com tratamento consistente; ritmo entre seções escuras e a seção clara.
- **Usabilidade:** CTA claro em ≤ 1 toque; mobile impecável (o júri avalia no celular); nav ≤ 4 itens; tempos de carregamento dentro do orçamento; foco e teclado; 404 com assinatura.
- **Criatividade:** o Sol-Índice é a única ideia autoral e está *explicada pelo uso* (navega e comprova), sem efeito gratuito.
- **Conteúdo:** copy sem clichê, rótulo "Projeto conceito", nenhuma prova inventada, mensagens contextuais.
- **Meta realista:** Menção Honrosa (6,5+). Site of the Day é ambição. Publicar primeiro, submeter depois.

### 6.4 Checklist Developer Award

- **Semântica e SEO:** landmarks, um `h1`, JSON-LD válido, canonical, sitemap.
- **Animações e transições:** só `transform/opacity/clip-path/stroke-dashoffset`; `matchMedia`; reduced-motion; sem *jank* (sem frames > 50 ms no intro).
- **Acessibilidade:** axe limpo, teclado, contraste, alvos de toque.
- **Performance:** metas da §4.4 + `check-budget`.
- **Responsividade:** 375 a 1920 sem quebra, sem rolagem horizontal.
- **Marcação e metadados:** HTML validado (W3C), OG/Twitter, ícones (favicon simplificado, apple-touch), `theme-color`, `lang`.

---

## 7. O que preciso que você forneça (nada será inventado)

| # | Item | Observação |
|---|---|---|
| 1 | **Logo em vetor** (SVG/AI/PDF) | Sem ele, a geometria do sol vira reconstrução por imagem. Definir a **versão simplificada** (favicon/avatar). |
| 2 | **Fotos do André** | 1 horizontal e 1 vertical, ≥ 1600 px no lado maior, luz natural, fundo limpo ou ambiente de trabalho. |
| 3 | **Texto do "Quem assina"** | Formação (Eng. da Computação), tempo de experiência em QA/automação, o que pode ser dito publicamente. Se quiser contar a origem do nome (André · Bárbara · Miguel), autorizar explicitamente. |
| 4 | **E-mail, cidade/área de atendimento** | Para rodapé, `/contato` e JSON-LD. |
| 5 | **Dados legais** (nome/razão social, CNPJ ou MEI) | Rodapé e política de privacidade. |
| 6 | **Metodologia real de testes** | Lista dos checks que de fato são feitos. Alimenta a seção 2 e o processo. |
| 7 | **Descrição final dos serviços** | O que inclui cada um (Presença, Institucional, Premium, Sistemas, Suporte residencial, Suporte empresas, Plano mensal), sem preço. |
| 8 | **3 projetos conceito** | Para cada um: nicho, nome fictício, desafio, telas/imagens e a licença (banco gratuito ou IA, com termos). |
| 9 | **3 a 5 referências de sites** | URL + o que admira em cada. |
| 10 | **Escolha do wordmark** | Rajdhani em texto vivo (A) vs SVG em curvas (B), com amostras e KB reais na fase 01. |
| 11 | **Conta de analytics** | Plausible (pago) ou Umami (nuvem/self-host). |
| 12 | **Definição de "diagnóstico gratuito"** | O que se entrega, em quanto tempo, em que limite. |
| 13 | **Confirmação do nome** | Após INPI/domínio/@, para trocar a URL temporária. |
| 14 | **Texto das 5 FAQs** | Perguntas reais que você recebe. Rascunho meu, validação sua. |

---

## 8. Riscos e decisões que dependem de você

### Decisões

| ID | Decisão | Recomendação |
|---|---|---|
| D1 | Tipografia A ou B | A (Syne + Instrument Sans) |
| D2 | Headline final do hero | Validar uma das 3 do brief ou propor outra |
| D3 | Voz do texto | "Nós" (estúdio) no corpo e "eu" em "Quem assina" |
| D4 | Plausible (pago) vs Umami | Umami nuvem/self-host se quiser custo zero |
| D5 | Aparição de Bárbara e Miguel | Só iniciais/origem do nome, sem foto, a menos que autorize |
| D6 | O que é o diagnóstico gratuito | Checklist de 15 min por WhatsApp, com limite de escopo |
| D7 | Nome vs domínio | Seguir com `*.vercel.app` + `noindex` até o INPI |
| D8 | Ordem dos 3 conceitos e nichos | Um de cada tipo (premium, institucional, sistema) |
| D9 | Remoção de `three`, `axios`, `react-hook-form`, `zod`, `vanilla-tilt` | Aprovar (reduz peso e risco) |
| D10 | `@playwright/test` como devDependency | Opcional; o MCP continua só para validação |

### Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| **Falta de vetor da logo** | Atrasa a fase 1 e arrisca fidelidade do sol | Pedir já; fallback: vetorizar e refazer à mão |
| **Pin/scrub no celular intermediário** | Jank, INP ruim | Sem pin no mobile; sonda de FPS; camada 0 como fallback |
| **Portfólio só com conceitos** | Percepção de pouca prova | Rótulo honesto, qualidade alta, espaço previsto para casos reais (campo com autorização) |
| **Imagens dos conceitos** | Licença e peso | Registro em `LICENSES.md`, AVIF/WebP, ≤ 200 KB |
| **Foto de menor de idade (Miguel)** | Privacidade | Não publicar sem decisão explícita (D5) |
| **Claims de experiência** | Credibilidade | Só o que você confirmar (item 3 da §7) |
| **Cabeçalhos de segurança** | `vercel.json` só vale na Vercel | Se migrar para cPanel, gerar `.htaccess` equivalente |
| **Nome ainda não validado (INPI)** | Retrabalho de marca | Nome só em `site.config.json`/`lib/brand.ts`; arquivos e URL neutros |
| **Política de privacidade** | Risco legal | Revisão jurídica antes do domínio final |
| **Lenis + ScrollTrigger + App Router** | Vazamento entre rotas | `gsap.context()` com cleanup, `ScrollTrigger.refresh` na troca de rota |
| **Expectativa de Awwwards** | Frustração | Meta é Menção Honrosa; submeter depois de publicar e medir |
| **Reaproveitar mockups reais do dharmalabs** | Violação do brief (marcas de terceiros) | Não entram no portfólio; só conceitos com marca fictícia |

---

## 9. Próximos passos (após a sua aprovação)

1. Você responde D1 a D10 e envia os itens da §7 (os bloqueantes agora: 1, 2, 3, 10).
2. Eu executo a **Fase 0** (scaffold e brief) em modo Agent, com o loop do `_ClienteBase`.
3. Você aprova `BRIEF.md` e seguimos uma fase por sessão.
