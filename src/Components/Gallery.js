import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import GalleryCard from "./GalleryCard";
import '../Css/Gallery.css';


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
          console.error('Error adding Gallery:', response.statusText);
        }
      } else {
        console.log("Gallery addition canceled");
      }
    } catch (error) {
      console.error('Error adding Gallery picture:', error.message);
    }
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


      <div className="content-container" style={{ display: 'block', flexWrap:"wrap"}}>
        {gallerys.map(gallery=> (
            <GalleryCard galId={gallery.galID} name={gallery.name} description={gallery.description} image={gallery.photoPath} />
        ))}
      </div>
    </>
  );
}

export default Gallery;
