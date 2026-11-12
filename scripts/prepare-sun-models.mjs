/**
 * Os GLB de docs/assets saem do Three com os nós circulares superdivididos
 * (~428 mil vértices, 13 MB cada). Aqui os discos viram cilindros de 28 lados
 * e o circuito dourado é soldado e indexado.
 */
import fs from 'fs'
import path from 'path'

const root = path.join(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'models')
const GOLD = [0.7156935005005721, 0.3967552307153359, 0.030713443727452196, 1]
const MINT = [0.171441100722554, 0.6938717612856897, 0.4396571738310091, 1]

function parseGlb(file) {
  const b = fs.readFileSync(file)
  const jsonLen = b.readUInt32LE(12)
  const json = JSON.parse(b.slice(20, 20 + jsonLen).toString('utf8'))
  const binStart = 20 + jsonLen
  const binLen = b.readUInt32LE(binStart)
  const bin = b.slice(binStart + 8, binStart + 8 + binLen)
  return { json, bin }
}

function readVec3(json, bin, accessorIndex) {
  const accessor = json.accessors[accessorIndex]
  const view = json.bufferViews[accessor.bufferView]
  const start = (view.byteOffset || 0) + (accessor.byteOffset || 0)
  const out = new Float32Array(accessor.count * 3)
  for (let i = 0; i < out.length; i += 1) out[i] = bin.readFloatLE(start + i * 4)
  return { out, min: accessor.min, max: accessor.max }
}

function faceNormal(pos, ia, ib, ic) {
  const ax = pos[ib] - pos[ia]
  const ay = pos[ib + 1] - pos[ia + 1]
  const az = pos[ib + 2] - pos[ia + 2]
  const bx = pos[ic] - pos[ia]
  const by = pos[ic + 1] - pos[ia + 1]
  const bz = pos[ic + 2] - pos[ia + 2]
  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx]
}

function normalsOf(pos, idx) {
  const nrm = new Float32Array(pos.length)
  for (let i = 0; i < idx.length; i += 3) {
    const a = idx[i] * 3
    const b = idx[i + 1] * 3
    const c = idx[i + 2] * 3
    const [nx, ny, nz] = faceNormal(pos, a, b, c)
    nrm[a] += nx
    nrm[a + 1] += ny
    nrm[a + 2] += nz
    nrm[b] += nx
    nrm[b + 1] += ny
    nrm[b + 2] += nz
    nrm[c] += nx
    nrm[c + 1] += ny
    nrm[c + 2] += nz
  }
  for (let i = 0; i < nrm.length; i += 3) {
    const len = Math.hypot(nrm[i], nrm[i + 1], nrm[i + 2]) || 1
    nrm[i] /= len
    nrm[i + 1] /= len
    nrm[i + 2] /= len
  }
  return nrm
}

function flip(idx) {
  for (let i = 0; i < idx.length; i += 3) {
    const tmp = idx[i + 1]
    idx[i + 1] = idx[i + 2]
    idx[i + 2] = tmp
  }
}

function weld(src) {
  const map = new Map()
  const pos = []
  const idx = []
  const count = src.length / 3
  for (let i = 0; i < count; i += 1) {
    const x = src[i * 3]
    const y = src[i * 3 + 1]
    const z = src[i * 3 + 2]
    const key = `${Math.round(x * 20)}:${Math.round(y * 20)}:${Math.round(z * 20)}`
    let id = map.get(key)
    if (id === undefined) {
      id = pos.length / 3
      map.set(key, id)
      pos.push(x, y, z)
    }
    idx.push(id)
  }
  return { pos: Float32Array.from(pos), idx: Uint32Array.from(idx) }
}

function discMesh(cx, cy, z0, z1, radius) {
  const seg = 28
  const pos = []
  const idx = []
  for (let i = 0; i < seg; i += 1) {
    const angle = (i / seg) * Math.PI * 2
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    pos.push(x, y, z0, x, y, z1)
  }
  const bottom = pos.length / 3
  pos.push(cx, cy, z0)
  const top = pos.length / 3
  pos.push(cx, cy, z1)
  for (let i = 0; i < seg; i += 1) {
    const next = (i + 1) % seg
    const b0 = i * 2
    const t0 = b0 + 1
    const b1 = next * 2
    const t1 = b1 + 1
    idx.push(b0, b1, t1, b0, t1, t0)
    idx.push(bottom, b1, b0)
    idx.push(top, t0, t1)
  }
  const positions = Float32Array.from(pos)
  const indices = Uint32Array.from(idx)
  const [nx, ny] = faceNormal(positions, indices[0] * 3, indices[1] * 3, indices[2] * 3)
  const mx = (positions[indices[0] * 3] + positions[indices[1] * 3] + positions[indices[2] * 3]) / 3 - cx
  const my = (positions[indices[0] * 3 + 1] + positions[indices[1] * 3 + 1] + positions[indices[2] * 3 + 1]) / 3 - cy
  if (nx * mx + ny * my < 0) flip(indices)
  return { pos: positions, idx: indices, nrm: normalsOf(positions, indices) }
}

