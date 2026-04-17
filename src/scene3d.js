import * as THREE from 'three'

export function initScene(canvas) {
  const W = canvas.clientWidth
  const H = canvas.clientHeight

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Scene & Camera
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
  camera.position.set(0, 0, 5)

  // ── Core object: Icosahedron ──────────────────────────────────────────
  const geoIco = new THREE.IcosahedronGeometry(1.4, 1)
  const matIco = new THREE.MeshPhongMaterial({
    color: 0x0EA5E9,
    emissive: 0x0369A1,
    emissiveIntensity: 0.3,
    shininess: 120,
    transparent: true,
    opacity: 0.85,
    flatShading: true,
  })
  const ico = new THREE.Mesh(geoIco, matIco)
  scene.add(ico)

  // ── Wireframe shell ───────────────────────────────────────────────────
  const geoWire = new THREE.IcosahedronGeometry(1.55, 1)
  const matWire = new THREE.MeshBasicMaterial({
    color: 0x38BDF8,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  })
  const wire = new THREE.Mesh(geoWire, matWire)
  scene.add(wire)

  // ── Outer glow ring (torus) ───────────────────────────────────────────
  const geoRing = new THREE.TorusGeometry(1.9, 0.012, 16, 120)
  const matRing = new THREE.MeshBasicMaterial({ color: 0xF97316, transparent: true, opacity: 0.6 })
  const ring = new THREE.Mesh(geoRing, matRing)
  ring.rotation.x = Math.PI / 2.4
  scene.add(ring)

  const geoRing2 = new THREE.TorusGeometry(2.15, 0.008, 16, 120)
  const matRing2 = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.3 })
  const ring2 = new THREE.Mesh(geoRing2, matRing2)
  ring2.rotation.x = Math.PI / 3.5
  ring2.rotation.y = Math.PI / 4
  scene.add(ring2)

  // ── Particles ─────────────────────────────────────────────────────────
  const particleCount = 280
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 2.5 + Math.random() * 1.2
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  const geoParticles = new THREE.BufferGeometry()
  geoParticles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const matParticles = new THREE.PointsMaterial({
    color: 0x0EA5E9,
    size: 0.04,
    transparent: true,
    opacity: 0.7,
  })
  const particles = new THREE.Points(geoParticles, matParticles)
  scene.add(particles)

  // ── Lights ────────────────────────────────────────────────────────────
  const ambient = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambient)

  const pointLight1 = new THREE.PointLight(0x0EA5E9, 3, 10)
  pointLight1.position.set(3, 3, 3)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0xF97316, 2, 10)
  pointLight2.position.set(-3, -2, 2)
  scene.add(pointLight2)

  const pointLight3 = new THREE.PointLight(0x38BDF8, 1.5, 10)
  pointLight3.position.set(0, -3, -2)
  scene.add(pointLight3)

  // ── Mouse interaction ─────────────────────────────────────────────────
  const mouse = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
  })

  // ── Resize ────────────────────────────────────────────────────────────
  const resizeObserver = new ResizeObserver(() => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  })
  resizeObserver.observe(canvas)

  // ── Reduced motion ────────────────────────────────────────────────────
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── Animation loop ────────────────────────────────────────────────────
  const clock = new THREE.Clock()

  function animate() {
    requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    if (!prefersReduced) {
      // Smooth lerp toward mouse
      target.x += (mouse.x - target.x) * 0.04
      target.y += (mouse.y - target.y) * 0.04

      // Core rotation
      ico.rotation.y = t * 0.25 + target.x * 0.6
      ico.rotation.x = t * 0.15 + target.y * 0.4
      ico.rotation.z = t * 0.1

      // Wireframe slightly offset
      wire.rotation.y = t * 0.2 - target.x * 0.3
      wire.rotation.x = -t * 0.1 + target.y * 0.2

      // Rings orbit
      ring.rotation.z = t * 0.3
      ring2.rotation.y = t * 0.2
      ring2.rotation.z = -t * 0.15

      // Particles drift
      particles.rotation.y = t * 0.05
      particles.rotation.x = t * 0.03

      // Breathing scale
      const breathe = 1 + Math.sin(t * 1.2) * 0.03
      ico.scale.setScalar(breathe)
      wire.scale.setScalar(breathe * 1.02)
    }

    // Light orbit
    pointLight1.position.x = Math.cos(t * 0.6) * 3
    pointLight1.position.z = Math.sin(t * 0.6) * 3
    pointLight2.position.x = Math.cos(t * 0.4 + 2) * 3
    pointLight2.position.z = Math.sin(t * 0.4 + 2) * 3

    renderer.render(scene, camera)
  }

  animate()
}
