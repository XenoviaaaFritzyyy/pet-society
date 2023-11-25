import React from 'react';
import { Box, Button } from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
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
          flexDirection: 'column',
          alignItems: 'center', // Center items horizontally
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
          style={{ width: '90px', height: '90px' }}
        />
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
            width: 150,
            whiteSpace: 'nowrap',
            fontSize: 10,
            marginTop: '10px',
          }}
        >
          Upload New
          <VisuallyHiddenInput type="file" />
        </Button>
      </Box>
    </div>
  </div>
</form>
  </div>
  );
};

export default UserProfileEdit;