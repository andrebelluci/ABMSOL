# Nicho: Serviços locais (jardinagem, limpeza, manutenção, etc.)

Constraints para o **brief-architect**.

## Conceito típico

- Confiança, clareza e prova social (antes/depois, depoimentos)
- Paleta verde/terra ou azul industrial — evitar template “SaaS startup”
- Hero com foto real de serviço ou vídeo curto de campo

## Chrome permitido

| Elemento | Direção |
|----------|---------|
| Cursor | Simples ou desligado — priorizar utilidade |
| Scrollbar | Discreta, cor da marca |
| Nav mobile | Lista clara + WhatsApp fixo |
| Hero | Split assimétrico com CTA WhatsApp OU full-bleed com overlay |
| Liquid/WebGL | ❌ |

## Motion

- Contadores (anos, clientes, serviços)
- Cards de serviço com ícone + hover de borda
- GSAP leve em scroll; nada teatral
- Galeria antes/depois se aplicável

## NEVER USE (nicho)

- Ilustrações stock de capacete genérico
- 6 badges “qualidade, agilidade, preço…” em grid
- Formulário longo acima da dobra sem CTA rápido
- Mapa embed sem endereço legível em texto

## Páginas comuns

Home (one-page ou multi), Serviços, Sobre, Contato/WhatsApp

## Features sugeridas

```json
"features": { "blog": false, "localSeoStrong": true }
```

## Recuperação via mockup

Sites simples podem usar `scripts/port-html-embed.mjs` — ver `docs/USAGE.md` § Recuperação.
