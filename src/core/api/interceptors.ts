import { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '../../app/store/authStore';
import { handleApiError } from '../error/errorHandler';

export const attachInterceptors = (client: AxiosInstance) => {
  // Request interceptor
  client.interceptors.request.use(
    config => {
      const token = useAuthStore.getState().token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error)
  );

  // Response interceptor
  client.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      return Promise.reject(handleApiError(error));
    }
  );
};
