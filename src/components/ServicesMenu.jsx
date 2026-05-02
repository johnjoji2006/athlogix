import { motion } from 'framer-motion'
import { servicesData } from '../data/servicesData'
import './ServicesMenu.css'

export default function ServicesMenu() {
  return (
    <motion.div 
      className="services-menu"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="services-menu__bg-glow"></div>
      <div className="services-menu__container">
        
        {/* Left Side: Headline */}
        <div className="services-menu__left">
          <h2 className="services-menu__headline">
            Building Strong Capabilities to Empower Your Brand
          </h2>
          <a href="/services" className="services-menu__link group">
            Go to overview 
            <span className="services-menu__link-arrow">→</span>
          </a>
        </div>

        {/* Right Side: 3 Columns */}
        <div className="services-menu__right">
          
          {/* Column 1: Branding & Experience Design stacked */}
          <div className="services-menu__col">
            <div className="services-menu__category">
              <h3 className="services-menu__category-title group cursor-pointer">
                Branding <span className="services-menu__link-arrow">→</span>
              </h3>
              <ul className="services-menu__list">
                {servicesData.find(s => s.id === 'branding').items.map(item => (
                  <li key={item} className="services-menu__item">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="services-menu__category">
              <h3 className="services-menu__category-title group cursor-pointer">
                Experience Design <span className="services-menu__link-arrow">→</span>
              </h3>
              <ul className="services-menu__list">
                {servicesData.find(s => s.id === 'experience-design').items.map(item => (
                  <li key={item} className="services-menu__item">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Technology */}
          <div className="services-menu__col">
            <div className="services-menu__category">
              <h3 className="services-menu__category-title group cursor-pointer">
                Technology <span className="services-menu__link-arrow">→</span>
              </h3>
              <ul className="services-menu__list">
                {servicesData.find(s => s.id === 'technology').items.map(item => (
                  <li key={item} className="services-menu__item">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Digital Marketing */}
          <div className="services-menu__col">
            <div className="services-menu__category">
              <h3 className="services-menu__category-title group cursor-pointer">
                Digital Marketing <span className="services-menu__link-arrow">→</span>
              </h3>
              <ul className="services-menu__list">
                {servicesData.find(s => s.id === 'digital-marketing').items.map(item => (
                  <li key={item} className="services-menu__item">{item}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
