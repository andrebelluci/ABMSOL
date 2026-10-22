# QA Checklist — pós-fase

Rode após `npm run build` e `npm run lint`. Marque o que se aplica à fase atual.

## Build

- [ ] `npm run build` sem erros
- [ ] `npm run lint` sem erros
- [ ] `out/index.html` gerado

## Chrome (fase 02+)

- [ ] Cursor customizado conforme `DIFFERENTIATION.md` (desktop)
- [ ] Sem cursor custom em touch / `pointer: coarse`
- [ ] Scrollbar estilizada conforme brief (ou justificativa para esconder)
- [ ] Nav mobile com padrão do brief (não default genérico)
- [ ] Header/footer distintos do scaffold do boilerplate

## Motion

- [ ] `prefers-reduced-motion` respeitado
- [ ] Vídeo hero desligado no mobile (poster)
- [ ] Sem animação que depende só de hover no mobile
- [ ] GSAP contexts com cleanup no unmount

## Layout

- [ ] 375px — sem scroll horizontal
- [ ] 768px / 1280px / 1920px — layout coerente
- [ ] Touch targets ≥ 48×48px
- [ ] Conteúdo não escondido atrás do header fixo

## Acessibilidade

- [ ] Imagens com `alt` descritivo
- [ ] Inputs com label
- [ ] Foco visível em links/botões
- [ ] Contraste legível

## Next.js export

- [ ] Sem `'use client'` desnecessário
- [ ] `next/image` com dimensões quando usado
- [ ] Links internos compatíveis com `basePath` (mockup)
- [ ] `generateStaticParams` em rotas dinâmicas

## SEO (fase 05–06)

- [ ] `createMetadata()` por página
- [ ] JsonLd quando aplicável
- [ ] Sitemap atualizado
- [ ] `robots.txt` / OG image

## Anti-clone

- [ ] Hero não é cópia óbvia de outro projeto listado no INTAKE
- [ ] Chrome não replica Vitta/Pelle/DocePele sem intenção

## Copy anti-slop (fases 03–05)

- [ ] Sem clichês: Elevate, Seamless, Unleash, Next-Gen, "soluções inovadoras"
- [ ] CTAs específicos do negócio (não só "Saiba mais")
- [ ] Headlines alinhadas à seção Copy Tone do BRIEF

## Manual (você)

- [ ] Navegar no browser — sensação alinhada ao conceito
- [ ] Testar menu mobile em dispositivo real ou DevTools
- [ ] _(opcional)_ Playwright MCP para bug pontual
