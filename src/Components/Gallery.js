import React, { useState } from "react";
import Navbar from './Navbar';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
      <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <Card sx={{ maxWidth: 750, margin: 'auto' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
        <img src="/images/RobFinal.jpg" alt="User Profile" className="user-profile-image" style={{ width: '50px', height: '50px' }} />
        <TextField
              label="What's on your mind?"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                sx: { fontFamily: 'YourFont', fontSize: 18, 
                color: '#828282', display: 'flex', alignItems: 'center', },
              }}  
              InputProps={{
                sx: { backgroundColor: '#fff', borderRadius: '38px', border: '1px transparent #828282', height: '54px' },
              }}
              sx={{ width: '83%' }}
            />
          <Button
            color="primary"
            variant="contained"
            sx={{ backgroundColor: 'white', color: '#27374D', '&:hover': { backgroundColor: '#142132', 
            color: 'white' }, borderRadius: '8px', border: '.1px solid #27374D', display:"flex", width: 150, 
            whiteSpace: "nowrap", fontSize: "10", fontWeight: "bold"}}
          >add photo
            
          </Button>
        </CardContent>
      </Card>
    </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        {/* Container with flexbox styling */}
        <Card sx={{ maxWidth: 700 }}>
          <CardMedia
            component="img"
            height="450"
            image="/images/rob.jpg"
          />
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>
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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
        {/* Container with flexbox styling */}
        <Card sx={{ maxWidth: 700 }}>
          <CardMedia
            component="img"
            height="450"
            image="/images/rob.jpg"
          />
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>
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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
        {/* Container with flexbox styling */}
        <Card sx={{ maxWidth: 700 }}>
          <CardMedia
            component="img"
            height="450"
            image="/images/rob.jpg"
          />
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>
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
