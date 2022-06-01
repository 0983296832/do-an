import React, { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import Toast from "../../components/Toast";
import Auth from "../../services/authServices";
import { useNavigate } from "react-router-dom";

const OtpForm = ({ email }) => {
  const [OTP, setOTP] = useState("");
  let navigate = useNavigate();
  const renderButton = (buttonProps) => {
    return (
      <button {...buttonProps}>
        {buttonProps.remainingTime !== 0
          ? `Please wait for ${buttonProps.remainingTime} sec`
          : "Resend"}
      </button>
    );
  };
  const renderTime = () => React.Fragment;

  const onResend = async () => {
    try {
      const res = await Auth.sendEmail({ email });
      if (res.data.status === 200) {
        Toast("success", "send email success");
      } else {
        Toast("error", "send email fail");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const onVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await Auth.checkOtp({ code: OTP });
      if (res.data.status === 200) {
        navigate("/reset/" + email);
        Toast("success", "verify success");
      } else {
        Toast("error", "verify fail");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  return (
    <form className="sign-in-form" onSubmit={(e) => onVerify(e)}>
      <h2 className="title">Verify code</h2>
      <div className="input-otp">
        <i className="fas fa-lock"></i>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
        />
        <ResendOTP
          renderButton={renderButton}
          renderTime={renderTime}
          onResendClick={onResend}
        />
      </div>
      <input type="submit" value="Verify" className="btn solid" />
    </form>
  );
};

export default OtpForm;
