// Footer.js
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import '../Css/Footer.css';

const Footer = () => {
  return (
    <Box
      className="box-container"
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: '68px', marginTop: '8px' }}>
            <Typography className="footer-contact" variant="subtitle1">
              Contact Us
            </Typography>
            <Typography variant="subtitle1">
              Address: 143, Main Road, Skena
            </Typography>
            <Typography variant="subtitle1">
              Email: <a href="mailto:petsociety@gmail.com" className="email-link">petsociety@gmail.com</a>
            </Typography>
            <Typography variant="subtitle2">
              Phone Number: +639191610325
            </Typography>
          </Grid>
          <Grid item xs={12}>
          
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/facebook-icon.png" alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/instagram-icon.png" alt="Instagram" className="social-icon" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/twitter-icon.png" alt="Twitter" className="social-icon" />
              </a>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="copyright" style={{ marginTop: '8px' }}>
            <Typography variant="subtitle1">
              {`Copyright © ${new Date().getFullYear()} Pet Society`}
            </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
