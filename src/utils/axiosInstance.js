import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { "content-type": "application/json" },
  withCredentials: true,
});

export default axiosInstance;
