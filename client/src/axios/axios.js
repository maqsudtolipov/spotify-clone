import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true,
});

// TODO: Check if the access token is invalid
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      (error.response.data.code === 'AccessTokenExpired' || error.response.data.code === 'AccessTokenMissing') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post('/auth/refresh-token', {}, {
          withCredentials: true,
        });
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
