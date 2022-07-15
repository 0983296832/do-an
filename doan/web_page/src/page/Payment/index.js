import { Divider, Radio, Space } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import Toast from "../../components/Toast";
import "../../assets/css/payment.css";
import PaymentBill from "./PaymentBill";
import PaymentForm from "./PaymentForm";
import VnPay from "./VnPay";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Product from "../../services/productServices";
import {
  LOCAL_STORAGE_CART_KEY,
  LOCAL_STORAGE_ORDER_KEY,
} from "../../constant/constant";

const Payment = () => {
  const { cartState, removeFromCart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const [value, setValue] = useState(1);
  const [formValue, setFormValue] = useState({});
  const [voucher, setVoucher] = useState(0);
  let navigate = useNavigate();
  useEffect(() => {
    const sumQuery = queryString.parse(window.location.search);
    if (JSON.stringify(sumQuery) !== JSON.stringify({})) {
      if (sumQuery.vnp_ResponseCode == "00") {
        payment();
        Toast("success", "Thanh toán thành công");
        navigate("/payment-success/");
      } else {
        Toast("error", "Thanh toán thất bại");
      }
    }
  }, []);
  const storeOrder = () => {
    if (
      !formValue.name ||
      !formValue.phone ||
      !formValue.address ||
      !formValue.email ||
      cartState?.cartIdChecked.length < 1
    ) {
      Toast("error", "Vui lòng nhập đầy đủ thông tin");
      return true;
    }
    const body = {
      ...formValue,
      details: cartState?.cart.filter((item) =>
        cartState.cartIdChecked.includes(item._id)
      ),
      image: cartState?.cart.filter((item) =>
        cartState.cartIdChecked.includes(item._id)
      )[0].product_image,
      payment_type: value === 1 ? "offline" : "online",
      shipping_unit: "GHN",
      shipping_fee: 25000,
      state: "đang chờ xác nhận",
      voucher: voucher,
      cart: cartState.cartIdChecked,
    };

    localStorage.setItem(LOCAL_STORAGE_ORDER_KEY, JSON.stringify(body));
    return false;
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const payment = async () => {
    let orderId;
    const sumQuery = queryString.parse(window.location.search);
    if (JSON.stringify(sumQuery) !== JSON.stringify({})) {
      const { cart, ...body } = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_ORDER_KEY)
      );
      if (body?.details.length > 0) {
        if (auth.token) {
          orderId = await Product.createOrder(auth.data._id, body);
        } else orderId = await Product.createOrder("random", body);
        cart.map((item) => removeFromCart(item, "noToast"));
        navigate(`/payment-success/${orderId.data.data._id}`);
        Toast("success", "Đặt hàng thành công");
        return;
      } else {
        Toast("error", "Giỏ hàng đang trống");
        return;
      }
    }
    if (
      !formValue.name ||
      !formValue.phone ||
      !formValue.address ||
      !formValue.email ||
      cartState?.cartIdChecked.length < 1
    ) {
      Toast("error", "Vui lòng nhập đầy đủ thông tin");
      return;
    } else {
      try {
        const body = {
          ...formValue,
          details: cartState?.cart.filter((item) =>
            cartState.cartIdChecked.includes(item._id)
          ),
          image: cartState?.cart.filter((item) =>
            cartState.cartIdChecked.includes(item._id)
          )[0].product_image,
          payment_type: value === 1 ? "offline" : "online",
          shipping_unit: "GHN",
          shipping_fee: 25000,
          state: "đang chờ xác nhận",
          voucher: voucher,
        };
        if (body.details.length > 0) {
          if (auth.token) {
            orderId = await Product.createOrder(auth.data._id, body);
          } else orderId = await Product.createOrder("random", body);
          cartState?.cartIdChecked.map((item) =>
            removeFromCart(item, "noToast")
          );
          navigate(`/payment-success/${orderId.data.data._id}`);
          Toast("success", "Đặt hàng thành công");
        } else {
          navigate("/payment");
          Toast("error", "Giỏ hàng đang trống");
          return;
        }
      } catch (error) {
        Toast("error", error.message);
        return;
      }
    }
  };
  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2>THÔNG TIN THANH TOÁN</h2>
        <Divider />
        <div className="payment-form-centered">
          <PaymentForm setFormValue={setFormValue} />
        </div>
      </div>
      <div className="payment-bill">
        <h2>ĐƠN HÀNG CỦA BẠN</h2>
        <Divider />
        <PaymentBill
          cartState={cartState}
          voucher={voucher}
          setVoucher={setVoucher}
        />
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
            <VnPay
              monney={
                cartState.totalCart -
                (cartState.totalCart * voucher) / 100 +
                25000
              }
              storeOrder={storeOrder}
            />
          ) : (
            <button className="payment-btn" onClick={payment}>
              ĐẶT HÀNG
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
