import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Css/Form.css';

function DictionaryForm() {
  const navigate = useNavigate();
  const [dicID, setDicID] = useState('');
  const [entry, setEntry] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate('/admin');
  };

  const showConfirmation = () => {
    return window.confirm("Are you sure you want to add/update/delete an entry to the dictionary?");
  };

  useEffect(() => {
    document.body.style.background = '#27374D';

    return () => {
      document.body.style.background = '';
  };
  }, []);

  const handleReset = () => {
    setEntry('');
    setDescription('');
    setDicID('');
    setError(''); // Clear any previous error messages
  };
  
  const handleFindEntry = async () => {
    try {
      if (!dicID.trim()) {
        alert("DictionaryID cannot be empty for finding");
        return;
      }

      const response = await fetch(`http://localhost:8080/dictionary/getEntry/${dicID}`);
      const data = await response.json();

      if (response.ok && data) {
        // Entry found, update state with the details
        setEntry(data.entry);
        setDescription(data.description);
      } else {
        // Entry does not exist, alert the user
        alert(`Entry ${dicID} does not exist`);
        setEntry('');
        setDescription('');
        setDicID('');
      }
    } catch (error) {
      console.error("Error during finding entry:", error);
      setError("An error occurred during finding entry. Please try again later.");
    }
  };
  
  // ADD ENTRY FOR DICTIONARY
  const handleAddEntry = async (event) => {
    event.preventDefault();

    // Check if entry and description are not empty
    if (!entry.trim() || !description.trim()) {
        alert("Entry and description cannot be empty");
        return;
    }

    // Display a confirmation dialog
    if (showConfirmation()) {
      try {
        const response = await fetch("http://localhost:8080/dictionary/insertEntry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ entry, description, isDeleted:false }),
        });

        if (response.ok) {
          // Entry added successfully
          console.log("Entry added successfully");
          setEntry('');
          setDescription('');
          setDicID('');
        } else {
          const data = await response.json();
          setError("Failed to add entry");
          console.error("Failed to add entry");
        }
      } catch (error) {
        console.error("Error during adding of entry:", error);
        setError("An error occurred during adding of entry. Please try again later.");
      }
    } else {
      console.log("Entry addition canceled");
    }
  };

  const handleUpdateEntry = async () => {
    // Check if dicID is provided
    if (!dicID.trim()) {
        alert("DictionaryID cannot be empty for updating");
        return;
    }

    // Display a confirmation dialog
    if (showConfirmation()) {
        try {
            // Check if the entry exists in the database
            const response = await fetch(`http://localhost:8080/dictionary/getEntry/${dicID}`);
            const data = await response.json();

            if (response.ok && data) {
                // Check if the entry is marked as deleted
                if (data.isDeleted) {
                    alert(`Entry ${dicID} is already deleted`);
                    return;
                }

                // Entry exists and is not deleted, proceed with the update
                const updateResponse = await fetch(`http://localhost:8080/dictionary/updateEntry/${dicID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ entry, description }),
                });

                if (updateResponse.ok) {
                    // Entry updated successfully
                    console.log("Entry updated successfully");
                    setEntry('');
                    setDescription('');
                    setDicID('');
                } else {
                    const updateData = await updateResponse.json();
                    setError("Failed to update entry");
                    console.error("Failed to update entry", updateData);
                }
            } else {
                // Entry does not exist, alert the user
                alert(`Entry ${dicID} does not exist`);
            }
        } catch (error) {
            console.error("Error during updating entry:", error);
            setError("An error occurred during updating entry. Please try again later.");
        }
    } else {
        console.log("Entry update canceled");
    }
};

    // DELETE ENTRY FOR DICTIONARY
    const handleDeleteEntry = async () => {
        // Check if dicID is provided
        if (!dicID.trim()) {
        alert("DictionaryID cannot be empty for deleting");
        return;
        }
    
        // Display a confirmation dialog
        if (showConfirmation()) {
        try {
            // Check if the entry exists in the database
            const response = await fetch(`http://localhost:8080/dictionary/getEntry/${dicID}`);
            const data = await response.json();
    
            if (response.ok && data) {
            // Entry exists, proceed with the delete
            const deleteResponse = await fetch(`http://localhost:8080/dictionary/deleteEntry/${dicID}`, {
                method: "PUT", // Assuming you use a PUT request for updating
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ isDeleted: true }),
            });
    
            if (deleteResponse.ok) {
                // Entry "deleted" successfully
                console.log("Entry 'deleted' successfully");
                setEntry('');
                setDescription('');
                setDicID('');
            } else {
                const deleteData = await deleteResponse.json();
                setError("Failed to 'delete' entry");
                console.error("Failed to 'delete' entry", deleteData);
            }
            } else {
            // Entry does not exist, alert the user
            alert(`Entry ${dicID} does not exist`);
            }
        } catch (error) {
            console.error("Error during 'deleting' entry:", error);
            setError("An error occurred during 'deleting' entry. Please try again later.");
        }
        } else {
        console.log("Entry 'deletion' canceled");
        }
    };

  return (
    <>
      <form action="#" id="dictionary-form">
        <div className="admin-form pet-profile">
          <div className="details-pet">
            <span className="title">Dictionary Entry</span>

            <div className="fields">
              <div className="input-field">
                {/* DictionaryID input (if needed) */}
                <label>DictionaryID*</label>
                <input type="number" id="dicID" name="dicID" placeholder="Enter dictionaryID" value={dicID} onChange={(e) => setDicID(e.target.value)} />
              </div>

              <button type="button" className="dictionary-Reset" onClick={handleReset}>
                <span className="btnFind">Reset</span>
              </button>

              <button type="button" className="dictionary-Find" onClick={handleFindEntry}>
                <span className="btnFind">Find</span>
              </button>
              
              <div className="input-field description">
                <label>Entry*</label>
                <input type="text" id="entry" name="entry" placeholder="Enter entry" value={entry} onChange={(e) => setEntry(e.target.value)} />
              </div>

              <div className="input-field description">
                <label>Description*</label>
                <textarea placeholder="Enter Description" id="dic-description" name="dic-description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </div>

            <div className="buttons">
              <button type="button" className="backBtn" onClick={handleBack}>
                <span className="btnBack">Back</span>
              </button>

              <button type="button" className="dictionary-Update" onClick={handleUpdateEntry}>
                <span className="btnUpdate">Update</span>
              </button>

              <button type="button" className="dictionary-Delete" onClick={handleDeleteEntry}>
                <span className="btnDelete">Delete</span>
              </button>

              <button type="button" className="dictionary-Add" onClick={handleAddEntry}>
                <span className="btnAdd">Add</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default DictionaryForm;