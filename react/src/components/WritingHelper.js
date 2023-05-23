import React, { useState } from 'react'
import '../css/CoverLetter.css'
function WritingHelper() {
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
        <form className="cl-form" onSubmit={handleSubmit}>

          <div className="cl--form-group">
            <label htmlFor="job-description">Write here </label>
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
          <button className="cl--button">Generate Cover Letter</button>
        </form>
      </div>
      <div className="cl--column">
        <div className="cl-preview">

          <div className="cover-letter-container">{generatedCoverLetter}</div>
        </div>

        <button className="cl--button">Regenerate?</button>
        <button className="cl--button">Download PDF</button>
      </div>
    </div>
  )
}

export default WritingHelper