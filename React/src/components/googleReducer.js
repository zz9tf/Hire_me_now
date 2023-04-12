import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_PROFILE,
} from './googleActions'

const initialState = {
  user: null,
  profile: null,
  error: null,
}

const googleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: null }
    case LOGIN_ERROR:
      return { ...state, user: null, error: action.payload }
    case LOGOUT:
      return { ...state, user: null, profile: null }
    case SET_PROFILE:
      return { ...state, profile: action.payload }
    default:
      return state
  }
}

export default googleReducer
