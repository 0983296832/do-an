import React, { useState, useContext } from "react";
import { HiOutlineMail } from "react-icons/hi";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillApple,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Divider } from "antd";
import Auth from "../../services/authServices";
import { LOCAL_STORAGE_USER_KEY } from "../../constant/constant";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";

const LoginForm = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAuth } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(true);
  const onLogin = async (data) => {
    try {
      const res = await Auth.login(data);
      if (res) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res));
        setAuth(res);
        navigate("/");
        Toast("success", "login success");
      }
    } catch (error) {
      Toast("error", "email or password incorrect");
    }
  };
  return (
    <div>
      <h2>Bắt đầu mua sắm</h2>
      <h1>Đăng nhập vào 1Sneaker</h1>
      <form className="login-form" onSubmit={handleSubmit(onLogin)}>
        <div className="text-field">
          <input
            autoComplete="off"
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
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
            {...register("password", { required: true })}
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