import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Paper, TextField, Typography, } from '@mui/material';
import Navbar from './Navbar';
import { useAuth } from '../Components/AuthContext';
import { formatDistanceToNow } from 'date-fns';

// Helper function to adjust the time to your local time with a fixed offset
function formatDateTime(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
        return "Invalid Date";
    }

    // Add a fixed time offset of 15 hours (15 * 60 minutes, 60 seconds, 1000 milliseconds)
    date.setTime(date.getTime() + 15 * 60 * 60 * 1000);

    // Format the adjusted date
    return formatDistanceToNow(date, { addSuffix: true });
}

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

        <textarea
            id="postni"
            className="postTextArea"
            rows={2}
            style={{
            background: '#27374D',
            fontSize: '18px',
            padding: '10px',
            width: '100%',
            borderRadius: '8px',
            marginBottom: '10px',
            resize: 'none',
            textAlign: 'center',
            color: '#DDE6ED'
            }}
            placeholder="What's happening?"
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

        <Paper elevation={3} style={{ textAlign: 'left', padding: '10px', width: '80%', margin: '10px auto', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={profileInfo.photoPath ? `http://localhost:8080/user/${profileInfo.photoPath}` : "/images/default-pic.jpg"}
                    alt="User Profile"
                    className="user-profile-image"
                    style={{
                        width: '55px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginRight: '10px', // Add margin to separate image and text
                    }}
                />
                <div>
                    <h3 style={{ color: '#27374D', fontWeight: 'bold', margin: 0 }}>{profileInfo.fname} {profileInfo.lname}</h3>
                    <span className="time"> · {formatDateTime(profileInfo.date)}</span>
                    <h5 style={{ fontStyle: 'italic', color: '#27374D' }}>Sample forum</h5>
                </div>
            </div>
            <Button
                variant="contained"
                color="error"
                style={{
                    fontSize: '11px',
                    backgroundColor: '#27374D',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#142132',
                        color: 'white'
                    },
                    position: 'absolute',
                    top: 12,
                    right: 8
                }} >
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
                    placeholder="Post your Reply..."
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={1}
                    InputLabelProps={{ style: { color: 'white' } }}
                    inputProps={{ style: { color: 'white' } }} />
                    <Box mt={2} display="flex" justifyContent="right">
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

                        <h2 style={{ color: '#001858', fontWeight: 'bold' }}>
                            {profileInfo.fname} {profileInfo.lname}</h2>
                        <span className="time"> · {formatDateTime(profileInfo.date)}</span>
                        <h5 style={{ fontStyle: 'italic', color: '#001858' }}>Sample reply</h5>

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