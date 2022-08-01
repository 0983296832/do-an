import React from "react";
import { Select } from "antd";
const { Option } = Select;

const FilterByGender = ({ genderFilter, setGenderFilter }) => {
  const handleChange = (value) => {
    setGenderFilter(value);
  };
  return (
    <div>
      <Select
        defaultValue={genderFilter}
        style={{
          width: 120,
        }}
        onChange={handleChange}
      >
        <Option value="da">da</Option>
        <Option value="vải">vải</Option>
      </Select>
    </div>
  );
};

export default FilterByGender;
