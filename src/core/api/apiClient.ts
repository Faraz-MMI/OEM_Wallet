import axios from 'axios';
import { useAuthStore } from '../../app/store/authStore';

const apiClient = axios.create({
  baseURL: 'https://theload.ai/oem/api/v1',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'app-token': '5977b08d-f602-11f0-9911-00be432ac5fc',
  },
});

/**
 * Request Interceptor
 * Injects Authorization token automatically
 */
apiClient.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

/**
 * Optional: Response Interceptor
 * Handles 401 globally
 */
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().clearToken();
      // optionally navigate to Login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
