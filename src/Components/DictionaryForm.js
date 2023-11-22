import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Admin.css';

function DictionaryForm(){
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
        <form action="#" id="dictionary-form">
            <div className="form pet-profile">
                <div className="details-pet">
                    <span className="title">Pet Profile</span>

                    <div className="fields">
                        <div className="input-field">
                            <label>DictionaryID*</label>
                            <input type="number" id="dicID" name="dicID" placeholder="Enter dictionaryID" />
                        </div>
                        <div className="input-field">
                            <label>Entry*</label>
                            <input type="text" id="entry" name="entry" placeholder="Enter entry" />
                        </div>

                        <div className="input-field description">
                            <label>Description*</label>
                            <textarea placeholder="Enter Description" id="dic-description" name="dic-description"></textarea>
                        </div>
                        </div>

                        <div className="buttons">
                        <button type="button" className="backBtn" onClick={handleBack}> 
                            <span className="btnBack">Back</span>
                        </button>

                        <button type="button" className="dictionary-Update">
                            <span className="btnUpdate">Update</span>
                        </button>

                        <button type="button" className="dictionary-Delete">
                            <span className="btnDelete">Delete</span>
                        </button>

                        <button type="button" className="dictionary-Add">
                            <span className="btnAdd">Add</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </>
    )
}

export default DictionaryForm;