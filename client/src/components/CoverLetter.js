import React, { Component } from 'react';
import axios from 'axios'
import { Form } from 'react-bootstrap';
import parse from 'html-react-parser';
import '../css/CoverLetter.css';

class CoverLetter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitForm: {
                companyName: '',
                jobTitle: '',
                jobDescription: '',
                companyLocation: '',
            },
            date: new Date().toLocaleDateString(),
            generatedCoverLetter: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleModifyCoverLetter = this.handleModifyCoverLetter.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      // Logic to generate the cover letter goes here
      
      axios
        .post(`${process.env.REACT_APP_BECKEND_DJANGO}/api/generateCoverLetter`, this.state.submitForm)
        .then((response) => {
          let newCoverLetter = '';
          newCoverLetter = JSON.stringify(response.data.query)
          console.log(newCoverLetter);
          this.setState({ generatedCoverLetter: newCoverLetter });
        })
        .catch((error) => {
          console.log('Error posting data to generate cover letter: ', error);
          console.log('Error detail: ', error.response);
        })
    }

    handleInputChange(e) {
      const { name, value } = e.target;
      this.setState((prevState) => ({
        submitForm: {
          ...prevState.submitForm,
          [name]: value,
        }
      }))
      console.log('Data has been changed. Now it is:');
      console.log(this.state.submitForm);
    }

    handleModifyCoverLetter(e) {
      const { name, value } = e.target;
      this.setState({ generatedCoverLetter : value })
      console.log('Cover letter has been changed. Now it is:\n');
      console.log(this.state.generatedCoverLetter);
    }

    render() {
        const { submitForm, date, generatedCoverLetter } = this.state;

        return (
          <div className="cl--container">
            <div className="cl--column" id='User information'>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="company-name">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={submitForm.companyName}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>
      
                <Form.Group controlId="job-title">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobTitle"
                    value={submitForm.jobTitle}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>
      
                <Form.Group controlId="company-location">
                  <Form.Label>Company Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyLocation"
                    value={submitForm.companyLocation}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>
      
                <Form.Group controlId="job-description">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="jobDescription"
                    value={submitForm.jobDescription}
                    onChange={this.handleInputChange}
                    required
                    style={{ height: '8rem' }}
                  />
                </Form.Group>
                <button className="cl--button">Generate Cover Letter</button>
              </Form>
            </div>
            
            <div className='cl--column' id='Generated cover letter'>
              <Form className="cl-preview">
                <Form.Group controlId="generatedCoverLetter">
                  <h2><Form.Label className='cl-title'>Cover Letter Content</Form.Label></h2>
                  <Form.Control
                    type="text"
                    name="generatedCoverLetter"
                    value={generatedCoverLetter}
                    onChange={this.handleModifyCoverLetter}
                    required
                  />
                </Form.Group>
              </Form>
            </div>

            <div className="cl--column">
              <div className="cl-preview">
                <h2 className="cl-title">Cover Letter Content</h2>
                <div className="cover-letter-container">{parse(generatedCoverLetter)}</div>
              </div>
      
              <button className="cl--button">Regenerate?</button>
              <button className="cl--button">Preview</button>
            </div>
          </div>
        )
    } 
}

export default CoverLetter;