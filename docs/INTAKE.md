# INTAKE — ABMSOL | Soluções Digitais

> Preenchido na Fase 0 a partir de `docs/brief-original.md` (brief do André) e `docs/PLAN.md` (plano aprovado + decisões D1–D10).
> Nada aqui é inventado: o que não foi decidido está em **Pendências** (final do arquivo).

## Meta

- **Cliente / projeto:** ABMSOL — Soluções Digitais (marca própria do André Belluci). Nome em verificação INPI/domínio/@: não gravar em itens difíceis de mudar.
- **Nicho:** servicos (estúdio de sites/sistemas + suporte de TI)
- **URL atual (redesign):** site antigo `dharmalabs` (somente leitura, referência). Não será reaproveitado visualmente.
- **URL temporária:** `https://abmsol.vercel.app`, com `noindex` até o domínio final (D7).
- **Cidade / SEO local:** Rio Preto (SP). Suporte de TI com foco local; sites e sistemas para o Brasil todo, online.
- **Ambição visual:** `awwwards` (decisão do André em 20/10/2026: "tem que ser Awwwards"). Mira Site of the Day; Menção Honrosa (6,5+) é o piso. Publicar primeiro, submeter depois. **Dentro do teto técnico do plano** (SVG + GSAP + canvas 2D, sem WebGL, sem registries pagos): o impacto vem da execução do Sol-Índice, da tipografia e do chrome, não de efeitos pesados. Pesos: Design 40, Usabilidade 30, Criatividade 20, Conteúdo 10.

---

## Ferramentas de design e componentes

Decisão do dono (D9/D10 + teto técnico do plano): **SVG + GSAP + canvas 2D. Sem WebGL, sem registries pagos.**

- [x] **GSAP** — scroll, trilha, traço do sol (já no stack)
- [ ] **Motion AI Kit** — não necessário
- [ ] **Three.js** — **vetado** (removido das dependências)
- [ ] **Cult UI** — não
- [ ] **Skiper UI** — Pro, não
- [ ] **Unlumen UI** — Pro, não
- [ ] **React Bits Pro** — Pro, não
- [ ] **21st.dev** — consulta pontual opcional
- [ ] **Origin Kit** — não
- [ ] **GetLayers** — não
- [ ] **MotionSites** — não
- [ ] **Uiverse** — não

**Inspiração Uiverse / micro-UI:** n/a.
**Prompt MotionSites:** n/a.

---

## Referências Awwwards

Referências **analisadas pelo architect** (via navegador, 20/10/2026) estão em `docs/assets/references/REFERENCE-LOG.md`: Linear, Resend, Vercel. São apoio para o brief; as **3 a 5 referências do André** continuam PENDENTES (ver Pendências) e substituem ou complementam estas.

- **Slot hero preferido:** B (`typographic-statement`) com o sol como assinatura. Alternativa do plano: D. Ver BRIEF § Decisão de impacto.
- **Screenshots:** `docs/assets/references/` (nenhum arquivo salvo; ver REFERENCE-LOG).

---

## Análise externa (resumo do brief e do plano)

- **Serviços:** (A) Sites e sistemas: Presença (one page), Institucional (3 a 6 páginas), Premium sob medida, Sistemas e automação. (B) Suporte de TI: residencial (celular/computador, remoto e visita) e empresas (manutenção e contrato mensal). (C) Plano mensal: hospedagem, SSL, backup, pequenas alterações, ligado ao suporte.
- **Público:** amplo. PMEs e profissionais liberais (principal); residências em Rio Preto e região (secundário). Decisão por confiança e entrega previsível, não jargão; muitos acessam por celular intermediário.
- **Posicionamento:** estúdio com acabamento de design e rigor de engenharia. Quatro pilares: qualidade verificável, visual premium, um parceiro só, cuidado contínuo.
- **Prova:** sem clientes vendidos. Portfólio = 3 projetos conceito, marcas fictícias, rótulo "Projeto conceito". Proibido inventar depoimento, métrica, cliente ou logo.
- **Tom:** profissional, direto, humano, PT-BR, confiante sem exagero, frases curtas, sem jargão.
- **Gaps do site antigo (dharmalabs):** HTML/PHP, paleta teal, sem prova, dependente de formulário e `/sistema/r/whatsapp`. Nada migra além do que o plano lista (§4.3).

---

## Suas ideias e direção

