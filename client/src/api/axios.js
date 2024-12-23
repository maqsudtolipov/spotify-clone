import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Logout user if token is invalid
    const { data, status } = error.response;
    console.log('interceptor', data, status);
    if (status === 401 && data.code === 'AccessTokenInvalid') {
      console.log('AccessTokenInvalid');
    } else if (status === 401 && data.code === 'AccessTokenExpired') {
      console.log('AccessTokenExpired');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
