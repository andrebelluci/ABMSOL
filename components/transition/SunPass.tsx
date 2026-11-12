'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { usePlateLayer } from '@/components/sun/useSunTier'
import { SUN_DEPTH_URL } from '@/lib/sun-plate'

const SunPassScene = dynamic(
  () => import('@/components/transition/SunPassScene').then((mod) => mod.SunPassScene),
  { ssr: false },
)

function SunPass() {
  const pathname = usePathname()
  const previous = useRef(pathname)
  const [active, setActive] = useState(false)

  useEffect(() => {
    void import('@/components/transition/SunPassScene')
    void fetch(SUN_DEPTH_URL)
  }, [])

  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    setActive(true)
  }, [pathname])

  if (!active) return null
  return <SunPassScene onDone={() => setActive(false)} />
}

export function SunPassMount() {
  const plate = usePlateLayer()
  if (!plate) return null
  return <SunPass />
}
