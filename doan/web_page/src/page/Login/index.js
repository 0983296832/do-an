import React, { useEffect } from "react";
import login from "../../assets/image/login.jpg";
import logo from "../../assets/image/logo.png";
import LoginForm from "./LoginForm";
import "../../assets/css/login.css";
import { Link, useLocation } from "react-router-dom";
import {
  LOCAL_STORAGE_USER_KEY,
  LOCAL_STORAGE_CART_KEY,
} from "../../constant/constant";

const Login = () => {
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    }
  }, []);
  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={logo} alt="logo" className="login-logo" />
        <LoginForm />
        <h4 className="login-signup">
          Bạn chưa có tài khoản?
          <Link to="/register" style={{ marginLeft: 7 }}>
            Đăng ký
          </Link>
        </h4>
        <Link to="/login" style={{ marginLeft: 7 }} className="login-forgot">
          Quên mật khẩu?
        </Link>
      </div>
      <div className="login-banner">
        <img src={login} alt="login" className="login-img" />
      </div>
    </div>
  );
};

export default Login;
