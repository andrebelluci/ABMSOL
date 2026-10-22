# Nicho: Clínica / multiespecialidades

Constraints para o **brief-architect**.

## Conceito típico

- "Institutional warmth" — confiança + acolhimento
- Off-white quente, não branco clínico frio
- Layout organizado com momentos tipográficos ousados

## Chrome permitido

| Elemento | Direção |
|----------|---------|
| Cursor | Contido: anel accent, labels "VER" / "SALA"; mix-blend-mode sutil |
| Scrollbar | Accent da marca, fina |
| Nav mobile | Fullscreen com links grandes OU grid de especialidades |
| Hero | Vídeo institucional loop + overlay; ou interior parallax |
| Liquid/WebGL | ❌ |

## Motion

- Cards especialidade: accent slide via clip-path no hover (sem scale)
- Contadores: pacientes, especialidades, anos
- Pin scroll moderado em "estrutura da clínica"
- Before/after com drag se estética

## NEVER USE (nicho)

- Azul hospital padrão
- Carrosséis para conteúdo principal
- Fotos stock de médicos que não são da clínica
- Pill buttons arredondados
- Liquid, WebGL, efeitos "suco"
- Hero SaaS com 3 bullets + mockup

## Páginas comuns

Home, A Clínica, Equipe, Tratamentos/Especialidades, Contato, Convênios

## Schema

- `MedicalBusiness` + `Physician` por médico

## Referência

`dharmalabs/docs/prompts/dev-prompt-[clinica].md`, projetos `VittaDermatologia`, `Pelle`.
