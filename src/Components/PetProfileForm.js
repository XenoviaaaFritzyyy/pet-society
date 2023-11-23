import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Css/Form.css';


function PetProfileForm(){
    const navigate = useNavigate();
    const [petID, setpetID] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [temperament, setTemperament] = useState('');
    const [color, setColor] = useState('');
    const [gender, setGender] = useState('');
    const [size, setSize] = useState('');
    const [vaccinated, setVaccinated] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [photoFileName, setPhotoFileName] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [error, setError] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        setPhotoFileName(file.name); // Set the file name
        setSelectedFileName(file.name); // Update selected file name
      };
      
      const handleAddPetProfile = async (event) => {
        event.preventDefault();
        
        setLoading(true);
        setShowConfirmation(true);
      };

      const handleConfirmation = async (confirmed) => {
        setShowConfirmation(false);
    
        if (confirmed) {
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('description', description);
                formData.append('age', age);
                formData.append('temperament', temperament);
                formData.append('color', color);
                formData.append('gender', gender);
                formData.append('size', size);
                formData.append('vaccinated', vaccinated);
                formData.append('file', photo);
    
                const response = await fetch('http://localhost:8080/petprofile/insertPetprofile', {
                    method: 'POST',
                    body: formData,
                    headers: {
                      'Content-Type': 'multipart/form-data',
                  },
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                // Continue with success logic
                setLoading(false);
                console.log('Successful Addition of Pet Profile!');
            } catch (error) {
                setLoading(false);
                console.error('Error during adding pet profile:', error);
                setError(`An error occurred during adding pet profile: ${error.message}`);
            }
        }
    };

    const handleBack = () => {
      navigate('/admin');
    };

    useEffect(() => {
        document.body.style.background = '#27374D';
  
        return () => {
          document.body.style.background = '';
      };
      }, []);

    return(
        <>
        <form action="#" id="pet-profile-form" encType="multipart/form-data">
            <div className="admin-form pet-profile">
              <div className="details-pet">
                <span className="title">Pet Profile</span>

                <div className="fields">
                    <div className="input-field front">
                        <label>PetID*</label>
                        <input type="number" id="petID" name="petID" placeholder="Enter Name" value={petID} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <button type="button" className="Petprofile-Find">
                        <span className="btnFind">Find</span>
                    </button>

                    <div className="input-field front ">
                        <label>Name*</label>
                        <input type="text" id="pet-name" name="pet-name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="input-field-file">
                        <label htmlFor='photo' style={{fontSize: '12px', fontWeight: 'bold', color: '#27374D'}}>Upload Pet Photo*</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept='image/*'
                            onChange={handleFileChange}/>
                        <br/>
                        <label htmlFor='pet-picture' style={{background:'white', padding: '13px 15px', borderRadius: '5px', border: '1px solid #aaa', display:'block', marginTop:'8px', color: '#27374D', fontSize: '14px', fontWeight: '400', cursor: 'pointer'}}>
                            {selectedFileName ? selectedFileName : 'Choose a photo'}
                        </label>
                        </div>

                    <div className="input-field description">
                        <label>Description*</label>
                        <textarea placeholder="Enter Description" id="pet-description" name="pet-description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="input-field">
                        <label>Age*</label>
                        <input type="text" id="age" name="age" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)}/>
                    </div>

                    <div className="input-field">
                        <label>Temperament</label>
                            <select id="temperament" name="temperament" value={temperament} onChange={(e) => setTemperament(e.target.value)}>
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
                        <select id="color" name="color" value={color} onChange={(e) => setColor(e.target.value)}>
                            <option value="Black">Black</option>
                            <option value="Blonde">Blonde</option>
                            <option value="Brown/Tan">Brown/Tan</option>
                            <option value="White">White</option>
                            <option value="Others">Others</option>
                        </select>                             
                    </div>

                    <div className="input-field">
                        <label>Gender*</label>
                        <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>                                 
                    </div>

                    <div className="input-field">
                        <label>Size*</label>
                        <select id="size" name="size" value={size} onChange={(e) => setSize(e.target.value)}>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>  
                    </div>

                    <div className="input-field">
                        <label>Vaccinated</label>
                        <select id="vaccinated" name="vaccinated" value={vaccinated} onChange={(e) => setVaccinated(e.target.value)}>
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

                    <button type="button" className="Petprofile-Add" onClick={handleAddPetProfile}>
                        <span className="btnAdd">Add</span>
                    </button>
                </div>
              </div>
            </div>
          </form>

            {/* Confirmation Dialog */}
            {showConfirmation && (
                <div className="confirmation-dialog">
                <p>Are you sure you want to add a pet profile?</p>
                <button onClick={() => handleConfirmation(true)}>Yes</button>
                <button onClick={() => handleConfirmation(false)}>No</button>
                </div>
            )}
        </>
    );
}

export default PetProfileForm;