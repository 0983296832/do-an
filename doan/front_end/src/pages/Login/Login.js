import React, { useState } from "react";
import "../../assets/css/login.css";
import log from "../../assets/image/log.svg";
import registerImg from "../../assets/image/register.svg";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Login = () => {
  const [show, setShow] = useState(true);

  return (
    <div
      className={`container-login ${!show ? "sign-up-mode" : "sign-in-mode"}`}
    >
      <div className="forms-container-login">
        <div className="signin-signup">
          <LoginForm />
          <SignUpForm />
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
