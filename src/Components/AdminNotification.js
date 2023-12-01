import React, { useState } from 'react';
import '../Css/Form.css';


const AdminNotification = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = () => {
    setUserId('');
    setMessage('');
  };

  const sendNotification = async () => {
    try {
      const response = await fetch('http://localhost:8080/notifications/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,  // Corrected key to match the backend
          message: message,
        }),
      });

      if (response.ok) {
        alert('Notification sent successfully');
        // Add any additional logic or state updates here
      } else {
        const errorMessage = await response.text();
        alert(`Failed to send notification: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error sending notification. Please try again.');
    }
  };

  return (
    <form action="#" id="dictionary-form">
      <div className="admin-form pet-profile">
        <div className="details-pet">
          <span className="title">Dictionary Entry</span>

          <div className="fields">
            <div className="input-field">
              <label>
                User ID:
                <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
              </label>
            </div>

            <button type="button" className="dictionary-Reset" onClick={handleReset}>
              <span className="btnFind">Reset</span>
            </button>

            <div className="input-field description">
                <label>
                    Message:
                    <textarea
                    rows={4} // Adjust the number of rows as needed
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                </label>
                </div>
          </div>

          <div className="buttons">
            <button style={{ marginRight: '440px' }} onClick={sendNotification}>
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminNotification;
