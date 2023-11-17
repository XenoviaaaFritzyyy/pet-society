import React from "react";
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        
      </div>
      <div className="content-container">
          <div className="content-1">
          <Card sx={{ maxWidth: 345, marginRight:'10px',marginLeft:'10px', borderRadius:'10px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="300"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, marginRight:'10px',marginLeft:'10px', borderRadius:'10px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="300"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, marginRight:'10px',marginLeft:'10px', borderRadius:'10px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="300"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </div>
          <div className="content-1">
          <Card sx={{ maxWidth: 345, marginRight:'10px',marginLeft:'10px', borderRadius:'10px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="300"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, marginRight:'10px',marginLeft:'10px', borderRadius:'10px'}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="300"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, marginRight:'10px',marginLeft:'10px', borderRadius:'10px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="300"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </div>
          <div className="content-1">
          <Card sx={{ maxWidth: 345, marginRight:'10px',marginLeft:'10px', borderRadius:'10px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="300"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, marginRight:'10px',marginLeft:'10px', borderRadius:'10px'}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="300"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, marginRight:'10px',marginLeft:'10px', borderRadius:'10px'   }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="300"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </div>
      </div>
    </>
  );
}

export default Home;
