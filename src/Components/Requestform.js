import React, { useState, useEffect } from "react";
import { useAuth } from '../Components/AuthContext';
import { Link } from 'react-router-dom';

import '../Css/form1.css';

function RequestForm() {
  const { userID } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(''); // Default: no filter

  const fetchApplications = async () => {
    try {
      const response = await fetch(`http://localhost:8080/application/getAllApplication`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
        setFilteredApplications(data); // Initially set filtered applications to all applications
      } else {
        console.error('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error during application fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [userID]);

  useEffect(() => {
    // Apply status filter
    if (selectedStatus) {
      const filtered = applications.filter(application => application.status === selectedStatus);
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(applications);
    }
  }, [selectedStatus, applications]);

  const updateApplicationStatus = async (applicationID, status, message) => {
    try {
      const url = `http://localhost:8080/application/updateApplicationStatus/${applicationID}?status=${encodeURIComponent(status)}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, message }),
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

  const handleReject = async (applicationID) => {
    const confirmReject = window.confirm("Are you sure you want to reject this application?");
    if (confirmReject) {
      await updateApplicationStatus(applicationID, 'Rejected', "We are sorry to inform you that your adoption request is rejected. Email us for more information.");
    }
  };

  const handleAccept = async (applicationID) => {
    const confirmAccept = window.confirm("Are you sure you want to accept this application?");
    if (confirmAccept) {
      await updateApplicationStatus(applicationID, 'Accepted', "We are happy to inform you that your adoption request is accepted. Please check your email for follow-up.");
    }
  };

  const handleStatusFilter = (status) => {
    const normalizedStatus = status;
    console.log('Selected Status:', normalizedStatus);
    setSelectedStatus(normalizedStatus);

    const filtered = applications.filter(application => application.status.toUpperCase() === normalizedStatus);
    console.log('Filtered Applications:', filtered);
  };
  
  return (
    <>
      <div>
        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <button style={{ position: 'absolute', top: '25px', right: '50px', textDecoration: 'none', fontSize: '15px', padding: '8px 15px', borderRadius: '10px', color: '#27374D' }}>
            Back
          </button>
        </Link>

        <div className="request-status" style={{ marginTop: '20px' }}>
          <label style={{ marginLeft: '650px' }}>USER ID: </label>
          <input type="number" id="lname" name="lname" style={{ marginRight: '5px', marginBottom: '10px', padding: '5px', borderRadius: '5px', width: '60px' }} />
          <button style={{ borderRadius: '5px', padding: '3px' }}>search</button>
        </div>

        <div style={{textAlign:'center', marginTop: '20px'}}>
          <button onClick={() => handleStatusFilter('')}>All</button>
          <button onClick={() => handleStatusFilter('Pending')}>Pending</button>
          <button onClick={() => handleStatusFilter('Accepted')}>Accept</button>
          <button onClick={() => handleStatusFilter('Rejected')}>Reject</button>
        </div>


        <h2 style={{ textAlign: 'center', margin: '30px 0 20px 0', color: '#27374D' }}>All Applications</h2>
{loading ? (
  <p>Loading...</p>
) : (
  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "5px", fontSize: '12px' }}>
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
        <th>User ID</th>
        <th>Pet ID</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {applications.map(application => {
              if (!selectedStatus || application.status === selectedStatus) {
                return (
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
          <td>{application.user.userID}</td>
          <td>{application.pet.petID}</td>
          <td>{application.status}</td>
          <td>
            <button onClick={() => handleReject(application.applicationID)}>Reject</button>
            <button onClick={() => handleAccept(application.applicationID)}>Accept</button>
          </td>
        </tr>
            );
              } else {
            return null; 
          }
        })}
    </tbody>
  </table>
)}

        <h2 style={{ textAlign: 'center', margin: '30px 0 20px 0', color: '#27374D' }}>User Information</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "5px", fontSize: '12px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.applicationID}>
                  <td>{application.user.userID}</td>
                  <td>{application.user.fname}</td>
                  <td>{application.user.lname}</td>
                  <td>{application.user.address}</td>
                  <td>{application.user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2 style={{ textAlign: 'center', margin: '30px 0 20px 0', color: '#27374D' }}>Pet Information</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "5px", fontSize: '12px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Gender</th>
                <th>Color</th>
                <th>Size</th>
                <th>Age</th>
                <th>Temperament</th>
                <th>vaccinated</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.applicationID}>
                  <td>{application.pet.petID}</td>
                  <td>{application.pet.name}</td>
                  <td>{application.pet.description}</td>
                  <td>{application.pet.gender}</td>
                  <td>{application.pet.color}</td>
                  <td>{application.pet.size}</td>
                  <td>{application.pet.age}</td>
                  <td>{application.pet.temperament}</td>
                  <td>{application.pet.vaccinated}</td>
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
