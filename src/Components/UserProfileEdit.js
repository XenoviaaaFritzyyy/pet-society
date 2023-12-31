import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useAuth } from '../Components/AuthContext';

const UserProfileEdit = () => {
  const navigate = useNavigate();
  const { userID, setUserID } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    gender: '',
    address: '',
    contact: '',
    photo_path: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    }

    document.body.style.background = '#27374D';

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

    if (userID) {
      fetchUserProfile();
    }

    return () => {
      document.body.style.background = '';
    };
  }, [userID, setUserID, setProfileInfo]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    setOpenDialog(true);
  };

  const handleCancelUpdate = () => {
    setOpenDialog(false);
    console.log('User profile update canceled');
  };

  const handleConfirmUpdate  = async () => { 
    setOpenDialog(false);

      try {
        // Create FormData for user data
        const updatedUserData = {
          userID,
          fname: profileInfo.fname,
          lname: profileInfo.lname,
          email: profileInfo.email,
          gender: profileInfo.gender,
          address: profileInfo.address,
          contact: profileInfo.contact,
        };

        const updateResponse = await fetch(`http://localhost:8080/user/updateUser?userID=${userID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUserData),
        });

        if (updateResponse.ok) {
          navigate("/userprofile");

          if (selectedImage) {
            const formDataForImage = new FormData();
            formDataForImage.append('image', selectedImage);
            const imageResponse = await fetch(`http://localhost:8080/user/insertUser/${userID}`, {
              method: 'POST',
              body: formDataForImage,
            });

            if (imageResponse.ok) {
              console.log('Image uploaded successfully!');
            } else {
              console.error('Error uploading image:', imageResponse.statusText);
            }
          }
        } else {
          const updateData = await updateResponse.json();
          console.error('Failed to update user profile', updateData);
          alert('Failed to update user profile');
        }
      } catch (error) {
        console.error('Error during updating user profile:', error);
        alert('An error occurred during updating user profile. Please try again later.');
      }     
  };

  

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
        <div className="admin-form pet-profile" style={{ maxWidth: '580px', margin: '0 auto' }}>
          <div className="details-pet">
            <span className="title">My Profile</span>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'center',
                borderRadius: '38px',
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
              }}>

              <img src={selectedImage ? URL.createObjectURL(selectedImage) : (profileInfo.photoPath ? `http://localhost:8080/user/${profileInfo.photoPath}` : "/images/default-pic.jpg")}
                alt="User Profile"
                className="user-profile-image"
                style={{
                  width: '100px',
                  height: '100px',
                  marginRight: '20px',
                  objectFit: 'cover', 
                  borderRadius: '50%',
                  border: '2px solid #27374D',
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
                  Upload Photo
                  <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                </Button>
              </div>
            </Box>
          </div>

          <div className="details-pet" style={{ paddingTop: '20px' }} >
            <span className="title">Personal Information</span>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'center',
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
                sx={{ width: '250px' }} 
              />

              <TextField
                id="last-name"
                label="Last Name"
                variant="standard"
                sx={{ marginLeft: '20px', width: '250px' }} 
                value={profileInfo.lname}
                onChange={(e) => setProfileInfo({ ...profileInfo, lname: e.target.value })}
              />
            </Box>
          </div>

          <div className="details-pet" style={{ paddingTop: '5px' }} >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'center', 
                borderRadius: '38px',
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
                marginTop: '20px'
              }}>
              <TextField
                id="email"
                label="Email"
                variant="standard"
                sx={{ width: '520px' }} 
                value={profileInfo.email}
                onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
              />  
            </Box>
          </div>

          <div className="details-pet" style={{ paddingTop: '5px' }} >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'center', 
                borderRadius: '38px',
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
                marginTop: '20px'
              }}>
              <TextField
                id="address"
                label="Address"
                variant="standard"
                sx={{ width: '520px'}}
                value={profileInfo.address}
                onChange={(e) => setProfileInfo({ ...profileInfo, address: e.target.value })}
                />
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
                marginTop: '20px'
              }}>

              <TextField
                id="contact-number"
                label="Contact Number"
                variant="standard"
                sx={{ width: '250px' }} 
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
                    marginTop: '20px',
                    fontSize: 10,
                  }}>
                  Cancel Changes
                </Button>
                </Link>
                
                
                <Button
                component="label"
                color="primary"
                variant="contained"
                onClick={handleUpdateProfile}
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
                  marginTop: '20px',
                  marginLeft: '240px', 
                }}>
                Save Changes
              </Button>
            </Box>
          </div>
        </div>
      </form>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update your profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelUpdate} color="primary" style={{ backgroundColor: 'red', color: 'white' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmUpdate} color="primary" autoFocus style={{  backgroundColor: 'green', color: 'white' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfileEdit;