import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
  config.headers = { ...config.headers, Authorization: accessToken};
  return config;
});

api.interceptors.response.use((config) => config,
  async (error) => {
    if (error.response.status === 401) {
      console.log(error);
    }
  });

export default api;
