'use client'

import { GEO, HEAD_PATH, POSES, litFor, type Pose } from '@/components/hero-flow/rig'

export type NoPose = 'idle' | 'wave' | 'walk' | 'arrive'
export type NoJointProgress = 'profile' | 'need' | 'result'

const jointClass = (on: boolean) => (on ? 'no-joint is-on' : 'no-joint')

// Cada membro: <g translate(ombro/quadril)> <g data-rot=superior> linha
//   <g translate(0 comprimento)> <g data-rot=inferior> linha </g> <junta/> </g> </g> </g>
function Limb({
  y,
  up,
  lo,
  keys,
  lit,
}: {
  y: number
  up: number
  lo: number
  keys: [keyof Pose, keyof Pose]
  lit: boolean
}) {
  return (
    <g transform={`translate(0 ${y})`}>
      <g data-rot={keys[0]} transform={`rotate(${POSES.idle[keys[0]]})`}>
        <line className="no-stroke" x1={0} y1={0} x2={0} y2={up} />
        <g transform={`translate(0 ${up})`}>
          <g data-rot={keys[1]} transform={`rotate(${POSES.idle[keys[1]]})`}>
            <line className="no-stroke" x1={0} y1={0} x2={0} y2={lo} />
          </g>
          <circle className={jointClass(lit)} cx={0} cy={0} r={2.8} />
        </g>
      </g>
    </g>
  )
}

export function NoCharacter({ progress }: { progress: NoJointProgress }) {
  const lit = litFor(progress === 'profile' ? 1 : progress === 'need' ? 2 : 3)
  return (
    <svg
      className="no-character"
      viewBox="0 0 120 160"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <g transform="translate(60 84)">
        <line className="no-stroke" x1={0} y1={0} x2={0} y2={-GEO.torso} />
        <path className="no-stroke" d={HEAD_PATH} />
        <Limb y={GEO.shoulderY} up={GEO.upper} lo={GEO.fore} keys={['armL', 'elbowL']} lit={lit.elbL} />
        <Limb y={GEO.shoulderY} up={GEO.upper} lo={GEO.fore} keys={['armR', 'elbowR']} lit={lit.elbR} />
        <Limb y={0} up={GEO.thigh} lo={GEO.shin} keys={['legL', 'kneeL']} lit={lit.knL} />
        <Limb y={0} up={GEO.thigh} lo={GEO.shin} keys={['legR', 'kneeR']} lit={lit.knR} />
        <circle className={jointClass(lit.neck)} cx={0} cy={-GEO.torso} r={3.2} />
        <circle className={jointClass(lit.hip)} cx={0} cy={0} r={3.2} />
      </g>
    </svg>
  )
}
