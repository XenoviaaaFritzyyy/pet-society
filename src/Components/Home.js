import React from "react";
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom'; // Change import

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import '../Css/Home.css';
import Dictionary from './Dictionary';
import Gallery from './Gallery';
import AboutUs from './Aboutus';

function Home() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dictionary' element={<Dictionary />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/aboutus' element={<AboutUs />} />
      </Routes>
      <div className="home-container">
        <Paper className="home-paper">
          <Grid container spacing={25}>
            <Grid item xs={1.4}>
              <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Colour</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={1.4}>
              <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Colour</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Colour</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={1.4}>
              <Button variant="contained" color="primary">
                Button 4
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary">
                Button 5
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

export default Home;
