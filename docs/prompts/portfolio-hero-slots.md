# Portfolio Hero Slots — anti-convergência no mesmo nicho

> O brief-architect **consulta** este arquivo + bloco **Slots usados** do `npm run intake:portfolio`.  
> Objetivo: vários clientes de estética/clínica no mesmo `www/` sem parecer o mesmo template.

## Problema que resolve

Quando todos os briefs de estética caem em:

- `editorial-asymmetric`
- Cormorant Garamond + DM Sans
- `--bg` cream + `--accent` bronze/mauve próximo
- Layout `58% headline | foto offset direita`

…o portfólio inteiro parece **uma única skin** com logos trocados.

## Slots por família de nicho

### Estética / clínica / médico

| Slot | Archetype | Layout resumido | Assinatura mínima | Vídeo hero |
|------|-----------|-----------------|-------------------|------------|
| **A** | `ambient-video-product` | 100dvh full-bleed | Macro ambiente/consultório; tipo ou CTA sobre scrim | ✅ desktop; poster mobile |
| **B** | `typographic-statement` | Tipo display 70–85% viewport | Split-text ou máscara na headline; imagem secundária pequena ou ausente | ❌ |
| **C** | `immersive-full-bleed` | Foto edge-to-edge + copy overlay | Gradiente direcional ou mix-blend; não caixa offset cream | ⚠️ poster se sem foto |
| **D** | `editorial-asymmetric` | Assimétrico | **Obrigatório** 1 assinatura além do split: linha vertical, chips jornada, arco SVG visível, máscara assimétrica forte | ❌ v1 |
| **E** | `scroll-chapter-open` | Hero capítulo 1 + handoff | Pin ≤ 1 viewport; profundidade em camadas | ⚠️ fundo vídeo opcional |

**Regra:** no portfólio ativo, **no máximo 1 projeto** por slot A–E com a **mesma dupla tipográfica**.

### Gastronomia / bebidas

| Slot | Archetype |
|------|-----------|
| **G1** | `product-duo-immersive` |
| **G2** | `ambient-video-product` (líquido/macro) |
| **G3** | Liquid glass dominante + duo produto |

### Produtos artesanal

| Slot | Archetype |
|------|-----------|
| **P1** | `cinematic-chapter` |
| **P2** | `typographic-statement` + product skeu |
| **P3** | `immersive-full-bleed` |

---

## Fluxo do architect

```
1. Rodar / ler intake:portfolio → Slots usados (mesmo nicho)
2. Ler INTAKE: ambição + assets (vídeo? foto?)
3. Filtrar slots livres nesta família
4. Escolher slot que maximize impacto SEM repetir irmão
5. Documentar no BRIEF: "Slot: C — immersive-full-bleed (livre; irmãos usam D)"
6. Se todos ocupados: variar tipografia OU paleta OU nav pattern — documentar override
```

---

## Diferenciação além do slot

Mesmo slot diferente exige **pelo menos 2** destes eixos distintos dos irmãos:

| Eixo | Exemplo de variação |
|------|---------------------|
| Paleta | mauve vs bronze vs sage vs charcoal+warm white |
| Display font | Cormorant vs Fraunces vs Instrument Serif vs Playfair |
| Nav mobile | fullscreen stagger vs drawer direito vs bottom sheet editorial |
| Cursor | anel vs halo vs dot+trail vs sem cursor |
| CTA pattern | link underline vs pill WhatsApp vs texto + ícone |
| Home rhythm | manifesto primeiro vs prova social primeiro vs categorias |

---

## Override (quando repetir slot)

Só permitido se BRIEF documentar:

```markdown
### Override de slot
- Slot solicitado: D (editorial-asymmetric) — já usado por [ProjetoX]
- Motivo: [cliente exigiu / único asset / etc.]
- Diferenciação garantida: [paleta X, fonte Y, assinatura Z, nav W]
```

Reviewer **rejeita** override sem os 4 eixos de diferenciação.

---

## Script `intake:portfolio`

O bloco `<!-- PORTFOLIO:SLOTS:START -->` lista archetypes já usados por irmãos do mesmo nicho.  
O architect não ignora esse bloco.
