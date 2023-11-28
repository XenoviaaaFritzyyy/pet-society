import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Css/Form.css';

function TriviaForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

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

  const showAddConfirmation = () => {
    return window.confirm("Are you sure you want to add a trivia?");
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

  // FIND TRIVIA
  const handleFindTrivia = async () => {
    try {
      if (!formData.triviaID.trim()) {
        alert("Trivia ID cannot be empty for finding");
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
          setSuccessMessage(`TriviaID ${formData.triviaID} exist in the database.`);
        } else {
          alert(`Trivia with ID ${formData.triviaID} does not exist`);
          handleReset();
        }
      } else if (response.status === 404) {
        alert(`Trivia with ID ${formData.triviaID} not found`);
        handleReset();
      } else {
        alert(`Failed to fetch trivia with ID ${formData.triviaID}`);
        console.error("Server response:", response);
      }
    } catch (error) {
      console.error("Error during finding trivia:", error);
      alert("An error occurred during finding trivia. Please try again later.");
    }
  };

  // ADD TRIVIA
  const handleAddEntry = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Title and Content cannot be empty");
      return;
    }

    if (showAddConfirmation()) {
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
          handleReset();
        } else {
          const data = await response.json();
          console.error("Failed to add entry", data);
          alert("Failed to add entry");
        }
      } catch (error) {
        console.error("Error during adding of entry:", error);
        alert("An error occurred during adding of entry. Please try again later.");
      }
    } else {
      console.log("Entry addition canceled");
    }
  };

    // UPDATE TRIVIA
    const handleUpdateTrivia = async () => {
      if (!formData.triviaID.trim()) {
        alert("triviaID cannot be empty for updating");
        return;
      }

      if (window.confirm("Are you sure you want to update this trivia?")) {
        try {
          const response = await fetch(`http://localhost:8080/trivia/getTrivia/${formData.triviaID}`);
          const data = await response.json();

          if (response.ok && data) {
            if (data.isDeleted) {
              alert(`Trivia with ID ${formData.triviaID} is already deleted`);
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
            } else {
              const updateData = await updateResponse.json();
              console.error("Failed to update trivia", updateData);
              alert("Failed to update trivia");
            }
          } else {
            alert(`Trivia with ID ${formData.triviaID} does not exist`);
          }
        } catch (error) {
          console.error("Error during updating trivia:", error);
          alert("An error occurred during updating trivia. Please try again later.");
        }
      } else {
        console.log("Trivia update canceled");
      }
    };
      
    // DELETE TRIVIA
    const handleDeleteTrivia = async () => {
      if (!formData.triviaID.trim()) {
        alert("triviaID cannot be empty for deleting");
        return;
      }
    
      if (window.confirm("Are you sure you want to delete this trivia?")) {
        try {
          const response = await fetch(`http://localhost:8080/trivia/getTrivia/${formData.triviaID}`);
          const data = await response.json();
    
          if (response.ok && data) {
            if (data.isDeleted) {
              alert(`Trivia with ID ${formData.triviaID} is already deleted`);
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
            } else {
              console.error("Failed to mark pet profile as deleted:", deleteResponse.statusText);
            }
          } else {
            alert(`Pet profile with ID ${formData.triviaID} does not exist`);
          }
        } catch (error) {
          console.error("Error during marking pet profile as deleted:", error);
        }
      } else {
        console.log("Pet profile deletion canceled");
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
          {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
        </div>
      </form>
    </>
  );
}

export default TriviaForm;