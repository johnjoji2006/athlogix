import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './AboutPage.css'

const VALUES = [
  { number: '100%', label: 'Code Ownership' },
  { number: '0', label: 'Compromises' },
  { number: '∞', label: 'Innovation Drive' },
  { number: '2', label: 'Founding Minds' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="about-page">
      {/* Page Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__content">
            <motion.h1 
              className="about-hero__title"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              The Minds Behind Athlogix
            </motion.h1>
            <motion.p 
              className="about-hero__subtitle"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Two Minds. One Vision. Zero Compromise.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Original Content Section */}
      <section className="about-details">
        <div className="container">
          <div className="about-details__grid">
            <motion.div
              className="about-details__text"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="about-details__body">
                <strong>Athlogix</strong> is a team of developer-innovators dedicated to pushing the boundaries of what is possible with code and hardware.
              </p>
              <p className="about-details__body">
                We believe software should be as <strong>robust as physical engineering</strong> — built with precision, tested under pressure, and designed to endure. Every product we ship carries this philosophy in its architecture.
              </p>
              <p className="about-details__body">
                Our approach is deeply rooted in performance and scalability. We don't just write code; we architect ecosystems that thrive in complex environments.
              </p>
            </motion.div>

            <div className="about-details__values">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.label}
                  className="about-details__value-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="about-details__value-number">{v.number}</div>
                  <div className="about-details__value-label">{v.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
