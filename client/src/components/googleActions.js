import axios from '../axiosConfig'
import jwt_decode from 'jwt-decode'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'
export const SET_PROFILE = 'SET_PROFILE'

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
})

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
})

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
})

export const logout = () => ({
  type: LOGOUT,
})

export const postUserData = (profile) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, {
        googleId: profile.id,
        email: profile.email,
        name: profile.name,
        imageUrl: profile.picture,
      })
      .then((response) => {
        console.log('User data posted to backend:', response)
        // Save JWT token to local storage
        localStorage.setItem('token', response.data.token)
      })
      .catch((error) => {
        console.log('Error posting user data to backend:', error)
        console.log('Error detail reason:', error.response)
      })
  }
}

export const loadUserFromLocalStorage = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwt_decode(token)
      const profile = {
        id: decodedToken._id,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.imageUrl,
      }
      dispatch(setProfile(profile))
    }
  }
}
