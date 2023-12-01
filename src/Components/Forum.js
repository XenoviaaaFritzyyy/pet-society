import React, { useState, useEffect } from 'react';
import { Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Box, 
    Button, 
    Container, 
    Paper, 
    TextField, 
    Typography, } from '@mui/material';
import Navbar from './Navbar';
import { useAuth } from '../Components/AuthContext';

function Forum() {

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
        // Save userID to local storage when it changes
    if (userID) {
        localStorage.setItem('userID', userID);
    }
    }, [userID]);

    useEffect(() => {
    // Retrieve userID from local storage when the component mounts
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      // Set the userID from local storage
        setUserID(storedUserID);
    }
    }, []);

    return (
        <>
        <Navbar />
        <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Container maxWidth="md" 
            style={{ background: '#FFFFFF', 
            padding: '20px', 
            borderRadius: '10px', 
            marginBottom: '20px', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center' }}>
        <h1 className="postLabel" style={{ color: '#000000', textAlign: 'center' }}>
            Welcome to Forums
        </h1>
        <textarea
            id="postni"
            className="postTextArea"
            rows={2}
            style={{
            background: '#27374D',
            fontSize: '16px',
            padding: '10px',
            width: '100%',
            borderRadius: '8px',
            marginBottom: '10px',
            resize: 'none',
            textAlign: 'center',
            color: '#DDE6ED'
            }}
            placeholder="Something on your mind?"
        />
            <div className="postButton" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#27374D',
                        color: 'white',
                        '&:hover': {
                        backgroundColor: '#142132',
                        color: 'white' 
                        },
                    marginRight: '10px',
                    }} >
                    Post
                </Button>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#27374D',
                        color: 'white',
                        '&:hover': {
                        backgroundColor: '#142132',
                        color: 'white' 
                        },
                    }} >
                    Clear
                </Button>
            </div>
        </Container>

        <Paper elevation={3} style={{ textAlign: 'left', padding: '10px', 
            width: '80%', margin: '10px auto', position: 'relative' }}>
            <img src={profileInfo.photoPath ? `http://localhost:8080/user/${profileInfo.photoPath}` 
                : "/images/default-pic.jpg"}
                alt="User Profile" className="user-profile-image" 
                style={{ width: '55px', height: '50px', objectFit: 'cover',
                borderRadius: '50%',
                }} />
                <h3 style={{ color: '#27374D', fontWeight: 'bold' }}>{profileInfo.fname} {profileInfo.lname}</h3>
                <h5 style={{ fontStyle: 'italic', color: '#27374D' }}>Sample forum</h5>
            <Button
                variant="contained"
                color="error"
                style={{ fontSize: '11px', backgroundColor: '#27374D',
                color: 'white',
                '&:hover': {
                backgroundColor: '#142132',
                color: 'white' 
                }, 
                position: 'absolute', top: 12, right: 8 }} >
                Delete
            </Button>
            <Accordion style={{ background: '#27374D', color: '#FFFFFF' }}>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Replies</Typography>
                </AccordionSummary>
            <AccordionDetails style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', 
                    flexDirection: 'column', alignItems: 'flex-start' }}>
                <>
                <TextField
                    label="Your Reply"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={1}
                    InputLabelProps={{ style: { color: 'white' } }}
                    inputProps={{ style: { color: 'white' } }} />
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button variant="contained"
                            style={{ display: 'flex', backgroundColor: 'white',
                                    color: '#27374D', '&:hover': { backgroundColor: '#142132', color: 'white' 
                                    },
                                    justifyContent: 'flex-start', alignItems: 'center' }}>
                                    Reply
                        </Button>
                    </Box>
                </>
                <>
                    <Paper style={{ margin: '5px', padding: '10px',
                            textAlign: 'left',  background: 'white' }} elevation={1}>
                        <Button
                            variant="contained"
                            color="error"
                            style={{
                                backgroundColor: '#27374D',
                                color: 'white',
                                '&:hover': {
                                backgroundColor: '#142132',
                                color: 'white' 
                                }, 
                                }} >
                            Delete Reply
                        </Button>
                        <h2 style={{ color: '#001858', fontWeight: 'bold' }}>Sample username</h2>
                        <h5 style={{ fontStyle: 'italic', color: '#001858' }}>Sample reply</h5>
                    </Paper>
                </>
                <>No Replies Yet</>
            </AccordionDetails>
            </Accordion>
        </Paper>

        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <Button
                style={{ color: '#27374D' }} >
                Prev Page
            </Button>
        <Box mx={2}>|</Box>
            <Button
                style={{ color: '#27374D' }} >
                Next Page
            </Button>
        </Box>
        </div>
        </>
    );
}

export default Forum;