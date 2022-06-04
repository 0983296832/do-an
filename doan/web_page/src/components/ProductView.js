import { Button } from "antd";
import React from "react";
import Product from "./Product";

const ProductView = ({ data, title }) => {
  return (
    <div>
      <div className="productView-title">
        <h1>{title}</h1>
      </div>
      <div className="top-product">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <Product data={item} />
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href="#" className="view-btn">
          Xem thêm sản phẩm
        </a>
      </div>
    </div>
  );
};

export default ProductView;
