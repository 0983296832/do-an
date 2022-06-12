import React from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const ProductView = ({ data, title, btn, pagination, pageCount, setPage }) => {
  return (
    <div>
      <div className="productView-title">
        <h1>{title}</h1>
      </div>
      <div className="top-product" style={{ minHeight: pagination && "100vh" }}>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <Product data={item} />
            </div>
          );
        })}
      </div>
      {btn && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="#" className="view-btn">
            Xem thêm sản phẩm
          </Link>
        </div>
      )}
      {pagination && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={pageCount}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductView;
