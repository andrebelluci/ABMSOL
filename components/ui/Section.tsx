import { cn } from '@/lib/utils'

type SectionProps = {
  children: React.ReactNode
  tone?: 'base' | 'raised' | 'paper'
  id?: string
  className?: string
}

const tones = {
  base: 'bg-navy-900 text-ink',
  raised: 'bg-navy-800 text-ink',
  paper: 'tone-paper bg-paper text-navy-900',
}

export function Section({
  children,
  tone = 'base',
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('px-4 py-[8vw] sm:px-6 lg:px-8', tones[tone], className)}
    >
      <div className="mx-auto w-full max-w-page xl:max-w-page-wide">{children}</div>
    </section>
  )
}
