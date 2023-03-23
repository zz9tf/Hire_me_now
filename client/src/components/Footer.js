import '../css/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'

function Footer() {
  return (
    <div>
      <footer class="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <h6>About</h6>
              <p class="text-justify">
                Our platform is designed to help job seekers stand out in a
                competitive job market. With our comprehensive tools and
                resources, you can easily build a winning resume, create a
                customized cover letter, improve your writing skills, and even
                translate your resume into different languages.
                <br></br>
                The more you use our platform, the more personalized and
                effective your results become.
              </p>
            </div>

            <div class="col-xs-6 col-md-3">
              <h6>Services</h6>
              <ul class="footer-links">
                <li>
                  <a href="#">Resume Template</a>
                </li>
                <li>
                  <a href="#">AI Writing Helper</a>
                </li>
                <li>
                  <a href="#">Write Cover Letters</a>
                </li>
                <li>
                  <a href="#">Interview Question Guidance</a>
                </li>
                <li>
                  <a href="#">Translate Resumes</a>
                </li>
              </ul>
            </div>

            <div class="col-xs-6 col-md-2">
              <h6>Quick Links</h6>
              <ul class="footer-links">
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="https://www.buymeacoffee.com">Buy Me a Coffee</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="container mt-3">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <p class="copyright-text">
                Copyright &copy; 2023 All Rights Reserved by
                <a href="#"> Kuakua</a>.
              </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
              <ul class="social-icons">
                <li>
                  <a href="https://twitter.com">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href="https://github.com">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a href="xx@brandeis.edu">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                </li>
              </ul>
            </div>
            <div className="contact--row social-icons"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
