import "../../assets/css/datatable.css";
import { useState, useEffect } from "react";
import Toast from "../../components/Toast";
import { Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ListTable from "../../components/ListOrder";
import Orders from "../../services/orderServices";
import { v4 as uuidv4 } from "uuid";
import BasicPagination from "../../components/Pagination";
import { CSVLink } from "react-csv";

const { Option } = Select;

//temporary data

const Order = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchBy, setSearchBy] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [dataScv, setDataScv] = useState();
  const [headers, setHeaders] = useState([
    { label: "ID", key: "_id" },
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
    { label: "Email", key: "email" },
    { label: "Order Date", key: "created" },
    { label: "Note", key: "note" },
    { label: "Details", key: "details" },
    { label: "State", key: "state" },
    { label: "Payment Type", key: "payment_type" },
    { label: "Shipping Unit", key: "shipping_unit" },
    { label: "Shipping Fee", key: "shipping_fee" },
    { label: "Receive Date", key: "receive_date" },
  ]);

  const fetchData = async (pageNum) => {
    setLoading(true);
    try {
      let params;
      if (searchBy === "all") {
        setSearchKey("");
        params = {
          page: pageNum,
          limit: 10,
        };
      } else {
        const key = searchBy + "[regex]";
        params = {
          page: pageNum,
          limit: 10,
          [key]: searchKey,
        };
      }
      const result = await Orders.getOrder(params);
      const { data: dataScv } = await Orders.getOrder({
        page: 1,
        limit: 100000,
      });
      setDataScv(
        dataScv.map((item) => {
          return {
            ...item,
            details: item.details.map((detail) => {
              delete detail.product_image;
              return Object.values(detail);
            }),
          };
        })
      );
      setPageCount(Math.ceil(result.count / 10));
      setData(
        result.data.map((item, index) => {
          return {
            ...item,
            id: item._id,
            key: index,
            created: item.created,
            details: item.details.map((i, idx) => {
              return {
                ...i,
                id: uuidv4(),
                key: idx + 100000,
              };
            }),
            amount: item.details
              .reduce((acc, i) => {
                return acc + i.product_price * i.product_quantity;
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

    fetchData(page);
    return () => {
      isCancel = true;
    };
  }, [page]);

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
      setPageCount(Math.ceil(result.count / 10));
      setData(
        result.data.map((item, index) => {
          return {
            ...item,
            id: item._id,
            key: index,
            created: item.created,
            details: item.details.map((i, idx) => {
              return {
                ...i,
                id: uuidv4(),
                key: idx + 100000,
              };
            }),
            amount: item.details
              .reduce((acc, i) => {
                return acc + i.product_price * i.product_quantity;
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
        {!loading && (
          <Button type="primary">
            <CSVLink
              data={dataScv || []}
              headers={headers}
              style={{ color: "white" }}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
        <ListTable data={data} XAxis={1700} noSup setData={setData} />
        <BasicPagination page={page} setPage={setPage} count={pageCount} />
      </div>
    </div>
  );
};

export default Order;
