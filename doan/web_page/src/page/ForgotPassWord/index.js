import React, { useState } from "react";
import login from "../../assets/image/login.jpg";
import logo from "../../assets/image/logo.png";
import "../../assets/css/login.css";
import { Link } from "react-router-dom";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import ResetPassForm from "./ResetPassForm";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={logo} alt="logo" className="login-logo" />
        {tabIndex === 0 ? (
          <EmailForm setEmail={setEmail} setTabIndex={setTabIndex} />
        ) : tabIndex === 1 ? (
          <OtpForm email={email} setTabIndex={setTabIndex} />
        ) : (
          <ResetPassForm email={email} />
        )}

        <h4 className="login-signup">
          Đăng nhập lại?
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

export default ForgotPassword;