- **Conceito em uma frase:** "Tecnologia com acabamento" — trilhas ligam, nós marcam estados; o sol de circuitos é logo, navegação e prova de qualidade.
- **Ideia interativa autoral única:** **Sol-Índice** (plano §2.2). Alternativas B (Amanhecer por scroll) e C (Placa viva) avaliadas e descartadas para esta versão.
- **O que o André ODEIA em sites:** template, efeito gratuito que atrapalha leitura/performance, jargão, prova inventada. (Derivado do brief: "nada de efeito gratuito", "zero placeholder".)
- **O que o visitante deve SENTIR ao entrar:** que a tecnologia dele está nas mãos de alguém confiável, que testa antes de entregar.

### Preferências de estilo

| Estilo | Inclinação |
|--------|------------|
| Liquid glass / liquid morphism | ❌ não |
| Glassmorphism (UI blur) | ❌ não (header sem glass) |
| Skeuomorphism — produto real | ❌ não |
| Editorial / asymmetric | ✅ quer (layout assimétrico, tipografia grande) |
| Neo-brutalism | ❌ não |
| Clay morphism | ❌ não |
| Cinematic / pin scroll | ❌ não na v1 (Alternativa B fica para versão 2 desktop-only) |

- **Notas de estilo:** tecnológico sem frieza; dourado = calor de acabamento, menta = verificado. Sem gradiente roxo/azul, sem 3D.

---

## Anti-clone (obrigatório — portfólio em www/)

<!-- PORTFOLIO:START -->

> Revisado manualmente na Fase 0 (20/10/2026). Nicho de ABMSOL (serviços/tech) não tem irmão direto; o risco é de **chrome**. Marcados `[x]` os que compartilham padrão de chrome/hero a evitar.

Não parecer com estes projetos meus:

- [ ] *Projeto G* — cursor: Gota de suco / blob orgânico · nav: juice-drawer
- [ ] *BarbaraBelluci (Bárbara Belluci Artesanal)* — cinema mesa, drawers laterais
- [ ] *BeatrizeTiago2026 (Beatriz e Tiago 2026)* — casamento
- [x] *Projeto H* — sem spec em docs
- [ ] *DocePele (Doce Pele)* — pinned services, formas orgânicas
- [x] *Projeto B* — slot B typographic-statement, Instrument Serif; nav: drawer lateral esquerdo 88vw
- [x] *Projeto I* — sem spec em docs
- [x] *Projeto J* — mesmo nicho (serviços), Exo 2 + Urbanist
- [ ] *Projeto G (duplicata)* — cursor: Gota de suco / blob orgânico · nav: juice-drawer
- [x] *Projeto A* — slot A vídeo; nav: fullscreen overlay stagger
- [ ] *Projeto E* — metáfora estúdio de gravação; nav: drawer direito 85vw
- [ ] *Pelle (Pelle Medical Center)* — manifesto copper, timeline vertical
- [x] *Projeto K* — sem spec em docs
- [x] *Projeto C* — slot C; nav: drawer direito 88vw
- [x] *Projeto D* — slot D linha vertical + chips; nav: drawer direito
- [ ] *Projeto F* — cursor dourado, hero vídeo clínica

Componentes específicos a **não** reutilizar:

- Cursor: anel de lente (Projeto D), halo dourado (Projeto F), gota/blob (Projeto G), `CustomCursor` do boilerplate.
- Header / nav: fullscreen stagger (Projeto A), drawers laterais esquerdo/direito (Projetos B, C, D, E), glassmorphism no header.
- Hero: split cream 58/42 editorial; vídeo full-bleed ambiente (Projeto A); arco SVG (Projeto C); linha vertical + chips (Projeto D).
- Footer: NAP institucional de clínica.

<!-- PORTFOLIO:END -->

---
## Slots de hero (portfólio — mesmo nicho)

<!-- PORTFOLIO:SLOTS:START -->

> Estética: A Projeto A · B Projeto B · C Projeto C · D Projeto D. ABMSOL é família "serviços/tech", fora do pool estética. Slot escolhido: **B** com override documentado no BRIEF (4 eixos distintos).

| Projeto | Nicho | Archetype | Slot |
|---------|-------|-----------|------|
| Projeto B | estetica | `typographic-statement` | B |
| Projeto A | estetica | `ambient-video-product` | A |
| Projeto C | estetica | `immersive-full-bleed` | C |
| Projeto D | estetica | `editorial-asymmetric` | D |

<!-- PORTFOLIO:SLOTS:END -->

---

## Chrome desejado (decidido no plano §2.4; o brief-architect detalha em DIFFERENTIATION.md)

