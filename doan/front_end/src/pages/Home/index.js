import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import Wigget from "../../components/Wigget";
import { FaRegUser } from "react-icons/fa";
import { Card, Dropdown, Menu } from "antd";
import { FiMoreVertical } from "react-icons/fi";
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
import TopProductSales from "./TopProductSales";

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
  const [dataTable, setDataTable] = useState([]);
  const [progressData, setProgressData] = useState({
    day: 0,
    week: 0,
    month: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [indexTop, setIndexTop] = useState(0);
  const menu = (
    <Menu
      items={[
        {
          label: <span onClick={() => setIndexTop(0)}>Revenue</span>,
          key: "0",
        },
        {
          label: <span onClick={() => setIndexTop(1)}>Top sales</span>,
          key: "1",
        },
        {
          label: <span onClick={() => setIndexTop(2)}>Top users</span>,
          key: "3",
        },
      ]}
    />
  );

  useEffect(() => {
    let isCancel = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const ordersParams = {
          page: 1,
          limit: 5,
        };
        const topProductsParams = {
          page: 1,
          limit: 5,
          sort: "-sales",
        };
        let result = await Promise.allSettled([
          Users.getUsers(),
          Products.getProducts(),
          OrderServices.getOrder(ordersParams),
          OrderServices.getRevenue(),
          Products.getEarning(),
          OrderServices.getRevenueBy("day"),
          OrderServices.getRevenueBy("week"),
          OrderServices.getRevenueBy("month"),
          OrderServices.getRevenueByHalfYear("all"),
          Products.getProducts(topProductsParams),
          Users.getTopUser(),
        ]);
        const user =
          result[0].status === "fulfilled" ? result[0].value.count : {};
        const product =
          result[1].status === "fulfilled" ? result[1].value.count : {};
        const order =
          result[2].status === "fulfilled" ? result[2].value.data : [];
        const orderRevenue =
          result[3].status === "fulfilled" ? result[3].value.data : [];
        const productEarning =
          result[4].status === "fulfilled" ? result[4].value.data : [];
        const orderRevenueByDay =
          result[5].status === "fulfilled" ? result[5].value.data : [];
        const orderRevenueByWeek =
          result[6].status === "fulfilled" ? result[6].value.data : [];
        const orderRevenueByMonth =
          result[7].status === "fulfilled" ? result[7].value.data : [];
        const orderRevenueByHaflYear =
          result[8].status === "fulfilled" ? result[8].value.data : [];
        const TopProductSales =
          result[9].status === "fulfilled" ? result[9].value.data : [];
        const TopUser =
          result[10].status === "fulfilled" ? result[10].value.data : [];
        setTopData([
          ...TopProductSales.map((item) => {
            return {
              name: item.name,
              number: item.sales,
              image:
                item.image[0].imageUrl || "https://via.placeholder.com/150",
            };
          }),
          ...TopUser.map((item) => {
            return {
              name: item.name,
              number: item.orders.length,
              image:
                item.image.imageUrl || "https://joeschmoe.io/api/v1/random",
            };
          }),
        ]);

        const numberArr = [user, product, orderRevenue, productEarning];
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
              customer: item.name,
              amount: item.details
                .reduce((acc, i) => {
                  return acc + i.product_price * i.product_quantity;
                }, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                }),
              date: `${moment(item.created)
                .zone("+07:00")
                .format("DD/MM/YYYY")}`,
              method: item.payment_type,
              receive_date: item.receive_date,
              status: item.state,
            };
          })
        );
        setProgressData({
          day: orderRevenueByDay,
          week: orderRevenueByWeek,
          month: orderRevenueByMonth,
        });
        setChartData(orderRevenueByHaflYear);
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
          <Card
            size="small"
            title={`${
              indexTop === 0
                ? "Total Revenue"
                : indexTop === 1
                ? "Top Products With Sales"
                : "Top Users With Orders"
            }`}
            extra={
              <Dropdown overlay={menu}>
                <FiMoreVertical className="progress-icon" />
              </Dropdown>
            }
            headStyle={{ color: "gray" }}
            style={{
              width: 370,
              boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
              borderRadius: "8px",
            }}
            bordered={false}
          >
            {indexTop === 0 ? (
              <Progress data={progressData} />
            ) : (
              <TopProductSales
                data={
                  indexTop === 1 ? topData.slice(0, 5) : topData.slice(5, 10)
                }
              />
            )}
          </Card>
          <div className="revenue__chart">
            <ChartComponent
              title="Last 6 Months (Revenue)"
              aspect={2 / 1}
              data={chartData.slice(0, 6)}
            />
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
