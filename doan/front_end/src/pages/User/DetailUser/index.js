import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import "../../../assets/css/infor.css";
import ChartComponent from "../../../components/ChartComponent";
import ListTable from "../../../components/ListOrder";
import { useParams } from "react-router-dom";
import Users from "../../../services/userServices";
import Toast from "../../../components/Toast";
import Modal from "../Modal/Modal";
import moment from "moment";

const DetailUser = () => {
  const [user, setUser] = useState();
  const { id } = useParams();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleOpen = () => setDisabled(true);
  const handleClose = () => setDisabled(false);
  useEffect(() => {
    let isCancel = false;
    const getUserDetails = async () => {
      setLoading(true);
      try {
        const { result } = await Users.getUserById(id);
        console.log(result);
        setUser(result);
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
    };
    getUserDetails();
    return () => {
      isCancel = true;
    };
  }, []);
  const data = [
    {
      key: 1,
      user_name: "le van binh",
      created: "2022-05-24",
      state: "đang đợi gói hàng",
      address: "Hà Nội",
      phone: "0987654321",
      payment_type: "online",
      id: "6285685bb65ca2b076d5fe",
      details: [
        {
          key: 11,
          id: "6285685bb65ca2b076d5fe",
          product_code: "Nike1778598ava",
          name: "nike authentic",
          price: "2000",
          color: "blue",
          category: "nike",
          quantity: 1,
          size: "XL",
          image: "jkashkasfasf",
        },
        {
          key: 12,
          id: "6285685bb65ca2b076d5fe",
          product_code: "Nike1778598avac",
          name: "nike authentic",
          price: "2000",
          color: "red",
          category: "nike",
          quantity: 2,
          size: "L",
          image: "jkashkasfasf",
        },
      ],
    },
    {
      key: 2,
      user_name: "le van binh",
      created: "2022-05-24",
      state: "đang đợi gói hàng",
      address: "Hà Nội",
      phone: "0",
      payment_type: "online",
      id: "628d15685bca2b076d5fe",
      details: [
        {
          key: 21,
          id: "628d15685bca2b076d5fe",
          product_code: "Nike1778598ava",
          name: "nike authentic",
          price: "2000",
          color: "blue",
          category: "nike",
          quantity: 1,
          size: "XL",
          image: "jkashkasfasf",
        },
        {
          id: "628d15685bca2b076d5fe",
          product_code: "Nike1778598avac",
          name: "nike authentic",
          price: "2000",
          color: "red",
          category: "nike",
          quantity: 2,
          size: "L",
          image: "jkashkasfasf",
        },
      ],
    },
    {
      key: 3,
      user_name: "le van binh",
      created: "2022-05-24",
      state: "đang đợi gói hàng",
      address: "Hà Nội",
      phone: "0",
      payment_type: "online",
      id: "628d15685bb65cb076d5fe",
      details: [
        {
          key: 31,
          id: "628d15685bb65cb076d5fe",
          product_code: "Nike1778598ava",
          name: "nike authentic",
          price: "2000",
          color: "blue",
          category: "nike",
          quantity: 1,
          size: "XL",
          image: "jkashkasfasf",
        },
        {
          key: 32,
          id: "628d15685bb65cb076d5fe",
          product_code: "Nike1778598avac",
          name: "nike authentic",
          price: "2000",
          color: "red",
          category: "nike",
          quantity: 2,
          size: "L",
          image: "jkashkasfasf",
        },
      ],
    },
    {
      key: 4,
      user_name: "le van binh",
      created: "2022-05-24",
      state: "đang đợi gói hàng",
      address: "Hà Nội",
      phone: "0",
      payment_type: "online",
      id: "628d15685bb65ca2b06d5fe",
      details: [
        {
          key: 41,
          id: "628d15685bb65ca2b06d5fe",
          product_code: "Nike1778598ava",
          name: "nike authentic",
          price: "2000",
          color: "blue",
          category: "nike",
          quantity: 1,
          size: "XL",
          image: "jkashkasfasf",
        },
        {
          key: 42,
          id: "628d15685bb65ca2b06d5fe",
          product_code: "Nike1778598avac",
          name: "nike authentic",
          price: "2000",
          color: "red",
          category: "nike",
          quantity: 2,
          size: "L",
          image: "jkashkasfasf",
        },
      ],
    },
    {
      key: 5,
      user_name: "le van binh",
      created: "2022-05-24",
      state: "đang đợi gói hàng",
      address: "Hà Nội",
      phone: "0",
      payment_type: "online",
      id: "628d15685bb65ca2b065fe",
      details: [
        {
          key: 51,
          id: "628d15685bb65ca2b06d5fe",
          product_code: "Nike1778598ava",
          name: "nike authentic",
          price: "2000",
          color: "blue",
          category: "nike",
          quantity: 1,
          size: "XL",
          image: "jkashkasfasf",
        },
        {
          key: 52,
          id: "628d15685bb65ca2b06d5fe",
          product_code: "Nike1778598avac",
          name: "nike authentic",
          price: "2000",
          color: "red",
          category: "nike",
          quantity: 2,
          size: "L",
          image: "jkashkasfasf",
        },
      ],
    },
  ];
  if (loading) {
    return <div>Loading...</div>;
  } else
    return (
      <div>
        <div className="home__revenue">
          <Card
            size="small"
            title="Information"
            extra={
              <AiOutlineEdit className="progress-icon" onClick={handleOpen} />
            }
            headStyle={{ color: "gray" }}
            style={{
              width: 370,
              boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
              borderRadius: "8px",
            }}
            bordered={false}
          >
            <div className="info__item">
              <img
                src={
                  user.image
                    ? user?.image?.imageUrl
                    : "https://joeschmoe.io/api/v1/random"
                }
                alt=""
                className="info__img"
              />
              <div className="info__details">
                <h1 className="info__title">{user.name}</h1>
                <div className="info__details-item">
                  <span className="details__item-key">Full name:</span>
                  <span className="details__item-value">
                    {user.name_surname ? user?.name_surname : ""}
                  </span>
                </div>
                <div className="info__details-item">
                  <span className="details__item-key">Email:</span>
                  <span className="details__item-value">{user.email}</span>
                </div>
                <div className="info__details-item">
                  <span className="details__item-key">Birth:</span>
                  <span className="details__item-value">
                    {user.birth
                      ? moment(user?.birth).utc().format("DD/MM/YYYY")
                      : ""}
                  </span>
                </div>
                <div className="info__details-item">
                  <span className="details__item-key">Phone:</span>
                  <span className="details__item-value">
                    {user.phone ? user?.phone : ""}
                  </span>
                </div>
                <div className="info__details-item">
                  <span className="details__item-key">Address:</span>
                  <span className="details__item-value">
                    {user.address ? user?.address : ""}
                  </span>
                </div>
                <div className="info__details-item">
                  <span className="details__item-key">Gender:</span>
                  <span className="details__item-value">
                    {user.sex ? user?.sex : ""}
                  </span>
                </div>
              </div>
            </div>
          </Card>
          <div className="revenue__chart">
            <ChartComponent title="Last 6 Months (Revenue)" aspect={3 / 1} />
          </div>
        </div>
        <div style={{ width: 1115 }}>
          <h1 className="trans">Transactions</h1>
          <ListTable data={data} noSup XAxis={1500} />
        </div>
        <Modal
          disabled={disabled}
          handleClose={handleClose}
          data={user}
          loading={loading}
        />
      </div>
    );
};

export default DetailUser;
