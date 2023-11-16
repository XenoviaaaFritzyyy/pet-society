import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@mui/material';
import '../Css/UserProfile.css';

// // Define styled components
// const ProfilePaper = styled(Paper)({
//   width: 1199,
//   height: 620,
//   margin: '0 auto',
//   display: 'flex',
//   borderRadius: 20,
// });

// const ProfileInfoContainer = styled('div')({
//   background: '#27374D',
//   borderRadius: 20,
//   padding: 20,
//   marginLeft: 20,
//   fontFamily: 'Josefin Sans, sans-serif',
//   color: '#FFFFFF',
//   width: 620,
//   height: 620,
//   boxSizing: 'border-box',
// });

// const ProfileInfo = styled('div')({
//   marginTop: 20,
// });

// const ProfileImageContainer = styled('div')({
//   marginRight: 20,
// });

// const ProfileImage = styled('img')({
//   width: 100,
//   height: 100,
//   borderRadius: 50,
//   margin: '0 auto',
//   display: 'block',
// });

// const EditableListItem = styled(ListItem)({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// });

// const EditableListItemInput = styled(TextField)({
//   width: '150px',
// });

// const EditProfileButtonContainer = styled('div')({
//   marginTop: 20,
// });

// const EditProfileButton = styled(Button)({
//   color: '#DDE6ED',
//   backgroundColor: '#27374D',
//   fontFamily: 'Josefin Sans, sans-serif',
//   marginRight: 20,
// });

// const Profile = () => {
//   const [profileInfo, setProfileInfo] = useState({
//     firstName: 'Hazelyn',
//     lastName: 'Bucheng',
//     email: 'hitoribucheng@gmail.com',
//     gender: 'Female',
//     address: 'Dayhagon, Medellin, Cebu',
//     contactNumber: '+63971234567',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const userId = '123';

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setIsEditing(false);
//       console.log(`Navigating to /userprofile/${userId}`);
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [userId]);

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
//         <EditableListItem key={itemKey}>
//           <EditableListItemInput
//             name={itemKey}
//             value={profileInfo[itemKey]}
//             onChange={handleProfileInfoChange}
//           />
//           <EditProfileButton variant="outlined" onClick={handleSaveProfile}>
//             Save
//           </EditProfileButton>
//         </EditableListItem>
//       );
//     } else {
//       return (
//         <ListItem key={itemKey}>
//           <ListItemText primary={itemKey === 'name' ? 'Name:' : itemKey + ':'} secondary={profileInfo[itemKey]} />
//         </ListItem>
//       );
//     }
//   };

//   return (
//     <ProfilePaper>
//       <ProfileImageContainer>
//         <ProfileImage src="/images/userprofile.png" alt={`${profileInfo.name}'s profile picture`} />
//       </ProfileImageContainer>
//       <ProfileInfoContainer>
//         <ProfileInfo>
//           <List>
//             {Object.keys(profileInfo).map((itemKey) => renderProfileInfoItem(itemKey))}
//           </List>
//         </ProfileInfo>
//         <EditProfileButtonContainer>
//           <EditProfileButton variant="outlined" onClick={handleEditProfile}>
//             {isEditing ? 'Cancel Editing' : 'Edit Profile'}
//           </EditProfileButton>
//         </EditProfileButtonContainer>
//       </ProfileInfoContainer>
//     </ProfilePaper>
//   );
// };

// export default Profile;
