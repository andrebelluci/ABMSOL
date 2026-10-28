import { useSyncExternalStore } from 'react'

export type SunTier = 0 | 1 | 2

type NetworkInformation = { saveData?: boolean }

/**
 * Camada 0: estático. Camada 1: intro e trilha desta fase.
 * A camada 2 (ponteiro e sonda de FPS) fica reservada para a 03b.
 */
export function resolveSunTier(): SunTier {
  if (typeof window === 'undefined') return 0
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (connection?.saveData) return 0
  return 1
}

function subscribeSunTier(onChange: () => void) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  motion.addEventListener('change', onChange)
  return () => motion.removeEventListener('change', onChange)
}

export function useSunTier() {
  return useSyncExternalStore(subscribeSunTier, resolveSunTier, () => 0 as SunTier)
}
