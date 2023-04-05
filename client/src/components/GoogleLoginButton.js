import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import '../css/GoogleLoginButton.css'
import {
  loginSuccess,
  loginError,
  setProfile,
  logout,
  postUserData,
} from '../components/googleActions'
import { persistor } from './store'

function GoogleLoginButton({ onLogin }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.google.user)
  const profile = useSelector((state) => state.google.profile)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      dispatch(loginSuccess(codeResponse))
    },
    onError: (error) => dispatch(loginError(error)),
  })

  useEffect(() => {
    console.log('user:', user)

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
          console.log('what is res?', res.data)
          dispatch(setProfile(res.data))
          dispatch(postUserData(res.data))
          console.log('profile:', profile)
          onLogin()
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  const logOut = async () => {
    await persistor.purge() // wait for persisted state to be cleared
    googleLogout()
    dispatch(logout())
  }

  return (
    <div>
      {/* <h2>React Google Login</h2> */}
      <br />
      <br />
      {profile && (
        <button className="logoutButton" onClick={logOut}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            width={20}
          />
          Log out
        </button>
      )}
      {!profile && (
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
