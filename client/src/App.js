import { Helmet } from 'react-helmet'
import NavBar from './components/Navbar'
import Contact from './components/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoverLetter from './components/CoverLetter'
import WritingHelper from'./components/WritingHelper'
import SignUp from './components/SignUp'
import Footer from './components/Footer'
import HomeCarousel from './components/HomeCarousel'
import FunctionBorders from './components/FunctionBorders'
import Login from './components/Login'
import Account from './components/Account'


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

        <Routes>
          <Route path="/" element={
            <>
              <HomeCarousel />
              <FunctionBorders />
            </>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coverletter" element={<CoverLetter />} />
          <Route path="/writinghelper" element={<WritingHelper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
        </Routes>

      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App
