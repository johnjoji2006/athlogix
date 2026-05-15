import { Suspense, lazy, useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HeroSequence from './components/HeroSequence'
import Story from './components/Story'
import ServicesHome from './components/ServicesHome'
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

const HomeView = () => {
  const navigate = useNavigate();
  const [showFixedCta, setShowFixedCta] = useState(true);
  const narrativeRef = useRef(null);

  useEffect(() => {
    if (!narrativeRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setShowFixedCta(false);
      } else {
        if (entry.boundingClientRect.top > 0) {
          setShowFixedCta(true);
        } else {
          setShowFixedCta(false);
        }
      }
    }, { threshold: 0.1 });
    observer.observe(narrativeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <button 
        className={`global-fixed-cta ${showFixedCta ? 'global-fixed-cta--visible' : ''}`}
        onClick={() => navigate('/quote')}
      >
        Enquire Now
      </button>
      <HeroSequence />
      <Story />
      <ServicesHome />
      <div ref={narrativeRef}>
        <Narrative />
      </div>
      <AboutHome />
    </main>
  );
};

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomeView />} />
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

