import React, { useState } from 'react'
import '../css/Contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'

import Coffee from './Coffee'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <div className="contact--container">
      <div className="title">
        <h1>Contact Us</h1>
        <p style={{color:'#4cb4b4'}}>Any question or remarks? Just write us a message!</p>
      </div>
      <div className="canvas">
        <div className="contact--column left-canvas">
          <div className="contact--intro">
            <h2>Contact Information</h2>
            <p>Say something to start a live chat!</p>
          </div>
          <div className="contact-medium">
            <p> demo@gmail.com</p>
            <p>415 South St, Waltham, MA 02453</p>
            <Coffee />
          </div>
          <div className="contact--row social-icons">
            <a href="https://twitter.com">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://github.com">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://instagram.com">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        <div className="contact--column right-canvas">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact--row">
              <div className="contact--column">
                <input
                  className="contact--input"
                  type="text"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="firstName"
                  value={formData.firstName}
                />
              </div>
              <div className="contact--column">
                <input
                  className="contact--input"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  value={formData.lastName}
                />
              </div>
            </div>
            <div className="contact--row">
              <div className="contact--column">
                <input
                  className="contact--input"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                />
              </div>
              <div className="contact--column">
                <input
                  className="contact--input"
                  type="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  name="phoneNumber"
                  value={formData.phoneNumber}
                />
              </div>
            </div>
            <div className="contact--row">
              <textarea
                className="contact--message"
                value={formData.message}
                placeholder="Message"
                onChange={handleChange}
                name="message"
                style={{ height: '8rem', width: '100%' }}
              />
            </div>
            <div className="contact--row">
              <button className="contact--button">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
