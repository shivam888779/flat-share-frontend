import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Unauthorized, logging out...');
      }
    }
    return Promise.reject(error);
  }
);

export default authApi;