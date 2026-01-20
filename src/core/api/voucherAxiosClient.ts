import axios from 'axios';
import { GYFTR_BASE_URL } from '../config/env';

const voucherAxiosClient = axios.create({
  baseURL: GYFTR_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
  },
});

voucherAxiosClient.interceptors.request.use((config) => {
  console.log('REQUEST URL:', `${config.baseURL}${config.url}`);
  return config;
});

export default voucherAxiosClient;
