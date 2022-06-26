import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Cart from "../page/Cart";
import DetailsProduct from "../page/DetailsProduct";
import Home from "../page/Home";
import Login from "../page/Login";
import Payment from "../page/Payment";
import PaymentSuccess from "../page/PaymentSuccess";
import ProductList from "../page/ProductList";
import Profile from "../page/Profile";
import Register from "../page/Register";
import ProtectRoute from "../guard/ProtectRoute";
import Order from "../page/Order";
import ForgotPassword from "../page/ForgotPassWord";
import PostDetail from "../page/PostDetail";

const RootRoute = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product-list/:type" element={<ProductList />} />
        <Route path="/product-list-search" element={<ProductList />} />
        <Route path="/product-details/:id" element={<DetailsProduct />} />
        <Route path="/cart" element={<Cart />} forceRefresh={true} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/post-details/:id" element={<PostDetail />} />
        <Route element={<ProtectRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default RootRoute;
