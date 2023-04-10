import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { Dropdown } from 'react-bootstrap';
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
      {/* {profile && (
        <button className="logoutButton" onClick={logOut}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            width={20}
          />
          Log out
        </button>
      )} */}
      {profile &&
        // (
        // <div className="logoutButton" onClick={logOut} title="Click to Logout">
        //   Hi, 
        //   <span className="userName"> {profile.name}</span>
        // </div>
        (<Dropdown className="logoutButton userDropdown">
        <Dropdown.Toggle variant="light" className="userDropdown" id="dropdown-basic"
          style={{
            backgroundColor: "white",
            border: "none",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#565656",
          }}>
            Hi, <span className="userName">{profile.name}</span>
          </Dropdown.Toggle>

        <Dropdown.Menu className="logoutButton"
          style={{
            border: "none",
            color: "#565656",
            backgroundColor:"rgba(212, 244, 239, 0.5)"}}>
            <Dropdown.Item href="/account"
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#565656",
              }}>
              Account Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={logOut}
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#565656",
              }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google logo"
                width={15}
                style={{ marginRight: '5px' }}
              />
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      {!profile && (
        <button className="loginButton" onClick={() => login()}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            width={17}
            style={{ marginRight: '5px' }}
          />
          Sign in
        </button>
      )}
    </div>
  )
}

export default GoogleLoginButton
