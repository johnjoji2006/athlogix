import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import './Story.css'

function DiamondCore() {
  const meshRef = useRef()
  const shellRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.3
    meshRef.current.rotation.z = t * 0.2
    shellRef.current.rotation.y = -t * 0.15
    shellRef.current.rotation.x = t * 0.1
  })

  return (
    <group>
      {/* The Core Diamond */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[2, 0]} />
        <meshPhysicalMaterial 
          color="#4f6ef7"
          metalness={0.1}
          roughness={0.05}
          transmission={0.9}
          thickness={2}
          ior={2.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Outer Wireframe Shell */}
      <mesh ref={shellRef}>
        <octahedronGeometry args={[3.2, 0]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.1} 
        />
      </mesh>

      {/* Floating Light Points */}
      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          ]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Story() {
  const navigate = useNavigate()
  return (
    <section className="story" id="about">
      <div className="container story__grid">
        <motion.div 
          className="story__content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="story__title">Our Story</h2>
          <h3 className="story__subtitle">The DNA of Athlogix</h3>
          <p className="story__text">
            Derived from Greek Athlos, Athlon, — meaning contest, prize won in a contest — and Logic, our name represents the core of our partnership.
          </p>
          <p className="story__text">
            Our journey was solidified when we won a prestigious innovation competition, proving that our logic could stand the high stakes of contests. Today we bring that same award winning rigor to every IT service we provide.
          </p>
          <button className="story__cta" onClick={() => navigate('/about')}>
            About us <HiArrowRight />
          </button>
        </motion.div>

        <div className="story__visual">
          <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#4f6ef7" intensity={0.5} />
            <DiamondCore />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>

          {/* Floating Stats - More labels as requested */}
          <motion.div 
            className="story__stat story__stat--1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="story__stat-num">600+</div>
            <div className="story__stat-label">Global Partners</div>
          </motion.div>

          <motion.div 
            className="story__stat story__stat--2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="story__stat-num">450+</div>
            <div className="story__stat-label">Tech Architects</div>
          </motion.div>

          <motion.div 
            className="story__stat story__stat--3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="story__stat-num">15+</div>
            <div className="story__stat-label">Core Stacks</div>
          </motion.div>

          <motion.div 
            className="story__stat story__stat--4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="story__stat-num">99%</div>
            <div className="story__stat-label">Success Rate</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
