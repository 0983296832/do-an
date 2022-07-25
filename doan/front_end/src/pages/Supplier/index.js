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
        params = {
          page: pageNum,
          limit: 10,
          [key]: searchKey,
        };
      }
      const result = await Suppliers.getSupplier(params);
      const { data: dataScv } = await Suppliers.getSupplier({
        page: 1,
        limit: 100000,
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
    try {
      const params = {
        page: 1,
        limit: 10,
        [key]: searchKey,
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
    return <div>Loading...</div>;
  }
  return (
    <div className="main-wrapper">
      <div className="datatable">
        <div className="datatableTitle">
          Quản lý nhà cung cấp
          <Link to="/add-product" className="_link">
            Thêm Mới
          </Link>
        </div>
        <div className="datatable-feature">
          <div className="feature-input">
            <h3>Bạn đang tìm kiếm cái gì?</h3>
            <Input
              placeholder="Tìm kiếm thứ gì đó..."
              prefix={<SearchOutlined />}
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              allowClear
            />
          </div>
          <div className="feature-select">
            <h3>Tìm kiếm bởi:</h3>
            <Select
              defaultValue={searchBy}
              style={{
                width: 200,
              }}
              onChange={(value) => setSearchBy(value)}
            >
              <Option value="all">Tất cả</Option>
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
              Tìm kiếm
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
