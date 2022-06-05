import React, { useState } from "react";
import "../../assets/css/details.css";
import { Divider, Rate } from "antd";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const Details = () => {
  const [activeSize, setActiveSize] = useState();
  const [activeColor, setActiveColor] = useState();
  const size = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  const color = ["red", "blue", "green", "yellow", "black", "white"];
  const [number, setNumber] = useState(1);

  const checkNagativeNumber = (number) => {
    if (number < 0) {
      setNumber(0);
    }
    return number;
  };

  return (
    <div>
      <h2>Giày Nike Air Force 1 iD GUCCI Rep 1 1 AF1 Gucci</h2>
      <div className="details-rate">
        <Rate
          disabled
          defaultValue={2}
          style={{ fontSize: 15, marginRight: 10 }}
        />
        <span>(2 đánh giá của khách hàng)</span>
      </div>
      <div className="details-price">
        <h2 className="sale">10000đ</h2>
        <h2>300000đ</h2>
      </div>
      <Divider />
      <div className="details-info">
        <li>
          Trạng thái:&nbsp; <span>Còn hàng</span>
        </li>
        <li>
          Tình trạng : &nbsp;<span>Hàng mới 100%</span>
        </li>
        <li>
          Bảo Hành: &nbsp;<span> 6 Tháng</span>
        </li>
      </div>
      <Divider />
      <div className="details-size">
        <h2>Chọn Size:</h2>
        <div className="size-list">
          {size.map((size, index) => {
            return (
              <div
                className={`sizeNumber ${index === activeSize && "active"}`}
                key={index}
                onClick={() => setActiveSize(index)}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>
      <Divider />
      <div className="details-size">
        <h2>Chọn Màu:</h2>
        <div className="size-list">
          {color.map((item, index) => {
            return (
              <div
                key={index}
                className={`color-btn ${
                  index === activeColor && "activeColor"
                }`}
                style={{ backgroundColor: item }}
                onClick={() => setActiveColor(index)}
              ></div>
            );
          })}
        </div>
      </div>
      <Divider />
      <div className="details-number">
        <h2>Số Lượng:</h2>
        <div className="num-list">
          <AiOutlineMinusCircle
            className="dec"
            onClick={() => setNumber((pre) => pre - 1)}
          />
          <div className="num">{checkNagativeNumber(number)}</div>
          <AiOutlinePlusCircle
            className="inc"
            onClick={() => setNumber((pre) => pre + 1)}
          />
        </div>
      </div>
      <Divider />
      <div className="btn-group">
        <button className="buy-now">MUA NGAY</button>
        <button className="add-cart">THÊM VÀO GIỎ HÀNG</button>
      </div>
    </div>
  );
};

export default Details;
