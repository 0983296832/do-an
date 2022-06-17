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
  getRevenue: () => {
    const url = "/order/get-revenue";
    return axiosClient.get(url);
  },
  getRevenueBy: (date) => {
    const url = "/order/get-revenue-by/" + date;
    return axiosClient.get(url);
  },
  getRevenueByHalfYear: () => {
    const url = "/order/get-revenue-by-haft-year";
    return axiosClient.get(url);
  },
};

export default Orders;
