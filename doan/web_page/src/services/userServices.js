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
};

export default Users;
