import React from 'react';
import { Button, Checkbox, TextField, FormControlLabel, Grid, Box } from '@mui/material';
import '../Css/signup.css';

function SignUp() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="75vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
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
              <p>Already have an account? </p>
              <p>
                <a href="/signup" style={{ textDecoration: 'none', color: '#27374D' }}>
                  Sign In
                </a>
              </p>
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

export default SignUp;
