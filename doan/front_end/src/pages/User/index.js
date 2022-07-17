import "../../assets/css/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../../services/userServices";
import { Input, Tooltip, Select, Button, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Toast from "../../components/Toast";
import Users from "../../services/userServices";
import BasicPagination from "../../components/Pagination";
import { CSVLink } from "react-csv";
import Loading from "../../components/Loading";

const { Option } = Select;

const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 120,
    renderCell: (params) => {
      return (
        <Tooltip placement="topLeft" title={params.row.id}>
          {params.row.id.slice(0, 10) + "..."}
        </Tooltip>
      );
    },
  },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.user}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    renderCell: (params) => {
      return <span>{params.row.role === 1 ? "User" : "Admin"}</span>;
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

const Datatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchBy, setSearchBy] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [dataScv, setDataScv] = useState();
  const [headers, setHeaders] = useState([
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Name SurName", key: "name_surname" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Birth", key: "birth" },
    { label: "Address", key: "address" },
    { label: "Gender", key: "sex" },
    { label: "Role", key: "role" },
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
      } else if (searchBy === "role") {
        const key = searchBy + "[eq]";
        params = {
          page: pageNum,
          limit: 10,
          [key]: searchKey == "user" ? 1 : 2,
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
      const result = await UserService.getUsers(params);
      const { result: dataScv } = await UserService.getUsers({
        page: 1,
        limit: 100000,
      });
      setDataScv(dataScv);
      setPageCount(Math.ceil(result.count / 10));
      setData(
        result.result.map(({ id, email, name, image, status, phone, role }) => {
          return {
            id,
            email,
            user: name,
            img: image?.imageUrl || "https://joeschmoe.io/api/v1/random",
            status,
            phone,
            role,
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

  const getDataBySearch = async (pageNum) => {
    if (searchBy === "all") {
      setSearchKey("");
      fetchData();
    }

    setLoading(true);
    try {
      let params;
      if (searchBy === "role") {
        const key = searchBy + "[eq]";
        params = {
          page: 1,
          limit: 10,
          [key]: searchKey == "user" ? 1 : 2,
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

      const result = await UserService.getUsers(params);
      setPageCount(Math.ceil(result.count / 10));
      setData(
        result.result.map(({ id, email, name, image, status, phone, role }) => {
          return {
            id,
            email,
            user: name,
            img: image?.imageUrl || "https://joeschmoe.io/api/v1/random",
            status,
            phone,
            role,
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
      await Users.deleteUser(id);
      setData(data.filter((item) => item.id !== id));
      Toast("success", "Delete user successfully");
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
              to={`/user-detail/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View Detail</div>
            </Link>
            <Popconfirm
              title="Are you sure to delete this user?"
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
      <div className="datatable">
        <div className="datatableTitle">
          User Management
          <Link to="/add-user" className="_link">
            Add New
          </Link>
        </div>
        <div className="datatable-feature">
          <SearchGroup
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            page={page}
            getDataBySearch={getDataBySearch}
          />
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
          style={{ height: "630.5px" }}
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          hideFooter
          initialState={{ pinnedColumns: { left: ["id"], right: ["actions"] } }}
        />
        <BasicPagination page={page} setPage={setPage} count={pageCount} />
      </div>
    </div>
  );
};

export default Datatable;

const SearchGroup = ({
  searchKey,
  setSearchKey,
  searchBy,
  setSearchBy,
  page,
  getDataBySearch,
}) => {
  return (
    <>
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
        <h3>Search/Sort By:</h3>
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
          <Option value="status">Status</Option>
          <Option value="role">Role</Option>
        </Select>
      </div>
      <div className="feature-btn">
        <Button
          type="primary"
          icon={<SearchOutlined />}
          size="middle"
          onClick={() => getDataBySearch(page)}
        >
          Search
        </Button>
      </div>
    </>
  );
};

// const FilterGroup = ({ filterByRole, setFilterByRole }) => {
//   return (
//     <>
//       <div className="feature-select">
//         <h3>Filter by role:</h3>
//         <Select
//           defaultValue={filterByRole}
//           style={{
//             width: 200,
//           }}
//           onChange={(value) => setFilterByRole(value)}
//         >
//           <Option value="all">All</Option>
//           <Option value={2}>Admin</Option>
//           <Option value={1}>User</Option>
//         </Select>
//       </div>
//       <div className="feature-select">
//         <h3>Filter by status:</h3>
//         <Select
//           defaultValue={filterByRole}
//           style={{
//             width: 200,
//           }}
//           onChange={(value) => setFilterByRole(value)}
//         >
//           <Option value="all">All</Option>
//           <Option value="online">online</Option>
//           <Option value="offline">offline</Option>
//         </Select>
//       </div>
//     </>
//   );
// };
