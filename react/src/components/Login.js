import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import AdvertiseSection from './AdvertiseSection'
import '../css/Login.css'

const Login = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    // perform validation
    const validationErrors = validate()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    // perform login logic
    const email = inputEmail.toLowerCase()
    const loginSuccessful = await checkLoginCredentials(email, password)
    if (!loginSuccessful) {
      setErrors(['Invalid email or password'])
      return
    }
    // login successful, set isLoggedIn state to true
    setIsLoggedIn(true)
    // redirect to dashboard
    console.log('Redirecting to dashboard...')
  }

  const checkLoginCredentials = () => {
    console.log('Checking login credentials...')
    // replace with actual logic to check login credentials from database
    return true
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    // Add logic to handle the forgot password functionality, such as sending an email to the user with instructions to reset their password.
    console.log('Forgot password functionality coming soon...')
  }

  const validate = () => {
    const errors = []
    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(inputEmail)) {
      errors.push('Invalid email address')
    }
    // validate password
    if (!password) {
      errors.push('Password is required')
    }
    return errors
  }

  return (
    <body className="login-page">
      <div className="login--container">
        <div className="login--column">
          <AdvertiseSection />
        </div>

        <div className="login--column">
          <h2>Login</h2>
          <button className="google-button">
            <FaGoogle className="google-icon" />
            Login with Google
          </button>
          <p className="login--text">-OR-</p>
          <form onSubmit={handleLogin}>
            <label id="email">
              Email:
              <input
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </label>
            <label id="password">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Remember me
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </label>
            <div className="login--forgot-password">
              <a id="forget-link" href="#" onClick={handleForgotPassword}>
                Forgot Password?
              </a>
            </div>
            <button className="login--button" type="submit">
              Login
            </button>
          </form>
          <div className="create-account">
            <p className="create-text"> Not registered yet?</p>
            <a id="create-link" href="/signup">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Login
