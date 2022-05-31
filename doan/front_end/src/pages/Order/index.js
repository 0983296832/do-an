import "../../assets/css/datatable.css";
import { useState, useEffect } from "react";
import Toast from "../../components/Toast";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Button } from "antd";
import ListTable from "../../components/ListOrder";
import Orders from "../../services/orderServices";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const { Option } = Select;

//temporary data

const Order = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          page: 1,
          limit: 10,
        };
        const result = await Orders.getOrder(params);
        setData(
          result.data.map((item, index) => {
            return {
              ...item,
              id: item._id,
              key: index,
              created: moment(item.created).utc().format("DD/MM/YYYY"),
              details: item.details.map((i, idx) => {
                return {
                  ...i,
                  id: uuidv4(),
                  key: idx + 100000,
                };
              }),
              amount: item.details
                .reduce((acc, i) => {
                  return acc + i.price * i.quantity;
                }, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                }),
            };
          })
        );
      } catch (error) {
        Toast("error", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-wrapper">
      <div className="datatable">
        <div className="datatableTitle">Order Management</div>
        <div className="datatable-feature">
          <div className="feature-input">
            <h3>What are you looking for?</h3>
            <Input placeholder="default size" prefix={<SearchOutlined />} />
          </div>
          <div className="feature-select">
            <h3>Type?</h3>
            <Select
              defaultValue="lucy"
              style={{
                width: 200,
              }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>
          <div className="feature-btn">
            <Button type="primary" icon={<SearchOutlined />} size="middle">
              Search
            </Button>
          </div>
        </div>
        <ListTable data={data} XAxis={1700} noSup setData={setData} />
      </div>
    </div>
  );
};

export default Order;
