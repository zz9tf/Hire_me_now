import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'

import axios from '../axiosConfig' // Replace the existing import

import styles from '../css/GoogleLoginButton.css'
import {
  loginSuccess,
  loginError,
  setProfile,
  logout,
  postUserData,
  loadUserFromLocalStorage
} from '../components/googleActions'

function GoogleLoginButton() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.google.user)
  const profile = useSelector((state) => state.google.profile)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => dispatch(loginSuccess(codeResponse)),
    onError: (error) => dispatch(loginError(error)),
  })

  

  useEffect(() => {
    dispatch(loadUserFromLocalStorage()) 
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
          dispatch(setProfile(res.data))
          dispatch(postUserData(res.data))
        })
        .catch((err) => console.log(err))
    }
  }, [user, dispatch])

const logOut = () => {
  googleLogout()
  localStorage.removeItem('token') // Remove JWT token from local storage
  dispatch(logout())
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
