import React from "react";
import Auth from "../../services/authServices";
import Toast from "../../components/Toast";
import { Tooltip } from "antd";
import { ImNotification } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";
import { useForm } from "react-hook-form";

const EmailForm = ({ setEmail, setTabIndex }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSendEAmail = async (data) => {
    try {
      const res = await Auth.sendEmail(data);
      if (res.data.status === 200) {
        setEmail(res.data.email);
        Toast("success", "send email success");
        setTabIndex(1);
      } else {
        Toast("error", "send email fail");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };
  return (
    <div>
      <h1>Nhập email để lấy mã OTP</h1>
      <form className="login-form" onSubmit={handleSubmit(onSendEAmail)}>
        <div className="text-field">
          <input
            autoComplete={+false}
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
        <button className="login-btn" style={{ width: "90%" }}>
          Gửi Mã
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
