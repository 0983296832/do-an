import React from "react";
import "../../assets/css/top-product.css";
import { Tabs } from "antd";
import Product from "../../components/Product";
const { TabPane } = Tabs;

const TopProduct = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <div className="top-title">
        <h4>Top Những Đôi Giày Sneaker</h4>
        <h1>Giày Thể Thao</h1>
      </div>
      <div>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Hot Và Mới" key="1">
            <div className="top-product">
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
            </div>
          </TabPane>
          <TabPane tab="Sales" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default TopProduct;
