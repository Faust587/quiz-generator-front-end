import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:4000/'
});

api.interceptors.request.use((config) => {
  if (!localStorage.getItem('accessToken')) return config;
  const accessToken = `Bearer ${localStorage.getItem('accessToken') ?? ''}`;
  config.headers = {
    ...config.headers,
    Authorization: accessToken
  };
  return config;
});

interface refreshTokenResponse {
  accessToken: string
}

api.interceptors.response.use((config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest.isRetry = true;
      const tokensPair = await axios.get<refreshTokenResponse>(
        'http://localhost:4000/auth/refresh',
        { withCredentials: true }
      );
      if (axios.isAxiosError(tokensPair)) return tokensPair;
      const { accessToken } = tokensPair.data;
      localStorage.setItem('accessToken', accessToken);
      return await api.request(originalRequest);
    }
    return error;
  });

export default api;
