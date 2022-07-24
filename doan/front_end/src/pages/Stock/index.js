import { Avatar, Button, DatePicker, Tooltip } from "antd";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { MdOutlineInventory2, MdLocalShipping } from "react-icons/md";
import { AiOutlineCreditCard } from "react-icons/ai";
import moment from "moment";
import Products from "../../services/productServices";
import Toast from "../../components/Toast";
import { CSVLink } from "react-csv";
import Loading from "../../components/Loading";

const stockColumns = [
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
    field: "brand",
    headerName: "Brand",
    width: 100,
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
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "order",
    headerName: "Orders",
    width: 100,
  },
  {
    field: "supplier",
    headerName: "Suppliers",
    width: 100,
  },
];

const Stocks = () => {
  const [dataStock, setDataStock] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectDate, setSelectDate] = useState({
    month: moment(new Date()).format("M"),
    year: moment(new Date()).format("Y"),
  });
  const [dataScv, setDataScv] = useState();
  const [headers, setHeaders] = useState([
    { label: "ID", key: "_id" },
    { label: "Product Code", key: "product_code" },
    { label: "Name", key: "name" },
    { label: "Price", key: "price" },
    { label: "Brand", key: "brand" },
    { label: "Image", key: "image" },
    { label: "Quantity", key: "quantity" },
    { label: "Order", key: "order" },
    { label: "Supplier", key: "supplier" },
    { label: "Created", key: "createdAt" },
  ]);
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
        setDataTable(
          stock.dataTable.map((item, index) => {
            return {
              key: index,
              id: item._id,
              product_code: item.product_code,
              name: item.name,
              brand: item.brand,
              image: item.image?.map((img) => img.imageUrl) || [],
              quantity: item.quantity,
              price: item.price,
              order: item.order,
              supplier: item.supplier,
            };
          })
        );
        setDataScv(
          stock.dataTable.map((item) => {
            return {
              ...item,
              image: item.image.map((image) => image.imageUrl),
              createdAt: `${selectDate.month}/${selectDate.year}`,
            };
          })
        );
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
    })();
  }, [selectDate]);
  const onChange = (data) => {
    setSelectDate({
      month: moment(data).format("M"),
      year: moment(data).format("Y"),
    });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="main-wrapper" style={{ padding: 20 }}>
      <div className="datatableTitle">Stocks Management</div>
      <div className="filter-month">
        <h4>Lọc theo tháng:</h4>
        <DatePicker
          onChange={onChange}
          picker="month"
          defaultValue={moment(`${selectDate.year}/${selectDate.month}/1`)}
          style={{ marginBottom: 10 }}
        />
      </div>
      <div>
        <WiggetStock data={dataStock} />
      </div>
      <div style={{ height: 633, marginTop: 30 }}>
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
          rows={dataTable}
          columns={stockColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Stocks;

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
