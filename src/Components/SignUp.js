import React from 'react';
import { Button, Checkbox, TextField, FormControlLabel, Grid, Box, MenuItem } from '@mui/material';
import Home from "./Home";
import { Link } from 'react-router-dom';

import '../Css/signup.css';

function SignUp() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isAccountCreated, setIsAccountCreated] = React.useState(false); // New state to track account creation status

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    console.log("Submitting:", { firstName, lastName, email, password, gender, contact, address});

    try {
      const response = await fetch("http://localhost:8080/user/insertUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName, lastName, email, password, gender, contact, address
        }),
      });

      if (response.ok) {
        // Signup successful, set isAccountCreated to true
        setIsAccountCreated(true);
        console.log("Signup successful");
      } else {
        // Handle signup error
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  if (isAccountCreated) {
    return <Home />;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="75vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            minHeight: '700px',
          }}
        >
          <h1 style={{color: '#27374D'}}>Sign Up</h1>
          <form onSubmit={handleSignup}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>

            <TextField
              id="address"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                id="gender"
                label="Gender"
                fullWidth
                margin="normal"
                select
                value={gender}
                onChange={handleGenderChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="contact"
                  label="Contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            <TextField
              id="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="I accept the terms and conditions"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: '100%',
                marginTop: '20px',
                borderRadius: '10px',
                backgroundColor: '#27374D',
                color: 'white',
                '&:hover': { backgroundColor: '#142132' },
              }}
            >
              Sign Up
            </Button>
            <div className="centered-text">
              <p>Already have an account?&nbsp;</p>
                <Link to="/signin" style={{ textDecoration: 'underline', color: '#27374D' }}>Sign In</Link>
            </div>
            <br /><br />
            <div className="centered-text1">
              <p>Copyright @ Pet Society 2023</p>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUp;
