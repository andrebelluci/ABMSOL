'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useSunTier } from '@/components/sun/useSunTier'

const SunRuntime = dynamic(() => import('@/components/sun/SunRuntime').then((mod) => mod.SunRuntime), {
  ssr: false,
})

export function SunEnhance() {
  const tier = useSunTier()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (tier !== 1) return
    const start = () => setReady(true)
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 300 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(start, 1)
    return () => window.clearTimeout(id)
  }, [tier])

  if (!ready) return null
  return <SunRuntime />
}
