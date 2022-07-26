import React from "react";
import "../../assets/css/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Tooltip, Rate, Select, Button, Avatar, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Products from "../../services/productServices";
import Toast from "../../components/Toast";
import BasicPagination from "../../components/Pagination";
import { CSVLink } from "react-csv";
import Loading from "../../components/Loading";

const { Option } = Select;

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
        const options = searchBy + "[options]";

        params = {
          page: pageNum,
          limit: 10,
          [key]: searchKey,
          sort: "_id",
          [options]: "i",
        };
      }
      const result = await Products.getProducts(params);
      const { data: dataScv } = await Products.getProducts({
        page: 1,
        limit: 100000,
        ...params,
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
        const options = searchBy + "[options]";
        params = {
          page: 1,
          limit: 10,
          [key]: searchKey,
          [options]: "i",
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

  const confirm = async (e, id) => {
    try {
      await Products.deleteProduct(id);
      setData(data.filter((item) => item.id !== id));
      Toast("success", "Delete product successfully");
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const cancel = (e) => {
    return;
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
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={(e) => confirm(e, params.row.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <div className="deleteButton">Delete</div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="main-wrapper">
      {/* <Button onClick={handlePrint} icon={<PrinterOutlined />}>
        Print PDF
      </Button> */}
      <div className="datatable" style={{ height: "700px" }}>
        <div className="datatableTitle">Products Management</div>
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
  );
};

export default ProductManagement;
