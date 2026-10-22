# Hero Archetypes — composição e anti-padrões

> Biblioteca para **brief-architect** e **brief-reviewer**.  
> Nomear o archetype **não basta** — o BRIEF e a fase `03-hero.md` devem especificar **composição** e **motion**.

## Heros "bobas" (proibidas por default)

O architect **não** deve gerar estas composições salvo opt-in explícito no INTAKE:

| Anti-padrão | Por que falha | Sinais no brief/fase 03 |
|-------------|---------------|-------------------------|
| **Split institucional** | Headline numa coluna, visual na outra, fundo neutro — parece landing SaaS | `lg:grid-cols-2`, copy verde/cinza fora do elemento assinatura |
| **Carrossel multi-item** | 3–5 cards/garrafas em arco ou strip sem coreografia — genérico Awwwards-fail | `rotateY` ring, 5 itens visíveis, dots de paginação |
| **Headline centrada + CTA** | Template 2019 | `text-center`, botão primário acima da dobra |
| **Vídeo drone + overlay escuro** | Clínica/corporativo clone | hero vídeo full sem interação de produto |
| **Stats flutuantes** | gpt-taste bane no hero | números + labels pill no above-the-fold |
| **Placeholder motion** | fade-in genérico sem assinatura | só `opacity 0→1` em tudo |

Se o INTAKE pedir carrossel de produto, exigir **coreografia nomeada** (ex.: duo ativa/próxima, não ring de 5).

---

## Archetypes válidos (escolher 1 + compor)

### `product-duo-immersive`

**Quando:** bebidas, garrafas, embalagem, produto físico com variações (sabores, volumes).

```
┌──────────── 100dvh ────────────┐
│ [chrome]                        │
│  LIQUIDO full-bleed (dominante) │
│  NOME gigante sobre líquido     │
│  chips meta (volume, %)         │
│         [garrafa ATIVA] [next→] │
│  [setas / swipe]                │
└─────────────────────────────────┘
```

| Aspecto | Spec |
|---------|------|
| Layout | Full-bleed; copy **sobre** o elemento assinatura (líquido, não fundo creme) |
| Produto | **2 visíveis** desktop: ativa + próxima clicável |
| Motion | Troca de sabor = cor + turbulência líquida + transição produto |
| Mobile | 1 produto + swipe no hero |
| NOT | Grid 2 colunas; arco 3D com 5 itens; dots de 11 sabores |

---

### `editorial-asymmetric`

**Quando:** clínica premium, manifesto, marca com forte tipografia.

> ⚠️ **Não usar como default** para todo o portfólio estética. Ver `portfolio-hero-slots.md` — slot D exige assinatura além do split.

```
┌────────────────────────────────┐
│  HEADLINE wide (2–3 linhas)    │
│  alinhada esq, 60% largura      │
│              [imagem offset]    │
│              parallax leve      │
└────────────────────────────────┘
```

| Aspecto | Spec |
|---------|------|
| Layout | Assimétrico; headline **não** centrada na página |
| Motion | clip-reveal, parallax imagem (desktop only) |
| Assinatura obrigatória | Linha vertical, chips jornada, máscara forte, arco visível — **não** só foto offset |
| NOT | Hero centrada; vídeo clínica genérico; split cream sem assinatura |

---

### `immersive-full-bleed`

**Quando:** foto ambiente forte ou vídeo macro; impacto acima da dobra sem cair em split institucional.

```
┌──────────── 100dvh — mídia edge-to-edge ────────────┐
│ [chrome glass]                                        │
│  HEADLINE sobre scrim / mix-blend                     │
│  [foto ou vídeo full-bleed — não caixa offset cream]  │
│  CTA texto ou pill discreto                           │
└───────────────────────────────────────────────────────┘
```

| Aspecto | Spec |
|---------|------|
| Layout | Mídia ocupa 100% largura/altura; copy em overlay com contraste garantido |
| Motion | Ken Burns leve, fade vídeo, clip-reveal tipo sobre mídia |
| Mobile | Stack ou poster estático; vídeo off |
| NOT | `lg:grid-cols-2` com fundo cream; caixa de imagem flutuante à direita |

