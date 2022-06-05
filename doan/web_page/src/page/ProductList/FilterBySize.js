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

const FilterBySize = () => {
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
          <Button sx={{ color: "#000" }}>36</Button>
          <Button sx={{ color: "#000" }}>37</Button>
          <Button sx={{ color: "#000" }}>38</Button>
          <Button sx={{ color: "#000" }}>39</Button>
          <Button sx={{ color: "#000" }}>40</Button>
          <Button sx={{ color: "#000" }}>41</Button>
          <Button sx={{ color: "#000" }}>42</Button>
          <Button sx={{ color: "#000" }}>43</Button>
          <Button sx={{ color: "#000" }}>44</Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterBySize;
