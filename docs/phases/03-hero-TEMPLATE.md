# Fase 03 — Hero (TEMPLATE)

> **Não executar este arquivo.** O brief-architect copia e personaliza para `03-hero.md` por projeto.  
> Base: `docs/prompts/hero-archetypes.md` + seção Hero Composition do `BRIEF.md`.

## Escopo

| Arquivo | Ação |
|---------|------|
| `components/sections/HeroSection.tsx` | **Criar** — composição conforme Hero Composition |
| `components/ui/*` | Componentes do hero (liquid, produto, nav hero, etc.) |
| `app/page.tsx` | Renderizar `<HeroSection />` + stubs de seções se necessário |

**Não tocar:** chrome (fase 02), seções completas (fase 04).

## Hero Composition (preencher do BRIEF)

```
- Archetype: [nome]
- Layout: [full-bleed | asymmetric | ...]
- Elemento assinatura: [...]
- Desktop: [N protagonistas — máx. 2 produtos]
- Mobile: [...]
- Explicitly NOT: [...]
```

### Layout (ASCII do projeto)

```
[Colar ASCII da composição aprovada no BRIEF — não usar grid 2 col split por default]
```

### Motion

| Momento | Comportamento |
|---------|---------------|
| Entrada 0–2s | [do BRIEF / INTAKE] |
| Interação | [swipe, hover, troca estado] |
| Troca de estado | [o que sincroniza: cor, liquid, produto] |
| `prefers-reduced-motion` | [degradação] |

## Regras anti-hero-boba

- [ ] **Não** `lg:grid-cols-2` split headline | visual em fundo neutro — salvo archetype `editorial-asymmetric` **com assinatura** documentada no BRIEF (ver `brief-awwwards.md`)
- [ ] **Não** carrossel 3–5 itens em arco 3D — salvo opt-in explícito no INTAKE
- [ ] **Não** dots de paginação como navegação principal de produto
- [ ] **Não** CTA primário competindo com o protagonista do hero
- [ ] Motion tem **elemento assinatura** (não só opacity fade)

## Critério de parada

- [ ] `npm run build` passa
- [ ] `npm run lint` passa
- [ ] Hero implementa **Hero Composition** do BRIEF (não interpretação genérica de carrossel)
- [ ] `prefers-reduced-motion` degradado
- [ ] Mobile conforme spec
- [ ] Integração com chrome (FlavorTheme / tokens) se aplicável

## Validação visual (recomendada)

Se INTAKE tiver referência (screenshot, URL, mockup):

- Comparar `localhost` com referência **antes** da fase 04
- Falha de impacto visual = corrigir nesta fase ou gerar `03b-hero-polish.md`

## Referências

- `docs/BRIEF.md` — Hero Composition, Animações
- `docs/DIFFERENTIATION.md` — Hero archetype
- `docs/prompts/hero-archetypes.md`

## Skills

`gsap-next-motion`, `gsap-react`, `design-taste-frontend`, `frontend-design`, `cinematic-scroll` (se chapter/pin)
