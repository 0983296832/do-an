import React from "react";
import "../../assets/css/cart.css";
import { Checkbox, Divider } from "antd";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="cart-container">
      <div className="cart-left">
        <h1>GIỎ HÀNG (5 sản phẩm)</h1>
        <div className="check-all">
          <Checkbox onChange={onChange}>Chọn tất cả sản phẩm</Checkbox>
        </div>
        <div className="check-all height-limit">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>
      <div className="cart-right">
        <h1>Thanh toán</h1>
        <div className="check-all">
          <h2>CỘNG GIỎ HÀNG</h2>
          <div className="cart-sum">
            <h4>Tạm tính</h4>
            <h3>10000000đ</h3>
          </div>
          <Divider />
          <div>
            <h4>Giao hàng</h4>
          </div>
          <Divider />
          <div>
            <h4>Phí vận chuyển: 25,000đ</h4>
            <p style={{ marginTop: "10px" }}>
              Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán.
            </p>
          </div>
          <Divider />
          <div className="cart-sum">
            <h4>Tổng Tiền</h4>
            <h2>10000000đ</h2>
          </div>
          <Divider />
          <div className="cart-payment">
            <Link to="/payment" className="payment-btn">
              TIẾN HÀNH THANH TOÁN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
