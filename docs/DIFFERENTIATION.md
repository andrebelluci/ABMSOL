# DIFFERENTIATION — Chrome único da ABMSOL

> Gerado pelo brief-architect (Fase 0). Define o que torna este site diferente do boilerplate e dos outros clientes.
> Anti-clone (INTAKE): 8 sites de outros clientes, referidos por codinomes (Projetos A a K) — o mapa fica fora do repositório.

## Princípio

**Trilhas ligam, nós marcam estados.** Todo elemento do chrome usa o vocabulário do sol: linha dourada fina (trilha), ponto/anel (nó), menta = verificado/ativo. Cursor, scrollbar, navegação mobile, header e footer contam a mesma história.

## Custom Cursor — cursor-nó v2

> **Entra na fase 03b (pós-lançamento).** O contrato de atributos (F3) vale desde as fases 02, 04 e 05. Código isolado em `components/cursor/`.

- **Conceito:** **cursor-nó**. Um núcleo + um anel, e perto dos nós do sol uma trilha que os conecta. O cursor conta a mesma história do sol: o ponteiro é o nó que percorre as trilhas.
- **NOT like:** lente (Projeto D), halo dourado (Projeto F), gota/blob (Projeto G), `CustomCursor` do boilerplate.

### F1. Princípios
1. **O ponteiro real é sempre o centro.** Núcleo (4 px) e anel seguem o mouse **1:1, sem lerp**. Só o **satélite** e a **linha-trilha** são suavizados.
2. **Expandir = deslocar.** O anel nunca cresce sobre texto (máx. **28 px** sobre elementos com texto). Rótulos e ícones vivem no **satélite**, deslocado do ponteiro, nunca sobre o alvo.
3. **Contraste por construção.** Anel com **traço duplo** (marfim + marinho) e rótulo em **pílula sólida**. **Proibidos** `mix-blend-mode`, transparência e blur para texto do cursor.
4. **Nunca esconde conteúdo** e nunca captura eventos (`pointer-events: none`).

### F2. Estados (tabela)

| Estado | Gatilho | Anel | Satélite |
|--------|---------|------|----------|
| `default` | fora de alvos | 20 px, traço duplo marfim/marinho | — |
| `text` | sobre texto/parágrafo | **reduz** para 14 px, só traço | — |
| `link` | links, botões, menu, CTA | 28 px, borda dourada | pílula com rótulo (`data-cursor-label`) ou seta |
| `card` | imagem/cartão (`data-cursor="card"`) | 28 px | pílula "Ver" / ícone |
| `node` | nó do sol (camada 2) | 28 px, borda menta, **encaixa** (magnetismo ≤ 12 px) | rótulo mono do nó (`01 SERVIÇOS`) |
| `whatsapp` | CTAs WhatsApp | 28 px, preenchimento dourado | pílula "WhatsApp" |
| `press` | `pointerdown` | anel −15% | — |
| `hidden` | campos de texto, iframes, saiu da janela | cursor nativo restaurado | — |

### F3. Contrato por atributos (API declarativa)
- `data-cursor="link|card|text|node|whatsapp|hide"`, `data-cursor-label="…"`, `data-cursor-theme="dark|light|gold"`, `data-cursor-avoid` (o satélite não pousa neste elemento).
- Um único listener delegado (`pointermove` + `pointerover`) lê o atributo mais próximo via `closest()`. Nenhum componente importa o cursor.
- Fases 02, 04 e 05 **apenas adicionam atributos**; a 03b implementa o provider em `components/cursor/`.

### F4. Temas por seção
`data-cursor-theme` define as cores do anel/pílula para ter contraste ≥ 3:1 (anel) e ≥ 4,5:1 (rótulo) sobre fundo marinho, claro ou dourado. Seções claras usam traço marinho + pílula marinho/marfim.

### F5. Colocação do satélite
Algoritmo: tentar posições candidatas (direita-baixo, esquerda-baixo, direita-cima, esquerda-cima) a 20 px do ponteiro; escolher a primeira que **cabe na viewport** e **não intersecta** elementos `data-cursor-avoid` ou o texto sob o ponteiro; trocar de lado com histerese (≥ 8 px) para não tremer; transição de posição ≤ 120 ms só em `transform`.

### F6. Linha-trilha
Perto de um nó (≤ 120 px, camada 2) uma linha dourada fina liga o núcleo ao nó (SVG/`<canvas>` 2D); desaparece ao sair. Atualização no `gsap.ticker` único.

### F7. Desempenho
Um `requestAnimationFrame`/ticker compartilhado com o sol e o Lenis; só `transform`/`opacity`; sem layout read por frame (cache de retângulos, invalidar em scroll/resize); sonda de FPS: frame médio > 24 ms por 500 ms → **cursor nativo restaurado** e camada rebaixada.

### F8. Ativação e fallbacks
Ativo **somente** em `(pointer: fine) and (hover: hover) and (min-width: 1280px)`, sem `prefers-reduced-motion`, sem `forced-colors`, sem `saveData`. Desligado em `pointer: coarse`. Cursor nativo restaurado: se o JS falhar, se o ponteiro sair da janela (`pointerleave` no documento), se o FPS cair, e **sempre** sobre `input`, `textarea`, `select`, `[contenteditable]`.

