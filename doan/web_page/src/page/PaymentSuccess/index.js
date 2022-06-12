import React, { useEffect } from "react";
import "../../assets/css/payment-success.css";
import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Toast from "../../components/Toast";
import { LOCAL_STORAGE_ORDER_KEY } from "../../constant/constant";

const PaymentSuccess = () => {
  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_ORDER_KEY);
  }, []);
  return (
    <div className="payment-success">
      <Result
        key="result"
        status="success"
        title="Bạn đã đặt hàng thành công!!!"
        subTitle="Bạn đã đặt hàng thanh công, chúng tôi đã gửi mẫ đơn hàng trong email của bạn mã là:1831273631923.Kiểm tra email để xem chi tiết."
        extra={[
          <Link to="/" key="buy">
            <Button>Tiếp Tục Mua Sắm</Button>
          </Link>,
          <Button type="primary" key="console">
            Xem Đơn Hàng
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
