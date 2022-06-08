import React from "react";
import logo from "../assets/image/logo.png";
import { Input, Select, Button } from "antd";
import "../assets/css/header.css";
import { SearchOutlined } from "@ant-design/icons";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import nikeLogo from "../assets/image/nike-logo.webp";
import adidasLogo from "../assets/image/adidas-logo.webp";
import mlbLogo from "../assets/image/mlb-logo.webp";
import balenciagaLogo from "../assets/image/balenciaga-logo.webp";
import converseLogo from "../assets/image/converse-logo.webp";
import vansLogo from "../assets/image/vans-logo.webp";
import sportLogo from "../assets/image/giay-the-thao-logo.webp";
import sneakerLogo from "../assets/image/sneaker-logo.webp";
import gucciLogo from "../assets/image/GUCCI-logo.webp";
import { Link, useLocation } from "react-router-dom";

const { Option, OptGroup } = Select;

const Header = () => {
  let location = useLocation();
  const menu = [
    { logoImg: nikeLogo, title: "GIÀY NIKE", link: "/nike" },
    { logoImg: adidasLogo, title: "ADIDAS", link: "" },
    { logoImg: mlbLogo, title: "GIÀY MLB", link: "" },
    { logoImg: balenciagaLogo, title: "BALENCIAGA", link: "" },
    { logoImg: converseLogo, title: "CONVERSE", link: "" },
    { logoImg: vansLogo, title: "VANS", link: "" },
    { logoImg: sportLogo, title: "GIÀY THỂ THAO", link: "" },
    { logoImg: sneakerLogo, title: "GIÀY SNEAKER", link: "" },
    { logoImg: gucciLogo, title: "GUCCI", link: "" },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    <>
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="header-search">
          <Input placeholder="Tìm Kiếm..." className="search-input" />
          <Select
            className="search-select"
            defaultValue="lucy"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <OptGroup label="Manager">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </OptGroup>
            <OptGroup label="Engineer">
              <Option value="Yiminghe">yiminghe</Option>
            </OptGroup>
          </Select>
          <Button
            className="search-button"
            icon={<SearchOutlined />}
            size="large"
            href="https://www.google.com"
          />
        </div>
        <div className="header-infor">
          <FiShoppingCart className="infor-icon" />
          <h5 className="infor-money">1.230.000đ</h5>
          <Link to="/profile" style={{ color: "black" }}>
            <AiOutlineUser className="infor-icon" />
          </Link>

          <h6 className="cart-count">1</h6>
        </div>
      </div>
      <div className="menu ">
        <ul className="menu-list">
          {menu.map((item, index) => {
            return (
              <li className="menu-item" key={index}>
                <Link to={`/product-list${item.link}`}>
                  <img src={item.logoImg} alt="nike" className="item-img" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Header;
