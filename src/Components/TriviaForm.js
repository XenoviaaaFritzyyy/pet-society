import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import '../Css/Form.css';

function TriviaForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [openAddConfirmationDialog, setOpenAddConfirmationDialog] = useState(false);
  const [openUpdateConfirmationDialog, setOpenUpdateConfirmationDialog] = useState(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);

  const [formData, setFormData] = useState({
    triviaID: '',
    title: '',
    category: 'Breeds',
    author: '',
    content: '',
  });

  useEffect(() => {
    document.body.style.background = '#27374D';

    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    navigate('/admin');
  };

  const handleReset = () => {
    setFormData({
      triviaID: '',
      title: '',
      category: 'Breeds',
      author: '',
      content: '',
    });
  };
  
  const handleDialogClose = () => {
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);
  };

  // FIND TRIVIA
  const handleFindTrivia = async () => {
    try {
      if (!formData.triviaID.trim()) {
        setErrorMessage("Trivia ID cannot be empty for finding");
        setOpenErrorDialog(true);
        return;
      }

      const response = await fetch(`http://localhost:8080/trivia/getTrivia/${formData.triviaID}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setFormData({
            ...formData,
            title: data.title,
            content: data.content,
            category: data.category,
            author: data.author,
          });
          setSuccessMessage(`TriviaID ${formData.triviaID} exists in the database.`);
        } else {
          setErrorMessage(`Trivia with ID ${formData.triviaID} does not exist`);
          setOpenErrorDialog(true);
          handleReset();
        }
      } else if (response.status === 404) {
        setErrorMessage(`Trivia with ID ${formData.triviaID} not found`);
        setOpenErrorDialog(true);
        handleReset();
      } else {
        setErrorMessage(`Failed to fetch trivia with ID ${formData.triviaID}`);
        setOpenErrorDialog(true);
        console.error("Server response:", response);
      }
    } catch (error) {
      console.error("Error during finding trivia:", error);
      setErrorMessage("An error occurred during finding trivia. Please try again later.");
      setOpenErrorDialog(true);
    }
  };

  // ADD TRIVIA
  const handleAddEntry = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      setErrorMessage("Title and Content cannot be empty");
      setOpenErrorDialog(true);
      return;
    }
    setOpenAddConfirmationDialog(true);
  };

  const handleConfirmAdd = async () => {
    try {
      const response = await fetch("http://localhost:8080/trivia/insertTrivia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          author: formData.author,
          isDeleted: false,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Trivia added successfully!");
        setOpenSuccessDialog(true);
        handleReset();
      } else {
        const data = await response.json();
        setErrorMessage("Failed to add entry");
        setOpenErrorDialog(true);
        console.error("Failed to add entry", data);
      }
    } catch (error) {
      console.error("Error during adding of entry:", error);
      setErrorMessage("An error occurred during adding of entry. Please try again later.");
      setOpenErrorDialog(true);
    } finally {
      setOpenAddConfirmationDialog(false);
    }
  };


    // UPDATE TRIVIA
    const handleUpdateTrivia = async () => {
      if (!formData.triviaID.trim()) {
        setErrorMessage("triviaID cannot be empty for updating");
        setOpenErrorDialog(true);
        return;
      }
      setOpenUpdateConfirmationDialog(true);
    };
  
    const handleConfirmUpdate = async () => {
      try {
        const response = await fetch(`http://localhost:8080/trivia/getTrivia/${formData.triviaID}`);
        const data = await response.json();
  
        if (response.ok && data) {
          if (data.isDeleted) {
            setErrorMessage(`Trivia with ID ${formData.triviaID} is already deleted`);
            setOpenErrorDialog(true);
            return;
          }
  
          const updateTriviaData = {
            title: formData.title,
            content: formData.content,
            category: formData.category,
            author: formData.author,
          };
  
          const updateResponse = await fetch(`http://localhost:8080/trivia/updateTrivia?triviaID=${formData.triviaID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateTriviaData),
          });
  
          if (updateResponse.ok) {
            setSuccessMessage(`TriviaID ${formData.triviaID} updated successfully!`);
            setOpenSuccessDialog(true);
            handleReset();
          } else {
            const updateData = await updateResponse.json();
            setErrorMessage("Failed to update trivia");
            setOpenErrorDialog(true);
            console.error("Failed to update trivia", updateData);
          }
        } else {
          setErrorMessage(`Trivia with ID ${formData.triviaID} does not exist`);
          setOpenErrorDialog(true);
        }
      } catch (error) {
        console.error("Error during updating trivia:", error);
        setErrorMessage("An error occurred during updating trivia. Please try again later.");
        setOpenErrorDialog(true);
      } finally {
        setOpenUpdateConfirmationDialog(false);
      }
    };  
      
    // DELETE TRIVIA
    const handleDeleteTrivia = async () => {
      if (!formData.triviaID.trim()) {
        setErrorMessage("triviaID cannot be empty for deleting");
        setOpenErrorDialog(true);
        return;
      }
      setOpenDeleteConfirmationDialog(true);
    };
  
    const handleConfirmDelete = async () => {
      try {
        const response = await fetch(`http://localhost:8080/trivia/getTrivia/${formData.triviaID}`);
        const data = await response.json();
  
        if (response.ok && data) {
          if (data.isDeleted) {
            setErrorMessage(`Trivia with ID ${formData.triviaID} is already deleted`);
            setOpenErrorDialog(true);
            return;
          }
  
          const deleteResponse = await fetch(`http://localhost:8080/trivia/deleteTrivia/${formData.triviaID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              petID: formData.triviaID,
              deleted: true,
            }),
          });
  
          if (deleteResponse.ok) {
            setSuccessMessage("Trivia marked as deleted successfully");
            setOpenSuccessDialog(true);
            handleReset();
          } else {
            setErrorMessage("Failed to mark trivia as deleted");
            setOpenErrorDialog(true);
            console.error("Failed to mark trivia as deleted:", deleteResponse.statusText);
          }
        } else {
          setErrorMessage(`Trivia with ID ${formData.triviaID} does not exist`);
          setOpenErrorDialog(true);
        }
      } catch (error) {
        console.error("Error during marking trivia as deleted:", error);
        setErrorMessage("An error occurred during marking trivia as deleted. Please try again later.");
        setOpenErrorDialog(true);
      } finally {
        setOpenDeleteConfirmationDialog(false);
      }
    };

  return (
    <>
      <form action="#" id="dictionary-form">
        <div className="admin-form pet-profile">
          <div className="details-pet">
            <span className="title">Trivia Entry</span>

            <div className="fields">
              <div className="input-field">
                <label>TriviaID*</label>
                <input type="number" id="triviaID" name="triviaID" placeholder="Enter triviaID"  value={formData.triviaID} onChange={handleInputChange} />
              </div>

              <button type="button" className="trivia-Find" onClick={handleFindTrivia}>
                <span className="btnFind">Find</span>
              </button>
              
              <button type="button" className="trivia-Reset" onClick={handleReset}>
                <span className="btnFind">Reset</span>
              </button>
              
              <div className="input-field">
                <label>Title*</label>
                <input type="text" id="title" name="title" placeholder="Enter title"  value={formData.title} onChange={handleInputChange}/>
              </div>

              <div className="input-field">
                <label>Author*</label>
                <input type="text" id="author" name="author" placeholder="Enter author" value={formData.author} onChange={handleInputChange}/>
                </div>

              <div className="input-field">
                <label htmlFor="category">Category*</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="Breeds">Breeds</option>
                    <option value="Behavior">Behavior</option>
                    <option value="History of Dogs">History of Dogs</option>
                    <option value="Training Tips">Training Tips</option>
                    <option value="Dog Care">Dog Care</option>
                    <option value="Health and Wellness">Health and Wellness</option>
                    <option value="Others">Others</option>
                </select>
                </div>

              <div className="input-field description">
                <label>Content*</label>
                <textarea placeholder="Enter Content" id="content" name="content" value={formData.content} onChange={handleInputChange}></textarea>
              </div>
            </div>

            <div className="buttons">
              <button type="button" className="backBtn" onClick={handleBack}>
                <span className="btnBack">Back</span>
              </button>

              <button type="button" className="dictionary-Update" onClick={handleUpdateTrivia}>
                <span className="btnUpdate">Update</span>
              </button>

              <button type="button" className="dictionary-Delete" onClick={handleDeleteTrivia}>
                <span className="btnDelete">Delete</span>
              </button>

              <button type="button" className="dictionary-Add" onClick={handleAddEntry}>
                <span className="btnAdd">Add</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onClose={handleDialogClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>{successMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary"  style={{ backgroundColor: '#27374D', color: 'white' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={openErrorDialog} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" style={{ backgroundColor: '#27374D', color: 'white' }} >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Confirmation Dialog */}
      <Dialog open={openAddConfirmationDialog} onClose={() => setOpenAddConfirmationDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to add a trivia?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddConfirmationDialog(false)} color="primary" style={{ backgroundColor: 'red', color: 'white' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmAdd} color="primary" style={{ backgroundColor: '#4caf50', color: 'white' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Confirmation Dialog */}
      <Dialog open={openUpdateConfirmationDialog} onClose={() => setOpenUpdateConfirmationDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to update this trivia?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateConfirmationDialog(false)} color="primary" style={{ backgroundColor: 'red', color: 'white' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmUpdate} color="primary" style={{ backgroundColor: '#4caf50', color: 'white' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteConfirmationDialog} onClose={() => setOpenDeleteConfirmationDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this trivia?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirmationDialog(false)} color="primary" style={{ backgroundColor: 'red', color: 'white' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" style={{ backgroundColor: '#4caf50', color: 'white' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TriviaForm;