import "../../assets/css/table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableProductSale = ({ dataTableSales: rows, noPrice, noAmount }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> Id Sản Phẩm</TableCell>
            <TableCell className="tableCell">Mã sản phẩm</TableCell>
            <TableCell className="tableCell">Tên sản phẩm</TableCell>
            <TableCell className="tableCell">Image</TableCell>
            <TableCell className="tableCell">Số lượng </TableCell>
            {noAmount ? null : (
              <TableCell className="tableCell">Tổng tiền</TableCell>
            )}
            {noPrice ? null : <TableCell className="tableCell">Giá</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.product_id}>
              <TableCell className="tableCell">{row.product_id}</TableCell>
              <TableCell className="tableCell">{row.product_code}</TableCell>

              <TableCell className="tableCell">{row.product_name}</TableCell>
              <TableCell className="tableCell">
                <img
                  src={row.product_image}
                  alt=""
                  style={{ width: 70, height: 70, objectFit: "cover" }}
                />
              </TableCell>
              <TableCell className="tableCell">
                {row.product_quantity}
              </TableCell>
              {noAmount ? null : (
                <TableCell className="tableCell">
                  {row.product_amount.toLocaleString()}
                </TableCell>
              )}
              {noPrice ? null : (
                <TableCell className="tableCell">
                  {row.product_price.toLocaleString()}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProductSale;
