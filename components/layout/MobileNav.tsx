'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { NAV_ITEMS } from '@/lib/nav'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'

function isCurrent(pathname: string, hash: string, href: string) {
  if (href.startsWith('/#')) {
    return pathname === '/' && hash === href.slice(1)
  }
  const path = href.endsWith('/') ? href : `${href}/`
  return pathname === path || pathname === path.slice(0, -1)
}

export function DesktopNav({ className }: { className?: string }) {
  const pathname = usePathname()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const sync = () => setHash(window.location.hash)
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [pathname])

  return (
    <nav className={className} aria-label="Seções" data-cursor-theme="dark">
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const active = isCurrent(pathname, hash, item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className="inline-flex min-h-12 items-center gap-2 px-3 text-sm text-ink"
                data-cursor="link"
                data-cursor-label={item.label}
                data-cursor-theme="dark"
              >
                <span
                  className={cn(
                    'size-1.5 shrink-0 rounded-full',
                    active ? 'bg-mint' : 'bg-transparent',
                  )}
                  aria-hidden
                />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  const [hash, setHash] = useState('')
  const [open, setOpen] = useState(false)
  const [navPath, setNavPath] = useState(pathname)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const titleId = useId()

  if (navPath !== pathname) {
    setNavPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const sync = () => setHash(window.location.hash)
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [pathname])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px)')
    const onChange = () => {
      if (query.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const panel = panelRef.current
    const background = [
      document.querySelector<HTMLElement>('.skip-link'),
      document.querySelector<HTMLElement>('header'),
      document.getElementById('page-root'),
      document.querySelector<HTMLElement>('.whatsapp-bar'),
    ].filter((node): node is HTMLElement => node !== null)

    const release = () => {
      root.removeAttribute('data-nav-open')
      window.dispatchEvent(new CustomEvent('abmsol:nav', { detail: false }))
      background.forEach((node) => {
        node.inert = false
      })
      if (panel) {
        panel.inert = true
        panel.setAttribute('aria-hidden', 'true')
      }
      document.body.style.overflow = ''
    }

    if (!open) {
      release()
      return
    }

    root.setAttribute('data-nav-open', '')
    window.dispatchEvent(new CustomEvent('abmsol:nav', { detail: true }))
    background.forEach((node) => {
      node.inert = true
    })
    if (panel) {
      panel.inert = false
      panel.removeAttribute('aria-hidden')
    }
    document.body.style.overflow = 'hidden'

    const focusable = () =>
      panel
        ? [...panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
        : []

    focusable()[0]?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const items = focusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      release()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="fixed right-4 top-1 z-50 inline-flex min-h-12 min-w-12 items-center justify-center px-3 font-mono text-label uppercase text-ink lg:top-2 lg:hidden"
        aria-expanded={open}
        aria-controls="trail-index"
        data-cursor="link"
        data-cursor-label="Menu"
        data-cursor-theme="dark"
        onClick={() => {
          const next = !open
          setOpen(next)
          if (!next) triggerRef.current?.focus()
        }}
      >
        Menu
      </button>
      <nav
        ref={panelRef}
        id="trail-index"
        className={cn('trail-sheet lg:hidden', open && 'is-open')}
        aria-labelledby={titleId}
        {...(open ? { role: 'dialog' as const, 'aria-modal': true as const } : {})}
      >
        <div className="flex items-center justify-between px-4 pb-4">
          <p id={titleId} className="font-mono text-label uppercase text-mint">
            Índice
          </p>
          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center px-3 font-mono text-label uppercase text-ink"
            data-cursor="link"
            data-cursor-label="Fechar"
            data-cursor-theme="dark"
            onClick={() => {
              setOpen(false)
              triggerRef.current?.focus()
            }}
          >
            Fechar
          </button>
        </div>
        <ol className="trail-list">
          {NAV_ITEMS.map((item) => {
            const active = isCurrent(pathname, hash, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="flex min-h-12 items-center gap-4 py-3"
                  data-cursor="link"
                  data-cursor-label={item.label}
                  data-cursor-theme="dark"
                  onClick={() => setOpen(false)}
                >
                  <span className={cn('trail-node', active && 'is-current')}>
                    {item.index}
                  </span>
                  <span className="font-display text-[clamp(2rem,9vw,3rem)] leading-none text-ink">
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
        <div className="mt-auto px-4 pb-4">
          <WhatsAppLink
            source="menu"
            message={WHATSAPP_MESSAGES.site}
            className="min-h-14 w-full"
          >
            WhatsApp
          </WhatsAppLink>
        </div>
      </nav>
    </>
  )
}
