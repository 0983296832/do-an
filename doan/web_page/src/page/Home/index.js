import React, { useEffect, useState } from "react";
import ProductView from "../../components/ProductView";
import Baner from "./Baner";
import TopProduct from "./TopProduct";
import FeedBack from "./FeedBack";
import Post from "./Post";
import Address from "./Address";
import Loading from "../../components/Loading";
import Products from "../../services/productServices";
import Toast from "../../components/Toast";
import { BackTop } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const paramsNike = {
        page: 1,
        limit: 10,
        "product_code[regex]": "Nike",
      };
      const paramsAdidas = {
        page: 1,
        limit: 10,
        "product_code[regex]": "Adidas",
      };
      const paramsVans = {
        page: 1,
        limit: 10,
        "product_code[regex]": "Vans",
      };
      const paramsHot = {
        page: 1,
        limit: 10,
        sort: "-sales",
      };
      const paramsSales = {
        page: 1,
        limit: 10,
        sort: "-discount",
      };
      let result = await Promise.allSettled([
        Products.getProducts(paramsNike),
        Products.getProducts(paramsAdidas),
        Products.getProducts(paramsVans),
        Products.getProducts(paramsHot),
        Products.getProducts(paramsSales),
      ]);
      const nike =
        result[0].status === "fulfilled"
          ? result[0].value.data.data.map((item) => {
              return {
                id: item._id,
                title: item.name,
                product_code: item.product_code,
                image: item.image[0].imageUrl,
                price: item.price,
                category: item.category,
                rate: item.votes || 0,
                sale: item.discount > 0,
                discount: item.discount,
                priceSale: item.price * ((100 - item.discount) / 100),
                size: [...new Set(item.details.map((i) => i.size))],
                color: [...new Set(item.details.map((i) => i.color))],
                brand: item.brand,
                category: item.category,
                stocks: item.details.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0),
              };
            })
          : {};
      const adidas =
        result[1].status === "fulfilled"
          ? result[1].value.data.data.map((item) => {
              return {
                id: item._id,
                product_code: item.product_code,
                title: item.name,
                image: item.image[0].imageUrl,
                price: item.price,
                category: item.category,
                rate: item.votes || 0,
                sale: item.discount > 0,
                discount: item.discount,
                priceSale: item.price * ((100 - item.discount) / 100),
                size: [...new Set(item.details.map((i) => i.size))],
                color: [...new Set(item.details.map((i) => i.color))],
                brand: item.brand,
                category: item.category,
                stocks: item.details.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0),
              };
            })
          : {};
      const vans =
        result[2].status === "fulfilled"
          ? result[2].value.data.data.map((item) => {
              return {
                id: item._id,
                product_code: item.product_code,
                title: item.name,
                image: item.image[0].imageUrl,
                price: item.price,
                category: item.category,
                rate: item.votes || 0,
                sale: item.discount > 0,
                discount: item.discount,
                priceSale: item.price * ((100 - item.discount) / 100),
                size: [...new Set(item.details.map((i) => i.size))],
                color: [...new Set(item.details.map((i) => i.color))],
                brand: item.brand,
                category: item.category,
                stocks: item.details.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0),
              };
            })
          : [];
      const hot =
        result[3].status === "fulfilled"
          ? result[3].value.data.data.map((item) => {
              return {
                id: item._id,
                product_code: item.product_code,
                title: item.name,
                image: item.image[0].imageUrl,
                price: item.price,
                category: item.category,
                rate: item.votes || 0,
                sale: item.discount > 0,
                discount: item.discount,
                priceSale: item.price * ((100 - item.discount) / 100),
                size: [...new Set(item.details.map((i) => i.size))],
                color: [...new Set(item.details.map((i) => i.color))],
                brand: item.brand,
                category: item.category,
                stocks: item.details.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0),
              };
            })
          : [];
      const sale =
        result[4].status === "fulfilled"
          ? result[4].value.data.data.map((item) => {
              return {
                id: item._id,
                product_code: item.product_code,
                title: item.name,
                image: item.image[0].imageUrl,
                price: item.price,
                category: item.category,
                rate: item.votes || 0,
                sale: item.discount > 0,
                discount: item.discount,
                priceSale: item.price * ((100 - item.discount) / 100),
                size: [...new Set(item.details.map((i) => i.size))],
                color: [...new Set(item.details.map((i) => i.color))],
                brand: item.brand,
                category: item.category,
                stocks: item.details.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0),
              };
            })
          : [];
      setData([...nike, ...adidas, ...vans, ...hot, ...sale]);
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
      <div className="home wrapper">
        <Baner />
        <TopProduct data={data.slice(30, 50)} />
        <ProductView data={data.slice(0, 10)} title="Giày Nike" />
        <ProductView data={data.slice(10, 20)} title="Giày Adidas" />
        <ProductView data={data.slice(20, 30)} title="Giày Vans" />
        <FeedBack />
        <BackTop>
          <div style={style}>
            <UpCircleOutlined />
          </div>
        </BackTop>
        <Post />
        <Address />
      </div>
    );
};

export default Home;

const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: "50%",
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 25,
};
