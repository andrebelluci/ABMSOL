import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

const variants = {
  primary: 'btn-primary bg-gold text-navy-900',
  secondary: 'btn-secondary border border-current bg-transparent',
}

export function Button({
  children,
  href,
  variant = 'primary',
  className,
}: ButtonProps) {
  const classes = cn(
    'inline-flex min-h-12 min-w-12 items-center justify-center px-5 font-sans text-body font-medium',
    'rounded-control',
    variants[variant],
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  )
}
