import React from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Auth from "../../services/authServices";
import Toast from "../../components/Toast";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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
    <form className="sign-up-form" onSubmit={handleSubmit(onRegister)}>
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Username"
          {...register("name", { required: true })}
        />
      </div>
      {errors.name && <p style={{ color: "red" }}>This field is required</p>}
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          {...register("email", { required: true })}
        />
      </div>
      {errors.email && <p style={{ color: "red" }}>This field is required</p>}
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
      </div>
      {errors.password && (
        <p style={{ color: "red" }}>This field is required</p>
      )}

      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirm_password", { required: true })}
        />
      </div>
      {errors.confirm_password && (
        <p style={{ color: "red" }}>This field is required</p>
      )}
      {watchFields[0] != watchFields[1] && (
        <p style={{ color: "red" }}>password not the same</p>
      )}
      <input type="submit" className="btn" value="Sign up" />
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
        <a href="#" className="social-icon">
          <FaFacebookF style={{ color: "#039be5" }} />
        </a>
        <a href="#" className="social-icon">
          <FcGoogle />
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;
