import React, { useState } from 'react';
import { Button, Checkbox, TextField, FormControlLabel, Grid, Box, IconButton, InputAdornment } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import '../Css/signin.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);

  const { userID, setUserID } = useAuth();
  const [userRole, setUserRole] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();

        if ('userId' in responseData && 'userRole' in responseData) {
          const userID = responseData.userId;
          const userRole = responseData.userRole;

          setUserID(userID);
          setUserRole(userRole);
          setIsLoggedIn(true);

          localStorage.setItem('userID', userID); 
        } else {
          console.error("User ID or User Role not found in the response");
        }
      } else {
        const data = await response.json();
        setError("Invalid email or password"); 
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  if (isLoggedIn) {
    if (userRole === 'admin') {
      return <Navigate to="/admin" />;
    } else if (userID !== null) {
      return <Navigate to="/home" />;
    }
  }

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
          <h1 style={{color: '#27374D'}}>Sign In</h1>
          <form onSubmit={handleLogin}>
            <TextField
              id="email"
              label="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
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
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"/>
            <div className="error-message" style={{color: 'red', textAlign: 'center'}}>{error}</div>
            <div style={{ textDecoration: 'none', color: 'inherit' }}>
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
                Sign In
              </Button>
            </div>
            <div className="centered-text">
              <p>Don't have an account?&nbsp;</p>
              <Link to="/signup" style={{ textDecoration: 'underline', color: '#27374D' }}>
                Sign Up
              </Link>
            </div>
            <br />
            <br />
            <div className="centered-text1">
              <p>Copyright @ Pet Society 2023</p>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignIn;