import { Divider } from "antd";
import React from "react";
import "../../assets/css/payment.css";
import PaymentForm from "./PaymentForm";

const Payment = () => {
  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2>THÔNG TIN THANH TOÁN</h2>
        <Divider />
        <div className="payment-form-centered">
          <PaymentForm />
        </div>
      </div>
      <div className="payment-bill">
        <h2>ĐƠN HÀNG CỦA BẠN</h2>
      </div>
    </div>
  );
};

export default Payment;
