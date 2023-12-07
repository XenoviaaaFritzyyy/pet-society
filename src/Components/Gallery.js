import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import GalleryCard from "./GalleryCard";
import '../Css/Gallery.css';
import { Card, CardContent } from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { useAuth } from '../Components/AuthContext';

function Gallery() {
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
    console.log("Form submitted!", formData);
  };

  const handleAddGallery = async () => {
    try {
      // Check if formData is valid
      if (!formData.description.trim()) {
        alert("Description cannot be empty");
        return;
      }
  
      // Display a confirmation dialog
      if (window.confirm("Are you sure you want to add this picture?")) {
        // Step 1: Insert overall information
        const responseInfo = await fetch(`http://localhost:8080/gallery/insertGallery?userId=${userID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        // Handle the response for overall information
        if (responseInfo.ok) {
          console.log('Gallery information added successfully!');
          const dataInfo = await responseInfo.json();
  
          // Step 2: Insert the image using the galleryID from the previous response
          const formDataForImage = new FormData();
          formDataForImage.append('image', formData.photo_path);
  
          const responseImage = await fetch(`http://localhost:8080/gallery/insertGallery/${dataInfo.galID}/${userID}`, {
            method: 'POST',
            body: formDataForImage,
          });
          
  
          // Handle the image upload response accordingly
          if (responseImage.ok) {
            console.log('Image uploaded successfully!');
            // You might want to redirect or update state here
          } else {
            console.error('Error uploading image:', responseImage.statusText);
          }
        } else {
          console.error('Error adding Gallery information:', responseInfo.statusText);
        }
      } else {
        console.log("Gallery addition canceled");
      }
    } catch (error) {
      console.error('Error adding Gallery:', error.message);
    }
  };
  

  const [gallerys, setGallerys] = React.useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("http://localhost:8080/gallery/getAllGallery");
        const data = await response.json();
  
        if (response.ok) {
          const filteredPets = data.filter((gallery) => !gallery.isDeleted);

          //const sortedPets = filteredPets.sort((a, b) => a.name.localeCompare(b.name));
          setGallerys(filteredPets);
        } else {
          console.error("Failed to fetch gallery:", data);
        }
      } catch (error) {
        console.error("Error during fetching gallery:", error);
      } finally {
      }
    };
  
    fetchGallery();
  }, []);

  const { userID, setUserID } = useAuth();
  const [profileInfo, setProfileInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    gender: '',
    address: '',
    contact: '',
  }); 

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/user/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setProfileInfo(data);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error during user profile fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchUserProfile();
    }
  }, [userID]);

  useEffect(() => {

    if (userID) {
      localStorage.setItem('userID', userID);
    }
  }, [userID]);

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);
  
  return (
    <>
      <Navbar />
      <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <form onSubmit={handleFormSubmit} id="gallery-profile-form" encType="multipart/form-data">
          <Card sx={{ maxWidth: 800, margin: 'auto', borderRadius: '10px', }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <img 
              src={profileInfo.photoPath ? `http://localhost:8080/user/${profileInfo.photoPath}` : "/images/default-pic.jpg"}
              alt="User Profile" 
              className="user-profile-image" 
              style={{
                width: '55px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />

              <input
                type="text"
                name="description"
                value={formData.description}
                placeholder="Whats on your mind"
                onChange={handleInputChange}
                style={{
                  width: '500px',
                  height: '54px',
                  borderRadius: '8px',
                  border: '.1px solid #27374D',
                  paddingLeft: '24px',
                  fontSize: '18px',
                  color: '#828282',
                  backgroundColor: '#fff',
                }}
              />
              <label
                htmlFor="file"
                className="file-label"
              >
                <AddPhotoIcon style={{ marginRight: '5px' }} />
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
              >
                <span className="btnAdd">POST</span>
              </button>
            </CardContent>
          </Card>
        </form>
      </div>
  
      <div className="gallery-container" style={{ display: 'block', flexWrap: "wrap" }}>
      {gallerys.map(gallery => (
        <GalleryCard key={gallery.galID} galID={gallery.galID} name={gallery.name} description={gallery.description} image={gallery.photoPath} />
      ))}
      </div>
    </>
  );
  
}

export default Gallery;
