import { cn } from '@/lib/utils'

type LabelProps = {
  children: React.ReactNode
  className?: string
}

export function Label({ children, className }: LabelProps) {
  return (
    <p className={cn('font-mono text-label uppercase text-mint', className)}>
      {children}
    </p>
  )
}
