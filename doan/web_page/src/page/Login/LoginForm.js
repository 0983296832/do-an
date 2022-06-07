import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillApple,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Divider } from "antd";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(true);
  console.log(showPass);
  return (
    <div>
      <h2>Bắt đầu mua sắm</h2>
      <h1>Đăng nhập vào 1Sneaker</h1>
      <form className="login-form">
        <div className="text-field">
          <input
            autoComplete="off"
            type="email"
            id="email"
            placeholder="Enter your email"
          />
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <HiOutlineMail className="email-icon" />
        </div>
        <div className="text-field">
          <input
            autoComplete="off"
            type={showPass ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
          {showPass ? (
            <AiOutlineEyeInvisible
              className="pass-icon"
              onClick={() => setShowPass(false)}
            />
          ) : (
            <AiOutlineEye
              className="pass-icon"
              onClick={() => setShowPass(true)}
            />
          )}
        </div>
        <button className="login-btn">Đăng nhập</button>
      </form>
      <Divider style={{ color: "#aaaaaa" }}>hoặc đăng nhập bằng</Divider>
      <div className="login-social">
        <div className="social-icon">
          <FaFacebook />
        </div>
        <div className="social-icon">
          <FcGoogle />
        </div>
        <div className="social-icon">
          <AiFillApple />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
