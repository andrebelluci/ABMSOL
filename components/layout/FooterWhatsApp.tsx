'use client'

import { usePathname } from 'next/navigation'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

/** O CTA da página de contato já é o botão. Nas outras rotas o rodapé mantém o WhatsApp. */
export function FooterWhatsApp() {
  const pathname = usePathname()
  if (pathname === '/' || pathname === '/contato' || pathname === '/contato/') return null

  return (
    <WhatsAppLink source="footer" message={WHATSAPP_MESSAGES.site} className="mt-8" />
  )
}
