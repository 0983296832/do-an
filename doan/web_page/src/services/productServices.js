import axios from "axios";
const Products = {
  getProducts: (params) => {
    const url = "/product/get-all";
    return axios.get(
      url,
      { params },
      {
        headers: {
          ["auth-token"]:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjgwZDQ5YmIxMWY3ZTE2MjQyNTNiYzQiLCJuYW1lIjoibGUgdmFuIGJpbmgiLCJlbWFpbCI6InRoYW5oYmluaDE5MTA5OUBnbWFpbC5jb20iLCJyb2xlIjoyLCJpYXQiOjE2NTMwMzU4MDQsImV4cCI6MTY2MTY3NTgwNH0.KPxp4pDxLd9NjAWbGSFtPWrAGicJlGnnvCY9B5wyo2A",
        },
      }
    );
  },
  getProductDetails: (id) => {
    const url = `/product/get-details/${id}`;
    return axios.get(url, {
      headers: {
        ["auth-token"]:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjgwZDQ5YmIxMWY3ZTE2MjQyNTNiYzQiLCJuYW1lIjoibGUgdmFuIGJpbmgiLCJlbWFpbCI6InRoYW5oYmluaDE5MTA5OUBnbWFpbC5jb20iLCJyb2xlIjoyLCJpYXQiOjE2NTMwMzU4MDQsImV4cCI6MTY2MTY3NTgwNH0.KPxp4pDxLd9NjAWbGSFtPWrAGicJlGnnvCY9B5wyo2A",
      },
    });
  },
};

export default Products;
