import { motion } from 'framer-motion'
import './Work.css'

export default function Work() {
  return (
    <section className="work" id="work" aria-label="Our work">
      <div className="container">
        <motion.div
          className="work__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="work__label">Selected Work</div>
          <h2 className="work__title">Projects that define us.</h2>
        </motion.div>

        <div className="work__grid">
          <motion.article
            className="work__card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="work__image-box">
              IQAC Website
            </div>
            <div className="work__content">
              <h3 className="work__card-title">IQAC Management Portal</h3>
              <p className="work__card-desc">
                A high-performance management system built for institutional quality assurance. 
                Featuring automated data collection, real-time analytics, and streamlined documentation workflows.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
