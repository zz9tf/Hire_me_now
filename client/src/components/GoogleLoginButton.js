import React, { useState, useEffect } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import styles from '../css/GoogleLoginButton.css'

function GoogleLoginButton() {
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  })

  const postUserData = (profile) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, {
        googleId: profile.id,
        email: profile.email,
        name: profile.name,
        imageUrl: profile.picture,
      })
      .then((response) => {
        console.log('User data posted to backend:', response)
      })
      .catch((error) => {
        console.log('Error posting user data to backend:', error)
        console.log('Error detail reason:', error.response)
      })
  }

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setProfile(res.data)
          postUserData(res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          {/* in case we want a profile pic */}
          {/* <div className={styles.userProfile}>
            <img src={profile.picture} alt="user image" />
            <p>Name: {profile.name}</p>
          </div>
          <p>Email Address: {profile.email}</p> */}
          <button className="logoutButton" onClick={logOut}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google logo"
              width={20}
            />
            Log out
          </button>
        </div>
      ) : (
        <button className="loginButton" onClick={() => login()}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            width={20}
          />
          Sign in
        </button>
      )}
    </div>
  )
}

export default GoogleLoginButton
