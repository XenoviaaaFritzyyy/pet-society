import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../Css/Admin.css';

function Admin() {

  useEffect(() => {
    document.body.style.background = '#27374D';

    return () => {
      document.body.style.background = ''; 
    };
  }, []);

  return (
    <>
      <Link to="/signin" style={{ textDecoration: 'none' }}>
        <button style={{ position: 'absolute', top: '25px', right: '50px', textDecoration: 'none', fontSize: '15px', padding: '8px 15px', borderRadius: '10px'}}>
          Logout
        </button>
      </Link>

      <div className="admin-container">
        <div className="dashboard">
          <Link to="/petprofileform" className="petprofile">
            Pet Profile Form
          </Link>
          <Link to="/dictionaryform" className="dictionary">
            Dictionary Form
          </Link>
          <Link to="/requestform" className="requestform">
            Request Form
          </Link>
          <Link to="/triviaform" className="triviaform">
            Trivia Form
          </Link>
          <Link to="/dashboardUser" className="dashboardUser">
            Dashboard user
          </Link>
          <Link to="/adminNotification" className="adminNotif">
            Notification
          </Link>
          
        </div>
      </div>
    </>
  );
}

export default Admin;