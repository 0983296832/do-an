import "../../assets/css/datatable.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ListTable from "../../components/ListOrder";
import Suppliers from "../../services/supplierServices";
import Toast from "../../components/Toast";
import BasicPagination from "../../components/Pagination";
import { CSVLink } from "react-csv";
import Loading from "../../components/Loading";

const { Option } = Select;

//temporary data

const Supplier = () => {
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
    { label: "Suplier Name", key: "supplier_name" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
    { label: "Product Code", key: "product_code" },
    { label: "Price", key: "price" },
    { label: "Gender", key: "gender" },
    { label: "Color", key: "color" },
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Size", key: "size" },
    { label: "Quantity", key: "quantity" },
    { label: "Created", key: "created" },
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
        const options = searchBy + "[options]";
        params = {
          page: pageNum,
          limit: 10,
          [key]: searchKey,
          [options]: "i",
        };
      }
      const result = await Suppliers.getSupplier(params);
      const { data: dataScv } = await Suppliers.getSupplier({
        page: 1,
        limit: 100000,
        ...params,
      });
      setDataScv(dataScv);
      setPageCount(Math.ceil(result.count / 10));
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
            brand,
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
                product_name: name,
                product_price: price,
                product_color: color,
                product_quantity: quantity,
                product_brand: brand,
                product_size: size,
                product_category: category,
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
    const options = searchBy + "[options]";
    try {
      const params = {
        page: 1,
        limit: 10,
        [key]: searchKey,
        [options]: "i",
      };
      const result = await Suppliers.getSupplier(params);
      setPageCount(Math.ceil(result.count / 10));
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
            brand,
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
                product_name: name,
                product_price: price,
                product_color: color,
                product_quantity: quantity,
                product_brand: brand,
                product_size: size,
                product_category: category,
              },
            ],
            amount: (item.product_price * item.product_quantity).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "VND",
              }
            ),
          };
        })
      );
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };
  if (loading) {
    return <Loading />;
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
              <Option value="category">Category</Option>
              <Option value="brand">Brand</Option>
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
          noVoucher
          noShippingFee
        />
        <BasicPagination page={page} setPage={setPage} count={pageCount} />
      </div>
    </div>
  );
};

export default Supplier;
