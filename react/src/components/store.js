import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import googleReducer from './googleReducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    google: googleReducer,
  })
)

export const store = createStore(rootReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
