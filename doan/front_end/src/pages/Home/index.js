import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "../../assets/css/home.css";
import Wigget from "../../components/Wigget";
import { FaRegUser } from "react-icons/fa";
import { Card, Dropdown, Menu, Tabs, Button } from "antd";
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
import TableProductSale from "./TableProductSale";
import { PrinterOutlined } from "@ant-design/icons";
import Stats from "../Stats";
import Loading from "../../components/Loading";

const { TabPane } = Tabs;

const Home = () => {
  const dataOriginal = [
    {
      title: "Người Dùng",
      isMoney: false,
      number: 0,
      rate: "0.5%",
      isNegative: true,
      link: "Xem tất cả người dùng",
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
      title: "Tất cả sản phẩm",
      isMoney: false,
      number: 0,
      rate: "0.5%",
      isNegative: true,
      link: "Xem tất cả người dùng",
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
      title: "Đơn Hàng",
      number: 500,
      isMoney: true,
      rate: "0.5%",
      isNegative: true,
      link: "Xem Tổng đơn hàng",
      path: "/order",
      icon: (
        <MdAttachMoney
          className="wigget__icon"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        />
      ),
    },
    {
      title: "Tiền nhập",
      number: 500,
      isMoney: true,
      rate: "0.5%",
      isNegative: true,
      link: "Tổng vốn",
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
  const [topUser, setTopUser] = useState([]);
  const [indexTop, setIndexTop] = useState(0);
  const [dataProducts, setDataProducts] = useState([]);
  const [productsOutOfStock, setProductsOutOfStock] = useState([]);
  const menu = (
    <Menu
      items={[
        {
          label: <span onClick={() => setIndexTop(0)}>Doanh Thu</span>,
          key: "0",
        },
        {
          label: <span onClick={() => setIndexTop(1)}>Sản phẩm bán chạy</span>,
          key: "1",
        },
      ]}
    />
  );
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    let isCancel = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const ordersParams = {
          page: 1,
          limit: 5,
          sort: "-created",
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
          OrderServices.getRevenueBy("month"),
          Users.getTopUser(),
          Products.getProductsOutOfStock(),
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
        const dataProducts =
          result[5].status === "fulfilled" ? result[5].value.details : [];
        const orderRevenueByWeek =
          result[6].status === "fulfilled" ? result[6].value.data : [];
        const orderRevenueByMonth =
          result[7].status === "fulfilled" ? result[7].value.data : [];
        const orderRevenueByHaflYear =
          result[8].status === "fulfilled" ? result[8].value.data : [];
        const TopProductSales =
          result[9].status === "fulfilled" ? result[9].value.details : [];
        const TopUser =
          result[10].status === "fulfilled" ? result[10].value.data : [];
        const productsOutOfStock =
          result[11].status === "fulfilled" ? result[11].value.data : [];
        if (productsOutOfStock.length > 0)
          Toast("warn", "Có sản phẩm hết hàng");

        setTopData(
          TopProductSales.map((product) => product.details)
            .flat(Infinity)
            .reduce((acc, cur) => {
              if (acc.find((i) => i.product_id === cur.product_id)) {
                return acc.map((i) => {
                  if (i.product_id === cur.product_id) {
                    return {
                      ...i,
                      product_quantity:
                        i.product_quantity + cur.product_quantity,
                    };
                  } else return i;
                });
              } else {
                acc.push({
                  product_id: cur.product_id,
                  product_quantity: cur.product_quantity,
                  product_image: cur.product_image,
                  product_name: cur.product_name,
                  product_price: cur.product_price,
                  product_code: cur.product_code,
                });
                return acc;
              }
            }, [])
            .map((item) => {
              return {
                ...item,
                product_amount: item.product_quantity * item.product_price,
                name: item.product_name,
                number: item.product_quantity,
                image: item.product_image || "https://via.placeholder.com/150",
              };
            })
            .sort((a, b) => b.number - a.number)
            .filter((_, index) => index < 5)
        );
        setTopUser(
          TopUser.map((item) => {
            return {
              name: item.name,
              number: item.orders.length,
              image:
                item.image.imageUrl || "https://joeschmoe.io/api/v1/random",
            };
          })
        );

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
        setDataProducts(
          dataProducts
            .map((product) => product.details)
            .flat(Infinity)
            .reduce((acc, cur) => {
              if (acc.find((i) => i.product_id === cur.product_id)) {
                return acc.map((i) => {
                  if (i.product_id === cur.product_id) {
                    return {
                      ...i,
                      product_quantity:
                        i.product_quantity + cur.product_quantity,
                    };
                  } else return i;
                });
              } else {
                acc.push({
                  product_id: cur.product_id,
                  product_quantity: cur.product_quantity,
                  product_image: cur.product_image,
                  product_name: cur.product_name,
                  product_price: cur.product_price,
                  product_code: cur.product_code,
                });
                return acc;
              }
            }, [])
            .map((item) => {
              return {
                ...item,
                product_amount: item.product_quantity * item.product_price,
              };
            })
        );
        setProductsOutOfStock(productsOutOfStock);
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
    return <Loading />;
  } else {
    return (
      <div className="home__wrapper" ref={componentRef}>
        <Button
          onClick={handlePrint}
          icon={<PrinterOutlined />}
          style={{ marginBottom: 10 }}
        >
          Print PDF
        </Button>
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
                ? "Tổng doanh thu"
                : "Top Sản Phẩm bán chạy trong tháng"
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
              <TopProductSales data={indexTop === 1 ? topData : topUser} />
            )}
          </Card>
          <div className="revenue__chart">
            <ChartComponent
              title="6 Tháng qua(Doanh Thu)"
              aspect={2 / 1}
              data={chartData.slice(
                new Date().getMonth() - 6,
                new Date().getMonth() + 1
              )}
            />
          </div>
        </div>
        <Tabs defaultActiveKey="1" style={{ marginTop: "20px" }}>
          <TabPane tab="Năm giao dịch cuối cùng" key="1">
            <div className="table">
              <TableList dataTable={dataTable} />
            </div>
          </TabPane>
          <TabPane tab="Sản phẩm bán được trong ngày" key="2">
            <div className="table">
              <TableProductSale dataTableSales={dataProducts} noPrice />
            </div>
          </TabPane>
          <TabPane tab="Sản phẩm hết hàng" key="3">
            <div className="table">
              <TableProductSale dataTableSales={productsOutOfStock} noAmount />
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
};

export default Home;
