export type CursorMode = 'default' | 'text' | 'link' | 'card' | 'node' | 'whatsapp' | 'hidden'
export type CursorTheme = 'dark' | 'light' | 'gold'
export type Slot = 0 | 1 | 2 | 3

export type CursorHit = {
  mode: CursorMode
  label: string
  theme: CursorTheme
  node: HTMLElement | null
  target: HTMLElement | null
}

const FIELD = 'input, textarea, select, [contenteditable]'
const TEXT = 'p, h1, h2, h3, h4, li, blockquote, figcaption'
const SIGNS = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
] as const

const EMPTY: CursorHit = { mode: 'default', label: '', theme: 'dark', node: null, target: null }

function themeOf(el: Element | null): CursorTheme {
  const value = el?.closest('[data-cursor-theme]')?.getAttribute('data-cursor-theme')
  if (value === 'light' || value === 'gold') return value
  return 'dark'
}

export function readCursorHit(target: EventTarget | null): CursorHit {
  if (!(target instanceof Element)) return EMPTY
  const theme = themeOf(target)
  if (target.closest(FIELD) || target.closest('iframe')) {
    return { mode: 'hidden', label: '', theme, node: null, target: null }
  }
  const explicit = target.closest('[data-cursor]')
  const kind = explicit?.getAttribute('data-cursor')
  if (kind === 'hide') return { mode: 'hidden', label: '', theme, node: null, target: null }
  if (kind === 'link' || kind === 'card' || kind === 'node' || kind === 'whatsapp' || kind === 'text') {
    const label =
      explicit?.getAttribute('data-cursor-label') ||
      (kind === 'card' ? 'Ver' : kind === 'whatsapp' ? 'WhatsApp' : kind === 'link' ? '→' : '')
    const node = kind === 'node' && explicit instanceof HTMLElement ? explicit : null
    const host = explicit instanceof HTMLElement ? explicit : null
    return { mode: kind, label, theme, node, target: host }
  }
  if (target.closest(TEXT)) return { mode: 'text', label: '', theme, node: null, target: null }
  return { ...EMPTY, theme }
}

type Box = { left: number; top: number; right: number; bottom: number }

function hits(box: Box, rects: DOMRect[], text: DOMRect | null) {
  if (box.left < 4 || box.top < 4 || box.right > window.innerWidth - 4 || box.bottom > window.innerHeight - 4) {
    return true
  }
  if (text && box.left < text.right && box.right > text.left && box.top < text.bottom && box.bottom > text.top) {
    return true
  }
  return rects.some(
    (rect) => box.left < rect.right && box.right > rect.left && box.top < rect.bottom && box.bottom > rect.top,
  )
}

function spot(x: number, y: number, slot: Slot, width: number, height: number): Box {
  const [sx, sy] = SIGNS[slot]
  const left = sx > 0 ? x + 20 : x - 20 - width
  const top = sy > 0 ? y + 20 : y - 20 - height
  return { left, top, right: left + width, bottom: top + height }
}

/** Candidatos em ordem, com histerese de 8 px para não trocar de lado a cada pixel. */
export function placeSatellite(input: {
  x: number
  y: number
  width: number
  height: number
  slot: Slot
  anchorX: number
  anchorY: number
  avoid: DOMRect[]
  text: DOMRect | null
}) {
  const { x, y, width, height, avoid, text } = input
  const fits = (slot: Slot) => !hits(spot(x, y, slot, width, height), avoid, text)
  const moved = Math.hypot(x - input.anchorX, y - input.anchorY)
  let slot = input.slot
  let anchorX = input.anchorX
  let anchorY = input.anchorY
  if (!fits(slot) || moved >= 8) {
    let next: Slot | null = null
    for (let index = 0; index < 4; index += 1) {
      if (fits(index as Slot)) {
        next = index as Slot
        break
      }
    }
    if (next === null) {
      let best = Number.POSITIVE_INFINITY
      for (let index = 0; index < 4; index += 1) {
        const box = spot(x, y, index as Slot, width, height)
        const overflow =
          Math.max(0, 4 - box.left) +
          Math.max(0, 4 - box.top) +
          Math.max(0, box.right - (window.innerWidth - 4)) +
          Math.max(0, box.bottom - (window.innerHeight - 4))
        if (overflow < best) {
          best = overflow
          next = index as Slot
        }
      }
    }
    if (next !== slot || moved >= 8) {
      anchorX = x
      anchorY = y
    }
    slot = next ?? slot
  }
  const box = spot(x, y, slot, width, height)
  const left = Math.min(Math.max(4, box.left), Math.max(4, window.innerWidth - width - 4))
  const top = Math.min(Math.max(4, box.top), Math.max(4, window.innerHeight - height - 4))
  return { slot, x: left, y: top, anchorX, anchorY }
}
