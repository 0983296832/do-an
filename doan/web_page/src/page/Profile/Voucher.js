import {
  Divider,
  List,
  Progress,
  Tag,
  Tooltip,
  Modal,
  Space,
  Radio,
  Tabs,
  Table,
} from "antd";
import React, { useState } from "react";
import { AiOutlineCrown } from "react-icons/ai";
import dis5 from "../../assets/image/dis5.png";
import dis10 from "../../assets/image/dis10.png";
import dis15 from "../../assets/image/dis15.png";
import dis20 from "../../assets/image/dis20.png";

const { TabPane } = Tabs;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Voucher = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState();
  const data = [
    {
      img: dis5,
      desc: "Ưu đãi giảm 5% cho mỗi đơn hàng",
      expire: Date.now(),
      value: 5,
      number: 2,
    },
    {
      img: dis10,
      desc: "Ưu đãi giảm 5% cho mỗi đơn hàng",
      expire: Date.now(),
      number: 2,
      value: 10,
    },
    {
      img: dis15,
      desc: "Ưu đãi giảm 5% cho mỗi đơn hàng",
      expire: Date.now(),
      number: 2,
      value: 15,
    },
    {
      img: dis20,
      desc: "Ưu đãi giảm 5% cho mỗi đơn hàng",
      expire: Date.now(),
      number: 2,
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
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="voucher-container">
      <div className="voucher-card">
        <h3>Điểm thưởng</h3>
        <h5 style={{ width: "100%", marginTop: 40 }}>Bạn có 150/500 điểm</h5>
        <div className="voucher-progress">
          <Progress percent={50} showInfo={false} width={200} size="small" />

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
            dataSource={data}
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
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Hướng dẫn quy đổi" key="1">
            <Table
              columns={columns}
              dataSource={dataTable}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Quy đổi" key="2">
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                {dataChangeVoucher.map((item, index) => {
                  return (
                    <Radio value={item.value} key={index}>
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
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default Voucher;
