import React from "react";

const TopProductSales = ({ data }) => {
  console.log(data);
  return (
    <div className="top-product-container">
      {data.map((item) => (
        <div className="top-product-item">
          <img src={item.image} alt="" />
          <h4>{item.name}</h4>
          <div>
            <h6>{item.number}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopProductSales;
