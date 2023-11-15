import React,{useState, useEffect} from "react"
import { Button } from "./Button";
import { Link } from "react-router-dom"
import '../Css/Navbar.css';


function Navbar(){
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

return( 
    <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to ="/" className="navbar-logo" onClick={closeMobileMenu}>
                <img src="/images/logo.png" alt="Logo" style={{ height: '120px', margin: 'px', backgroundColor: '#27374D' }} />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/Dictionary' className="nav-links" onClick={closeMobileMenu}>
                            Dictionary
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/Gallery' className="nav-links" onClick={closeMobileMenu}>
                            Gallery
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/Aboutus' className="nav-links" onClick={closeMobileMenu}>
                            About us
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} 
            </div>
        </nav>
    </>
);
}
export default Navbar;