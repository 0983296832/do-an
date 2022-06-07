import { Divider } from "antd";
import React from "react";

const PaymentBill = () => {
  return (
    <div className="payment-bill-bg">
      <div className="space-between">
        <h3>Sản Phẩm</h3>
        <h3>Tạm Tính</h3>
      </div>
      <Divider />
      <div className="space-between">
        <h5>Giày Nike Air Force 1 iD GUCCI Rep 1 1 AF1 Gucci - 38 × 5</h5>
        <h5>100000đ</h5>
      </div>
      <Divider />
      <div className="space-between">
        <h4>Tạm Tính</h4>
        <h5>100000đ</h5>
      </div>
      <Divider />
      <div className="space-between">
        <h4></h4>
        <h4>Giao hàng</h4>
      </div>
      <Divider />
      <div className="space-between">
        <h4></h4>
        <h5>Đồng giá: 25,000đ</h5>
      </div>
      <Divider />
      <div className="space-between">
        <h4>Tổng</h4>
        <h3>1000000đ</h3>
      </div>
    </div>
  );
};

export default PaymentBill;
