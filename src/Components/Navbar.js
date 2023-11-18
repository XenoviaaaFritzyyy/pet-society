import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import '../Css/Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const UserProfileDropdown = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Settings');
  
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  
    const changeOption = (option) => {
      setSelectedOption(option);
      toggleDropdown(); // Close the dropdown after an option is selected
      handleOptionClick(option); // Navigate based on the selected option
    };

    const handleOptionClick = (option) => {
      switch (option) {
        case 'Profile':
          navigate('/profile'); // Adjust the path as needed
          break;
        case 'Request':
          navigate('/request'); // Adjust the path as needed
          break;
        case 'Log out':
          navigate('/'); // Navigate to the home page or wherever needed
          break;
        // Add more cases as needed
        default:
          break;
      }
    };
  
    return (
      <div className="profile-dropdown">
        <div className="selected-option" onClick={toggleDropdown}>
            <img src="/images/rob.jpg" alt="User Profile" className="user-profile-image" />
        </div>
        {isDropdownOpen && (
          <div className="profile-dropdown-content">
            <div onClick={() => changeOption('Profile')} style={{ marginBottom: '10px' }}>Profile</div>
            <div onClick={() => changeOption('Request')} style={{ marginBottom: '10px' }}>Request</div>
            <div onClick={() => changeOption('Log out')}>Log out</div>
            {/* Add more options as needed */}
          </div>
        )}
      </div>
    );
  };
  
  const showButton = () => setButton(window.innerWidth > 960);

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="/images/logo.png" alt="Logo" style={{ height: '160px', marginTop: '20px', backgroundColor: '#27374D' }} />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {['Home', 'Dictionary', 'Gallery', 'About us'].map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={`/${item}`} className="nav-links" onClick={closeMobileMenu}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <UserProfileDropdown />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
