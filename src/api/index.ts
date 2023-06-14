import axios from "axios";
import { store } from "../store";
import { setUnauthorised } from "../store/reducer/auth/authSlice";

const api = axios.create({
  withCredentials: true,
  baseURL: "https://quiz-app-api-nu.vercel.app/",
});

api.interceptors.request.use((config) => {
  if (!localStorage.getItem("accessToken")) return config;
  const accessToken = `Bearer ${localStorage.getItem("accessToken") ?? ""}`;
  config.headers = {
    ...config.headers,
    Authorization: accessToken,
  };
  return config;
});

interface refreshTokenResponse {
  accessToken: string;
}

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.config &&
      error.config.isRetry
    ) {
      originalRequest.isRetry = true;
      const tokensPair = await axios.get<refreshTokenResponse>(
        "https://quiz-app-api-nu.vercel.app/auth/refresh",
        { withCredentials: true }
      );
      if (axios.isAxiosError(tokensPair)) {
        console.log("HEY");
        store.dispatch(setUnauthorised());
        return tokensPair;
      }
      const { accessToken } = tokensPair.data;
      localStorage.setItem("accessToken", accessToken);
      return await api.request(originalRequest);
    }
    return error;
  }
);

export default api;