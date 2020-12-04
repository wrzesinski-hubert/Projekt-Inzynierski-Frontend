import axios from 'axios';

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('userToken');
    config.headers['Authorization'] = 'Bearer ' + token;
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
