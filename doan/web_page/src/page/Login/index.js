import React, { useContext, useEffect } from "react";
import login from "../../assets/image/login.jpg";
import logo from "../../assets/image/logo.png";
import LoginForm from "./LoginForm";
import "../../assets/css/login.css";
import { Link, useLocation } from "react-router-dom";
import {
  LOCAL_STORAGE_USER_KEY,
  LOCAL_STORAGE_CART_KEY,
} from "../../constant/constant";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Login = () => {
  let location = useLocation();
  const { setAuth } = useContext(AuthContext);
  const { logOut } = useContext(CartContext);
  useEffect(() => {
    if (location.pathname === "/login") {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify({
          cart: [],
          total: 0,
          amount: 0,
          cartIdChecked: [],
          totalCart: 0,
        })
      );
      logOut();
      setAuth({});
    }
    function setCookie(cname, cvalue, exMins) {
      var d = new Date();
      d.setTime(d.getTime() + exMins * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    setCookie("refreshToken", "", 0);
  }, []);
  return (
    <div className="login-container">
      <div className="login-form-container">
        <Link to="/">
          <img src={logo} alt="logo" className="login-logo" />
        </Link>
        <LoginForm />
        <h4 className="login-signup">
          Bạn chưa có tài khoản?
          <Link to="/register" style={{ marginLeft: 7 }}>
            Đăng ký
          </Link>
        </h4>
        <Link to="/forgot" style={{ marginLeft: 7 }} className="login-forgot">
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
