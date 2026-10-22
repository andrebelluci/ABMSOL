# Visual Style Matrix — escolha de linguagem

> O **brief-architect** usa este doc para **decidir** (não acumular) estilos.  
> Saída obrigatória no `BRIEF.md`: seção **`## Visual Style Stack`**.

## Regra de ouro

```
1 DOMINANTE  +  até 2 SUPORTE  +  disciplina de respiro
```

- **Dominante** = 60–80% da percepção (hero, fundos, motion assinatura)
- **Suporte** = reforça confiança ou legibilidade (produto real, chrome pontual)
- **Disciplina** = minimalismo de espaçamento — não é “estilo visual”, é regra de layout

**Proibido no mesmo projeto (salvo opt-in explícito no INTAKE):**

- Neo-brutalism + glassmorphism forte + skeuomorphism UI fake
- Clay morphism + liquid glass dominante
- Dois estilos “dominantes” competindo (ex.: brutalism **e** liquid full-bleed)

---

## Estilos — definição e quando usar

| Estilo | O que é | Bom para | Onde aplicar | Evitar |
|--------|---------|----------|--------------|--------|
| **Liquid glass / liquid morphism** | Líquido animado + UI que “enche”; cor dinâmica | Gastronomia, bebidas, marcas sensoriais | Hero full-bleed, troca de estado, botões fill | Clínica, B2B sóbrio, texto longo em fundo agitado |
| **Glassmorphism (UI)** | `backdrop-blur` + borda fina + painel flutuante | Chrome (header, drawer, chips) sobre fundo **colorido** | Topbar, cards pontuais, FAB | UI inteira fosca; fundo branco corporativo |
| **Skeuomorphism — produto** | Foto/render real do produto como protagonista | Food, bebidas, embalagem, hardware | Hero duo, grid de sabores, escala de volumes | UI de botões 3D fake em tudo |
| **Skeuomorphism — UI fake** | Botões gelatina, texturas leather/cuir na UI | — | **Evitar** (datado) | Quase sempre |
| **Editorial / asymmetric** | Tipografia wide, grid assimétrico, foto offset | Médico, clínica premium, manifesto | Hero, manifesto, sobre | Hero centrada + CTA template |
| **Minimalism (disciplina)** | Respiro, poucos elementos, hierarquia clara | Todos os nichos | Espaçamento entre seções, menos ornamentos | Site vazio sem assinatura |
| **Neo-brutalism** | Bordas duras, sombras offset, cores chapadas | Portfólio ousado, cultura jovem | **Raro** — só se INTAKE pedir | Interior nostálgico, saúde, alimentos “naturais” |
| **Clay morphism** | Formas 3D macias, sombras internas | Apps infantis, fintech friendly | — | Gastronomia premium, clínica |
| **Cinematic / chapter** | Pin scroll, capítulos, profundidade | Narrativa longa, artesanal | Seções após hero | One-page institucional simples |
| **Ambient video** | Vídeo macro full-bleed | Procedimentos, fábrica, natureza | Hero (desktop) | Mobile sem poster; clínica genérica drone |

---

## Matriz por nicho (architect escolhe daqui)

| Nicho | Dominante recomendado | Suporte ok | Evitar |
|-------|----------------------|------------|--------|
| **medico** | Editorial asymmetric | Minimalism | Liquid, glass forte, brutalism |
| **clinica** | Editorial + minimal | Glassmorphism pontual no chrome | Skeuomorphism, clay, splash |
| **estetica** | Rotacionar slots A–E (`portfolio-hero-slots.md`) | Glass pontual, morph SVG leve, ambient video | Neo-brutalism, liquid dominante, **editorial-asymmetric default** |
| **gastronomia** | Liquid glass **ou** product-duo imersivo | Skeuomorphism produto, glass chrome | Neo-brutalism, clay, UI skeu fake |
| **produtos-artesanal** | Cinematic chapter **ou** editorial | Product skeu, minimal | Liquid agressivo sem brief |
| **servicos** | Editorial **ou** minimal tipográfico | Glass pontual | Liquid, brutalism |
| **outro** | Architect propõe 1 opção + justificativa | Máx. 2 suportes | Misturar 3+ “estilos de moda” |

Se o INTAKE marcar preferências conflitantes, o architect **resolve** na seção Visual Style Stack e documenta o porquê.

---

## Fluxo de decisão (brief-architect)

```
1. Ler nicho → filtrar matriz
2. Ler INTAKE (conceito, o que cliente odeia, referências)
3. Se referência visual (screenshot/MCP): identificar estilo dominante da referência
4. Escolher: 1 DOMINANTE + até 2 SUPORTE
5. Escrever Visual Style Stack no BRIEF
6. Propagar para DIFFERENTIATION (chrome) e fases 02–03 (onde cada estilo aparece)
7. NEVER USE: listar estilos descartados + motivo
```

### Perguntas internas (antes de fixar)

- O **produto físico** existe e deve ser visto? → skeuomorphism produto (suporte ou dominante)
- A marca é **sensorial/motion**? → liquid glass (dominante)
- O cliente pede **confiança/clínica**? → editorial; liquid off
- Só há **foto + texto**? → editorial ou typographic; glass só no chrome
- INTAKE menciona **interior/nostalgia**? → neo-brutalism **off**

---

## Bloco obrigatório no BRIEF

```markdown
## Visual Style Stack

| Papel | Estilo | Onde aparece |
|-------|--------|--------------|
| **Dominante** | [ex: Liquid glass + motion] | Hero, fundo dinâmico, troca de sabor |
| **Suporte 1** | [ex: Product skeuomorphism] | Garrafas reais, badges de volume |
| **Suporte 2** | [ex: Glassmorphism pontual] | Header, drawer mobile — blur sobre accent |
| **Disciplina** | Minimalism entre blocos | Espaçamento seções, sem ornamentos extras |

### Decisão do architect
[2–3 frases: por que esta combinação para este nicho/intake]

### Descartados (NEVER)
- Neo-brutalism — [motivo]
- Clay morphism — [motivo]
- Skeuomorphism UI fake — [motivo]
```

---

## Propagação para fases

| Estilo | Fase típica |
|--------|-------------|
| Liquid glass | 03-hero, `LiquidCanvas`, botões fill |
| Glassmorphism | 02-chrome (header, drawer), utilities `globals.css` |
| Product skeu | 03-hero, 04 grid produtos |
| Editorial | 03-hero + 04 manifesto |
| Minimal discipline | 04 espaçamento, tipografia |

---

## Reviewer — falha se

- BRIEF sem **Visual Style Stack** ou sem papel **Dominante** explícito
- Mais de 1 dominante sem justificativa
- Estilo **proibido no nicho** marcado como dominante (ex.: liquid em clínica)
- Contradição: NEVER USE neo-brutalism + fase pede bordas brutalist
- ui-ux-pro-max sugeriu Inter/SaaS blue — BRIEF deve **descartar** se conflitar com stack escolhido
- **Estética:** 2+ projetos no anti-clone com mesmo archetype editorial + mesma paleta cream — ver `brief-awwwards.md`

## ui-ux-pro-max

Ao rodar `--design-system`, use keywords alinhadas ao stack escolhido:

```powershell
# Gastronomia líquida
python ... search.py "liquid glass beverage organic motion" --design-system ...

# Clínica editorial
python ... search.py "editorial medical luxury serif" --design-system ...
```

Não deixe o CSV impor estilo diferente do Visual Style Stack sem nota de override no BRIEF.
