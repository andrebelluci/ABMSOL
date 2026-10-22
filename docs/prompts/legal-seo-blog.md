# Legal, cookies, SEO e blog — requisitos do loop

> **Sempre** em todo projeto. **Blog** e **SEO local forte** conforme `site.config.json` → `features`.

## Matriz de entrega

| Item | Quando | Fase típica |
|------|--------|-------------|
| Termos de uso (`/termos-de-uso/`) | **Sempre** | 05 |
| Política de privacidade (`/politica-de-privacidade/`) | **Sempre** | 05 |
| Modal / banner cookies LGPD | **Sempre** | 05 |
| SEO básico (metadata, canonical, OG, robots, sitemap) | **Sempre** | 06 |
| JsonLd mínimo (`Organization` ou `LocalBusiness`) | **Sempre** | 06 |
| `public/llms.txt` | **Sempre** | 06 |
| **Blog** (`/blog/`, `/blog/[slug]/`) | `features.blog: true` | 05 |
| **SEO local forte** | `features.localSeoStrong: true` | 06 |

## `site.config.json`

```json
{
  "name": "Cliente",
  "slug": "cliente",
  "url": "https://exemplo.com.br",
  "features": {
    "blog": false,
    "localSeoStrong": false
  }
}
```

O **brief-architect** copia flags do INTAKE para `site.config.json` e BRIEF.

---

## Legal (sempre)

### Rotas

| Rota | Arquivo conteúdo |
|------|------------------|
| `/termos-de-uso/` | `content/legal/termos-de-uso.md` |
| `/politica-de-privacidade/` | `content/legal/politica-de-privacidade.md` |

### Conteúdo markdown

Frontmatter mínimo:

```yaml
---
title: Termos de Uso
description: Termos de uso do site [Nome].
updatedAt: 2026-01-01
---
```

Corpo: texto **placeholder jurídico** adaptado ao nicho (não lorem ipsum). Architect preenche com dados do INTAKE (razão social, URL, email). Cliente revisa antes do launch.

### UI

- `LegalPageLayout` — tipografia prose, título, data de atualização
- Links no **footer**: Termos · Privacidade
- `noindex` **não** — páginas legais indexáveis (opcional noindex se cliente pedir)

---

## Cookies (sempre)

- `CookieConsent.tsx` — banner fixo inferior até aceite
- `localStorage` key: `cookie-consent-v1` (ver `lib/legal.ts`)
- Botões: **Aceitar** | link **Política de privacidade**
- Texto curto LGPD — cookies essenciais + analytics se houver (declarar na política)
- `prefers-reduced-motion`: sem animação exagerada
- Montar em `AppShell` após `LoadingScreen`

**Sem** GTM/analytics no boilerplate — só banner; política menciona que cookies de medição só após aceite se forem adicionados depois.

---

## SEO básico (sempre)

| Artefato | Spec |
|----------|------|
| `lib/seo.ts` | `createMetadata()` — title, description, canonical, OG, Twitter |
| `app/layout.tsx` | metadata default + `lang="pt-BR"` |
| `public/robots.txt` | Allow `/`, sitemap URL |
| `scripts/generate-sitemap.js` | Home + legais + blog posts se `features.blog` |
| OG image | `public/images/og.webp` ou opengraph-image |

### Por página

Cada rota exporta `metadata` via `createMetadata()`.

---

## SEO local forte (`localSeoStrong: true`)

Além do básico:

| Item | Spec |
|------|------|
| JsonLd | `LocalBusiness` (+ `FoodEstablishment` / `MedicalBusiness` conforme nicho) |
| NAP | Idêntico em footer, contato, JsonLd |
| `geo` | `latitude` / `longitude` se INTAKE tiver (mapa embed) |
| `areaServed` | Cidade + região em texto e schema |
| `openingHoursSpecification` | Horário do INTAKE |
| `sameAs` | Redes sociais |
| Copy | Menção natural da cidade nas seções (não keyword stuffing) |
| `llms.txt` | Endereço, telefone, área de atuação |

---

## Blog (`blog: true`)

| Rota | Função |
|------|--------|
| `/blog/` | Lista posts (mais recente primeiro) |
| `/blog/[slug]/` | Post — `generateStaticParams` de `content/blog/*.md` |

### Post markdown

```yaml
---
title: Título do post
description: Resumo para SEO
publishedAt: 2026-06-01
author: Nome
tags: [tag1, tag2]
---
```

- Mínimo **1 post placeholder** no launch (architect escreve outline + 2–3 parágrafos)
- `react-markdown` + `gray-matter` (já no package.json)
- Link **Blog** no footer (não header principal v1, salvo INTAKE pedir)
- Sitemap inclui `/blog/` e cada slug

---

## INTAKE (campos para architect)

```markdown
## Legal e compliance
- [x] Termos + Privacidade + cookies (sempre — boilerplate)

## Features opcionais
- **Blog:** SIM | NÃO
- **SEO local forte:** SIM | NÃO
```

---

## Reviewer — falha se

- BRIEF não lista rotas legais
- Fase 05 sem termos/privacidade/cookie
- Fase 06 sem sitemap/robots/metadata
- INTAKE `blog: SIM` mas fase 05 sem `/blog/`
- INTAKE `SEO local: SIM` mas sem JsonLd LocalBusiness (ou tipo nicho)
