import { useSyncExternalStore } from 'react'
import { pointerLayerAllowed, subscribePointerLayer } from '@/lib/pointer-layer'

export type SunTier = 0 | 1 | 2

type NetworkInformation = { saveData?: boolean; addEventListener?: (type: string, cb: () => void) => void; removeEventListener?: (type: string, cb: () => void) => void }

/**
 * Camada 0: estático. Camada 1: intro e trilha.
 * Camada 2: ponteiro no desktop. A sonda de FPS pode rebaixar 2 → 1.
 */
export function resolveSunTier(): SunTier {
  if (typeof window === 'undefined') return 0
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (connection?.saveData) return 0
  if (pointerLayerAllowed()) return 2
  return 1
}

function subscribeSunTier(onChange: () => void) {
  const queries = [
    '(prefers-reduced-motion: reduce)',
    '(forced-colors: active)',
    '(pointer: fine) and (hover: hover) and (min-width: 1280px)',
  ].map((query) => window.matchMedia(query))
  queries.forEach((media) => media.addEventListener('change', onChange))
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  connection?.addEventListener?.('change', onChange)
  const offLayer = subscribePointerLayer(onChange)
  return () => {
    queries.forEach((media) => media.removeEventListener('change', onChange))
    connection?.removeEventListener?.('change', onChange)
    offLayer()
  }
}

export function useSunTier() {
  return useSyncExternalStore(subscribeSunTier, resolveSunTier, () => 0 as SunTier)
}
