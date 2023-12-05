import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useAuth } from '../Components/AuthContext';
import { Link } from 'react-router-dom';

import '../Css/form1.css';

function RequestForm() {
  const { userID } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', text: '', action: null });


  const fetchApplications = async () => {
    try {
      const response = await fetch(`http://localhost:8080/application/getAllApplication`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
        setFilteredApplications(data);
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
        body: JSON.stringify({ status, message, isDeleted: false }),
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
      } else {
        console.error(`Failed to ${status.toLowerCase()} application`);
      }
    } catch (error) {
      console.error(`Error during application ${status.toLowerCase()}ion:`, error);
    }
  };

  const handleReject = (applicationID) => {
    setDialogContent({
      title: 'Reject Application',
      text: 'Are you sure you want to reject this application?',
      action: () => updateApplicationStatus(applicationID, 'Rejected', "We are sorry to inform you that your adoption request is rejected. Email us for more information.")
    });
    setOpenDialog(true);
  };

  const handleAccept = (applicationID) => {
    setDialogContent({
      title: 'Accept Application',
      text: 'Are you sure you want to accept this application?',
      action: () => updateApplicationStatus(applicationID, 'Accepted', "We are happy to inform you that your adoption request is accepted. Please check your email for follow-up.")
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogAction = () => {
    dialogContent.action();
    setOpenDialog(false);
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

        <div style={{textAlign:'center', marginTop: '50px'}}>
          <button onClick={() => handleStatusFilter('')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px' }}>All</button>
          <button onClick={() => handleStatusFilter('Pending')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Pending</button>
          <button onClick={() => handleStatusFilter('Accepted')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Accepted</button>
          <button onClick={() => handleStatusFilter('Rejected')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Rejected</button>
          <button onClick={() => handleStatusFilter('Cancelled')} style={{ margin: '0 5px', padding:'5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Cancelled</button>
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
                    {application.status === 'Pending' && (
                      <button onClick={() => handleReject(application.applicationID)} style={{ margin: '0 5px', padding: '5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Reject</button>
                    )}
                  </td>
                  <td>  
                    {application.status === 'Pending' && (
                      <button onClick={() => handleAccept(application.applicationID)} style={{ margin: '0 5px', padding: '5px 25px', cursor: 'pointer', borderRadius: '10px' }}>Accept</button>
                    )}
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
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RequestForm;