- **Cursor:** cursor-nó v2 (fase 03b, pós-lançamento), só `pointer: fine`; sem cursor no celular.
- **Scrollbar:** fina; trilho marinho, thumb dourado.
- **Nav mobile:** painel de tela cheia marinho, 4 itens grandes, trilha como separador, botão WhatsApp fixo no rodapé do painel (detalhe e diferenciação do Projeto A em DIFFERENTIATION).
- **Header:** barra fina, marca-sol à esquerda (colapsa do hero), 4 links + botão. Sem glassmorphism.
- **Footer:** assinatura da trilha terminando no núcleo; WhatsApp primário, e-mail alternativo (quando confirmado), Rio Preto, link de privacidade.
- **Hero archetype:** `typographic-statement` com o Sol-Índice como assinatura.
- **Sem** tela de loading, **sem** widget de chat, **sem** banner de cookies.

---

## Hero — composição e motion

- **Layout do hero:** tipográfico assimétrico. Headline display em 7 de 12 colunas, alinhada à esquerda; sol SVG grande sangrando pela direita/baixo, sobreposto pelo h1. Nunca centralizado.
- **Elemento assinatura:** o Sol-Índice (trilhas se desenham; pulso menta viaja até o nó).
- **Protagonistas visíveis (desktop):** headline + sol. Zero imagem/foto na hero (LCP é o h1).
- **Motion — entrada (0–1,8 s):** h1 já visível; trilhas se desenham do núcleo aos nós (`stroke-dashoffset`, ≤ 1,6 s, `power3.out`); nós acendem em sequência.
- **Motion — interação:** ponteiro energiza o raio mais próximo; pulso menta viaja até o nó; clique leva à seção. Só `pointer: fine` ≥ 1280 px.
- **Mobile:** sol menor, intro curta, sem ponteiro; 2 a 3 nós com pulso CSS. Camada 0 (estático) se reduced-motion/sem JS/FPS ruim.

### Referência visual
- Ver `REFERENCE-LOG.md`. **O que preservar:** precisão, rótulos mono, h1 como LCP (Linear); emblema geométrico único como assinatura (Vercel). **O que NÃO copiar:** hero centralizada com cubo 3D (Resend), brilho/glow do Vercel, qualquer chrome de outro cliente.

### Anti-padrão hero — inaceitável

- [x] Split 2 colunas institucional (headline num lado, fundo creme)
- [x] Carrossel / arco com 3+ itens visíveis
- [x] Headline centrada + botão CTA primário
- [x] Só fade-in genérico sem assinatura
- [x] Hero com foto/imagem (quebra o LCP = texto)
- [x] Gradiente roxo/azul; WebGL; 3D

---

## Efeitos e limites do nicho

- [ ] Liquid / morph SVG
- [ ] WebGL / Three.js (**vetado**)
- [ ] Pin scroll / horizontal journey (**não na v1**; trilha em scrub leve apenas)
- [ ] Vídeo background hero (**vetado**: LCP e celular intermediário)

Restrições: só `transform`, `opacity`, `clip-path`, `stroke-dashoffset`; sem pin no mobile; conteúdo nunca depende de JS; orçamento de performance do `PLAN.md` §4.4.

---

## Páginas necessárias

- **Home** (9 blocos): Hero · Verificado antes de entregar · Serviços · Projetos conceito · Como trabalhamos · Plano mensal · Quem assina · FAQ (5) · CTA final + rodapé.
- `/servicos/` · `/portfolio/<slug>/` ×3 · `/sobre/` · `/contato/` (compositor de mensagem WhatsApp) · `/privacidade/` · 404 com assinatura visual.
- Sem `/blog`, sem página de preços, sem `/termos-de-uso` na v1 (o plano lista 8 URLs; ver override no BRIEF § Legal).

---

## Assets disponíveis

- **Logo:** status **A** — vetor oficial em `docs/assets/` (`logo_desenho_svg.svg` só o sol; `logo_svg_fundo.svg` com fundo; `logo_svg.svg` sol + wordmark; `abmsol_svg.svg` só wordmark; `logo_ig.png/jpg` referência). Wordmark em Rajdhani Medium no SVG original; no site será SVG em curvas (Rajdhani só se o André escolher A, P16). Falta apenas a **versão simplificada** (favicon), que a Fase 01 deriva do vetor.
- **Fotos:** não (pendência P2).
- **Vídeo:** não (e vetado no hero).

---

## SEO

- **Palavra-chave principal:** "site profissional e suporte de TI em Rio Preto" (família: criação de sites, sistemas sob medida, suporte de TI). Foco local sem prejudicar o alcance nacional.
- **Cidade/região:** Rio Preto (SP) + Brasil (online).
- **Schema:** `ProfessionalService` (+ `Service`, `FAQPage`, `WebSite`). Sem `Review`/`AggregateRating`.

