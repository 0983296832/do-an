import React, { useState } from "react";

import { Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import Orders from "../../services/orderServices";
import Modal from "./Modal";
import DetailOrder from "./DetailOrder";

const Order = ({ data, loading, setOrder, orders }) => {
  const [disabled, setDisabled] = useState(false);
  const handleOpen = () => setDisabled(true);
  const handleClose = () => setDisabled(false);

  const handleCancel = async () => {
    try {
      await Orders.cancelOrder(data._id, { state: "đã hủy" });
      setOrder(
        orders.map((item) => {
          if (item._id === data._id) {
            return { ...item, state: "đã hủy" };
          } else return item;
        })
      );
      Toast("success", "Đã hủy đơn hàng thành công");
    } catch (error) {
      Toast("error", error.message);
    }
  };
  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="order-item-wrap">
        {data?.details.map((item, index) => {
          return (
            <div className="order-item" key={index}>
              <div className="order-left">
                <img src={item.product_image} alt="" />
                <div>
                  <CheckLongContent content={item.product_name} />
                  <h5>
                    Phân loại:{item.product_size}, {item.product_color}
                  </h5>
                </div>
              </div>
              <div className="order-right">
                <TagRender state={data?.state} />
                <h4>{item.product_price}đ</h4>
                <h5>x{item.product_quantity}</h5>
              </div>
            </div>
          );
        })}

        <div className="order-detail" style={{ margin: "10px 0" }}>
          <h4 onClick={handleOpen}>Xem chi tiết</h4>
          <h3>
            {data?.details.reduce((acc, cur) => {
              return acc + cur.product_quantity;
            }, 0)}{" "}
            sản phẩm. Thành tiền:{" "}
            {data?.details.reduce((acc, cur) => {
              return acc + cur.product_quantity * cur.product_price;
            }, 0) + 25000}
            đ
          </h3>
        </div>

        <div className="order-item-btn-group">
          <div className="order-item-btn">
            {data?.state === "đang chờ xác nhận" ? (
              <button className="btn-cancel" onClick={handleCancel}>
                Hủy
              </button>
            ) : (
              <div style={{ margin: "5px 0" }}>
                <Link to="/" className="btn-cancel">
                  Mua lại
                </Link>
              </div>
            )}
          </div>
        </div>

        <Modal
          disabled={disabled}
          handleClose={handleClose}
          loading={loading}
          title={`Chi tiết đơn hàng : ${data?._id}`}
        >
          <DetailOrder data={data} setOrder={setOrder} orders={orders} />
        </Modal>
      </div>
    );
};

export default Order;

const CheckLongContent = ({ content }) => {
  if (content.length > 40) {
    return (
      <Tooltip placement="topLeft" title={content}>
        <h3>{content.slice(0, 40) + "..."}</h3>
      </Tooltip>
    );
  }
  return <h3>{content}</h3>;
};

const TagRender = ({ state }) => {
  let colorTag;
  switch (state) {
    case "đang chờ xác nhận":
      colorTag = "orange";
      break;
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
    case "giao hàng không thành công":
      colorTag = "purple";
      break;
    case "đã hủy":
      colorTag = "red";
      break;
  }
  return <Tag color={colorTag}>{state}</Tag>;
};
