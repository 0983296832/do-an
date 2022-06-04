import React from "react";
import giay from "../assets/image/giay.jpg";
import { Rate } from "antd";
import { BsEye } from "react-icons/bs";

const Product = () => {
  const ellipseString = (text) => {
    if (text.length > 50) return text.substring(0, 50) + "...";
    else return text;
  };
  return (
    <div className="product-container">
      <div className="product-img">
        <img src={giay} alt="Product" />
        <div className="product-cart-icon">
          <BsEye />
        </div>
      </div>
      <div className="product-infor">
        <h4>{ellipseString("Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1")}</h4>

        <h3>Nike</h3>
        <div className="product-rate">
          <Rate disabled defaultValue={5} />
        </div>
        <div className="product-price">
          <h4 className="sale">1200000đ</h4>
          <h4>1200000đ</h4>
        </div>
      </div>
    </div>
  );
};

export default Product;
