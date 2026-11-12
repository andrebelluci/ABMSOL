'use client'

import dynamic from 'next/dynamic'

import { usePlateLayer } from '@/components/sun/useSunTier'

const SunPlate = dynamic(() => import('@/components/sun/SunPlate').then((mod) => mod.SunPlate), {
  ssr: false,
})

export function SunPlateMount() {
  const plate = usePlateLayer()
  if (!plate) return null
  return <SunPlate />
}
