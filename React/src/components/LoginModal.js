import React from 'react'
import ReactDOM from 'react-dom'
import GoogleLoginButton from './GoogleLoginButton'
import '../css/LoginModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function LoginModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="login-modal-overlay">
      <div className="login-modal">
        <h2 className="title">Please Log In to Continue</h2>
        <div className="googleLogin-button">
          <GoogleLoginButton onLogin={onClose} />
        </div>
        {/* <button className="close-button" onClick={onClose}>
          Close
        </button> */}
          <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />

      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default LoginModal
