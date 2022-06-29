import { Divider, Modal, Radio, Space, Tag } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import dis5 from "../../assets/image/dis5.png";
import dis10 from "../../assets/image/dis10.png";
import dis15 from "../../assets/image/dis15.png";
import dis20 from "../../assets/image/dis20.png";
import { AuthContext } from "../../context/AuthContext";
import Users from "../../services/userServices";

const PaymentBill = ({ cartState, voucher, setVoucher }) => {
  const { auth } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([
    {
      img: dis5,
      value: 5,
      number: 0,
    },
    {
      img: dis10,
      value: 10,
      number: 0,
    },
    {
      img: dis15,
      value: 15,
      number: 0,
    },
    {
      img: dis20,
      value: 20,
      number: 0,
    },
  ]);
  useEffect(() => {
    if (!auth.data) {
      setVoucher(0);
    }
    const getUser = async () => {
      if (auth.data) {
        const user = await Users.getUserById(auth.data._id);
        if (user.result.vouchers) {
          const arrVouchers = [...new Set(user.result.vouchers)].sort(
            (a, b) => a - b
          );
          setData(
            data
              .map((item) => {
                if (arrVouchers.includes(item.value)) {
                  return { ...item, number: 1 };
                } else return item;
              })
              .filter((item) => item.number === 1)
          );
        }
      }
    };
    getUser();
  }, []);
  console.log(data);
  const onChange = (e) => {
    setValue(e.target.value);
    setVoucher(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUnchecked = (checkVl) => {
    if (checkVl === value) {
      setValue(0);
      setVoucher(0);
    } else {
      return;
    }
  };
  return (
    <div className="payment-bill-bg">
      <div className="space-between">
        <h3>Sản Phẩm</h3>
        <h3>Tạm Tính</h3>
      </div>
      <Divider />
      {cartState?.cartIdChecked &&
        cartState?.cart
          .filter((item) => cartState.cartIdChecked.includes(item._id))
          .map((item, index) => {
            return (
              <div className="space-between" key={index}>
                <h5>
                  {item.product_name}-{item.product_size}-{item.product_color}×
                  {item.product_quantity}
                </h5>
                <h5>{item.product_price.toLocaleString()}đ</h5>
              </div>
            );
          })}

      <Divider />
      <div className="space-between">
        <h4>Tạm Tính</h4>
        <h5>
          {cartState?.totalCart === 0 || isNaN(cartState?.totalCart)
            ? 0
            : cartState?.totalCart.toLocaleString()}
          đ
        </h5>
      </div>

      {auth.data && (
        <>
          <Divider />
          <div className="space-between">
            <h4>Voucher</h4>
            <h4>
              {value == 5 ? (
                <Tag color="red">-5%</Tag>
              ) : value == 10 ? (
                <Tag color="red">-10%</Tag>
              ) : value == 15 ? (
                <Tag color="red">-15%</Tag>
              ) : value == 20 ? (
                <Tag color="red">-20%</Tag>
              ) : (
                "Chọn voucher"
              )}
              <RightOutlined
                onClick={showModal}
                style={{ cursor: "pointer" }}
              />
            </h4>
          </div>
        </>
      )}

      <Divider />
      <div className="space-between">
        <h4></h4>
        <h4>Giao hàng</h4>
      </div>
      <Divider />
      <div className="space-between">
        <h4></h4>
        <h5>Đồng giá: 25,000đ</h5>
      </div>
      <Divider />
      <div className="space-between">
        <h4>Tổng</h4>
        <h3>
          {cartState?.totalCart === 0 || isNaN(cartState?.totalCart)
            ? 0
            : (
                cartState?.totalCart -
                (cartState.totalCart * voucher) / 100 +
                25000
              ).toLocaleString()}
          đ
        </h3>
      </div>

      <Modal
        title="Voucher giảm giá"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {data.map((item, index) => {
              return (
                <Radio
                  value={item.value}
                  key={index}
                  onClick={() => handleUnchecked(item.value)}
                >
                  <img
                    src={item.img}
                    alt=""
                    style={{
                      width: "auto",
                      height: 50,
                      objectFit: "cover",
                      marginRight: 10,
                    }}
                  />
                  Giảm {item.value}% giá trị đơn hàng
                  <Tag color="red" style={{ marginLeft: 70 }}>
                    -{item.value}%
                  </Tag>
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default PaymentBill;
