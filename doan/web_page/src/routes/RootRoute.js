import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Cart from "../page/Cart";
import DetailsProduct from "../page/DetailsProduct";
import Home from "../page/Home";
import Payment from "../page/Payment";
import ProductList from "../page/ProductList";

const RootRoute = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product-list/:type" element={<ProductList />} />
        <Route path="/product-details/:id" element={<DetailsProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default RootRoute;
