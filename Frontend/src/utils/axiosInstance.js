import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3003/api/v1', // Your API base URL
});

// Add a request interceptor to include the refresh_token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('refresh_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
