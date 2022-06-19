import React from "react";
import { Input, AutoComplete } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../assets/css/input-search.css";

const SearchInput = () => {
  return (
    <div>
      <Complete />
    </div>
  );
};

export default SearchInput;

const renderTitle = (title) => <span>{title}</span>;

const renderItem = (title, count, icon) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <span>
        {icon}
        {count}
      </span>
    </div>
  ),
});

const options = [
  {
    label: renderTitle("Người dùng"),
    options: [
      renderItem("AntDesign", 10000, <UserOutlined />),
      renderItem("AntDesign UI", 10600, <UserOutlined />),
    ],
  },
  {
    label: renderTitle("Sản phẩm"),
    options: [
      renderItem("AntDesign UI FAQ", 60100, <UserOutlined />),
      renderItem("AntDesign FAQ", 30010, <UserOutlined />),
    ],
  },
  {
    label: renderTitle("Nhà cung cấp"),
    options: [
      renderItem("AntDesign design language", 100000, <UserOutlined />),
    ],
  },
];

const Complete = () => (
  <AutoComplete
    dropdownClassName="certain-category-search-dropdown"
    dropdownMatchSelectWidth={500}
    style={{
      width: 250,
    }}
    options={options}
  >
    <Input.Search size="medium" placeholder="Nhập gì đó ...." />
  </AutoComplete>
);