---

### `scroll-chapter-open`

**Quando:** narrativa de abertura curta; handoff rápido para conversão (estética premium com história).

| Aspecto | Spec |
|---------|------|
| Layout | Hero = capítulo 1; pode pin **≤ 1 viewport** adicional |
| Motion | ScrollTrigger pin curto; camadas com profundidade (z-index, parallax leve) |
| NOT | Pin de 5+ telas (clone DocePele/Pelle); cinema mesa de outro cliente |

---

### `cinematic-chapter`

**Quando:** narrativa longa, pin scroll, jornada (BarbaraBelluci-style — mas chrome único).

| Aspecto | Spec |
|---------|------|
| Layout | Capítulo 1 = hero; pode pin na seção seguinte |
| Motion | ScrollTrigger pin; profundidade em camadas |
| NOT | Copiar cinema mesa de outro cliente do portfólio |

---

### `typographic-statement`

**Quando:** poucos assets, marca verbal forte.

| Aspecto | Spec |
|---------|------|
| Layout | Tipo display ocupa 70%+ da viewport |
| Motion | Split-text, máscara, cor que muda no scroll |
| NOT | Inter/Roboto + subtítulo genérico + CTA |

---

### `ambient-video-product`

**Quando:** vídeo macro do produto/procedimento disponível.

| Aspecto | Spec |
|---------|------|
| Layout | Vídeo full-bleed; UI mínima sobreposto |
| Mobile | **Poster estático** — vídeo off |
| NOT | Drone B-roll sem relação com o serviço |

---

## Bloco obrigatório no BRIEF

O architect deve incluir:

```markdown
## Hero Composition

- **Archetype:** [nome da lista acima]
- **Layout:** full-bleed | asymmetric | chapter | ...
- **Elemento assinatura:** líquido | produto duo | vídeo | tipo display | ...
- **Motion na troca/entrada:** [descrever em frases — timing, easing, o que sincroniza]
- **Desktop:** [quantos elementos protagonistas visíveis — máx. recomendado: 2 produtos]
- **Mobile:** [swipe | strip | stack | vídeo off]
- **Explicitly NOT:** [2–4 anti-padrões desta lista]
```

## Bloco obrigatório em `03-hero.md`

Espelhar Hero Composition com **ASCII ou lista fechada de componentes**.  
Proibir implementação que contradiga `Explicitly NOT`.

## Referência visual (opcional — qualquer formato)

No INTAKE, o usuário pode fornecer **um ou mais**:

- Screenshot em `docs/assets/references/hero.png`
- URL de site/mockup
- Path de mockup local (`dharmalabs/...`)
- Descrição textual da animação (obrigatória se só screenshot)

O **brief-architect** deve:

1. Ler screenshot via MCP/browser se o usuário pedir na sessão de briefing
2. Transcrever para **Hero Composition** + motion em prosa (não assumir carrossel genérico)
3. Gerar `03b-hero-polish.md` **somente** se a fase 03 inicial for scaffold e a referência exigir polish — não é obrigatório em todo projeto

## Portfólio — não repetir o mesmo hero

Antes de fixar archetype, o architect lê:

1. `docs/prompts/portfolio-hero-slots.md`
2. Bloco **Slots usados** em `docs/INTAKE.md` (`npm run intake:portfolio`)

**Falha de brief** se 2 projetos ativos no mesmo nicho compartilham slot + Cormorant/DM Sans + cream sem override documentado.

---

## Reviewer — falha automática se

- Hero archetype nomeado mas **sem** seção Hero Composition no BRIEF
- Fase 03 descreve anti-padrão proibido (split + carrossel 5 itens) sem opt-in no INTAKE
- Motion só diz "fade-in" / "stagger" sem elemento assinatura
- Contradição: BRIEF NEVER USE carrossel genérico + fase 03 com ring/carousel
- `editorial-asymmetric` sem elemento assinatura além do split (ver `brief-awwwards.md`)
- Mesmo slot hero que projeto no anti-clone sem seção Override de slot
