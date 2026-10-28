'use client'

import { cn } from '@/lib/utils'
import { trackWhatsAppClick, whatsappHref } from '@/lib/whatsapp'

type WhatsAppLinkProps = {
  source: string
  message: string
  service?: string
  children?: React.ReactNode
  className?: string
  variant?: 'solid' | 'text'
}

export function WhatsAppLink({
  source,
  message,
  service,
  children = 'WhatsApp',
  className,
  variant = 'solid',
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className={cn(
        variant === 'solid'
          ? 'btn-primary inline-flex min-h-12 min-w-12 items-center justify-center rounded-control bg-gold px-5 font-sans text-body font-medium text-navy-900'
          : 'inline-flex min-h-12 items-center text-mint',
        className,
      )}
      data-cursor="whatsapp"
      data-cursor-label="WhatsApp"
      data-cursor-theme="dark"
      onClick={() => trackWhatsAppClick(source, service)}
    >
      {children}
    </a>
  )
}
