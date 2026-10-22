# Motion, mobile e polish Awwwards

Regras transversais para brief-architect, phase-executor e qa-static-export.
Complementa AGENTS.md, `brief-awwwards.md` e docs/prompts/css-motion-patterns.md.

## Brief vs implementação

| Camada | Documento |
|--------|-----------|
| Impacto e referências | `brief-awwwards.md` |
| Coreografia do hero | BRIEF → Hero Composition + `03-hero.md` |
| Motion técnico | Este arquivo |

## Motion

- Registrar GSAP via lib/gsap.ts
- Cleanup com gsap.context() ou useGSAP
- ScrollTrigger + Lenis com ScrollTrigger.update() no scroll
- Parallax/pin desktop-only com gsap.matchMedia
- prefers-reduced-motion desliga pin, parallax e autoplay
- Intro max 6s; skip com scroll, clique ou ?skip_intro=1
- **Hero premium+:** entrada com timeline nomeada (eyebrow → headline → mídia → CTA) — não opacity única em tudo

## Mobile

- 100dvh com fallback 100vh
- Touch targets >= 48px
- Cursor custom off em pointer coarse
- Video hero: poster no mobile; autoplay off
- Nav mobile dedicada

## Performance

- WebP/AVIF via generate-images.mjs
- Listeners globais com cleanup
- WebGL com dispose no unmount
- Vídeo hero: lazy load, muted, playsInline, preload metadata

## QA

- 375px e 1440px sem overflow
- npm run build e lint antes de deploy:mockup
- Hero: assinatura visível sem depender de placeholder gradiente genérico
