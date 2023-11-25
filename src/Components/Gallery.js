import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';


function Gallery() {
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavoriteClicked(!isFavoriteClicked);
  };


  const [formData, setFormData] = useState({
    galID: '',
    description: '',
    photo_path: '',
    isDeleted: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted!", formData);
  };



  const handleAddGallery = async () => {
    try {
      // Check if formData is valid
      if ( !formData.description.trim()) {
        alert("Description cannot be empty");
        return;
      }
  
      // Display a confirmation dialog
      if (window.confirm("Are you sure you want to add this picture?")) {
        const formDataToSend = new FormData();
  
        // Append each property to formDataToSend
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });
        
        
        const response = await fetch('http://localhost:8080/gallery/insertGallery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formDataToSend)),
        });
  
        // Handle the response accordingly
        if (response.ok) {
          console.log('Gallery added successfully!');
          const data = await response.json();
  
          const formDataForImage = new FormData();
          formDataForImage.append('image', formData.photo_path);
  
          console.log(data.galID);
          const image = await fetch(`http://localhost:8080/gallery/insertGallery/${data.galID}`, {
            method: 'POST',
            body: formDataForImage,
          });
  
          // Handle the image upload response accordingly
          if (image.ok) {
            console.log('Image uploaded successfully!');
            // You might want to redirect or update state here
          } else {
            console.error('Error uploading image:', image.statusText);
          }
        } else {
          console.error('Error adding pet profile:', response.statusText);
        }
      } else {
        console.log("Gallery addition canceled");
      }
    } catch (error) {
      console.error('Error adding Gallery picture:', error.message);
    }
  };



  return (
    <>
      <Navbar />
    <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <form onSubmit={handleFormSubmit} id="gallery-profile-form" encType="multipart/form-data">
        <div style={{ maxWidth: 750, margin: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <img src="/images/RobFinal.jpg" alt="User Profile" className="user-profile-image" style={{ width: '45px', height: '45px' }} />
            <input
              type="text"
              name="description"
              value={formData.description}
              placeholder="Whats on your mind"
              onChange={handleInputChange}
              style={{ width: '500px', height: '54px', borderRadius: '8px', border: '.1px solid #27374D', paddingLeft: '24px', fontSize: '18px', color: '#828282' }}
            />
            <label htmlFor="file" style={{ backgroundColor: 'white', color: '#27374D', borderRadius: '8px', border: '.1px solid #27374D', display: "flex", width: 150, whiteSpace: "nowrap", fontSize: "10" }}>
              Add Photo
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, photo_path: e.target.files[0] })}
                style={{ display: 'none' }}
              />
            </label>
            <button
              type="button"
              className="Petprofile-Add"
              onClick={handleAddGallery}
              style={{ backgroundColor: 'white', color: '#27374D', borderRadius: '8px', border: '.1px solid #27374D', display: "flex", width: 150, whiteSpace: "nowrap", fontSize: "10" }}
            >
              <span className="btnAdd">POST</span>
            </button>
          </div>
        </div>
      </form>
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
    </>
  );
}

export default Gallery;
