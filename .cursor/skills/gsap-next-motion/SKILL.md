---
name: gsap-next-motion
description: >-
  Padrões GSAP + ScrollTrigger + Lenis para Next.js 14 App Router neste
  boilerplate. Use em fases de hero, seções e chrome animado.
---

# GSAP + Next.js — Motion Stack

Padrões deste boilerplate. Para API GSAP completa, instale skills oficiais (ver `docs/SKILLS.md`).

## Setup do projeto

```typescript
// lib/gsap.ts — já existe; use registerGSAP() antes de animar
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger)
}
```

## React — useGSAP pattern

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react' // se instalado; senão useEffect + gsap.context
import { gsap, registerGSAP } from '@/lib/gsap'

export function AnimatedSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    registerGSAP()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from('.reveal', {
      opacity: 0,
      y: 24,
      stagger: 0.08,
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    })
  }, { scope: ref })

  return <section ref={ref}>...</section>
}
```

Sem `@gsap/react`, use `useEffect` + `gsap.context(() => {...}, ref)` e `ctx.revert()` no cleanup.

## Lenis + ScrollTrigger

O provider `SmoothScroll` configura Lenis. ScrollTrigger deve usar o scroller do Lenis quando pin/scrub:

```typescript
ScrollTrigger.scrollerProxy(document.documentElement, {
  scrollTop(value) {
  if (arguments.length && value !== undefined) {
    window.scrollTo(0, value)
  }
  return window.scrollY
  },
})
```

Siga o padrão já em `components/providers/SmoothScroll.tsx` do projeto.

## matchMedia (obrigatório)

```typescript
const mm = gsap.matchMedia()

mm.add('(min-width: 1280px)', () => {
  // parallax, pin, cursor-linked — desktop only
})

mm.add('(max-width: 1279px)', () => {
  // versão simplificada ou estático
})
```

## Loading screen → hero

Dispare animação do hero após `LOADING_COMPLETE_EVENT` de `LoadingScreen.tsx` — não competir com loading.

## Padrões Awwwards (este stack)

| Efeito | Implementação |
|--------|---------------|
| Text reveal | `clip-path: inset()` + stagger palavras |
| Pin section | ScrollTrigger `pin: true` + `end: '+=100%'` |
| Horizontal journey | pin + `xPercent` scrub (fallback vertical mobile) |
| Counter | `gsap.to(obj, { val, snap, onUpdate })` |
| Cursor lerp | `requestAnimationFrame` ou GSAP quickSetter — ver CustomCursor |

## Performance

- Animar `transform` e `opacity` — evitar `width`, `height`, `top`
- `will-change` só durante animação ativa
- `ScrollTrigger.refresh()` após load de imagens/vídeo
- Matar triggers no cleanup: `ScrollTrigger.getAll().forEach(t => t.kill())` no scope revert

## NEVER

- ScrollTrigger em todo componente sem context cleanup
- Parallax pesado no mobile
- Hover-only motion sem equivalente touch
- SplitText sem fallback reduced-motion

## Skills externas recomendadas

```bash
npx skills add https://github.com/greensock/gsap-skills --skill gsap-react --skill gsap-scrolltrigger
```

Pair com `cinematic-scroll-skill` para narrativa scroll-driven avançada.
