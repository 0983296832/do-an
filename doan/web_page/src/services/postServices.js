import axios from "axios";
const Posts = {
  getPosts: (params) => {
    const url = process.env.REACT_APP_BASE_URL + "/post/get-all";
    return axios({
      method: "get",
      url,
      params,
      headers: { "auth-token": process.env.REACT_APP_TOKEN },
    }).then((res) => res.data);
  },
  getPostById: (id) => {
    const url = process.env.REACT_APP_BASE_URL + `/post/get-details/${id}`;
    return axios({
      method: "get",
      url,
      headers: { "auth-token": process.env.REACT_APP_TOKEN },
    }).then((res) => res.data);
  },
  increaseViews: (id) => {
    const url = process.env.REACT_APP_BASE_URL + `/post/increase-view/${id}`;
    return axios({
      method: "get",
      url,
      headers: { "auth-token": process.env.REACT_APP_TOKEN },
    });
  },
};

export default Posts;
