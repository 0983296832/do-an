import React, { useState, useContext, useEffect } from "react";
import "../../assets/css/profile.css";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineLock, AiOutlineShoppingCart } from "react-icons/ai";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePassForm";
import Order from "./Order";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import User from "../../services/userServices";
import Toast from "../../components/Toast";

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tabData, setTabData] = useState([
    { title: "Cài đặt thông tin", icon: <BiUserCircle /> },
    { title: "Đổi mật khẩu", icon: <AiOutlineLock /> },
    { title: "Đơn hàng của bạn", icon: <AiOutlineShoppingCart /> },
  ]);
  const getData = async () => {
    setLoading(true);
    try {
      const data = await User.getUserById(auth.data._id);
      setData(data.result);
      console.log(data.result);
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="profile-container">
        <div className="profile">
          <div className="profile-left">
            <img
              src={
                data?.image?.imageUrl || "https://joeschmoe.io/api/v1/random"
              }
              alt=""
            />
            <h2>{data?.name || ""}</h2>
            <h4>{"(" + data?.name_surname + ")" || ""}</h4>
            <div className="profile-features">
              {tabData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`features-item ${
                      tabIndex === index && "active"
                    }`}
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
                <ProfileForm data={data} />
              </div>
            ) : tabIndex === 1 ? (
              <div className="profile-item" style={{ width: 800 }}>
                <h2>Đổi mật khẩu</h2>
                <ChangePasswordForm id={data._id} />
              </div>
            ) : (
              <div className="profile-item">
                <h2>Đơn hàng của bạn</h2>
                <div className="order-list">
                  {data.orders.map((item, index) => {
                    return (
                      <div key={index}>
                        <Order data={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default Profile;
