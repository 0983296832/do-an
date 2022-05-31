import { useState, useEffect } from "react";
import "../../assets/css/table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OrderServices from "../../services/orderServices";
import moment from "moment";
import { Tag } from "antd";

const TableList = () => {
  const [rows, setRows] = useState([]);

  const colorTag = (row) => {
    {
      let colorTag;
      switch (row.status) {
        case "đang đợi gói hàng":
          colorTag = "yellow";
          break;
        case "đã xác nhận":
          colorTag = "blue";
          break;
        case "đang giao hàng":
          colorTag = "gray";
          break;
        case "giao hàng thành công":
          colorTag = "green";
          break;
        case "đã hủy":
          colorTag = "red";
          break;
      }
      return <Tag color={colorTag}>{row.status}</Tag>;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: 1,
        limit: 5,
      };
      const result = await OrderServices.getOrder(params);

      setRows(
        result.data.map((item) => {
          return {
            id: item._id,
            customer: item.user_name,
            amount: item.details
              .reduce((acc, i) => {
                return acc + i.price * i.quantity;
              }, 0)
              .toLocaleString("en-US", { style: "currency", currency: "VND" }),
            date: `${moment(item.created).utc().format("DD/MM/YYYY")}`,
            method: item.payment_type,
            receive_date: item.receive_date,
            status: item.state,
          };
        })
      );
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Recive Date</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>

              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                {row.receive_date
                  ? moment(row.receive_date).utc().format("DD/MM/YYYY")
                  : ""}
              </TableCell>
              <TableCell className="tableCell">{colorTag(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
