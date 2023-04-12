import axios from 'axios'

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
      })
      .catch((error) => {
        console.log('Error posting user data to backend:', error)
        console.log('Error detail reason:', error.response)
      })
  }
}


export const fetchUserProfile = (googleId) => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${googleId}`)
      .then((response) => {
        dispatch(setProfile(response.data))
      })
      .catch((error) => {
        console.log('Error fetching user profile:', error)
        console.log('Error detail reason:', error.response)
      })
  }
}
