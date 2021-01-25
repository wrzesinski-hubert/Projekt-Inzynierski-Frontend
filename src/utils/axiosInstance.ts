import axios from 'axios';

export const axiosInstance = axios.create();

//getting new tokens
export const getNewTokens = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const { data } = await axiosInstance.get(
      `${process.env.REACT_APP_API_URL}/token/refresh?refreshToken=${refreshToken}`,
    );
    console.log("12312321",data);
    localStorage.setItem('userPrivilige',data.authorityRole);
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.token;
  } catch (e) {
    console.log(e);
  }
};

axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('userToken');

    request.headers['Content-Type'] = 'application/json';
    request.headers['Authorization'] = token ? `Bearer ${token}` : '';
    return request;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await getNewTokens();
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);
