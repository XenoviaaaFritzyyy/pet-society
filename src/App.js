import React, { useState } from 'react';
import SignIn from './Components/SignIn';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const navigateToSignIn = () => {
    setShowWelcome(false);
  };

  return (
    <div>
      {showWelcome && (
        <div style={{ textAlign: 'center', marginTop: '50vh' }}>
          <h1>Welcome to Your App!</h1>
          <button onClick={navigateToSignIn} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>
            Go to Sign In
          </button>
        </div>
      )}
      {/* Render SignIn component conditionally */}
      {!showWelcome && <SignIn />}
      {/* Other components can be added here */}
    </div>
  );
}

export default App;
