'use client'

type Option = {
  id: string
  label: string
  body: string
}

export function HeroFlowOptions({
  options,
  onChoose,
  grid = false,
}: {
  options: readonly Option[]
  onChoose: (id: string) => void
  /** Grade 2x2 só no passo 02 (needs), desktop >=1024. */
  grid?: boolean
}) {
  return (
    <ul className={grid ? 'hero-flow-options hero-flow-options--grid' : 'hero-flow-options'}>
      {options.map((option) => (
        <li key={option.id}>
          <button
            type="button"
            className="hero-flow-card"
            data-cursor="link"
            data-cursor-label={option.label}
            data-cursor-theme="dark"
            onClick={() => onChoose(option.id)}
          >
            <span className="hero-flow-card-label">{option.label}</span>
            <span className="is-muted mt-1 block text-body">{option.body}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
