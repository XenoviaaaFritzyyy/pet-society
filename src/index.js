import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Components/Home';
import UserProfile from './Components/UserProfile';
import PetProfile from './Components/PetProfile';
import ApplicationForm from './Components/ApplicationForm';
import Admin from './Components/Admin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);


