'use client'

/**
 * Stick “Nó”: rig por <g> aninhados (rotação nas juntas), sem morph de path.
 * Cabeça = anel aberto ~320°. Traço dourado; juntas acendem menta por progresso.
 */
export type NoPose = 'idle' | 'wave' | 'walk' | 'arrive'

export type NoJointProgress = 'profile' | 'need' | 'result'

type NoCharacterProps = {
  progress: NoJointProgress
}

function jointClass(on: boolean) {
  return on ? 'no-joint is-on' : 'no-joint'
}

export function NoCharacter({ progress }: NoCharacterProps) {
  const elbowsOn = progress === 'need' || progress === 'result'
  const kneesOn = progress === 'result'

  return (
    <svg
      className="no-character"
      viewBox="0 0 120 160"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
    >
      <g data-no-root transform="translate(60 28)">
        <g data-no-hip>
          <circle className={jointClass(true)} cx="0" cy="52" r="3.2" />

          <g data-no-torso transform="translate(0 52)">
            <line className="no-stroke" x1="0" y1="0" x2="0" y2="-40" />

            <g data-no-neck transform="translate(0 -40)">
              <circle className={jointClass(true)} cx="0" cy="0" r="3.2" />
              <g data-no-head transform="translate(0 -14)">
                {/* Anel aberto ~320° (vão no topo) */}
                <path className="no-stroke no-head" d="M 8.4 -4.2 A 9 9 0 1 1 -8.4 -4.2" />
              </g>
            </g>

            <g data-no-arm-l transform="translate(0 -34)">
              <line className="no-stroke" x1="0" y1="0" x2="-16" y2="6" />
              <g data-no-elbow-l transform="translate(-16 6)">
                <circle className={jointClass(elbowsOn)} cx="0" cy="0" r="2.8" />
                <g data-no-forearm-l>
                  <line className="no-stroke" x1="0" y1="0" x2="-10" y2="16" />
                </g>
              </g>
            </g>

            <g data-no-arm-r transform="translate(0 -34)">
              <line className="no-stroke" x1="0" y1="0" x2="16" y2="6" />
              <g data-no-elbow-r transform="translate(16 6)">
                <circle className={jointClass(elbowsOn)} cx="0" cy="0" r="2.8" />
                <g data-no-forearm-r>
                  <line className="no-stroke" x1="0" y1="0" x2="10" y2="16" />
                </g>
              </g>
            </g>
          </g>

          <g data-no-leg-l transform="translate(0 52)">
            <line className="no-stroke" x1="0" y1="0" x2="-10" y2="22" />
            <g data-no-knee-l transform="translate(-10 22)">
              <circle className={jointClass(kneesOn)} cx="0" cy="0" r="2.8" />
              <g data-no-shin-l>
                <line className="no-stroke" x1="0" y1="0" x2="-4" y2="24" />
              </g>
            </g>
          </g>

          <g data-no-leg-r transform="translate(0 52)">
            <line className="no-stroke" x1="0" y1="0" x2="10" y2="22" />
            <g data-no-knee-r transform="translate(10 22)">
              <circle className={jointClass(kneesOn)} cx="0" cy="0" r="2.8" />
              <g data-no-shin-r>
                <line className="no-stroke" x1="0" y1="0" x2="4" y2="24" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
