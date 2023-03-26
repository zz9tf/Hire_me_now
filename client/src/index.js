import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { GoogleOAuthProvider } from '@react-oauth/google'

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1003757053264-10fvhciu7uhtpqhpf1p4ghhntkgq7jhe.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
