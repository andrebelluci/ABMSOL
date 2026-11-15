// Origem (0,0) = quadril; y para baixo; rotate() positivo = horário.
// Escala do viewBox 0 0 120 160 (quadril em translate(60 84)).
export const GEO = { torso: 44, shoulderY: -36, upper: 20, fore: 19, thigh: 25, shin: 25 } as const

// Anel de cabeça r=10 centrado em (0,-58), aberto embaixo (36°); o pescoço fecha a abertura.
export const HEAD_PATH = 'M -3.09 -48.49 A 10 10 0 1 1 3.09 -48.49'

export type Pose = Record<
  'armL' | 'elbowL' | 'armR' | 'elbowR' | 'legL' | 'kneeL' | 'legR' | 'kneeR',
  number
>

export const POSES = {
  idle: { armL: 16, elbowL: 10, armR: -16, elbowR: -10, legL: 9, kneeL: -2, legR: -9, kneeR: 2 },
  wave: { armL: 16, elbowL: 10, armR: -128, elbowR: -30, legL: 9, kneeL: -2, legR: -9, kneeR: 2 },
  walkA: { armL: -24, elbowL: -16, armR: 24, elbowR: 16, legL: 26, kneeL: -16, legR: -14, kneeR: 4 },
  walkB: { armL: 24, elbowL: 16, armR: -24, elbowR: -16, legL: -14, kneeL: 4, legR: 26, kneeR: -16 },
  arrive: { armL: 122, elbowL: 14, armR: -122, elbowR: -14, legL: 10, kneeL: -2, legR: -10, kneeR: 2 },
} as const satisfies Record<string, Pose>

export function paintPose(root: ParentNode, p: Pose) {
  for (const k of Object.keys(p) as (keyof Pose)[]) {
    root.querySelector(`[data-rot="${k}"]`)?.setAttribute('transform', `rotate(${p[k]})`)
  }
}

// 1 = pescoço+quadril; 2 = +cotovelos; 3 = +joelhos
export const litFor = (step: 1 | 2 | 3) => ({
  neck: step >= 1,
  hip: step >= 1,
  elbL: step >= 2,
  elbR: step >= 2,
  knL: step >= 3,
  knR: step >= 3,
})
