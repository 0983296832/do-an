import React, { useContext } from "react";
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
import { MdDashboard, MdLocalShipping } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { ImStatsDots, ImProfile } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Auth from "../services/authServices";
import Toast from "./Toast";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
//Menu
const Wrapper = ({ children }) => {
  const { auth } = useContext(AuthContext);
  let location = useLocation();

  const data = [
    {
      title: "Trang chính",
      children: [{ icon: <MdDashboard />, link: "Trang Quản Trị", path: "/" }],
    },
    {
      title: "Danh Sách",
      children: [
        {
          icon: <FaRegUser />,
          link: "Người dùng",
          path: "/user",
        },
        { icon: <BiStoreAlt />, link: "Các Sản phẩm", path: "/product" },
        { icon: <AiOutlineCreditCard />, link: "Đơn Hàng", path: "/order" },
        {
          icon: <MdLocalShipping />,
          link: "Các Nhà Cung Cấp",
          path: "/supplier",
        },
      ],
    },
    {
      title: "Hữu Ích",
      children: [
        { icon: <ImStatsDots />, link: "Số Liệu Thống Kê", path: "/" },
        { icon: <AiOutlineBell />, link: "Thông Báo", path: "/" },
      ],
    },
    {
      title: "Địch Vụ",
      // children: [{ icon: <AiOutlineSetting />, link: "Settings", path: "/" }],
      children: [{ icon: <IoSettingsSharp />, link: "Cài Đặt", path: "/" }],
    },
    {
      title: "Người Sử Dụng",
      children: [
        {
          icon: <ImProfile />,
          link: "Hồ Sơ",
          path: `/profile/${auth?.data?._id}`,
        },
        { icon: <BiLogOut />, link: "Đăng Xuất", path: "/login" },
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
            <div className="logo"></div>
            <div className="side__bar">
              {/* map data */}
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <Sidebar data={item} />
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
                <div className="option__icon">
                  <BiMoon />
                </div>

                <div className="option__icon">
                  <IoMdNotificationsOutline />
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
          <strong style={{ paddingLeft: 5 }}> Đoàn Duy Thành</strong>
        </div>
      </div>
    );
};

export default Wrapper;

const Sidebar = ({ data }) => {
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
            <Link to={""} className="part__nav" key={index} onClick={logout}>
              {item.icon}
              <span>
                {item.link}
                {item.extraIcon}
              </span>
            </Link>
          );
        } else
          return (
            <Link
              to={item.path}
              className="part__nav"
              key={index}
              // style={{
              //   marginBottom: item.link === "User" && 30,
              // }}
            >
              {item.icon}
              <span>{item.link}</span>
            </Link>
          );
      })}
    </div>
  );
};
