import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Css/Form.css';


function PetProfileForm(){
    const navigate = useNavigate();

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
        <form action="#" id="pet-profile-form">
            <div className="form pet-profile">
              <div className="details-pet">
                <span className="title">Pet Profile</span>

                <div className="fields">
                    <div className="input-field">
                            <label>PetID*</label>
                            <input type="number" id="petID" name="petID" placeholder="Enter petID" />
                    </div>

                    <div className="input-field-file">
                        <label style={{fontSize: '12px', fontWeight: 'bold', color: '#27374D'}}>Upload Pet Photo*</label>
                        <input type="file" id="pet-picture" name="pet-picture" accept='image/'/>
                        <br/>
                        <label for='pet-picture' style={{background:'white', padding: '13px 15px', borderRadius: '5px', border: '1px solid #aaa', display:'block', marginTop:'8px', color: '#27374D', fontSize: '14px', fontWeight: '400', cursor: 'pointer'}}>Choose a photo</label>
                    </div>

                    <div className="input-field ">
                        <label>Name*</label>
                        <input type="text" id="pet-name" name="pet-name" placeholder="Enter Name" />
                    </div>

                    <div className="input-field description">
                        <label>Description*</label>
                        <textarea placeholder="Enter Description" id="pet-description" name="pet-description"></textarea>
                    </div>

                    <div class="input-field">
                        <label>Age*</label>
                        <input type="text" id="age" name="age" placeholder="Enter age" />
                    </div>

                    <div class="input-field">
                        <label>Temperament</label>
                            <select id="temperament" name="temperament">
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

                    <div class="input-field">
                        <label>Color*</label>
                        <select id="color" name="color">
                            <option value="Black">Black</option>
                            <option value="Blonde">Blonde</option>
                            <option value="Brown/Tan">Brown/Tan</option>
                            <option value="White">White</option>
                            <option value="Others">Others</option>
                        </select>                             
                    </div>

                    <div class="input-field">
                        <label>Gender*</label>
                        <select id="gender" name="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>                                 
                    </div>

                    <div class="input-field">
                        <label>Size*</label>
                        <select id="size" name="size">
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>  
                    </div>

                    <div class="input-field">
                        <label>Vaccinated</label>
                        <select id="vaccinated" name="vaccinated">
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

                    <button type="button" className="Petprofile-Add">
                        <span className="btnAdd">Add</span>
                    </button>
                </div>
              </div>
            </div>
          </form>
        </>
    )
}

export default PetProfileForm;
