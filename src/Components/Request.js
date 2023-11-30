import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import { useAuth } from '../Components/AuthContext';

function Request() {
  const [applications, setApplications] = useState([]);
  const { userID, setUserID } = useAuth();
  const [filteredUserID, setFilteredUserID] = useState('');

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

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    }

    fetchApplications();
  }, [userID, setUserID]);

  const handleFilter = (selectedUserID) => {
    setFilteredUserID(selectedUserID);
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>Application Requests for userID: {userID}</h2>

        {/* Add buttons for filtering */}
        <button onClick={() => handleFilter('')}>Show All</button>
        <button onClick={() => handleFilter(userID)}>Show My Applications</button>

        <table>
          <thead>
            <tr>
              <th>User ID</th>
                <th>Pet Name</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications
              .filter(application => filteredUserID ? application.user.userID === filteredUserID : true)
              .map(application => (
                <tr key={application.applicationID}>
                  <td>{application.user.userID}</td>
                  <td>{application.pet.name}</td>
                  <td>{application.message}</td>
                  <td>{application.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Request;
