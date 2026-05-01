import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Narrative from './components/Narrative'
import Work from './components/Work'
import About from './components/About'
import Footer from './components/Footer'
import QuotePage from './components/QuotePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />
          <main>
            <Hero />
            <Story />
            <Narrative />
            <Work />
            <About />
          </main>
          <Footer />
        </>
      } />
      <Route path="/quote" element={<QuotePage />} />
    </Routes>
  )
}
