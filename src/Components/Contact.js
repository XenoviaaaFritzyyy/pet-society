// Aboutus.js
import React from 'react';
import Navbar from './Navbar';
import '../Css/Aboutus.css';
import Footer from './Footer';

function Contact() {
  return (
    <>
      <div>
        <Navbar />
        <div className="about-us-container">
          <div className="aboutus">
            <img src="/images/dogbg4.jpg" alt="About Us" className="about-us-image" style={{borderRadius: '10px'}}/>
              <div className="welcome-text">
                <h1>Contact Us</h1>
                  <p>
                  Are you ready to embark on the heartwarming journey of pet adoption? Our dedicated team at Pet Society is here to guide you every step of the way. Whether you have questions about the adoption process, need assistance in choosing the perfect furry companion, or want to learn more about our community-driven initiatives, we're just a message away.
                  <br/><br/>
                  Feel free to reach out to us for personalized support and information. Your inquiry is not just about adopting a pet; it's about fostering a connection that brings joy to both pets and their future human companions. Contact us today and let's make a difference in the lives of these lovable animals waiting for their forever homes. Together, we can create lasting bonds and moments of unconditional love.
                  </p>
              </div>
          </div>

          <div className="our-goal-section">
          <div className='box1' style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '20px', height: '120px', width: '450px' }}>
              <h1 style={{textAlign: 'center', color: '#27374D'}}>Hours of Operation</h1>
              <p style={{textAlign: 'center', color: '#526D82'}}>
                10:00 A.M - 8:00 P.M (Excluding Holidays)
              </p>
            </div>

            <div className='box1' style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '20px', height: '120px', width: '450px' }}>
              <h1 style={{textAlign: 'center', color: '#27374D'}}>Phone Number</h1>
              <p style={{textAlign: 'center', color: '#526D82'}}>
                +639191610325
              </p>
            </div>

            <div className='box1' style={{ background: 'white', borderRadius: '10px', padding: '20px', height: '120px', width: '450px', marginBottom:'50px' }}>
              <h1 style={{textAlign: 'center', color: '#27374D'}}>General Inquiries</h1>
                <p style={{textAlign: 'center'}}>
                    <a href="mailto:hazelynbalingcasag123@gmail.com" style={{color: '#526D82', textDecoration: 'none'}}>
                        petsociety@gmail.com                    
                    </a>
                </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Contact;