function concatParts(parts) {
  let vertCount = 0
  let idxCount = 0
  for (const part of parts) {
    vertCount += part.pos.length
    idxCount += part.idx.length
  }
  const pos = new Float32Array(vertCount)
  const nrm = new Float32Array(vertCount)
  const idx = new Uint32Array(idxCount)
  let pv = 0
  let iv = 0
  let base = 0
  for (const part of parts) {
    pos.set(part.pos, pv)
    nrm.set(part.nrm, pv)
    for (let i = 0; i < part.idx.length; i += 1) idx[iv + i] = part.idx[i] + base
    pv += part.pos.length
    iv += part.idx.length
    base += part.pos.length / 3
  }
  return { pos, nrm, idx }
}

function multiplyMatrix(a, b) {
  const out = new Array(16).fill(0)
  for (let col = 0; col < 4; col += 1) {
    for (let row = 0; row < 4; row += 1) {
      out[col * 4 + row] =
        a[row] * b[col * 4] +
        a[4 + row] * b[col * 4 + 1] +
        a[8 + row] * b[col * 4 + 2] +
        a[12 + row] * b[col * 4 + 3]
    }
  }
  return out
}

function transformPositions(matrix, src) {
  const out = new Float32Array(src.length)
  for (let i = 0; i < src.length; i += 3) {
    const x = src[i]
    const y = src[i + 1]
    const z = src[i + 2]
    out[i] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]
    out[i + 1] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]
    out[i + 2] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]
  }
  return out
}

function worldOf(json) {
  const identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  const local = json.nodes.map((node) => node.matrix || identity)
  const world = new Array(json.nodes.length)
  const visit = (index, parent) => {
    world[index] = parent ? multiplyMatrix(parent, local[index]) : local[index].slice()
    for (const child of json.nodes[index].children || []) visit(child, world[index])
  }
  for (const root of json.scenes[json.scene || 0].nodes) visit(root, null)
  const byMesh = new Map()
  json.nodes.forEach((node, index) => {
    if (node.mesh !== undefined) byMesh.set(node.mesh, world[index])
  })
  return byMesh
}

function spanOf(pos) {
  const min = [Infinity, Infinity, Infinity]
  const max = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i < pos.length; i += 3) {
    for (let k = 0; k < 3; k += 1) {
      min[k] = Math.min(min[k], pos[i + k])
      max[k] = Math.max(max[k], pos[i + k])
    }
  }
  return { min, max }
}

function recenter(parts) {
  const min = [Infinity, Infinity, Infinity]
  const max = [-Infinity, -Infinity, -Infinity]
  for (const part of parts) {
    const box = spanOf(part.pos)
    for (let k = 0; k < 3; k += 1) {
      min[k] = Math.min(min[k], box.min[k])
      max[k] = Math.max(max[k], box.max[k])
    }
  }
  const center = min.map((value, index) => (value + max[index]) / 2)
  for (const part of parts) {
    for (let i = 0; i < part.pos.length; i += 3) {
      part.pos[i] -= center[0]
      part.pos[i + 1] -= center[1]
      part.pos[i + 2] -= center[2]
    }
    if (part.cx !== undefined) {
      part.cx -= center[0]
      part.cy -= center[1]
    }
  }
}

function prepare(file) {
  const { json, bin } = parseGlb(file)
  const meshWorld = worldOf(json)
  const goldSrc = []
  const discs = []
  json.meshes.forEach((mesh, meshIndex) => {
    const primitive = mesh.primitives[0]
    const local = readVec3(json, bin, primitive.attributes.POSITION)
    const out = transformPositions(meshWorld.get(meshIndex), local.out)
    const { min, max } = spanOf(out)
    const sx = max[0] - min[0]
    const sy = max[1] - min[1]
    if (sx < 120 && sy < 120) {
      const cx = (min[0] + max[0]) / 2
      const cy = (min[1] + max[1]) / 2
      discs.push({
        cx,
        cy,
        cz: (min[2] + max[2]) / 2,
        mesh: discMesh(cx, cy, min[2], max[2], (sx + sy) / 4),
      })
      return
    }
    for (let i = 0; i < out.length; i += 1) goldSrc.push(out[i])
  })
  const welded = weld(Float32Array.from(goldSrc))
  const nrm = normalsOf(welded.pos, welded.idx)
  let nz = 0
  let seen = 0
  for (let i = 0; i < welded.pos.length; i += 3) {
    if (welded.pos[i + 2] <= 0) continue
    nz += nrm[i + 2]
    seen += 1
  }
  if (seen > 0 && nz / seen < 0) {
    flip(welded.idx)
  }
  const gold = {
    name: 'circuit',
    pos: welded.pos,
    idx: welded.idx,
    nrm: normalsOf(welded.pos, welded.idx),
  }
  const parts = [gold, ...discs.map((disc) => ({ name: 'node', cx: disc.cx, cy: disc.cy, ...disc.mesh }))]
  recenter(parts)
  const nodes = parts.filter((part) => part.cx !== undefined)
  const pick = (score) => nodes.reduce((best, disc) => (score(disc) > score(best) ? disc : best))
  pick((disc) => disc.cy - Math.abs(disc.cx)).name = 'cardinal-n'
  pick((disc) => -disc.cy - Math.abs(disc.cx)).name = 'cardinal-s'
  pick((disc) => disc.cx - Math.abs(disc.cy)).name = 'cardinal-e'
  pick((disc) => -disc.cx - Math.abs(disc.cy)).name = 'cardinal-w'
  return parts
}

