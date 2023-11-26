import React, { useState, useEffect } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button,} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const GalleryCard = ({ galID, name, image, description }) => {
    const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavoriteClicked(!isFavoriteClicked);
    };

    return (
        <Card 
        sx={{
            width: '740px',
            height: 'auto',
            marginBottom: '20px',
            borderRadius: '10px', }}
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
                <Button
                    color="primary"
                    variant="contained"
                    sx={{
                        backgroundColor: 'white',
                        color: '#27374D',
                        '&:hover': {
                        backgroundColor: '#142132',
                        color: 'white',
                        },
                        borderRadius: '8px',
                        border: '.1px solid #27374D',
                        marginLeft: 'auto',
                        display: 'flex',
                        width: 100,
                        whiteSpace: 'nowrap',
                        fontSize: 10,
                    }}
                    >
                    Delete
                    </Button>
            </CardContent>
        <CardActions disableSpacing>
            {/* Additional actions if needed */}
        </CardActions>
        </Card>
        );
};
export default GalleryCard;