// PetProfile.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import '../Css/PetProfile.css';

function PetProfile() {
  const { petId } = useParams();
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    const imageUrl = `/images/pets/${petId}.jpg`;

    // Function to check if the image exists
    const fileExists = (url) => {
      const img = new Image();
      img.src = url;

      return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    };

    // Check if the image exists
    fileExists(imageUrl).then((exists) => {
      setImageExists(exists);
    });
  }, [petId]);

  return (
    <>
      <div className='body'>
        <Navbar />
        <div className='Pethome-container'>
          <div className='Petcontent-container'>
            <div className='picture'>
              {/* Render the image with a fallback to a default image */}
              <img
                src={imageExists ? `/images/pets/${petId}.jpg` : '/images/Hazelyn.jpg'}
                alt={`Pet ${petId}`}
              />
            </div>
          </div>
          <div className='Petcontent2-container'>
            {/* Add content for Petcontent2-container */}
            <h2>Pet Details</h2>
            <p>This is where you can display details about the pet.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetProfile;
