'use client'

import { useEffect, useState } from 'react'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export function WhatsAppBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const footer = document.querySelector('[data-cta-final]')
      const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY
      const pastHero = window.scrollY > window.innerHeight * 0.85
      const atFinalCta = footerTop < window.innerHeight * 0.92
      setVisible(pastHero && !atFinalCta)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className="whatsapp-bar fixed inset-x-0 bottom-0 z-30 border-t border-line bg-navy-900 p-3 md:hidden"
      hidden={!visible}
      data-cursor-theme="dark"
    >
      <WhatsAppLink source="bar" message={WHATSAPP_MESSAGES.site} className="w-full" />
    </div>
  )
}
