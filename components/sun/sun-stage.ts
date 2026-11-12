import {
  ACESFilmicToneMapping,
  AmbientLight,
  DirectionalLight,
  Group,
  Mesh,
  Object3D,
  PerspectiveCamera,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export { PLATE_TILT, SUN_DEPTH_URL, SUN_FLAT_URL, SUN_TIP_NAMES } from '@/lib/sun-plate'

const cache = new Map<string, Promise<Group>>()

export function loadSun(url: string) {
  const cached = cache.get(url)
  if (cached) return cached.then((scene) => scene.clone(true))
  const pending = new GLTFLoader().loadAsync(url).then((gltf: { scene: Group }) => {
    gltf.scene.traverse((obj) => {
      if (obj instanceof Mesh) obj.frustumCulled = false
    })
    return gltf.scene
  })
  cache.set(url, pending)
  pending.catch(() => {
    if (cache.get(url) === pending) cache.delete(url)
  })
  return pending.then((scene) => scene.clone(true))
}

export function makeRenderer(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.08
  return renderer
}

export function lightStage(scene: Object3D) {
  scene.add(new AmbientLight(0xf3eee4, 0.95))
  const key = new DirectionalLight(0xfff6ea, 2.2)
  key.position.set(-280, 640, 1800)
  scene.add(key)
  const rim = new DirectionalLight(0x73d9b1, 1.35)
  rim.position.set(1100, -180, 360)
  scene.add(rim)
  const edge = new DirectionalLight(0xdca931, 0.55)
  edge.position.set(200, -300, -900)
  scene.add(edge)
}

/** Distância em que o sol (~1500 unidades) preenche o quadro. */
export function fitCamera(camera: PerspectiveCamera, fill = 0.8) {
  const half = (camera.fov * Math.PI) / 360
  const distance = 1500 / fill / (2 * Math.tan(half))
  camera.position.set(distance * 0.34, distance * 0.18, distance * 0.86)
  camera.near = 10
  camera.far = distance * 8
  camera.lookAt(80, -30, 0)
  camera.updateProjectionMatrix()
}

export function resizeRenderer(renderer: WebGLRenderer, camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (width < 2 || height < 2) return
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}
