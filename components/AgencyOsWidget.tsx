import Script from 'next/script'

import {
  agencyOsEmbedSrc,
  agencyOsWidgetEnabled,
  AGENCYOS_PUBLIC_KEY,
} from '@/lib/agencyos-widget'

/**
 * Launcher do Funcionário Digital (Agency OS).
 * Tema dark no host marinho; auto-offset evita choque com a barra de WhatsApp.
 */
export function AgencyOsWidget() {
  if (!agencyOsWidgetEnabled()) return null

  return (
    <Script
      id="agencyos-widget"
      src={agencyOsEmbedSrc()}
      strategy="lazyOnload"
      data-key={AGENCYOS_PUBLIC_KEY}
      data-theme="dark"
      data-position="bottom-right"
      data-offset-ignore=".whatsapp-bar,.back-to-top,.widget-teaser"
    />
  )
}
