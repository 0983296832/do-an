import { Divider, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Toast from "../../components/Toast";
import "../../assets/css/payment.css";
import PaymentBill from "./PaymentBill";
import PaymentForm from "./PaymentForm";
import VnPay from "./VnPay";

const Payment = () => {
  const [value, setValue] = useState(1);
  const [monney, setMonney] = useState(2500000);
  let navigate = useNavigate();

  useEffect(() => {
    const sumQuery = queryString.parse(window.location.search);
    if (JSON.stringify(sumQuery) !== JSON.stringify({})) {
      if (sumQuery.vnp_ResponseCode == "00") {
        Toast("success", "Thanh toán thành công");
        navigate("/payment-success");
      } else {
        Toast("error", "Thanh toán thất bại");
      }
    }
  }, []);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
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
        <Divider />
        <PaymentBill />
        <Divider />
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical" size={20}>
            <Radio value={1}>Thanh toán khi nhận hàng (COD)</Radio>
            <Radio value={2}>Thanh toán online qua VNPay</Radio>
          </Space>
        </Radio.Group>
        <Divider />
        <div className="cart-payment">
          {value === 2 ? (
            <VnPay monney={monney} />
          ) : (
            <Link className="payment-btn" to="/payment-success">
              ĐẶT HÀNG
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
