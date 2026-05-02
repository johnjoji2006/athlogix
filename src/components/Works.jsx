import { motion } from 'framer-motion'
import './Works.css'

const projects = [
  {
    id: 1,
    category: 'Education / Digital Transformation',
    title: 'IQAC SB College',
    description: 'Developing an award-winning academic audit system for streamlined institutional growth.',
    image: '/iqac_dashboard.png',
  },
  {
    id: 2,
    category: 'Developer Tools / Productivity',
    title: 'AthloPrint',
    description: 'Architecting a high-performance local utility to transform complex source code into production-ready documentation.',
    image: '/athloprint_abstract.png',
  }
]

export default function Works() {
  return (
    <div className="works-page">
      <section className="works-hero">
        <div className="container">
          <motion.div 
            className="works-hero__content"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="works-hero__title">Our Work</h1>
            <p className="works-hero__subtitle">Precision engineering. Clean design.</p>
          </motion.div>
        </div>
      </section>

      <section className="works-section">
        <div className="container">
          <motion.div 
            className="works-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className="work-card"
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <div className="work-card__image-wrapper">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="work-card__image"
                  loading="lazy"
                  decoding="async"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <div className="work-card__content">
                <span className="work-card__category">{project.category}</span>
                <h3 className="work-card__title">{project.title}</h3>
                <p className="work-card__description">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </div>
  )
}
