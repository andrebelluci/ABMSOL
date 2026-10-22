# CSS & clip-path — padrões de motion leve

Referência para **phase-executor** quando o brief pede transições sem WebGL.

## Page transition (Framer Motion)

```tsx
// app/template.tsx — fade + clip entre rotas
'use client'
import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

Respeitar `prefers-reduced-motion`: `initial={false}` ou duração 0.

## Text reveal (GSAP — preferir vs SplitText pago)

```tsx
// clip-path por palavra
gsap.from('.word', {
  clipPath: 'inset(0 100% 0 0)',
  stagger: 0.06,
  duration: 0.8,
  ease: 'power3.out',
})
```

## Scrollbar custom (globals.css)

```css
/* Exemplo — cores vêm do DIFFERENTIATION.md */
:root {
  --scrollbar-track: var(--surface);
  --scrollbar-thumb: var(--accent);
}

html {
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
  scrollbar-width: thin;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}
::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 999px;
}
```

## Image mask / organic shapes

- `clip-path: path()` ou `border-radius` composto (DocePele pattern)
- `mix-blend-mode` em overlays — cuidado com contraste a11y

## Skills relacionadas

- `gsap-next-motion`, `gsap-scrolltrigger`
- `frontend-design` — composição espacial
- `cinematic-scroll` — capítulos pin

Ver `docs/prompts/niche/webgl-experimental.md` antes de subir para WebGL.
