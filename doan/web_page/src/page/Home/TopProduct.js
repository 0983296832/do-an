import React from "react";
import "../../assets/css/top-product.css";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import Product from "../../components/Product";
const { TabPane } = Tabs;

const TopProduct = ({ data }) => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <div className="top-title">
        {/* <h4>Top Những Đôi Giày Sneaker</h4> */}
        <h1>Top Sản Phẩm Trong Shop</h1>
      </div>
      <div>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Hot Và Mới" key="1">
            <div className="top-product">
              {data.map((item, index) => {
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
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <Product data={item} />
                  </div>
                );
              })}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default TopProduct;
