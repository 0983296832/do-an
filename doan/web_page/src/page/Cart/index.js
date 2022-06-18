import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/cart.css";
import { Checkbox, Divider, Col, Row } from "antd";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cartState, totalCart } = useContext(CartContext);
  return (
    <div className="cart-container">
      <div className="cart-left">
        <h1>GIỎ HÀNG (5 sản phẩm)</h1>
        <CheckAll cartState={cartState} totalCart={totalCart} />
      </div>
      <div className="cart-right">
        <h1>Thanh toán</h1>
        <div className="check-all">
          <h2>CỘNG GIỎ HÀNG</h2>
          <div className="cart-sum">
            <h4>Tạm tính</h4>
            <h3>
              {cartState.totalCart
                ? Number(cartState.totalCart).toLocaleString()
                : 0}
              đ
            </h3>
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
            <h2>
              {cartState.totalCart === 0 || isNaN(cartState.totalCart)
                ? 0
                : (cartState.totalCart + 25000).toLocaleString()}
              đ
            </h2>
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

const CheckAll = ({ cartState, totalCart }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const plainOptions = cartState?.cart.map((item) => item._id);
  useEffect(() => {
    totalCart(checkedList);
  }, [checkedList]);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        options={plainOptions}
      >
        Chọn tất cả sản phẩm
      </Checkbox>
      <Divider />

      <Checkbox.Group
        style={{
          width: "100%",
        }}
        // options={plainOptions}
        value={checkedList}
        onChange={onChange}
      >
        <Row>
          {cartState.cart.map((item, index) => {
            return (
              <Col span={24} key={index}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 15fr",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Checkbox
                      value={item._id}
                      style={{ width: 20 }}
                      checked={true}
                    />
                  </div>
                  <CartItem
                    item={item}
                    checkedList={checkedList}
                    totalCart={totalCart}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    </>
  );
};
