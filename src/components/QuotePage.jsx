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
            <input type="text" id="fullName" className="quote-page__input" placeholder=" " required />
            <label htmlFor="fullName" className="quote-page__label">Full Name</label>
          </div>

          <div className="quote-page__field">
            <input type="email" id="email" className="quote-page__input" placeholder=" " required />
            <label htmlFor="email" className="quote-page__label">Email Address</label>
          </div>

          <div className="quote-page__field">
            <input type="tel" id="mobile" className="quote-page__input" placeholder=" " />
            <label htmlFor="mobile" className="quote-page__label">
              Mobile Number <span className="quote-page__optional">(Optional)</span>
            </label>
          </div>

          <div className="quote-page__field">
            <input type="text" id="projectType" className="quote-page__input" placeholder=" " required />
            <label htmlFor="projectType" className="quote-page__label">Project Type</label>
          </div>

          <div className="quote-page__field">
            <div className="quote-page__input-wrapper">
              <input type="text" id="budget" className="quote-page__input" placeholder=" " required />
              <span className="quote-page__prefix">₹</span>
              <label htmlFor="budget" className="quote-page__label">Estimated Budget</label>
            </div>
          </div>

          <div className="quote-page__field quote-page__full">
            <textarea 
              id="projectBrief"
              className="quote-page__input" 
              placeholder=" " 
              required
            ></textarea>
            <label htmlFor="projectBrief" className="quote-page__label">Project Brief</label>
          </div>

          <button type="submit" className="quote-page__submit">
            Send Proposal Brief
          </button>
        </form>
      </div>
    </div>
  )
}
