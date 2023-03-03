import './css/App.css';

import { Helmet } from "react-helmet";
import NavBar from './components/Navbar';


function App() {
  return (
    
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hireme NOW</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Testing" />
      </Helmet>
      <div> 
        <NavBar className="NavBar" >
        </NavBar>
      </div>

      <header className="App-header">
        <h1>
          Your Resume, <br/> Could be 
          <span style={{ color: "rgba(76, 180, 180, 1)" }} > Outstanding</span>.
        </h1>
      </header>
    </div>
  );
}

export default App;
