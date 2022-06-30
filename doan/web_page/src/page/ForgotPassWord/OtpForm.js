import React, { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import Toast from "../../components/Toast";
import Auth from "../../services/authServices";

const OtpForm = ({ email, setTabIndex }) => {
  const [OTP, setOTP] = useState("");
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
        Toast("success", "verify success");
        setTabIndex(2);
      } else {
        Toast("error", "verify fail");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  return (
    <div>
      <h1>Nhập OTP để xác thực</h1>
      <form className="login-form" onSubmit={(e) => onVerify(e)}>
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
        <button className="login-btn" style={{ width: "90%" }}>
          Xác thực
        </button>
      </form>
    </div>
  );
};

export default OtpForm;
