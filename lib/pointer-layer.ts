type Listener = () => void

const listeners = new Set<Listener>()
let degraded = false
let users = 0
let generation = 0
let removeTick = () => {}

export function subscribePointerLayer(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function isPointerDegraded() {
  return degraded
}

/** Camada 2 e cursor-nó: desktop com ponteiro fino, sem os fallbacks do F8. */
export function pointerLayerAllowed() {
  if (typeof window === 'undefined' || degraded) return false
  if (!window.matchMedia('(pointer: fine) and (hover: hover) and (min-width: 1280px)').matches) {
    return false
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(forced-colors: active)').matches) return false
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return false
  return true
}

export function degradePointerLayer() {
  if (degraded) return
  degraded = true
  document.documentElement.classList.remove('cursor-on')
  listeners.forEach((listener) => listener())
}

/** Frame médio acima de 24 ms por 500 ms rebaixa a camada e devolve o cursor nativo. */
export function startFpsProbe() {
  if (typeof window === 'undefined') return () => {}
  users += 1
  if (users === 1 && !degraded) {
    let last = performance.now()
    let origin = last
    let acc = 0
    let frames = 0
    let primed = false
    const tick = () => {
      if (document.hidden) {
        last = performance.now()
        return
      }
      const now = performance.now()
      const dt = now - last
      last = now
      if (dt > 0 && dt < 250) {
        acc += dt
        frames += 1
      }
      if (now - origin < 500) return
      const avg = frames > 0 ? acc / frames : 0
      const count = frames
      origin = now
      acc = 0
      frames = 0
      if (!primed) {
        primed = true
        return
      }
      if (count >= 8 && avg > 24) degradePointerLayer()
    }
    const watch = generation
    void import('@/lib/gsap').then(({ gsap }) => {
      if (users === 0 || degraded || generation !== watch) return
      gsap.ticker.add(tick)
      removeTick = () => gsap.ticker.remove(tick)
    })
  }
  return () => {
    users = Math.max(0, users - 1)
    if (users === 0) {
      generation += 1
      removeTick()
      removeTick = () => {}
    }
  }
}
