import React from "react";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
function Dictionary() {
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
            <Button>A</Button>
            <Button>B</Button>
            <Button>C</Button>
            <Button>D</Button>
            <Button>E</Button>
            <Button>F</Button>
            <Button>G</Button>
            <Button>H</Button>
            <Button>I</Button>
            <Button>J</Button>
            <Button>K</Button>
            <Button>L</Button>
            <Button>M</Button>
            <Button>N</Button>
            <Button>O</Button>
            <Button>P</Button>
            <Button>Q</Button>
            <Button>R</Button>
            <Button>S</Button>
            <Button>T</Button>
            <Button>U</Button>
            <Button>V</Button>
            <Button>W</Button>
            <Button>X</Button>
            <Button>Y</Button>
            <Button>Z</Button>
          </ButtonGroup>
        </Box>
      </div>
    </>
  );
}

export default Dictionary;
