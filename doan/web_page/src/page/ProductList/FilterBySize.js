import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterBySize = ({
  sizeFilter,
  setSizeFilter,
  expandedSize,
  setExpandedSize,
}) => {
  const [size, setSize] = useState([36, 37, 38, 39, 40, 41, 42, 43]);
  const [activeSize, setActiveSize] = useState(size.indexOf(sizeFilter));
  const handleActivSize = (index) => {
    if (index === activeSize) {
      setActiveSize(null);
      setSizeFilter("");
    } else {
      setActiveSize(index);
      setSizeFilter(size[index]);
    }
  };
  return (
    <Accordion sx={{ minWidth: 250, marginBottom: 4 }} expanded={expandedSize}>
      <AccordionSummary
        sx={{ minWidth: 250 }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={() => setExpandedSize(!expandedSize)}
      >
        <Typography>Lọc Theo Size</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ minWidth: 250 }}>
        <Box sx={{ width: 200 }}>
          {size.map((item, index) => {
            return (
              <Button
                sx={{
                  color: activeSize === index ? "purple" : "gray",
                  fontWeight: "medium",
                }}
                key={index}
                onClick={() => handleActivSize(index)}
              >
                {item}
              </Button>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterBySize;
