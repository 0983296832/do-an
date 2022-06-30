import { useState, useEffect } from "react";
import "../../assets/css/table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Tag } from "antd";

const TableList = ({ dataTable: rows }) => {
  const colorTag = (row) => {
    {
      let colorTag;
      switch (row.status) {
        case "đang chờ xác nhận":
          colorTag = "orange";
          break;
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
        case "giao hàng không thành công":
          colorTag = "purple";
          break;
        case "đã hủy":
          colorTag = "red";
          break;
      }
      return <Tag color={colorTag}>{row.status}</Tag>;
    }
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> ID sản phẩm</TableCell>
            <TableCell className="tableCell">Tên khách hàng</TableCell>
            <TableCell className="tableCell">Ngày</TableCell>
            <TableCell className="tableCell">Tổng giá</TableCell>
            <TableCell className="tableCell">Phương thức thanh toán</TableCell>
            <TableCell className="tableCell">Ngày đặt</TableCell>
            <TableCell className="tableCell">Tình trạng</TableCell>
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
                  ? moment(row.receive_date).zone("+07:00").format("DD/MM/YYYY")
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
