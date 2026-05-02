import { useRef, useMemo, useCallback, useEffect, memo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 2500
const MOUSE_RADIUS = 2.0
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS
const REPEL_STRENGTH = 0.015
const RETURN_STRENGTH = 0.015 
const DAMPING = 0.88 

function Particles() {
  const meshRef = useRef()
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0))
  const lerpedMouse = useRef(new THREE.Vector3(0, 0, 0))
  const { viewport } = useThree()

  const { positions, homePositions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const home = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const ring = Math.floor(Math.random() * 25) + 1
      const radius = ring * 0.5 + 1.5
      const segmentCount = 16 + ring * 2
      const segment = Math.floor(Math.random() * segmentCount)
      const angle = (segment / segmentCount) * Math.PI * 2 + (Math.random() * 0.15) + (ring * 0.1)
      
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const z = (Math.random() - 0.5) * 0.5 - (radius * 0.05)

      pos[i3] = x; pos[i3 + 1] = y; pos[i3 + 2] = z
      home[i3] = x; home[i3 + 1] = y; home[i3 + 2] = z
    }
    return { positions: pos, homePositions: home, velocities: vel }
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const matrix = useMemo(() => new THREE.Matrix4(), [])

  const handlePointerMove = useCallback((e) => {
    mouseRef.current.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
      0
    )
    mouseRef.current.x *= viewport.width / 2
    mouseRef.current.y *= viewport.height / 2
  }, [viewport])

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [handlePointerMove])

  useFrame((state) => {
    if (!meshRef.current) return

    // 1. Rotate the entire mesh instead of recalculating 2500 positions! (Massive optimization)
    meshRef.current.rotation.z -= 0.0005

    // Transform mouse coordinates into the rotated mesh space
    lerpedMouse.current.lerp(mouseRef.current, 0.1)
    
    // Reverse the mesh rotation for the mouse to keep repel accurate
    const cosR = Math.cos(-meshRef.current.rotation.z)
    const sinR = Math.sin(-meshRef.current.rotation.z)
    const localMouseX = lerpedMouse.current.x * cosR - lerpedMouse.current.y * sinR
    const localMouseY = lerpedMouse.current.x * sinR + lerpedMouse.current.y * cosR

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const px = positions[i3], py = positions[i3 + 1], pz = positions[i3 + 2]
      const hx = homePositions[i3], hy = homePositions[i3 + 1], hz = homePositions[i3 + 2]

      const dx = px - localMouseX
      const dy = py - localMouseY
      const distSq = dx * dx + dy * dy

      // Fast check before doing Math.sqrt
      let s = 0.04
      if (distSq < MOUSE_RADIUS_SQ) {
        const dist = Math.sqrt(distSq)
        const force = (1 - dist / MOUSE_RADIUS) * REPEL_STRENGTH
        velocities[i3] += dx * force
        velocities[i3 + 1] += dy * force
        velocities[i3 + 2] += force * 0.5
        s += (1 - dist / MOUSE_RADIUS) * 0.03
      }

      velocities[i3] += (hx - px) * RETURN_STRENGTH
      velocities[i3 + 1] += (hy - py) * RETURN_STRENGTH
      velocities[i3 + 2] += (hz - pz) * RETURN_STRENGTH

      velocities[i3] *= DAMPING
      velocities[i3 + 1] *= DAMPING
      velocities[i3 + 2] *= DAMPING
      
      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]

      // Manual, faster matrix composition (skips quaternion and rotmath)
      matrix.makeTranslation(positions[i3], positions[i3 + 1], positions[i3 + 2])
      matrix.scale(new THREE.Vector3(s, s, s))
      meshRef.current.setMatrixAt(i, matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      {/* Reduced sphere detail for faster rendering */}
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} />
    </instancedMesh>
  )
}

const ParticleCanvas = memo(function ParticleCanvas() {
  return (
    <div className="particle-wrapper" style={{ 
      position: 'absolute', 
      inset: 0, 
      zIndex: 1, 
      pointerEvents: 'none' 
    }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        // Hard-cap DPR to avoid massive pixel counts on 4k retina displays
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <Particles />
      </Canvas>
    </div>
  )
})

export default ParticleCanvas
