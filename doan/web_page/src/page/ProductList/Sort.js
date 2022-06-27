import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";

const Sort = ({ setSort, sort }) => {
  const handleChangeFilter = (event) => {
    setSort(event.target.value);
  };
  return (
    <FormControl sx={{ minWidth: 250, marginBottom: 3 }}>
      <InputLabel id="demo-simple-select-helper-label">Sắp xếp theo</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={sort}
        label="Sắp xếp theo"
        onChange={handleChangeFilter}
      >
        <MenuItem value="mặc định">Mặc định</MenuItem>
        <MenuItem value="price">Giá tăng dần</MenuItem>
        <MenuItem value="-price">Giá giảm dần</MenuItem>
        <MenuItem value="created">Mới nhất</MenuItem>
        <MenuItem value="-created">Cũ nhất</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
