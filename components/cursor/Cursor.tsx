import type { RefObject } from 'react'

export function Cursor({ rootRef }: { rootRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={rootRef} className="cursor-root" hidden aria-hidden="true" data-mode="default" data-theme="dark">
      <svg className="cursor-line" aria-hidden="true">
        <line stroke="var(--c-gold)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="cursor-ring" />
      <div className="cursor-core" />
      <div className="cursor-sat">
        <span className="cursor-pill" />
      </div>
    </div>
  )
}
