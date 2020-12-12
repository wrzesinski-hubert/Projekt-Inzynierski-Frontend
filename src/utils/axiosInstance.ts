import axios from 'axios';

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = token ? `Bearer ${token}` : '';
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
