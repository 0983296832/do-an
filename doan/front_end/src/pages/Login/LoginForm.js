import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Auth from "../../services/authServices";
import Toast from "../../components/Toast";
import { LOCAL_STORAGE_USER_KEY } from "../../constant/constant";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import FacebookLogin from "react-facebook-login";

const LoginForm = () => {
  let navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "243328626753-kl87j1eashk2u9n48eq2chn3uorg7cd5.apps.googleusercontent.com",
        scope: "email",
        plugin_name: "streamy",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  const onLogin = async (data) => {
    try {
      const res = await Auth.login(data);
      if (res) {
        if (res.data.role == 1) {
          Toast("error", "You are not admin");
          return;
        }
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res));
        setAuth(res);
        navigate("/");
        Toast("success", "login success");
      }
    } catch (error) {
      Toast("error", "email or password incorrect");
    }
  };

  const responseGoogle = async (response) => {
    try {
      const { result: res } = await Auth.googleLogin({
        tokenId: response.tokenId,
        adminRole: 2,
      });

      if (res) {
        if (res.data.role == 1) {
          Toast("error", "You are not admin");
          return;
        }
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res));
        setAuth(res);
        navigate("/");
        Toast("success", "login success");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const { result: res } = await Auth.facebookLogin({
        accessToken,
        userID,
        adminRole: 1,
      });

      if (res) {
        if (res.data.role == 1) {
          Toast("error", "You are not admin");
          return;
        }
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res));
        setAuth(res);
        navigate("/");
        Toast("success", "login success");
      }
    } catch (error) {
      Toast("error", error.message);
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
          autoComplete={+false}
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
        <GoogleLogin
          clientId="243328626753-gna4nf68r3pb6silhbvnnhbbnk80ao0c.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <a href="#" className="social-icon" onClick={renderProps.onClick}>
              <FcGoogle />
            </a>
          )}
        />
        <FacebookLogin
          appId="747433689941319"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="my-facebook-button-class social-icon"
          icon={<FaFacebookF />}
          textButton=""
        />
      </div>
    </form>
  );
};

export default LoginForm;
