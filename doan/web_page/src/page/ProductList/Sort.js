import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";

const Sort = () => {
  const [filter, setFilter] = React.useState(0);
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  return (
    <FormControl sx={{ minWidth: 250, marginBottom: 8 }}>
      <InputLabel id="demo-simple-select-helper-label">Sắp xếp theo</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={filter}
        label="Sắp xếp theo"
        onChange={handleChangeFilter}
      >
        <MenuItem value={0}>Mặc định</MenuItem>
        <MenuItem value={10}>Giá tăng dần</MenuItem>
        <MenuItem value={20}>Giá giảm dần</MenuItem>
        <MenuItem value={30}>Mới nhất</MenuItem>
        <MenuItem value={30}>Cũ nhất</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
