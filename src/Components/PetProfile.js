import '../Css/PetProfile.css';
import React from "react";
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Dictionary from './Dictionary';
import Gallery from './Gallery';
import AboutUs from './Aboutus';

function PetProfile(){
    return(
        <>
        <div className='body'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' exact component={Home} />
                    <Route path='/dictionary' component={Dictionary} />
                    <Route path='/gallery' component={Gallery} />
                    <Route path='/aboutus' component={AboutUs} />
                </Routes>
            </Router>
            <div className='Pethome-container'>
                <div className='Petcontent-container'>
                    <div className='picture'>
                        <img src="/images/logo.png" alt="Logo" style={{ height: '100%',width:'100%', backgroundColor: '#27374D' }} />
                    </div>
                </div>
                <div className='Petcontent2-container'>
                    
                </div>
            </div>
        </div>
        </>
    )

}
export default PetProfile;