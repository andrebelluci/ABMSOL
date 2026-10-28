# ABMSOL — Soluções Digitais

Site do estúdio ABMSOL (sites premium, sistemas e suporte de TI). Next.js 14 com `output: 'export'`, Tailwind, GSAP, Framer Motion e Lenis. Deploy na Vercel.

## Começar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # export estático em out/
npm run lint
```

## Documentação

- `docs/PLAN.md` — plano aprovado (arquitetura, Sol-Índice, design system, orçamento de performance, fases 0–7)
- `docs/INTAKE.md` — insumos e pendências
- `docs/BRIEF.md`, `docs/DIFFERENTIATION.md`, `docs/phases/` — gerados na Fase 0
- `LOOP_STATE.md` — estado do loop de criação
- `AGENTS.md` — regras para agentes

O nome da marca vive só em `site.config.json`.

## Deploy

```bash
npm run deploy:vercel
```

O endereço canônico é `https://abmsol.com.br`. O mesmo HTML também responde em `abmsol.vercel.app`.
