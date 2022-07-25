import { Tooltip } from "antd";
import React from "react";

const TopProductSales = ({ data }) => {
  const checkLongContent = (content) => {
    if (content.length > 20) {
      return content.slice(0, 20) + "...";
    }
    return content;
  };
  return (
    <div className="top-product-container">
      {data.map((item) => (
        <div className="top-product-item">
          <img src={item.image} alt="" />
          {item.name.length > 20 ? (
            <Tooltip placement="topLeft" title={item.name}>
              {checkLongContent(item.name)}
            </Tooltip>
          ) : (
            item.name
          )}

          <div>
            <h6>{item.number}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopProductSales;
