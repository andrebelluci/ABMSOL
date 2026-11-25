'use client'

/**
 * Cena do perfil “começando”: o Nó planta um nó e dele cresce uma trilha de circuito.
 * Uma das três cenas da Etapa 4 (seed / window / shop).
 */
export function NoSceneSeed() {
  return (
    <svg
      className="no-scene-seed"
      viewBox="0 0 120 160"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
    >
      {/* Nó plantado no chão */}
      <circle
        data-no-el
        data-no-seed-knot
        className="no-seed-knot"
        cx="60"
        cy="138"
        r="4"
      />
      {/* Trilha de circuito saindo do nó */}
      <path
        data-no-el
        data-no-seed-trail
        className="no-seed-trail"
        pathLength={1}
        d="M60 138 H78 V118 H96 V98 H108"
      />
      <circle
        data-no-el
        data-no-seed-node
        className="no-seed-node"
        cx="108"
        cy="98"
        r="2.5"
      />
    </svg>
  )
}
