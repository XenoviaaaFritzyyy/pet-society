import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../Css/Notification.css';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    const fetchNotifications = async () => {
        console.log('userId:', userId);
      try {
        console.log('Current userId:', userId); // Log userId here

        // Check if userId is defined before making the request
        if (!userId) {
          console.error('User ID is undefined');
          return;
        }

        const response = await fetch(`http://localhost:8080/notifications/user/${userId}`);
        if (response.ok) {
          const notificationsData = await response.json();
          setNotifications(notificationsData);
          console.log('Received notifications:', notificationsData);
        } else {
          console.error('Failed to fetch notifications:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  console.log('Rendered notifications:', notifications);


  const formatTimestamp = (timestamp) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  return (
    <>
    <Navbar/>
    <div class="user-notifications">
  <h2>User Notifications</h2>
  <ul>
    {notifications.map(notification => (
      <li key={notification.id}>
        {notification.message}  <span class="timestamp">{formatTimestamp(notification.timestamp)}</span>
      </li>
    ))}
  </ul>
</div>
    </>
  );
};

export default UserNotifications;
