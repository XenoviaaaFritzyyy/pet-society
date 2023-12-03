import React, {useEffect} from "react";
import { Link } from 'react-router-dom';

const parentContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const containerStyle = {
  width: '75%',
};

const contentStyle = {
  textAlign: 'center',
};



const ThankYou = () => {
  useEffect(() => {
    document.body.style.background = '#27374D';
  
    return () => {
      document.body.style.background = ''; 
    };
  }, []);

  return (
    <div style={parentContainerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <p style={{ fontSize: '80px', fontWeight: 'bold', color: 'white' }}>
            Thank you for submitting your application form!
          </p>
          <p style={{ fontSize: '22px', color: 'white', marginTop: '20px' }}>
            We will review your application and notify you of our decision as soon as possible.
          </p>

          <Link to="/home" style={{ textDecoration: 'none' }}>
            <button style={{  padding: '15px 50px', marginTop: '50px', cursor:'pointer', fontSize:'25px', borderRadius: '10px'}}>Go Back to Homepage</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
