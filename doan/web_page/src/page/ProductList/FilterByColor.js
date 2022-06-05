import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Slider,
  ButtonGroup,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterByColor = () => {
  const [color, setColor] = React.useState([
    "black",
    "blue",
    "red",
    "white",
    "yellow",
    "green",
    "orange",
  ]);
  return (
    <Accordion sx={{ minWidth: 250, marginBottom: 8 }}>
      <AccordionSummary
        sx={{ minWidth: 250 }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Lọc Theo Size</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ minWidth: 250 }}>
        <Box sx={{ width: 200 }}>
          {color.map((item, index) => {
            return (
              <div
                key={index}
                className="color-btn"
                style={{ backgroundColor: item }}
              ></div>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterByColor;
