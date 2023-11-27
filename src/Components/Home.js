import React, { useEffect } from "react";
import Navbar from './Navbar';
import {Button, MenuItem, FormControl, Select } from '@mui/material';
import '../Css/Home.css';
import PetCard from "./PetCard";
import { useAuth } from '../Components/AuthContext'; 


function Home() {
  const { userID, setUserID } = useAuth();
  
  const [colour, setColour] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [size, setSize] = React.useState('');
  const [pets, setPets] = React.useState([]);

  useEffect(() => {
    // Retrieve userID from localStorage when the component mounts
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, [setUserID]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:8080/pet/getAllPets");
        const data = await response.json();
  
        if (response.ok) {
          console.log("userID: ", userID);
          // Filter out pets where is_deleted is true
          const filteredPets = data.filter((pet) => !pet.deleted);
          //const sortedPets = filteredPets.sort((a, b) => a.name.localeCompare(b.name));
          setPets(filteredPets);
        } else {
          console.error("Failed to fetch pets:", data);
        }
      } catch (error) {
        console.error("Error during fetching pets:", error);
      } finally {
        // You might want to add additional logic here if needed
      }
    };
  
    fetchPets();
  }, [userID]);
  


  const handleColourChange = (event) => {
    setColour(event.target.value);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleReset = () => {
    setColour('');
    setSex('');
    setSize('');
  };
  
  const handleSearch = () => {
    // Add your search logic here using the selected values (colour, sex, size)
    // For now, you can log the selected values to the console
    console.log("Selected Colour:", colour);
    console.log("Selected Sex:", sex);
    console.log("Selected Size:", size);
  };

  return (
    <>
      <Navbar />
      <div className="home-container" style={{marginTop: '20px'}}>
        <div className="home-buttons">
          <div>
            <h4 style={{marginLeft: '70px', marginBottom: '10px', color: '#27374D'}}>Colour</h4>
            <FormControl sx={{ minWidth: 220, marginRight: 3, marginLeft: 9 }}   size="small">
              <Select
                labelId="colour-label"
                id="colour"
                value={colour}
                label="Colour"
                onChange={handleColourChange}
                sx={{ borderRadius: '15px' }}
              >
                <MenuItem style={{ display: 'none' }} value="">
                  <em>None</em>
                </MenuItem> 
                <MenuItem value={10}>Black</MenuItem>
                <MenuItem value={20}>Blonde</MenuItem>
                <MenuItem value={30}>Brown / Tan</MenuItem>
                <MenuItem value={40}>White</MenuItem>
                <MenuItem value={50}>Others</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <h4 style={{marginBottom: '10px', color: '#27374D'}}>Gender</h4>
            <FormControl sx={{ minWidth: 220, marginRight: 3 }} size="small">
              <Select
                labelId="sex-label"
                id="sex"
                value={sex}
                label="Sex"
                onChange={handleSexChange}
                sx={{ borderRadius: '15px' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <h4 style={{marginBottom: '10px', color: '#27374D'}}>Size</h4>
            <FormControl sx={{ minWidth: 220, }} size="small">
              <Select
                labelId="size-label"
                id="size"
                value={size}
                label="Size"
                onChange={handleSizeChange}
                sx={{ borderRadius: '15px' }}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Small</MenuItem>
                <MenuItem value={20}>Medium</MenuItem>
                <MenuItem value={30}>Large</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleReset}
            sx={{
              marginLeft: '30px',
              marginRight: '10px',
              width: '100px',
              marginTop: '25px',
              height: '40px',
              borderRadius: '50px',
              border: '.1px solid #27374D',
              backgroundColor: 'white',
              color: '#27374D',
              '&:hover': { backgroundColor: '#142132', color: 'white' },
            }}>
            Reset
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              width: '150px',
              borderRadius: '50px',
              marginTop: '25px',
              height: '40px',
              backgroundColor: '#27374D',
              color: 'white',
              '&:hover': { backgroundColor: '#142132' },
            }}>
            Search
          </Button>
        </div>
      </div>
      <div className="content-container" style={{ display: 'flex', flexWrap:"wrap"}}>
        {pets.map(pet=> (
            <PetCard petId={pet.petID} name={pet.name} image={pet.photoPath} />
        ))}
      </div> 
    </>
  );
}

export default Home;
