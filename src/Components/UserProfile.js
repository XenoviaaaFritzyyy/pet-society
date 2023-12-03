import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../Css/UserProfile.css';
import { useAuth } from '../Components/AuthContext';

const Profile = () => {
  const { userID, setUserID } = useAuth();
  const [profileInfo, setProfileInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    gender: '',
    address: '',
    contact: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/user/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setProfileInfo(data);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error during user profile fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchUserProfile();
    }
  }, [userID]);

  useEffect(() => {
    if (userID) {
      localStorage.setItem('userID', userID);
    }
  }, [userID]);

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div className="profile-container">
        <div className="box">
          <div className="profile-column">
            <div className="profile-image">
              <img
                src={profileInfo.photoPath ? `http://localhost:8080/user/${profileInfo.photoPath}` : "/images/default-pic.jpg"}
                alt="User Profile"
              />
            </div>
            <Link to="/userprofileedit">
              <button className="edit-profile-btn">EDIT PROFILE</button>
            </Link>
          </div>

          <div className="paper-container">
            <div className="info-column">
              <div className="personal-info">
                {loading ? (
                  <p>Loading...</p>
                ) : (

                  <>
                    <div className="info-item">
                      <span className="bold-text">Firstname: </span>
                      <span style={{ fontSize: '18px' }}>{profileInfo.fname}</span>
                    </div>
                    <div className="info-item">
                      <span className="bold-text">Lastname: </span>
                      <span style={{ fontSize: '18px' }}>{profileInfo.lname}</span>
                    </div>
                    <div className="info-item">
                      <span className="bold-text">Email: </span>
                      <span style={{ fontSize: '18px' }}>{profileInfo.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="bold-text">Gender: </span>
                      <span style={{ fontSize: '18px' }}>{profileInfo.gender}</span>
                    </div>
                    <div className="info-item">
                      <span className="bold-text">Address: </span>
                      <span style={{ fontSize: '18px' }}>{profileInfo.address}</span>
                    </div>
                    <div className="info-item">
                      <span className="bold-text">Contact Number: </span>
                      <span style={{ fontSize: '18px' }}>{profileInfo.contact}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
