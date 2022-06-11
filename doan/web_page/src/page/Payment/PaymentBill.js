import { Divider } from "antd";
import React from "react";

const PaymentBill = ({ cartState }) => {
  return (
    <div className="payment-bill-bg">
      <div className="space-between">
        <h3>Sản Phẩm</h3>
        <h3>Tạm Tính</h3>
      </div>
      <Divider />
      {cartState?.cartIdChecked &&
        cartState?.cart
          .filter((item) => cartState.cartIdChecked.includes(item._id))
          .map((item, index) => {
            return (
              <div className="space-between" key={index}>
                <h5>
                  {item.product_name}-{item.product_size}-{item.product_color}×
                  {item.product_quantity}
                </h5>
                <h5>{item.product_price}đ</h5>
              </div>
            );
          })}

      <Divider />
      <div className="space-between">
        <h4>Tạm Tính</h4>
        <h5>
          {cartState?.totalCart === 0 || isNaN(cartState?.totalCart)
            ? 0
            : cartState?.totalCart}
          đ
        </h5>
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
        <h3>
          {cartState?.totalCart === 0 || isNaN(cartState?.totalCart)
            ? 0
            : cartState?.totalCart + 25000}
          đ
        </h3>
      </div>
    </div>
  );
};

export default PaymentBill;
