import React from "react";
import "../../assets/css/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Tooltip, Rate } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Button } from "antd";
import Products from "../../services/productServices";
import Toast from "../../components/Toast";
import BasicPagination from "../../components/Pagination";

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
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
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
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
        </div>
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

  const fetchData = async (pageNum) => {
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
      const result = await Products.getProducts(params);
      setPageCount(Math.ceil(result.count / 10));
      setData(
        result.data.map((item) => {
          return {
            id: item._id,
            product_code: item.product_code,
            name: item.name,
            category: item.category,
            brand: item.brand,
            price: item.price,
            image: item.image[0]?.imageUrl || "",
            gender: item.gender,
            sales: item.sales,
            views: item.views,
            votes: item.votes,
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
    const key = searchBy + "[regex]";
    try {
      const params = {
        page: 1,
        limit: 10,
        [key]: searchKey,
      };
      const result = await Products.getProducts(params);
      setPageCount(Math.ceil(result.count / 10));
      setData(
        result.data.map((item) => {
          return {
            id: item._id,
            product_code: item.product_code,
            name: item.name,
            category: item.category,
            brand: item.brand,
            price: item.price,
            image: item.image[0]?.imageUrl || "",
            gender: item.gender,
            sales: item.sales,
            views: item.views,
            votes: item.votes,
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

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main-wrapper">
      <div className="datatable" style={{ height: "700px" }}>
        <div className="datatableTitle">Product Management</div>
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
        <DataGrid
          className="datagrid"
          rows={data}
          columns={productColumns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          hideFooter
        />
        <BasicPagination page={page} setPage={setPage} count={pageCount} />
      </div>
    </div>
  );
};

export default ProductManagement;
