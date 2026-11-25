'use client'

/** Cena “site-fraco”: janela torta que endireita e acende (x 88–118). */
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
          x="88"
          y="72"
          width="30"
          height="42"
          rx="2.5"
        />
        <path data-no-el data-no-window-bar className="no-window-frame" d="M90 80 H116" />
        <circle data-no-el data-no-window-dot className="no-window-dot" cx="93" cy="76" r="1.2" />
        <circle data-no-el data-no-window-dot className="no-window-dot" cx="97.5" cy="76" r="1.2" />
        <circle data-no-el data-no-window-dot className="no-window-dot" cx="102" cy="76" r="1.2" />
        <path data-no-el data-no-window-line className="no-window-line" d="M94 92 H112" />
        <path data-no-el data-no-window-line className="no-window-line" d="M94 100 H108" />
      </g>
    </svg>
  )
}
