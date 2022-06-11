import React, { useEffect, useState } from "react";
import ProductView from "../../components/ProductView";
import Baner from "./Baner";
import TopProduct from "./TopProduct";
import giay from "../../assets/image/giay.jpg";
import FeedBack from "./FeedBack";
import Post from "./Post";
import Address from "./Address";
import Loading from "../../components/Loading";
import Products from "../../services/productServices";
import Toast from "../../components/Toast";

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
      let result = await Promise.allSettled([
        Products.getProducts(paramsNike),
        Products.getProducts(paramsAdidas),
        Products.getProducts(paramsVans),
      ]);
      const nike =
        result[0].status === "fulfilled"
          ? result[0].value.data.data.map((item) => {
              return {
                id: item._id,
                title: item.name,
                image: item.image[0].imageUrl,
                price: item.price,
                category: item.category,
                rate: item.rate || 0,
                sale: item.discount > 0,
                discount: item.discount,
                priceSale: item.price * ((100 - item.discount) / 100),
              };
            })
          : {};
      const adidas =
        result[1].status === "fulfilled"
          ? result[1].value.data.data.map((item) => {
              return {
                id: item._id,
                title: item.name,
                image: item.image[0].imageUrl,
                price: item.price,
                category: item.category,
                rate: item.rate || 0,
                sale: item.discount > 0,
                discount: item.discount,
                priceSale: item.price * ((100 - item.discount) / 100),
              };
            })
          : {};
      const vans =
        result[2].status === "fulfilled"
          ? result[2].value.data.data.map((item) => {
              return {
                id: item._id,
                title: item.name,
                image: item.image[0].imageUrl,
                price: item.price,
                category: item.category,
                rate: item.rate || 0,
                sale: item.discount > 0,
                discount: item.discount,
                priceSale: item.price * ((100 - item.discount) / 100),
              };
            })
          : [];
      setData([...nike, ...adidas, ...vans]);
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };
  console.log(data.slice(0, 10));
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="home wrapper">
        <Baner />
        <TopProduct data={data.slice(0, 10)} />
        <ProductView data={data.slice(0, 10)} title="Giày Nike" />
        <ProductView data={data.slice(10, 20)} title="Giày Adidas" />
        <ProductView data={data.slice(20, 30)} title="Giày Vans" />
        <FeedBack />
        <Post />
        <Address />
      </div>
    );
};

export default Home;
