import hmnlogo from '../logoGroup.png'
import { Dropdown } from 'react-bootstrap';
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
      <Dropdown className="navbar__service" style={{marginRight:"1rem"}}>
        <Dropdown.Toggle variant="light" className="navbar__service userDropdown" id="dropdown-basic"
          style={{
            backgroundColor: "white",
            border: "none",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#565656",
          }}>
            Services
          </Dropdown.Toggle>

        <Dropdown.Menu className="navbar__service userDropdown"
          style={{
            border: "none",
            color: "#565656",
            backgroundColor:"rgb(236, 248, 247, 0.75)"}}>
            <Dropdown.Item href="/coverletter"
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#565656",
              }}>
              Write Cover Letter
            </Dropdown.Item>
            <Dropdown.Item href="/coverletter"
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#565656",
              }}>
              AI Writing Helper
            </Dropdown.Item>
            <Dropdown.Item href="/coverletter"
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#565656",
              }}>
              Interview Question Guidance
            </Dropdown.Item>
            <Dropdown.Item href="/coverletter"
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#565656",
              }}>
              Translate Resumes
            </Dropdown.Item>
            <Dropdown.Item href="/coverletter"
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#565656",
              }}>
              Resume Template
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
        {/* <div className="navbar__contact">
          <a href="/contact">Contact Us</a>
        </div> */}
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
