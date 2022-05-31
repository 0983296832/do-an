import React, { useContext, useState } from "react";
import "../../assets/css/login.css";
import log from "../../assets/image/log.svg";
import registerImg from "../../assets/image/register.svg";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import Auth from "../../services/authServices";
import Toast from "../../components/Toast";
import { LOCAL_STORAGE_USER_KEY } from "../../constant/constant";

const Login = () => {
  let navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(true);
  const onLogin = async (data) => {
    try {
      const res = await Auth.login(data);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res));
      setAuth(res);
      navigate("/");
      Toast("success", "login success");
    } catch (error) {
      Toast("error", error.message);
    }
  };

  return (
    <div
      className={`container-login ${!show ? "sign-up-mode" : "sign-in-mode"}`}
    >
      <div className="forms-container-login">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit(onLogin)}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
                autoComplete="off"
              />
            </div>
            {errors.email && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
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
            <Link to="/login">Forgot password</Link>
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
          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" />
            </div>
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
        </div>
      </div>

      <div className="panels-container-login">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => setShow(false)}
            >
              Sign up
            </button>
          </div>
          <img src={log} className="image-login" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => setShow(true)}
            >
              Sign in
            </button>
          </div>
          <img src={registerImg} className="image-login" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
