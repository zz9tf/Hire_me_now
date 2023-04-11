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
        <div className="navbar__contact">
          <a href="/contact">Contact Us</a>
        </div>
        <div className="navbar__login">
          <GoogleLoginButton />
        </div>

        {/* <div className="navbar__account">
          <a href="/account">Account</a>
        </div> */}

        <div className="navbar__donate">
          <a href="https://www.buymeacoffee.com/kuakua" target="_blank">
            <img
              className="coffeeImage"
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Buy me a coffee"
            />{' '}
            Donate
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavBar
