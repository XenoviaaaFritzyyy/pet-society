<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 85875a44fc1d9d794419ea9e0a6cc985e6a2c445
import Navbar from './Navbar';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    setIsFavoriteClicked(!isFavoriteClicked);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* Container with flexbox styling */}
        <Card sx={{ maxWidth: 700 }}>
          <CardMedia
            component="img"
            height="450"
            image="/images/rob.jpg"
          />
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" color="text.primary">
                Shrimp and Chorizo Paella
              </Typography>
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavoriteClick}
                style={{ color: isFavoriteClicked ? 'red' : 'inherit' }}
              >
                <FavoriteIcon />
              </IconButton>
            </div>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* Additional actions if needed */}
          </CardActions>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* Container with flexbox styling */}
        <Card sx={{ maxWidth: 700 }}>
          <CardMedia
            component="img"
            height="450"
            image="/images/rob.jpg"
          />
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" color="text.primary">
                Shrimp and Chorizo Paella
              </Typography>
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavoriteClick}
                style={{ color: isFavoriteClicked ? 'red' : 'inherit' }}
              >
                <FavoriteIcon />
              </IconButton>
            </div>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* Additional actions if needed */}
          </CardActions>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* Container with flexbox styling */}
        <Card sx={{ maxWidth: 700 }}>
          <CardMedia
            component="img"
            height="450"
            image="/images/rob.jpg"
          />
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" color="text.primary">
                Shrimp and Chorizo Paella
              </Typography>
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavoriteClick}
                style={{ color: isFavoriteClicked ? 'red' : 'inherit' }}
              >
                <FavoriteIcon />
              </IconButton>
            </div>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* Additional actions if needed */}
          </CardActions>
        </Card>
      </div>
    </>
  );
}

export default Gallery;
