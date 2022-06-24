import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import AddUser from "../pages/User/AddUser/AddUser";
import DetailUser from "../pages/User/DetailUser";
import Home from "../pages/Home";
import ProductManagement from "../pages/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import Datatable from "../pages/User";
import Order from "../pages/Order";
import Supplier from "../pages/Supplier";
import AddProduct from "../pages/Supplier/AddProduct";
import Login from "../pages/Login/Login";
import PrivateRoute from "../guard/PrivateRoute";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import Profile from "../pages/Profile";
import Post from "../pages/Post";

const RootRoute = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<Datatable />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/add-user" element={<AddUser />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/user-detail/:id" element={<DetailUser />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/product" element={<ProductManagement />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/product-detail/:id" element={<ProductDetail />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/order" element={<Order />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/supplier" element={<Supplier />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/post" element={<Post />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default RootRoute;
