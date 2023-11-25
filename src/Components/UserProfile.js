// UserProfile.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/UserProfile.css";
import Navbar from './Navbar';

const Profile = () => {
  // State for storing profile information
  const profileInfo = {
    firstName: 'John Rob',
    lastName: 'Borinaga',
    email: 'rob.borinaga@gmail.com',
    gender: 'Male',
    address: '123 Main St, Cityville',
    contactNumber: '+1234567890',
  };

  return (
    <div>
      <Navbar />

      <div className="profile-container">
        <div className="box">
          <div className="profile-column">
            <div className="profile-image">
              <img src="/images/RobFinal.jpg" alt="Profile Image" />
            </div>
            <Link to="/userprofileedit">
              <button className="edit-profile-btn">EDIT PROFILE</button>
            </Link>
          </div>

          <div className="paper-container">
            <div className="info-column">
              <div className="personal-info">
                {/* Display non-editable profile information */}
                <div className="info-item">
                  <span className="bold-text">First Name: </span>
                  <span>{profileInfo.firstName}</span>
                </div>
                <div className="info-item">
                  <span className="bold-text">Last Name: </span>
                  <span>{profileInfo.lastName}</span>
                </div>
                <div className="info-item">
                  <span className="bold-text">Email: </span>
                  <span>{profileInfo.email}</span>
                </div>
                <div className="info-item">
                  <span className="bold-text">Gender: </span>
                  <span>{profileInfo.gender}</span>
                </div>
                <div className="info-item">
                  <span className="bold-text">Address: </span>
                  <span>{profileInfo.address}</span>
                </div>
                <div className="info-item">
                  <span className="bold-text">Contact Number: </span>
                  <span>{profileInfo.contactNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;