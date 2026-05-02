import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import './AboutHome.css'

const CHECKLIST = [
  'Custom Architectures',
  'Scalable AI Models',
  'IoT Integration'
]

export default function AboutHome() {
  return (
    <section className="about-home" id="about-home">
      <div className="container">
        <div className="about-home__grid">
          
          {/* Left Column - The Question */}
          <motion.div 
            className="about-home__left"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="about-home__headline">
              Want to build modern software solutions??
            </h2>
            <ul className="about-home__checklist">
              {CHECKLIST.map((item) => (
                <li key={item} className="about-home__check-item">
                  <span className="about-home__bullet" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Quick Starts */}
          <motion.div 
            className="about-home__right"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="about-home__block">
              <h3 className="about-home__block-title">Ready to start?</h3>
              <p className="about-home__block-text">
                Transform your ambitious concept into a market-leading product with our award-winning engineering team.
              </p>
              <Link to="/quote" className="about-home__link">
                Start Now <HiArrowRight />
              </Link>
            </div>

            <div className="about-home__block">
              <h3 className="about-home__block-title">Our Philosophy.</h3>
              <p className="about-home__block-text">
                We believe software should be as robust as physical engineering. High-performance code is our baseline.
              </p>
              <Link to="/about" className="about-home__link">
                Read our full story <HiArrowRight />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
