import { cn } from '@/lib/utils'

type Place = 'start' | 'end' | 'hero' | 'section'

/** Traço da marca: reta, quebra em diagonal e nó menta. Sem link, só desenho. */
export function MarkRay({ place = 'start' }: { place?: Place }) {
  return (
    <svg
      className={cn('mark-ray', `is-${place}`)}
      viewBox="0 0 1440 180"
      fill="none"
      aria-hidden="true"
      data-mark-ray={place === 'hero' ? undefined : ''}
    >
      <path className="mark-trace" pathLength={1} d="M0 124H460L560 36H980" />
      <circle className="mark-node" cx="980" cy="36" r="7" />
      <path className="mark-trace is-soft" pathLength={1} d="M560 36L648 132H1200" />
      <circle className="mark-node is-ring" cx="1200" cy="132" r="6" />
    </svg>
  )
}
