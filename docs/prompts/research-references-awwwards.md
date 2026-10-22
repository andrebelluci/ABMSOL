# Pesquisa de referências Awwwards — Comet / Perplexity

> Use **depois** da pesquisa de negócio (`research-brief-comet.md`) e **antes** do brief-architect.  
> Saída vai para `docs/INTAKE.md` (seção **Referências Awwwards**) e alimenta `docs/assets/references/REFERENCE-LOG.md`.

## Como usar

1. Preencha `[...]` no prompt abaixo.
2. Cole no Comet ou Perplexity com busca web.
3. Cole o markdown em `docs/INTAKE.md` → **Referências Awwwards**.
4. Salve 1–3 screenshots em `docs/assets/references/` se possível.
5. Rode `npm run intake:portfolio` — confira **Slots usados** no mesmo nicho.
6. Invoque `/brief-architect`.

---

## Prompt (copiar a partir da linha seguinte)

```
Preciso de referências visuais para briefing de site PREMIUM (nível Awwwards-lite).
Não é o site — é material para INTAKE de agência.

Cliente: [Nome]
Nicho: [ex.: clínica de estética / dermatologia / restaurante]
Cidade: [cidade]
Ambição visual: [premium | awwwards-lite | awwwards]
O que o cliente QUER sentir: [ex.: acolhimento sofisticado, não spa rosa]
O que o cliente ODEIA: [ex.: azul hospitalar, carrossel, template Wix]
Assets disponíveis: [foto ambiente sim/não | vídeo macro sim/não]

Use a web. Busque em:
- awwwards.com (Sites of the Day, nominees do setor ou mood parecido)
- godly.website, siteinspire.com, land-book.com
- Sites reais de marcas premium (não só concorrentes locais)

Gere MARKDOWN com:

## 1. Mood do projeto (3 adjetivos + 1 frase)
Como deve parecer este site específico — não genérico "moderno".

## 2. Referências primárias (5 URLs)
Para cada URL:
- Nome do site / estúdio
- URL completa
- **Composição do hero:** full-bleed? tipo gigante? split? vídeo? quantos protagonistas?
- **Motion:** o que anima na entrada e no scroll (específico)
- **Paleta e tipografia:** tons dominantes, serif/sans
- **Aplicável a ESTE cliente:** sim/parcial/não — por quê
- **Risco de clone:** o que NÃO copiar literalmente

## 3. Referências secundárias (3 URLs — outros nichos)
Mesmo formato resumido. Foco em técnica (motion, layout, tipografia).

## 4. Anti-referências (2–3 URLs)
Sites do nicho que parecem template/genéricos — o que evitar.

## 5. Recomendação de archetype hero
Escolha UMA opção e justifique:
- ambient-video-product (vídeo macro full-bleed)
- typographic-statement (tipo 70%+ viewport)
- immersive-full-bleed (foto edge-to-edge, copy sobreposta)
- editorial-asymmetric (só se tiver assinatura forte além de split)
- scroll-chapter-open (capítulo curto com pin)

## 6. Elemento assinatura sugerido
1 coisa que o visitante lembraria: [ex.: vídeo ambiente com tipo mix-blend / linha vertical que cresce / máscara orgânica]

## 7. Conflitos com portfólio (se informado)
Projetos irmãos a não parecer: [listar ou "não informado"]
Sugestão de slot diferente do editorial cream padrão.

Regras:
- URLs reais e acessíveis
- Não inventar SOTD inventado — se não achar no nicho, use mood cross-industry
- Clínica/estética: priorize macro ambiente, tipografia editorial, luz quente — NÃO drone B-roll genérico
- Não proponha código nem stack
- Português do Brasil, tom documento interno de agência
```

---

## Depois da pesquisa → INTAKE

| Saída | Onde |
|-------|------|
| Relatório completo | `docs/INTAKE.md` → **Referências Awwwards** |
| §5 archetype | Cruzar com **Hero — composição** (ajustar se necessário) |
| §6 assinatura | **Elemento assinatura** no INTAKE |
| URLs favoritas | Screenshots em `docs/assets/references/` |
| §7 | Revisar anti-clone após `intake:portfolio` |

O **brief-architect** transcreve para `REFERENCE-LOG.md` + seção **Referências analisadas** no BRIEF.
