import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import googleReducer from './googleReducer'

const rootReducer = combineReducers({
  google: googleReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
