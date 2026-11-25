# Pesquisa para INTAKE — prompt Comet / Perplexity

> Documento de **pesquisa externa** para briefing de site. Não é o site — é material que você cola em `docs/INTAKE.md` (seção **Análise externa**) e usa para preencher Meta, SEO, Páginas e Assets.

## Como usar

1. Substitua os `[...]` no bloco abaixo.
2. Cole no **Comet** (ou Perplexity com busca web).
3. **Não** anexe `INTAKE.md` — o prompt já define o formato de saída.
4. Cole o markdown retornado em `docs/INTAKE.md` → seção **Análise externa**.
5. Rode `npm run intake:portfolio` para preencher **anti-clone** com os outros projetos em `www/`.
6. **(Opcional premium+)** Rode pesquisa `research-references-awwwards.md` e cole em INTAKE.
7. Preencha manualmente (se quiser): hero detalhado, chrome, preferências de estilo, **ambição visual**.

---

## Prompt (copiar a partir da linha seguinte)

```
Preciso de um documento de pesquisa para briefing de site (não é o site em si — é material para um INTAKE de agência).

Cliente: [Nome da empresa]
Nicho: [ex.: clínica de dermatologia / confeitaria artesanal / serviços de jardinagem]
Cidade/região: [ex.: São José do São José do Rio Preto - SP]
Site atual (se existir): [URL ou "site novo"]
Instagram/redes: [URLs se tiver]

Use a web (Google) para pesquisar o cliente, concorrentes locais e referências do setor.

Gere um relatório em MARKDOWN com estas seções:

## 1. Resumo do negócio
- O que faz, público-alvo, ticket/percepção de marca, diferenciais reais

## 2. Site e presença digital atual
- O que o site atual comunica (se não houver site, diga)
- Pontos fracos: visual, copy, UX, mobile, velocidade, SEO aparente
- O que está desatualizado ou genérico

## 3. Concorrentes (3–5 na região ou nicho)
Para cada um: nome, URL, o que fazem bem no site, o que é clichê do setor

## 4. Tom de voz e posicionamento
- Adjetivos da marca (3–5)
- O que o cliente deveria transmitir vs. o que transmite hoje
- Palavras/frases a evitar (clichês do nicho)

## 5. Oportunidades para o novo site
- 5–8 oportunidades concretas (não genéricas tipo "site moderno")
- Funcionalidades que fazem sentido (WhatsApp, agendamento, blog, galeria, etc.)

## 6. SEO local
- Termos de busca prováveis (principal + 5–10 secundários)
- Cidade/bairros para areaServed
- Tipo de schema sugerido (LocalBusiness, MedicalBusiness, etc.)

## 7. Referências visuais (URLs)
- 3–5 sites de inspiração (podem ser de outros nichos)
- Para cada URL: o que vale a pena (tipografia, hero, cor, motion) — sem copiar layout

## 8. Restrições do nicho
- O que sites desse setor costumam exagerar (carrosséis, stock, azul hospital, etc.)
- O que transmite confiança neste nicho

## 9. Assets prováveis
- Logo/fotos/vídeo: o que provavelmente existe ou falta

## 10. Páginas sugeridas
- Lista de rotas (home + internas) com uma linha de propósito cada

Regras:
- Seja específico para ESTE cliente e ESTA cidade
- Cite URLs reais quando possível
- Não invente telefone/endereço — se não achar, marque [verificar com cliente]
- Não proponha código nem stack técnica
- Tom: documento interno de agência, direto e acionável
- Responda em português do Brasil
```

---

## Depois da pesquisa → INTAKE

| Saída do Comet | Onde vai no `docs/INTAKE.md` |
|----------------|------------------------------|
| Relatório completo | Seção **Análise externa** (bloco entre ` ``` `) |
| §1 + dados do cliente | **Meta** (cliente, nicho, URL, cidade) |
| §6 | **SEO** |
| §10 | **Páginas necessárias** |
| §9 | **Assets disponíveis** |
| §7 + §8 | Notas em **Hero**, **Efeitos e limites**, **Preferências de estilo** (você refina) |

**Próximo passo (premium+):** `docs/prompts/research-references-awwwards.md` → seção **Referências Awwwards** do INTAKE.

O **brief-architect** lê o INTAKE completo — não precisa enviar este arquivo para ele.
