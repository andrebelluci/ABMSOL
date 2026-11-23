/**
 * Widget Agency OS (tenant abmsol).
 * A public_key é pública por desenho; origem: chat.abmsol.com.br.
 */
/**
 * Fallback permanece em *.vercel.app até o smoke de chat.abmsol.com.br.
 * Depois do go-live: NEXT_PUBLIC_AGENCYOS_ORIGIN=https://chat.abmsol.com.br
 * (ou trocar o default abaixo).
 */
export const AGENCYOS_WIDGET_ORIGIN = (
  process.env.NEXT_PUBLIC_AGENCYOS_ORIGIN ?? 'https://chat.abmsol.com.br'
).replace(/\/$/, '')

export const AGENCYOS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_AGENCYOS_PUBLIC_KEY ??
  'pk_dWMtvywtQv-BHZLH0gPSKuFBcyhJhNH8'

export function agencyOsWidgetEnabled() {
  return AGENCYOS_WIDGET_ORIGIN.length > 0 && AGENCYOS_PUBLIC_KEY.length > 0
}

export function agencyOsEmbedSrc() {
  return `${AGENCYOS_WIDGET_ORIGIN}/widget/embed.js`
}
