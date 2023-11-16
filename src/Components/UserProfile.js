// import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/system';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import {
//   Paper,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Button,
// } from '@mui/material';

// const ProfilePaper = styled(Paper)({
//   width: 300,
//   margin: '0 auto',
//   padding: 20,
// });

// const ProfileImage = styled('img')({
//   width: 100,
//   height: 100,
//   borderRadius: 50,
//   margin: '0 auto',
//   display: 'block',
// });

// const ProfileInfo = styled('div')({
//   marginTop: 20,
// });

// const ProfileInfoTitle = styled(Typography)({
//   fontSize: 24,
//   fontWeight: 'bold',
// });

// const ProfileInfoItem = styled(ListItem)({
//   margin: '0 0 10px 0',
// });

// const EditableListItem = styled(ListItem)({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// });

// const EditableListItemInput = styled(TextField)({
//   width: '150px',
// });

// const Profile = () => {
//   const [profileInfo, setProfileInfo] = useState({
//     email: 'hitoribucheng@gmail.com',
//     gender: 'Female',
//     address: 'Dayhagon, Medellin, Cebu',
//     contactNumber: '+63971234567',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();
//   const { userId } = useParams();

//   useEffect(() => {
//     // Simulating navigation after a short delay (replace with actual logic)
//     const timeoutId = setTimeout(() => {
//       setIsEditing(false); // Assuming you want to stop editing when navigating
//       navigate(`/userprofile/${userId}`);
//     }, 1000);

//     // Cleanup the timeout if the component unmounts
//     return () => clearTimeout(timeoutId);
//   }, [userId, navigate]);

//   const handleEditProfile = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleProfileInfoChange = (event) => {
//     const { name, value } = event.target;
//     setProfileInfo((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSaveProfile = () => {
//     setIsEditing(false);
//   };

//   const renderProfileInfoItem = (itemKey) => {
//     const editable = isEditing && itemKey !== 'email';

//     if (editable) {
//       return (
//         <EditableListItem>
//           <EditableListItemInput
//             name={itemKey}
//             value={profileInfo[itemKey]}
//             onChange={handleProfileInfoChange}
//           />
//           <Button variant="outlined" onClick={handleSaveProfile}>
//             Save
//           </Button>
//         </EditableListItem>
//       );
//     } else {
//       return (
//         <ProfileInfoItem>
//           <ListItemText primary={itemKey + ':'} secondary={profileInfo[itemKey]} />
//         </ProfileInfoItem>
//       );
//     }
//   };

//   return (
//     <ProfilePaper>
//       <ProfileImage src="https://i.imgur.com/example.png" alt="Hazelyn Bucheng's profile picture" />

//       <ProfileInfo>
//         <ProfileInfoTitle variant="h6">
//           Hazelyn Bucheng - User ID: {userId}
//         </ProfileInfoTitle>

//         <List>
//           {Object.keys(profileInfo).map((itemKey) => renderProfileInfoItem(itemKey))}
//         </List>

//         <Button variant="outlined" onClick={handleEditProfile}>
//           {isEditing ? 'Cancel Editing' : 'Edit Profile'}
//         </Button>

//         {/* Example Link to navigate to the home page */}
//         <Button component={Link} to="/">
//           Back to Home
//         </Button>
//       </ProfileInfo>
//     </ProfilePaper>
//   );
// };

// export default Profile;
