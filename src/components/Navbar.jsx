import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { HiX, HiMenuAlt3 } from 'react-icons/hi'
import './Navbar.css'
import ServicesMenu from './ServicesMenu'

const NAV_ITEMS = [
  { label: 'Services', href: '/services', isInternal: true },
  { label: 'Works', href: '/works', isInternal: true },
  { label: 'About', href: '/about', isInternal: true },
]

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesHovered, setServicesHovered] = useState(false)
  const timeoutRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setServicesHovered(false)
  }, [location])

  const handleNavClick = useCallback((e) => {
    e.preventDefault()
    setMobileOpen(false)
  }, [])

  const handleLogoClick = useCallback((e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname])

  const openServices = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setServicesHovered(true)
  }, [])

  const closeServices = useCallback((delay = 100) => {
    timeoutRef.current = setTimeout(() => {
      setServicesHovered(false)
    }, delay)
  }, [])

  return (
    <nav
      className={`navbar ${scrolled || location.pathname !== '/' || servicesHovered ? 'navbar--solid' : 'navbar--transparent'}`}
    >
      <div className="navbar__inner">
        <Link 
          to="/" 
          className="navbar__logo" 
          onClick={handleLogoClick}
          onMouseEnter={() => setServicesHovered(false)}
        >
          <span className="navbar__logo-text" style={{ fontFamily: 'var(--font-logo)' }}>
            Athlogix
          </span>
        </Link>

        <ul className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <li 
              key={item.label}
              onMouseEnter={() => {
                if (item.label === 'Services') {
                  openServices()
                } else {
                  setServicesHovered(false)
                }
              }}
              onMouseLeave={() => {
                if (item.label === 'Services') {
                  closeServices()
                }
              }}
            >
              {item.isInternal ? (
                <Link to={item.href} className="navbar__link">
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="navbar__link"
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
          <li>
            <button
              className="navbar__cta"
              onClick={() => navigate('/quote')}
              onMouseEnter={() => setServicesHovered(false)}
            >
              Contact
            </button>
          </li>
        </ul>

      <AnimatePresence>
        {servicesHovered && (
          <div 
            style={{ position: 'absolute', top: '100%', left: 0, width: '100%' }}
            onMouseEnter={openServices}
            onMouseLeave={() => closeServices(0)}
          >
            <ServicesMenu />
          </div>
        )}
      </AnimatePresence>



        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiX className="navbar__hamburger-icon navbar__hamburger-icon--close" /> : <HiMenuAlt3 className="navbar__hamburger-icon" />}
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
                  item.isInternal ? (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.1 }}
                    >
                      <Link to={item.href} className="navbar__mobile-link">
                        {item.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="navbar__mobile-link"
                      onClick={handleNavClick}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.1 }}
                    >
                      {item.label}
                    </motion.a>
                  )
                ))}
                <motion.div
                  className="navbar__mobile-cta-wrapper"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    className="navbar__mobile-cta"
                    onClick={() => navigate('/quote')}
                  >
                    Contact
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  )
})

export default Navbar
