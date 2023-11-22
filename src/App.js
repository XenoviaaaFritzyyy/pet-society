import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Dictionary from './Components/Dictionary';
import Gallery from './Components/Gallery';
import ApplicationForm from './Components/ApplicationForm';
import Admin from './Components/Admin';
import AboutUs from './Components/Aboutus';
import UserProfile from './Components/UserProfile';
import PetProfile from './Components/PetProfile';
import PetProfileForm from './Components/PetProfileForm';
import DictionaryForm from './Components/DictionaryForm';
import A from './Components/DataDictionary/A';
import B from './Components/DataDictionary/B';
import C from './Components/DataDictionary/C';
import D from './Components/DataDictionary/D';
import E from './Components/DataDictionary/E';
import F from './Components/DataDictionary/F';
import G from './Components/DataDictionary/G';
import H from './Components/DataDictionary/Hh';
import I from './Components/DataDictionary/I';
import J from './Components/DataDictionary/J';
import K from './Components/DataDictionary/K';
import L from './Components/DataDictionary/L';
import M from './Components/DataDictionary/M';
import N from './Components/DataDictionary/N';
import O from './Components/DataDictionary/O';
import P from './Components/DataDictionary/P';
import Q from './Components/DataDictionary/Q';
import R from './Components/DataDictionary/R';
import S from './Components/DataDictionary/S';
import T from './Components/DataDictionary/Tt';
import U from './Components/DataDictionary/U';
import V from './Components/DataDictionary/V';
import W from './Components/DataDictionary/W';
import X from './Components/DataDictionary/X';
import Y from './Components/DataDictionary/Y';
import Z from './Components/DataDictionary/Z';

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
        <Route path="/petprofileform" element={<PetProfileForm />} />
        <Route path="/dictionaryform" element={<DictionaryForm />} />
        <Route path="/DataDictionary/A" element={<A />} />
        <Route path="/DataDictionary/B" element={<B />} />
        <Route path="/DataDictionary/C" element={<C />} />
        <Route path="/DataDictionary/D" element={<D />} />
        <Route path="/DataDictionary/E" element={<E />} />
        <Route path="/DataDictionary/F" element={<F />} />
        <Route path="/DataDictionary/G" element={<G />} />
        <Route path="/DataDictionary/Hh" element={<H />} />
        <Route path="/DataDictionary/I" element={<I />} />
        <Route path="/DataDictionary/J" element={<J />} />
        <Route path="/DataDictionary/K" element={<K />} />
        <Route path="/DataDictionary/L" element={<L />} />
        <Route path="/DataDictionary/M" element={<M />} />
        <Route path="/DataDictionary/N" element={<N />} />
        <Route path="/DataDictionary/O" element={<O />} />
        <Route path="/DataDictionary/P" element={<P />} />
        <Route path="/DataDictionary/Q" element={<Q />} />
        <Route path="/DataDictionary/R" element={<R />} />
        <Route path="/DataDictionary/S" element={<S />} />
        <Route path="/DataDictionary/Tt" element={<T />} />
        <Route path="/DataDictionary/U" element={<U />} />
        <Route path="/DataDictionary/V" element={<V />} />
        <Route path="/DataDictionary/W" element={<W />} />
        <Route path="/DataDictionary/X" element={<X />} />
        <Route path="/DataDictionary/Y" element={<Y />} />
        <Route path="/DataDictionary/Z" element={<Z />} />
      </Routes>
    </Router>
  );
}

export default App;
