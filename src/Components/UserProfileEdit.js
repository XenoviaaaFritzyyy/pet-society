import React, { useState, useEffect} from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import { useAuth } from '../Components/AuthContext';

const UserProfileEdit = () => {
  const { userID, setUserID } = useAuth(); 

  // State for profile information
  const [profileInfo, setProfileInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    gender: '',
    address: '',
    contact: '',
  });

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    }
  
    document.body.style.background = '#27374D';
  
    // Fetch user profile information
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/user/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setProfileInfo(data);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error during user profile fetch:', error);
      }
    };
  
    // Fetch profile only if userID is available
    if (userID) {
      fetchUserProfile();
    }
  
    return () => {
      document.body.style.background = '';
    };
  }, [userID, setUserID, setProfileInfo]);
  

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  return (
    <div className="box-container">
      <form action="#" id="pet-profile-form" encType="multipart/form-data">
        <div className="admin-form pet-profile" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="details-pet">
            <span className="title">My Profile</span>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', // Align items horizontally
                alignItems: 'center', // Center items vertically
                borderRadius: '38px',
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
              }}>

              <img
                src="/images/RobFinal.jpg"
                alt="User Profile"
                className="user-profile-image"
                style={{
                  width: '100px',
                  height: '100px',
                  marginRight: '20px',
                  objectFit: 'cover', 
                  borderRadius: '50%',
                }}/>

              <div>
                <Button
                  component="label"
                  color="primary"
                  variant="contained"
                  startIcon={<AddPhotoIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: '#27374D',
                    '&:hover': {
                      backgroundColor: '#142132',
                      color: 'white',
                    },
                    borderRadius: '8px',
                    border: '.1px solid #27374D',
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    fontSize: 10,
                    marginTop: '10px',
                  }}>
                  Change Photo
                  <VisuallyHiddenInput type="file" />
                </Button>
              </div>
            </Box>
          </div>

          <div className="details-pet" style={{ paddingTop: '50px' }} >
            <span className="title">Personal Information</span>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', // Align items horizontally
                alignItems: 'center', // Center items vertically
                borderRadius: '38px',
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
                marginTop: '20px'
              }}>

<TextField
  id="first-name"
  label="First Name"
  variant="standard"
  value={profileInfo.fname}
  onChange={(e) => setProfileInfo({ ...profileInfo, fname: e.target.value })}
  sx={{ width: '250px' }} // Adjust the width as needed
/>

<TextField
  id="last-name"
  label="Last Name"
  variant="standard"
  sx={{ marginLeft: '20px', width: '250px' }} // Adjust the width as needed
  value={profileInfo.lname}
  onChange={(e) => setProfileInfo({ ...profileInfo, lname: e.target.value })}
/>

<TextField
  id="email"
  label="Email"
  variant="standard"
  sx={{ marginLeft: '20px', width: '300px' }} // Adjust the width as needed
  value={profileInfo.email}
  onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
/>

            </Box>
          </div>

          <div className="details-pet" >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', // Align items horizontally
                alignItems: 'center', // Center items vertically
                borderRadius: '38px',
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
                marginTop: '20px'
              }}>

              <TextField
                id="address"
                label="Address"
                variant="standard"
                sx={{ width: '380px'}}
                value={profileInfo.address}
                onChange={(e) => setProfileInfo({ ...profileInfo, address: e.target.value })}
                />

              <TextField
                id="contact-number"
                label="Contact Number"
                variant="standard"
                sx={{ marginLeft: '20px', width: '250px' }} 
                value={profileInfo.contact}
                onChange={(e) => setProfileInfo({ ...profileInfo, contact: e.target.value })}
              />

            <FormControl variant="standard" sx={{ marginLeft: '20px', width: '250px' }}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                label="Gender"
                id="gender"
                displayEmpty
                value={profileInfo.gender}
                onChange={(e) => setProfileInfo({ ...profileInfo, gender: e.target.value })}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            </Box>
          </div>

          <div className="details-pet" style={{ paddingTop: '50px' }} >
            <span className="title">Password</span>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', // Align items horizontally
                alignItems: 'center', // Center items vertically
                borderRadius: '38px',
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
              }}>
              <TextField id="current-password" label="Current Password" variant="standard" sx={{ width: '250px' }} />
              <TextField id="new-password" label="New Password" variant="standard" sx={{ marginLeft: '20px', width: '250px' }}/>
              
            </Box>
          </div>

          <div className="details-pet" >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'center',
                borderRadius: '38px',
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
                padding: '10px',
              }}
            >
              <Link to="/userprofile" style={{ textDecoration: 'none'}}>
                <Button
                  component="label"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: 'white',
                    color: '#27374D',
                    '&:hover': {
                      backgroundColor: '#142132',
                      color: 'white',
                    },
                    borderRadius: '8px',
                    border: '.1px solid #27374D',
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    fontSize: 10,
                    marginTop: '50px',
                  }}>
                  Cancel Changes
                </Button>
                </Link>

                <Button
                  component="label"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: 'white',
                    color: '#27374D',
                    '&:hover': {
                      backgroundColor: '#142132',
                      color: 'white',
                    },
                    borderRadius: '8px',
                    border: '.1px solid #27374D',
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    fontSize: 10,
                    marginTop: '50px',
                    marginLeft: '570px'
                  }}
                >
                  Save Changes
                </Button>
            </Box>
          </div>

        </div>
      </form>
    </div>
  );
};

export default UserProfileEdit;