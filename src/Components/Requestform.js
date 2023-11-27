import React, { useState, useEffect } from "react";
import { useAuth } from '../Components/AuthContext';
import { Link } from 'react-router-dom';


import '../Css/form1.css';


function RequestForm() {
  const { userID } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:8080/application/getAllApplication`);
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          console.error('Failed to fetch applications');
        }
      } catch (error) {
        console.error('Error during application fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userID]);

  return (
    <>
      <div>
      <Link to="/admin" style={{ textDecoration: 'none' }}>
        <button style={{ position: 'absolute', top: '25px', right: '50px', textDecoration: 'none', fontSize: '15px', padding: '8px 15px', borderRadius: '10px', color: '#27374D'}}>
          Back
        </button>
      </Link>

      <div classname="request-status" style={{marginTop: '20px'}}>
            <label style={{marginLeft: '650px'}}>Application ID: </label>
            <input type="number" id="lname" name="lname" style={{marginRight: '5px', marginBottom:'10px', padding:'5px', borderRadius: '5px', width: '60px'}}/>  
            <button style={{borderRadius: '5px', padding: '3px'}}>Find ID</button>
            
            <div className="request-buttons">
            <button>Reject Request</button>
            <button>Accept Request</button>
            </div>
          </div>

        <h2 style={{textAlign:'center', margin:'30px 0 20px 0', color: '#27374D'}}>All Applications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "5px", fontSize: '12px'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>no. children</th>
                <th>no. adults</th>
                <th>Type of Household</th>
                <th>Type of Residence</th>
                <th>Rent or Own Home?</th>
                <th>Landlord Contact</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.applicationID}>
                  <td>{application.applicationID}</td>
                  <td>{application.fname}</td>
                  <td>{application.lname}</td>
                  <td>{application.address}</td>
                  <td>{application.city}</td>
                  <td>{application.state}</td>
                  <td>{application.noChildren}</td>
                  <td>{application.noAdults}</td>
                  <td>{application.desHousehold}</td>
                  <td>{application.typeResidence}</td>
                  <td>{application.rentHome}</td>
                  <td>{application.landlordContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default RequestForm;
