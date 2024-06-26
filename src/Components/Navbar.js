import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Components/AuthContext';
import '../Css/Navbar.css';

function UserProfileDropdown({ profileInfo, onClick }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleOptionClick = (option) => {
    toggleDropdown(); 
    onClick(option); 
  };

  return (
    <div className="profile-dropdown">
      <div className="selected-option" onClick={toggleDropdown}>
        <img
          src={profileInfo.photoPath ? `http://localhost:8080/user/${profileInfo.photoPath}` : "/images/default-pic.jpg"}
          alt="User Profile"
          className="user-profile-image"
          style={{ objectFit: 'cover', cursor: 'pointer' }}
        />
      </div>
      {isDropdownOpen && (
        <div className="profile-dropdown-content">
          <div onClick={() => handleOptionClick('Profile')} style={{ marginBottom: '10px', cursor: 'pointer' }}>Profile</div>
          <div onClick={() => handleOptionClick('Forum')} style={{ marginBottom: '10px', cursor: 'pointer' }}>Forum</div>
          {/* <div onClick={() => handleOptionClick('Notification')} style={{ marginBottom: '10px', cursor: 'pointer' }}>Notification</div> */}
          <div onClick={() => handleOptionClick('Request')} style={{ marginBottom: '10px', cursor: 'pointer' }}>Request</div>
          <div onClick={() => handleOptionClick('Log out')} style={{ cursor: 'pointer' }}>Log out</div>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate(); 
  const { userID } = useAuth();
  const [profileInfo, setProfileInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    gender: '',
    address: '',
    contact: '',
    photoPath: '',
  });
  const [loading, setLoading] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleOptionClick = (option) => {
    switch (option) {
      case 'Profile':
        navigate('/userprofile'); 
        break;
      case 'Notification':
        navigate(`/notification/${userID}`); 
        break;  
      case 'Forum':
        navigate('/forum'); 
        break; 
      case 'Request':
        navigate('/request'); 
        break;
      case 'Log out':
        localStorage.removeItem("userID")
        navigate('/'); 
        break;
      default:
        break;
    }
  };

  const showButton = () => setButton(window.innerWidth > 960);

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
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/Home" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="/images/logo.png" alt="Logo" style={{ height: '160px', marginTop: '20px', backgroundColor: '#27374D' }} />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {['Home', 'Dictionary', 'Gallery', 'About us', 'Contact us'].map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={`/${item}`} className="nav-links" onClick={closeMobileMenu}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <UserProfileDropdown profileInfo={profileInfo} onClick={handleOptionClick} />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
