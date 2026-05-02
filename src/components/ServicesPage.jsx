import { motion } from 'framer-motion'
import { servicesData } from '../data/servicesData'
import './ServicesPage.css'

export default function ServicesPage() {
  return (
    <div className="services-page">
      <div className="services-page__container">
        {servicesData.map((category, index) => (
          <section key={category.id} className="services-page__section">
            
            {/* Left/Right Text Content */}
            <motion.div 
              className="services-page__content"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="services-page__title">
                {category.title}
              </h2>
              <ul className="services-page__list">
                {category.items.map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="services-page__item"
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Alternating Visual Placeholder */}
            <motion.div 
              className="services-page__visual"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="services-page__placeholder">
                <span className="services-page__placeholder-text">
                  {category.title} Visual
                </span>
              </div>
            </motion.div>

          </section>
        ))}
      </div>
    </div>
  )
}
