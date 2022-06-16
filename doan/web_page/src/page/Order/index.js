import React, { useState } from "react";
import "../../assets/css/order-search.css";
import OrderChild from "../Profile/DetailOrder";
import Orders from "../../services/orderServices";
import Toast from "../../components/Toast";
import { Input, Divider } from "antd";
import searchOrder from "../../assets/image/search_order.svg";
const { Search } = Input;

const Order = () => {
  const [orders, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const getDetailOrder = async (id) => {
    setLoading(true);
    try {
      const data = await Orders.getOrderById(id);
      setOrder([data]);
      Toast("success", "Lấy thông tin đơn hàng thành công");
    } catch (err) {
      Toast("error", "Mã đơn hàng không tồn tại");
    }
    setLoading(false);
  };
  const onSearch = (value) => getDetailOrder(value);
  return (
    <div className="order-search-container">
      <Divider>Tìm Kiếm Đơn Hàng</Divider>
      <Search
        placeholder="Nhập mã đơn hàng..."
        loading={loading}
        enterButton
        onSearch={onSearch}
      />
      <Divider />

      {orders ? (
        <OrderChild
          data={orders[0]}
          orders={orders}
          setOrder={setOrder}
          Loading={loading}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={searchOrder} alt="search" />
        </div>
      )}
    </div>
  );
};

export default Order;
