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

  useEffect(() => {
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
            const {
              product_code,
              name,
              price,
              color,
              quantity,
              size,
              category,
            } = item;
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
    fetchData();
  }, []);

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
