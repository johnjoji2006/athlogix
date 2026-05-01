import { motion } from 'framer-motion'
import {
  HiCode,
  HiLightningBolt,
  HiChip,
  HiMap,
  HiRefresh,
  HiColorSwatch,
} from 'react-icons/hi'
import './Services.css'

const SERVICES = [
  {
    icon: <HiCode />,
    title: 'Full-Stack Development',
    desc: 'Scalable React and Next.js architectures built for speed and SEO. From API design to pixel-perfect frontends.',
  },
  {
    icon: <HiLightningBolt />,
    title: 'AI & Intelligent Automation',
    desc: 'Integrating LLMs and custom AI agents into existing workflows to supercharge productivity and decision-making.',
  },
  {
    icon: <HiChip />,
    title: 'IoT & Hardware Systems',
    desc: 'End-to-end hardware-to-software integration for smart monitoring, control systems, and edge computing.',
  },
  {
    icon: <HiMap />,
    title: 'Product Strategy',
    desc: 'Data-driven roadmaps to take your idea from a prototype to a polished MVP with market-validated features.',
  },
  {
    icon: <HiRefresh />,
    title: 'Digital Transformation',
    desc: 'Modernizing legacy systems with QR-based management, cloud-native architecture, and automated pipelines.',
  },
  {
    icon: <HiColorSwatch />,
    title: 'UI/UX Design',
    desc: 'High-fidelity interfaces designed in Figma and executed with precision. Accessibility-first, brand-aligned.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Services() {
  return (
    <section className="services" id="services" aria-label="Our services">
      <div className="container">
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="services__label">
            <span className="services__label-line" aria-hidden="true"></span>
            What We Engineer
            <span className="services__label-line" aria-hidden="true"></span>
          </div>
          <h2 className="services__title">
            Solutions Engineered for Impact
          </h2>
          <p className="services__subtitle">
            From concept to deployment, we deliver end-to-end digital solutions
            that drive measurable business outcomes.
          </p>
        </motion.div>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              className="services__card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <div className="services__card-icon" aria-hidden="true">
                {service.icon}
              </div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
