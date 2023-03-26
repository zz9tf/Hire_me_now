import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { GoogleOAuthProvider } from '@react-oauth/google'

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
