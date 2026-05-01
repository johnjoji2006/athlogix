import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'Services', href: '#narrative' },
  { label: 'Works', href: '#work' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    
    if (location.pathname !== '/') {
      navigate('/')
      // Small delay to allow home to mount before scrolling
      setTimeout(() => {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--solid' : 'navbar--transparent'}`}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-text" style={{ fontFamily: 'var(--font-logo)' }}>
            Athlogix
          </span>
        </Link>

        <ul className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="navbar__link"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="navbar__cta"
              onClick={() => navigate('/quote')}
            >
              Contact
            </button>
          </li>
        </ul>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              className="navbar__mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Side Drawer */}
            <motion.div
              className="navbar__mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="navbar__mobile-inner">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="navbar__mobile-link"
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.button
                  className="navbar__mobile-cta"
                  onClick={() => navigate('/quote')}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Contact
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
