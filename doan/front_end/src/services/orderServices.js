import axiosClient from "./axiosClient";
const Orders = {
  getOrder: (params) => {
    const url = "/order/get-all";
    return axiosClient.get(url, { params });
  },
  updateOrder: (id, body) => {
    const url = "/order/update/" + id;
    return axiosClient.put(url, body);
  },
};

export default Orders;
