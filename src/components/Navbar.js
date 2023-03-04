import hmnlogo from '../logoGroup.png'
import '../css/Navbar.css'

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
            <button>Member Login</button>
          </div>
          <div className="navbar__contact">
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </div>
  )
}

export default NavBar
