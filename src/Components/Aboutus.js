// Aboutus.js
import React from 'react';
import Navbar from './Navbar';
import '../Css/Aboutus.css';
import Footer from './Footer';

function Aboutus() {
  return (
    <>
      <div>
        <Navbar />
        <div className="about-us-container">
          <div className="white-box">
            <img src="/images/Dog.jpg" alt="About Us" className="about-us-image" />
          </div>
          <h1 className="about-us-title">Know More About Us</h1>
          <div className="welcome-text">
            <p>
              Welcome to Pet Society, where we're dedicated to making pet adoption simple and joyful.
              Find your fur-ever friend easily in one place, without the hassle of searching through
              multiple rescues. Pet Society, your community's trusted source, offers the easiest and
              most secure way to adopt dogs right in your neighborhood. Join us in spreading happiness
              to both tails and hearts.
            </p>
          </div>
          <div className="our-goal-section">
            <h2>Our Goal</h2>
            <p>
              Our primary goal is to become the go-to destination for individuals seeking to adopt
              dogs. We aim to increase successful dog adoptions, reduce the time dogs spend in
              shelters, and create a vibrant community of dog adopters.
            </p>
          </div>

          <div className="Team-profile">
            <h2>The Team</h2>
            <div className="team-members">
              {/* Add your team members' profile cards */}
              <div className="team-member">
                <div className="card">
                  <img src="/images/Fritz.jpg" alt="Team Member 1" className="card-img-top" />
                  <div className="card-body">
                    <div className="member-name">Fritz Abrea</div>
                    <p className="card-text">"I'm not a mathematician, but I know my life is a series of unfortunate fractions."</p>
                  </div>
                </div>
              </div>
              <div className="team-member">
                <div className="card">
                  <img src="/images/Rox.jpg" alt="Team Member 2" className="card-img-top" />
                  <div className="card-body">
                    <div className="member-name">Roxanne Alcordo</div>
                    <p className="card-text">"Live, Laugh, and Love"</p>
                  </div>
                </div>
              </div>
              <div className="team-member">
                <div className="card">
                  <img src="/images/Rob2.jpg" alt="Team Member 3" className="card-img-top" />
                  <div className="card-body">
                    <div className="member-name">Rob Borinaga</div>
                    <p className="card-text">"Chase adventures, not perfection"</p>
                  </div>
                </div>
              </div>
              <div className="team-member">
                <div className="card">
                  <img src="/images/Hazelyn.jpg" alt="Team Member 4" className="card-img-top" />
                  <div className="card-body">
                    <div className="member-name">Hazelyn Balingcasag</div>
                    <p className="card-text">"Smart by design, lazy by choice, and money is my favorite noise."</p>
                  </div>
                </div>
              </div>
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

export default Aboutus;
