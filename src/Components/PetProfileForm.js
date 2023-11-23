import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Form.css';

function PetProfileForm() {
  const navigate = useNavigate();

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
      const formDataToSend = new FormData();
  
      // Append each property to formDataToSend except for petID
      Object.keys(formData).forEach((key) => {
        if (key !== 'petID') {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      const response = await fetch('http://localhost:8080/pet/insertPet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formDataToSend)),
      });
  
      // Handle the response accordingly
      if (response.ok) {
        console.log('Pet profile added successfully!');
        const data = await response.json();
  
        const formDataForImage = new FormData();
        formDataForImage.append('image', formData.photo_path);
  
        console.log(data.petID)
        const image = await fetch(`http://localhost:8080/pet/insertPet/${data.petID}`, {
          method: 'POST',
          body: formDataForImage,
        });
        
        // Handle the image upload response accordingly
        if (image.ok) {
          console.log('Image uploaded successfully!');
          // You might want to redirect or update state here
        } else {
          console.error('Error uploading image:', image.statusText);
        }
      } else {
        console.error('Error adding pet profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding pet profile:', error.message);
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

              <div className="input-field-file">
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
                        }}
                    >
                        Choose a photo
                    </label>
                    </div>

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

              <button type="button" className="Petprofile-Update">
                <span className="btnUpdate">Update</span>
              </button>

              <button type="button" className="Petprofile-Delete">
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
