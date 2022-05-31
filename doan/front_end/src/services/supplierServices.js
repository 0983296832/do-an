import axiosClient from "./axiosClient";
const Suppliers = {
  getSupplier: (params) => {
    const url = "/product/supplier";
    return axiosClient.get(url, { params });
  },
  updateSupplier: (id, body) => {
    const url = "/product/update-supplier/" + id;
    return axiosClient.put(url, body);
  },
};

export default Suppliers;
