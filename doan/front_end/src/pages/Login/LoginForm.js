import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Auth from "../../services/authServices";
import Toast from "../../components/Toast";
import { LOCAL_STORAGE_USER_KEY } from "../../constant/constant";

const LoginForm = () => {
  let navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <form className="sign-in-form" onSubmit={handleSubmit(onLogin)}>
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          autoComplete="off"
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
      <input type="submit" value="Login" className="btn solid" />
      <Link to="/forgot">Forgot password</Link>
      <p className="social-text">Or Sign in with social platforms</p>
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

export default LoginForm;
