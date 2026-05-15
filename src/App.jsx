import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HeroSequence from './components/HeroSequence'
import Story from './components/Story'
import Narrative from './components/Narrative'
import AboutHome from './components/AboutHome'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const Works = lazy(() => import('./components/Works'))
const AboutPage = lazy(() => import('./components/AboutPage'))
const ServicesPage = lazy(() => import('./components/ServicesPage'))
const QuotePage = lazy(() => import('./components/QuotePage'))

const PageLoader = () => (
  <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#090f38' }}>
    <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#4f6ef7', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
)

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={
            <main>
              <HeroSequence />
              <Hero />
              <Story />
              <Narrative />
              <AboutHome />
            </main>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/works" element={<Works />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

