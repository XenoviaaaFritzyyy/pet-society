import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import '../Css/Form.css';

function PetProfileForm() {
  const navigate = useNavigate();
  const { petId } = useParams();

  const [successMessage, setSuccessMessage] = useState('');
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [openAddConfirmationDialog, setOpenAddConfirmationDialog] = useState(false);
  const [openUpdateConfirmationDialog, setOpenUpdateConfirmationDialog] = useState(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);
  };

  const handleReset = () => {
    setFormData({
      petID: '',
      name: '',
      description: '',
      age: '',
      temperament: 'Friendly',
      color: 'Black',
      gender: 'Male',
      size: 'Small',
      vaccinated: 'Yes',
      photo_path: ''
    });
  };

  const [formData, setFormData] = useState({
    petID: '',
    name: '',
    description: '',
    age: '',
    temperament: 'Friendly',
    color: 'Black',
    gender: 'Male',
    size: 'Small',
    vaccinated: 'Yes',
    photo_path: '',
    deleted: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    navigate('/admin');
  };

  const handleAddPetProfile = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      setErrorMessage('Name and description cannot be empty');
      setOpenErrorDialog(true);
      return;
    }
    setOpenAddConfirmationDialog(true);
  };

  const handleConfirmAdd = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch('http://localhost:8080/pet/insertPet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formDataToSend)),
      });

      if (response.ok) {
        const data = await response.json();

        const formDataForImage = new FormData();
        formDataForImage.append('image', formData.photo_path);

        const image = await fetch(`http://localhost:8080/pet/insertPet/${data.petID}`, {
          method: 'POST',
          body: formDataForImage,
        });

        if (image.ok) {
          setSuccessMessage('Pet profile added successfully!');
          setOpenSuccessDialog(true);
          handleReset();
        } else {
          setErrorMessage('Error uploading image');
          setOpenErrorDialog(true);
          console.error('Error uploading image:', image.statusText);
        }
      } else {
        setErrorMessage('Error adding pet profile');
        setOpenErrorDialog(true);
        console.error('Error adding pet profile:', response.statusText);
      }
    } catch (error) {
      setErrorMessage('An error occurred during adding pet profile. Please try again later.');
      setOpenErrorDialog(true);
      console.error('Error adding pet profile:', error.message);
    } finally {
      setOpenAddConfirmationDialog(false);
    }
  };
  

  const handleFindPetProfile = async () => {
    try {
      if (!formData.petID.trim()) {
        setErrorMessage("PetID cannot be empty for finding");
        setOpenErrorDialog(true);
        return;
      }
  
      const response = await fetch(`http://localhost:8080/pet/info/${formData.petID}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setFormData({
            ...formData,
            name: data.name,
            description: data.description,
            age: data.age,
            temperament: data.temperament,
            color: data.color,
            gender: data.gender,
            size: data.size,
            vaccinated: data.vaccinated,
            photo_path: data.photo_path,
          });
          setSuccessMessage(`PetID ${formData.petID} exists in the database.`);
        } else {
          setErrorMessage(`Pet profile with ID ${formData.petID} does not exist`);
          setOpenErrorDialog(true);
          handleReset();
        }
      } else if (response.status === 500) {
        setErrorMessage(`Pet profile with ID ${formData.petID} not found`);
        setOpenErrorDialog(true);
        handleReset();
      } else {
        setErrorMessage(`Failed to fetch pet profile with ID ${formData.petID}`);
        setOpenErrorDialog(true);
        console.error("Server response:", response);
      }
    } catch (error) {
      console.error("Error during finding pet profile:", error);
      setErrorMessage("An error occurred during finding pet profile. Please try again later.");
      setOpenErrorDialog(true);
    }
  };
  

  // DELETE PET PROFILE
const handleDeletePetProfile = async () => {
  if (!formData.petID.trim()) {
    setErrorMessage("PetID cannot be empty for deleting");
    setOpenErrorDialog(true);
    return;
  }

  setOpenDeleteConfirmationDialog(true);
};

const handleConfirmDelete = async () => {
  try {
    const response = await fetch(`http://localhost:8080/pet/info/${formData.petID}`);
    const data = await response.json();

    if (response.ok && data) {
      const deleteResponse = await fetch(`http://localhost:8080/pet/deletePet/${formData.petID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petID: formData.petID,
          deleted: true, 
        }),
      });

      if (deleteResponse.ok) {
        setSuccessMessage("Pet profile marked as deleted successfully");
        setOpenSuccessDialog(true);
      } else {
        setErrorMessage(`Failed to mark pet profile as deleted: ${deleteResponse.statusText}`);
        setOpenErrorDialog(true);
      }
    } else {
      setErrorMessage(`Pet profile with ID ${formData.petID} does not exist`);
      setOpenErrorDialog(true);
    }
  } catch (error) {
    console.error("Error during marking pet profile as deleted:", error);
    setErrorMessage("An error occurred during marking pet profile as deleted. Please try again later.");
    setOpenErrorDialog(true);
  } finally {
    setOpenDeleteConfirmationDialog(false);
  }
};



// UPDATE PET PROFILE
const handleUpdatePetProfile = async () => {
  if (!formData.petID.trim()) {
    setErrorMessage("PetID cannot be empty for updating");
    setOpenErrorDialog(true);
    return;
  }
  setOpenUpdateConfirmationDialog(true);
};

const handleConfirmUpdate = async () => {
  try {
    const response = await fetch(`http://localhost:8080/pet/info/${formData.petID}`);
    const data = await response.json();

    if (response.ok && data) {
      if (data.deleted) {
        setErrorMessage(`Pet profile with ID ${formData.petID} is already deleted`);
        setOpenErrorDialog(true);
        return;
      }

      const updatedPetData = {
        petID: formData.petID,
        name: formData.name,
        description: formData.description,
        age: formData.age,
        temperament: formData.temperament,
        color: formData.color,
        gender: formData.gender,
        size: formData.size,
        vaccinated: formData.vaccinated,
      };

      const updateResponse = await fetch(`http://localhost:8080/pet/updatePet?petID=${formData.petID}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPetData),
      });

      if (updateResponse.ok) {
        setSuccessMessage(`Pet profile with ID ${formData.petID} updated successfully!`);
        setOpenSuccessDialog(true);

        if (formData.photo_path instanceof File) {
          const formDataForImage = new FormData();
          formDataForImage.append('image', formData.photo_path);

          const imageResponse = await fetch(`http://localhost:8080/pet/insertPet/${formData.petID}`, {
            method: 'POST',
            body: formDataForImage,
          });

          if (imageResponse.ok) {
            setSuccessMessage('Image uploaded successfully!');
          } else {
            setErrorMessage(`Error uploading image: ${imageResponse.statusText}`);
            setOpenErrorDialog(true);
          }
        }

        handleReset();
      } else {
        const updateData = await updateResponse.json();
        setErrorMessage("Failed to update pet profile");
        setOpenErrorDialog(true);
        console.error("Failed to update pet profile", updateData);
      }
    } else {
      setErrorMessage(`Pet profile with ID ${formData.petID} does not exist`);
      setOpenErrorDialog(true);
    }
  } catch (error) {
    console.error("Error during updating pet profile:", error);
    setErrorMessage("An error occurred during updating pet profile. Please try again later.");
    setOpenErrorDialog(true);
  } finally {
    setOpenUpdateConfirmationDialog(false);
  }
};

  
  

  useEffect(() => {
    document.body.style.background = '#27374D';

    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <>
      <form action="#" id="pet-profile-form" encType="multipart/form-data">
        <div className="admin-form pet-profile">
          <div className="details-pet">
            <span className="title">Pet Profile</span>

            <div className="fields">
            <div className="input-field">
              <label htmlFor="petID">PetID*</label>
              <input
                type="text"
                id="petID"
                name="petID"
                placeholder="Enter petID"
                value={formData.petID}
                onChange={handleInputChange}
                inputMode="numeric"
                pattern="[0-9]*"
              />
          </div>

              <button type="button" className="dictionary-Find" onClick={handleFindPetProfile}>
                <span className="btnFind">Find</span>
              </button>

              <button type="button" className="dictionary-Find" onClick={handleReset}>
                <span className="btnFind">Reset</span>
              </button>

              <div className="input-field">
                <label>Name*</label>
                <input
                  type="text"
                  id="pet-name"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-field-file input-field front">
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#27374D' }}>
                        Upload Pet Photo*
                    </label>
                    <input
                        type="file"
                        id="pet-picture"
                        name="photo_path"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, photo_path: e.target.files[0] })}
                    />
                    <br />
                    <label
                        htmlFor="pet-picture"
                        style={{
                        background: 'white',
                        padding: '13px 15px',
                        borderRadius: '5px',
                        border: '1px solid #aaa',
                        display: 'block',
                        marginTop: '8px',
                        color: '#27374D',
                        fontSize: '14px',
                        fontWeight: '400',
                        cursor: 'pointer',
                        }}>
                        {formData.photo_path ? formData.photo_path.name : 'Choose a photo'}
                    </label>
                    </div>

              <div className="input-field description">
                <label>Description*</label>
                <textarea
                  placeholder="Enter Description"
                  id="pet-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="input-field">
              <label>Age*</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-field">
                <label>Temperament</label>
                <select
                  id="temperament"
                  name="temperament"
                  value={formData.temperament}
                  onChange={handleInputChange}
                >
                  <option value="Friendly">Friendly</option>
                  <option value="Calm">Calm</option>
                  <option value="Energetic">Energetic</option>
                  <option value="Fearful">Fearful</option>
                  <option value="Aggressive">Aggressive</option>
                  <option value="Curious">Curious</option>
                  <option value="Alert">Alert</option>
                  <option value="Stubborn">Stubborn</option>
                  <option value="Social">Social</option>
                </select>
              </div>

              <div className="input-field">
                <label>Color*</label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                >
                  <option value="Black">Black</option>
                  <option value="Blonde">Blonde</option>
                  <option value="Brown/Tan">Brown/Tan</option>
                  <option value="White">White</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="input-field">
                <label>Gender*</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="input-field">
                <label>Size*</label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div className="input-field">
                <label>Vaccinated</label>
                <select
                  id="vaccinated"
                  name="vaccinated"
                  value={formData.vaccinated}
                  onChange={handleInputChange}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="buttons">
              <button type="button" className="back" onClick={handleBack}>
                <span className="btnBack">Back</span>
              </button>

              <button
                  type="button"
                  className="Petprofile-Delete"
                  onClick={handleUpdatePetProfile}>
                <span className="btnUpdate">Update</span>
              </button>

              <button
                  type="button"
                  className="Petprofile-Delete"
                  onClick={handleDeletePetProfile}>
                <span className="btnDelete">Delete</span>
              </button>

              <button
                type="button"
                className="Petprofile-Add"
                onClick={handleAddPetProfile}
              >
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
          <Button onClick={handleDialogClose} color="primary" style={{ backgroundColor: '#27374D', color: 'white' }}>
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
          <Button onClick={handleDialogClose} color="primary" style={{ backgroundColor: '#27374D', color: 'white' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Confirmation Dialog */}
      <Dialog open={openAddConfirmationDialog} onClose={() => setOpenAddConfirmationDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to add a Pet?</DialogContentText>
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
          <DialogContentText>Are you sure you want to update this Pet Profile?</DialogContentText>
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
          <DialogContentText>Are you sure you want to delete this Pet entry?</DialogContentText>
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

export default PetProfileForm;
