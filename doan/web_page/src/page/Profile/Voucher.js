import {
  Divider,
  List,
  Progress,
  Tag,
  Tooltip,
  Modal,
  Space,
  Radio,
  Table,
} from "antd";
import React, { useState } from "react";
import { AiOutlineCrown } from "react-icons/ai";
import dis5 from "../../assets/image/dis5.png";
import dis10 from "../../assets/image/dis10.png";
import dis15 from "../../assets/image/dis15.png";
import dis20 from "../../assets/image/dis20.png";
import Toast from "../../components/Toast";
import Users from "../../services/userServices";

const columns = [
  {
    title: "Số điểm",
    dataIndex: "point",
    key: "point",
  },
  {
    title: "Phiếu giảm giá",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Số lượng",
    dataIndex: "amount",
    key: "amount",
  },
];

const Voucher = ({ user, setUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState();
  const data = [
    {
      img: dis5,
      desc: "Ưu đãi giảm 5% cho mỗi đơn hàng",
      expire: Date.now(),
      value: 5,
      number: 0,
    },
    {
      img: dis10,
      desc: "Ưu đãi giảm 10% cho mỗi đơn hàng",
      expire: Date.now(),
      number: 0,
      value: 10,
    },
    {
      img: dis15,
      desc: "Ưu đãi giảm 15% cho mỗi đơn hàng",
      expire: Date.now(),
      number: 0,
      value: 15,
    },
    {
      img: dis20,
      desc: "Ưu đãi giảm 20% cho mỗi đơn hàng",
      expire: Date.now(),
      number: 0,
      value: 20,
    },
  ];
  const dataChangeVoucher = [
    {
      img: dis5,
      value: 5,
    },
    {
      img: dis10,
      value: 10,
    },
    {
      img: dis15,
      value: 15,
    },
    {
      img: dis20,
      value: 20,
    },
  ];

  const dataTable = [
    {
      key: "1",
      point: 50,
      discount: "5%",
      amount: 1,
    },
    {
      key: "2",
      point: 100,
      discount: "10%",
      amount: 1,
    },
    {
      key: "3",
      point: 150,
      discount: "15%",
      amount: 1,
    },
    {
      key: "4",
      point: 200,
      discount: "20%",
      amount: 1,
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = async () => {
    if (value === undefined) {
      setIsModalVisible(false);
      return;
    }
    try {
      let points;
      switch (value) {
        case 5:
          points = 50;
          break;
        case 10:
          points = 100;
          break;
        case 15:
          points = 150;
          break;
        case 20:
          points = 200;
          break;
        default:
          points = 0;
          break;
      }
      await Users.changeRewards(user._id, {
        value,
        points,
      });
      setUser({ ...user, points: user.points - points });
      Toast("success", "Đã đổi được mã giảm giá");
    } catch (error) {
      Toast("error", "Chưa đủ điểm. Đọc hướng dẫn để biết thêm chi tiết");
    }
    setIsModalVisible(false);
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleData = (data) => {
    const tempArr = user.vouchers.flat(Infinity).reduce((acc, cur) => {
      if (acc.find((i) => i.value == cur)) {
        return acc.map((vl) => {
          if (vl.value == cur) {
            return { ...vl, number: vl.number + 1 };
          } else return vl;
        });
      } else {
        return [...acc, { value: cur, number: 1 }];
      }
    }, []);
    return data.map((item) => {
      if (tempArr.find((i) => i.value == item.value)) {
        return {
          ...item,
          number: tempArr.find((i) => i.value == item.value).number,
        };
      } else return item;
    });
  };

  const handleUnchecked = (checkVl) => {
    if (checkVl === value) {
      setValue(undefined);
    } else {
      return;
    }
  };
  return (
    <div className="voucher-container">
      <div className="voucher-card">
        <h3>Điểm thưởng</h3>
        <h5 style={{ width: "100%", marginTop: 40 }}>
          Bạn có {user?.points}/500 điểm
        </h5>
        <div className="voucher-progress">
          <Progress
            percent={(user?.points / 500) * 100}
            showInfo={false}
            width={200}
            size="small"
          />

          <Tooltip placement="top" title={"Quy đổi voucher"}>
            <AiOutlineCrown
              style={{ fontSize: 20, cursor: "pointer" }}
              onClick={showModal}
            />
          </Tooltip>
        </div>
      </div>
      <div className="voucher-content">
        <Divider orientation="left" plain>
          Các mã giảm giá của bạn
        </Divider>
        <div className="voucher-item">
          <List
            bordered
            dataSource={handleData(data)}
            renderItem={(item) => (
              <List.Item>
                <div className="coupon">
                  <img
                    src={item.img}
                    alt=""
                    style={{ width: "auto", height: 50, objectFit: "cover" }}
                  />
                  <div>
                    <Tag color="orange">
                      <h4>số lượng: {item.number} </h4>
                    </Tag>

                    <h4>{item.desc}</h4>
                  </div>
                  <div>
                    <h4>HSD: 1 tháng </h4>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
      <Modal
        title="Đổi điểm thưởng"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <h3 style={{ textAlign: "center" }}>Kiếm điểm bằng cách nào</h3>
        <h5 style={{ textAlign: "center", marginBottom: 20 }}>
          Với mỗi lần nhận hàng thành công bạn sẽ được tích điểm dựa theo số
          tiền bạn đã mua hàng (VD: 1tr=10đ). Với số điểm bạn nhận được sẽ giúp
          bạn đổi được những voucher giảm giá hấp dẫn.Bên dưới sẽ là bảng quy
          đổi điểm voucher:
        </h5>
        <Table
          columns={columns}
          dataSource={dataTable}
          pagination={false}
          style={{ margin: 20 }}
          bordered
        />

        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {dataChangeVoucher.map((item, index) => {
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

export default Voucher;
