'use client'

import { useEffect, useState, type MouseEvent } from 'react'

const STORAGE_KEY = 'abmsol-widget-teaser-seen'
const SHOW_AFTER_MS = 4500
const POLL_LIMIT_MS = 15000
const POLL_EVERY_MS = 400

function openAgencyOsChat() {
  const widget = window.AgencyOSWidget
  if (widget?.open) {
    widget.open()
    return true
  }
  return false
}

export function WidgetTeaser() {
  const [visible, setVisible] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    let showTimer = 0
    let pollTimer = 0
    let launcherReady = false
    let delayDone = false
    let launcherObserver: MutationObserver | null = null
    const pollStartedAt = Date.now()

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      /* private mode */
    }

    const markSeen = () => {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* private mode */
      }
    }

    const dismiss = () => {
      markSeen()
      if (!cancelled) setVisible(false)
    }

    const tryShow = () => {
      if (cancelled || !launcherReady || !delayDone) return
      try {
        if (sessionStorage.getItem(STORAGE_KEY) === '1') return
      } catch {
        /* private mode */
      }
      setVisible(true)
    }

    const bindLauncher = (launcher: Element) => {
      if (launcherObserver) return

      const sync = () => {
        const open = launcher.getAttribute('aria-expanded') === 'true'
        setChatOpen(open)
        if (open) dismiss()
      }

      sync()
      launcherObserver = new MutationObserver(sync)
      launcherObserver.observe(launcher, {
        attributes: true,
        attributeFilter: ['aria-expanded'],
      })
    }

    const waitForWidget = () => {
      if (cancelled) return
      const launcher = document.querySelector('.aos-embed-launcher')
      if (launcher) {
        launcherReady = true
        bindLauncher(launcher)
        tryShow()
        return
      }
      if (Date.now() - pollStartedAt >= POLL_LIMIT_MS) return
      pollTimer = window.setTimeout(waitForWidget, POLL_EVERY_MS)
    }

    showTimer = window.setTimeout(() => {
      delayDone = true
      tryShow()
    }, SHOW_AFTER_MS)

    waitForWidget()

    return () => {
      cancelled = true
      window.clearTimeout(showTimer)
      window.clearTimeout(pollTimer)
      launcherObserver?.disconnect()
    }
  }, [])

  const handleOpen = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode */
    }
    setVisible(false)
    if (!openAgencyOsChat()) {
      window.setTimeout(() => {
        openAgencyOsChat()
      }, 300)
    }
  }

  const handleDismiss = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode */
    }
    setVisible(false)
  }

  if (!visible || chatOpen) return null

  return (
    <div
      className="widget-teaser"
      role="status"
      data-aos-offset-ignore="true"
      data-cursor-theme="dark"
    >
      <button
        type="button"
        className="widget-teaser-open"
        onClick={handleOpen}
        data-cursor="link"
        data-cursor-label="Chat"
        data-cursor-theme="dark"
      >
        Tire suas dúvidas
      </button>
      <button
        type="button"
        className="widget-teaser-dismiss"
        aria-label="Dispensar"
        onClick={handleDismiss}
        data-cursor="link"
        data-cursor-label="Fechar"
        data-cursor-theme="dark"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  )
}
