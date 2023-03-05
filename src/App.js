import './css/App.css'

import { Helmet } from 'react-helmet'
import NavBar from './components/Navbar'
import Contact from './components/Contact'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CoverLetter from './components/CoverLetter'
import SignUp from './components/SignUp'

function App() {
  return (
    <div className="App">
      <Router>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Hireme NOW</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Testing" />
        </Helmet>
        <div>
          <NavBar className="NavBar"></NavBar>
        </div>

        <Switch>
          <Route exact path="/">
            <header className="App-header">
              <h1>
                Your Resume, <br /> Could be
                <span style={{ color: 'rgba(76, 180, 180, 1)' }}>
                  {' '}
                  Outstanding
                </span>
                .
              </h1>
            </header>
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/coverletter">
            <CoverLetter />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
