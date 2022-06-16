import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { ImNotification } from "react-icons/im";
import { useForm } from "react-hook-form";
import Auth from "../../services/authServices";
import Toast from "../../components/Toast";
import { Tooltip } from "antd";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState(true);
  const [showConFirmPass, setShowConFirmPass] = useState(true);
  const watchFields = watch(["password", "confirm_password"]);
  const onRegister = async ({ confirm_password, ...rest }) => {
    const sendData = { role: 2, ...rest };
    try {
      await Auth.register(sendData);
      Toast("success", "register success");
    } catch (error) {
      Toast("error", error.message);
    }
  };
  return (
    <div>
      <h1>Đăng ký thành viên 1Sneaker</h1>
      <form className="login-form" onSubmit={handleSubmit(onRegister)}>
        <div className="text-field">
          <input
            autoComplete="off"
            type="text"
            id="user"
            placeholder="Enter your user name..."
            {...register("name", { required: true })}
          />
          {errors.name && (
            <Tooltip title="Không được để trống" placement="right">
              <ImNotification className="noti-icon" />
            </Tooltip>
          )}
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
            {...register("email", { required: true })}
          />
          {errors.email && (
            <Tooltip title="Không được để trống" placement="right">
              <ImNotification className="noti-icon" />
            </Tooltip>
          )}
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
          {errors.password && (
            <Tooltip title="Không được để trống" placement="right">
              <ImNotification className="noti-icon" />
            </Tooltip>
          )}
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
            {...register("confirm_password", { required: true })}
          />
          {errors.confirm_password && (
            <Tooltip title="Không được để trống" placement="right">
              <ImNotification className="noti-icon" />
            </Tooltip>
          )}
          {watchFields[0] != watchFields[1] && (
            <Tooltip title="Mật khẩu không khớp" placement="right">
              <ImNotification className="noti-icon" />
            </Tooltip>
          )}
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
