import React from 'react'
import ReactDOM from 'react-dom'
import GoogleLoginButton from './GoogleLoginButton'
import '../css/LoginModal.css'

function LoginModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="login-modal-overlay">
      <div className="login-modal">
        <h2>Please Log In to Continue</h2>
        <GoogleLoginButton onLogin={onClose} />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default LoginModal
