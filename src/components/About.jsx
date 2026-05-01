import { motion } from 'framer-motion'
import './About.css'

const VALUES = [
  { number: '100%', label: 'Code Ownership' },
  { number: '0', label: 'Compromises' },
  { number: '∞', label: 'Innovation Drive' },
  { number: '2', label: 'Founding Minds' },
]

export default function About() {
  return (
    <section className="about" id="about" aria-label="About Athlogix">
      <div className="container">
        <div className="about__grid">
          {/* Left column: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about__label">
              <span className="about__label-line" aria-hidden="true"></span>
              About Us
            </div>
            <h2 className="about__headline">
              Two Minds. One Vision.{' '}
              <em>Zero Compromise.</em>
            </h2>
            <p className="about__body">
              <strong>Athlogix</strong> is a team of developer-innovators based
              in Kerala, dedicated to pushing the boundaries of what is possible
              with code and hardware.
            </p>
            <p className="about__body">
              We believe software should be as <strong>robust as physical
              engineering</strong> — built with precision, tested under pressure,
              and designed to endure. Every product we ship carries this philosophy
              in its architecture.
            </p>
          </motion.div>

          {/* Right column: values grid */}
          <motion.div
            className="about__values"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                className="about__value"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
              >
                <div className="about__value-number">{v.number}</div>
                <div className="about__value-label">{v.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