## Legal e features

- **Privacidade:** página curta e honesta em `/privacidade/` (analytics sem cookies, sem formulário). Revisão jurídica antes do domínio final (pendência P5).
- **Cookies:** **não há banner** (Umami sem cookies, sem formulário). Override do boilerplate.
- **SEO básico:** sempre (metadata, sitemap, robots, OG, `llms.txt`).
- **Blog:** NÃO (`features.blog = false`).
- **SEO local forte:** NÃO como flag (`localSeoStrong = false`); JSON-LD `ProfessionalService` com `areaServed` entra na fase 06.

## Decisões fechadas (D1–D10 + extras)

| ID | Decisão |
|----|---------|
| D1 | Tipografia A: Syne + Instrument Sans + JetBrains Mono; wordmark ABMSOL como SVG em curvas (a Rajdhani da logo só entra se o André escolher a opção A após as amostras da Fase 01, P16) |
| D2 | Headline: "Tecnologia que funciona. Do suporte do dia a dia ao site premium." |
| D3 | Voz: "nós" no corpo; "eu" em "Quem assina" |
| D4 | Analytics: Umami |
| D5 | Bárbara e Miguel: apenas origem do nome (A·B·M + SOL); sem fotos; sem nome completo do Miguel |
| D6 | Diagnóstico gratuito: checklist rápido por WhatsApp, escopo limitado (detalhar no BRIEF) |
| D7 | URL `*.vercel.app` com `noindex` até o domínio final |
| D8 | 3 conceitos: 1 premium, 1 institucional, 1 sistema/painel (marcas fictícias, "Projeto conceito") |
| D9 | Removidas: three, @types/three, axios, react-hook-form, zod, vanilla-tilt |
| D10 | `@playwright/test` não instalado (só Cursor Browser (MCP `cursor-ide-browser`)) |
| — | WhatsApp `5517991446829`; sem preços; sem formulário; sem banner de cookies; sem WebGL; só PT-BR; Next 16 `output: 'export'` |

---

## Pendências (bloqueios que dependem do André — nada foi inventado)

| # | Item | Bloqueia |
|---|------|----------|
| P1 | ~~Logo em vetor~~ **Recebido (20/10/2026).** Resta aprovar a versão simplificada (favicon/avatar) que a Fase 01 vai propor | Fase 01 |
| P2 | **Fotos do André**: 1 horizontal e 1 vertical, ≥ 1600 px no lado maior, luz natural | Fase 04 (Quem assina) e 05 (`/sobre`) |
| P3 | **Texto de "Quem assina"** e quais diferenciais podem ser ditos publicamente (formação em Eng. da Computação, tempo de experiência em QA/automação) | Fase 04/05 |
| P4 | **E-mail** de contato, área de atendimento exata e dados legais (nome/razão social, CNPJ ou MEI) | Rodapé, `/contato`, JSON-LD, `/privacidade` |
| P5 | **Revisão jurídica** da política de privacidade | Antes do domínio final |
| P6 | **Metodologia real de testes**: lista dos checks que de fato são feitos | Seção "Verificado antes de entregar" e processo |
| P7 | **Descrição final dos serviços** (o que inclui cada um), sem preço | Fase 04/05 |
| P8 | **3 projetos conceito**: nicho, nome fictício, desafio, telas/imagens e licença (banco gratuito ou IA) | Fase 05 |
| P9 | **3 a 5 referências de sites** que o André admira (URL + o quê) | Substitui/complementa o REFERENCE-LOG |
| P10 | **Definição de "diagnóstico gratuito"**: o que se entrega, em quanto tempo, em que limite (rascunho no BRIEF, a validar) | CTA secundário |
| P11 | **Conta Umami** (nuvem ou self-host) e ID do site | Fase 06 |
| P12 | **Confirmação do nome** (INPI/domínio/@) | Fase 07 (domínio) |
| P13 | **5 perguntas reais da FAQ** (rascunho do architect, validação do André) | Fase 04 |
| P14 | **Autorização de Bárbara** para citar a origem do nome (A·B·M + SOL) | Fase 05 (`/sobre`) |

## Observações finais

- Arquivo suspeito no scaffold: `components/legal/scene2d.dll` (binário de 23 KB, sem referências). Não foi removido; ver relatório da Fase 0.
- A skill `design-taste-frontend` está corrompida na origem (projeto e `_ClienteBase`) e foi removida da lista aprovada. As regras anti-clichê usadas vêm de `abmsol-content.mdc`, `abmsol-design.mdc`, do `brief-architect` e do `PLAN.md` §2.5.
