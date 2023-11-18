import React from "react";
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
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
      {/* <Router> */}
      <Navbar/>
        {/* <Routes>
          <Route path='/' exact component={Home} />
          <Route path='/dictionary' component={Dictionary} />
          <Route path='/gallery' component={Gallery} />
          <Route path='/aboutus' component={AboutUs} />
        </Routes>
      </Router> */}
      <div className="home-container">
        
        <div className="home-buttons">
        <FormControl sx={{ minWidth: 170, marginRight: 3, marginLeft: 5}} size="small">
  <InputLabel id="demo-select-small-label">Colour</InputLabel>
  <Select
    labelId="demo-select-small-label"
    id="demo-select-small"
    value={age}
    label="Colour"
    onChange={handleChange}
    sx={{ borderRadius: '15px' }} // Set the border radius here
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value={10}>Black</MenuItem>
    <MenuItem value={20}>White</MenuItem>
    <MenuItem value={30}>Brown</MenuItem>
  </Select>
</FormControl>
    <FormControl sx={{ minWidth: 170, marginRight: 3 }} size="small">
      <InputLabel id="demo-select-small-label">Colour</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Colour"
        onChange={handleChange}
        sx={{ borderRadius: '15px' }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Black</MenuItem>
        <MenuItem value={20}>White</MenuItem>
        <MenuItem value={30}>Brown</MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ minWidth: 170, }} size="small">
      <InputLabel id="demo-select-small-label">Colour</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Colour"
        onChange={handleChange}
        sx={{ borderRadius: '15px' }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Black</MenuItem>
        <MenuItem value={20}>White</MenuItem>
        <MenuItem value={30}>Brown</MenuItem>
      </Select>
    </FormControl>
    
        <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    marginLeft: '200px',
                    marginRight: '20px',
                    width: '120px',
                    borderRadius: '50px',
                    border: '.1px solid #27374D',
                    backgroundColor: 'white',
                    color: '#27374D',
                    '&:hover': { backgroundColor: '#142132', color: 'red' },
                  }}>
                  Reset
           </Button>
        <Button   
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '170px',
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