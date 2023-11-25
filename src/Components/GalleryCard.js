import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

const GalleryCard = ({ galID, name, image, description }) => {
    const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavoriteClicked(!isFavoriteClicked);
    };


    return (
        <Card 
        sx={{
            width: '740px', // Set your desired width
            height: 'auto', // Set your desired height
            marginBottom: '20px',
            borderRadius: '10px',
          }}
        >
            <CardMedia
                component="img"
                height="450"
                width={"100%"}
                image={image ? `http://localhost:8080/gallery/${image}` : "/images/logo.png"}
            />
            <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        {name}
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
                {description}
                </Typography>
            </CardContent>
          <CardActions disableSpacing>
            {/* Additional actions if needed */}
          </CardActions>
        </Card>
        );
};
export default GalleryCard;