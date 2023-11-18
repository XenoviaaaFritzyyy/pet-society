import React, { useState, useEffect } from 'react';
import '../Css/Admin.css';

function Admin() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [formId, setFormId] = useState('');

  const redirectToForm = (id) => {
    setShowDashboard(false);
    setFormId(id);
  };

  const redirectToDashboard = () => {
    setShowDashboard(true);
    setFormId('');
  };

  useEffect(() => {
    document.body.style.background = '#27374D';
  }, []);

  return (
    <>
      <a href="#" className="logout">
        Logout
      </a>

      <div className="admin-container">
        {showDashboard ? (
          <div className="dashboard">
            <div className="petprofile" onClick={() => redirectToForm('pet-profile-form')}>
              Pet Profile
            </div>
            <div className="dictionary" onClick={() => redirectToForm('dictionary-form')}>
              Dictionary
            </div>
          </div>
        ) : null}

        {formId === 'pet-profile-form' && (
          <form action="#" id="pet-profile-form">
            <div className="form pet-profile">
              <div className="details-pet">
                <span className="title">Pet Profile</span>

                <div className="fields">
                    <div className="input-field">
                        <label>PetID*</label>
                        <input type="number" placeholder="Enter petID" />
                </div>

                <div className="input-field">
                    <label>Name*</label>
                    <input type="text" placeholder="Enter Name" />
                </div>

                <div className="input-field description">
                    <label>Description*</label>
                    <textarea placeholder="Enter Description"></textarea>
                </div>

                <div class="input-field">
                    <label>Age*</label>
                    <input type="number" placeholder="Enter age" />
                </div>

                <div class="input-field">
                    <label>Color*</label>
                    <select>
                        <option value="Black">Black</option>
                        <option value="Blonde">Blonde</option>
                        <option value="Brown/Tan">Brown/Tan</option>
                        <option value="White">White</option>
                        <option value="Others">Others</option>
                    </select>                             
                </div>

                <div class="input-field">
                    <label>Sex*</label>
                    <select>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>                                 
                </div>

                <div class="input-field">
                    <label>Size*</label>
                    <select>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>  
                </div>

                <div class="input-field">
                    <label>Vaccinated</label>
                    <select>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>        
                </div>

                <div class="input-field">
                    <label>Temperament</label>
                        <select>
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
            </div>

            <div className="buttons">
                <button type="button" className="back" onClick={redirectToDashboard}>
                    <span className="btnBack">Back</span>
                </button>

                <button type="button" className="Petprofile-Update">
                    <span className="btnAdd">Update</span>
                </button>

                <button type="button" className="Petprofile-Delete">
                    <span className="btnAdd">Delete</span>
                </button>

                <button type="button" className="Petprofile-Add">
                    <span className="btnAdd">Add</span>
                </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {formId === 'dictionary-form' && (
          <form action="#" id="dictionary-form">
            <div className="form pet-profile">
              <div className="details-pet">
                <span className="title">Pet Profile</span>

                <div className="fields">
                  <div className="input-field">
                    <label>DictionaryID*</label>
                    <input type="number" placeholder="Enter dictionaryID" />
                  </div>
                  <div className="input-field">
                    <label>Entry*</label>
                    <input type="text" placeholder="Enter entry" />
                  </div>

                  <div className="input-field description">
                    <label>Description*</label>
                    <textarea placeholder="Enter Description"></textarea>
                  </div>
                </div>

                <div className="buttons">
                  <button type="button" className="backBtn" onClick={redirectToDashboard}>
                    <span className="btnBack">Back</span>
                  </button>

                  <button type="button" className="Petprofile-Update">
                    <span className="btnAdd">Update</span>
                  </button>

                  <button type="button" className="Petprofile-Delete">
                    <span className="btnAdd">Delete</span>
                  </button>

                  <button type="button" className="Petprofile-Add">
                    <span className="btnAdd">Add</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default Admin;
