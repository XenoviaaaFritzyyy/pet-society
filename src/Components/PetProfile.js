import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "@mui/material";
import '../Css/PetProfile.css';

function PetProfile() {
  const { petId } = useParams();
  const [imageExists, setImageExists] = useState(false);
  const [petInfo, setPetInfo] = useState(null);
  const navigate = useNavigate();
  const petContainerRef = useRef(null);

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/pet/info/${petId}`);
        const data = await response.json();
        console.log(data);
        setPetInfo(data);
        console.log(petInfo);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };
    fetchPetInfo();
  }, [petId]);

 
  const handleDocumentTouch = (e) => {
    if (petContainerRef.current && !petContainerRef.current.contains(e.target)) {
      setPetInfo(null);
      navigate('/home');
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentTouch);

    return () => {
      document.removeEventListener("click", handleDocumentTouch);
    };
  }, [navigate]); 

  if (!petInfo) return <div>loading</div>;

  const handleAdopt = () => {
   
    console.log(`Adopting pet with ID: ${petId}`);
  };

  return (
    <>
      <div className='body'>
        <Navbar />
        <div className='Pethome-container' ref={petContainerRef}>
          <div className='Petcontent-container'>
            <div className='picture'>
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={petInfo.photoPath ? `http://localhost:8080/pet/${petInfo.photoPath}` : '/images/RobFinal.jpg'}
                alt={`Pet ${petId}`} />
            </div>
          </div>

          <div className='Petcontent2-container'>
            <div className="Pet-Labels">
              <p style={{fontSize: '30px', fontWeight: 'bold', color: '#27374D'}}>{petInfo?.name || "Pet Name"}</p>
              <p style={{margin: '15px 0', color:'#828282', fontWeight: 'bold'}}>D E S C R I P T I O N</p>
              <p style={{color: '#27374D', textAlign:'justify', marginRight: '25px'}}>{petInfo?.description || "Short description for the pet"}</p>
              <p style={{margin: '15px 0', color:'#828282', fontWeight: 'bold'}}>A B O U T</p>
                <p style={{color: '#27374D'}}>Age &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;{petInfo?.age || "N/A"} Months<br /> </p>
                <br />
                <p style={{color: '#27374D'}}>Color &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{petInfo?.color || "N/A"}<br /> </p>
                <br />
                <p style={{color: '#27374D'}}>Gender  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{petInfo?.gender || "N/A"}<br /> </p>
                <br />
                <p style={{color: '#27374D'}}>Size  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;{petInfo?.size || "N/A"}<br /> </p>
                <br />
                <p style={{color: '#27374D'}}>Vaccinated&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;{petInfo?.vaccinated || "N/A"}<br /> </p>
                <br />
                <p style={{color: '#27374D'}}>Temperament &emsp;&emsp;&emsp;&emsp;{petInfo?.temperament || "N/A"}<br /> </p>
                <br />
                <Link to={`/petprofile/${petId}/application`} style={{ textDecoration: 'none' }}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleAdopt}
                  sx={{
                    width: '250px',
                    borderRadius: '10px',
                    marginTop: '5px',
                    height: '45px',
                    backgroundColor: '#27374D',
                    color: 'white',
                    '&:hover': { backgroundColor: '#142132' },
                  }}>
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