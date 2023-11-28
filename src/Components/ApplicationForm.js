  import React, { useState, useEffect } from 'react';
  import { useParams, Navigate } from 'react-router-dom'; 
  import { useAuth } from '../Components/AuthContext';

  import '../Css/ApplicationForm.css';

  const ApplicationForm = () => {
    const { petId } = useParams();
    const { userID, setUserID } = useAuth(); 
    const [showHouseholdInfo, setShowHouseholdInfo] = useState(false);
    const [error, setError] = useState('');
    const [ submit, setSubmit] = useState(false);
    

    const [formData, setFormData] = useState({
      fname: '',
      lname: '',
      address: '',
      city: '',
      state: '',
      noAdults: '',
      noChildren: '',
      desHousehold: 'active',
      typeResidence: 'apartment',
      rentHome: 'Rent',
      landlordContact: '',
      isDeleted: false,
      fk_petID: petId,
      fk_userID: userID,
    });

    useEffect(() => {
      // Retrieve userID from localStorage when the component mounts
      const storedUserID = localStorage.getItem('userID');
      if (storedUserID) {
        setUserID(storedUserID);
      }
    
      document.body.style.background = '#27374D';
    
      return () => {
        document.body.style.background = '';
      };
    }, [setUserID, petId, userID]);
  
    const showHouseholdInfoSection = () => {
      setShowHouseholdInfo(true);
    };
  
    const showPersonalInfoSection = () => {
      setShowHouseholdInfo(false);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const showConfirmation = () => {
      return window.confirm("Are you sure you want to submit application form?");
    };
  

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      console.log('Pet ID:', petId);
      console.log('User ID:', userID);
      console.log('Form', formData);
    
      const requiredFields = ['lname', 'fname', 'address', 'city', 'state', 'noAdults', 'noChildren'];
      const missingFields = requiredFields.filter((field) => !formData[field]);
    
      if (missingFields.length > 0) {
        setError(`Please fill in the following fields: ${missingFields.join(', ')}`);
        return;
      }

      if (formData.rentHome === 'Rent' && (!formData.landlordContact || formData.landlordContact.length !== 11)) {
        setError('Landlord\'s contact info should be 11 digits ex. 09362677352');
        return;
      }
    
      if (formData.rentHome === 'Own Home' && formData.landlordContact) {
        setError('Landlord\'s contact info should be empty for if not renting');
        return;
      }

      setError('');
    
      if (showConfirmation()) {
        // Use the updated state in the API call
        const dataToSend = {
          ...formData,
        };
    
        try {
          const response = await fetch('http://localhost:8080/application/insertApplication', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });
    
          if (response.ok) {
            setSubmit(true);
            console.log('Entry added successfully');
          } else {
            const data = await response.json();
            setError('Failed to add entry');
            console.error('Failed to add entry', data);
          }
        } catch (error) {
          console.error('Error during adding of entry:', error);
          setError('An error occurred during adding of entry. Please try again later.');
        }
      } else {
        console.log('Entry addition canceled');
      }
    };     

    if(submit) {
      return <Navigate to="/thankyou" />;
    }

    return (
      <div className="application-container">
        <header>Application Form</header>

        <form action="#">
          <div className={`form personal-info ${!showHouseholdInfo ? '' : 'hidden'}`}>
            <div className="details-personal">
              <span className="title">Personal Information</span>

              <div className="fields">
                <div className="input-field">
                  <label>First Name*</label>
                  <input type="text" id="fname" name="fname" placeholder="Enter your first name" onChange={handleChange}/>
                </div>

                <div className="input-field">
                  <label>Last Name*</label>
                  <input type="text" id="lname" name="lname" placeholder="Enter your last name"  onChange={handleChange} />
                </div>

                <div className="input-field address">
                  <label>Address*</label>
                  <input type="text" id="address" name="address" placeholder="Enter your address"  onChange={handleChange}/>
                </div>

                <div className="input-field">
                  <label>City*</label>
                  <input type="text" id="city" name="city" placeholder="Enter your city"  onChange={handleChange}/>
                </div>

                <div className="input-field">
                  <label>State/Province/Region*</label>
                  <input type="text" id="state" name="state" placeholder="Enter your state/province/region"  onChange={handleChange}/>
                </div>
              </div>

              <div className="buttons">
                <button type="button" className="nextBtn" onClick={showHouseholdInfoSection}>
                  <span className="btnNext">Next</span>
                </button>
              </div>
            </div>
          </div>

          <div className={`form household-info ${showHouseholdInfo ? '' : 'hidden'}`}>
            <div className="details-personal">
              <span className="title">Household Information</span>

              <div className="fields">
                <div className="input-field">
                  <label>How many adults are there in your family?*</label>
                  <input type="number" id="noAdults" name="noAdults" placeholder="Enter number"  onChange={handleChange}/>
                </div>

                <div className="input-field">
                  <label>How many children?*</label>
                  <input type="number" id="noChildren" name="noChildren" placeholder="Enter number"  onChange={handleChange}/>
                </div>

                <div className="input-field">
                  <label>Please describe your household:*</label>
                  <select id="desHousehold" name="desHousehold"  onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Noisy">Noisy</option>
                    <option value="Quiet">Quiet</option>
                    <option value="Average">Average</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>Type of residence (Apartment, House)*</label>
                  <select id="typeResidence" name="typeResidence"  onChange={handleChange}>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>Do you rent or own home?*</label>
                  <select id="rentHome" name="rentHome"  onChange={handleChange}>
                    <option value="Rent">Rent</option>
                    <option value="Own Home">Own Home</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>Landlord&apos;s contact info (if renting)</label>
                  <input type="tel" id="landlordContact" name="landlordContact" pattern="[0-9]{11}" placeholder="09232267859"  onChange={handleChange}/>
                </div>
              </div>

              <div className="buttons">
                <button type="button" className="backBtn" onClick={showPersonalInfoSection}>
                  <span className="btnBack">Back</span>
                </button>

                <button type="submit" className="nextBtn" onClick={handleSubmit}>
                  <span className="btnSubmit">Submit</span>
                </button>
              </div>
            </div>
          </div>
          <div className="error-message">{error}</div>
        </form>
      </div>
    );
  };

  export default ApplicationForm;
