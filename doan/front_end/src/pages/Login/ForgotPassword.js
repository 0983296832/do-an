import React, { useState } from "react";
import "../../assets/css/login.css";
import forgotPassword from "../../assets/image/forgot_password.svg";
import ForgotForm from "./ForgotForm";
import OtpForm from "./OtpForm";

const ForgotPassword = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div className={`container-login sign-in-mode`}>
      <div className="forms-container-login">
        <div className="signin-signup">
          {showOtp ? (
            <OtpForm email={email} />
          ) : (
            <ForgotForm setShowOtp={setShowOtp} setEmail={setEmail} email={email}/>
          )}
        </div>
      </div>

      <div className="panels-container-login">
        <div className="panel left-panel">
          <div className="content">
            <h3>Forgot Password ?</h3>
            <p>
              Enter your email address to get the code to reset your password.
            </p>
          </div>
          <img src={forgotPassword} className="image-login" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
