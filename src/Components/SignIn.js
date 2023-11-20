import React from 'react';
import { Button, Checkbox, TextField, FormControlLabel, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../Css/signin.css';

function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false); // New state to track account creation status

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const response = await fetch("http://localhost:8080/api/acadzen/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        setIsLoggedIn(true);
      } else {
        // Handle login error
        const data = await response.json();
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login");
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    console.log("Submitting:", { email, username, password });

    try {
      const response = await fetch("http://localhost:8080/api/acadzen/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
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

    // Render Login component if isAccountCreated is true
    if (isAccountCreated) {
      return <Login />;
    }

    const handleSignUpClick = () => {
      setShowLogin(false);
    };

    if (isLoggedIn) {
      return <Dashboard />;
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
          <form onSubmit={handleSubmit}>
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
              label="Remember me"
            />
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button
                type="button"
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
            </Link>
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