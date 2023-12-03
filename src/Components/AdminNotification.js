import React, { useState } from 'react';
import '../Css/Form.css';
import { useNavigate } from 'react-router-dom';


const AdminNotification = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = () => {
    setUserId('');
    setMessage('');
  };

  const handleBack = () => {
    navigate('/admin');
  };

  const sendNotification = async () => {
    try {
      const response = await fetch('http://localhost:8080/notifications/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,  
          message: message,
        }),
      });

      if (response.ok) {
        alert('Notification sent successfully');
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
          <span className="title">Notification</span>

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
                    rows={4} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                </label>
                </div>
          </div>

          <div className="buttons" >
            
            <button style={{ marginRight: '250px' }} onClick={sendNotification}>
              Send Notification
            </button>
            <button style={{ marginLeft: '100x' }} type="button" className="backBtn" onClick={handleBack}>
                <span className="btnBack">Back</span>
              </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminNotification;
