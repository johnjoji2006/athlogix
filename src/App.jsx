import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Narrative from './components/Narrative'
import AboutHome from './components/AboutHome'
import AboutPage from './components/AboutPage'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import QuotePage from './components/QuotePage'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <main>
              <Hero />
              <Story />
              <Narrative />
              <AboutHome />
            </main>
            <Footer />
          </>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/quote" element={<QuotePage />} />
      </Routes>
    </>
  )
}
