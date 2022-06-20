import React from "react";
import { useForm } from "react-hook-form";
import Toast from "../../components/Toast";
import Auth from "../../services/authServices";
const ForgotForm = ({ setShowOtp, setEmail }) => {
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
        setShowOtp(true);
      } else {
        Toast("error", "send email fail");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };
  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSendEAmail)}>
      <h2 className="title">Forgot Password</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          autoComplete={+false}
        />
      </div>
      {errors.email && <p style={{ color: "red" }}>This field is required</p>}
      <input type="submit" value="send code" className="btn solid" />
    </form>
  );
};

export default ForgotForm;
