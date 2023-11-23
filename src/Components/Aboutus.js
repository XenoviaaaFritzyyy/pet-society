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
          <div className="aboutus">
            <img src="/images/dogbg1.jpg" alt="About Us" className="about-us-image" />
              <div className="welcome-text">
                <h1>Know More About Us</h1>
                  <p>
                  Step into the world of Pet Society, where our commitment to simplifying and enriching pet adoption knows no bounds. Discover the joy of finding your fur-ever friend effortlessly, all in one place, eliminating the need to sift through numerous rescues. Pet Society, the epitome of your community's trust, provides a seamless and secure avenue to welcome canine companions into your life, right in the heart of your neighborhood.
                  <br/><br/>
                  Immerse yourself in the charm of hassle-free pet adoption, where happiness is not only measured in wagging tails but also in the warmth it brings to every heart. Join our community, dedicated to fostering connections between loving homes and lovable pets. Let the spirit of Pet Society be the bridge that unites kindred spirits, creating a haven for both tails and hearts to flourish. Embrace the journey of companionship with us, where simplicity meets joy in every pawprint.
                  </p>
              </div>
          </div>

          <div className="our-goal-section">
          <div className='box1' style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '20px' }}>
              <h1 style={{textAlign: 'center', color: '#27374D'}}>Our Vision</h1>
              <p>
              We envision a world where every dog finds its forever home, and the bond between pet and owner is a source of enduring joy. Pet Society aspires to lead the way in revolutionizing the adoption experience, setting the gold standard for community-driven initiatives that prioritize the welfare of our four-legged friends. Our vision extends beyond merely facilitating adoptions; we aim to nurture a vibrant, interconnected community of dog adopters, fostering a culture of responsible pet ownership and a shared celebration of the profound human-animal bond.
              </p>
            </div>

            <div className='box2' style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '20px'  }}>
              <h1 style={{textAlign: 'center', color: '#27374D'}}>Our Goal</h1>
              <p>
                Our overarching goal is to establish Pet Society as the go-to hub for those seeking to adopt dogs, redefining the adoption process as a positive, enriching experience for both humans and pets alike. To achieve this, we are dedicated to increasing the number of successful dog adoptions, reducing the duration dogs spend in shelters, and actively cultivating a dynamic community of dog adopters. By prioritizing the well-being of every dog in our care and fostering a supportive network of pet lovers, we aim to create lasting, joyful connections that enhance the lives of both our canine companions and their devoted human families.
              </p>
            </div>

            <div className='box3' style={{ background: 'white', borderRadius: '10px', padding: '20px'}}>
              <h1 style={{textAlign: 'center', color: '#27374D'}}>Our Mission</h1>
              <p>
              At Pet Society, our mission is to be the unparalleled destination for individuals embarking on the transformative journey of dog adoption. Guided by compassion and a deep-seated commitment to the well-being of every furry friend, we strive to facilitate seamless connections between dogs in need and loving homes. Our mission is not only to increase successful dog adoptions but also to significantly diminish the time these loyal companions spend in shelters, ensuring a swift transition to a life filled with love, care, and belonging.
              </p>
            </div>
          </div>

          <div className="Team-profile">
            <h1>The Team</h1>

            <div className="team-members">
              {/* Add your team members' profile cards */}
              <div className="member1">
                <div className="card">
                  <img src="/images/Fritz.jpg" alt="Team Member 1" className="card-img-top" />
                  <div className="card-body">
                    <div className="member-name">Fritz Abrea</div>
                    <p className="card-text">“In reality, the least interesting answer is usually the correct one.”</p>
                  </div>
                </div>
              </div>

              <div className="member2">
                <div className="card">
                  <img src="/images/Rox.jpg" alt="Team Member 2" className="card-img-top" />
                  <div className="card-body">
                    <div className="member-name">Roxanne Alcordo</div>
                    <p className="card-text">"Live, Laugh, and Love"</p>
                  </div>
                </div>
              </div>

              <div className="member3">
                <div className="card">
                  <img src="/images/Rob2.jpg" alt="Team Member 3" className="card-img-top" />
                  <div className="card-body">
                    <div className="member-name">Rob Borinaga</div>
                    <p className="card-text">"I knew exactly what to do. But in a much more real sense, I had no idea what to do"</p>
                  </div>
                </div>
              </div>

              <div className="member4">
                <div className="card">
                  <img src="/images/Hazelyn.jpg" alt="Team Member 4" className="card-img-top" />
                  <div className="card-body">
                    <div className="member-name">Hazelyn Balingcasag</div>
                    <p className="card-text">"If I don't have to do something, I won't, but if I have to, I'll do it quickly."</p>
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
