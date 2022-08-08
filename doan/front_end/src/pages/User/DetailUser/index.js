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
import EditUser from "../EditUser";
import { v4 as uuidv4 } from "uuid";
import Orders from "../../../services/orderServices";
import Loading from "../../../components/Loading";

const DetailUser = () => {
  const [user, setUser] = useState();
  const { id } = useParams();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);

  const handleOpen = () => setDisabled(true);
  const handleClose = () => setDisabled(false);

  useEffect(() => {
    let isCancel = false;
    const getUserDetails = async () => {
      setLoading(true);
      try {
        const { result } = await Users.getUserById(id);
        const { data } = await Orders.getRevenueByHalfYear(id);
        setUser(result);
        setChartData(data);
        setData(
          result.orders
            .map((item) => {
              return {
                ...item,
                id: item._id,
                key: uuidv4(),
                amount: (
                  item.details.reduce((acc, i) => {
                    return acc + i.product_price * i.product_quantity;
                  }, 0) -
                  (item.details.reduce((acc, i) => {
                    return acc + i.product_price * i.product_quantity;
                  }, 0) *
                    item.voucher) /
                  100 +
                  25000
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                }),
              };
            })
            .sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            )
        );
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
    };
    getUserDetails();
    return () => {
      isCancel = true;
    };
  }, [id]);

  if (loading) {
    return <Loading />;
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
                      ? moment(user?.birth).zone("+07:00").format("DD/MM/YYYY")
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
            <ChartComponent
              title="Last 6 Months (Revenue)"
              aspect={3 / 1}
              data={
                chartData.slice(
                  new Date().getMonth() + 1 - 6,
                  new Date().getMonth() + 1
                )}
            />
          </div>
        </div>
        <div style={{ width: 1115 }}>
          <h1 className="trans">Transactions</h1>
          <ListTable
            data={data}
            noSup
            XAxis={2000}
            YAxis={400}
            setData={setData}
          />
        </div>
        <Modal
          disabled={disabled}
          handleClose={handleClose}
          loading={loading}
          title="User Profile"
        >
          <EditUser data={user} />
        </Modal>
      </div>
    );
};

export default DetailUser;
