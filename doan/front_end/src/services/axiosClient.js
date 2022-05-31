import axios from "axios";
import queryString from "query-string";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { LOCAL_STORAGE_USER_KEY } from "../constant/constant";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  let authToken = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY))
    : null;
  console.log(authToken.token);
  config.headers["auth-token"] = authToken?.token;

  // const user = jwt_decode(authToken?.token);
  // const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
  // if (!isExpired) {
  //   return config;
  // }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
