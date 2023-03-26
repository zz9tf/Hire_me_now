import hmnlogo from '../logoGroup.png'
import '../css/Navbar.css'

import GoogleLoginButton from './GoogleLoginButton'

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo">
          <a href="/">
            <img src={hmnlogo} alt="Logo" />
          </a>
        </div>
        <div className="navbar__beta">
          <button>BETA</button>
        </div>
      </div>
      <div className="navbar__right">
        <div className="navbar__login">
          {/* <a href="/login">Member Login</a> */}
          <h1>Google login</h1>
          <GoogleLoginButton />
        </div>
        <div className="navbar__contact">
          <a href="/contact">Contact Us</a>
        </div>
        <a href="https://www.buymeacoffee.com" target="_blank">
          <img
            className="coffeeImage"
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
          />
        </a>
      </div>
    </div>
  )
}

export default NavBar
