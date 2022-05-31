import { LOCAL_STORAGE_USER_KEY } from "../constant/constant";
import axiosClient from "./axiosClient";
import Toast from "../components/Toast";
import axios from "axios";
const Auth = {
  login: (body) => {
    const url = "/auth/login";
    return axios.post(url, body).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem(
          LOCAL_STORAGE_USER_KEY,
          JSON.stringify(res.data.result)
        );
        return res.data.result;
      }
    });
  },
  logout: () => {
    const url = "/auth/logout";
    return axiosClient
      .post(url)
      .then((res) => {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        return res.data;
      })
      .catch((err) => {
        Toast("error", err.message);
      });
  },
  register: (body) => {
    const url = "/auth/register";
    return axios.post(url, body);
  },
};

export default Auth;
