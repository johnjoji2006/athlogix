import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 700
const MOUSE_RADIUS = 1.5 // Extremely localized
const REPEL_STRENGTH = 0.005 // Barely noticeable push
const RETURN_STRENGTH = 0.012 
const FLOAT_SPEED = 0.4
const DAMPING = 0.94 

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
      const x = (Math.random() - 0.5) * 16
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 2

      pos[i3] = x; pos[i3 + 1] = y; pos[i3 + 2] = z
      home[i3] = x; home[i3 + 1] = y; home[i3 + 2] = z
    }
    return { positions: pos, homePositions: home, velocities: vel }
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  const handlePointerMove = useCallback((e) => {
    mouseRef.current.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
      0
    )
    mouseRef.current.x *= viewport.width / 2
    mouseRef.current.y *= viewport.height / 2
  }, [viewport])

  useMemo(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [handlePointerMove])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime

    // Smooth "thick" mouse tracking
    lerpedMouse.current.lerp(mouseRef.current, 0.06)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const px = positions[i3], py = positions[i3 + 1], pz = positions[i3 + 2]

      // Difference from lerped mouse
      const dx = px - lerpedMouse.current.x
      const dy = py - lerpedMouse.current.y
      const distSq = dx * dx + dy * dy
      const dist = Math.sqrt(distSq)

      // 1. Repulsion (Push away like water)
      if (dist < MOUSE_RADIUS) {
        const force = (1 - dist / MOUSE_RADIUS) * REPEL_STRENGTH
        velocities[i3] += dx * force
        velocities[i3 + 1] += dy * force
      }

      // 2. Wave / Float motion
      const driftX = Math.sin(time * FLOAT_SPEED + i * 0.1) * 0.4
      const driftY = Math.cos(time * FLOAT_SPEED + i * 0.15) * 0.3
      
      // 3. Return to home position
      velocities[i3] += (homePositions[i3] + driftX - px) * RETURN_STRENGTH
      velocities[i3 + 1] += (homePositions[i3 + 1] + driftY - py) * RETURN_STRENGTH

      // 4. Physics (Damping + Movement)
      velocities[i3] *= DAMPING
      velocities[i3 + 1] *= DAMPING
      
      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] = homePositions[i3 + 2] + Math.sin(time * 0.3 + i) * 0.2

      // 5. Update Matrix
      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2])
      const s = 0.035 + (dist < MOUSE_RADIUS ? (1 - dist / MOUSE_RADIUS) * 0.025 : 0)
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#4f6ef7" transparent opacity={0.5} />
    </instancedMesh>
  )
}

export default function ParticleCanvas() {
  return (
    <div className="particle-wrapper" style={{ 
      position: 'absolute', 
      inset: 0, 
      zIndex: 1, 
      pointerEvents: 'none' 
    }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
