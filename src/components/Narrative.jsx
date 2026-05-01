import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiClock, FiSettings, FiTrendingDown, FiCheckCircle } from 'react-icons/fi'
import './Narrative.css'

const PAIN_POINTS = [
  {
    icon: <FiSettings />,
    title: 'Technical Debt',
    desc: 'Legacy systems that are impossible to scale or integrate with modern AI.',
  },
  {
    icon: <FiTrendingDown />,
    title: 'Fragmented Workflows',
    desc: "Disconnected IoT hardware and software that don't speak the same language.",
  },
  {
    icon: <FiClock />,
    title: 'Market Lag',
    desc: 'Slow development cycles that turn "first-to-market" ideas into "last-to-launch" regrets.',
  },
]

const STATS = [
  { title: '99.9%', desc: 'Architecture Reliability' },
  { title: '2x', desc: 'Faster Deployment Cycles' },
  { title: '100%', desc: 'End-to-End IoT-to-Cloud Integration' },
]

const WHY_US_LOGIC = [
  {
    title: 'Founder-Driven Mastery',
    desc: 'An award-winning team of developer-innovators who treat software with the precision of physical engineering.',
  },
  {
    title: 'Kerala-Based Stealth HQ',
    desc: 'Global-standard engineering delivered with the agility of a specialized tech agency.',
  },
  {
    title: 'Hardware-to-Software Sovereignty',
    desc: "We don't just write code; we architect entire ecosystems, from the silicon to the cloud.",
  },
]

export default function Narrative() {
  const containerRef = useRef(null)
  
  // Track scroll progress through the entire narrative container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  })

  // Map scroll progress to a background color (White -> Black transition)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.5, 0.8], // Transition starts halfway and ends near the bottom
    ['#ffffff', '#090f38']
  )

  // Map scroll progress to text color for the Why Us section
  const textColor = useTransform(
    scrollYProgress,
    [0.5, 0.8],
    ['#090f38', '#ffffff']
  )

  return (
    <motion.section 
      className="narrative" 
      ref={containerRef}
      style={{ backgroundColor }}
      id="narrative"
    >
      {/* SECTION 1: THE PROBLEM */}
      <div className="narrative__section problem-section container">
        <motion.div 
          className="narrative__label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          THE PROBLEM
        </motion.div>
        
        <motion.h2 
          className="narrative__headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1 }}
        >
          Building for the Future is Hard<br/>When Your Tech is Stuck in the Past.
        </motion.h2>

        <motion.p 
          className="narrative__subheadline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2 }}
        >
          Fragmented stacks and unscalable prototypes are holding your vision back.
        </motion.p>

        <div className="problem-grid">
          {PAIN_POINTS.map((point, i) => (
            <motion.div 
              className="problem-card" 
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="problem-card__icon">{point.icon}</div>
              <h3 className="problem-card__title">{point.title}</h3>
              <p className="problem-card__desc">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 2: THE SOLUTION */}
      <div className="narrative__section solution-section container">
        <div className="solution-header">
          <motion.div 
            className="narrative__label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            THE SOLUTION
          </motion.div>

          <motion.h2 
            className="narrative__headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
          >
            Unified Engineering.<br/>Scalable by Design.
          </motion.h2>
        </div>

        <div className="solution-split">
          <div className="solution-left">
            <div className="solution-stats">
              {STATS.map((stat, i) => (
                <motion.div 
                  className="stat-card" 
                  key={stat.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="stat-card__title">{stat.title}</div>
                  <div className="stat-card__desc">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="solution-right"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="app-mockup">
              <div className="app-mockup__header">
                <div className="app-mockup__dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="app-mockup__title">system_status.dashboard</div>
              </div>
              <div className="app-mockup__body">
                <div className="app-mockup__pulse-container">
                  <motion.div 
                    className="app-mockup__pulse-ring"
                    animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <div className="app-mockup__pulse-core">
                    <FiCheckCircle className="app-mockup__pulse-icon" />
                  </div>
                </div>
                <div className="app-mockup__status-text">
                  Active AI Optimization
                </div>
                <div className="app-mockup__metrics">
                  <div className="metric">
                    <span className="metric-label">CPU</span>
                    <div className="metric-bar"><div className="metric-fill" style={{width: '45%'}}></div></div>
                  </div>
                  <div className="metric">
                    <span className="metric-label">MEM</span>
                    <div className="metric-bar"><div className="metric-fill" style={{width: '62%'}}></div></div>
                  </div>
                  <div className="metric">
                    <span className="metric-label">NET</span>
                    <div className="metric-bar"><div className="metric-fill" style={{width: '28%'}}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 3: WHY US */}
      <motion.div 
        className="narrative__section why-us-section container"
        style={{ color: textColor }}
      >
        <motion.div 
          className="narrative__label narrative__label--dark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          WHY US
        </motion.div>

        <motion.h2 
          className="narrative__headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1 }}
        >
          Award-Winning Innovators.<br/>Are Now Developers.
        </motion.h2>

        <div className="why-us-grid">
          {WHY_US_LOGIC.map((item, i) => (
            <motion.div 
              className="why-us-card" 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <h3 className="why-us-card__title">{item.title}</h3>
              <p className="why-us-card__desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="why-us-cta-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.5 }}
        >
          <a href="/quote" className="why-us-cta">
            Book a Call
          </a>
        </motion.div>

      </motion.div>
    </motion.section>
  )
}
