import { useEffect } from 'react';
import { logout } from '../features/user/userThunks.ts';
import axiosInstance from '../axios/axios';
import { manualLogout } from '../features/user/userSlice.ts';

const useAuthInterceptor = (dispatch) => {
  useEffect(() => {
    const authInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          (error.response.data.code === 'AccessTokenExpired' ||
            error.response.data.code === 'AccessTokenMissing') &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            await axiosInstance.post(
              '/auth/refresh-token',
              {},
              {
                withCredentials: true,
              },
            );
            return axiosInstance(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }

        // NOTE: Not ideal
        if (
          error.response.status === 401 &&
          error.response.data.code === 'AuthReset'
        ) {
          dispatch(manualLogout());
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(authInterceptor); // remove interceptor on dismount/auth change
    };
  }, [dispatch]);
};

export default useAuthInterceptor;
