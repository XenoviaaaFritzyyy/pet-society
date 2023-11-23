import React from "react";
import Navbar from "../Navbar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';

function K() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
          <Button component={Link} to="/DataDictionary/A" underline="none">
              {'A'}
            </Button>
            <Button component={Link} to="/DataDictionary/B" underline="none">
              {'B'}
            </Button>
            <Button component={Link} to="/DataDictionary/C" underline="none">
              {'C'}
            </Button>
            <Button component={Link} to="/DataDictionary/D" underline="none">
              {'D'}
            </Button>
            <Button component={Link} to="/DataDictionary/E" underline="none">
              {'E'}
            </Button>
            <Button component={Link} to="/DataDictionary/F" underline="none">
              {'F'}
            </Button>
            <Button component={Link} to="/DataDictionary/G" underline="none">
              {'G'}
            </Button>
            <Button component={Link} to="/DataDictionary/Hh" underline="none">
              {'H'}
            </Button>
            <Button component={Link} to="/DataDictionary/I" underline="none">
              {'I'}
            </Button>
            <Button component={Link} to="/DataDictionary/J" underline="none">
              {'J'}
            </Button>
            <Button component={Link} to="/DataDictionary/K" underline="none">
              {'K'}
            </Button>
            <Button component={Link} to="/DataDictionary/L" underline="none">
              {'L'}
            </Button>
            <Button component={Link} to="/DataDictionary/M" underline="none">
              {'M'}
            </Button>
            <Button component={Link} to="/DataDictionary/N" underline="none">
              {'N'}
            </Button>
            <Button component={Link} to="/DataDictionary/O" underline="none">
              {'O'}
            </Button>
            <Button component={Link} to="/DataDictionary/P" underline="none">
              {'P'}
            </Button>
            <Button component={Link} to="/DataDictionary/Q" underline="none">
              {'Q'}
            </Button>
            <Button component={Link} to="/DataDictionary/R" underline="none">
              {'R'}
            </Button>
            <Button component={Link} to="/DataDictionary/S" underline="none">
              {'S'}
            </Button>
            <Button component={Link} to="/DataDictionary/Tt" underline="none">
              {'T'}
            </Button>
            <Button component={Link} to="/DataDictionary/U" underline="none">
              {'U'}
            </Button>
            <Button component={Link} to="/DataDictionary/V" underline="none">
              {'V'}
            </Button>
            <Button component={Link} to="/DataDictionary/W" underline="none">
              {'W'}
            </Button>
            <Button component={Link} to="/DataDictionary/X" underline="none">
              {'X'}
            </Button>
            <Button component={Link} to="/DataDictionary/Y" underline="none">
              {'Y'}
            </Button>
            <Button component={Link} to="/DataDictionary/Z" underline="none">
              {'Z'}
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </>
  );
}

export default K;
