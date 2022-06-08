import React from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <div className="order-item-wrap">
      <div className="order-item">
        <div className="order-left">
          <img src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2022/05/giay-sneakers-cole-haan-grandpro-tennis-mau-xanh-trang-6295877d3a278-31052022101157.jpg" />
          <div>
            <h3>Giày Sneaker Siêu Đẹp</h3>
            <h5>Phân loại: 33, black</h5>
          </div>
        </div>
        <div className="order-right">
          <TagRender state="đang đợi gói hàng" />
          <h4>120000đ</h4>
          <h5>x1</h5>
        </div>
      </div>
      <div className="order-detail">
        <h4>Xem chi tiết</h4>
        <h3>2 sản phẩm. Thành tiền: 100000đ</h3>
      </div>

      <div className="order-item-btn-group">
        <div className="order-item-btn">
          <Link to="/" className="btn-cancel">
            Mua lại
          </Link>
          <Link to="/" className="btn-cancel">
            Đánh giá
          </Link>
          <button className="btn-cancel">Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default Order;

const TagRender = ({ state }) => {
  let colorTag;
  switch (state) {
    case "đang đợi gói hàng":
      colorTag = "yellow";
      break;
    case "đã xác nhận":
      colorTag = "blue";
      break;
    case "đang giao hàng":
      colorTag = "gray";
      break;
    case "giao hàng thành công":
      colorTag = "green";
      break;
    case "đã hủy":
      colorTag = "red";
      break;
  }
  return <Tag color={colorTag}>{state}</Tag>;
};
