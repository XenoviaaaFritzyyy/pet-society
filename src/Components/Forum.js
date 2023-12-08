import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useAuth } from '../Components/AuthContext';

function Forum() {
    const { userID, setUserID } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [forumEntries, setForumEntries] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedForumIDToDelete, setSelectedForumIDToDelete] = useState(null);

    useEffect(() => {
        const storedUserID = localStorage.getItem('userID');

        if (userID) {
            localStorage.setItem('userID', userID);
        } else if (storedUserID) {
            setUserID(storedUserID);
        }
    }, [userID]);

    const fetchEntries = async () => {
        try {
            const response = await fetch(`http://localhost:8080/forum/getAllForums`);
            if (response.ok) {
                const data = await response.json();
    
                if (Array.isArray(data)) {
                    const filteredEntries = data.filter(entry => !entry.isDeleted);
                    const sortedEntries = filteredEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
                    setForumEntries(sortedEntries);
                } else {
                    console.error('Invalid forum entries data:', data);
                    setForumEntries([]);
                }
            } else {
                console.error('Failed to fetch applications');
            }
        } catch (error) {
            console.error('Error during application fetch:', error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchEntries();
    }, [userID]);

    const formatTimestamp = (timestamp) => {
        if (!timestamp) {
            // Use the current time as a fallback when timestamp is null
            const currentDatetime = new Date();
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            };
            return currentDatetime.toLocaleString(undefined, options);
        }
    
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
    
        const formattedTimestamp = new Date(timestamp).toLocaleString(undefined, options);
        return formattedTimestamp;
    };
    

    const handleOpenConfirmation = () => {
        setConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setConfirmationOpen(false);
    };

    const handleConfirmSubmission = async () => {
        try {
            const dataToSend = {
                post: postContent,
                isDeleted: false,
            };
    
            const response = await fetch(`http://localhost:8080/forum/insertForum?userId=${userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (response.ok) {
                const newEntry = await response.json();
                setForumEntries(prevEntries => [newEntry, ...prevEntries]);
                handleResetForm();
            } else {
                const data = await response.json();
                setError('Failed to add entry');
                console.error('Failed to add entry', data);
            }
        } catch (error) {
            console.error('Error during adding of entry:', error);
            setError('An error occurred during adding of entry. Please try again later.');
        }
    
        handleCloseConfirmation();
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        handleOpenConfirmation();
    };

    const handleResetForm = () => {
        setPostContent('');
    };

    const handleDelete = (forumID) => {
        setDeleteConfirmationOpen(true);
        setSelectedForumIDToDelete(forumID);
    };    

    const handleConfirmDelete = async () => {
        try {
            await fetch(`http://localhost:8080/forum/deleteForum/${selectedForumIDToDelete}`, {
                method: 'PUT',
            });
            fetchEntries();
        } catch (error) {
            console.error('Error during forum entry deletion:', error);
        } finally {
            setDeleteConfirmationOpen(false);
            setSelectedForumIDToDelete(null);
        }
    };
    


    return (
        <>
            <Navbar />
            <div className='post-container' style={{ textAlign: 'center', color: '#27374D', padding: '50px', background: 'white', width: '80%', margin: '20px 0 50px 150px', borderRadius: '20px' }}>

                <h1>Welcome to Forums!</h1>
                <h3 style={{margin: '20px 0 10px 0'}}>Please share your concerns or suggestions to help make this platform better.</h3>

                <form onSubmit={handleSubmit}>
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        required
                        rows={5}
                        style={{
                            background: 'white',  
                            fontSize: '18px',
                            padding: '10px',
                            width: '100%',
                            borderRadius: '8px',
                            marginBottom: '10px',
                            resize: 'none',
                            textAlign: 'left',  
                            borderColor: '#27374D', 
                        }}
                        placeholder="What's happening?"/>    

                    <Button variant="contained" color="primary" style={{marginRight: '10px', marginLeft: '940px'}} onClick={handleResetForm}>
                        Clear
                    </Button>     
                    <Button type="submit" variant="contained" color="primary">
                        Post
                    </Button>
                </form>
            </div>

            {/* Display Forum Entries */}
            {forumEntries.map((entry) => (
                <div key={entry.forumID} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px', width: '80%', background: 'white', margin: '20px 0 20px 150px', borderRadius: '10px', padding: '20px 0 20px 25px' }}>
                    
                {/* Delete Button */}
                {String(entry.user.userID) === String(userID) && (
                    <button
                        onClick={() => handleDelete(entry.forumID)}
                        style={{
                            marginLeft: 'auto',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '16px',
                            color: 'red',
                            fontWeight: 'bold',
                            marginRight: '25px'
                        }}
                    >
                        X
                    </button>
                )}

                    {/* User Information */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        {/* User Photo */}
                        <img
                            src={entry.user.photoPath ? `http://localhost:8080/user/${entry.user.photoPath}` : "/images/default-pic.jpg"}
                            alt="User Profile"
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', marginRight: '20px' }}
                        />

                        {/* User Name and Time on the right side */}
                        <div style={{ textAlign: 'left' }}>
                            <h2>{entry.user.fname} {entry.user.lname}</h2>
                            <span>{formatTimestamp(entry.timestamp)}</span>
                        </div>
                    </div>

                    {/* Forum Post */}
                    <div>
                        <p>{entry.post}</p>
                    </div>
                </div>
            ))}


            {/* Error Modal */}
            {error && (
                <Dialog open={!!error} onClose={() => setError('')}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{error}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setError('')} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Confirmation Dialog */}
            <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to post this?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation} color="primary" style={{ backgroundColor: 'red', color: 'white' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmSubmission} color="primary" style={{ backgroundColor: '#4caf50', color: 'white' }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this forum entry?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary" style={{ backgroundColor: 'red', color: 'white' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" style={{ backgroundColor: '#4caf50', color: 'white' }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Forum;
