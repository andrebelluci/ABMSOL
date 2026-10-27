import { WORDMARK_D, WORDMARK_VIEWBOX } from '@/components/brand/wordmark-path'
import { cn } from '@/lib/utils'

type WordmarkProps = {
  className?: string
}

export function Wordmark({ className }: WordmarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={WORDMARK_VIEWBOX}
      role="img"
      aria-label="ABMSOL"
      className={cn('text-mint', className)}
    >
      <title>ABMSOL</title>
      <path fill="currentColor" d={WORDMARK_D} />
    </svg>
  )
}
