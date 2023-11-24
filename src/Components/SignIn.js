import React, {useState} from 'react';
import { Button, Checkbox, TextField, FormControlLabel, Grid, Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import '../Css/signin.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(""); // State to store error messages

  const { userID, setUserID } = useAuth();

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

        // Check if the 'userId' property is present in the response data
        if ('userId' in responseData) {
          const userID = responseData.userId;
          setUserID(userID); // Set the userID in the state
          setIsLoggedIn(true);
          console.log("Login successful");
          console.log("User ID:", userID);
        } else {
          // Handle the case where 'userId' is not present in the response
          console.error("User ID not found in the response");
        }
      } else {
        // Handle login error
        const data = await response.json();
        setError("Invalid email or password"); // Set an appropriate error message
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again later.");
    }
  };

  if (isLoggedIn) {
    // Check if the logged-in user is the admin
    if (email === 'admin@gmail.com') {
      // Use Navigate to navigate to Admin component if the user is the admin
      return <Navigate to="/admin" />;
    } else if (userID !== null) {
      // Use Navigate to navigate to Home component for regular users only if userID is not null
      return <Navigate to="/home" />;
    }
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
              label="Remember me"
            />
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
                }}
              >
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