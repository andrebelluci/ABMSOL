/** Geometria do sol, medida em docs/assets/logo_desenho_svg.svg (espaço local, antes da escala). */
export const SUN_LOCAL_TO_VIEWBOX = {
  scale: 48.157894,
  tx: -4364.9903 - 92.64025,
  ty: -5132.9203 + 1423.894,
} as const

export function sunLocalToViewBox(x: number, y: number) {
  return {
    x: SUN_LOCAL_TO_VIEWBOX.scale * x + SUN_LOCAL_TO_VIEWBOX.tx,
    y: SUN_LOCAL_TO_VIEWBOX.scale * y + SUN_LOCAL_TO_VIEWBOX.ty,
  }
}

export const SUN_VIEWBOX = '0 0 1535.6068 1547.5811'
export const SUN_RING = { x: 108.506, y: 93.086, r: 3.368 }
/** 20 nós do circuito (5 por quadrante). */
export const SUN_NODES = [
  {
    "id": "path69",
    "x": 118.83,
    "y": 91.187,
    "r": 0.734
  },
  {
    "id": "path66",
    "x": 110.54,
    "y": 82.737,
    "r": 0.734
  },
  {
    "id": "path44",
    "x": 114.239,
    "y": 80.236,
    "r": 0.734
  },
  {
    "id": "path45",
    "x": 118.985,
    "y": 82.764,
    "r": 0.734
  },
  {
    "id": "path46",
    "x": 121.103,
    "y": 87.838,
    "r": 0.734
  },
  {
    "id": "path69",
    "x": 98.196,
    "y": 91.187,
    "r": 0.734
  },
  {
    "id": "path66",
    "x": 106.485,
    "y": 82.737,
    "r": 0.734
  },
  {
    "id": "path44",
    "x": 102.786,
    "y": 80.236,
    "r": 0.734
  },
  {
    "id": "path45",
    "x": 98.041,
    "y": 82.764,
    "r": 0.734
  },
  {
    "id": "path46",
    "x": 95.922,
    "y": 87.838,
    "r": 0.734
  },
  {
    "id": "path69",
    "x": 118.83,
    "y": 95.008,
    "r": 0.734
  },
  {
    "id": "path66",
    "x": 110.54,
    "y": 103.458,
    "r": 0.734
  },
  {
    "id": "path44",
    "x": 114.239,
    "y": 105.959,
    "r": 0.734
  },
  {
    "id": "path45",
    "x": 118.985,
    "y": 103.432,
    "r": 0.734
  },
  {
    "id": "path46",
    "x": 121.103,
    "y": 98.357,
    "r": 0.734
  },
  {
    "id": "path69",
    "x": 98.196,
    "y": 95.008,
    "r": 0.734
  },
  {
    "id": "path66",
    "x": 106.485,
    "y": 103.458,
    "r": 0.734
  },
  {
    "id": "path44",
    "x": 102.786,
    "y": 105.959,
    "r": 0.734
  },
  {
    "id": "path45",
    "x": 98.041,
    "y": 103.432,
    "r": 0.734
  },
  {
    "id": "path46",
    "x": 95.922,
    "y": 98.357,
    "r": 0.734
  }
] as const
/** 4 raios cardeais: do centro do anel ao nó da ponta. */
export const SUN_RAYS = [
  {
    "x1": 108.506,
    "y1": 93.086,
    "x2": 108.511,
    "y2": 77.752
  },
  {
    "x1": 108.506,
    "y1": 93.086,
    "x2": 123.716,
    "y2": 93.122
  },
  {
    "x1": 108.506,
    "y1": 93.086,
    "x2": 93.296,
    "y2": 93.122
  },
  {
    "x1": 108.506,
    "y1": 93.086,
    "x2": 108.511,
    "y2": 108.42
  }
] as const
/** Ramos diagonais, na ordem em que o traço sai do anel. 5 nós por quadrante. */
export const SUN_BRANCHES = [
  [6, 7, 8, 9, 5],
  [1, 2, 3, 4, 0],
  [16, 17, 18, 19, 15],
  [11, 12, 13, 14, 10],
] as const

export function sunBranchPath(indexes: readonly number[]) {
  return indexes
    .map((index, step) => {
      const node = SUN_NODES[index]
      return `${step === 0 ? 'M' : 'L'} ${node.x} ${node.y}`
    })
    .join(' ')
}

/** 4 nós das pontas (anel + raios + estes nós = mark-simple). Não entram nos 20. */
export const SUN_CARDINAL_NODES = [
  {
    "id": "path80",
    "x": 108.511,
    "y": 77.752,
    "r": 0.734
  },
  {
    "id": "path78",
    "x": 123.716,
    "y": 93.122,
    "r": 0.734
  },
  {
    "id": "path74",
    "x": 93.296,
    "y": 93.122,
    "r": 0.734
  },
  {
    "id": "path89",
    "x": 108.511,
    "y": 108.42,
    "r": 0.734
  }
] as const
