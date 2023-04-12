// console.log("fix conflicts")
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Page, Document, pdfjs } from 'react-pdf'
import { saveAs } from 'file-saver'
import { View as ViewPdf } from '@react-pdf/renderer'
import parse from 'html-react-parser'
import '../css/CoverLetter.css'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry.js'
import { Form, Modal, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import LoginModal from './LoginModal'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

const mapStateToProps = (state) => ({
  profile: state.google.profile,
})
class CoverLetter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitForm: {
        // job information
        companyName: '',
        jobTitle: '',
        jobDescription: '',
        companyLocation: '',
        // user information
        userName: '',
        contactInformation: '',
        workExperience: '',
        Skills: '',
        // other information
        otherRevelantInfo: '',
      },
      date: new Date().toLocaleDateString(),
      generatedCoverLetter: '',
      isLoading: false,
      isShowPDF: false,
      isModalOpen: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleModifyCoverLetter = this.handleModifyCoverLetter.bind(this)
    this.showPDF = this.showPDF.bind(this)
    this.hidePDF = this.hidePDF.bind(this)
    this.handleDownloadPDF = this.handleDownloadPDF.bind(this)
    this.handleGenerateButtonClick = this.handleGenerateButtonClick.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  async componentDidMount() {
    const { profile } = this.props

    if (profile) {
      console.log('this profile', profile)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${profile.googleId}`
        )
        const userData = response.data

        this.setState((prevState) => ({
          submitForm: {
            ...prevState.submitForm,
            userName: userData.name || '',
            contactInformation: userData.contactInfo || '',
            Skills: userData.skills || '',
            workExperience: userData.workExperience || '',
          },
        }))
      } catch (error) {
        console.log('Error fetching user profile:', error)
        console.log('Error detail reason:', error.response)
      }
    }
  }

  async decrementUsageCount() {
    const { profile } = this.props
    console.log('profile', profile)
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/decrementUsageCount`,
        {
          googleId: profile.id,
        }
      )
      console.log(response.data)
    } catch (error) {
      console.error('Error decrementing usage count:', error)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    // Logic to generate the cover letter goes here
    this.setState({ isLoading: true })
    axios
      .post(
        `${process.env.REACT_APP_BECKEND_DJANGO}/api/generateCoverLetter`,
        this.state.submitForm
      )
      .then((response) => {
        let newCoverLetter = ''
        newCoverLetter = response.data.query
        // newCoverLetter = JSON.stringify(response.data.query)
        // let newCoverLetter = response.data.query.replace(/\\n\\n/g, '\n\n'); // Replace \n\n with a single new line
        newCoverLetter += '\n\nDate: ' + this.state.date
        console.log(newCoverLetter)
        this.setState({
          generatedCoverLetter: newCoverLetter,
          isLoading: false,
        })
        this.decrementUsageCount()
      })
      .catch((error) => {
        console.log('Error posting data to generate cover letter: ', error)
        console.log('Error detail: ', error.response)
        this.setState({ isLoading: false })
      })
  }

  handleGenerateButtonClick = (e) => {
    console.log('clicked')
    const { profile } = this.props

    console.log('profile', profile)
    if (!profile) {
      e.preventDefault()
      this.setState({ isModalOpen: true }) // Open the modal
      console.log(this.isModalOpen)
    } else {
      this.handleSubmit(e)
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target
    this.setState((prevState) => ({
      submitForm: {
        ...prevState.submitForm,
        [name]: value,
      },
    }))
    console.log('Data has been changed. Now it is:')
    console.log(this.state.submitForm)
  }

  handleModifyCoverLetter(e) {
    const { name, value } = e.target
    this.setState({ generatedCoverLetter: value })

    console.log('Cover letter has been changed. Now it is:\n')
    console.log(this.state.generatedCoverLetter)
    console.log(value)
  }

  handleLogin = () => {
    this.setState({ isModalOpen: false })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  hidePDF() {
    this.setState({ isShowPDF: false })
  }

  showPDF() {
    this.setState({ isShowPDF: true })
  }

  handleDownloadPDF = () => {
    // const { generatedCoverLetter } = this.state;
    // if (!generatedCoverLetter) {
    //   console.error("generatedCoverLetter is empty");
    //   return;
    // }
    // const doc = (
    //   <Document>
    //     <Page size="A4">
    //       <ViewPdf>
    //         {parse(generatedCoverLetter)}
    //       </ViewPdf>
    //     </Page>
    //   </Document>
    // );
    // const asPdf = pdfjs.getDocument({ data: generatedCoverLetter });
    // asPdf.updateContainer(doc);
    // const blob = asPdf.toBlob();
    // saveAs(blob, 'cover_letter.pdf');
  }

  render() {
    // const { submitForm, date, generatedCoverLetter } = this.state;
    const { submitForm, date, generatedCoverLetter } = this.state
    console.log('generatedCoverLetter', generatedCoverLetter)

    return (
      <div className="cl--container">
        <div className="cl--column cl-input" id="User information">
          <h2 className="column-title ">
            <span className="stepNum">1. </span>
            Write Your Information
          </h2>
          <Form onSubmit={this.handleSubmit}>
            <h3 className="info-title">Personal Information</h3>
            <div className="info-row">
              <Form.Group controlId="user-name" className="col-md-5">
                <Form.Label className="input-lable">
                  Your Name
                  <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={submitForm.userName}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="contact-information" className="col-md-6">
                <Form.Label className="input-lable">
                  Contact Information
                  <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="contactInformation"
                  placeholder="Email or Phone Number"
                  value={submitForm.contactInformation}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <Form.Group controlId="Skills">
              <Form.Label className="input-lable">
                Skills
                <span className="required-asterisk">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="Skills"
                value={submitForm.Skills}
                onChange={this.handleInputChange}
                required
                style={{ height: '5rem' }}
              />
            </Form.Group>
            <Form.Group controlId="work-experience">
              <Form.Label className="input-lable">
                Work Experience
                <span className="required-asterisk">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="workExperience"
                value={submitForm.workExperience}
                onChange={this.handleInputChange}
                required
                style={{ height: '10rem' }}
              />
            </Form.Group>
            <br />
            <br />
            <h3 className="info-title">Job Information</h3>
            <Form.Group controlId="company-name">
              <Form.Label className="input-lable">
                Company Name
                <span className="required-asterisk">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={submitForm.companyName}
                onChange={this.handleInputChange}
                required
              />
            </Form.Group>
            <div className="info-row">
              <Form.Group controlId="job-title" className="col-md-6">
                <Form.Label className="input-lable">
                  Job Title
                  <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="jobTitle"
                  value={submitForm.jobTitle}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="company-location" className="col-md-5">
                <Form.Label className="input-lable">
                  Company Location
                  <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="companyLocation"
                  value={submitForm.companyLocation}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
            </div>

            <Form.Group controlId="job-description">
              <Form.Label className="input-lable">
                Job Description
                <span className="required-asterisk">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="jobDescription"
                value={submitForm.jobDescription}
                onChange={this.handleInputChange}
                required
                style={{ height: '8rem' }}
              />
            </Form.Group>
            <br />
            <br />

            <h3 className="info-title">Other Information</h3>
            <Form.Group controlId="otherRevelantInfo">
              <Form.Label className="input-lable">
                Other Revelant Information
              </Form.Label>
              <Form.Control
                as="textarea"
                name="otherRevelantInfo"
                value={submitForm.otherRevelantInfo}
                onChange={this.handleInputChange}
                style={{ height: '8rem' }}
              />
            </Form.Group>
          </Form>
          <button
            type="submit"
            onClick={this.handleGenerateButtonClick}
            className="cl--button center-button "
          >
            Generate Cover Letter
          </button>
        </div>

        <div className="cl--column cl-check" id="Generated cover letter">
          <h2 className="column-title">
            <span className="stepNum">2. </span>
            Revise & Modify
          </h2>
          <Form className="cl-preview">
            <Form.Group controlId="generatedCoverLetter">
              <Form.Label className="input-lable cl-check-label">
                Check Your Cover Letter
              </Form.Label>
              {this.state.isLoading ? (
                <Spinner
                  className="loading-spinner"
                  animation="border"
                  role="status"
                  style={{ margin: '0 10px' }}
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : null}
              <Form.Control
                className="cl-check-input"
                as="textarea"
                name="generatedCoverLetter"
                value={generatedCoverLetter}
                onChange={this.handleModifyCoverLetter}
                required
                style={{ height: '71rem' }}
              />
            </Form.Group>
            <button className="cl--button center-button" onClick={this.showPDF}>
              PDF Preview & Download
            </button>
            <Modal
              show={this.state.isShowPDF}
              onHide={this.hidePDF}
              dialogClassName="pdf-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Preview & Download</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {generatedCoverLetter ? (
                  <div className="cover-letter-container">
                    {/* <Document file={{ data: new Blob([generatedCoverLetter], { type: 'text/plain' }) }}>
                          <Page size="A4">
                            <ViewPdf style={{ width: '100%', height: '100vh'}}>
                              {parse(generatedCoverLetter)}
                            </ViewPdf>
                          </Page>
                        </Document> */}
                    <p>{generatedCoverLetter}</p>
                    <button
                      className="cl--button center-button"
                      onClick={this.handleDownloadPDF}
                    >
                      Download
                    </button>
                  </div>
                ) : (
                  <p>No PDF file specified</p>
                )}
              </Modal.Body>
            </Modal>
          </Form>
        </div>
        <LoginModal
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
          onLogin={this.handleLogin}
        />
      </div>
    )
  }
}

// export default CoverLetter

export default connect(mapStateToProps)(CoverLetter)
