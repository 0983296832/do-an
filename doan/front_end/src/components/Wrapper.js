import React, { useContext, useState } from "react";
import "../assets/css/wrapper.css";
import SearchInput from "./SearchInput";
import {
  AiOutlineGlobal,
  AiOutlineBell,
  AiOutlineSetting,
  AiOutlineCreditCard,
} from "react-icons/ai";
import {
  BiMoon,
  BiMessageDots,
  BiStoreAlt,
  BiLogOut,
  BiNews,
} from "react-icons/bi";
import { Avatar } from "antd";
import {
  MdDashboard,
  MdLocalShipping,
  MdOutlineInventory2,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { ImStatsDots, ImProfile } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Auth from "../services/authServices";
import Toast from "./Toast";

const Wrapper = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState({ title: "Main", activeId: 0 });

  let location = useLocation();
  const data = [
    {
      title: "Main",
      children: [{ icon: <MdDashboard />, link: "Dashboard", path: "/" }],
    },
    {
      title: "Lists",
      children: [
        { icon: <FaRegUser />, link: "Users", path: "/user" },
        { icon: <BiStoreAlt />, link: "Products", path: "/product" },
        { icon: <AiOutlineCreditCard />, link: "Orders", path: "/order" },
        { icon: <MdLocalShipping />, link: "Suppliers", path: "/supplier" },
        { icon: <BiNews />, link: "Posts", path: "/post" },
        { icon: <MdOutlineInventory2 />, link: "Stocks", path: "/stock" },
      ],
    },
    {
      title: "Useful",
      children: [
        { icon: <ImStatsDots />, link: "Stats", path: "/stats" },
        { icon: <AiOutlineBell />, link: "Notifications", path: "/" },
      ],
    },
    {
      title: "Services",
      children: [{ icon: <AiOutlineSetting />, link: "Settings", path: "/" }],
    },
    {
      title: "User",
      children: [
        {
          icon: <ImProfile />,
          link: "Profile",
          path: `/profile/${auth?.data?._id}`,
        },
        { icon: <BiLogOut />, link: "Logout", path: "/login" },
      ],
    },
  ];

  if (
    location.pathname === "/login" ||
    location.pathname === "/forgot" ||
    location.pathname.includes("/reset")
  ) {
    return <div>{children}</div>;
  } else
    return (
      <div>
        <div className="wrapper__layout">
          <div className="menu">
            <div className="logo">logo</div>
            <div className="side__bar">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <Sidebar
                      data={item}
                      setActiveTab={setActiveTab}
                      activeTab={activeTab}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="main">
            <div className="header">
              <div>
                <SearchInput />
              </div>
              <div className="header__option">
                <div className="option__icon language__icon">
                  <AiOutlineGlobal />
                  <span style={{ fontSize: ".9rem" }}>English</span>
                </div>
                <div className="option__icon">
                  <BiMoon />
                </div>

                <div className="option__icon">
                  <AiOutlineBell />
                </div>
                <div className="option__icon">
                  <BiMessageDots />
                </div>
                <div className="avatar__icon">
                  <Link to={`/profile/${auth?.data?._id}`}>
                    <Avatar
                      shape="circle"
                      src={
                        auth?.data?.image ||
                        "https://joeschmoe.io/api/v1/random"
                      }
                    />
                  </Link>
                </div>
                <div className="option__icon">
                  <strong>{auth?.data?.name || "No Name"}</strong>
                </div>
              </div>
            </div>
            <div className="container">{children}</div>
          </div>
        </div>
        <div className="footer">
          © 2021 Copyright:{" "}
          <strong style={{ paddingLeft: 5 }}> Lê Văn Bình</strong>
        </div>
      </div>
    );
};

export default Wrapper;

const Sidebar = ({ data, setActiveTab, activeTab }) => {
  let navigate = useNavigate();
  const logout = async () => {
    try {
      await Auth.logout();
      navigate("/login");
      Toast("success", "Logout success");
    } catch (error) {
      Toast("error", error.message);
    }
  };
  return (
    <div className="menu__part">
      <h2 className="title__nav">{data.title}</h2>
      {data.children.map((item, index) => {
        if (item.path === "/login") {
          return (
            <Link
              to={""}
              className={`part__nav ${activeTab == index && "active"}`}
              key={index}
              onClick={logout}
            >
              {item.icon}
              <span>{item.link}</span>
            </Link>
          );
        } else
          return (
            <Link
              to={item.path}
              className={`part__nav ${
                activeTab.title == data.title && activeTab.activeId == index
                  ? "active"
                  : ""
              }`}
              key={index}
              onClick={() =>
                setActiveTab({ title: data.title, activeId: index })
              }
            >
              {item.icon}
              <span>{item.link}</span>
            </Link>
          );
      })}
    </div>
  );
};
