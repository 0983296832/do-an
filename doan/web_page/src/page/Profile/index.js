import React, { useState } from "react";
import "../../assets/css/profile.css";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineLock, AiOutlineShoppingCart } from "react-icons/ai";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePassForm";
import Order from "./Order";

const Profile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabData, setTabData] = useState([
    { title: "Cài đặt thông tin", icon: <BiUserCircle /> },
    { title: "Đổi mật khẩu", icon: <AiOutlineLock /> },
    { title: "Đơn hàng của bạn", icon: <AiOutlineShoppingCart /> },
  ]);
  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-left">
          <img src="https://joeschmoe.io/api/v1/random" alt="" />
          <h2>Lê Văn Bình</h2>
          <h4>(Lê Văn Bình)</h4>
          <div className="profile-features">
            {tabData.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`features-item ${tabIndex === index && "active"}`}
                  onClick={() => setTabIndex(index)}
                >
                  {item.icon} <Link to="">{item.title}</Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="profile-right">
          {tabIndex === 0 ? (
            <div className="profile-item">
              <h2>Cài đặt thông tin</h2>
              <ProfileForm />
            </div>
          ) : tabIndex === 1 ? (
            <div className="profile-item" style={{ width: 800 }}>
              <h2>Đổi mật khẩu</h2>
              <ChangePasswordForm />
            </div>
          ) : (
            <div className="profile-item">
              <h2>Đơn hàng của bạn</h2>
              <div className="order-list">
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
