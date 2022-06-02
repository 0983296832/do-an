import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import Wigget from "../../components/Wigget";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import "react-circular-progressbar/dist/styles.css";
import Progress from "./Progress";
import ChartComponent from "../../components/ChartComponent";
import TableList from "./Table";
import Users from "../../services/userServices";
import Products from "../../services/productServices";
import OrderServices from "../../services/orderServices";

import Toast from "../../components/Toast";
import moment from "moment";

const Home = () => {
  const dataOriginal = [
    {
      title: "Users",
      isMoney: false,
      number: 0,
      rate: "0.5%",
      isNegative: true,
      link: "See all users",
      path: "/user",
      icon: (
        <FaRegUser
          className="wigget__icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          }}
        />
      ),
    },
    {
      title: "Products",
      isMoney: false,
      number: 0,
      rate: "0.5%",
      isNegative: true,
      link: "View all products",
      path: "/product",
      icon: (
        <AiOutlineShoppingCart
          className="wigget__icon"
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",
          }}
        />
      ),
    },
    {
      title: "Orders",
      number: 500,
      isMoney: true,
      rate: "0.5%",
      isNegative: true,
      link: "See all orders",
      path: "/order",
      icon: (
        <MdAttachMoney
          className="wigget__icon"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        />
      ),
    },
    {
      title: "Earnings",
      number: 500,
      isMoney: true,
      rate: "0.5%",
      isNegative: true,
      link: "View net earnings",
      path: "/supplier",
      icon: (
        <BsCoin
          className="wigget__icon"
          style={{
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            color: "purple",
          }}
        />
      ),
    },
  ];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [numbers, setNumbers] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    let isCancel = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = {
          page: 1,
          limit: 5,
        };
        let result = await Promise.allSettled([
          Users.getUsers(),
          Products.getProducts(),
          OrderServices.getOrder(params),
        ]);
        const user =
          result[0].status === "fulfilled" ? result[0].value.count : {};
        const product =
          result[1].status === "fulfilled" ? result[1].value.count : {};
        const order =
          result[2].status === "fulfilled" ? result[2].value.data : [];
        setNumbers([user, product, 500, 500]);
        const numberArr = [user, product, 500, 500];
        setData(
          dataOriginal.map((item, index) => {
            return {
              ...item,
              number: numberArr[index],
            };
          })
        );

        setDataTable(
          order.map((item) => {
            return {
              id: item._id,
              customer: item.user_name,
              amount: item.details
                .reduce((acc, i) => {
                  return acc + i.price * i.quantity;
                }, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                }),
              date: `${moment(item.created).zone("+07:00").format("DD/MM/YYYY")}`,
              method: item.payment_type,
              receive_date: item.receive_date,
              status: item.state,
            };
          })
        );
      } catch (error) {
        Toast("error", error.message);
      }

      setLoading(false);
    };
    fetchData();
    return () => {
      isCancel = true;
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="home__wrapper">
        <div className="home__wigget">
          {data &&
            data.map((item, index) => {
              return (
                <div key={index}>
                  <Wigget data={item} />
                </div>
              );
            })}
        </div>
        <div className="home__revenue">
          <Progress />
          <div className="revenue__chart">
            <ChartComponent title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
        </div>
        <h1 className="trans">Last Five Transactions</h1>
        <div className="table">
          <TableList dataTable={dataTable} />
        </div>
      </div>
    );
  }
};

export default Home;
