import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import './Css/App.css';
/* Experiment ni Rob*/
/* Experiment 2*/
/* Experiment 3*/
function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  
 
  const navigateToSignIn = () => {
    setShowWelcome(false);
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const navigateToSignUp = () => {
    setShowWelcome(false);
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const containerStyle = showWelcome
    ? {
        backgroundImage: 'url(/images/background1.png)',
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right top',
        minHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0)',
      }
    : {
        minHeight: '100vh',
      };

  return (
    <div className="container" style={containerStyle}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, right: 0, left: 0, padding: '20px' }}>
        <img src="/images/logo.png" alt="Logo" style={{ height: '120px', margin: '0 0 0 100px' }} />
        <div>
          <button onClick={() => window.location.href = '/signin'} style={{ padding: '10px 20px', color: 'white', backgroundColor: 'transparent', border: 'none' }}>Sign In</button>
          <button onClick={() => window.location.href = '/signup'} style={{ padding: '12px 25px', margin: ' 0  100px 0 20px', borderRadius: '10px' }}>Sign Up</button>
        </div>
      </header>

      <div style={{ textAlign: 'left', width: '50%', margin: '0 0 0 150px', paddingTop: '220px' }}>
        <strong>
          Furever Hugs Wanted! <br />
          Adopt Today and Bring Joy Home.
        </strong>
        <p className='slogan'>"Experience the love of a lifetime - Rescue, Adopt, Embrace Happiness"</p>
        <button onClick={() => window.location.href = '/signin'} style={{ padding: '18px 60px', borderRadius: '50px', marginTop: '20px' }}>Adopt Now</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
