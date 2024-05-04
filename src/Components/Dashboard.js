import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from '@mui/material';
import { useAuth } from '../Components/AuthContext';
import { Link } from 'react-router-dom';

import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import '../Css/DashboardUser.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Dashboard() {
  const { userID } = useAuth();
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('All users');
  const [applications, setApplications] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPets, setTotalPets] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);

 
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

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:8080/pet/getAllPets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('data');
          setPets(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error during user fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [userID]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`http://localhost:8080/application/getAllApplication`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
        
      } else {
        console.error('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error during application fetch:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApplications();
  }, [userID]);

  useEffect(() => {
    setTotalUsers(users.length);
    setTotalPets(pets.length);
    setTotalApplications(applications.length);
  }, [users, pets, applications]);



  const generateTableHeader = () => {
    switch (selectedOption) {
      case "All users":
        return (
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        );
      case "All pets":
        return (
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Color</th>
            <th>Size</th>
            <th>Vaccinated</th>
          </tr>
        );
      case "All applications":
        return (
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Type of Residence</th>
            <th>Rent or Own Home?</th>
            <th>Landlord Contact</th>
            <th>Status</th>
          </tr>
        );
      default:
        return null;
    }
  };
  const renderTableBody = () => {
    switch (selectedOption) {
      case 'All users':
        return users.map(user => (
          <tr key={user.userID}>
            <td>{user.userID}</td>
            <td>{user.fname}</td>
            <td>{user.lname}</td>
            <td>{user.address}</td>
            <td>{user.contact}</td>
            <td>{user.gender}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ));
      case 'All pets':
        return pets.map(pet => (
          <tr key={pet.petID}>
            <td>{pet.petID}</td>
            <td>{pet.name}</td>
            <td>{pet.age}</td>
            <td>{pet.gender}</td>
            <td>{pet.color}</td>
            <td>{pet.size}</td>
            <td>{pet.vaccinated}</td>
          </tr>
        ));
      case 'All applications':
        return applications.map(application => (
          <tr key={application.applicationID}>
            <td>{application.applicationID}</td>
            <td>{application.fname}</td>
            <td>{application.lname}</td>
            <td>{application.address}</td>
            <td>{application.city}</td>
            <td>{application.state}</td>
            <td>{application.typeResidence}</td>
            <td>{application.rentHome}</td>
            <td>{application.landlordContact}</td>
            <td>{application.status}</td>
          </tr>
        ));
      default:
        return null;
    }
  };

  const generateFoundDataHeader = () => {
    switch (selectedOption) {
      case 'All users':
        return (
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        );
      case 'All pets':
        return (
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Color</th>
            <th>Size</th>
            <th>Vaccinated</th>
          </tr>
        );
      case 'All applications':
        return (
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Type of Residence</th>
            <th>Rent or Own Home?</th>
            <th>Landlord Contact</th>
            <th>Status</th>
          </tr>
        );
      default:
        return null;
    }
  };

  const renderFoundDataBody = () => {
    switch (selectedOption) {
      case 'All users':
        return (
          <tr key={foundData.userID}>
            <td>{foundData.userID}</td>
            <td>{foundData.fname}</td>
            <td>{foundData.lname}</td>
            <td>{foundData.address}</td>
            <td>{foundData.contact}</td>
            <td>{foundData.gender}</td>
            <td>{foundData.email}</td>
            <td>{foundData.role}</td>
            
          </tr>
        );
      case 'All pets':
        return (
          <tr key={foundData.petID}>
            <td>{foundData.petID}</td>
            <td>{foundData.name}</td>
            <td>{foundData.age}</td>
            <td>{foundData.gender}</td>
            <td>{foundData.color}</td>
            <td>{foundData.size}</td>
            <td>{foundData.vaccinated}</td>
          </tr>
        );
      case 'All applications':
        return (
          <tr key={foundData.applicationID}>
            <td>{foundData.applicationID}</td>
            <td>{foundData.fname}</td>
            <td>{foundData.lname}</td>
            <td>{foundData.address}</td>
            <td>{foundData.city}</td>
            <td>{foundData.state}</td>
            <td>{foundData.typeResidence}</td>
            <td>{foundData.rentHome}</td>
            <td>{foundData.landlordContact}</td>
            <td>{foundData.status}</td>
          </tr>
        );
      default:
        return null;
    }
  };
  
  const renderFoundData = () => {
    if (foundData) {
      return (
        <table>
          <thead>{generateFoundDataHeader()}</thead>
          <tbody>
            {renderFoundDataBody()}
          </tbody>
        </table>
      );
    }
    return null; 
  };

  

  const renderTable = () => {
  if (foundData) {
    return (
      <table>
        <thead>{generateFoundDataHeader()}</thead>
        <tbody>{renderFoundDataBody()}</tbody>
      </table>
    );
  } else {
    return (
      <table>
        <thead>{generateTableHeader()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    );
  }
};
  

  const chartData = {
    labels: ["Users", "Pets", "Applications"],
    datasets: [
      {
        label: "Count",
        backgroundColor: ["rgba(75,192,192,0.4)", "rgba(255,99,132,0.4)", "rgba(255,206,86,0.4)"],
        borderColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)", "rgba(255,206,86,1)"],
        borderWidth: 1,
        hoverBackgroundColor: ["rgba(75,192,192,0.8)", "rgba(255,99,132,0.8)", "rgba(255,206,86,0.8)"],
        hoverBorderColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)", "rgba(255,206,86,1)"],
        data: [totalUsers, totalPets, totalApplications],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          maxRotation: 0, 
        },
      },
      y: {
        grid: {
          display: false, 
        },
        beginAtZero: true,
      },
    },
    elements: {
      bar: {

        borderRadius: 10, 
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
    responsive: true,
    aspectRatio: false, 
  };

  const loyalUsers = users.filter(user => applications.some(app => app.userID === user.userID));
  const loyaltyPercentage = loyalUsers.length > 0 ? (loyalUsers.length / totalUsers) * 100 : 0;

  const [searchID, setSearchID] = useState("");
  const [foundData, setFoundData] = useState(null);

  const handleFindID = () => {
    const searchIDNumber = Number(searchID);

    switch (selectedOption) {
      case "All users":
        setFoundData(users.find((user) => user.userID === searchIDNumber));
        break;
      case "All pets":
        setFoundData(pets.find((pet) => pet.petID === searchIDNumber));
        break;
      case "All applications":
        setFoundData(
          applications.find((application) => application.applicationID === searchIDNumber)
        );
        break;
      default:
        setFoundData(null);
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("dashboard-content");
  
    if (!element) {
      console.error("Dashboard content not found");
      return;
    }
  
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF({
      orientation: "landscape", 
      format: "a4",
    });
  
    const imgWidth = 290; 
    const padding = 10; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width + padding;
  
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("dashboard.pdf");
  };

  




  return (
    <>
      <div>

      <button onClick={handleExportPDF}>
        Export to PDF
      </button>
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <button
            style={{
              position: "absolute",
              top: "25px",
              right: "50px",
              textDecoration: "none",
              fontSize: "15px",
              padding: "8px 15px",
              borderRadius: "10px",
              color: "#27374D",
            }}
          >
            Back
          </button>
        </Link>

        <div className="User-buttons" style={{ marginTop: "20px" }}>
          <label style={{ marginLeft: "650px" }}>User ID: </label>
          <input
            type="text"
            id="lname"
            name="lname"
            style={{
              marginRight: "5px",
              marginBottom: "10px",
              padding: "5px",
              borderRadius: "5px",
              width: "60px", }}
            onChange={(e) => setSearchID(e.target.value)}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <button style={{ borderRadius: "5px", padding: "3px" }}onClick={handleFindID}>
            Find ID
        </button>

        </div>

        <div id="dashboard-content">

        <h2
          style={{
            textAlign: "center",
            margin: "30px 0 20px 0",
            color: "#27374D",
          }}
        >
          DASHBOARD 
        </h2>

        <div className="User-table3" style={{ overflowX: "auto" }}>
          <div className="User-table2" style={{ overflowX: "auto" }}>
            <div className="admin-image">
              <img
                src={"/images/user.png"}
                alt="User Profile"
                className="admin-profile-image"
                style={{ objectFit: "cover" }}
              />
            {" "}
            <div style={{ fontSize: '15px', color: '#27374D', marginLeft:20, marginTop: 10, }}>
               TOTAL NUMBER OF USERS
            </div>
            </div>
            <br />
            <div style={{ fontWeight: 'bold',fontSize: '30px', color: '#27374D',marginLeft: 80, marginTop:-10}}>
               {totalUsers}
            </div>
          </div>
          <div className="User-table2" style={{ overflowX: "auto" }}>
          <div className="admin-image">
              <img
                src={"/images/pawprint.png"}
                alt="User Profile"
                className="admin-profile-image"
                style={{ objectFit: "cover" }}
              />
            {" "}
            <div style={{ fontSize: '15px', color: '#27374D', marginLeft:20, marginTop: 10, }}>
               TOTAL NUMBER OF PETS
            </div>
            </div>
            <br />
            <div style={{ fontWeight: 'bold',fontSize: '30px', color: '#27374D',marginLeft: 80, marginTop:-10}}>
               {totalPets}
            </div>
          </div>
          <div className="User-table2" style={{ overflowX: "auto" }}>
          <div className="admin-image">
              <img
                src={"/images/form.png"}
                alt="User Profile"
                className="admin-profile-image"
                style={{ objectFit: "cover" }}
              />
            {" "}
            <div style={{ fontSize: '15px', color: '#27374D', marginLeft:20, marginTop: 10, }}>
               TOTAL NUMBER OF APPLICATIONS
            </div>
            </div>
            <br />
            <div style={{ fontWeight: 'bold',fontSize: '30px', color: '#27374D',marginLeft: 80, marginTop:-10}}>
               {totalApplications}
            </div>
          </div>
          <div className="User-table2" style={{ overflowX: "auto" }}>
          <div className="admin-image">
              <img
                src={"/images/heartt.png"}
                alt="User Profile"
                className="admin-profile-image"
                style={{ objectFit: "cover" }}
              />
            {" "}
            <div style={{ fontSize: '15px', color: '#27374D', marginLeft:20, marginTop: 10, }}>
               LOYALTY
            </div>
            </div>
            <br />
            <div style={{ fontWeight: 'bold',fontSize: '30px', color: '#27374D',marginLeft: 80, marginTop:-10}}>
                {loyaltyPercentage}%
            </div>
          </div>

        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
            <div className="bottom-div">
                
          <div className="User-table" style={{ overflowX: "auto" }}>
            <div>
              <FormControl sx={{ minWidth: 220, padding: "5px" }} size="small">
                <Select
                  labelId="colour-label"
                  id="table"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                
                  <MenuItem value="All users">All users</MenuItem>
                  <MenuItem value="All pets">All pets</MenuItem>
                  <MenuItem value="All applications">All applications</MenuItem>
                </Select>
              </FormControl>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
                <div>
    {foundData ? (
      renderFoundData()
    ) : (
      renderTable()
    )}
  </div>
            )} 
          </div>
          <div className="chart" style={{ overflowX: "auto", marginLeft: "20px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}

export default Dashboard;
