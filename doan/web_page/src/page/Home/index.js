import React from "react";
import ProductView from "../../components/ProductView";
import Baner from "./Baner";
import TopProduct from "./TopProduct";
import giay from "../../assets/image/giay.jpg";
import FeedBack from "./FeedBack";
import Post from "./Post";
import Address from "./Address";

const Home = () => {
  const [data, setData] = React.useState([
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: false,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      soldOut: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: false,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      soldOut: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      soldOut: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: false,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
  ]);
  return (
    <div className="home wrapper">
      <Baner />
      <TopProduct data={data} />
      <ProductView data={data} title="Giày Nike" />
      <ProductView data={data} title="Giày Adidas" />
      <ProductView data={data} title="Giày Vans" />
      <FeedBack />
      <Post />
      <Address />
    </div>
  );
};

export default Home;
