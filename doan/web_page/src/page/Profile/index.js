import React, { useState, useContext, useEffect, useRef } from "react";
import "../../assets/css/profile.css";
import { Link } from "react-router-dom";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import {
  AiOutlineLock,
  AiOutlineShoppingCart,
  AiOutlineCrown,
  AiOutlineHeart,
  AiOutlineClockCircle,
} from "react-icons/ai";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePassForm";
import Order from "./Order";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import User from "../../services/userServices";
import Auth from "../../services/authServices";
import Orders from "../../services/orderServices";
import Toast from "../../components/Toast";
import { Empty, Select } from "antd";
import Voucher from "./Voucher";
import History from "./History";
import Favorite from "./Favorite";

const { Option } = Select;
const Profile = () => {
  const orderListRef = useRef();
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tabData, setTabData] = useState([
    { title: "Cài đặt thông tin", icon: <BiUserCircle /> },
    { title: "Đã thich ", icon: <AiOutlineHeart /> },
    { title: "Lịch xem hàng ", icon: <AiOutlineClockCircle /> },
    { title: "Lịch sử đơn hàng ", icon: <AiOutlineShoppingCart /> },
    { title: "Voucher của bạn ", icon: <AiOutlineCrown /> },
    { title: "Đổi mật khẩu", icon: <AiOutlineLock /> },
    { title: "Đăng xuất", icon: <BiLogOut /> },
  ]);
  const [orders, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [imageUrl, setImageUrl] = useState();
  const [state, setState] = useState("đang chờ xác nhận");

  const getOrder = async (page) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 5,
        "user_id[regex]": auth.data._id,
        "state[regex]": state,
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
        "state[regex]": state,
      };
      const data = await Orders.getAllOrderById(params);
      setOrder([...orders, ...data]);
    } catch (error) {
      Toast("error", error.message);
    }
  };
  useEffect(() => {
    getOrder(1);
  }, [state]);
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

  const onScroll = () => {
    if (orderListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = orderListRef.current;
      console.log(scrollTop, scrollHeight, clientHeight);
      if (scrollTop + 0.5 + clientHeight > scrollHeight) {
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

  const handleChange = (value) => {
    setState(value);
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
            ) : tabIndex === 5 ? (
              <div className="profile-item" style={{ width: 800 }}>
                <h2>Đổi mật khẩu</h2>
                <ChangePasswordForm id={data?._id} />
              </div>
            ) : tabIndex === 3 ? (
              <div className="profile-item">
                <h2>Lịch sử đơn hàng của bạn</h2>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 15,
                    marginRight: 70,
                    marginBottom: -20,
                  }}
                >
                  <h4>Trạng thái đơn hàng: </h4>
                  <Select
                    defaultValue={state}
                    style={{
                      width: 230,
                    }}
                    onChange={handleChange}
                  >
                    <Option value="đang chờ xác nhận">Đang chờ xác nhận</Option>
                    <Option value="đã xác nhận">Đã xác nhận</Option>
                    <Option value="đang đợi gói hàng">Đang đợi gói hàng</Option>
                    <Option value="đang giao hàng">Đang giao hàng</Option>
                    <Option value="giao hàng thành công">
                      Giao hàng thành công
                    </Option>
                    <Option value="đã hủy">Đã hủy</Option>
                    <Option value="giao hàng không thành công">
                      Giao hàng không thành công
                    </Option>
                  </Select>
                </div>

                {orders.length == 0 ? (
                  <div style={{ width: "100%" }}>
                    <Empty />
                  </div>
                ) : (
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
                )}
              </div>
            ) : tabIndex === 1 ? (
              <div className="profile-item-container">
                <h2 style={{ textAlign: "center" }}>Sản phẩm đã thích</h2>
                <div className="profile-item">
                  <Favorite />
                </div>
              </div>
            ) : tabIndex === 2 ? (
              <div className="profile-item-container">
                <h2 style={{ textAlign: "center" }}>Lịch sử xem hàng</h2>
                <div className="profile-item">
                  <History />
                </div>
              </div>
            ) : (
              <div className="profile-item-container">
                <h2 style={{ textAlign: "center" }}>Voucher của bạn</h2>
                <div className="profile-item">
                  <Voucher user={data} setUser={setData} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default Profile;
