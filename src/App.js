import React, { useState } from 'react';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import './App.css';

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

  return (
    <div>
      {showWelcome && (
        <div style={{ textAlign: 'center', marginTop: '50vh' }}>
          <h1>Welcome to Your App!</h1>
          <button onClick={navigateToSignIn} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>
            Go to Sign In
          </button>
          <button onClick={navigateToSignUp} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>
            Go to Sign Up
          </button>
        </div>
      )}

      {/* Render SignUp component conditionally */}
      {showSignUp && <SignUp />}

      {/* Render SignIn component conditionally */}
      {showSignIn && <SignIn />}

      {/* Other components can be added here */}
    </div>
  );
}

export default App;
