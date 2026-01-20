import axios from 'axios';
import { attachInterceptors } from './interceptors';
import { API_BASE_URL, TENANT_ID } from '../config/env';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-TENANT-ID': TENANT_ID,
  },
});

attachInterceptors(axiosClient);

export default axiosClient;
