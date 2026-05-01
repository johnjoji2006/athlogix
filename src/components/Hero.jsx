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
  
  // Fade in the bottom transition as we scroll (from 0 to 300px)
  const transitionOpacity = useTransform(scrollY, [0, 300], [0, 1])

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      <ParticleCanvas />

      {/* Dynamic bottom transition - only visible after scroll */}
      <motion.div 
        className="hero__transition"
        style={{ opacity: transitionOpacity }}
      />

      <div className="container hero__content">
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
      </div>
    </section>
  )
}
