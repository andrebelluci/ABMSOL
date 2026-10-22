# Nicho: Médico individual (autoridade)

Constraints para o **brief-architect**. Combinar com `dev-prompt-generico.md`.

## Conceito típico

- "Surgical editorial" / "Academic luxury" — retrato do médico como layout
- Tom: autoridade intelectual, precisão, calor contido
- Foto do médico é o elemento dominante — não headshot genérico em card

## Chrome permitido

| Elemento | Direção |
|----------|---------|
| Cursor | Mínimo: ponto fino, ou anel discreto; label "PERFIL" em retratos |
| Scrollbar | Fina, cores quentes/parchment |
| Nav mobile | Painel lateral ou fullscreen tipográfico sóbrio |
| Hero | Editorial portrait split; nome massivo left-aligned |
| Liquid/WebGL | ❌ |

## Motion

- Clip-path reveal em palavras do nome
- Parallax leve em retrato (desktop only)
- Sem contadores chamativos; prefira credenciais estáticas elegantes

## Tipografia

- Display serif leve (Cormorant 300 italic no hero = autoridade inesperada)
- Body sans legível (DM Sans, Instrument Sans)

## NEVER USE (nicho)

- Azul hospitalar / verde genérico de saúde
- Ícones médicos clipart (estetoscópio, cruz)
- Hero centrada com "Agende sua consulta" gigante
- Stock photo de médico genérico
- Tom "startup healthtech"
- Liquid, splash, morph agressivo

## Schema

- `Physician` + `Person` no perfil
- `MedicalBusiness` se clínica do médico

## Referência de prompt completo

Ver `dharmalabs/docs/prompts/dev-prompt-[medico].md` (espelho histórico).
