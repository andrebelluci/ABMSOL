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

function umamiTrack(name: string, data?: Record<string, string>) {
  if (typeof window === 'undefined') return
  const umami = (window as UmamiWindow).umami
  umami?.track(name, data)
}

/** Evento genérico: CustomEvent no window + Umami quando P11 existir. */
export function trackEvent(name: string, data?: Record<string, string>) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(name, { detail: data ?? {} }))
  umamiTrack(name, data)
}

export function reportWhatsAppClick(source: string, service?: string) {
  if (typeof window === 'undefined') return
  const detail = { source, service: service ?? '' }
  window.dispatchEvent(new CustomEvent('whatsapp_click', { detail }))
  umamiTrack('whatsapp_click', detail)
}

export function trackHeroFlowStart(entry: 'button' | 'link') {
  trackEvent('hero_flow_start', { entry })
}

export function trackHeroFlowProfile(profile: string) {
  trackEvent('hero_flow_profile', { profile })
}

export function trackHeroFlowNeed(profile: string, need: string) {
  trackEvent('hero_flow_need', { profile, need })
}

export function trackHeroFlowWhatsAppClick(profile: string, need: string) {
  trackEvent('hero_flow_whatsapp_click', { profile, need })
}
