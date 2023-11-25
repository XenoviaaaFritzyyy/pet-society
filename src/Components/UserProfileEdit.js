import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import '../Css/UserProfileEdit.css';

const UserProfileEdit = () => {

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

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  return (
    <div className="box-container">
      <form action="#" id="pet-profile-form" encType="multipart/form-data">
        <div className="admin-form pet-profile">
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
                padding: '10px',
                paddingTop: '20px',
                marginTop: '20px',
              }}
            >
              <img
                src="/images/RobFinal.jpg"
                alt="User Profile"
                className="user-profile-image"
                style={{
                  width: '90px',
                  height: '90px',
                  marginRight: '20px',
                  objectFit: 'cover', // or 'contain' based on your preference
                  borderRadius: '50%', // Optional: add this if you want a circular image
                }}
              />
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
                  }}
                >
                  Upload New
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
                padding: '10px',
                paddingTop: '20px',
                marginTop: '20px',
              }}
            >
              <TextField id="first-name" label="FirstName" variant="standard" />
              <TextField id="last-name" label="LastName" variant="standard" sx={{ marginLeft: '100px' }}/>
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
                padding: '10px',
              }}
            >
              <TextField id="email" label="Email" variant="standard" />
              <TextField id="contact-number" label="Contact Number" variant="standard" sx={{ marginLeft: '100px' }}/>
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
                padding: '10px',
              }}
            >
              <TextField id="address" label="Address" variant="standard" />
              <div className="input-field" style={{ marginLeft: '100px' }}>
                <label>Gender</label>
                <select
                  id="gender"
                  name="gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
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
                padding: '10px',
              }}
            >
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
                    marginTop: '10px',
                  }}
                >
                  Edit info
                </Button>
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
                    marginTop: '10px',
                    marginLeft: '210px' 
                  }}
                >
                  Save Changes
                </Button>
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
                padding: '10px',
                paddingTop: '20px',
                marginTop: '20px',
              }}
            >
              <TextField id="current-password" label="Current Password" variant="standard" />
              <TextField id="new-password" label="New Password" variant="standard" sx={{ marginLeft: '100px' }}/>
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
                padding: '10px',
              }}
            >
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
                    marginTop: '10px',
                  }}
                >
                  Confirm new Password
                </Button>

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
                    marginTop: '10px',
                    marginLeft: '120px' 
                  }}
                >
                  Save new Password
                </Button>
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
                padding: '10px',
              }}
            >
              <Link to="/userprofile">
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
                    marginTop: '10px',
                  }}
                >
                  Cancel Changes
                </Button>
                </Link>
            </Box>
          </div>

        </div>
      </form>
    </div>
  );
};

export default UserProfileEdit;