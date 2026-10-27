import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGSAP() {
  if (typeof window === 'undefined' || registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReduced) {
    gsap.globalTimeline.timeScale(0)
  }
}

export { gsap, ScrollTrigger }
