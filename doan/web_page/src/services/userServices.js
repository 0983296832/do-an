import axios from "axios";
import axiosClient from "./axiosClient";
const Users = {
  getUserById: (id) => {
    const url = "/user/" + id;
    return axiosClient.get(url);
  },
  updateUser: (id, body) => {
    const url = "/user/update/" + id;
    return axiosClient.put(url, body);
  },
  uploadImage: (id, body) => {
    const url = `/user/upload/${id}`;
    return axiosClient.post(url, body);
  },
  changePassword: (id, body) => {
    const url = `user/change-password/${id}`;
    return axiosClient.put(url, body);
  },
  addToCart: (id, body) => {
    const url = `user/add-to-cart/${id}`;
    return axiosClient.post(url, body);
  },
  removeFromCart: (id, body) => {
    const url = `user/delete-cart/${id}`;
    console.log(body);
    return axiosClient.put(url, body);
  },
  updateCart: (id, body) => {
    const url = `user/update-cart/${id}`;
    return axiosClient.put(url, body);
  },
  changeRewards: (id, body) => {
    const url = `user/change-rewards/${id}`;
    return axiosClient.post(url, body);
  },
};

export default Users;
