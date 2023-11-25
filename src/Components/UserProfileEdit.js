// UserProfileEdit.js
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import '../Css/UserProfileEdit.css'; // You can create a separate CSS file for additional styling

const UserProfileEdit = () => {
  return (
    <div className="box-container">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4} component={Paper} className="profile-pic">
          {/* Content for profile-pic */}
          <Typography variant="h6">Profile Picture</Typography>
        </Grid>

        <Grid item xs={12} sm={4} component={Paper} className="personal-infos">
          {/* Content for personal-infos */}
          <Typography variant="h6">Personal Information</Typography>
        </Grid>

        <Grid item xs={12} sm={4} component={Paper} className="password-container">
          {/* Content for password-container */}
          <Typography variant="h6">Password</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfileEdit;