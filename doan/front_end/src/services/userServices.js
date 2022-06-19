import axiosClient from "./axiosClient";
const Users = {
  getUsers: (params) => {
    const url = "/user/get-all";
    return axiosClient.get(url, { params });
  },
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
  deleteUser: (id) => {
    const url = `/user/delete/${id}`;
    return axiosClient.delete(url);
  },
  changePassword: (id, body) => {
    const url = `user/change-password/${id}`;
    return axiosClient.put(url, body);
  },
  getTopUser: () => {
    const url = `product/get-top-users`;
    return axiosClient.get(url);
  },
};

export default Users;
