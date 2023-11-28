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

    const [formData, setFormData] = useState({
        galID: '',
        description: '',
        photo_path: '',
        isDeleted: false
        });
        

    const handleFavoriteClick = () => {
        setIsFavoriteClicked(!isFavoriteClicked);
    };

    const [gallerys, setGallerys] = React.useState([]);

    useEffect(() => {
        const fetchGallery = async () => {
        try {
            const response = await fetch("http://localhost:8080/gallery/getAllGallery");
            const data = await response.json();
    
            if (response.ok) {
            // Filter out pets where is_deleted is true
            const filteredPets = data.filter((gallery) => !gallery.deleted);

            //const sortedPets = filteredPets.sort((a, b) => a.name.localeCompare(b.name));
            setGallerys(filteredPets);
            } else {
            console.error("Failed to fetch gallery:", data);
            }
        } catch (error) {
            console.error("Error during fetching gallery:", error);
        } finally {
          // You might want to add additional logic here if needed
        }
        };
    
        fetchGallery();
    }, []);

    const handleDeleteGallery = async () => {
        console.log('Deleting gallery with ID:', galID);
        // Check if galID is provided
        if (!galID) {
            alert("galID cannot be empty for deleting");
            return;
        }
    
        // Display a confirmation dialog
        if (window.confirm("Are you sure you want to delete this Gallery?")) {
            try {
                // Check if the gallery exists in the database
                const response = await fetch(`http://localhost:8080/gallery/info/${galID}`);
                const data = await response.json();
    
                if (response.ok && data) {
                    // Gallery exists, proceed with "soft" delete
                    const deleteResponse = await fetch(`http://localhost:8080/gallery/deleteGallery/${galID}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            petID: galID,
                            deleted: true, // Mark as deleted
                        }),
                    });
    
                    if (deleteResponse.ok) {
                        // Gallery "soft" deleted successfully
                        console.log("Gallery marked as deleted successfully");
                        // You might want to redirect or update state here
                    } else {
                        console.error("Failed to mark Gallery as deleted:", deleteResponse.statusText);
                    }
                } else {
                    // Gallery does not exist, alert the user
                    alert(`Gallery with ID ${galID} does not exist`);
                }
            } catch (error) {
                console.error("Error during marking gallery as deleted:", error);
                // Handle the error accordingly
            }
        } else {
            console.log("Gallery deletion canceled");
        }
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
                    onClick={handleDeleteGallery}>
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