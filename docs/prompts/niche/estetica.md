# Nicho: Estética / harmonização facial

Constraints para o **brief-architect**. Base próxima de clínica, com tom mais sensorial e aspiracional.

> **Anti-convergência:** ler `docs/prompts/brief-awwwards.md` e `portfolio-hero-slots.md` — não defaultar editorial-asymmetric para todo cliente estética.

## Conceito típico

- Sofisticação feminina sem clichê “rosa bebê”
- Cream, nude, rose gold, champagne **ou** mauve/sage — variar entre projetos do portfólio
- Fotos de pele/textura com luz suave; **vídeo macro ambiente** permitido (slot A)

## Hero — escolher slot (não repetir no portfólio)

| Slot | Direção |
|------|---------|
| **A** | Vídeo macro full-bleed consultório/ambiente — poster mobile |
| **B** | Tipografia display 70%+ viewport |
| **C** | Foto edge-to-edge com copy overlay |
| **D** | Editorial assimétrico **com** assinatura (linha, chips, arco visível) |
| **E** | Capítulo scroll curto (pin ≤ 1 viewport) |

## Chrome permitido

| Elemento | Direção |
|----------|---------|
| Cursor | Anel fino, labels discretas (“VER”, “AGENDAR”) — variar metáfora entre projetos |
| Scrollbar | Accent da marca, 4–6px |
| Nav mobile | Fullscreen editorial **ou** drawer lateral — **alternar** entre clientes |
| Hero | Ver slots acima — não só retrato offset cream |
| Liquid/WebGL | ⚠️ só pontual (detalhe decorativo), não protagonista |

## Motion

- Reveal de seções com fade + translateY curto
- Cards de tratamento com hover de borda/clip, não scale 1.05 genérico
- Before/after com slider se procedimentos visuais
- Lenis suave; pin scroll **curto** se slot E
- Hero: coreografia nomeada (clip linha, máscara, vídeo fade) — ver `brief-awwwards.md`

## NEVER USE (nicho)

- Fonte script em títulos longos
- Ícones de coração/espelho genéricos
- “Realce sua beleza natural” como única headline
- Carrossel de depoimentos como hero
- Stock de modelos que não representam o público local
- **Split cream 58/42 sem assinatura** quando outro projeto do portfólio já usa o mesmo padrão

## Páginas comuns

Home, Tratamentos faciais/corporais, Harmonização, Clube/assinatura, Contato

## Features sugeridas

```json
"features": { "blog": false, "localSeoStrong": true }
```

## Schema

`localBusinessSchema` com tipos `['LocalBusiness', 'HealthAndBeautyBusiness']` na fase 06.
