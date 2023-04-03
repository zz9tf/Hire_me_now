import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import LoginModal from './LoginModal'
import '../css/CoverLetter.css'

function CoverLetter() {
  const profile = useSelector((state) => state.google.profile)

  const [formValues, setFormValues] = useState({
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    companyLocation: '',
  })

  const [date, setDate] = useState(new Date().toLocaleDateString())

  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logic to generate the cover letter goes here
    const newCoverLetter = '...' // Generated cover letter content
    setGeneratedCoverLetter(newCoverLetter)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGenerateButtonClick = (e) => {
    console.log('clicked')
    if (!profile) {
      e.preventDefault()
      setIsModalOpen(true) // Open the modal
    } else {
      handleSubmit(e)
    }
  }

  const handleLogin = () => {
    setIsModalOpen(false)
  }


  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  return (
    <div className="cl--container">
      <div className="cl--column">
        <form className="cl-form" onSubmit={(e) => e.preventDefault()}>
          <div className="cl--form-group">
            <label htmlFor="company-name">Company Name</label>
            <input
              type="text"
              id="company-name"
              name="companyName"
              value={formValues.companyName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="cl--form-group">
            <label htmlFor="job-title">Job Title</label>
            <input
              type="text"
              id="job-title"
              name="jobTitle"
              value={formValues.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="cl--form-group">
            <label htmlFor="company-location">Company Location</label>
            <input
              type="text"
              id="company-location"
              name="companyLocation"
              value={formValues.companyLocation}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="cl--form-group">
            <label htmlFor="job-description">Job Description</label>
            <textarea
              id="job-description"
              name="jobDescription"
              value={formValues.jobDescription}
              onChange={handleInputChange}
              required
              overflow="scroll"
              style={{ height: '8rem' }}
            />
          </div>
        </form>
        <button
          className="cl--button"
          onClick={handleGenerateButtonClick}
          // disabled={!profile}
        >
          Generate Cover Letter
        </button>
      </div>
      <div className="cl--column">
        <div className="cl-preview">
          <h2 className="cl-title">Cover Letter Preview</h2>
          <div className="cover-letter-container">{generatedCoverLetter}</div>
        </div>

        <button className="cl--button">Regenerate?</button>
        <button className="cl--button">Download PDF</button>
      </div>
      <LoginModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default CoverLetter
