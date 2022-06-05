import React from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import { BsEye, BsCartPlus } from "react-icons/bs";

const Product = ({ data }) => {
  const ellipseString = (text) => {
    if (text.length > 50) return text.substring(0, 50) + "...";
    else return text;
  };
  return (
    <div className="product-container">
      <div className="product-img">
        <img src={data.image} alt="Product" />
        <Link to="/product-details/12233">
          <div className="product-cart-icon ">
            <BsEye />
          </div>
        </Link>
        {data.sale && <div className="product-sale">SALE</div>}
        {data.soldOut && <div className="product-soldOut">Cháy Hàng</div>}
        <div className="product-addToCart">
          <BsCartPlus />
        </div>
      </div>
      <Link to="/product-details/12233">
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
      </Link>
    </div>
  );
};

export default Product;
