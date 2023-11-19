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
        <Grid container direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography className="footer-contact" variant="h5">
              Contact Us
            </Typography>
          </Grid>
          <Grid item xs={12} className="contact-info">
            <Typography variant="subtitle1">
              Address: 143, Main Road, Skena.
            </Typography>
            <Typography variant="subtitle1">
              Email: petsociety@gmail.com
            </Typography>
            <Typography variant="subtitle1">
              Phone Number: +639191610325
            </Typography>
          </Grid>
        </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              {`Copyright © ${new Date().getFullYear()} Pet Society`}
            </Typography>
          </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
