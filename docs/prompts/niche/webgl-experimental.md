# Nicho: WebGL / Three.js / Shaders (experimental)

> **Não é default do boilerplate.** Só quando o brief e o nicho permitirem explicitamente.

## Quando usar

| Nicho | WebGL |
|-------|-------|
| Gastronomia / sucos (AllSucos) | ⚠️ liquid shader leve, hero produto |
| Produtos artesanal | ⚠️ vapor/partículas sutis |
| Clínica / médico | ❌ salvo pedido excepcional do cliente |
| B2B serviços | ❌ |

## Quando o brief-architect deve incluir

- INTAKE marca WebGL / liquid shader
- Anti-clone não lista projeto que já usa Three.js de forma similar
- Performance budget aceito (mobile = fallback estático)

## Stack se aprovado

```
- @react-three/fiber + @react-three/drei (avaliar bundle)
- OU shader CSS/SVG morph (preferir primeiro — mais leve)
- GSAP + ScrollTrigger para sincronizar com Lenis
```

## Regras

- **Mobile:** poster estático ou CSS-only; sem WebGL pesado
- **Fallback:** se WebGL falhar, hero com imagem/vídeo
- **Bundle:** medir impacto; fase 06 com `vercel-react-best-practices`
- **prefers-reduced-motion:** desligar canvas animado

## Skills a invocar

- `gsap-scrolltrigger`, `cinematic-scroll`
- Pesquisar depois: skills Three.js da comunidade (não instaladas por padrão)

## NEVER

- Three.js em todo site de clínica "porque é Awwwards"
- Shader fullscreen sem fallback
- 60fps teórico com jank em Android médio

## Referências de estudo

- [Awwwards Course Notes (Marius Ballot)](https://github.com/MariusBallot/07-2021-Awwwards-Course-Documentation) — shaders, distorção
- Pair com `docs/prompts/doc-awwwards.md` para performance de vídeo/imagem
