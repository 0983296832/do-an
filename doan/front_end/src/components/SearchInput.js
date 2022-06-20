import React, { useState } from "react";
import { Input, AutoComplete } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { GiConverseShoe } from "react-icons/gi";
import "../assets/css/input-search.css";
import Users from "../services/userServices";
import Products from "../services/productServices";
import { Link } from "react-router-dom";

const SearchInput = () => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  const onSearch = async (searchText) => {
    setSearch(searchText);
    if (searchText.length < 3) return;

    try {
      const paramsUsers = {
        page: 1,
        limit: 1000,
        "name[regex]": searchText,
      };
      const paramsProducts = {
        page: 1,
        limit: 1000,
        "name[regex]": searchText,
      };
      const users = await Users.getUsers(paramsUsers);
      const products = await Products.getProducts(paramsProducts);
      setOptions(
        !searchText
          ? []
          : [
              {
                label: renderTitle("Users", "user"),
                options: users?.result.map((user) => {
                  return renderItem(
                    user.name,
                    user.orders.length,
                    <UserOutlined />,
                    user._id,
                    "user-detail"
                  );
                }),
              },
              {
                label: renderTitle("Products", "product"),
                options: products?.data.map((product) => {
                  return renderItem(
                    product.name,
                    product.details.reduce((result, item) => {
                      return result + item.quantity;
                    }, 0),
                    <GiConverseShoe />,
                    product._id,
                    "product-detail"
                  );
                }),
              },
            ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = (data) => {
    setSearch("");
  };

  return (
    <div>
      <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={500}
        style={{
          width: 250,
        }}
        onSearch={onSearch}
        onSelect={onSelect}
        options={options}
      >
        <Input.Search
          size="medium"
          placeholder="Type something..."
          allowClear
          value={search}
        />
      </AutoComplete>
    </div>
  );
};

export default SearchInput;

const renderTitle = (title, path) => (
  <>
    <span>{title}</span>
    <Link
      to={`/${path}`}
      style={{
        float: "right",
      }}
    >
      more
    </Link>
  </>
);

const renderItem = (title, count, icon, id, path) => ({
  value: title,
  label: (
    <Link
      to={`/${path}/${id}`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        color: "black",
      }}
    >
      {title}
      <span>
        {icon} {count}
      </span>
    </Link>
  ),
});

// const options = [
//   {
//     label: renderTitle("Users"),
//     options: [
//       renderItem("AntDesign", 10000, <UserOutlined />),
//       renderItem("AntDesign UI", 10600, <UserOutlined />),
//     ],
//   },
//   {
//     label: renderTitle("Products"),
//     options: [
//       renderItem("AntDesign UI FAQ", 60100, <GiConverseShoe />),
//       renderItem("AntDesign FAQ", 30010, <GiConverseShoe />),
//     ],
//   },
//   {
//     label: renderTitle("Orders"),
//     options: [
//       renderItem("AntDesign design language", 100000, <FiFileText />),
//       renderItem("AntDesign design language", 100000, <FiFileText />),
//     ],
//   },
// ];
