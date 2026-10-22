# Fase 04 — Seções da home (TEMPLATE)

> **Não executar este arquivo.** O brief-architect personaliza para `04-sections-home.md`.

## Escopo

Uma seção por bloco no BRIEF — **não implementar tudo num único prompt**.

| Seção (exemplo) | Arquivo |
|-----------------|---------|
| Sobre / manifesto | `components/sections/AboutSection.tsx` |
| Serviços / categorias | `components/sections/ServicesSection.tsx` |
| Prova social | `components/sections/TestimonialsSection.tsx` |
| CTA final | `components/sections/CTASection.tsx` |
| `app/page.tsx` | Compor seções abaixo do hero (fase 03) |

**Não tocar:** hero (fase 03), páginas internas (fase 05).

## Motion (do BRIEF)

| Seção | Trigger / comportamento |
|-------|-------------------------|
| [nome] | [fade-up / pin / stagger] |
| ... | ... |

## Critérios de aceite

- [ ] Cada seção com `prefers-reduced-motion`
- [ ] Imagens com `alt` descritivo
- [ ] Sem carrossel como único container de conteúdo principal
- [ ] Links internos com trailing slash (`/contato/`)

## QA

`npm run build` · scroll completo da home · `/qa-static-export`
