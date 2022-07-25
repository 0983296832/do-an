import React, { useRef } from "react";
import { Divider, Steps, Tag, Tooltip, Button } from "antd";
import moment from "moment";
import Loading from "../../components/Loading";
import Orders from "../../services/orderServices";
import Toast from "../../components/Toast";
import { Link } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";

const { Step } = Steps;

const DetailOrder = ({ data, loading, orders, setOrder }) => {
  console.log(
    data.details.reduce(
      (total, item) => total + item.product_quantity * item.product_price,
      0
    ) -
      (data.details.reduce(
        (total, item) => total + item.product_quantity * item.product_price,
        0
      ) *
        data.voucher) /
        100 +
      25000
  );
  const stepData = [
    "đặt hàng",
    "đang chờ xác nhận",
    "đã xác nhận",
    "đang đợi gói hàng",
    "đang giao hàng",
    "giao hàng thành công",
  ];
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
      <div ref={componentRef}>
        {data.state === "đã hủy" ? (
          <Steps size="small" current={2} status="error">
            <Step title="Đăt hàng" />
            <Step title="Đang chờ xác nhận" />
            <Step title="Đã hủy" />
          </Steps>
        ) : data.state == "giao hàng không thành công" ? (
          <Steps size="small" current={6} status="error">
            <Step title="Đăt hàng" />
            <Step title="Đang chờ xác nhận" />
            <Step title="Đã xác nhận" />
            <Step title="Đang đợi gói hàng" />
            <Step title="Đang giao hàng" />
            <Step title="Giao hàng thành công" />
            <Step title="Giao hàng không thành công" />
          </Steps>
        ) : (
          <Steps
            size="small"
            current={stepData.indexOf(data.state.trim())}
            status="finish"
          >
            <Step title="Đăt hàng" />
            <Step title="Đang chờ xác nhận" />
            <Step title="Đã xác nhận" />
            <Step title="Đang đợi gói hàng" />
            <Step title="Đang giao hàng" />
            <Step title="Giao hàng thành công" />
          </Steps>
        )}
        <div
          style={{
            backgroundColor: "#f7f7f796",
            padding: "0 12px 12px 12px",
            marginTop: 15,
            fontSize: "16px",
            color: "#464646",
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
            <h4>Ngày đặt hàng: </h4>
          </div>
          <div>
            <h4>{moment(data.created).zone("+07:00").format("DD/MM/YYYY")}</h4>
          </div>
        </div>
        <div className="detail-order-info">
          <div>
            <h4>Ngày nhận hàng: </h4>
          </div>
          <div>
            <h4>
              {data?.receive_date
                ? moment(data?.receive_date).zone("+07:00").format("DD/MM/YYYY")
                : "Chưa nhận"}
            </h4>
          </div>
        </div>
        <div className="detail-order-info">
          <div>
            <h4>Tổng tiền hàng: </h4>
          </div>
          <div>
            <h4>
              {data.details
                .reduce(
                  (total, item) =>
                    total + item.product_quantity * item.product_price,
                  0
                )
                .toLocaleString()}
              đ
            </h4>
          </div>
        </div>

        <div className="detail-order-info">
          <div>
            <h4>Phí vận chuyển: </h4>
          </div>
          <div>
            <h4> {data.shipping_fee.toLocaleString()}đ</h4>
          </div>
        </div>
        <div className="detail-order-info">
          <div>
            <h4>Voucher: </h4>
          </div>
          <div>
            <Tag color="red">-{data.voucher}%</Tag>
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
              {(
                data.details.reduce(
                  (total, item) =>
                    total + item.product_quantity * item.product_price,
                  0
                ) -
                (data.details.reduce(
                  (total, item) =>
                    total + item.product_quantity * item.product_price,
                  0
                ) *
                  data.voucher) /
                  100 +
                25000
              ).toLocaleString()}
              đ
            </h4>
          </div>
        </div>
        <div className="order-item-btn-group" style={{ marginTop: 17 }}>
          <div className="order-item-btn">
            <Button onClick={handlePrint} icon={<PrinterOutlined />}>
              Print PDF
            </Button>
            {data?.state === "đang chờ xác nhận" ? (
              <button className="btn-cancel" onClick={handleCancel}>
                Hủy
              </button>
            ) : (
              <div style={{ margin: "5px 0" }}>
                <Link to="/" className="btn-cancel">
                  Mua lại
                </Link>

                <Link to="/" className="btn-cancel">
                  Đánh giá
                </Link>
              </div>
            )}
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
                <h4>{item.product_price.toLocaleString()}đ</h4>
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
