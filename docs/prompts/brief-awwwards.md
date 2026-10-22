# Brief Awwwards — impacto, referências e anti-convergência

> Complementa `hero-archetypes.md`, `visual-style-matrix.md` e `doc-awwwards.md`.  
> O **brief-architect** deve ler este arquivo **sempre** — não só quando o INTAKE pede “Awwwards”.

## O que “Awwwards” significa aqui

**Não** é WebGL em todo site, nem pin scroll de 10 telas em clínica local.

É um brief que garante:

1. **Hero com assinatura visível** — o visitante descreve o que viu em 1 frase
2. **Referências reais analisadas** — não só “inspiração Apple/Aesop” genérica
3. **Diferenciação no portfólio** — dois clientes do mesmo nicho não podem cair no mesmo molde
4. **Motion com coreografia** — algo sincroniza na entrada (tipo, máscara, vídeo, camada)
5. **Conversão preservada** — CTA WhatsApp/agendamento legível; impacto ≠ confusão

| Nível INTAKE | Expectativa do BRIEF |
|--------------|----------------------|
| **conversão** | Hero claro, motion contido, assinatura mínima mas nomeada |
| **premium** | Referências analisadas + 1 elemento assinatura forte no hero |
| **awwwards-lite** | Full-bleed ou tipografia dominante + motion coreografado + chrome único |
| **awwwards** | Composição ousada justificada + referência transcrita + slot de portfólio distinto |

---

## Por que os projetos convergiram (lição)

Padrão que **não pode repetir** em estética/clínica:

```
Cormorant + DM Sans + cream #F5F1EB + editorial-asymmetric 58% headline | foto offset
+ clip-reveal GSAP + parallax 4% + placeholder gradiente cream
```

Isso passa no checklist técnico mas **falha** no critério Awwwards e no anti-convergência do portfólio.

---

## Protocolo de referências (obrigatório se ambição ≥ premium)

### 1. Coletar (antes do architect)

| Fonte | Como |
|-------|------|
| Pesquisa Comet/Perplexity | `docs/prompts/research-references-awwwards.md` |
| INTAKE §7 + URLs do cliente | Mín. 3 URLs com análise |
| Awwwards / SiteInspire / Godly | URLs reais — não só marcas famosas |
| Screenshot | `docs/assets/references/` |

### 2. Analisar cada referência (architect)

Para **cada URL** relevante, preencher em `docs/assets/references/REFERENCE-LOG.md`:

```markdown
### [Nome curto] — [URL]

- **O que roubar:** composição (full-bleed? camadas? tipo gigante?)
- **Motion:** entrada, scroll, hover — o que sincroniza com o quê
- **Tipografia / cor:** família, contraste, fundo
- **O que NÃO copiar:** chrome de outro cliente, paleta literal, layout clone
- **Traduzido para este projeto:** [1–2 frases acionáveis]
```

Usar **MCP browser** ou ler screenshots quando o usuário fornecer na sessão.

### 3. Sintetizar no BRIEF

Seção obrigatória quando ambição ≥ premium:

```markdown
## Referências analisadas

| Referência | Roubar | Não copiar | Traduzido |
|------------|--------|------------|-----------|
| [site] | [composição/motion] | [clone risk] | [decisão neste projeto] |

## Decisão de impacto
Por que este hero **não** é split cream genérico: [2–3 frases]
Slot de portfólio: [ver portfolio-hero-slots.md]
```

---

## Slots de portfólio (mesmo nicho)

Ler `docs/prompts/portfolio-hero-slots.md` e `npm run intake:portfolio` (bloco **Slots usados**).

**Regra:** se outro projeto irmão já usa um archetype, o architect **deve** escolher outro slot disponível ou justificar override explícito no BRIEF.

Nichos estética/clínica/médico — distribuir, não repetir:

| Slot | Archetype | Quando |
|------|-----------|--------|
| A | `ambient-video-product` | Cliente tem vídeo macro ambiente (não drone) |
| B | `typographic-statement` | Marca verbal forte; poucos assets |
| C | `immersive-full-bleed` | Foto ambiente forte; tipo sobre mídia |
| D | `editorial-asymmetric` | Só com assinatura única documentada (linha, chips, arco — não split puro) |
| E | `scroll-chapter-open` | Narrativa curta; pin ≤ 1 viewport extra |

**Proibido:** 2+ projetos ativos com slot D idêntico (mesma tipografia + mesma paleta cream + mesmo layout 58/42).

---

## Matriz de impacto por nicho

| Nicho | Full-bleed vídeo | Tipo 70%+ viewport | Pin scroll | Liquid dominante |
|-------|------------------|--------------------|------------|------------------|
| medico | ⚠️ macro consultório | ✅ | ❌ | ❌ |
| clinica | ⚠️ ambiente real | ✅ | ⚠️ curto | ❌ |
| estetica | ✅ se asset | ✅ | ⚠️ curto | ⚠️ pontual |
| gastronomia | ✅ | ⚠️ | ✅ | ✅ |
| produtos-artesanal | ⚠️ | ✅ | ✅ | ⚠️ |

⚠️ = permitido com spec no BRIEF + opt-in INTAKE.  
❌ = architect recusa e propõe alternativa do slot.

---

## Anti-convergência (architect — checklist interno)

Antes de fechar o BRIEF, responder:

1. **Hero:** visitante descreve assinatura em 1 frase? Se não → recompor.
2. **Paleta:** `--accent` e `--bg` diferem ≥ perceptível dos irmãos no anti-clone? (não só 5% de hue)
3. **Tipografia:** mesma dupla Cormorant+DM Sans que irmão? → trocar display **ou** body com justificativa no BRIEF.
4. **Layout:** `lg:max-w-[58%]` + foto direita sem elemento assinatura? → **falha** — adicionar camada (vídeo, tipo, máscara, linha, scroll).
5. **Motion:** só opacity + parallax 4%? → **falha** — nomear coreografia (clip linha a linha, scale máscara, vídeo fade, etc.).
6. **Placeholder:** BRIEF exige foto/vídeo real ou placeholder semântico **com composição final** descrita — não gradiente cream genérico como estado final aceito.

---

## Propagação para fases

| Decisão Awwwards | Onde |
|------------------|------|
| Referências + slot | `BRIEF.md` § Referências analisadas |
| Hero full-bleed / vídeo | `03-hero.md` — ASCII full viewport, poster mobile |
| Chrome impactante | `02-chrome.md` — nav pattern distinto dos irmãos |
| Motion coreografia | `03-hero.md` tabela Motion + `doc-awwwards.md` |
| Polish extra | `03b-hero-polish.md` se referência exige segunda passada |

---

## Reviewer — falha automática se

- Ambição `premium+` sem seção **Referências analisadas**
- Mesmo archetype + mesma dupla tipográfica + paleta cream de projeto no anti-clone
- Hero Composition = editorial-asymmetric sem **elemento assinatura** nomeado
- Motion só “fade-in” / “parallax leve” sem coreografia
- INTAKE marcou vídeo disponível mas BRIEF não considera slot A ou C
- `REFERENCE-LOG.md` vazio com ambição awwwards-lite/awwwards

---

## Links

- Pesquisa de referências: `docs/prompts/research-references-awwwards.md`
- Slots: `docs/prompts/portfolio-hero-slots.md`
- Motion técnico: `docs/prompts/doc-awwwards.md`
- Archetypes: `docs/prompts/hero-archetypes.md`
