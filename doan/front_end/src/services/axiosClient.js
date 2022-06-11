import axios from "axios";
import queryString from "query-string";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { LOCAL_STORAGE_USER_KEY } from "../constant/constant";
import Toast from "../components/Toast";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    let authToken = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY))
      : null;

    config.headers["auth-token"] = authToken?.token;

    const user = jwt_decode(authToken?.token);
    const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      return config;
    }

    await axios
      .post("/auth/refresh", { withCredentials: true })
      .then((response) => {
        localStorage.setItem(
          LOCAL_STORAGE_USER_KEY,
          JSON.stringify({ ...authToken, token: response.data.token })
        );
        config.headers["auth-token"] = response.data.token;
      })
      .catch((error) => {
        Toast("error", "login expired");
        window.location.href = "http://localhost:4000/login";
      });

    return config;
  },
  (err) => {
    let authToken = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY))
      : null;
    err.headers["auth-token"] = authToken?.token;
    return err;
  }
);

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
