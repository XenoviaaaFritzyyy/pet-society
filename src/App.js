import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Dictionary from './Components/Dictionary';
import Gallery from './Components/Gallery';
import ApplicationForm from './Components/ApplicationForm';
import Admin from './Components/Admin';
import './Css/App.css';
import AboutUs from './Components/Aboutus';
import UserProfile from './Components/UserProfile';
import PetProfile from './Components/PetProfile';

function Welcome() {
  const containerStyle = {
    backgroundImage: 'url(/images/background1.png)',
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right top',
    minHeight: '100vh',
    backgroundColor: 'rgba(0, 0, 0)',
  };

  return (
    <div className="app-container" style={containerStyle}>
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, right: 0, left: 0, padding: '20px' }}>
      <img src="/images/logo.png" alt="Logo" style={{ height: '120px', margin: '0 0 0 100px' }} />
      <div>
        <Link to="/signin" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', color: 'white', backgroundColor: 'transparent', border: 'none' }}>Sign In</button>
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '12px 25px', margin: ' 0  100px 0 20px', borderRadius: '10px' }}>Sign Up</button>
        </Link>
      </div>
    </header>

      <div style={{ textAlign: 'left', width: '50%', margin: '0 0 0 150px', paddingTop: '220px' }}>
        <strong>
          Furever Hugs Wanted! <br />
          Adopt Today and Bring Joy Home.
        </strong>
        <p className='slogan'>"Experience the love of a lifetime - Rescue, Adopt, Embrace Happiness"</p>
        <Link to="/signin" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '18px 60px', borderRadius: '50px', marginTop: '20px' }}>
              Adopt Now
            </button>
        </Link>
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
        <Route path="/home" element={<Home />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/About us" element={<AboutUs />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/petprofile/:petId" element={<PetProfile />} />
        

      </Routes>
    </Router>
  );
}

export default App;
