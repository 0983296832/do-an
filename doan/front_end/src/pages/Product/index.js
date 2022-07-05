import React from "react";
import "../../assets/css/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Input,
  Tooltip,
  Rate,
  Select,
  Button,
  Avatar,
  Tabs,
  DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Products from "../../services/productServices";
import Toast from "../../components/Toast";
import BasicPagination from "../../components/Pagination";
import { CSVLink } from "react-csv";
import { MdOutlineInventory2, MdLocalShipping } from "react-icons/md";
import { AiOutlineCreditCard } from "react-icons/ai";
import moment from "moment";

const { Option } = Select;
const { TabPane } = Tabs;

const productColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    renderCell: (params) => {
      return (
        <Tooltip placement="topLeft" title={params.row.id}>
          {params.row.id.slice(0, 10) + "..."}
        </Tooltip>
      );
    },
  },
  {
    field: "product_code",
    headerName: "Product Code",
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    renderCell: (params) => {
      return (
        <Tooltip placement="topLeft" title={params.row.name}>
          {params.row.name.slice(0, 15) + "..."}
        </Tooltip>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return (
        <div>{`${params.row.price.toLocaleString("en-US", {
          style: "currency",
          currency: "VND",
        })}`}</div>
      );
    },
  },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => {
      return (
        <Avatar.Group
          maxCount={3}
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          {params.row.image.map((img) => {
            return <Avatar src={img} />;
          })}
        </Avatar.Group>
      );
    },
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "sales",
    headerName: "Sales",
    width: 100,
  },
  {
    field: "stocks",
    headerName: "Stocks",
    width: 100,
  },
  {
    field: "views",
    headerName: "Views",
    width: 100,
  },
  {
    field: "votes",
    headerName: "Votes",
    width: 150,
    renderCell: (params) => {
      const desc = ["terrible", "bad", "normal", "good", "wonderful"];
      return (
        <Rate
          allowHalf
          defaultValue={params.row.votes}
          disabled
          tooltips={desc}
          className="rate"
        />
      );
    },
  },
];

const ProductManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchBy, setSearchBy] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [dataScv, setDataScv] = useState();
  const [headers, setHeaders] = useState([
    { label: "ID", key: "_id" },
    { label: "Product Code", key: "product_code" },
    { label: "Name", key: "name" },
    { label: "Price", key: "price" },
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Image", key: "image" },
    { label: "Views", key: "views" },
    { label: "Details", key: "details" },
    { label: "Sales", key: "sales" },
    { label: "Votes", key: "votes" },
    { label: "Discount", key: "discount" },
    { label: "Gender", key: "gender" },
    { label: "Created", key: "createdAt" },
  ]);
  const [dataStock, setDataStock] = useState([]);
  const [selectDate, setSelectDate] = useState({
    month: moment(new Date()).format("M"),
    year: moment(new Date()).format("Y"),
  });
  const [activeTab, setActiveTab] = useState("1");

  const fetchData = async (pageNum) => {
    try {
      let params;
      if (searchBy === "all") {
        setSearchKey("");
        params = {
          page: pageNum,
          limit: 10,
          sort: "_id",
        };
      } else if (searchBy === "price") {
        const key = searchBy + "[gte]";
        params = {
          page: pageNum,
          limit: 10,
          [key]: searchKey,
          sort: "_id",
        };
      } else {
        const key = searchBy + "[regex]";
        params = {
          page: pageNum,
          limit: 10,
          [key]: searchKey,
          sort: "_id",
        };
      }
      const result = await Products.getProducts(params);
      const { data: dataScv } = await Products.getProducts({
        page: 1,
        limit: 100000,
      });
      setDataScv(
        dataScv.map((item) => {
          return {
            ...item,
            image: item.image.map((image) => image.imageUrl),
            details: item.details.map((detail) => {
              return Object.values(detail);
            }),
          };
        })
      );
      setPageCount(Math.ceil(result.count / 10));
      setData(
        result.data.map((item, index) => {
          return {
            key: index,
            id: item._id,
            product_code: item.product_code,
            name: item.name,
            category: item.category,
            brand: item.brand,
            price: item.price,
            image: item.image?.map((img) => img.imageUrl) || [],
            gender: item.gender,
            sales: item.sales,
            views: item.views,
            votes: item.votes,
            stocks: item.details.reduce((acc, item) => {
              return acc + item.quantity;
            }, 0),
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
    setLoading(true);
    let isCancel = false;

    fetchData(page);

    return () => {
      isCancel = true;
    };
  }, [page]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const stock = await Products.getStockByMonth(selectDate);
        setDataStock([
          {
            title: "Quantity Overviews",
            children: [
              {
                name: "product",
                number: stock.product.quantity,
                icon: (
                  <MdOutlineInventory2
                    className="wigget__icon wigget-stock-icon"
                    style={{
                      backgroundColor: "rgba(218, 165, 32, 0.2)",
                      color: "goldenrod",
                    }}
                  />
                ),
              },
              {
                name: "order",
                number: stock.order.quantity,
                icon: (
                  <AiOutlineCreditCard
                    className="wigget__icon wigget-stock-icon"
                    style={{
                      backgroundColor: "rgba(128, 0, 128, 0.2)",
                      color: "purple",
                    }}
                  />
                ),
              },
              {
                name: "supplier",
                number: stock.supplier.quantity,
                icon: (
                  <MdLocalShipping
                    className="wigget__icon wigget-stock-icon"
                    style={{
                      backgroundColor: "rgba(0, 128, 0, 0.2)",
                      color: "green",
                    }}
                  />
                ),
              },
            ],
          },
          {
            title: "Money Overviews",
            children: [
              {
                name: "product",
                number: stock.product.money,
                isMoney: true,
                icon: (
                  <MdOutlineInventory2
                    className="wigget__icon wigget-stock-icon"
                    style={{
                      backgroundColor: "rgba(218, 165, 32, 0.2)",
                      color: "goldenrod",
                    }}
                  />
                ),
              },
              {
                name: "order",
                number: stock.order.money,
                isMoney: true,
                icon: (
                  <AiOutlineCreditCard
                    className="wigget__icon wigget-stock-icon"
                    style={{
                      backgroundColor: "rgba(128, 0, 128, 0.2)",
                      color: "purple",
                    }}
                  />
                ),
              },
              {
                name: "supplier",
                number: stock.supplier.money,
                isMoney: true,
                icon: (
                  <MdLocalShipping
                    className="wigget__icon wigget-stock-icon"
                    style={{
                      backgroundColor: "rgba(0, 128, 0, 0.2)",
                      color: "green",
                    }}
                  />
                ),
              },
            ],
          },
        ]);
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
    })();
  }, [selectDate]);
  const getDataBySearch = async () => {
    if (searchBy === "all") {
      setSearchKey("");
      fetchData();
      return;
    }
    setLoading(true);

    try {
      let params;
      if (searchBy === "price") {
        const key = searchBy + "[gte]";
        params = {
          page: 1,
          limit: 10,
          [key]: searchKey,
          sort: "_id",
        };
      } else {
        const key = searchBy + "[regex]";
        params = {
          page: 1,
          limit: 10,
          [key]: searchKey,
        };
      }

      const result = await Products.getProducts(params);
      setPageCount(Math.ceil(result.count / 10));
      setData(
        result.data.map((item, index) => {
          return {
            key: index,
            id: item._id,
            product_code: item.product_code,
            name: item.name,
            category: item.category,
            brand: item.brand,
            price: item.price,
            image: item.image?.map((img) => img.imageUrl) || [],
            gender: item.gender,
            sales: item.sales,
            views: item.views,
            votes: item.votes,
            stocks: item.details.reduce((acc, item) => {
              return acc + item.quantity;
            }, 0),
          };
        })
      );
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await Products.deleteProduct(id);
      setData(data.filter((item) => item.id !== id));
      Toast("success", "Delete product successfully");
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/product-detail/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View Detail</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const onChange = (data) => {
    setSelectDate({
      month: moment(data).format("M"),
      year: moment(data).format("Y"),
    });
  };
  const changeTab = (key) => {
    setActiveTab(key);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Tabs type="card" defaultActiveKey={activeTab} onChange={changeTab}>
      <TabPane tab="Product Management" key="1">
        <div className="main-wrapper">
          {/* <Button onClick={handlePrint} icon={<PrinterOutlined />}>
        Print PDF
      </Button> */}
          <div className="datatable" style={{ height: "700px" }}>
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
                  <Option value="product_code">Product Code</Option>
                  <Option value="name">Name</Option>
                  <Option value="category">Category</Option>
                  <Option value="brand">Brand</Option>
                  <Option value="price">Price</Option>
                  <Option value="gender">Gender</Option>
                  <Option value="state">State</Option>
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
            <DataGrid
              className="datagrid"
              rows={data}
              columns={productColumns.concat(actionColumn)}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              hideFooter
              initialState={{
                pinnedColumns: { left: ["id"], right: ["actions"] },
              }}
            />
            <BasicPagination page={page} setPage={setPage} count={pageCount} />
          </div>
        </div>
      </TabPane>
      <TabPane tab="Stock Management" key="2">
        <div className="main-wrapper" style={{ padding: 20 }}>
          <DatePicker
            onChange={onChange}
            picker="month"
            defaultValue={moment(`${selectDate.year}/${selectDate.month}/1`)}
            style={{ marginBottom: 10 }}
          />
          <div>
            <WiggetStock data={dataStock} />
          </div>
        </div>
      </TabPane>
    </Tabs>
  );
};

export default ProductManagement;

const WiggetStock = ({ data }) => {
  return (
    <div className="wigget-stock">
      {data.map((item) => {
        return (
          <div>
            <h3>{item.title}</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 50,
                marginTop: 15,
              }}
            >
              {item.children.map((i) => {
                return (
                  <div className="wigget-stock-infor">
                    {i.icon}
                    <div>
                      <h4>{i.name}</h4>
                      <h3>
                        {i?.isMoney
                          ? i.number > 1000000 && i.number < 1000000000
                            ? (i.number / 1000000).toFixed(1) + "m"
                            : i.number > 1000000000
                            ? (i.number / 1000000000).toFixed(1) + "b"
                            : i.number + "đ"
                          : i.number.toLocaleString()}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
