import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ParticleCanvas from './ParticleCanvas'
import { HiArrowRight } from 'react-icons/hi'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function Hero() {
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  
  // Immersive background effects
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.1])
  const bgOpacity = useTransform(scrollY, [0, 800], [1, 0.3])
  const y = useTransform(scrollY, [0, 600], [0, -100])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      <motion.div 
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="hero__bg-wrapper"
      >
        <ParticleCanvas />
      </motion.div>
      <motion.div 
        className="container hero__content"
        style={{ y, opacity }}
      >
        <motion.div
          className="hero__badge"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="hero__badge-dot" aria-hidden="true"></span>
        </motion.div>

        <motion.h1
          className="hero__headline"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Engineering Digital{' '}
          <span className="hero__headline-accent">Excellence</span> at the
          Speed of Thought.
        </motion.h1>

        <motion.p
          className="hero__subheadline"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          We architect high-performance Web, AI, IoT, and Software Development
          solutions that transform ambitious concepts into market-leading
          digital products.
        </motion.p>

        <motion.div
          className="hero__ctas"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <a href="#work" className="hero__cta-outline">
            View Our Projects
            <HiArrowRight aria-hidden="true" />
          </a>
          <button className="hero__cta-primary" onClick={() => navigate('/quote')}>
            Book a Strategy Call
            <HiArrowRight aria-hidden="true" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
