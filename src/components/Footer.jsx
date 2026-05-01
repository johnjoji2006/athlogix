import { motion } from 'framer-motion'
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaFacebookF,
} from 'react-icons/fa6'
import { HiLocationMarker } from 'react-icons/hi'
import './Footer.css'

const SOCIALS = [
  { icon: <FaLinkedinIn />, label: 'LinkedIn', href: '#' },
  { icon: <FaInstagram />, label: 'Instagram', href: '#' },
  { icon: <FaXTwitter />, label: 'X', href: '#' },
  { icon: <FaYoutube />, label: 'YouTube', href: '#' },
  { icon: <FaFacebookF />, label: 'Facebook', href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer" id="footer" aria-label="Site footer">
      <div className="container">
        <motion.div
          className="footer__grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand Column */}
          <div>
            <div className="footer__brand-logo">
              <span className="footer__brand-name" style={{ fontFamily: 'var(--font-logo)', fontSize: '26px' }}>
                Athlogix
              </span>
            </div>
            <p className="footer__tagline">
              Engineering the Future. We architect high-performance digital
              solutions that transform ambitious concepts into market-leading
              products.
            </p>
            <div className="footer__socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer__social-link"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="footer__col-title">Services</h3>
            <div className="footer__col-links">
              <a href="#services" className="footer__col-link">Full-Stack Development</a>
              <a href="#services" className="footer__col-link">AI & Automation</a>
              <a href="#services" className="footer__col-link">IoT Systems</a>
              <a href="#work" className="footer__col-link">Case Studies</a>
              <a href="#services" className="footer__col-link">UI/UX Design</a>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="footer__col-title">Contact</h3>
            <div className="footer__col-links">
              <a href="mailto:info@athlogix.in" className="footer__col-link">
                info@athlogix.in
              </a>
              <span className="footer__col-link" style={{ cursor: 'default' }}>
                Based in Kerala, India
              </span>
              <span className="footer__col-link" style={{ cursor: 'default' }}>
                Stealth HQ
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 Athlogix. All rights reserved.
          </span>
          <span className="footer__location">
            <HiLocationMarker aria-hidden="true" />
            Kerala, India
          </span>
        </div>
      </div>
    </footer>
  )
}
