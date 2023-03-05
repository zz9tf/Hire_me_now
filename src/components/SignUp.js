import React, { useState, useEffect } from 'react'
import '../css/SignUp.css'
import { FaGoogle } from 'react-icons/fa'

const SignUp = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [userAlreadyExists, setUserAlreadyExists] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    // perform validation
    const validationErrors = validate()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    // perform sign up logic
    //1. Check for existing user
    // Check for existing user
    const email = inputEmail.toLowerCase()
    const userExists = await checkUserExists(email)
    setUserAlreadyExists(userExists)
    if (userExists) {
      setErrors({
        ...errors,
        email: 'An account with that email address already exists.',
      })
      return
    }

    //2. Create user account

    const newUser = {
      username: username,
      email: email,
      password: password,
    }
    setIsSigningUp(true)
    const createdUser = await createUser(newUser)
    console.log('Created new user:', createdUser)

    //3. Log in the user
  }

  const checkUserExists = () => {
    console.log('checking if user exists')
  }

  const createUser = () => {
    console.log('A new user is created')
  }

  const validate = () => {
    const errors = []
    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(inputEmail)) {
      errors.push('Invalid email address')
    }
    // validate username
    if (!username || username.length < 4) {
      errors.push('Username must be at least 4 characters long')
    }
    // validate password
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    if (!passwordRegex.test(password)) {
      errors.push(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
      )
    }
    // validate confirm password
    if (password !== confirmPassword) {
      errors.push('Passwords do not match')
    }
    return errors
  }

  useEffect(() => {
    if (isSigningUp && !userAlreadyExists) {
      // Redirect to login page or dashboard after successful sign-up
      console.log('Redirecting to login page...')
    }
  }, [isSigningUp, userAlreadyExists])

  return (
    <div className="signup--container">
      <div className="signup--column">TEST</div>
      <div className="signup--column">
        <h2>Create Account</h2>
        <button onClick={() => setIsSigningUp(true)} className="google-button">
          <FaGoogle className="google-icon" />
          Sign up with Google
        </button>

        <p className="su--text">-OR-</p>
        <form onSubmit={handleSignUp}>
          <label>
            Email:
            <input
              type="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Confirm password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button className="signup--button" type="submit">
            Create account
          </button>
        </form>
        <p>
          Already have an account?{' '}
          <a href="/login" className="su--text">
            Log in
          </a>
        </p>
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SignUp
