import "../../assets/css/datatable.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../../services/userServices";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Button } from "antd";
import ListTable from "../../components/ListOrder";
import Suppliers from "../../services/supplierServices";
import Toast from "../../components/Toast";

const { Option } = Select;

//temporary data

const Supplier = () => {
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
      const result = await Suppliers.getSupplier(params);

      setData(
        result.data.map((item, index) => {
          const { product_code, name, price, color, quantity, size, category } =
            item;
          return {
            key: index,
            id: item._id,
            supplier_name: item.supplier_name,
            created: item.created,
            address: item.address,
            phone: item.phone,
            details: [
              {
                key: index + 100000,
                product_code,
                name,
                price,
                color,
                quantity,
                size,
                category,
              },
            ],
            amount: (item.price * item.quantity).toLocaleString("en-US", {
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
      const result = await Suppliers.getSupplier(params);

      setData(
        result.data.map((item, index) => {
          const { product_code, name, price, color, quantity, size, category } =
            item;
          return {
            key: index,
            id: item._id,
            supplier_name: item.supplier_name,
            created: item.created,
            address: item.address,
            phone: item.phone,
            details: [
              {
                key: index + 100000,
                product_code,
                name,
                price,
                color,
                quantity,
                size,
                category,
              },
            ],
            amount: (item.price * item.quantity).toLocaleString("en-US", {
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
        <div className="datatableTitle">
          Supplier Management
          <Link to="/add-product" className="_link">
            Add New
          </Link>
        </div>
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
              <Option value="supplier_name">Supplier Name</Option>
              <Option value="name">Product Name</Option>
              <Option value="product_code">Product Code</Option>
              <Option value="phone">Phone Number</Option>
              <Option value="email">Email</Option>
              <Option value="address">Address</Option>
              <Option value="created">Created</Option>
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
        <ListTable
          data={data}
          noName
          noStatus
          noPay
          noRec
          XAxis={1300}
          noFixed
          noImg
          noOrder
          setData={setData}
        />
      </div>
    </div>
  );
};

export default Supplier;