function boundsOf(pos) {
  const min = [Infinity, Infinity, Infinity]
  const max = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i < pos.length; i += 3) {
    for (let k = 0; k < 3; k += 1) {
      min[k] = Math.min(min[k], pos[i + k])
      max[k] = Math.max(max[k], pos[i + k])
    }
  }
  return {
    min: min.map((n) => +n.toFixed(4)),
    max: max.map((n) => +n.toFixed(4)),
  }
}

function writeGlb(parts, file) {
  const chunks = []
  let offset = 0
  const views = []
  const accessors = []
  const push = (array, target) => {
    const pad = (4 - (offset % 4)) % 4
    if (pad) {
      chunks.push(Buffer.alloc(pad))
      offset += pad
    }
    const buf = Buffer.from(array.buffer, array.byteOffset, array.byteLength)
    views.push({ buffer: 0, byteOffset: offset, byteLength: buf.length, target })
    chunks.push(buf)
    const view = views.length - 1
    offset += buf.length
    return view
  }
  const meshes = []
  const nodes = []
  for (const part of parts) {
    const box = boundsOf(part.pos)
    const position = push(part.pos, 34962)
    const normal = push(part.nrm, 34962)
    const index = push(part.idx, 34963)
    const base = accessors.length
    accessors.push({
      bufferView: position,
      componentType: 5126,
      count: part.pos.length / 3,
      type: 'VEC3',
      min: box.min,
      max: box.max,
    })
    accessors.push({
      bufferView: normal,
      componentType: 5126,
      count: part.nrm.length / 3,
      type: 'VEC3',
    })
    accessors.push({
      bufferView: index,
      componentType: 5125,
      count: part.idx.length,
      type: 'SCALAR',
    })
    const material = part.name === 'circuit' ? 0 : 1
    meshes.push({
      name: part.name,
      primitives: [
        {
          attributes: { POSITION: base, NORMAL: base + 1 },
          indices: base + 2,
          material,
          mode: 4,
        },
      ],
    })
    nodes.push({ name: part.name, mesh: meshes.length - 1 })
  }
  const json = {
    asset: { version: '2.0', generator: 'abmsol-prepare-sun-models' },
    scene: 0,
    scenes: [{ nodes: nodes.map((_, i) => i) }],
    nodes,
    meshes,
    materials: [
      {
        name: 'gold',
        doubleSided: true,
        pbrMetallicRoughness: { baseColorFactor: GOLD, metallicFactor: 0.12, roughnessFactor: 0.42 },
      },
      {
        name: 'mint',
        doubleSided: true,
        pbrMetallicRoughness: { baseColorFactor: MINT, metallicFactor: 0.08, roughnessFactor: 0.38 },
      },
    ],
    accessors,
    bufferViews: views,
    buffers: [{ byteLength: offset }],
  }
  let jsonBuf = Buffer.from(JSON.stringify(json))
  const jsonPad = (4 - (jsonBuf.length % 4)) % 4
  if (jsonPad) jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(jsonPad, 0x20)])
  const bin = Buffer.concat(chunks)
  const binPad = (4 - (bin.length % 4)) % 4
  const binPadded = binPad ? Buffer.concat([bin, Buffer.alloc(binPad)]) : bin
  const total = 12 + 8 + jsonBuf.length + 8 + binPadded.length
  const header = Buffer.alloc(12)
  header.writeUInt32LE(0x46546c67, 0)
  header.writeUInt32LE(2, 4)
  header.writeUInt32LE(total, 8)
  const jsonHeader = Buffer.alloc(8)
  jsonHeader.writeUInt32LE(jsonBuf.length, 0)
  jsonHeader.writeUInt32LE(0x4e4f534a, 4)
  const binHeader = Buffer.alloc(8)
  binHeader.writeUInt32LE(binPadded.length, 0)
  binHeader.writeUInt32LE(0x004e4942, 4)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, Buffer.concat([header, jsonHeader, jsonBuf, binHeader, binPadded]))
  return fs.statSync(file).size
}

const jobs = [
  ['docs/assets/model_flat.glb', 'public/models/sun-flat.glb'],
  ['docs/assets/model_profundity.glb', 'public/models/sun-depth.glb'],
]

for (const [input, output] of jobs) {
  const parts = prepare(path.join(root, input))
  const bytes = writeGlb(parts, path.join(root, output))
  const verts = parts.reduce((sum, part) => sum + part.pos.length / 3, 0)
  const cards = parts
    .filter((part) => part.name.startsWith('cardinal'))
    .map((part) => `${part.name} (${part.cx.toFixed(0)}, ${part.cy.toFixed(0)})`)
  console.log(`${output} ${(bytes / 1024).toFixed(0)} KB · ${Math.round(verts)} vértices · ${cards.join(' · ')}`)
}
