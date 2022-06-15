import axios from "axios";

const Orders = {
  getAllOrderById: (params) => {
    const url = process.env.REACT_APP_BASE_URL + "/order/get-all";
    return axios({
      method: "get",
      url,
      params,
      headers: { "auth-token": process.env.REACT_APP_TOKEN },
    }).then((res) => res.data.data);
  },
  getOrderById: (id) => {
    const url = process.env.REACT_APP_BASE_URL + "/order/get-by-id/" + id;
    return axios({
      method: "get",
      url,
      headers: { "auth-token": process.env.REACT_APP_TOKEN },
    }).then((res) => res.data.data);
  },
  cancelOrder: (id, body) => {
    const url = process.env.REACT_APP_BASE_URL + "/order/update/" + id;
    return axios({
      method: "put",
      url,
      data: body,
      headers: { "auth-token": process.env.REACT_APP_TOKEN },
    }).then((res) => res.data.data);
  },
};

export default Orders;
