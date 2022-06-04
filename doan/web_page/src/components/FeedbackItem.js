import React from "react";
import { Rate } from "antd";

const FeedbackPart = ({ data }) => {
  return (
    <div className="feedback-part">
      <img src={data.image} />
      <div className="product-rate">
        <Rate disabled defaultValue={data.rate} />
      </div>
      <div className="feedback-part-desc">{data.desc}</div>
      <h3>{data.name}</h3>
    </div>
  );
};

export default FeedbackPart;
