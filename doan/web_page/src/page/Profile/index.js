import React, { useState, useContext, useEffect, useRef } from "react";
import "../../assets/css/profile.css";
import { Link } from "react-router-dom";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import { AiOutlineLock, AiOutlineShoppingCart } from "react-icons/ai";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePassForm";
import Order from "./Order";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import User from "../../services/userServices";
import Auth from "../../services/authServices";
import Orders from "../../services/orderServices";
import Toast from "../../components/Toast";

const Profile = () => {
  const orderListRef = useRef();
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tabData, setTabData] = useState([
    { title: "Cài đặt thông tin", icon: <BiUserCircle /> },
    { title: "Đổi mật khẩu", icon: <AiOutlineLock /> },
    { title: "Đơn hàng của bạn", icon: <AiOutlineShoppingCart /> },
    { title: "Đăng xuất", icon: <BiLogOut /> },
  ]);
  const [orders, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [imageUrl, setImageUrl] = useState();
  const getOrder = async (page) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 5,
        "user_id[regex]": auth.data._id,
      };
      const data = await Orders.getAllOrderById(params);
      setOrder(data);
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };
  const getMoreOrder = async (page) => {
    if (page === 1) return;
    try {
      const params = {
        page,
        limit: 5,
        "user_id[regex]": auth.data._id,
      };
      const data = await Orders.getAllOrderById(params);
      setOrder([...orders, ...data]);
    } catch (error) {
      Toast("error", error.message);
    }
  };
  useEffect(() => {
    getOrder(1);
  }, []);
  useEffect(() => {
    getMoreOrder(page);
  }, [page]);
  const getData = async () => {
    setLoading(true);
    try {
      if (auth?.token) {
        const data = await User.getUserById(auth.data._id);
        setData(data.result);
        setImageUrl(data?.result.image?.imageUrl);
      }
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!loading) {
      getData();
    }
  }, []);
  console.log(imageUrl);

  const onScroll = () => {
    if (orderListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = orderListRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPage((prev) => prev + 1);
      }
    }
  };
  const LogOut = async () => {
    try {
      await Auth.logout();
      Toast("success", "Đăng xuất thành công");
    } catch (error) {
      Toast("error", error.message);
    }
  };
  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="profile-container">
        <div className="profile">
          <div className="profile-left">
            <img
              src={imageUrl || "https://joeschmoe.io/api/v1/random"}
              alt=""
            />
            <h2>{data?.name || ""}</h2>
            <h4>{"(" + data?.name_surname + ")" || ""}</h4>
            <div className="profile-features">
              {tabData.map((item, index, arr) => {
                return (
                  <div
                    key={index}
                    className={`features-item ${
                      tabIndex === index && "active"
                    }`}
                    onClick={() => setTabIndex(index)}
                  >
                    {item.icon}
                    {index === arr.length - 1 ? (
                      <Link
                        to={index === arr.length - 1 ? "/login" : ""}
                        onClick={LogOut}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <Link to="">{item.title}</Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="profile-right">
            {tabIndex === 0 ? (
              <div className="profile-item">
                <h2>Cài đặt thông tin</h2>
                <ProfileForm data={data} setImageUrl={setImageUrl} />
              </div>
            ) : tabIndex === 1 ? (
              <div className="profile-item" style={{ width: 800 }}>
                <h2>Đổi mật khẩu</h2>
                <ChangePasswordForm id={data?._id} />
              </div>
            ) : (
              <div className="profile-item">
                <h2>Đơn hàng của bạn</h2>
                <div
                  className="order-list"
                  onScroll={onScroll}
                  ref={orderListRef}
                >
                  {orders.map((item, index) => {
                    return (
                      <div key={index}>
                        <Order
                          data={item}
                          loading={loading}
                          setOrder={setOrder}
                          orders={orders}
                        />
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
