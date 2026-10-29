'use client'

import dynamic from 'next/dynamic'
import { useSunTier } from '@/components/sun/useSunTier'

const CursorProvider = dynamic(
  () => import('@/components/cursor/CursorProvider').then((mod) => mod.CursorProvider),
  { ssr: false },
)

export function CursorMount() {
  const tier = useSunTier()
  if (tier !== 2) return null
  return <CursorProvider />
}
