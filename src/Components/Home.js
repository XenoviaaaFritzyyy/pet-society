import React from "react";
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, autocompleteClasses } from '@mui/material';
import { Button } from "@mui/material";


import '../Css/Home.css';
import Dictionary from './Dictionary';
import Gallery from './Gallery';
import AboutUs from './Aboutus';


function Home() {
  

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact component={Home} />
          <Route path='/dictionary' component={Dictionary} />
          <Route path='/gallery' component={Gallery} />
          <Route path='/aboutus' component={AboutUs} />
        </Routes>
      </Router>
      <div className="home-container">
        <div className="home-buttons">
        <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    marginLeft: '800px',
                    marginRight: '20px',
                    width: '100px',
                    borderRadius: '50px',
                    border: '.1px solid #27374D',
                    backgroundColor: 'white',
                    color: '#27374D',
                    '&:hover': { backgroundColor: '#142132' },
                  }}>
                  Reset
           </Button>
        <Button   
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '150px',
                    marginRight:'10px',
                    borderRadius: '50px',
                    backgroundColor: '#27374D',
                    color: 'white',
                    '&:hover': { backgroundColor: '#142132' },
                  }}>
                  Search
           </Button>
           
        </div>
           
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
