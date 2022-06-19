import axios from "axios";
const Products = {
  getProducts: (params) => {
    const url = process.env.REACT_APP_BASE_URL + "/product/get-all";
    return axios({
      method: "get",
      url,
      params,
      headers: { "auth-token": process.env.REACT_APP_TOKEN },
    });
  },
  getProductDetails: (id) => {
    const url = process.env.REACT_APP_BASE_URL + `/product/get-details/${id}`;
    return axios({
      method: "get",
      url,
      headers: { "auth-token": process.env.REACT_APP_TOKEN },
    });
  },
  createOrder: (id, body) => {
    const url = process.env.REACT_APP_BASE_URL + "/order/create/" + id;
    return axios.post(url, body);
  },
  increaseViews: (id) => {
    const url = process.env.REACT_APP_BASE_URL + "/product/views/" + id;
    return axios.put(url);
  },
  comment: (id, body) => {
    const url = process.env.REACT_APP_BASE_URL + "/product/comment/" + id;
    return axios.post(url, body);
  },
};

export default Products;
