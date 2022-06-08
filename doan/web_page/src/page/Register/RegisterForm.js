import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(true);
  const [showConFirmPass, setShowConFirmPass] = useState(true);
  console.log(showPass);
  return (
    <div>
      <h1>Đăng ký thành viên 1Sneaker</h1>
      <form className="login-form">
        <div className="text-field">
          <input
            autoComplete="off"
            type="text"
            id="user"
            placeholder="Enter your user name..."
          />
          <label htmlFor="user" className="input-label">
            User Name
          </label>
          <BiUserCircle className="email-icon" />
        </div>
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
        <div className="text-field">
          <input
            autoComplete="off"
            type={showConFirmPass ? "text" : "password"}
            id="password-confirm"
            placeholder="Enter your confirm password"
          />
          <label htmlFor="password-confirm" className="input-label">
            Confirm Password
          </label>
          {showConFirmPass ? (
            <AiOutlineEyeInvisible
              className="pass-icon"
              onClick={() => setShowConFirmPass(false)}
            />
          ) : (
            <AiOutlineEye
              className="pass-icon"
              onClick={() => setShowConFirmPass(true)}
            />
          )}
        </div>
        <button className="login-btn" style={{ width: "90%" }}>
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
