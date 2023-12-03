import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import { useAuth } from '../Components/AuthContext';

function Request() {
  const [applications, setApplications] = useState([]);
  const { userID, setUserID } = useAuth();
  const [filter, setFilter] = useState('Pending');

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
    }
  };

  const updateApplicationStatus = async (applicationID, status, message) => {
    try {
      const url = `http://localhost:8080/application/updateApplicationStatus/${applicationID}?status=${encodeURIComponent(status)}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, message, isDeleted: true }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(`Server response data:`, responseData);

        setApplications(prevApplications => {
          const updatedApplications = [...prevApplications];
          const updatedApplication = updatedApplications.find(app => app.applicationID === applicationID);
          updatedApplication.message = message;
          return updatedApplications;
        });

        alert(`Application ${status.toLowerCase()}ed successfully!`);
      } else {
        console.error(`Failed to ${status.toLowerCase()} application`);
      }
    } catch (error) {
      console.error(`Error during application ${status.toLowerCase()}ion:`, error);
    }
  };

  const handleCancel = async (applicationID) => {
    const confirmAccept = window.confirm("Are you sure you want to cancel your application?");
    if (confirmAccept) {
      await updateApplicationStatus(applicationID, 'Cancelled', "Kindly be advised that your application has been canceled.");
    }
  };

  useEffect(() => {
    (async () => {
      const storedUserID = localStorage.getItem('userID');
      if (storedUserID) {
        setUserID(storedUserID);
        await fetchApplications();
      }
    })();
  }, [userID, setUserID]);

  const filteredApplications = applications.filter(application => {
    if (filter === 'All') {
      return application.user.userID.toString() === userID.toString();
    } else {
      return application.user.userID.toString() === userID.toString() && application.status === filter;
    }
  });

  return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '25px' }}>
        <h2 style={{ color: '#27374D' }}>Application Requests for userID: {userID}</h2>

        <div style={{ margin: '20px' }}>
          <button onClick={() => setFilter('All')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px'}}>All</button>
          <button onClick={() => setFilter('Pending')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Pending</button>
          <button onClick={() => setFilter('Accepted')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Accepted</button>
          <button onClick={() => setFilter('Rejected')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Rejected</button>
          <button onClick={() => setFilter('Cancelled')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Cancelled</button>
        </div>

        {filteredApplications.length > 0 ? (
          <table style={{ margin: '20px auto' }}>
            <thead>
              <tr>
                <th>Pet Name</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(application => (
                <tr key={application.applicationID}>
                  <td>{application.pet.name}</td>
                  <td>{application.message}</td>
                  <td>{application.status}</td>
                  <td>
                    <button onClick={() => handleCancel(application.applicationID)} style={{ padding: '8px 25px', cursor: 'pointer', borderRadius: '10px' }}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ padding: '50px' }}>No application requests available for the current user.</p>
        )}
      </div>
    </>
  );
}

export default Request;
