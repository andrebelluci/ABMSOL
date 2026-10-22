# BRIEFING — [NOME DO PROJETO]

> Template de **saída** do brief-architect. Referência em `docs/prompts/dev-prompt-generico.md`.  
> O architect preenche a partir de `INTAKE.md` + `niche/*.md`. Não envie este arquivo cru ao executor.

---

## Identidade do Projeto

```
# PROJECT: [Nome]
# Type: [institucional / portfólio / médico / clínica / gastronomia / produtos]
# Niche: [vertical]
# Stack: Next.js 14 App Router + TypeScript + static export
```

---

## Conceito Visual

```
## Visual Concept
"[Nome do conceito]" — [Descrição que um designer reconheceria.
Evite: moderno, clean, elegante sem complemento.]
```

## Visual Style Stack

| Papel | Estilo | Onde |
|-------|--------|------|
| **Dominante** | | |
| **Suporte 1** | | |
| **Suporte 2** | | opcional |
| **Disciplina** | Minimalism entre blocos | espaçamento |

### Decisão do architect
[Por que esta combinação para nicho + intake]

### Descartados
- [estilo] — [motivo]

---

## Legal e compliance (sempre)

| Item | Entrega |
|------|---------|
| Termos de Uso | `/termos-de-uso/` |
| Política de Privacidade | `/politica-de-privacidade/` |
| Cookies LGPD | `CookieConsent` |
| SEO básico | metadata, robots, sitemap, OG |

## Features (`site.config.json`)

```json
"features": { "blog": false, "localSeoStrong": false }
```

- **Blog SIM:** `/blog/` + posts `content/blog/*.md`
- **SEO local SIM:** JsonLd LocalBusiness, NAP, geo, areaServed

Ver `docs/prompts/legal-seo-blog.md`.

---

## Referências Visuais

```
## Visual References
- [URL] — [o que roubar]
```

---

## Chrome Identity (OBRIGATÓRIO — único por projeto)

> Detalhado em `docs/DIFFERENTIATION.md`. Resumo no brief:

### Custom Cursor
- Metaphor: [ex: gota de suco / lente clínica / pincel de cera / nenhum]
- NOT like: [projetos do anti-clone]
- States: default | link | media | [específico do negócio]
- Desktop only; disabled on `pointer: coarse`

### Scrollbar
- Track color / thumb color / width / border-radius
- Mobile: [estilizar | overlay fino | esconder com justificativa]

### Mobile Navigation
- Pattern: [fullscreen stagger | bottom sheet | drawer lateral | cinema menu]
- Colors, typography, open/close animation
- NOT: hamburger fullscreen padrão do boilerplate sem justificativa

### Header
- Layout: [logo centro | split | minimal hidden until scroll]
- Scroll: [shrink + blur | hide/show | transparent → solid]

### Footer
- Style: [NAP institucional | storytelling | minimal links]

### Hero Archetype
- Type: [video loop | editorial portrait | product pour | tabletop cinema | typographic]
- Explicitly NOT: [split 2-col CTA | centered headline + button]

### Loading Screen
- Concept + max duration (≤ 1.6s)

### Page Transitions
- [clip-path | fade | shared element | none]

---

## Tipografia

```
Display: [fonte] — next/font
Body: [fonte] — next/font
Rules: [alinhamento, clamp sizes, letter-spacing labels]
```

**Nunca:** Inter, Roboto, Arial como principal.

---

## Sistema de Cores

```
--bg, --surface, --text, --accent, --accent-dark
```

Sempre CSS custom properties em `app/globals.css`. Máx. 5 variáveis principais.

---

## Logo

```
Status: A SVG | B PNG | C placeholder tipográfico SVG
Animation on load / behavior on scroll
```

---

## Páginas

```
- Home: [objetivo]
- [rota]: [objetivo]
```

---

## Animações

Descreva **comportamento**, não só efeito:

```
Hero load: [frame a frame, 2s]
Scroll reveals: [trigger, ease, o que NÃO fazer]
Hover: [clip-path / cor — sem scale genérico]
```

---

## Imagens e Vídeos

Placeholder semântico + alt como foto final. Vídeo hero: WebM+MP4, poster, off no mobile.

---

## NEVER USE

Específico do cliente + regras do nicho (`docs/prompts/niche/`).

---

## Mobile-First (mandatory)

- Base CSS/Tailwind para 375px
- `min-width`: 768 / 1280 / 1920
- `100dvh` + fallback `100vh`
- Sem cursor custom no mobile
- GSAP desktop-only em `matchMedia('(min-width: 1280px)')`
- Vídeo background off no mobile

---

## Tech Stack (sem exceções)

```
- Next.js 14 App Router + TypeScript
- output: 'export' (static)
- Tailwind CSS 3
- GSAP + ScrollTrigger (lib/gsap.ts)
- Framer Motion (transições)
- Lenis (SmoothScroll provider)
- Lucide React (ícones)
- react-hook-form + zod (formulários)
- Deploy: out/ → cPanel | npm run deploy:mockup
```

**Não usar:** HTML vanilla multi-page, jQuery, Elementor.

---

## SEO

Primary keyword, city, schema type, title pattern, FAQ schema se aplicável.

---

## Copy Tone (anti-slop)

```
## Copy Tone
Voice: [tom do cliente — do INTAKE]
Banned phrases: Elevate, Seamless, Unleash, Next-Gen, soluções inovadoras, [outros do nicho]
Example headline: [linha real proposta]
Example CTA: [específico do serviço — não "Saiba mais"]
Body: frases curtas, concretas; em clínica = confiança sem jargão hospitalar
```

Ver skill `design-taste-frontend` na implementação.

---

## Fases de execução

Ver `docs/phases/` — uma fase por sessão do phase-executor.
