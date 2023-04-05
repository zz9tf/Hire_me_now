import { Helmet } from 'react-helmet'
import NavBar from './components/Navbar'
import Contact from './components/Contact'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CoverLetter from './components/CoverLetter'
import WritingHelper from'./components/WritingHelper'
import SignUp from './components/SignUp'
import Footer from './components/Footer'
import HomeCarousel from './components/HomeCarousel'
import FunctionBorders from './components/FunctionBorders'
import Login from './components/Login'


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
            <div>
              <HomeCarousel></HomeCarousel>
              <FunctionBorders></FunctionBorders>
            </div>
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/coverletter">
            <CoverLetter />
          </Route>
          <Route path="/writinghelper">
            <WritingHelper />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
      <Footer></Footer>
    </div>
  )
}

export default App
