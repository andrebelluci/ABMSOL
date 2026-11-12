import { asset } from '@/lib/paths'

/** Mesma inclinação nos dois modelos, para a troca de página continuar o hero. */
export const PLATE_TILT = { x: 0.38, y: -0.42 }

export const SUN_TIP_NAMES = ['cardinal-n', 'cardinal-e', 'cardinal-w', 'cardinal-s'] as const

export const SUN_FLAT_URL = asset('/models/sun-flat.glb')
export const SUN_DEPTH_URL = asset('/models/sun-depth.glb')
