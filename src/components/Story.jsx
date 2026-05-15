import { useRef, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, MeshDistortMaterial, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import Gears from './Gears'
import './Story.css'

export default function Story() {
  const navigate = useNavigate()
  return (
    <div className="story-wrapper">
      <section className="story" id="about">
        <div className="container story__grid">
          <motion.div 
            className="story__content"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }} shadows>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" castShadow />
              <directionalLight position={[-10, -10, -5]} intensity={1} color="#4f6ef7" />
              <spotLight position={[0, 10, 0]} intensity={1.5} penumbra={1} color="#4f6ef7" />
              <Suspense fallback={null}>
                <Environment resolution={256}>
                  <group rotation={[-Math.PI / 4, -0.3, 0]}>
                    <Lightformer type="ring" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <Lightformer type="rect" intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 2, 1]} />
                    <Lightformer type="rect" intensity={2} rotation-y={Math.PI / 2} position={[5, -1, -1]} scale={[20, 2, 1]} />
                  </group>
                </Environment>
                <Gears />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            </Canvas>

            {/* Floating Stats - More labels as requested */}
            <motion.div 
              className="story__stat story__stat--1"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.3 }}
            >
              <div className="story__stat-num">600+</div>
              <div className="story__stat-label">Global Partners</div>
            </motion.div>

            <motion.div 
              className="story__stat story__stat--2"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.5 }}
            >
              <div className="story__stat-num">450+</div>
              <div className="story__stat-label">Tech Architects</div>
            </motion.div>

            <motion.div 
              className="story__stat story__stat--3"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.7 }}
            >
              <div className="story__stat-num">15+</div>
              <div className="story__stat-label">Core Stacks</div>
            </motion.div>

            <motion.div 
              className="story__stat story__stat--4"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.9 }}
            >
              <div className="story__stat-num">99%</div>
              <div className="story__stat-label">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
