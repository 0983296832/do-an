import axiosClient from "./axiosClient";
const Posts = {
  createPosts: (body) => {
    const url = "/post/create";
    return axiosClient.post(url, body);
  },
  getPosts: (params) => {
    const url = "/post/get-all";
    return axiosClient.get(url, { params });
  },
  getPostById: (id) => {
    const url = "/post/" + id;
    return axiosClient.get(url);
  },
  updatePost: (id, body) => {
    const url = "/post/update/" + id;
    return axiosClient.put(url, body);
  },
  uploadImage: (id, body) => {
    const url = `/post/upload/${id}`;
    return axiosClient.post(url, body);
  },
  deletePost: (id) => {
    const url = `/post/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default Posts;
