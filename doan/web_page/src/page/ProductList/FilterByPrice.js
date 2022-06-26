import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterByPrice = ({
  priceFilter,
  setPriceFilter,
  expandedPrice,
  setExpandedPrice,
}) => {
  const [price, setPrice] = useState(priceFilter);
  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };
  return (
    <Accordion sx={{ minWidth: 250, marginBottom: 4 }} expanded={expandedPrice}>
      <AccordionSummary
        sx={{ minWidth: 250 }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={() => setExpandedPrice(!expandedPrice)}
      >
        <Typography>Lọc Theo Giá</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ minWidth: 250 }}>
        <Box sx={{ width: 200 }}>
          <Slider
            min={10}
            max={3000}
            value={price}
            onChange={handleChangePrice}
          />
          <Typography sx={{ fontSize: 15 }}>
            Giá: {price[0].toLocaleString()},000đ - {price[1].toLocaleString()}
            ,000đ
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <button
              className="filter-btn"
              onClick={() => setPriceFilter(price)}
            >
              Lọc
            </button>
          </div>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterByPrice;
