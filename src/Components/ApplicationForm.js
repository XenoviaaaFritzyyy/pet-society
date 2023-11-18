  import React, { useState, useEffect } from 'react';
  import '../Css/ApplicationForm.css';

  const ApplicationForm = () => {
    const [showHouseholdInfo, setShowHouseholdInfo] = useState(false);

    useEffect(() => {
      document.body.style.background = '#27374D';
    }, []);

    const showHouseholdInfoSection = () => {
        setShowHouseholdInfo(true);
    };

    const showPersonalInfoSection = () => {
      setShowHouseholdInfo(false);
    };


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
                  <input type="text" id="firstname" name="firstname" placeholder="Enter your first name" />
                </div>

                <div className="input-field">
                  <label>Last Name*</label>
                  <input type="text" id="lastname" name="lastname" placeholder="Enter your last name"  />
                </div>

                <div className="input-field address">
                  <label>Address*</label>
                  <input type="text" id="address" name="address" placeholder="Enter your address" />
                </div>

                <div className="input-field">
                  <label>City*</label>
                  <input type="text" id="city" name="city" placeholder="Enter your city" />
                </div>

                <div className="input-field">
                  <label>State/Province/Region*</label>
                  <input type="text" id="state" name="state" placeholder="Enter your state/province/region" />
                </div>
              </div>

              <div className="buttons">
                <button type="button" className="nextBtn" onClick={showHouseholdInfoSection}>
                  <span className="btnText">Next</span>
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
                  <input type="number" id="adult" name="adult" placeholder="Enter number" />
                </div>

                <div className="input-field">
                  <label>How many children?*</label>
                  <input type="number" id="children" name="children" placeholder="Enter number" />
                </div>

                <div className="input-field">
                  <label>Please describe your household:*</label>
                  <select id="household" name="household">
                    <option value="active">Active</option>
                    <option value="noisy">Noisy</option>
                    <option value="quiet">Quiet</option>
                    <option value="average">Average</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>Type of residence (Apartment, House)*</label>
                  <select id="residence" name="residence">
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>Do you rent or own home?*</label>
                  <select id="ownershipStatus" name="ownershipStatus">
                    <option value="apartment">Yes</option>
                    <option value="house">No</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>Landlord&apos;s contact info (if renting)</label>
                  <input type="tel" id="phone" name="phone" pattern="[0-9]{11}" placeholder="09232267859" />
                </div>
              </div>

              <div className="buttons">
                <button className="backBtn" onClick={showPersonalInfoSection}>
                    <span className="btnBack">Back</span>
                  </button>

                <button className="nextBtn">
                  <span className="btnText">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  export default ApplicationForm;
