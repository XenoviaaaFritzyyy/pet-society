import React, { useState } from 'react';
import { Button, Checkbox, TextField, IconButton, Grid, Box, MenuItem, InputAdornment, FormControlLabel } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';

import '../Css/signup.css';

function SignUp() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false); // New state to track account creation status

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [contactError, setContactError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
  
    // Validation checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    const contactRegex = /^\d{11}$/;
  
    setEmailError(null);
    setPasswordError(null);
    setContactError(null);

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
  
    if (!passwordRegex.test(password)) {
      setPasswordError("Password should be 8 characters or more with at least one uppercase letter");
      return;
    }
  
    if (!contactRegex.test(contact)) {
      setContactError("Contact should be in this format 09555432143");
      return;
    }
  
    console.log("Submitting:", { firstname, lastname, email, password, gender, contact, address });
  
    try {
      const response = await fetch("http://localhost:8080/user/insertUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: firstname, lname: lastname, email, password, gender, contact, address
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
    return <Navigate to="/home" />;
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
          }}>
          <h1 style={{color: '#27374D'}}>Sign Up</h1>
          <form onSubmit={handleSignup}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstname"
                  label="First Name"
                  required
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  margin="normal"/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastname"
                  label="Last Name"
                  required
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  margin="normal"/>
              </Grid>
            </Grid>

            <TextField
              id="address"
              label="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              margin="normal"/>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                id="gender"
                label="Gender"
                required
                fullWidth
                margin="normal"
                select
                value={gender}
                onChange={handleGenderChange}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="contact"
                  label="Contact"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  fullWidth
                  margin="normal"
                  sx={{
                    borderColor: contactError ? 'red' : undefined,
                  }}/>

              {/* Display contact error message */}
              {contactError && (
                <div style={{ color: 'red', marginTop: '2px', fontSize: '10px'  }}>
                  {contactError}
                </div>
            )}
              </Grid>
            </Grid>

            <TextField
              id="email"
              label="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
                borderColor: emailError ? 'red' : undefined,
              }}/>

            {/* Display email error message */}
            {emailError && (
              <div style={{ color: 'red', marginTop: '2px', fontSize: '10px' }}>
                {emailError}
              </div>
            )}

        <TextField
              id="password"
              label="Password"
              required
              value={password}
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      className="eye-icon" // Apply the eye-icon class
                      sx={{ color: '#27374D', fontSize: '1.5rem', '&:hover': { color: '#142132' } }}
                    >
                      {showPassword ? (
                        <img src="/images/eyeclose.png" alt="eye-close" className="eye-icon" />
                      ) : (
                        <img src="/images/eyeopen.png" alt="eye-open" className="eye-icon" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ borderColor: passwordError ? 'red' : undefined, }}
            />

            {/* Display password error message */}
            {passwordError && (
              <div style={{ color: 'red', marginTop: '2px', fontSize: '10px' }}>
                {passwordError}
              </div>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  required
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"/>
              }
              label="I accept the terms and conditions"/>

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
              }}>
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
