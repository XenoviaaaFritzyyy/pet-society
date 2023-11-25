import React, { useState, useEffect } from "react";
import { useAuth } from '../Components/AuthContext';

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
        <h2 style={{textAlign:'center', margin:'50px 0 20px 0'}}>All Applications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "10px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white' }}>Application ID</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white' }}>First Name</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white' }}>Last Name</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white' }}>Address</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white' }}>City</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white' }}>State</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white' }}>no of children</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white'}}>no of adults</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white'}} >household</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white'}}>Type of Residence</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white'}}>Rent or own home?</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white'}}>landlordContact</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.applicationID}>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.applicationID}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.fname}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.lname}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.address}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.city}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.state}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.noAdults}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.noChildren}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.desHousehold}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.typeResidence}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.rentHome}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#27374D' }}>{application.landlordContact}</td>
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
