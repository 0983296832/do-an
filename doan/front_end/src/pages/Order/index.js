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
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchBy, setSearchBy] = useState("all");

  const fetchData = async () => {
    setLoading(true);
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
            created: moment(item.created).zone("+07:00").format("DD/MM/YYYY"),
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
    setLoading(false);
    return;
  };
  useEffect(() => {
    let isCancel = false;

    fetchData();
    return () => {
      isCancel = true;
    };
  }, []);

  const getDataBySearch = async () => {
    if (searchBy === "all") {
      setSearchKey("");
      fetchData();
    }

    setLoading(true);
    const key = searchBy + "[regex]";
    try {
      const params = {
        page: 1,
        limit: 10,
        [key]: searchKey,
      };
      const result = await Orders.getOrder(params);
      setData(
        result.data.map((item, index) => {
          return {
            ...item,
            id: item._id,
            key: index,
            created: moment(item.created).zone("+07:00").format("DD/MM/YYYY"),
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
    setLoading(false);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main-wrapper">
      <div className="datatable">
        <div className="datatableTitle">Order Management</div>
        <div className="datatable-feature">
          <div className="feature-input">
            <h3>What are you looking for?</h3>
            <Input
              placeholder="Search something..."
              prefix={<SearchOutlined />}
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              allowClear
            />
          </div>
          <div className="feature-select">
            <h3>Search By:</h3>
            <Select
              defaultValue={searchBy}
              style={{
                width: 200,
              }}
              onChange={(value) => setSearchBy(value)}
            >
              <Option value="all">All</Option>
              <Option value="name">Name</Option>
              <Option value="phone">Phone Number</Option>
              <Option value="email">Email</Option>
              <Option value="address">Address</Option>
              <Option value="created">Created</Option>
              <Option value="receive_date">Recive Date</Option>
              <Option value="payment_type">Payment Type</Option>
              <Option value="state">Status</Option>
            </Select>
          </div>
          <div className="feature-btn">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="middle"
              onClick={getDataBySearch}
            >
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
