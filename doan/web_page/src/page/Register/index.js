import React from "react";
import login from "../../assets/image/login.jpg";
import logo from "../../assets/image/logo.png";
import RegisterForm from "./RegisterForm";
import "../../assets/css/login.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={logo} alt="logo" className="login-logo" />
        <RegisterForm />
        <h4 className="login-signup">
          Bạn đã có tài khoản?
          <Link to="/login" style={{ marginLeft: 7 }}>
            Đăng nhập
          </Link>
        </h4>
      </div>
      <div className="login-banner">
        <img src={login} alt="login" className="login-img" />
      </div>
    </div>
  );
};

export default Register;
