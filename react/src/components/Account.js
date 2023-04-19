import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, Button, Form } from 'reactstrap'
import ProductDisplay from './ProductDisplay'
import '../css/Account.css'
import axios from 'axios'

function Account() {
  const user = useSelector((state) => state.google.profile)

  const [name, setName] = useState(user?.name || '')
  const [contactInfo, setContactInfo] = useState(user?.contactInfo || '')
  const [address, setAddress] = useState(user?.address || '')
  const [skills, setSkills] = useState(user?.skills || '')
  const [workExperience, setWorkExperience] = useState(
    user?.workExperience || ''
  )
  const [isEditing, setIsEditing] = useState(false) // New state variable

  const handleEdit = () => {
    setIsEditing(true)
  }
  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        console.log("Account user:\n" + JSON.stringify(user));
        var response;
        if (user.usingDatabase == true){
          response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${user.googleId}`)
        } else {
          response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${user.id}`)
        }
        const fetchedUser = response.data
        setName(fetchedUser.name)
        setContactInfo(fetchedUser.contactInfo)
        setAddress(fetchedUser.address)
        setSkills(fetchedUser.skills)
        setWorkExperience(fetchedUser.workExperience)
      } catch (error) {
        console.error(error)
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/user/update/${user.googleId}`, {
        name,
        contactInfo,
        skills,
        address,
        workExperience,
      })
      setIsEditing(false) // Set isEditing to false after submitting the form
      alert('Information updated successfully')
    } catch (error) {
      alert('Error updating information')
      console.error(error)
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', padding: '1rem' }}>
        <Card className="info-card" style={{ padding: '2rem' }}>
          <h3>Personal Information</h3>
          {isEditing ? (
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contactInfo" className="form-label">
                  Contact Information
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="contactInfo"
                  name="contactInfo"
                  value={contactInfo}
                  placeholder="Email or Phone Number"
                  onChange={(e) => setContactInfo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="skills" className="form-label">
                  Skills
                </label>
                <input
                  type="skills"
                  className="form-control"
                  id="skills"
                  name="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="workExperience" className="form-label">
                  Work Experience
                </label>
                <textarea
                  className="form-control"
                  id="workExperience"
                  name="workExperience"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  required
                  style={{ resize: 'vertical', height: '200px' }}
                />
              </div>

              <Button type="submit">Save</Button>
            </Form>
          ) : (
            <>
              <div className="mb-3">
                <div>{name}</div>
              </div>
              <div className="mb-3">
                <div>{contactInfo}</div>
              </div>

              <div className="mb-3">
                <div>{address}</div>
              </div>
              <div className="mb-3">
                <div>{skills}</div>
              </div>
              <div className="mb-3">
                <div>{workExperience}</div>
              </div>
              <Button onClick={handleEdit}>Edit</Button>
            </>
          )}
        </Card>
      </div>
      <div style={{ width: '500px', backgroundColor: '#f7f7f7' }}>
        <Card className="advertise" style={{ padding: '2rem', height: '100%' }}>
          <ProductDisplay user={user} />
        </Card>
      </div>
    </div>
  )
}

export default Account
