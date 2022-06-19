import React from "react";
import { Divider, Steps, Tag, Tooltip } from "antd";

import Loading from "../../components/Loading";
const { Step } = Steps;

const DetailOrder = ({ data, loading }) => {
  if (loading) {
    return <Loading />;
  } else
    return (
      <div>
        <HandleStep state={data.state} />
        <div
          style={{
            backgroundColor: "#f7f7f796",
            padding: "0 12px 12px 12px",
            marginTop: 15,
            fontSize:"16px",
            color:"#464646"
          }}
        >
          <div className="letter"></div>
          <Divider orientation="left">
            <h3>Địa chỉ nhận hàng</h3>
          </Divider>
          <h4>Tên người nhận: {data.name}</h4>
          <h4>Số điện thoại: {data.phone}</h4>
          <h4>Địa chỉ: {data.address}</h4>
          <p>Ghi Chú: {data.note}</p>
        </div>

        <Divider />
        <div className="detail-order-container">
          <Divider>
            <h2>Thông tin đơn hàng</h2>
          </Divider>
          <div className="detail-order-item">
            <Order data={data} loading={loading} />
          </div>
        </div>
        <Divider />

        <div className="detail-order-info">
          <div>
            <h4>Tổng tiền hàng: </h4>
          </div>
          <div>
            <h4>
              {data.details.reduce(
                (total, item) =>
                  total + item.product_quantity * item.product_price,
                0
              )}
              đ
            </h4>
          </div>
        </div>

        <div className="detail-order-info">
          <div>
            <h4>Phí vận chuyển: </h4>
          </div>
          <div>
            <h4> {data.shipping_fee}đ</h4>
          </div>
        </div>

        <div className="detail-order-info">
          <div>
            <h4>Đơn vị vận chuyển: </h4>
          </div>
          <div>
            <h4>{data.shipping_unit}</h4>
          </div>
        </div>

        <div className="detail-order-info">
          <div>
            <h4>Phương thức thanh toán: </h4>
          </div>
          <div>
            <h4>{data.payment_type}</h4>
          </div>
        </div>

        <div className="detail-order-info">
          <div>
            <h4> Tổng số tiền: </h4>
          </div>
          <div>
            <h4 style={{ color: "#f00", fontSize: 20 }}>
              {" "}
              {data.details.reduce(
                (total, item) =>
                  total + item.product_quantity * item.product_price,
                25000
              )}
              đ
            </h4>
          </div>
        </div>
      </div>
    );
};

export default DetailOrder;

const Order = ({ data, loading }) => {
  if (loading) {
    return <Loading />;
  } else
    return (
      <>
        {data?.details.map((item, index) => {
          return (
            <div
              className="order-item"
              key={index}
              style={{
                width: "100%",
                border: "1px solid #cccccc",
                padding: "10px 25px",
              }}
            >
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
      </>
    );
};

const CheckLongContent = ({ content }) => {
  if (content.length > 70) {
    return (
      <Tooltip placement="topLeft" title={content}>
        <h3>{content.slice(0, 70) + "..."}</h3>
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

const HandleStep = ({ state }) => {
  let current;
  switch (state) {
    case "đang chờ xác nhận":
      current = 0;
    case "đang đợi gói hàng":
      current = 1;
    case "đã xác nhận":
      current = 2;
    case "đang giao hàng":
      current = 3;
    case "giao hàng thành công":
      current = 4;
    case "giao hàng không thành công":
      current = 5;
  }
  if (state === "đã hủy")
    return (
      <Steps size="small" current={2} status="error">
        <Step title="Đăt hàng" />
        <Step title="Đang chờ xác nhận" />
        <Step title="Đã hủy" />
      </Steps>
    );
  else
    return (
      <Steps
        size="small"
        current={current}
        status={current === 5 ? "error" : "finish"}
      >
        <Step title="Đăt hàng" />
        <Step title="Đang chờ xác nhận" />
        {state === "giao hàng không thành công" ? (
          <>
            <Step title="Đã được xác nhận" />
            <Step title="Đang giao hàng" />
            <Step title="Giao hàng thành công" />
            <Step title="Giao hàng không thành công" />
          </>
        ) : (
          <>
            <Step title="Đã được xác nhận" />
            <Step title="Đang giao hàng" />
            <Step title="Giao hàng thành công" />
          </>
        )}
      </Steps>
    );
};
