import React, { useContext, useState } from "react";
import logo from "../assets/image/logo.png";
import { Select, Button, AutoComplete, Menu, Dropdown, Badge } from "antd";
import "../assets/css/header.css";
import {
  FileSearchOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
import { CartContext } from "../context/CartContext";
import Toast from "./Toast";
import Products from "../services/productServices";

const { Option } = Select;
const ellipseString = (text) => {
  if (text.length > 40) return text.substring(0, 40) + "...";
  else return text;
};
const user = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <Link to="/profile">
            <UserOutlined /> Người dùng
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link to="/order/null">
            <FileSearchOutlined /> Tra cứu đơn hàng
          </Link>
        ),
      },
    ]}
  />
);
const Header = () => {
  const { cartState } = useContext(CartContext);
  let location = useLocation();
  const menu = [
    { logoImg: nikeLogo, title: "GIÀY NIKE", link: "/Nike" },
    { logoImg: adidasLogo, title: "ADIDAS", link: "/Adidas" },
    { logoImg: mlbLogo, title: "GIÀY MLB", link: "" },
    { logoImg: balenciagaLogo, title: "BALENCIAGA", link: "" },
    { logoImg: converseLogo, title: "CONVERSE", link: "" },
    { logoImg: vansLogo, title: "VANS", link: "/Vans" },
    { logoImg: sportLogo, title: "GIÀY THỂ THAO", link: "" },
    { logoImg: sneakerLogo, title: "GIÀY SNEAKER", link: "" },
    { logoImg: gucciLogo, title: "GUCCI", link: "" },
  ];
  const [options, setOptions] = useState([]);
  const [searchBy, setSearchBy] = useState("tất cả");
  const [searchValues, setSearchValues] = useState();
  const renderTitle = (item) => ({
    value: item.name,
    label: (
      <Link to={`/product-details/${item.id}`}>
        <div className="autoComplete-item">
          <img src={item.image} alt="" />
          <div className="autoComplete-item-info">
            <div style={{ maxWidth: 100, wordWrap: "break-word" }}>
              <h4 style={{ minHeight: 44 }}>{ellipseString(item.name)}</h4>
            </div>

            <div className="product-price">
              {item.sale && <h4 className="sale">{item.price}đ</h4>}
              <h4>{item.priceSale}đ</h4>
            </div>
          </div>
          <img src={item.image} alt="" />
        </div>
      </Link>
    ),
  });

  const onSearch = async (searchText) => {
    try {
      const search = searchText;
      let params;
      if (searchBy === "tất cả") {
        params = {
          page: 1,
          limit: 0,
          "name[regex]": search,
        };
      } else {
        params = {
          page: 1,
          limit: 0,
          "name[regex]": search,
          "brand[regex]": searchBy,
        };
      }

      const {
        data: { data },
      } = await Products.getProducts(params);

      await setOptions(
        !searchText
          ? []
          : data.map((item) =>
              renderTitle({
                id: item._id,
                name: item.name,
                price: item.price,
                priceSale: item.price * ((100 - item.discount) / 100),
                image: item.image[0].imageUrl,
                sale: item.discount > 0,
              })
            )
      );
      setSearchValues(searchText);
      return;
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const onSelect = (data) => {
    // console.log(object);
  };

  const handleChange = (value) => {
    setSearchBy(value);
  };
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot"
  ) {
    return null;
  }
  return (
    <>
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="header-search">
          <AutoComplete
            options={options}
            className="search-input"
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Tìm kiếm..."
            dropdownMatchSelectWidth={500}
            allowClear
            defaultValue=""
            onClear={() => setOptions([])}
            // autoComplete
          />

          <Select
            className="search-select"
            defaultValue={searchBy}
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="tất cả">Tất cả</Option>
            <Option value="Adidas">Adidas</Option>
            <Option value="Vans">Vans</Option>
            <Option value="Nike">Nike</Option>
          </Select>
          <Button
            className="search-button"
            icon={<SearchOutlined />}
            size="large"
            href={`http://localhost:3000/product-list-search?name=${searchValues}&brand=${searchBy}`}
            style={{ marginTop: 1 }}
          />
        </div>
        <div className="header-infor">
          <Link to="/cart">
            <Badge
              count={cartState.amount}
              color="black"
              size="small"
              title={`Giỏ hàng của bạn đang có ${cartState.amount} sản phẩm`}
            >
              <FiShoppingCart
                className="infor-icon"
                style={{ color: "black" }}
              />
            </Badge>
          </Link>

          <h5 className="infor-money">
            {Number(cartState.total).toLocaleString()}đ
          </h5>
          <Dropdown overlay={user} placement="bottom" className="infor-icon">
            <AiOutlineUser className="infor-icon" />
          </Dropdown>

          {/* <h6 className="cart-count">{cartState.amount}</h6> */}
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
