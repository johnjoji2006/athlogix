import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './QuotePage.css'

export default function QuotePage() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  if (submitted) {
    return (
      <div className="quote-page">
        <div className="container quote-page__success">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2>🚀</h2>
            <h1 className="quote-page__title">Proposal <span>Received.</span></h1>
            <p className="quote-page__subtitle" style={{ margin: '0 auto' }}>
              We've received your engineering brief. Our architects will analyze your requirements 
              and get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="quote-page">
      <div className="container">
        <header className="quote-page__header">
          <h1 className="quote-page__title">Tell us about your <span>Vision.</span></h1>
          <p className="quote-page__subtitle">
            Provide the technical details of your project. We'll provide a high-end engineering roadmap 
            and a precise investment estimate.
          </p>
        </header>

        <form className="quote-page__form" onSubmit={handleSubmit}>
          <div className="quote-page__field">
            <label>Full Name</label>
            <input type="text" className="quote-page__input" placeholder="e.g. John Doe" required />
          </div>

          <div className="quote-page__field">
            <label>Email Address</label>
            <input type="email" className="quote-page__input" placeholder="e.g. john@company.com" required />
          </div>

          <div className="quote-page__field">
            <label>Project Type</label>
            <input type="text" className="quote-page__input" placeholder="e.g. AI SaaS, IoT Dashboard, Custom Software" required />
          </div>

          <div className="quote-page__field">
            <label>Estimated Budget</label>
            <input type="text" className="quote-page__input" placeholder="e.g. $10,000 - $25,000" required />
          </div>

          <div className="quote-page__field quote-page__full">
            <label>Project Brief</label>
            <textarea 
              className="quote-page__input" 
              placeholder="Describe your vision, target audience, and key technical requirements..." 
              required
            ></textarea>
          </div>

          <button type="submit" className="quote-page__submit">
            Send Proposal Brief
          </button>
        </form>
      </div>
    </div>
  )
}
