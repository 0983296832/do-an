import axiosClient from "./axiosClient";
const Products = {
  getProducts: (params) => {
    const url = "/product/get-all";
    return axiosClient.get(url, { params });
  },
  uploadImages: (id, body) => {
    const url = `/product/upload-image/${id}`;
    return axiosClient.put(url, body);
  },
  updateProduct: (id, body) => {
    const url = `/product/update/${id}`;
    return axiosClient.put(url, body);
  },
  addProduct: (body) => {
    const url = `/product/import`;
    return axiosClient.post(url, body);
  },
  getProductDetails: (id) => {
    const url = `/product/get-details/${id}`;
    return axiosClient.get(url);
  },
  deleteProduct: (id) => {
    const url = `/product/delete/${id}`;
    return axiosClient.delete(url);
  },
  getEarning: () => {
    const url = "/product/get-earning";
    return axiosClient.get(url);
  },
};

export default Products;
