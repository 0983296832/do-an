import React, { useState } from "react";
import "../../assets/css/top-product.css";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import Product from "../../components/Product";
import { Link } from "react-router-dom";
const { TabPane } = Tabs;

const TopProduct = ({ data }) => {
  const [tabIndex, seTabIndex] = useState(0);
  const onChange = (key) => {
    seTabIndex(key);
  };
  return (
    <div>
      <div className="top-title">
        <h4>Top Những Đôi Giày Sneaker</h4>
        <h1>Giày Thể Thao</h1>
      </div>
      <div>
        <Tabs defaultActiveKey="1" centered onChange={onChange}>
          <TabPane tab="Hot Và Mới" key="1">
            <div className="top-product">
              {data.slice(0, 10).map((item, index) => {
                return (
                  <div key={index}>
                    <Product data={item} />
                  </div>
                );
              })}
            </div>
          </TabPane>
          <TabPane tab="Sales" key="2">
            <div className="top-product">
              {data.slice(10, 20).map((item, index) => {
                return (
                  <div key={index}>
                    <Product data={item} />
                  </div>
                );
              })}
            </div>
          </TabPane>
        </Tabs>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            to={`/product-list-search?name=&brand=tất cả&sort=${
              tabIndex === 0 ? "-sales" : "-discount"
            }`}
            className="view-btn"
          >
            Xem thêm sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
