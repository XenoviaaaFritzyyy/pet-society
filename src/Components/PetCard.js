// PetCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const PetCard = ({ petId, name, image, isLastInRow }) => {
  const marginRight = isLastInRow ? '0px' : '20px';

  return (
    <Link to={`/petprofile/${petId}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: '360px', // Set your desired width
          height: '300px', // Set your desired height
          marginRight,
          marginBottom: '20px',
          borderRadius: '10px',
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="235px" // Set your desired height for the image
            width="100%"
            image={image ? `http://localhost:8080/pet/${image}` : "/images/logo.png"}
            alt={name}
            style={{ backgroundColor: '#27374D' ,objectFit: 'cover' }} // Maintain aspect ratio and cover the container
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default PetCard;
