import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import '../Css/Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const UserProfileDropdown = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Settings');
  
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  
    const changeOption = (option) => {
      setSelectedOption(option);
      toggleDropdown(); // Close the dropdown after an option is selected
      alert(`Selected option: ${option}`);
    };
  
    return (
      <div className="profile-dropdown">
        <div className="selected-option" onClick={toggleDropdown}>
            <img src="/images/background1.png" alt="User Profile" className="user-profile-image" />
        </div>
        {isDropdownOpen && (
          <div className="profile-dropdown-content">
            <div onClick={() => changeOption('Settings')}>Settings</div>
            <div onClick={() => changeOption('Account')}>Account</div>
            <div onClick={() => changeOption('Other Option')}>Other Option</div>
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
