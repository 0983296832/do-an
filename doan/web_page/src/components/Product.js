import React from "react";

import { Rate } from "antd";
import { BsEye } from "react-icons/bs";

const Product = ({ data }) => {
  console.log(data);
  const ellipseString = (text) => {
    if (text.length > 50) return text.substring(0, 50) + "...";
    else return text;
  };
  return (
    <div className="product-container">
      <div className="product-img">
        <img src={data.image} alt="Product" />
        <div className="product-cart-icon">
          <BsEye />
        </div>
        {data.sale && <div className="product-sale">SALE</div>}
        {data.soldOut && <div className="product-soldOut">Cháy Hàng</div>}
      </div>
      <div className="product-infor">
        <h4>{ellipseString(data.title)}</h4>

        <h3>{data.category}</h3>
        <div className="product-rate">
          <Rate disabled defaultValue={data.rate} />
        </div>
        <div className="product-price">
          <h4 className="sale">{data.priceSale}đ</h4>
          <h4>{data.price}đ</h4>
        </div>
      </div>
    </div>
  );
};

export default Product;
