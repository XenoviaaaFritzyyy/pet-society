import React, { useState, useEffect } from "react";
import { useAuth } from '../Components/AuthContext';
import { Link } from 'react-router-dom';
import '../Css/DashboardUser.css';

function Dashboard() {
  const { userID } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/getAllUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('data');
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error during user fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userID]);

  return (
    <>
      <div>
        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <button style={{ position: 'absolute', top: '25px', right: '50px', textDecoration: 'none', fontSize: '15px', padding: '8px 15px', borderRadius: '10px', color: '#27374D' }}>
            Back
          </button>
        </Link>

        <div className="User-buttons" style={{ marginTop: '20px' }}>
          <label style={{ marginLeft: '650px' }}>User ID: </label>
          <input type="number" id="lname" name="lname" style={{ marginRight: '5px', marginBottom: '10px', padding: '5px', borderRadius: '5px', width: '60px' }} />
          <button style={{ borderRadius: '5px', padding: '3px' }}>Find ID</button>

          <div className="dash-buttons">
            <button>Delete User</button>
          </div>
        </div>

        <h2 style={{ textAlign: 'center', margin: '30px 0 20px 0', color: '#27374D' }}>DASHBOARD USERS</h2>

        <div className="User-table2" style={{ overflowX: 'auto' }}>
            <div className="User-table2" style={{ overflowX: 'auto' }}>
                TOTAL NUMBER OF USERS
            </div>
            <div className="User-table2" style={{ overflowX: 'auto' }}>
                TOTAL NUMBER OF PETS
            </div>
            <div className="User-table2" style={{ overflowX: 'auto' }}>
                
            </div>
            <div className="User-table2" style={{ overflowX: 'auto' }}>
                
            </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
            
            <div className="User-table" style={{ overflowX: 'auto' }}>
                <div > 
                   <h3 style={{ paddingLeft: '10px', paddingBottom: '5px'}}>All Users</h3>
                </div>
            <table >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.userID}>
                    <td>{user.userID}</td>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.address}</td>
                    <td>{user.contact}</td>
                    <td>{user.gender}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
