'use client'

import { useEffect, useState } from 'react'

const SHOW_AFTER_PX = 0.85

function scrollToTop() {
  window.dispatchEvent(new CustomEvent('abmsol:scroll-to', { detail: { top: 0 } }))
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * SHOW_AFTER_PX
      setVisible(window.scrollY > threshold)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <button
      id="back-to-top"
      type="button"
      className="back-to-top"
      hidden={!visible}
      aria-label="Voltar ao topo"
      data-aos-offset-ignore="true"
      data-cursor="link"
      data-cursor-label="Topo"
      data-cursor-theme="dark"
      onClick={scrollToTop}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M6 14.5 12 8.5l6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
