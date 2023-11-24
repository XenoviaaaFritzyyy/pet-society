// UserProfile.js
import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import "../Css/UserProfile.css";
import Navbar from "./Navbar";

// Define styled components
const ProfilePaper = styled(Paper)(({ isEditing }) => ({
  width: "1199px",
  height: "650px", // Adjusted height
  margin: "20px auto 0",
  display: "flex",
  borderRadius: "20px",
}));

const Container = styled("div")({
  background: "#27374D",
  borderRadius: "20px",
  padding: "20px",
  marginLeft: "70px",
  marginTop: "15px",
  fontFamily: "Josefin Sans, sans-serif",
  color: "#FFFFFF",
  width: "620px",
  boxSizing: "border-box",
});

const ProfileImageContainer = styled("div")({
  marginLeft: "80px",
  marginRight: "30px",
  textAlign: "right",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
});

const ProfileImage = styled("img")({
  width: "350px",
  height: "350px",
  borderRadius: "200px",
});

const ChangePasswordContainer = styled("div")({
  background: "#27374D",
  borderRadius: "20px",
  padding: "20px",
  marginLeft: "70px",
  marginTop: "30px",
  fontFamily: "Josefin Sans, sans-serif",
  color: "#FFFFFF",
  width: "620px",
  boxSizing: "border-box",
});


const EditableListItemInput = styled(TextField)({
  width: "500px",
  backgroundColor: "#FFFFFF",
});


const EditProfileButtonContainer = styled("div")({
  marginTop: "20px",
});

const EditProfileButton = styled(Button)({
  color: "#DDE6ED",
  backgroundColor: "#27374D",
  fontFamily: "Josefin Sans, sans-serif",
  marginRight: "105px",
});

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({
    firstName: "Hazelyn",
    lastName: "Bucheng",
    email: "hitoribucheng@gmail.com",
    gender: "Female",
    address: "Dayhagon, Medellin, Cebu",
    contactNumber: "+63971234567",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const userId = "123";
  const actualOldPassword = "actualOldPassword"; // Replace with the actual old password

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsEditing(false);
      console.log(`Navigating to /userprofile/${userId}`);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [userId]);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    if (isChangingPassword) {
      setIsChangingPassword(false);
    }
  };

  const handleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleProfileInfoChange = (event) => {
    const { name, value } = event.target;
    setProfileInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveProfile = () => {
  if (isEditing) {
    setIsEditing(false);
    console.log("Saving profile:", profileInfo);
    // Add logic to save the profile information to your backend or wherever it needs to be saved
  }
  };

  const handleSavePassword = () => {
    if (passwordInfo.oldPassword !== actualOldPassword) {
      console.log("Incorrect old password. Please try again.");
      return;
    }

    setIsChangingPassword(false);
    console.log("Saving password:", passwordInfo.newPassword);
  };

const renderProfileInfoItem = (itemKey) => {
  const label = itemKey === "firstName" ? "First Name" : itemKey.charAt(0).toUpperCase() + itemKey.slice(1);

  if (itemKey === "password" && isChangingPassword) {
    return (
      <>
        <ListItem key="oldPassword">
          <ListItemText
            primary={<strong>{label}:</strong>}
            secondary={
              <EditableListItemInput
                type="password"
                name="oldPassword"
                value={passwordInfo.oldPassword}
                onChange={handlePasswordChange}
              />
            }
          />
        </ListItem>
        <ListItem key="newPassword">
          <ListItemText
            primary={<strong>New {label}:</strong>}
            secondary={
              <EditableListItemInput
                type="password"
                name="newPassword"
                value={passwordInfo.newPassword}
                onChange={handlePasswordChange}
              />
            }
          />
        </ListItem>
      </>
    );
  }

  return (
    <ListItem key={itemKey}>
      <ListItemText
        primary={<strong style={{ fontSize: "18px" }}>{label}:</strong>} // Adjust font size for the label
        secondary={
          isEditing ? (
            itemKey === "gender" ? (
              <EditableListItemInput
                name={itemKey}
                value={profileInfo[itemKey]}
                onChange={handleProfileInfoChange}
                select
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </EditableListItemInput>
            ) : (
              <EditableListItemInput
                name={itemKey}
                value={profileInfo[itemKey]}
                onChange={handleProfileInfoChange}
                
              />
            )
          ) : (
            profileInfo[itemKey]
          )
        }
        style={{ color: "#FFFFFF" }} // Set text color to white
      />
    </ListItem>
  );
};

  const renderProfileInfoSection = () => (
    <>
      <List>
        {Object.keys(profileInfo).map((itemKey) => renderProfileInfoItem(itemKey))}
        {isEditing && (
          <ListItem>
            <EditProfileButton variant="outlined" onClick={handleSaveProfile}>
              Save
            </EditProfileButton>
          </ListItem>
        )}
      </List>
    </>
  );

  const renderChangePasswordSection = () => {
    if (isEditing) {
      return (
        <>
          <ChangePasswordContainer>
            <List>
              <ListItem>
                <EditProfileButton variant="outlined" onClick={handleChangePassword}>
                  Change Password
                </EditProfileButton>
              </ListItem>
            </List>
            {isChangingPassword && (
              <List>
                <ListItem>
                  <ListItemText
                    primary="Old Password:"
                    secondary={
                      <EditableListItemInput
                        type="password"
                        name="oldPassword"
                        value={passwordInfo.oldPassword}
                        onChange={handlePasswordChange}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="New Password:"
                    secondary={
                      <EditableListItemInput
                        type="password"
                        name="newPassword"
                        value={passwordInfo.newPassword}
                        onChange={handlePasswordChange}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <EditProfileButton variant="outlined" onClick={handleSavePassword}>
                    Save Password
                  </EditProfileButton>
                </ListItem>
              </List>
            )}
          </ChangePasswordContainer>
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <Navbar />
      <ProfilePaper
        style={{
          height: isChangingPassword ? "1300px" : isEditing ? "1000px" : "600px",
        }}
      >
        <Grid container alignItems="center">
          <Grid item textAlign="center">
            <ProfileImageContainer>
              <ProfileImage
                src="/images/RobFinal.jpg"
                alt={`${profileInfo.name}'s profile picture`}
              />
              <EditProfileButtonContainer>
                <EditProfileButton variant="outlined" onClick={handleEditProfile}>
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </EditProfileButton>
              </EditProfileButtonContainer>
            </ProfileImageContainer>
          </Grid>
          <Grid item textAlign="left">
            <Grid container direction="column" alignItems="flex-start">
              <Grid item>
                <Container isEditing={isEditing}>{renderProfileInfoSection()}</Container>
              </Grid>
              <Grid item>{renderChangePasswordSection()}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </ProfilePaper>
    </div>
  );
};

export default Profile;
