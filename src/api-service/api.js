import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL||"http://localhost:8080/";
console.log(BASE_URL);


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});




// Request interceptor to add the Authorization header to authApiClient
api.interceptors.request.use(
  (config) => {
       return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
     console.log('api error');
    }
    return Promise.reject(error);
  }
);

export default api;