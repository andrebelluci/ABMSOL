/**
 * O script do Umami só entra quando P11 existir:
 * `NEXT_PUBLIC_UMAMI_WEBSITE_ID` e `NEXT_PUBLIC_UMAMI_SRC`.
 * Sem os dois, nenhum script de medição é carregado.
 */
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? ''
export const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC ?? ''

export function umamiEnabled() {
  return UMAMI_WEBSITE_ID.length > 0 && UMAMI_SRC.length > 0
}

type UmamiWindow = Window & {
  umami?: { track: (event: string, data?: Record<string, string>) => void }
}

export function reportWhatsAppClick(source: string, service?: string) {
  if (typeof window === 'undefined') return
  const detail = { source, service: service ?? '' }
  window.dispatchEvent(new CustomEvent('whatsapp_click', { detail }))
  const umami = (window as UmamiWindow).umami
  umami?.track('whatsapp_click', detail)
}
