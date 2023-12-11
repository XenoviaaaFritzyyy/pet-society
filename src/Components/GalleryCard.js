import React, { useState, useEffect } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../Components/AuthContext";

const GalleryCard = ({ galID, name, image, description, profile, createdBy }) => {
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);
    const { userID, setUserID } = useAuth();
    const [gallerys, setGallerys] = React.useState([]);

    useEffect(() => {
        const fetchGallery = async () => {
        try {
            const response = await fetch("http://localhost:8080/gallery/getAllGallery");
            const data = await response.json();

        if (response.ok) {
            const filteredPets = data.filter((gallery) => !gallery.deleted);
            setGallerys(filteredPets);
        } else {
            console.error("Failed to fetch gallery:", data);
        }
        } catch (error) {
            console.error("Error during fetching gallery:", error);
        } finally {
        }
    };
    fetchGallery();
    }, []);

    const handleDeleteGallery = async () => {
        console.log("Deleting gallery with ID:", galID);

    if (!galID) {
        alert("galID cannot be empty for deleting");
        return;
    }

    // Prompt user for confirmation
    setDeleteConfirmationOpen(true);
    };

    const handleConfirmDelete = async () => {
    try {
        const response = await fetch(`http://localhost:8080/gallery/deleteGallery/${galID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            galID: galID,
            deleted: true,
        }),
        });

    if (response.ok) {
        console.log("Gallery marked as deleted successfully");
        setGallerys((prevGallerys) => prevGallerys.filter((gallery) => gallery.galID !== galID));
    } else {
        console.error("Failed to mark Gallery as deleted:", response.statusText);
    }
    } catch (error) {
        console.error("Error during marking gallery as deleted:", error);
    } finally {
        setDeleteConfirmationOpen(false);
    }
    };

    const [profileInfo, setProfileInfo] = useState({
        fname: "",
        lname: "",
        photoPath: "",
    });

    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/user/${userID}`);
        if (response.ok) {
            const data = await response.json();
            setProfileInfo(data);
        } else {
            console.error("Failed to fetch user profile");
        }
        } catch (error) {
            console.error("Error during user profile fetch:", error);
        } finally {
            setLoading(false);
        }
    };

    if (userID) {
        fetchUserProfile();
    }
    }, [userID]);

    useEffect(() => {
        if (userID) {
        localStorage.setItem("userID", userID);
        }
    }, [userID]);

    useEffect(() => {
        const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
        setUserID(storedUserID);
        }
    }, []);

    console.log("Inside JSX - createdBy:", createdBy);
    console.log("Inside JSX - userID:", userID);

    return (
        <>
        <Card
        sx={{
            width: "740px",
            height: "auto",
            marginBottom: "20px",
            borderRadius: "10px",
        }} >
        <CardMedia
            component="img"
            height="450"
            width={"100%"}
            image={image ? `http://localhost:8080/gallery/${image}` : "/images/logo.png"}
        />
        <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
            <img
                src={profile ? `http://localhost:8080/user/${profile}` : "/images/default-pic.jpg"}
                alt="User Profile"
                className="user-profile-image"
                style={{
                width: "45px",
                height: "40px",
                objectFit: "cover",
                borderRadius: "50%",
                }}
            />
            <div style={{ marginLeft: "10px" }}>
                <Typography variant="h5" color="text.primary" sx={{ fontWeight: "bold" }}>
                    {name}
                </Typography>
            </div>
            <div style={{ marginLeft: "auto" }}>
                <IconButton
                    aria-label="add to favorites"
                    onClick={() => setIsFavoriteClicked(!isFavoriteClicked)}
                    style={{ color: isFavoriteClicked ? "red" : "inherit" }} >
                <FavoriteIcon />
                </IconButton>
            </div>
            </div>
            <Typography variant="body2" color="text.secondary" style={{ marginLeft: "55px" }}>
                {description}
            </Typography>
            {String(createdBy) === String(userID) && (
            <Button
                color="primary"
                variant="contained"
                sx={{
                backgroundColor: "white",
                color: "#27374D",
                "&:hover": { backgroundColor: "#142132", color: "white" },
                borderRadius: "8px",
                border: ".1px solid #27374D",
                marginLeft: "auto",
                display: "flex",
                width: 100,
                whiteSpace: "nowrap",
                fontSize: 10,
                }}
                onClick={handleDeleteGallery} >
                Delete
            </Button>
            )}
        </CardContent>
        <CardActions disableSpacing></CardActions>
        </Card>

      {/* Delete Confirmation Dialog */}
    <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure you want to delete this gallery?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setDeleteConfirmationOpen(false)} 
                color="primary" style={{ backgroundColor: "red", color: "white" }}>
                Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" 
                style={{ backgroundColor: "#4caf50", color: "white" }}>
                Delete
            </Button>
        </DialogActions>
        </Dialog>
    </>
    );
};

export default GalleryCard;
