//Aboutus.js
import React from 'react';
import Navbar from './Navbar';
import '../Css/Aboutus.css';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="about-us-container">
        <h1 className="about-us-title">Know More About Us</h1>
        <img src="/images/Dog.jpg" alt="About Us" className="about-us-image" />
        <p>
          Welcome to Pet Society, where we're dedicated to making pet adoption simple and joyful.
          Find your fur-ever friend easily in one place, without the hassle of searching through
          multiple rescues. Pet Society, your community's trusted source, offers the easiest and
          most secure way to adopt dogs right in your neighborhood. Join us in spreading happiness
          to both tails and hearts.
        </p>

        <div className="about-us-section">
          <h2>Our Goal</h2>
          <p>
            Our primary goal is to become the go-to destination for individuals seeking to adopt
            dogs. We aim to increase successful dog adoptions, reduce the time dogs spend in
            shelters, and create a vibrant community of dog adopters.
          </p>
        </div>

        <div className="about-us-section">
          <h2>The Team</h2>
          <div className="team-members">
            {/* Add your team members' profile pictures */}
            <div className="team-member">
              <img src="/images/Fritz.jpg" alt="Team Member 1" />
              <p>Team Member 1's Motto</p>
            </div>
            <div className="team-member">
              <img src="/images/Rox.jpg" alt="Team Member 2" />
              <p>Team Member 2's Motto</p>
            </div>
            <div className="team-member">
              <img src="/images/Rob2.jpg" alt="Team Member 3" />
              <p>Team Member 3's Motto</p>
            </div>
            <div className="team-member">
              <img src="/images/Hazelyn.jpg" alt="Team Member 4" />
              <p>Team Member 4's Motto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};

export default AboutUs;
