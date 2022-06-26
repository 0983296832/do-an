import React, { useState } from "react";
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

const FilterByColor = ({
  colorFilter,
  setColorFilter,
  setExpandedColor,
  expandedColor,
}) => {
  const [color, setColor] = useState([
    "black",
    "blue",
    "red",
    "white",
    "yellow",
    "green",
    "orange",
    "gray",
    "purple",
  ]);
  const [activeColor, setActiveColor] = useState(color.indexOf(colorFilter));
  const handleActiveColor = (index) => {
    if (index === activeColor) {
      setActiveColor(null);
      setColorFilter("");
    } else {
      setActiveColor(index);
      setColorFilter(color[index]);
    }
  };
  return (
    <Accordion sx={{ minWidth: 250, marginBottom: 4 }} expanded={expandedColor}>
      <AccordionSummary
        sx={{ minWidth: 250 }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={() => setExpandedColor(!expandedColor)}
      >
        <Typography>Lọc Theo Màu</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ minWidth: 250 }}>
        <Box sx={{ width: 200 }}>
          {color.map((item, index) => {
            return (
              <div
                key={index}
                className={`color-btn ${
                  index === activeColor && "activeColor"
                }`}
                style={{ backgroundColor: item }}
                onClick={() => handleActiveColor(index)}
              ></div>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterByColor;
