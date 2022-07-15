import React, { useEffect, useState } from "react";
import "../../assets/css/payment-success.css";
import { Button, Result } from "antd";
import { Link, useParams } from "react-router-dom";
import Toast from "../../components/Toast";
import { LOCAL_STORAGE_ORDER_KEY } from "../../constant/constant";
import Order from "../../services/orderServices";
import Loading from "../../components/Loading";

const PaymentSuccess = () => {
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const getOrderId = async () => {
      setLoading(true);
      try {
        const data = await Order.getOrderById(id);
        setOrderId(data._id);
      } catch (error) {
        Toast("error", "Có lỗi xảy ra");
      }

      setLoading(false);
    };
    localStorage.removeItem(LOCAL_STORAGE_ORDER_KEY);
    getOrderId();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="payment-success">
      <Result
        key="result"
        status="success"
        title="Bạn đã đặt hàng thành công!!!"
        subTitle={`Bạn đã đặt hàng thanh công, chúng tôi đã gửi mẫ đơn hàng trong email của bạn mã là: ${orderId} .Kiểm tra email để xem chi tiết.`}
        extra={[
          <Link to="/" key="buy">
            <Button>Tiếp Tục Mua Sắm</Button>
          </Link>,
          <Link to={`/order/${orderId}`} key="order">
            <Button type="primary">Xem Đơn Hàng</Button>
          </Link>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
