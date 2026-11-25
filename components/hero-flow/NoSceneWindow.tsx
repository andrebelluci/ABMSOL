'use client'

/** Cena “site-fraco”: janela torta que endireita e acende (Etapa 4). */
export function NoSceneWindow() {
  return (
    <svg
      className="no-scene-window"
      viewBox="0 0 120 160"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
    >
      <g data-no-el data-no-window className="no-window">
        <rect
          data-no-el
          data-no-window-frame
          className="no-window-frame"
          x="84"
          y="72"
          width="30"
          height="42"
          rx="2.5"
        />
        <path data-no-el data-no-window-bar className="no-window-frame" d="M86 80 H112" />
        <circle data-no-el data-no-window-dot className="no-window-dot" cx="89" cy="76" r="1.2" />
        <circle data-no-el data-no-window-dot className="no-window-dot" cx="93.5" cy="76" r="1.2" />
        <circle data-no-el data-no-window-dot className="no-window-dot" cx="98" cy="76" r="1.2" />
        <path data-no-el data-no-window-line className="no-window-line" d="M90 92 H108" />
        <path data-no-el data-no-window-line className="no-window-line" d="M90 100 H104" />
      </g>
    </svg>
  )
}