### F9. Critérios de aceite (fase 03b)
- [ ] Contraste do rótulo ≥ 4,5:1 e do anel ≥ 3:1 em todas as seções (script + captura).
- [ ] O anel nunca cobre texto: ≤ 28 px sobre texto; nenhuma sobreposição do satélite com `data-cursor-avoid`.
- [ ] Nenhum `mix-blend-mode`, blur ou transparência no texto do cursor (busca no código).
- [ ] Nativo restaurado nos 5 casos de F8 (testado).
- [ ] FPS ≥ 55 com CPU 4×; com 6× a sonda restaura o cursor nativo.
- [ ] Todas as superfícies interativas das fases 02/04/05 têm `data-cursor*` correto.
- [ ] Código só em `components/cursor/` + atributos; remover a pasta não quebra o build.
## Scrollbar

- **Track:** `--c-navy-900` (marinho profundo).
- **Thumb:** `--c-gold` com 8 px de largura, `border-radius` 4 px, hover `--c-mint`.
- **Width / radius:** 8 px / 4 px (Firefox: `scrollbar-width: thin`).
- **Mobile:** overlay nativo do sistema; não estilizar. A **Trail** vertical (progresso por seção) substitui a barra de progresso.

## Mobile Navigation

- **Pattern:** **Trail Index sheet**.
- **Estrutura:** painel `--c-navy-900` que sobe do rodapé (clip-path `inset(100% 0 0 0)` para `inset(0)`, 450 ms `power3.out`), ocupando a viewport abaixo do header. Quatro itens grandes (Syne, `clamp(2rem, 9vw, 3rem)`) numerados `01` a `04` em JetBrains Mono, **ligados por uma trilha dourada vertical** com um nó por item; o nó do item em foco/ativo acende menta. Botão WhatsApp sólido fixo no rodapé do painel (≥ 56 px). Fecha com `Esc`, botão ou toque no item.
- **Gatilho (I):** botão com rótulo visível **"Menu"** e `aria-expanded`. Ao abrir: `aria-modal`, `inert` no fundo e **a `WhatsAppBar` global é escondida** (o WhatsApp vive no rodapé do painel, sem barras sobrepostas).
- **Desempenho (I):** testar o `clip-path` com CPU 4× e 6× (Cursor Browser (MCP `cursor-ide-browser`)); **fallback para opacidade** se o FPS cair.
- **Acessibilidade:** focus trap, retorno do foco ao gatilho, `aria-expanded`, alvos ≥ 48 px, sem animação em reduced-motion (apenas troca de opacidade).
- **NOT:** fullscreen overlay com stagger centralizado (Projeto A), drawer lateral esquerdo/direito (Projetos B, C, D, E), hamburger fullscreen padrão do boilerplate.
- **Justificativa de diferenciação:** a navegação **é** o Sol-Índice vertical (índice numerado com trilha), não um menu genérico.

## Header

- **Layout archetype:** barra fina (altura 56 px mobile / 64 px desktop), sólida (`--c-navy-900`), borda inferior `--c-navy-700` com alfa. Marca à esquerda (**`mark-simple.svg`, altura ≥ 28–32 px**, mais wordmark SVG inline); 4 links centralizados à direita (Serviços, Projetos, Como trabalhamos, Sobre) + botão WhatsApp sólido.
- **Scroll behavior:** no hero, o sol grande faz **troca/cross-fade** para o `mark-simple` do header conforme a rolagem (só `transform`/`opacity`; o sol completo não encolhe até 32 px); depois do hero o header permanece fixo, sem glass e sem blur; o link da seção ativa recebe um nó menta pequeno antes do rótulo.
- **NOT:** glassmorphism, header que esconde ao rolar, logo centralizado.

## Footer

- **Style:** assinatura da trilha. A trilha vertical da página termina no **núcleo** do sol desenhado no rodapé (ponto onde o CTA final aterrissa).
- **Conteúdo:** CTA WhatsApp (primário), e-mail alternativo (quando confirmado, P4), "São José do Rio Preto (SP) · atendimento online em todo o Brasil", link de privacidade, rótulo mono "A·B·M + SOL" só se a origem do nome for autorizada (P14).
- **NOT:** NAP institucional de clínica em 3 colunas; carrossel de redes; ícones sociais sem conteúdo real.

## Hero Archetype

- **Type:** `typographic-statement` (slot B) com assinatura **Sol-Índice**.
- **Explicitly NOT:** split 2 colunas institucional em fundo neutro; headline centralizada + botão; hero com foto ou vídeo (Projeto A slot A, Projeto C slot C); arco SVG (Projeto C); linha vertical + chips de jornada (Projeto D slot D); halo/glow branco e objeto centrado (Vercel); cubo 3D centrado (Resend).

## Loading Screen

- **Concept:** **nenhuma**. O h1 é o LCP e aparece no primeiro paint. O sol "carrega" desenhando-se, o que dispensa o loading.

## Page Transitions

- **Type:** fade de **ENTRADA** ≤ 250 ms via `template.tsx` (ou nenhuma transição). **Sem `AnimatePresence` com `exit` no App Router.** Header e marca persistem entre rotas. Reduced-motion: sem transição.

## Matriz anti-clone (resumo)

| Elemento | ABMSOL | Evitar |
|----------|--------|--------|
| Cursor | cursor-nó v2 que encaixa nos nós (03b) | lente (Projeto D), halo (F), gota (G) |
| Nav mobile | Trail Index sheet com gatilho "Menu" | fullscreen stagger (A), drawers (B/C/D/E) |
| Header | barra fina sólida, `mark-simple` + wordmark SVG | glass, logo centralizado |
| Hero | tipográfico + Sol-Índice SVG | split cream, vídeo, arco, linha+chips |
| Paleta | marinho + dourado + menta | creme/mauve/bronze de clínicas |
| Tipografia | Syne + Instrument Sans + JetBrains Mono; wordmark SVG em curvas | pares dos demais projetos (serifadas de clínica, Exo 2+Urbanist) |
