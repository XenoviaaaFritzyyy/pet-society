import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from '@mui/material';
import '../Css/PetProfile.css';


function PetProfile() {
  const { petId } = useParams();
  const [imageExists, setImageExists] = useState(false);
  const [petInfo, setPetInfo] = useState(null);
  


  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/pet/info/${petId}`); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data)
        setPetInfo(data);
        console.log(petInfo)
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };
    fetchPetInfo()
  }, [petId]);

  if (!petInfo)
  return  <div>loading</div> 

  const handleAdopt = () => {
    // Add logic to handle adoption, such as making an API call to update the adoption status
    console.log(`Adopting pet with ID: ${petId}`);
  };

  return (
    <>
      <div className='body'>
        <Navbar />
        <div className='Pethome-container'>
          <div className='Petcontent-container'>
            <div className='picture'>
              {/* Render the image with a fallback to a default image */}
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={petInfo.photoPath ? `http://localhost:8080/pet/${petInfo.photoPath}` : '/images/RobFinal.jpg'}
                alt={`Pet ${petId}`}
              />  
            </div>
          </div>
          <div className='Petcontent2-container'>
            <div className="Pet-Labels">
              <h1>{petInfo?.name || "Pet Name"}</h1>
              <h3>DESCRIPTION</h3>
              <p>{petInfo?.description || "Short description for the pet"}</p>
              <h3>ABOUT</h3>
              <p>
                <h4>  Age: {petInfo?.age || "N/A"}<br /> </h4>
                <h4>  Color: {petInfo?.color || "N/A"}<br /> </h4>
                <h4>  Sex: {petInfo?.sex || "N/A"}<br /> </h4>
                <h4>  Size: {petInfo?.size || "N/A"}<br /> </h4>
                <h4>  Health Issues: {petInfo?.healthIssues || "N/A"}<br /> </h4>
                <h4>  Vaccinated: {petInfo?.vaccinated ? "Yes" : "No"}<br /> </h4>
                <h4> Temperament: {petInfo?.temperament || "N/A"}<br /> </h4>
                
              </p>
              <Link to="/Application" style={{ textDecoration: 'none' }}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleAdopt} 
                sx={{
                  width: '250px',
                  borderRadius: '10px',
                  marginTop: '5px',
                  height: '40px',
                  backgroundColor: '#27374D',
                  color: 'white',
                  '&:hover': { backgroundColor: '#142132' },
                }}
              >
                Adopt now
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetProfile;
