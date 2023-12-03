import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Css/Form.css';

function PetProfileForm() {
  const navigate = useNavigate();
  const { petId } = useParams();

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

  const handleAddPetProfile = async () => {
    try {
      if (!formData.name.trim() || !formData.description.trim()) {
        alert("Name and description cannot be empty");
        return;
      }
  
      if (window.confirm("Are you sure you want to add this pet profile?")) {
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
          console.log('Pet profile added successfully!');
          const data = await response.json();
  
          const formDataForImage = new FormData();
          formDataForImage.append('image', formData.photo_path);
  
          console.log(data.petID);
          const image = await fetch(`http://localhost:8080/pet/insertPet/${data.petID}`, {
            method: 'POST',
            body: formDataForImage,
          });
  
          if (image.ok) {
            console.log('Image uploaded successfully!');
          } else {
            console.error('Error uploading image:', image.statusText);
          }
        } else {
          console.error('Error adding pet profile:', response.statusText);
        }
      } else {
        console.log("Pet profile addition canceled");
      }
    } catch (error) {
      console.error('Error adding pet profile:', error.message);
    }
  };
  

  const handleFindPetProfile = async () => {
    try {
      if (!formData.petID.trim()) {
        alert("PetID cannot be empty for finding");
        return;
      }

      const response = await fetch(`http://localhost:8080/pet/info/${formData.petID}`);
      const data = await response.json();

      if (response.ok && data) {
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
      } else {
        alert(`Pet profile with ID ${formData.petID} does not exist`);
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
          photo_path: '',
        });
      }
    } catch (error) {
      console.error("Error during finding pet profile:", error);
    }
  };

  const handleDeletePetProfile = async () => {
  if (!formData.petID.trim()) {
    alert("PetID cannot be empty for deleting");
    return;
  }

  if (window.confirm("Are you sure you want to delete this pet profile?")) {
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

          console.log("Pet profile marked as deleted successfully");
        } else {
          console.error("Failed to mark pet profile as deleted:", deleteResponse.statusText);
        }
      } else {
        alert(`Pet profile with ID ${formData.petID} does not exist`);
      }
    } catch (error) {
      console.error("Error during marking pet profile as deleted:", error);
    }
  } else {
    console.log("Pet profile deletion canceled");
  }
};


const handleUpdatePetProfile = async () => {
 
  if (window.confirm("Are you sure you want to update this pet profile?")) {
    try {
      const response = await fetch(`http://localhost:8080/pet/info/${formData.petID}`);
      const data = await response.json();

      if (response.ok && data) {
        if (data.deleted) {
          alert(`Pet profile with ID ${formData.petID} is already deleted`);
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
          console.log(`Pet profile with ID ${formData.petID} updated successfully!`);

          if (formData.photo_path instanceof File) {
            const formDataForImage = new FormData();
            formDataForImage.append('image', formData.photo_path);

            const imageResponse = await fetch(`http://localhost:8080/pet/insertPet/${formData.petID}`, {
              method: 'POST',
              body: formDataForImage,
            });

            if (imageResponse.ok) {
              console.log('Image uploaded successfully!');
            } else {
              console.error('Error uploading image:', imageResponse.statusText);
            }
          }
        } else {
          const updateData = await updateResponse.json();
          console.error('Failed to update pet profile', updateData);
          alert('Failed to update pet profile');
        }
      } else {
        alert(`Pet profile with ID ${formData.petID} does not exist`);
      }
    } catch (error) {
      console.error('Error during updating pet profile:', error);
      alert('An error occurred during updating pet profile. Please try again later.');
    }
  } else {
    console.log('Pet profile update canceled');
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
                <label>PetID*</label>
                <input
                  type="number"
                  id="petID"
                  name="petID"
                  placeholder="Enter petID"
                  value={formData.petID}
                  onChange={handleInputChange}
                />
              </div>

              <button type="button" className="dictionary-Find" onClick={handleFindPetProfile}>
                <span className="btnFind">Find</span>
              </button>

              <button type="button" className="dictionary-Find">
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
                  type="number"
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
    </>
  );
}

export default PetProfileForm;
