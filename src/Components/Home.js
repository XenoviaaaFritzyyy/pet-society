import React, { useEffect, useState } from "react";
import { Button, MenuItem, FormControl, Select, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Navbar from './Navbar';
import '../Css/Home.css';
import PetCard from "./PetCard";
import { useAuth } from '../Components/AuthContext'; 


function Home() {
  const { userID, setUserID } = useAuth();
  
  const [colour, setColour] = useState('');
  const [sex, setSex] = useState('');
  const [size, setSize] = useState('');
  const [pets, setPets] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [triviaContent, setTriviaContent] = useState('');
  const [triviaTitle, setTriviaTitle] = useState('');
  const [triviaAuthor, setTriviaAuthor] = useState('');
  const [triviaCategory, setTriviaCategory] = useState('');
  const [loadingTrivia, setLoadingTrivia] = useState(true);

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    }
    
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
  
    setOpenDialog(true);
  }, [userID, setUserID]);
  
  useEffect(() => {
    const fetchRandomTrivia = async () => {
      try {
        const response = await fetch('http://localhost:8080/trivia/getRandomTriviaDetails');
        const data = await response.json();

        if (response.ok && data) {
          setTriviaTitle(data.title);
          setTriviaCategory(data.category);
          setTriviaAuthor(data.author);
          setTriviaContent(data.content);
        } else {
          console.error('Failed to fetch random trivia');
        }
      } catch (error) {
        console.error('Error fetching random trivia:', error);
      } finally {
        setLoadingTrivia(false);
      }
    };

    if (openDialog) {
      fetchRandomTrivia();
    }
  }, [openDialog]);

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
    console.log("Selected Colour:", colour);
    console.log("Selected Sex:", sex);
    console.log("Selected Size:", size);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Did you know?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {loadingTrivia ? (
              <p>Loading trivia...</p>
            ) : (
              <>
                Title: {triviaTitle}&emsp;
                Category: {triviaCategory}&emsp; 
                Author: {triviaAuthor}<br /><br />
                {triviaContent}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
