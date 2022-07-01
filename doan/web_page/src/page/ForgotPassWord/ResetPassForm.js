import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "../../components/Toast";
import Auth from "../../services/authServices";
import { Tooltip } from "antd";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { ImNotification } from "react-icons/im";

const ResetPassForm = ({ email }) => {
  const [showPass, setShowPass] = useState(true);
  const [showConFirmPass, setShowConFirmPass] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchFields = watch(["password", "confirm_password"]);


  const onResetPassword = async (data) => {
    try {
      const res = await Auth.resetPassword({ email, password: data.password });
      if (res.data.status === "200") {
        Toast("success", "Reset password success");
      } else {
        Toast("error", "Error reset password");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };
  return (
    <div>
      <h1>Nhập mật khẩu mới </h1>
      <form className="login-form" onSubmit={handleSubmit(onResetPassword)}>
        <div className="text-field">
          <input
            autoComplete={+false}
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
            autoComplete={+false}
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
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default ResetPassForm;
